"use client";

import React from "react";
import { ValidationCategory, ValidationResultsProps } from "../types";

const ValidationResults: React.FC<ValidationResultsProps> = ({ results }) => {
  if (results.length === 0) {
    return (
      <div className="p-4 bg-green-100 text-green-800 rounded-md">
        エラーはありません。Markdownは正しく記述されています。
      </div>
    );
  }

  // カテゴリ名の日本語表示
  const getCategoryName = (category: ValidationCategory): string => {
    const categoryMap: Record<ValidationCategory, string> = {
      [ValidationCategory.GENERAL]: "一般",
      [ValidationCategory.HEADING]: "見出し",
      [ValidationCategory.LIST]: "リスト",
      [ValidationCategory.TABLE]: "テーブル",
      [ValidationCategory.TASK_LIST]: "タスクリスト",
      [ValidationCategory.STRIKETHROUGH]: "取り消し線",
      [ValidationCategory.AUTOLINK]: "自動リンク",
    };
    return categoryMap[category] || "不明";
  };

  // 重要度の日本語表示
  const getSeverityName = (severity: "error" | "warning" | "note"): string => {
    const severityMap = {
      error: "エラー",
      warning: "警告",
      note: "注意",
    };
    return severityMap[severity];
  };

  // エラーメッセージの日本語化
  const translateMessage = (message: string, ruleId: string): string => {
    // 一般的なエラーメッセージの翻訳マップ
    const translationMap: Record<string, string> = {
      // 見出し関連
      "Unexpected heading rank": "見出しレベルが不適切です",
      "Unexpected duplicate toplevel heading, exected a single heading with rank `1`":
        "最上位の見出し（h1）が重複しています。h1は1つのみ使用してください",
      "Heading should have a space after the hash signs":
        "見出し記号(#)の後にはスペースが必要です",
      "Heading levels should increment by one level at a time":
        "見出しレベルは一度に1レベルずつ増やす必要があります",
      "Heading levels should not increment by more than 1 level":
        "見出しレベルは一度に1レベル以上増やすことはできません",
      "Unexpected heading with equivalent text, expected unique headings":
        "同じテキストの見出しが重複しています。見出しは一意である必要があります",

      // リスト関連
      "Ordered list item marker should be followed by a space":
        "番号付きリスト項目の後にはスペースが必要です",
      "Unordered list item marker should be followed by a space":
        "箇条書きリスト項目の後にはスペースが必要です",
      "List item marker should be a hyphen":
        "リスト項目マーカーはハイフン(-)を使用してください",
      "Ordered list should start with 1":
        "番号付きリストは1から始める必要があります",

      // テーブル関連
      "Table should have a separator row": "テーブルには区切り行が必要です",
      "Table separator row should have at least 3 dashes in each cell":
        "テーブル区切り行の各セルには少なくとも3つのダッシュが必要です",

      // タスクリスト関連
      "Checkbox should be followed by a space":
        "チェックボックスの後にはスペースが必要です",
      "Checkbox marker should be either [ ] or [x]":
        "チェックボックスマーカーは[ ]または[x]である必要があります",

      // リンク関連
      "Link should have a destination": "リンクには宛先が必要です",
      "Link text should not be empty": "リンクテキストは空にできません",

      // その他
      "Expected a closing delimiter": "閉じる区切り文字が必要です",
      "Expected an opening delimiter": "開始区切り文字が必要です",
      "Expected indentation": "インデントが必要です",
      "Expected a blank line": "空行が必要です",
      "Unexpected blank line": "不要な空行があります",
      "Expected a line ending": "行末が必要です",
      "Expected a heading": "見出しが必要です",
      "Expected a list item": "リスト項目が必要です",
      "Expected a table": "テーブルが必要です",
      "Expected a code block": "コードブロックが必要です",
      "Expected a blockquote": "引用が必要です",
      "Expected a paragraph": "段落が必要です",
      "Expected a thematic break": "区切り線が必要です",
      "Expected a definition": "定義が必要です",
      "Expected a footnote": "脚注が必要です",
      "Expected a reference": "参照が必要です",
      "Expected a link": "リンクが必要です",
      "Expected an image": "画像が必要です",
      "Expected a strong": "強調が必要です",
      "Expected an emphasis": "イタリックが必要です",
      "Expected a code span": "コードスパンが必要です",
      "Expected a break": "改行が必要です",
      "Expected a text": "テキストが必要です",
      "Expected a html": "HTMLが必要です",
      "Expected a yaml": "YAMLが必要です",
      "Expected a toml": "TOMLが必要です",
      "Expected a math": "数式が必要です",
      "Expected a mdx": "MDXが必要です",
      "Expected a mdxJsxFlowElement": "MDX JSXフロー要素が必要です",
      "Expected a mdxJsxTextElement": "MDX JSXテキスト要素が必要です",
      "Expected a mdxFlowExpression": "MDXフロー式が必要です",
      "Expected a mdxTextExpression": "MDXテキスト式が必要です",
      "Expected a mdxjsEsm": "MDX JSX ESMが必要です",
    };

    // ルールIDに基づく翻訳
    const ruleIdTranslationMap: Record<string, string> = {
      "no-duplicate-headings":
        "同じテキストの見出しが重複しています。見出しは一意である必要があります",
      "no-missing-blank-lines": "空行が必要な箇所に空行がありません",
      "no-consecutive-blank-lines": "連続した空行は使用できません",
      "no-trailing-spaces": "行末に余分なスペースがあります",
      "hard-break-spaces": "改行の前には2つ以上のスペースが必要です",
      "no-emphasis-as-heading": "見出しとして強調を使用しないでください",
      "no-heading-punctuation": "見出しの末尾に句読点を使用しないでください",
      "no-inline-padding":
        "インライン要素の内側にパディングを使用しないでください",
      "no-literal-urls": "URLは<>で囲むか、リンク記法を使用してください",
      "no-shortcut-reference-link":
        "ショートカット参照リンクは使用しないでください",
      "no-table-indentation": "テーブルはインデントしないでください",
    };

    // ルールIDに基づく翻訳があれば優先
    if (ruleId && ruleIdTranslationMap[ruleId]) {
      return ruleIdTranslationMap[ruleId];
    }

    // 完全一致するメッセージがあれば翻訳を返す
    if (translationMap[message]) {
      return translationMap[message];
    }

    // 部分一致するメッセージを探す
    for (const [key, translation] of Object.entries(translationMap)) {
      if (message.includes(key)) {
        return translation;
      }
    }

    // 翻訳がない場合は元のメッセージを返す
    return message;
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300 rounded-md table-fixed">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-2 border-b w-12 text-center">行</th>
            <th className="py-2 px-2 border-b w-12 text-center">列</th>
            <th className="py-2 px-3 border-b">メッセージ</th>
            <th className="py-2 px-2 border-b w-32 text-center">カテゴリ</th>
            <th className="py-2 px-2 border-b w-24 text-center">重要度</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result, index) => (
            <tr key={index} className="border-b">
              <td className="py-2 px-2 text-center">{result.line}</td>
              <td className="py-2 px-2 text-center">{result.column}</td>
              <td className="py-2 px-3">
                <div className="font-medium">
                  {translateMessage(result.message, result.ruleId)}
                </div>
                {result.message !==
                  translateMessage(result.message, result.ruleId) && (
                  <div className="text-xs text-gray-500 mt-1 truncate hover:text-clip hover:overflow-visible">
                    <span className="font-medium">原文:</span> {result.message}
                  </div>
                )}
                <div className="text-xs text-gray-500 mt-1">
                  <span className="font-medium">ルールID:</span> {result.ruleId}
                </div>
              </td>
              <td className="py-2 px-2 text-center">
                <span className="px-2 py-1 rounded-full text-xs bg-gray-100 whitespace-nowrap ">
                  {getCategoryName(result.category)}
                </span>
              </td>
              <td className="py-2 px-2 text-center">
                <span
                  className={`px-2 py-1 rounded-full text-xs inline-flex items-center ${
                    result.severity === "error"
                      ? "bg-red-100 text-red-800"
                      : result.severity === "warning"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {getSeverityName(result.severity)}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ValidationResults;
