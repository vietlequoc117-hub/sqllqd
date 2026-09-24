import React, { useState, useEffect } from 'react';
import { SampleQuery } from '../types';
import { formatSql } from '../lib/formatSql';

interface SqlEditorProps {
  sql: string;
  onChange: (sql: string) => void;
  onExecute: () => void;
  isExecuting: boolean;
  sampleQueries: SampleQuery[];
  onExplain: () => void;
  isExplaining: boolean;
}

export const SqlEditor: React.FC<SqlEditorProps> = ({
  sql,
  onChange,
  onExecute,
  isExecuting,
  sampleQueries,
  onExplain,
  isExplaining,
}) => {
  const [selectedSample, setSelectedSample] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  // Handle Ctrl + Enter / Cmd + Enter
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      onExecute();
    }
  };

  const handleApplySample = (q: SampleQuery) => {
    onChange(q.sql);
    setSelectedSample(q.title);
  };

  const handleCopySql = async () => {
    try {
      await navigator.clipboard.writeText(sql);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  const handleFormatSql = () => {
    if (!sql.trim()) return;
    const formatted = formatSql(sql);
    onChange(formatted);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-2xs overflow-hidden flex flex-col">
      {/* Editor Header */}
      <div className="p-3 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs">
            <i className="fa-solid fa-terminal"></i>
          </div>
          <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            Trình Soạn Thảo SQL (SQLite)
          </h2>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          {/* Format Keywords & Multiline Structure */}
          <button
            type="button"
            onClick={handleFormatSql}
            title="Định dạng chuẩn cấu trúc câu lệnh SQL (SELECT, FROM, WHERE xuống dòng, viết hoa từ khóa)"
            className="px-2.5 py-1 text-xs text-indigo-700 hover:text-indigo-900 bg-indigo-50/70 hover:bg-indigo-100 border border-indigo-200/80 rounded-md cursor-pointer transition-colors flex items-center gap-1 font-medium"
          >
            <i className="fa-solid fa-align-left text-[11px] text-indigo-600"></i>
            <span>Format Cấu trúc</span>
          </button>

          {/* Copy SQL */}
          <button
            type="button"
            onClick={handleCopySql}
            title="Sao chép câu lệnh SQL"
            className="p-1.5 text-xs text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-100 border border-slate-200 rounded-md cursor-pointer transition-colors"
          >
            <i className={`fa-solid ${copied ? 'fa-check text-emerald-600' : 'fa-copy'}`}></i>
          </button>

          {/* Clear Editor */}
          <button
            type="button"
            onClick={() => onChange('')}
            title="Xóa trắng khung soạn thảo"
            className="p-1.5 text-xs text-slate-500 hover:text-rose-600 bg-white hover:bg-rose-50 border border-slate-200 rounded-md cursor-pointer transition-colors"
          >
            <i className="fa-solid fa-trash-can"></i>
          </button>

          {/* Gemini Explain Query */}
          <button
            type="button"
            onClick={onExplain}
            disabled={!sql.trim() || isExplaining}
            className="px-2.5 py-1 text-xs font-medium text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-md cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5"
            title="Hỏi Gemini giải thích chi tiết cấu trúc câu lệnh SQL này"
          >
            <i className={`fa-solid ${isExplaining ? 'fa-circle-notch fa-spin' : 'fa-lightbulb'} text-purple-600`}></i>
            <span>{isExplaining ? 'Đang phân tích...' : 'Giải thích câu này'}</span>
          </button>

          {/* Run Execute Button */}
          <button
            type="button"
            id="btn-run-sql"
            onClick={onExecute}
            disabled={isExecuting || !sql.trim()}
            className="px-4 py-1 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:scale-98 border border-transparent rounded-md shadow-xs cursor-pointer transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5"
          >
            <i className={`fa-solid ${isExecuting ? 'fa-circle-notch fa-spin' : 'fa-play'} text-[11px]`}></i>
            <span>Chạy lệnh</span>
            <kbd className="hidden sm:inline bg-indigo-700/60 px-1.5 py-0.5 rounded text-[10px] font-mono text-indigo-100 border border-indigo-500/30">
              Ctrl+Enter
            </kbd>
          </button>
        </div>
      </div>

      {/* Textarea Area */}
      <div className="relative">
        <textarea
          value={sql}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Nhập câu lệnh SQL tại đây... (Ví dụ: SELECT * FROM HOC_SINH WHERE Toan >= 8.0;)"
          rows={5}
          spellCheck={false}
          className="w-full p-3 font-mono text-xs sm:text-sm bg-slate-950 text-indigo-100 placeholder:text-slate-500 focus:outline-hidden resize-y leading-relaxed selection:bg-indigo-500 selection:text-white"
        />
        <div className="absolute right-2 bottom-2 text-[10px] text-slate-500 font-mono pointer-events-none select-none">
          {sql.trim().split(/\s+/).filter(Boolean).length} từ • {sql.length} ký tự
        </div>
      </div>

      {/* Practice Suggestions / Sample Queries */}
      <div className="p-3 bg-slate-50/70 border-t border-slate-200">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <i className="fa-solid fa-list-check text-indigo-600"></i>
            Gợi ý câu hỏi thực hành ({sampleQueries.length}):
          </span>
          <span className="text-[11px] text-slate-400">Nhấp để điền nhanh vào trình soạn thảo</span>
        </div>

        <div className="grid grid-cols-1 gap-1.5 max-h-36 overflow-y-auto pr-1">
          {sampleQueries.map((q, idx) => {
            const isSelected = selectedSample === q.title;
            const diffColor =
              q.difficulty === 'Cơ bản'
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                : q.difficulty === 'Trung bình'
                ? 'bg-amber-50 text-amber-700 border-amber-200'
                : 'bg-rose-50 text-rose-700 border-rose-200';

            return (
              <div
                key={idx}
                onClick={() => handleApplySample(q)}
                className={`p-2 rounded-lg border text-left cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-indigo-50/80 border-indigo-300 ring-1 ring-indigo-200'
                    : 'bg-white hover:bg-slate-100/80 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold text-slate-400 font-mono">#{idx + 1}</span>
                    <h3 className="text-xs font-medium text-slate-800 line-clamp-1">{q.title}</h3>
                  </div>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium border shrink-0 ${diffColor}`}>
                    {q.difficulty}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1 italic">
                  {q.explanation}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
