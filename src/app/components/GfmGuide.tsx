import React, { useState, useRef, useEffect } from "react";

interface GfmGuideProps {
  onClose: () => void;
}

// マークダウンガイドコンポーネント
const GfmGuide: React.FC<GfmGuideProps> = ({ onClose }) => {
  const [position, setPosition] = useState({
    x: window.innerWidth - 680,
    y: 60,
  });
  const [size, setSize] = useState({ width: 650, height: 500 });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [resizeStart, setResizeStart] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const [docsExpanded, setDocsExpanded] = useState(true);
  const guideRef = useRef<HTMLDivElement>(null);

  // ドラッグ開始ハンドラー
  const handleDragStart = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  // リサイズ開始ハンドラー
  const handleResizeStart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);
    setResizeStart({
      x: e.clientX,
      y: e.clientY,
      width: size.width,
      height: size.height,
    });
  };

  // マウス移動ハンドラー
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        // 移動処理
        const newX = Math.max(
          0,
          Math.min(e.clientX - dragStart.x, window.innerWidth - size.width)
        );
        const newY = Math.max(
          0,
          Math.min(e.clientY - dragStart.y, window.innerHeight - size.height)
        );
        setPosition({ x: newX, y: newY });
      } else if (isResizing) {
        // リサイズ処理
        const newWidth = Math.max(
          300,
          Math.min(
            resizeStart.width + (e.clientX - resizeStart.x),
            window.innerWidth - position.x
          )
        );
        const newHeight = Math.max(
          200,
          Math.min(
            resizeStart.height + (e.clientY - resizeStart.y),
            window.innerHeight - position.y
          )
        );
        setSize({ width: newWidth, height: newHeight });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
    };

    if (isDragging || isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, isResizing, dragStart, resizeStart, position, size]);

  // 公式ドキュメントの折りたたみ切り替え
  const toggleDocs = () => {
    setDocsExpanded(!docsExpanded);
  };

  return (
    <div
      ref={guideRef}
      className="fixed z-50 bg-white border border-gray-300 rounded-md shadow-xl overflow-hidden flex flex-col"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${size.width}px`,
        height: `${size.height}px`,
        backgroundColor: "white",
      }}
    >
      <div
        className="sticky top-0 bg-white border-b flex justify-between items-center p-2 cursor-move z-10"
        onMouseDown={handleDragStart}
      >
        <h2 className="text-lg font-semibold select-none">
          マークダウンガイド
        </h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 p-2"
        >
          ✕
        </button>
      </div>

      <div className="border-b">
        <div
          className="p-2 flex justify-between items-center cursor-pointer hover:bg-gray-50"
          onClick={toggleDocs}
        >
          <h2 className="text-lg font-semibold">公式ドキュメント</h2>
          <span className="text-gray-500">{docsExpanded ? "▼" : "▶"}</span>
        </div>

        {docsExpanded && (
          <div className="p-3 border-t">
            <ul className="list-disc pl-4 space-y-1 text-sm">
              <li>
                <a
                  href="https://github.github.com/gfm/"
                  className="text-blue-600 hover:text-blue-800 underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub Flavored Markdown 仕様
                </a>
              </li>
              <li>
                <a
                  href="https://unifiedjs.com/"
                  className="text-blue-600 hover:text-blue-800 underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  unified (構文解析エンジン)
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/remarkjs/remark"
                  className="text-blue-600 hover:text-blue-800 underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  remark (Markdownプロセッサー)
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/remarkjs/remark-lint"
                  className="text-blue-600 hover:text-blue-800 underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  remark-lint (Markdownリンター)
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>

      <div className="p-3 overflow-auto flex-grow">
        <h3 className="text-lg font-semibold mb-2">GFM文法ガイド</h3>
        <div className="text-sm mb-2 text-gray-500 italic">
          引用元:{" "}
          <a
            href="https://github.github.com/gfm/"
            className="text-blue-600 hover:text-blue-800 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub Flavored Markdown Spec
          </a>
          および
          <a
            href="https://docs.github.com/ja/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax"
            className="text-blue-600 hover:text-blue-800 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub Docs
          </a>
        </div>
        <div className="text-sm">
          <ul className="list-disc pl-4 space-y-1">
            <li>
              <strong>見出し:</strong> # 見出し1, ## 見出し2
              (#の後にはスペースが必要)
            </li>
            <li>
              <strong>見出しの順序:</strong>{" "}
              見出しレベルは順番に使用する必要があります（H1の後にH3は使用できません）
            </li>
            <li>
              <strong>強調:</strong> *イタリック*, **太字**,
              ***太字イタリック***
            </li>
            <li>
              <strong>リスト:</strong> - 項目 または 1. 項目
              (記号の後にスペースが必要)
            </li>
            <li>
              <strong>リストの順序:</strong>{" "}
              番号付きリストは連続した番号である必要はありませんが、最初の項目は1から始める必要があります
            </li>
            <li>
              <strong>リストのネスト:</strong>{" "}
              サブリストは親リストより4スペース以上インデントする必要があります
            </li>
            <li>
              <strong>タスクリスト:</strong> - [ ] 未完了タスク, - [x]
              完了タスク
            </li>
            <li>
              <strong>リンク:</strong> [リンクテキスト](URL) または {`<URL>`}
            </li>
            <li>
              <strong>画像:</strong> ![代替テキスト](画像URL)
            </li>
            <li>
              <strong>引用:</strong> {`>`} 引用文 ({`>`}の後にスペースが必要)
            </li>
            <li>
              <strong>引用のネスト:</strong> {`>`} {`>`} 二重引用 (複数の{`>`}
              で引用をネストできます)
            </li>
            <li>
              <strong>コード:</strong> `インラインコード` または
              ```言語\nコードブロック\n```
            </li>
            <li>
              <strong>水平線:</strong> --- または *** または ___
            </li>
            <li>
              <strong>テーブル:</strong> | 見出し | 見出し |\n| --- | --- |\n|
              セル | セル |
            </li>
            <li>
              <strong>取り消し線:</strong> ~~取り消し線~~
            </li>
            <li>
              <strong>自動リンク:</strong> {`<https://example.com>`}{" "}
              または単なるURLも自動リンク
            </li>
          </ul>
        </div>
      </div>

      {/* リサイズハンドル */}
      <div
        className="absolute bottom-0 right-0 w-6 h-6 cursor-nwse-resize"
        onMouseDown={handleResizeStart}
        style={{
          backgroundImage:
            "linear-gradient(135deg, transparent 50%, rgba(0,0,0,0.3) 50%)",
        }}
      />
    </div>
  );
};

export default GfmGuide;
