import React, { useState } from 'react';
import { DatabaseConfig } from '../types';

interface GeminiPanelProps {
  dbConfig: DatabaseConfig;
  onApplySql: (sql: string, autoRun?: boolean) => void;
  onGenerateTextToSql: (prompt: string) => void;
  isGenerating: boolean;
  aiOutput: {
    type: 'text-to-sql' | 'explain' | 'fix' | null;
    title: string;
    rawText: string;
    sqlOnly?: string;
    error?: string;
  } | null;
  onCloseOutput: () => void;
}

export const GeminiPanel: React.FC<GeminiPanelProps> = ({
  dbConfig,
  onApplySql,
  onGenerateTextToSql,
  isGenerating,
  aiOutput,
  onCloseOutput,
}) => {
  const [naturalLanguageInput, setNaturalLanguageInput] = useState<string>('');

  const quickPromptsByDb: Record<string, string[]> = {
    HOC_SINH: [
      'Tìm học sinh nữ ở tổ 2 có điểm Văn từ 8.5 trở lên',
      'Tính điểm trung bình cả 2 môn Toán và Văn của từng tổ',
      'Liệt kê danh sách các bạn chưa vào Đoàn',
    ],
    KINH_DOANH: [
      'Tìm những khách hàng ở Hà Nội đã mua bánh Danisa',
      'Tính tổng tiền của từng hóa đơn và sắp xếp giảm dần',
      'Mặt hàng nào có số lượng bán nhiều nhất?',
    ],
    HOC_TAP: [
      'Tìm các bạn có điểm thi môn Toán từ 9.0 trở lên',
      'Thống kê số bài kiểm tra của từng học sinh',
      'Học sinh nào có điểm thi môn Ngữ văn cao nhất?',
    ],
    QL_TV: [
      'Tìm tất cả các cuốn sách của tác giả Nguyễn Nhật Ánh',
      'Liệt kê danh sách các phiếu mượn đang ở trạng thái "Đang mượn"',
      'Thống kê số lượng sách theo từng thể loại',
    ],
    AM_NHAC: [
      'Liệt kê các bản nhạc của nhạc sĩ Văn Cao kèm ca sĩ thu âm',
      'Những ca sĩ nào đã thu âm bài hát của Đỗ Nhuận?',
      'Tìm những bản nhạc được nhiều hơn 1 ca sĩ thể hiện',
    ],
  };

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!naturalLanguageInput.trim()) return;
    onGenerateTextToSql(naturalLanguageInput.trim());
  };

  return (
    <div className="bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-950 text-white rounded-xl shadow-md border border-indigo-800/60 overflow-hidden flex flex-col">
      {/* Panel Header */}
      <div className="p-3.5 bg-indigo-950/80 border-b border-indigo-800/40 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-400 flex items-center justify-center text-white text-xs shadow-xs">
            <i className="fa-solid fa-wand-magic-sparkles"></i>
          </div>
          <div>
            <h2 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              Trợ Lý Gemini AI SQL
              <span className="text-[10px] font-semibold bg-purple-500/30 text-purple-200 border border-purple-400/30 px-1.5 py-0.2 rounded-md">
                Gemini Flash
              </span>
            </h2>
            <p className="text-[11px] text-indigo-300">
              Chuyển ngôn ngữ tự nhiên thành SQL • Giải thích cú pháp • Tự động sửa lỗi
            </p>
          </div>
        </div>
      </div>

      {/* Text-to-SQL Input Box */}
      <div className="p-3.5 space-y-2.5">
        <form onSubmit={handleGenerate} className="space-y-2">
          <label className="block text-xs font-semibold text-indigo-200">
            Yêu cầu truy vấn bằng tiếng Việt (Text-to-SQL):
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={naturalLanguageInput}
              onChange={(e) => setNaturalLanguageInput(e.target.value)}
              placeholder="VD: Tìm những cuốn sách có trên 200 trang mà Trần Cương đã mượn..."
              className="flex-1 px-3 py-2 text-xs bg-slate-900/90 border border-indigo-700/60 rounded-lg text-white placeholder:text-indigo-400/60 focus:outline-hidden focus:ring-2 focus:ring-indigo-400 focus:border-transparent font-sans"
            />
            <button
              type="submit"
              disabled={isGenerating || !naturalLanguageInput.trim()}
              className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 active:scale-98 text-xs font-bold rounded-lg shadow-sm cursor-pointer transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5 shrink-0"
            >
              <i className={`fa-solid ${isGenerating ? 'fa-circle-notch fa-spin' : 'fa-sparkles'}`}></i>
              <span>{isGenerating ? 'Đang sinh SQL...' : 'Sinh câu SQL'}</span>
            </button>
          </div>
        </form>

        {/* Quick Suggestion Chips */}
        <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
          <span className="text-[10px] text-indigo-400 font-medium shrink-0">
            Gợi ý nhanh:
          </span>
          {(quickPromptsByDb[dbConfig.id] || []).map((prompt, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setNaturalLanguageInput(prompt);
                onGenerateTextToSql(prompt);
              }}
              className="text-[11px] bg-indigo-900/50 hover:bg-indigo-800/80 text-indigo-200 border border-indigo-700/40 rounded-md px-2 py-0.5 transition-colors cursor-pointer text-left line-clamp-1"
            >
              "{prompt}"
            </button>
          ))}
        </div>
      </div>

      {/* AI Output / Explanation / Fix Result Container */}
      {aiOutput && (
        <div className="mx-3.5 mb-3.5 p-3.5 bg-slate-900/95 border border-indigo-700/60 rounded-lg space-y-2.5 animate-in fade-in zoom-in-95 duration-150">
          <div className="flex items-center justify-between pb-2 border-b border-indigo-800/40">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></span>
              <h4 className="text-xs font-bold text-indigo-200 uppercase tracking-wider">
                {aiOutput.title}
              </h4>
            </div>
            <button
              onClick={onCloseOutput}
              className="text-indigo-400 hover:text-white text-xs p-1 rounded hover:bg-indigo-800/40 cursor-pointer"
              title="Đóng bảng kết quả AI"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>

          {aiOutput.error ? (
            <div className="p-2.5 bg-rose-950/60 border border-rose-800/60 rounded text-xs text-rose-300">
              <i className="fa-solid fa-triangle-exclamation mr-1.5 text-rose-400"></i>
              {aiOutput.error}
            </div>
          ) : (
            <>
              {/* If SQL was extracted, display prominent code block with 1-click apply */}
              {aiOutput.sqlOnly && (
                <div className="p-3 bg-slate-950 rounded-md border border-indigo-900/80 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider font-mono">
                      Câu lệnh SQL đề xuất:
                    </span>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => onApplySql(aiOutput.sqlOnly!, false)}
                        className="px-2.5 py-1 text-xs bg-indigo-800/80 hover:bg-indigo-700 text-indigo-100 rounded cursor-pointer transition-colors flex items-center gap-1"
                      >
                        <i className="fa-solid fa-arrow-up-right-from-square text-[10px]"></i>
                        <span>Chèn vào Editor</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => onApplySql(aiOutput.sqlOnly!, true)}
                        className="px-2.5 py-1 text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white rounded cursor-pointer shadow-xs transition-all flex items-center gap-1"
                      >
                        <i className="fa-solid fa-play text-[10px]"></i>
                        <span>Chạy ngay</span>
                      </button>
                    </div>
                  </div>
                  <pre className="font-mono text-xs text-emerald-300 p-2 bg-slate-900 rounded overflow-x-auto selection:bg-indigo-700">
                    {aiOutput.sqlOnly}
                  </pre>
                </div>
              )}

              {/* Natural language explanation / analysis */}
              <div className="text-xs text-indigo-100/90 leading-relaxed font-sans max-h-48 overflow-y-auto whitespace-pre-wrap pr-1">
                {aiOutput.rawText}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};
