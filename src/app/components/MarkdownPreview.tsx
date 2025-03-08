'use client'

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { MarkdownPreviewProps, MarkdownComponentProps } from '../types';

const MarkdownPreview: React.FC<MarkdownPreviewProps> = ({ markdown, style }) => {
  return (
    <div className="flex flex-col h-full">
      <h2 className="text-lg font-semibold mb-2">プレビュー</h2>
      <div 
        className="w-full p-3 border border-gray-300 rounded-md overflow-auto bg-white prose prose-sm max-w-none flex-grow"
        style={style}
      >
        <ReactMarkdown 
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({children, ...props}: MarkdownComponentProps) => <h1 className="text-xl font-bold mt-3 mb-2" {...props}>{children}</h1>,
            h2: ({children, ...props}: MarkdownComponentProps) => <h2 className="text-lg font-bold mt-2 mb-1" {...props}>{children}</h2>,
            h3: ({children, ...props}: MarkdownComponentProps) => <h3 className="text-base font-bold mt-2 mb-1" {...props}>{children}</h3>,
            h4: ({children, ...props}: MarkdownComponentProps) => <h4 className="text-sm font-bold mt-1 mb-1" {...props}>{children}</h4>,
            h5: ({children, ...props}: MarkdownComponentProps) => <h5 className="text-xs font-bold mt-1 mb-1" {...props}>{children}</h5>,
            h6: ({children, ...props}: MarkdownComponentProps) => <h6 className="text-xs font-bold mt-1 mb-1" {...props}>{children}</h6>,
            p: ({children, ...props}: MarkdownComponentProps) => <p className="my-1 text-sm" {...props}>{children}</p>,
            ul: ({children, ...props}: MarkdownComponentProps) => <ul className="list-disc pl-4 my-1 text-sm" {...props}>{children}</ul>,
            ol: ({children, ...props}: MarkdownComponentProps) => <ol className="list-decimal pl-4 my-1 text-sm" {...props}>{children}</ol>,
            li: ({children, ...props}: MarkdownComponentProps) => <li className="my-0.5" {...props}>{children}</li>,
            blockquote: ({children, ...props}: MarkdownComponentProps) => <blockquote className="border-l-4 border-gray-300 pl-3 my-1 italic text-sm" {...props}>{children}</blockquote>,
            code: ({children, className, ...props}: MarkdownComponentProps) => 
              !className ? (
                <code className="bg-gray-100 rounded px-1 text-sm" {...props}>{children}</code>
              ) : (
                <code className="block bg-gray-100 p-2 rounded text-sm" {...props}>{children}</code>
              ),
            pre: ({children, ...props}: MarkdownComponentProps) => <pre className="bg-gray-100 p-3 rounded my-1 overflow-auto text-sm" {...props}>{children}</pre>,
            table: ({children, ...props}: MarkdownComponentProps) => <table className="min-w-full border border-gray-300 my-1 text-sm" {...props}>{children}</table>,
            th: ({children, ...props}: MarkdownComponentProps) => <th className="border border-gray-300 px-3 py-1 bg-gray-100 text-sm" {...props}>{children}</th>,
            td: ({children, ...props}: MarkdownComponentProps) => <td className="border border-gray-300 px-3 py-1 text-sm" {...props}>{children}</td>,
          }}
        >
          {markdown}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default MarkdownPreview; 