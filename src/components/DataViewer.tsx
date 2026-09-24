import React, { useState } from 'react';
import { TableData } from '../types';

interface DataViewerProps {
  tables: TableData[];
  onRefresh: () => void;
}

export const DataViewer: React.FC<DataViewerProps> = ({ tables, onRefresh }) => {
  const [selectedTable, setSelectedTable] = useState<string>(tables[0]?.tableName || '');
  const [searchFilter, setSearchFilter] = useState<string>('');

  // Keep selected table valid if tables change
  const currentTable = tables.find((t) => t.tableName === selectedTable) || tables[0];

  if (!tables || tables.length === 0) {
    return (
      <div className="p-8 text-center text-slate-500 bg-white rounded-xl border border-slate-200">
        <i className="fa-solid fa-table text-3xl mb-2 text-slate-300"></i>
        <p className="text-sm">Chưa có bảng nào trong cơ sở dữ liệu hiện tại.</p>
      </div>
    );
  }

  // Filter rows based on search
  const filteredRows = currentTable?.rows.filter((row) => {
    if (!searchFilter.trim()) return true;
    const q = searchFilter.toLowerCase();
    return row.some((cell) => (cell !== null && cell !== undefined ? String(cell).toLowerCase().includes(q) : false));
  }) || [];

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-2xs overflow-hidden flex flex-col h-full">
      {/* Table Tabs & Controls */}
      <div className="p-3 bg-slate-50/70 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 max-w-full">
          {tables.map((t) => {
            const isActive = (currentTable?.tableName === t.tableName);
            return (
              <button
                key={t.tableName}
                type="button"
                onClick={() => {
                  setSelectedTable(t.tableName);
                  setSearchFilter('');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-slate-200/70 border border-slate-200'
                }`}
              >
                <i className="fa-solid fa-table-cells text-[11px]"></i>
                <span>{t.tableName}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    isActive ? 'bg-indigo-800/60 text-indigo-100' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {t.rowCount}
                </span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          {/* Quick Search in table */}
          <div className="relative flex-1 sm:w-44">
            <input
              type="text"
              placeholder="Lọc dữ liệu..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="w-full pl-7 pr-2 py-1 text-xs bg-white border border-slate-300 rounded-md focus:outline-hidden focus:ring-1 focus:ring-indigo-500 placeholder:text-slate-400"
            />
            <i className="fa-solid fa-magnifying-glass absolute left-2.5 top-2 text-[10px] text-slate-400"></i>
            {searchFilter && (
              <button
                onClick={() => setSearchFilter('')}
                className="absolute right-2 top-1.5 text-slate-400 hover:text-slate-600 text-[10px]"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={onRefresh}
            title="Làm mới bảng dữ liệu"
            className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-200/60 rounded-md text-xs cursor-pointer"
          >
            <i className="fa-solid fa-arrows-rotate"></i>
          </button>
        </div>
      </div>

      {/* Table Schema Info Bar */}
      {currentTable && (
        <div className="px-4 py-2 bg-indigo-50/40 border-b border-indigo-100/60 flex items-center justify-between text-xs text-slate-600">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-indigo-950 flex items-center gap-1">
              <i className="fa-solid fa-fingerprint text-indigo-500"></i>
              Cấu trúc bảng {currentTable.tableName}:
            </span>
            <div className="flex items-center gap-1.5 flex-wrap">
              {currentTable.columnDetails.map((col) => (
                <span
                  key={col.name}
                  className={`inline-flex items-center gap-1 text-[11px] px-1.5 py-0.5 rounded border ${
                    col.pk
                      ? 'bg-amber-50 text-amber-900 border-amber-300 font-semibold'
                      : 'bg-white text-slate-700 border-slate-200'
                  }`}
                  title={`${col.name} (${col.type})${col.pk ? ' - Khóa chính (PK)' : ''}${col.notnull ? ' - NOT NULL' : ''}`}
                >
                  {col.pk ? <i className="fa-solid fa-key text-[9px] text-amber-600"></i> : null}
                  <span>{col.name}</span>
                  <span className="text-[10px] text-slate-400 font-mono">[{col.type}]</span>
                </span>
              ))}
            </div>
          </div>
          <span className="text-[11px] text-slate-500 whitespace-nowrap shrink-0">
            {filteredRows.length} / {currentTable.rowCount} bản ghi
          </span>
        </div>
      )}

      {/* Table Content */}
      <div className="overflow-x-auto flex-1 max-h-[380px] sm:max-h-[420px]">
        {currentTable && currentTable.columns.length > 0 ? (
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-100/80 border-b border-slate-200 text-slate-700 uppercase tracking-wider font-semibold sticky top-0 z-10">
                <th className="py-2.5 px-3 w-10 text-center text-slate-400 font-mono">#</th>
                {currentTable.columns.map((colName) => {
                  const colDetail = currentTable.columnDetails.find((c) => c.name === colName);
                  const isPk = !!colDetail?.pk;
                  return (
                    <th key={colName} className="py-2.5 px-3 font-semibold text-slate-800 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        {isPk && (
                          <span title="Primary Key">
                            <i className="fa-solid fa-key text-amber-500 text-[10px]"></i>
                          </span>
                        )}
                        <span>{colName}</span>
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 font-mono">
              {filteredRows.length > 0 ? (
                filteredRows.map((row, rowIdx) => (
                  <tr key={rowIdx} className="hover:bg-indigo-50/30 transition-colors">
                    <td className="py-2 px-3 text-center text-slate-400 text-[11px] font-mono select-none bg-slate-50/50">
                      {rowIdx + 1}
                    </td>
                    {row.map((val, colIdx) => {
                      const colType = currentTable.columnDetails[colIdx]?.type?.toUpperCase();
                      const isBooleanCol = colType === 'BOOLEAN' || typeof val === 'boolean';
                      const isTrue = val === 1 || val === true || val === '1' || val === 'true';

                      return (
                        <td key={colIdx} className="py-2 px-3 whitespace-nowrap text-slate-800">
                          {val === null ? (
                            <span className="italic text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded text-[10px] font-sans">
                              NULL
                            </span>
                          ) : isBooleanCol ? (
                            <span
                              className={`inline-flex items-center gap-1 px-1.5 py-0.2 text-[10px] font-sans rounded-full font-medium ${
                                isTrue
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : 'bg-slate-100 text-slate-600'
                              }`}
                            >
                              <i className={`fa-solid ${isTrue ? 'fa-check' : 'fa-xmark'} text-[9px]`}></i>
                              {isTrue ? 'Có / Đúng' : 'Không / Sai'}
                            </span>
                          ) : typeof val === 'number' ? (
                            <span className="text-blue-700 font-semibold">{val}</span>
                          ) : (
                            <span>{String(val)}</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={currentTable.columns.length + 1} className="py-8 text-center text-slate-400 font-sans">
                    {searchFilter ? 'Không tìm thấy dòng nào khớp với từ khóa tìm kiếm.' : 'Bảng hiện chưa có dữ liệu nào.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        ) : (
          <div className="py-8 text-center text-slate-400 font-sans">Không có cấu trúc bảng để hiển thị.</div>
        )}
      </div>
    </div>
  );
};
