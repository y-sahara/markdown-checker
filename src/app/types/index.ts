/**
 * マークダウンバリデーションの結果を表す型
 */
export interface ValidationResult {
  /** エラーが発生した行番号 */
  line: number;
  /** エラーが発生した列番号 */
  column: number;
  /** エラーメッセージ */
  message: string;
  /** エラーを発生させたルールのID */
  ruleId: string;
  /** エラーの重要度 */
  severity: 'error' | 'warning' | 'note';
  /** エラーのカテゴリ */
  category: ValidationCategory;
}

/**
 * バリデーションカテゴリの列挙型
 */
export enum ValidationCategory {
  /** 見出し関連のルール */
  HEADING = 'heading',
  /** リスト関連のルール */
  LIST = 'list',
  /** テーブル関連のルール */
  TABLE = 'table',
  /** タスクリスト関連のルール */
  TASK_LIST = 'taskList',
  /** 取り消し線関連のルール */
  STRIKETHROUGH = 'strikethrough',
  /** 自動リンク関連のルール */
  AUTOLINK = 'autolink',
  /** その他の一般的なルール */
  GENERAL = 'general'
}

/**
 * バリデーションオプションを表す型
 */
export interface ValidationOptions {
  /** バリデーションを実行するカテゴリの配列 */
  categories: ValidationCategory[];
}

/**
 * タブ情報を表す型
 */
export interface TabInfo {
  /** タブのID（ValidationCategoryと一致） */
  id: ValidationCategory;
  /** タブの表示ラベル */
  label: string;
  /** タブの説明文 */
  description: string;
}

/**
 * マークダウンエディターのプロパティ型
 */
export interface MarkdownEditorProps {
  /** 編集中のマークダウンテキスト */
  markdown: string;
  /** マークダウンが変更されたときのコールバック関数 */
  onChange: (value: string) => void;
  /** スタイルプロパティ */
  style?: React.CSSProperties;
}

/**
 * マークダウンプレビューのプロパティ型
 */
export interface MarkdownPreviewProps {
  /** プレビュー表示するマークダウンテキスト */
  markdown: string;
  /** スタイルプロパティ */
  style?: React.CSSProperties;
}

/**
 * マークダウンコンポーネントのプロパティ型
 */
export interface MarkdownComponentProps {
  /** コンポーネントの子要素 */
  children?: React.ReactNode;
  /** コンポーネントのクラス名 */
  className?: string;
}

/**
 * バリデーション結果表示のプロパティ型
 */
export interface ValidationResultsProps {
  /** 表示するバリデーション結果の配列 */
  results: ValidationResult[];
}

/**
 * バリデーションタブのプロパティ型
 */
export interface ValidationTabsProps {
  /** 表示するバリデーション結果の配列 */
  results: ValidationResult[];
} 