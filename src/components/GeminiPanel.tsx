import React, { useState } from 'react';
import { DatabaseConfig } from '../types';
import { highlightSqlToHtml } from '../lib/sqlHighlighter';

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
    <div className="bg-white border border-slate-200 rounded-xl shadow-2xs overflow-hidden flex flex-col">
      {/* Panel Header - Clean Light Theme */}
      <div className="p-3.5 bg-slate-50/80 border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center text-sm shadow-2xs">
            <i className="fa-solid fa-wand-magic-sparkles"></i>
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Trợ Lý AI SQL
              </h2>
              <span className="text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full">
                Tự động • Không cần Key
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Nhập tiếng Việt sinh SQL • Giải thích cú pháp • Tự động sửa lỗi (Dành cho học sinh)
            </p>
          </div>
        </div>
      </div>

      {/* Text-to-SQL Input Box */}
      <div className="p-3.5 space-y-2.5">
        <form onSubmit={handleGenerate} className="space-y-2">
          <label className="block text-xs font-semibold text-slate-700">
            Yêu cầu truy vấn bằng tiếng Việt (Text-to-SQL):
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={naturalLanguageInput}
              onChange={(e) => setNaturalLanguageInput(e.target.value)}
              placeholder="VD: Tìm những cuốn sách có trên 200 trang mà Trần Cương đã mượn..."
              className="flex-1 px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-sans shadow-2xs transition-all"
            />
            <button
              type="submit"
              disabled={isGenerating || !naturalLanguageInput.trim()}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 active:scale-98 text-xs font-semibold text-white rounded-lg shadow-xs cursor-pointer transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5 shrink-0"
            >
              <i className={`fa-solid ${isGenerating ? 'fa-circle-notch fa-spin' : 'fa-wand-magic-sparkles'} text-xs`}></i>
              <span>{isGenerating ? 'Đang sinh SQL...' : 'Sinh câu SQL'}</span>
            </button>
          </div>
        </form>

        {/* Quick Suggestion Chips */}
        <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
          <span className="text-[11px] text-slate-500 font-medium shrink-0">
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
              className="text-[11px] bg-slate-50 hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 border border-slate-200 hover:border-indigo-200 rounded-md px-2.5 py-1 transition-colors cursor-pointer text-left line-clamp-1 shadow-2xs"
            >
              "{prompt}"
            </button>
          ))}
        </div>
      </div>

      {/* AI Output / Explanation / Fix Result Container */}
      {aiOutput && (
        <div className="mx-3.5 mb-3.5 p-3.5 bg-indigo-50/40 border border-indigo-200/80 rounded-xl space-y-2.5 shadow-2xs animate-in fade-in zoom-in-95 duration-150">
          <div className="flex items-center justify-between pb-2 border-b border-indigo-200/60">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse"></span>
              <h4 className="text-xs font-bold text-indigo-950 uppercase tracking-wider">
                {aiOutput.title}
              </h4>
            </div>
            <button
              onClick={onCloseOutput}
              className="text-slate-400 hover:text-slate-700 text-xs p-1 rounded-md hover:bg-indigo-100/60 cursor-pointer transition-colors"
              title="Đóng bảng kết quả AI"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>

          {aiOutput.error ? (
            <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-700">
              <i className="fa-solid fa-triangle-exclamation mr-1.5 text-rose-500"></i>
              {aiOutput.error}
            </div>
          ) : (
            <>
              {/* If SQL was extracted, display prominent code block with 1-click apply */}
              {aiOutput.sqlOnly && (
                <div className="p-3 bg-white rounded-lg border border-indigo-200 shadow-2xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-indigo-900 uppercase tracking-wider font-mono">
                      Câu lệnh SQL đề xuất:
                    </span>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => onApplySql(aiOutput.sqlOnly!, false)}
                        className="px-2.5 py-1 text-xs font-medium bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 rounded-md cursor-pointer transition-colors flex items-center gap-1"
                      >
                        <i className="fa-solid fa-arrow-up-right-from-square text-[10px]"></i>
                        <span>Chèn vào Editor</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => onApplySql(aiOutput.sqlOnly!, true)}
                        className="px-2.5 py-1 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded-md cursor-pointer shadow-xs transition-all flex items-center gap-1"
                      >
                        <i className="fa-solid fa-play text-[10px]"></i>
                        <span>Chạy ngay</span>
                      </button>
                    </div>
                  </div>
                  <pre
                    className="font-mono text-xs text-slate-900 p-2.5 bg-slate-50 border border-slate-200 rounded-md overflow-x-auto selection:bg-indigo-100 selection:text-indigo-900 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: highlightSqlToHtml(aiOutput.sqlOnly) }}
                  />
                </div>
              )}

              {/* Natural language explanation / analysis */}
              <div className="text-xs text-slate-700 leading-relaxed font-sans max-h-56 overflow-y-auto whitespace-pre-wrap pr-1 bg-white/80 p-2.5 rounded-lg border border-indigo-100/80">
                {aiOutput.rawText}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};
