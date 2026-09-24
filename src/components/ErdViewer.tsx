import React, { useEffect, useRef, useState } from 'react';

interface ErdViewerProps {
  mermaidCode: string;
  databaseName: string;
}

declare global {
  interface Window {
    mermaid?: any;
  }
}

export const ErdViewer: React.FC<ErdViewerProps> = ({ mermaidCode, databaseName }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svgContent, setSvgContent] = useState<string>('');
  const [renderError, setRenderError] = useState<string>('');
  const [scale, setScale] = useState<number>(1);
  const [showCode, setShowCode] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    setScale(1);
    setRenderError('');

    const renderDiagram = async () => {
      try {
        if (!window.mermaid) {
          // Wait for mermaid to initialize if loading asynchronously
          await new Promise((resolve, reject) => {
            let attempts = 0;
            const check = () => {
              if (window.mermaid) resolve(true);
              else if (attempts > 30) reject(new Error('Mermaid.js chưa sẵn sàng.'));
              else {
                attempts++;
                setTimeout(check, 100);
              }
            };
            check();
          });
        }

        const id = `mermaid-erd-${Math.random().toString(36).substring(2, 9)}`;
        try {
          const { svg } = await window.mermaid.render(id, mermaidCode);
          if (isMounted) {
            setSvgContent(svg);
            setRenderError('');
          }
        } catch (err: any) {
          const errEl = document.getElementById(`d${id}`) || document.getElementById(id);
          if (errEl) errEl.remove();
          if (isMounted) {
            console.error('Lỗi render Mermaid ERD:', err);
            setRenderError(err?.message || 'Không thể hiển thị lược đồ quan hệ.');
          }
        }
      } catch (err: any) {
        if (isMounted) {
          setRenderError(err?.message || 'Không thể tải thư viện vẽ sơ đồ.');
        }
      }
    };

    renderDiagram();

    return () => {
      isMounted = false;
    };
  }, [mermaidCode]);

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(mermaidCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-2xs overflow-hidden flex flex-col h-full">
      {/* Top Controls Bar */}
      <div className="p-3 bg-slate-50/80 border-b border-slate-200 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
            Sơ đồ quan hệ thực thể (ERD) - {databaseName}
          </h3>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Zoom controls */}
          <div className="flex items-center bg-white border border-slate-200 rounded-lg shadow-2xs p-0.5">
            <button
              type="button"
              onClick={() => setScale((s) => Math.max(0.6, s - 0.15))}
              className="px-2 py-1 text-slate-600 hover:text-slate-900 text-xs font-semibold rounded hover:bg-slate-100 cursor-pointer"
              title="Thu nhỏ"
            >
              <i className="fa-solid fa-minus"></i>
            </button>
            <span className="px-2 py-0.5 text-[11px] font-mono font-medium text-slate-600">
              {Math.round(scale * 100)}%
            </span>
            <button
              type="button"
              onClick={() => setScale((s) => Math.min(1.8, s + 0.15))}
              className="px-2 py-1 text-slate-600 hover:text-slate-900 text-xs font-semibold rounded hover:bg-slate-100 cursor-pointer"
              title="Phóng to"
            >
              <i className="fa-solid fa-plus"></i>
            </button>
            <button
              type="button"
              onClick={() => setScale(1)}
              className="px-1.5 py-1 text-slate-400 hover:text-slate-700 text-[10px] rounded hover:bg-slate-100 cursor-pointer"
              title="Tỷ lệ 100%"
            >
              1:1
            </button>
          </div>

          {/* Toggle Raw Code */}
          <button
            type="button"
            onClick={() => setShowCode(!showCode)}
            className={`px-2.5 py-1 text-xs font-medium rounded-lg border transition-colors cursor-pointer flex items-center gap-1.5 ${
              showCode
                ? 'bg-indigo-50 border-indigo-300 text-indigo-700'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <i className="fa-solid fa-code text-[11px]"></i>
            <span className="hidden sm:inline">{showCode ? 'Xem Sơ Đồ' : 'Xem Mermaid Code'}</span>
          </button>

          {/* Copy Code */}
          <button
            type="button"
            onClick={handleCopyCode}
            className="p-1.5 text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 text-xs cursor-pointer"
            title="Sao chép cú pháp Mermaid"
          >
            <i className={`fa-solid ${copied ? 'fa-check text-emerald-600' : 'fa-copy'}`}></i>
          </button>
        </div>
      </div>

      {/* Main Diagram Area */}
      <div className="flex-1 overflow-auto bg-slate-50/40 p-4 min-h-[360px] flex items-center justify-center relative">
        {showCode ? (
          <div className="w-full h-full max-h-[380px] bg-slate-900 text-indigo-200 p-4 rounded-lg font-mono text-xs overflow-auto">
            <pre>{mermaidCode}</pre>
          </div>
        ) : renderError ? (
          <div className="text-center p-6 bg-rose-50 border border-rose-200 rounded-xl max-w-md">
            <i className="fa-solid fa-triangle-exclamation text-2xl text-rose-500 mb-2"></i>
            <h4 className="font-semibold text-sm text-rose-900">Không thể vẽ sơ đồ ERD</h4>
            <p className="text-xs text-rose-700 mt-1">{renderError}</p>
          </div>
        ) : svgContent ? (
          <div
            ref={containerRef}
            className="transition-transform duration-150 origin-center flex items-center justify-center w-full"
            style={{ transform: `scale(${scale})` }}
            dangerouslySetInnerHTML={{ __html: svgContent }}
          />
        ) : (
          <div className="text-center text-slate-400 py-10">
            <i className="fa-solid fa-circle-notch fa-spin text-2xl mb-2 text-indigo-500"></i>
            <p className="text-xs">Đang sinh sơ đồ Mermaid ERD...</p>
          </div>
        )}
      </div>

      {/* ERD Legend Footer */}
      <div className="px-4 py-2 bg-white border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500 flex-wrap gap-2">
        <div className="flex items-center gap-4 flex-wrap">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-xs bg-amber-400"></span>
            <strong>PK</strong>: Khóa chính (Primary Key)
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-xs bg-indigo-400"></span>
            <strong>FK</strong>: Khóa ngoại (Foreign Key)
          </span>
          <span className="flex items-center gap-1">
            <span className="text-indigo-600 font-mono font-bold">||--o&#123;</span>
            Quan hệ Một - Nhiều (1 - N)
          </span>
        </div>
        <span className="text-slate-400">Render bằng Mermaid.js v10</span>
      </div>
    </div>
  );
};
