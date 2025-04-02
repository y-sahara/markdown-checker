"use client";

import React, { useState } from "react";
import { ValidationCategory, ValidationTabsProps, TabInfo } from "../types";
import ValidationResults from "./ValidationResults";

const ValidationTabs: React.FC<ValidationTabsProps> = ({ results }) => {
  const [activeTab, setActiveTab] = useState<ValidationCategory>(
    ValidationCategory.GENERAL
  );

  const tabs: TabInfo[] = [
    {
      id: ValidationCategory.GENERAL,
      label: "すべて",
      description: "すべてのバリデーション結果を表示します",
    },
    {
      id: ValidationCategory.HEADING,
      label: "見出し",
      description: "見出しの書式や順序に関するルールをチェックします",
    },
    {
      id: ValidationCategory.LIST,
      label: "リスト",
      description: "番号付きリストや箇条書きリストのルールをチェックします",
    },
    {
      id: ValidationCategory.TABLE,
      label: "テーブル",
      description: "テーブルの書式や構造をチェックします",
    },
    {
      id: ValidationCategory.TASK_LIST,
      label: "タスク",
      description: "タスクリストの書式をチェックします",
    },
    {
      id: ValidationCategory.STRIKETHROUGH,
      label: "取消線",
      description: "取り消し線の書式をチェックします",
    },
    {
      id: ValidationCategory.AUTOLINK,
      label: "リンク",
      description: "URLの自動リンク化に関するルールをチェックします",
    },
  ];

  // 現在のタブに応じたバリデーション結果をフィルタリング
  const filteredResults =
    activeTab === ValidationCategory.GENERAL
      ? results
      : results.filter((result) => result.category === activeTab);

  // 各カテゴリのエラー数をカウント
  const getCategoryCount = (category: ValidationCategory) => {
    return category === ValidationCategory.GENERAL
      ? results.length
      : results.filter((result) => result.category === category).length;
  };

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-3">バリデーション結果</h2>

      <div className="mb-4">
        <div className="flex flex-wrap gap-1 border-b pb-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`px-3 py-1 text-sm rounded-t-lg ${
                activeTab === tab.id
                  ? "bg-blue-500 text-white font-medium"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
              {getCategoryCount(tab.id) > 0 && (
                <span
                  className={`ml-1 px-1.5 py-0.5 text-xs rounded-full ${
                    activeTab === tab.id
                      ? "bg-white text-blue-800"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {getCategoryCount(tab.id)}
                </span>
              )}
            </button>
          ))}
        </div>
        <div className="p-2 bg-white border text-sm text-gray-600">
          {tabs.find((tab) => tab.id === activeTab)?.description}
        </div>
      </div>

      {filteredResults.length === 0 ? (
        <div className="p-4 bg-green-100 text-green-800 rounded-md">
          このカテゴリにはエラーはありません。
        </div>
      ) : (
        <ValidationResults results={filteredResults} />
      )}
    </div>
  );
};

export default ValidationTabs;
