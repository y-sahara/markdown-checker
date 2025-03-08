// pages/index.js
'use client'
import { useState, useEffect } from 'react';
import Head from 'next/head';
import MarkdownEditor from './components/MarkdownEditor';
import MarkdownPreview from './components/MarkdownPreview';
import ValidationTabs from './components/ValidationTabs';
import GfmGuide from './components/GfmGuide';
import { validateMarkdown } from './utils/markdownValidator';
import { ValidationResult } from './types';

export default function Home() {
  const [markdown, setMarkdown] = useState<string>('');
  const [validationResults, setValidationResults] = useState<ValidationResult[]>([]);
  const [renderedMarkdown, setRenderedMarkdown] = useState<string>('');
  const [showGuide, setShowGuide] = useState<boolean>(false);
  const [editorHeight, setEditorHeight] = useState(400); // エディタの高さ
  
  // マークダウンが変更されたときのハンドラー
  const handleMarkdownChange = async (newValue: string) => {
    setMarkdown(newValue);
    setRenderedMarkdown(newValue);
    
    // バリデーション実行
    const results = await validateMarkdown(newValue);
    setValidationResults(results);
  };
  
  // 高さ調整ハンドラー
  const handleResizeHeight = (e: React.MouseEvent<HTMLDivElement>) => {
    const startY = e.clientY;
    const startHeight = editorHeight;
    
    const handleMouseMove = (moveEvent: MouseEvent) => {
      const newHeight = Math.max(200, startHeight + (moveEvent.clientY - startY));
      setEditorHeight(newHeight);
    };
    
    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div className="min-h-screen bg-white p-4">
      <Head>
        <title>Markdown先生</title>
        <meta name="description" content="GitHub Flavored Markdownのルールに基づいてマークダウンを検証します" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">
            Markdown先生 <span className="text-sm text-gray-500">(GitHub Flavored Markdown)</span>
          </h1>
          <button 
            onClick={() => setShowGuide(!showGuide)}
            className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded text-sm"
          >
            {showGuide ? 'ガイドを隠す' : 'マークダウンガイドを表示'}
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* マークダウン入力エリア */}
          <div className="flex flex-col">
            <MarkdownEditor 
              markdown={markdown} 
              onChange={handleMarkdownChange}
              style={{ height: `${editorHeight}px` }}
            />
            <div 
              className="h-2 bg-gray-200 cursor-ns-resize hover:bg-gray-300 flex justify-center items-center"
              onMouseDown={handleResizeHeight}
            >
              <div className="w-8 h-1 bg-gray-400 rounded"></div>
            </div>
          </div>
          
          {/* マークダウンプレビュー */}
          <div className="flex flex-col">
            <MarkdownPreview 
              markdown={renderedMarkdown} 
              style={{ height: `${editorHeight}px` }}
            />
            <div className="h-2 bg-transparent"></div>
          </div>
        </div>
        
        {/* モーダル形式のマークダウンガイド */}
        {showGuide && <GfmGuide onClose={() => setShowGuide(false)} />}
        
        {/* バリデーション結果（タブ付き） */}
        <ValidationTabs results={validationResults} />
      </main>
    </div>
  );
}