import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkStringify from "remark-stringify";
import remarkLint from "remark-lint";
import remarkPresetLintMarkdownStyleGuide from "remark-preset-lint-markdown-style-guide";
import { VFile } from "vfile";
import {
  ValidationResult,
  ValidationCategory,
  ValidationOptions,
} from "../types";

// デフォルトのバリデーションオプション（すべてのカテゴリを有効化）
const defaultOptions: ValidationOptions = {
  categories: Object.values(ValidationCategory),
};

// GFMルールに基づくバリデーション
export const validateMarkdown = async (
  text: string,
  options: ValidationOptions = defaultOptions
): Promise<ValidationResult[]> => {
  const file = new VFile({ path: "example.md", value: text });

  try {
    // unified パイプラインを使用したバリデーション
    await unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkLint)
      .use(remarkPresetLintMarkdownStyleGuide)
      .use(remarkStringify)
      .process(file);

    // ファイルに記録されたメッセージを結果として返す
    const results = file.messages.map((message) => {
      // メッセージからカテゴリを判断
      let category = ValidationCategory.GENERAL;

      const ruleId = message.ruleId || "unknown";

      // ルールIDに基づいてカテゴリを設定
      if (ruleId.includes("heading")) {
        category = ValidationCategory.HEADING;
      } else if (ruleId.includes("list")) {
        category = ValidationCategory.LIST;
      } else if (ruleId.includes("table")) {
        category = ValidationCategory.TABLE;
      } else if (ruleId.includes("checkbox") || ruleId.includes("task")) {
        category = ValidationCategory.TASK_LIST;
      } else if (
        ruleId.includes("strikethrough") ||
        ruleId.includes("delete")
      ) {
        category = ValidationCategory.STRIKETHROUGH;
      } else if (ruleId.includes("link") || ruleId.includes("url")) {
        category = ValidationCategory.AUTOLINK;
      }

      // severityの型を明示的に指定
      let severity: "error" | "warning" | "note" = "warning";

      // 特定のルールIDに基づいて重要度を設定
      const errorRules = [
        "no-duplicate-headings",
        "parse-error",
        "no-undefined-references",
        "no-unresolved-references",
      ];

      if (message.fatal || errorRules.includes(ruleId)) {
        severity = "error";
      } else if (message.note) {
        severity = "note";
      }

      return {
        line: message.line || 0,
        column: message.column || 0,
        message: message.reason,
        ruleId: ruleId,
        severity: severity,
        category: category,
      } as ValidationResult;
    });

    // 選択されたカテゴリのみをフィルタリング
    return options.categories.includes(ValidationCategory.GENERAL)
      ? results
      : results.filter((result) =>
          options.categories.includes(result.category)
        );
  } catch (error: unknown) {
    console.error("Validation error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return [
      {
        line: 0,
        column: 0,
        message: `パース中にエラーが発生しました: ${errorMessage}`,
        ruleId: "parse-error",
        severity: "error",
        category: ValidationCategory.GENERAL,
      },
    ];
  }
};

// カテゴリ別のバリデーション結果を取得
export const getValidationResultsByCategory = (
  results: ValidationResult[],
  category: ValidationCategory
): ValidationResult[] => {
  return results.filter((result) => result.category === category);
};
