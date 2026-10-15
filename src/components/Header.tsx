import React, { useState } from 'react';
import { DatabaseId } from '../types';
import { DATABASES } from '../data/databases';

interface HeaderProps {
  currentDbId: DatabaseId;
  onSelectDb: (id: DatabaseId) => void;
  onResetDb: () => void;
  isDbLoading: boolean;
  isEngineReady: boolean;
  isAiOpen: boolean;
  onToggleAi: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentDbId,
  onSelectDb,
  onResetDb,
  isDbLoading,
  isEngineReady,
  isAiOpen,
  onToggleAi,
}) => {

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-100">
              <i className="fa-solid fa-database text-lg"></i>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-1.5 font-mono">
                  LQD_SQL_LAB
                </h1>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">
                Phòng thực hành ảo SQL
              </p>
            </div>
          </div>

          {/* Center: Database Selector & Reset Button */}
          <div className="flex items-center gap-2 sm:gap-3 flex-1 max-w-xl justify-center">
            <div className="relative flex-1 max-w-xs">
              <label htmlFor="db-select" className="sr-only">Chọn cơ sở dữ liệu mẫu</label>
              <div className="relative">
                <select
                  id="db-select"
                  value={currentDbId}
                  onChange={(e) => onSelectDb(e.target.value as DatabaseId)}
                  disabled={isDbLoading || !isEngineReady}
                  className="w-full pl-9 pr-8 py-1.5 text-xs sm:text-sm font-semibold bg-slate-50 border border-slate-300 rounded-lg text-slate-800 hover:bg-slate-100 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors cursor-pointer appearance-none shadow-2xs"
                >
                  {Object.values(DATABASES).map((db) => (
                    <option key={db.id} value={db.id}>
                      {db.name} ({db.badge})
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-indigo-600">
                  <i className={DATABASES[currentDbId]?.iconClass || 'fa-solid fa-table'}></i>
                </div>
                <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none text-slate-400">
                  <i className="fa-solid fa-chevron-down text-xs"></i>
                </div>
              </div>
            </div>

            {/* Reset Button */}
            <button
              type="button"
              id="btn-reset-db"
              onClick={onResetDb}
              disabled={isDbLoading || !isEngineReady}
              title="Khôi phục toàn bộ bảng và dữ liệu mẫu ban đầu"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 hover:text-slate-900 active:scale-98 transition-all shadow-2xs cursor-pointer shrink-0"
            >
              <i className={`fa-solid fa-rotate-right text-xs ${isDbLoading ? 'fa-spin text-indigo-600' : 'text-slate-500'}`}></i>
              <span className="hidden md:inline">Khôi phục CSDL gốc</span>
              <span className="md:hidden">Reset</span>
            </button>
          </div>

          {/* Right: Engine Status & Gemini API Key modal/dropdown */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Engine Status Indicator */}
            <div className="hidden lg:flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
              <span className={`w-2 h-2 rounded-full ${isEngineReady ? 'bg-emerald-500 animate-pulse' : 'bg-amber-400'}`}></span>
              <span>{isEngineReady ? 'Engine sẵn sàng' : 'Đang tải engine...'}</span>
            </div>

            {/* Automatic AI Assistant Button */}
            <button
              type="button"
              id="btn-toggle-ai"
              onClick={onToggleAi}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-all shadow-2xs cursor-pointer active:scale-98 ${
                isAiOpen
                  ? 'bg-indigo-600 text-white ring-2 ring-indigo-400/40 shadow-sm'
                  : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100/90 border border-emerald-200/90 hover:border-emerald-300'
              }`}
              title={isAiOpen ? 'Đóng Trợ Lý AI' : 'Nhấp để mở Trợ Lý AI'}
            >
              <span className={`w-2 h-2 rounded-full ${isAiOpen ? 'bg-white animate-pulse' : 'bg-emerald-500 animate-pulse'}`}></span>
              <i className={`fa-solid fa-wand-magic-sparkles ${isAiOpen ? 'text-white' : 'text-emerald-600'}`}></i>
              <span className="hidden sm:inline">Trợ Lý AI</span>
              <span className="sm:hidden">Trợ Lý AI</span>
              <i className={`fa-solid ${isAiOpen ? 'fa-xmark ml-1 text-xs' : 'fa-chevron-down ml-0.5 text-[10px] opacity-75'}`}></i>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
