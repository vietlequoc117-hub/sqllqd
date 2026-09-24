import React, { useState } from 'react';
import { DatabaseId } from '../types';
import { DATABASES } from '../data/databases';

interface HeaderProps {
  currentDbId: DatabaseId;
  onSelectDb: (id: DatabaseId) => void;
  onResetDb: () => void;
  isDbLoading: boolean;
  apiKey: string;
  onApiKeyChange: (key: string) => void;
  isEngineReady: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentDbId,
  onSelectDb,
  onResetDb,
  isDbLoading,
  apiKey,
  onApiKeyChange,
  isEngineReady,
}) => {
  const [showKeyInput, setShowKeyInput] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [tempKey, setTempKey] = useState<string>(apiKey);
  const [copied, setCopied] = useState<boolean>(false);

  const handleSaveKey = () => {
    onApiKeyChange(tempKey);
    setShowKeyInput(false);
  };

  const handleClearKey = () => {
    setTempKey('');
    onApiKeyChange('');
  };

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
                <h1 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-1.5">
                  SQL Lab Visualizer
                </h1>
                <span className="text-[11px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200 px-1.5 py-0.5 rounded-md">
                  WASM SQLite
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">
                Môi trường học & thực hành SQL trực quan với Trợ lý Gemini AI
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

            {/* API Key Configure Button */}
            <div className="relative">
              <button
                type="button"
                id="btn-open-apikey"
                onClick={() => {
                  setTempKey(apiKey);
                  setShowKeyInput(!showKeyInput);
                }}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg border transition-all cursor-pointer shadow-2xs ${
                  apiKey
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100'
                    : 'bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100'
                }`}
                title="Cấu hình Google Gemini API Key để kích hoạt tính năng AI"
              >
                <i className={`fa-solid ${apiKey ? 'fa-key text-emerald-600' : 'fa-wand-magic-sparkles text-indigo-600'}`}></i>
                <span className="hidden sm:inline">
                  {apiKey ? 'API Key: Đã lưu' : 'Gemini AI Key'}
                </span>
                <span className="sm:hidden">
                  {apiKey ? 'Key ✓' : 'AI Key'}
                </span>
              </button>

              {/* API Key Modal / Dropdown */}
              {showKeyInput && (
                <>
                  <div
                    className="fixed inset-0 z-40 bg-slate-900/20 backdrop-blur-2xs"
                    onClick={() => setShowKeyInput(false)}
                  />
                  <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white border border-slate-200 rounded-xl shadow-xl z-50 p-4 animate-in fade-in zoom-in-95 duration-150">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs">
                          <i className="fa-solid fa-sparkles"></i>
                        </div>
                        <h3 className="font-semibold text-sm text-slate-900">
                          Cấu hình Gemini API Key
                        </h3>
                      </div>
                      <button
                        onClick={() => setShowKeyInput(false)}
                        className="text-slate-400 hover:text-slate-600 text-sm p-1 rounded-md"
                      >
                        <i className="fa-solid fa-xmark"></i>
                      </button>
                    </div>

                    <div className="mt-3 space-y-3">
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Nhập Google AI Studio Key để sử dụng Text-to-SQL, giải thích truy vấn và sửa lỗi cú pháp. Key được lưu an toàn trong trình duyệt (<code className="bg-slate-100 px-1 py-0.5 rounded text-[11px]">localStorage</code>).
                      </p>

                      <div className="space-y-1">
                        <label className="block text-xs font-semibold text-slate-700">
                          Gemini API Key:
                        </label>
                        <div className="relative">
                          <input
                            type={showPassword ? 'text' : 'password'}
                            value={tempKey}
                            onChange={(e) => setTempKey(e.target.value)}
                            placeholder="AIzaSy..."
                            className="w-full pl-3 pr-10 py-1.5 text-xs font-mono bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer text-xs"
                            title={showPassword ? 'Ẩn API Key' : 'Hiện API Key'}
                          >
                            <i className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        {tempKey ? (
                          <button
                            type="button"
                            onClick={handleClearKey}
                            className="text-xs text-rose-600 hover:text-rose-700 font-medium"
                          >
                            Xóa Key
                          </button>
                        ) : (
                          <span className="text-[11px] text-slate-400">
                            Chưa có key? Lấy miễn phí tại aistudio.google.com
                          </span>
                        )}

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setShowKeyInput(false)}
                            className="px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg cursor-pointer"
                          >
                            Hủy
                          </button>
                          <button
                            type="button"
                            onClick={handleSaveKey}
                            className="px-3 py-1.5 text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-xs cursor-pointer"
                          >
                            Lưu API Key
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
