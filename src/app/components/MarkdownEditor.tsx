'use client'

import React from 'react';
import { MarkdownEditorProps } from '../types';

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({ markdown, onChange, style }) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-lg font-semibold mb-2">Markdown入力</h2>
      <textarea
        className="w-full p-3 border border-gray-300 rounded-md font-mono text-sm flex-grow"
        value={markdown}
        onChange={handleChange}
        placeholder="ここにMarkdownを入力してください..."
        style={style}
      />
    </div>
  );
};

export default MarkdownEditor; 