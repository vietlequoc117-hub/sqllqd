import React, { useState } from 'react';
import { QueryResult } from '../types';

interface QueryResultProps {
  result: QueryResult | null;
  onAskGeminiFix: (sql: string, error: string) => void;
  isFixing: boolean;
}

export const QueryResultView: React.FC<QueryResultProps> = ({
  result,
  onAskGeminiFix,
  isFixing,
}) => {
  const [copied, setCopied] = useState<boolean>(false);

  if (!result) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl p-8 text-center text-slate-400 shadow-2xs">
        <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 text-lg">
          <i className="fa-solid fa-play"></i>
        </div>
        <h3 className="text-sm font-semibold text-slate-700">Chưa có kết quả thực thi</h3>
        <p className="text-xs text-slate-500 mt-1">
          Nhập câu lệnh SQL phía trên hoặc chọn một câu mẫu rồi nhấn <strong>Chạy lệnh (Ctrl+Enter)</strong>.
        </p>
      </div>
    );
  }

  const handleCopyJson = async () => {
    try {
      if (result.columns && result.values) {
        const json = result.values.map((row) => {
          const obj: Record<string, any> = {};
          result.columns.forEach((col, idx) => {
            obj[col] = row[idx];
          });
          return obj;
        });
        await navigator.clipboard.writeText(JSON.stringify(json, null, 2));
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleExportCsv = () => {
    if (!result.columns || !result.values) return;
    const header = result.columns.join(',');
    const rows = result.values.map((r) =>
      r.map((val) => (val === null ? '' : `"${String(val).replace(/"/g, '""')}"`)).join(',')
    );
    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [header, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `sql_result_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // 1. Error state
  if (result.error) {
    return (
      <div className="bg-rose-50/70 border border-rose-200 rounded-xl p-4 shadow-2xs">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 text-sm mt-0.5">
            <i className="fa-solid fa-triangle-exclamation"></i>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-xs font-bold text-rose-900 uppercase tracking-wide">
                Lỗi cú pháp / Thực thi SQL
              </h3>
              <span className="text-[10px] text-rose-400 font-mono">
                {result.executionTimeMs} ms • {result.timestamp}
              </span>
            </div>
            <div className="mt-1.5 p-2.5 bg-white border border-rose-200 rounded-md font-mono text-xs text-rose-700 leading-relaxed overflow-x-auto">
              {result.error}
            </div>

            <div className="mt-3 flex items-center gap-3">
              <button
                type="button"
                id="btn-ask-gemini-fix"
                onClick={() => onAskGeminiFix(result.rawQuery, result.error!)}
                disabled={isFixing}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 active:scale-98 rounded-lg shadow-xs cursor-pointer transition-all disabled:opacity-60"
              >
                <i className={`fa-solid ${isFixing ? 'fa-circle-notch fa-spin' : 'fa-wand-magic-sparkles'}`}></i>
                <span>{isFixing ? 'Gemini đang phân tích sửa lỗi...' : 'Hỏi Gemini sửa lỗi này'}</span>
              </button>
              <span className="text-[11px] text-rose-600 hidden sm:inline">
                AI sẽ chỉ rõ nguyên nhân và đưa ra câu lệnh sửa lỗi sẵn sàng áp dụng.
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 2. DML or DDL state (No rows returned, e.g. INSERT, UPDATE, DELETE)
  if (result.queryType === 'DML' || result.queryType === 'DDL' || result.columns.length === 0) {
    return (
      <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-4 shadow-2xs">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 text-sm">
              <i className="fa-solid fa-circle-check"></i>
            </div>
            <div>
              <h3 className="text-xs font-bold text-emerald-900 uppercase tracking-wide">
                Thực thi lệnh {result.queryType} thành công!
              </h3>
              <p className="text-xs text-emerald-700 mt-0.5">
                {result.affectedRows !== undefined
                  ? `Đã cập nhật: ${result.affectedRows} bản ghi bị ảnh hưởng.`
                  : 'Câu lệnh đã thực thi thành công.'}
              </p>
            </div>
          </div>
          <div className="text-right text-[11px] text-emerald-600 font-mono shrink-0">
            <div>{result.executionTimeMs} ms</div>
            <div className="text-[10px] text-emerald-500">{result.timestamp}</div>
          </div>
        </div>
      </div>
    );
  }

  // 3. SELECT Tabular result
  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-2xs overflow-hidden flex flex-col">
      {/* Result Meta Header */}
      <div className="p-3 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <h3 className="font-bold text-slate-800 uppercase tracking-wider">
            Kết Quả Truy Vấn (Query Result)
          </h3>
          <span className="bg-indigo-100 text-indigo-800 text-[11px] font-semibold px-2 py-0.5 rounded-full">
            {result.values.length} dòng
          </span>
          <span className="text-slate-500 font-mono text-[11px]">
            ({result.executionTimeMs} ms)
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={handleCopyJson}
            title="Sao chép kết quả dưới dạng JSON"
            className="px-2 py-1 bg-white hover:bg-slate-100 border border-slate-200 rounded-md text-slate-700 cursor-pointer text-xs flex items-center gap-1"
          >
            <i className={`fa-solid ${copied ? 'fa-check text-emerald-600' : 'fa-copy'}`}></i>
            <span className="hidden sm:inline">JSON</span>
          </button>
          <button
            type="button"
            onClick={handleExportCsv}
            title="Tải kết quả về máy dạng CSV"
            className="px-2 py-1 bg-white hover:bg-slate-100 border border-slate-200 rounded-md text-slate-700 cursor-pointer text-xs flex items-center gap-1"
          >
            <i className="fa-solid fa-file-csv text-emerald-600"></i>
            <span className="hidden sm:inline">Xuất CSV</span>
          </button>
        </div>
      </div>

      {/* Result Table */}
      <div className="overflow-x-auto max-h-72">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-100/90 border-b border-slate-200 text-slate-700 font-semibold sticky top-0 z-10 uppercase tracking-wider">
              <th className="py-2 px-3 w-10 text-center text-slate-400 font-mono">#</th>
              {result.columns.map((colName, idx) => (
                <th key={idx} className="py-2 px-3 whitespace-nowrap text-slate-800 font-semibold">
                  {colName}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-mono">
            {result.values.map((row, rowIdx) => (
              <tr key={rowIdx} className="hover:bg-indigo-50/20 transition-colors">
                <td className="py-1.5 px-3 text-center text-slate-400 text-[10px] select-none bg-slate-50/40">
                  {rowIdx + 1}
                </td>
                {row.map((val, colIdx) => (
                  <td key={colIdx} className="py-1.5 px-3 whitespace-nowrap text-slate-800">
                    {val === null ? (
                      <span className="italic text-slate-400 bg-slate-100 px-1 py-0.2 rounded text-[10px] font-sans">
                        NULL
                      </span>
                    ) : typeof val === 'number' ? (
                      <span className="text-blue-700 font-semibold">{val}</span>
                    ) : (
                      <span>{String(val)}</span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
