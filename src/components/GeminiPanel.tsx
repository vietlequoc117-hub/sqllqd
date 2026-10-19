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
  onClose?: () => void;
}

export const GeminiPanel: React.FC<GeminiPanelProps> = ({
  dbConfig,
  onApplySql,
  onGenerateTextToSql,
  isGenerating,
  aiOutput,
  onCloseOutput,
  onClose,
}) => {
  const [naturalLanguageInput, setNaturalLanguageInput] = useState<string>('');
  const [activeSuggestionTab, setActiveSuggestionTab] = useState<'syntax' | 'query'>('syntax');
  const [copiedCodeIndex, setCopiedCodeIndex] = useState<number | null>(null);

  // Common high school SQL syntax & concept questions with clear examples
  const commonSyntaxQuestions = [
    'Cú pháp GROUP BY & HAVING là gì, cho ví dụ?',
    'Phân biệt mệnh đề WHERE và HAVING?',
    'Cách dùng lệnh JOIN kết nối 2 bảng và ví dụ?',
    'Toán tử LIKE với ký tự % và _ dùng thế nào?',
    'Cú pháp lệnh UPDATE và DELETE có điều kiện?',
    '5 hàm gộp COUNT, SUM, AVG, MIN, MAX và ví dụ?',
    'Khóa chính (PRIMARY KEY) và Khóa ngoại (FOREIGN KEY)?',
    'Bản chất giá trị NULL và toán tử IS NULL?',
    'Cấu trúc & Thứ tự chuẩn của câu lệnh SELECT?',
  ];

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
    QL_DIEM: [
      'Tìm những học sinh có điểm trung bình học kỳ trên 8.0',
      'Môn học nào có điểm kiểm tra trung bình cao nhất?',
      'Thống kê số lượng học sinh theo từng học lực',
    ],
    HOA_DON: [
      'Tính doanh thu của từng nhân viên bán hàng trong tháng',
      'Liệt kê các hóa đơn có tổng trị giá trên 10.000.000 VNĐ',
      'Tìm những khách hàng VIP mua hàng nhiều nhất',
    ],
    BAN_HANG: [
      'Sản phẩm nào đang có số lượng tồn kho dưới 10?',
      'Tính tổng số lượng đã bán của từng loại sản phẩm',
      'Liệt kê danh sách khách hàng chưa mua hàng lần nào',
    ],
  };

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!naturalLanguageInput.trim()) return;
    onGenerateTextToSql(naturalLanguageInput.trim());
  };

  const handleQuickPromptClick = (prompt: string) => {
    setNaturalLanguageInput(prompt);
    onGenerateTextToSql(prompt);
  };

  const handleCopySql = (sql: string, idx: number) => {
    navigator.clipboard.writeText(sql);
    setCopiedCodeIndex(idx);
    setTimeout(() => setCopiedCodeIndex(null), 2000);
  };

  /**
   * Helper to render markdown text with styled headers, tables, callouts, and syntax-highlighted code blocks
   */
  const renderFormattedMarkdown = (content: string) => {
    const lines = content.split('\n');
    const elements: React.ReactNode[] = [];
    let i = 0;
    let keyIdx = 0;

    while (i < lines.length) {
      const line = lines[i];

      // Code block
      if (line.trim().startsWith('```')) {
        const codeLines: string[] = [];
        i++;
        while (i < lines.length && !lines[i].trim().startsWith('```')) {
          codeLines.push(lines[i]);
          i++;
        }
        i++; // skip closing ```
        const rawCode = codeLines.join('\n').trim();
        const codeBlockIdx = keyIdx++;
        elements.push(
          <div key={`code-${codeBlockIdx}`} className="my-2.5 rounded-lg border border-indigo-200 bg-white overflow-hidden shadow-2xs">
            <div className="flex items-center justify-between px-3 py-1.5 bg-slate-50 border-b border-slate-200 text-[11px]">
              <span className="font-mono font-semibold text-indigo-700 flex items-center gap-1.5">
                <i className="fa-solid fa-code text-[10px]"></i>
                <span>Ví dụ câu lệnh SQL</span>
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => handleCopySql(rawCode, codeBlockIdx)}
                  className="px-2 py-0.5 text-[11px] text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-100 border border-slate-200 rounded transition-colors cursor-pointer flex items-center gap-1"
                  title="Sao chép câu lệnh này"
                >
                  <i className={`fa-solid ${copiedCodeIndex === codeBlockIdx ? 'fa-check text-emerald-600' : 'fa-copy'} text-[10px]`}></i>
                  <span>{copiedCodeIndex === codeBlockIdx ? 'Đã chép' : 'Sao chép'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => onApplySql(rawCode, false)}
                  className="px-2 py-0.5 text-[11px] font-medium text-indigo-700 hover:text-indigo-900 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded transition-colors cursor-pointer flex items-center gap-1"
                  title="Nạp câu lệnh này vào ô soạn thảo SQL"
                >
                  <i className="fa-solid fa-arrow-up-right-from-square text-[10px]"></i>
                  <span>Nạp vào Editor</span>
                </button>
              </div>
            </div>
            <pre
              className="p-3 bg-slate-50 text-slate-900 font-mono text-xs overflow-x-auto leading-relaxed"
              dangerouslySetInnerHTML={{ __html: highlightSqlToHtml(rawCode) }}
            />
          </div>
        );
        continue;
      }

      // Markdown Table
      if (line.trim().startsWith('|') && line.trim().endsWith('|')) {
        const tableLines: string[] = [];
        while (i < lines.length && lines[i].trim().startsWith('|') && lines[i].trim().endsWith('|')) {
          tableLines.push(lines[i].trim());
          i++;
        }

        const tableIdx = keyIdx++;
        const headerRow = tableLines[0]?.split('|').map(c => c.trim()).filter((_, idx, arr) => idx > 0 && idx < arr.length - 1);
        const dataRows = tableLines.slice(2).map(r => r.split('|').map(c => c.trim()).filter((_, idx, arr) => idx > 0 && idx < arr.length - 1));

        elements.push(
          <div key={`table-${tableIdx}`} className="my-2.5 overflow-x-auto rounded-lg border border-slate-200">
            <table className="w-full text-xs text-left text-slate-700">
              <thead className="bg-indigo-50/70 text-indigo-950 font-semibold border-b border-slate-200">
                <tr>
                  {headerRow?.map((h, hIdx) => (
                    <th key={hIdx} className="px-3 py-2 border-r border-slate-200 last:border-r-0 whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {dataRows.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-slate-50/80">
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className="px-3 py-1.5 border-r border-slate-100 last:border-r-0">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
        continue;
      }

      // Headings
      if (line.startsWith('### ')) {
        elements.push(
          <h3 key={keyIdx++} className="text-sm font-bold text-indigo-950 mt-3 mb-1.5 flex items-center gap-1.5">
            <span className="w-1.5 h-4 bg-indigo-600 rounded-full inline-block"></span>
            <span>{line.replace(/^###\s+/, '')}</span>
          </h3>
        );
        i++;
        continue;
      }

      if (line.startsWith('#### ')) {
        elements.push(
          <h4 key={keyIdx++} className="text-xs font-bold text-slate-900 mt-2.5 mb-1 text-indigo-900">
            {line.replace(/^####\s+/, '')}
          </h4>
        );
        i++;
        continue;
      }

      // Blockquotes / Callout
      if (line.startsWith('> ')) {
        elements.push(
          <div key={keyIdx++} className="my-2 p-2.5 bg-amber-50/80 border-l-3 border-amber-500 rounded-r-md text-xs text-amber-900 leading-relaxed font-sans">
            {line.replace(/^>\s+/, '')}
          </div>
        );
        i++;
        continue;
      }

      // Divider
      if (line.trim() === '---') {
        elements.push(<hr key={keyIdx++} className="my-2.5 border-slate-200" />);
        i++;
        continue;
      }

      // Bullet lists
      if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
        const itemText = line.trim().replace(/^[-*]\s+/, '');
        elements.push(
          <li key={keyIdx++} className="text-xs text-slate-700 ml-4 list-disc leading-relaxed my-0.5">
            <span dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(itemText) }} />
          </li>
        );
        i++;
        continue;
      }

      // Normal text / paragraph
      if (line.trim()) {
        elements.push(
          <p key={keyIdx++} className="text-xs text-slate-700 leading-relaxed my-1">
            <span dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(line) }} />
          </p>
        );
      }

      i++;
    }

    return elements;
  };

  /**
   * Helper to format inline markdown like bold **text**, inline `code`
   */
  const formatInlineMarkdown = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-slate-900">$1</strong>')
      .replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 bg-slate-100 text-indigo-700 rounded text-[11px] font-mono border border-slate-200">$1</code>');
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-2xs overflow-hidden flex flex-col max-h-[85vh]">
      {/* Panel Header */}
      <div className="p-3.5 bg-slate-50/90 border-b border-slate-200 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center text-base shadow-sm shadow-indigo-200">
            <i className="fa-solid fa-graduation-cap"></i>
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <span>Trợ Lý AI - Chuyên Gia Cấp Cao SQL</span>
              </h2>
              <span className="text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Tự động • Không cần Key</span>
              </span>
              <span className="text-[10px] font-medium bg-indigo-50 text-indigo-700 border border-indigo-200 px-1.5 py-0.5 rounded-full hidden sm:inline">
                Sư phạm Tin học 12
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Giải đáp cú pháp SQL • Cung cấp ví dụ trực quan • Sinh câu lệnh truy vấn cho học sinh
            </p>
          </div>
        </div>

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-lg transition-colors cursor-pointer"
            title="Đóng bảng Trợ Lý AI"
          >
            <i className="fa-solid fa-xmark text-sm"></i>
          </button>
        )}
      </div>

      {/* Main Form & Suggestion Body (Scrollable) */}
      <div className="p-3.5 space-y-3 overflow-y-auto">
        <form onSubmit={handleGenerate} className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-semibold text-slate-800">
              Đặt câu hỏi cú pháp SQL, ví dụ minh họa hoặc yêu cầu viết câu lệnh:
            </label>
            <span className="text-[11px] text-slate-500">
              Hỏi tiếng Việt tự nhiên
            </span>
          </div>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={naturalLanguageInput}
                onChange={(e) => setNaturalLanguageInput(e.target.value)}
                placeholder="VD: Cú pháp GROUP BY là gì và cho ví dụ? / Phân biệt WHERE và HAVING? / Tìm học sinh nữ..."
                className="w-full pl-3 pr-8 py-2 text-xs bg-white border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-sans shadow-2xs transition-all"
              />
              {naturalLanguageInput && (
                <button
                  type="button"
                  onClick={() => setNaturalLanguageInput('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs cursor-pointer"
                  title="Xóa nội dung"
                >
                  <i className="fa-solid fa-circle-xmark"></i>
                </button>
              )}
            </div>
            <button
              type="submit"
              disabled={isGenerating || !naturalLanguageInput.trim()}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 active:scale-98 text-xs font-semibold text-white rounded-lg shadow-xs cursor-pointer transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5 shrink-0"
            >
              <i className={`fa-solid ${isGenerating ? 'fa-circle-notch fa-spin' : 'fa-wand-magic-sparkles'} text-xs`}></i>
              <span>{isGenerating ? 'Đang giải đáp...' : 'Hỏi Chuyên gia SQL'}</span>
            </button>
          </div>
        </form>

        {/* Suggestion Categories Tabs */}
        <div className="border border-slate-200 rounded-lg p-2.5 bg-slate-50/60 space-y-2">
          <div className="flex items-center justify-between border-b border-slate-200/80 pb-1.5">
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setActiveSuggestionTab('syntax')}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeSuggestionTab === 'syntax'
                    ? 'bg-white text-indigo-700 shadow-2xs border border-indigo-200/80'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <i className="fa-solid fa-lightbulb text-amber-500 text-[11px]"></i>
                <span>💡 Hỏi Cú pháp & Ví dụ SQL</span>
                <span className="text-[10px] px-1.5 py-0.2 bg-indigo-50 text-indigo-700 rounded-full font-bold">
                  {commonSyntaxQuestions.length}
                </span>
              </button>
              <button
                type="button"
                onClick={() => setActiveSuggestionTab('query')}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeSuggestionTab === 'query'
                    ? 'bg-white text-indigo-700 shadow-2xs border border-indigo-200/80'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <i className="fa-solid fa-database text-indigo-500 text-[11px]"></i>
                <span>🔍 Truy vấn CSDL này ({dbConfig.name})</span>
              </button>
            </div>
            <span className="text-[11px] text-slate-500 hidden sm:inline">
              Nhấp để hỏi chuyên gia lập tức
            </span>
          </div>

          {/* Tab 1: Common Syntax & Example Questions */}
          {activeSuggestionTab === 'syntax' ? (
            <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
              {commonSyntaxQuestions.map((q, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleQuickPromptClick(q)}
                  className="text-[11px] bg-white hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 border border-slate-200 hover:border-indigo-300 rounded-md px-2.5 py-1 transition-colors cursor-pointer text-left shadow-2xs flex items-center gap-1"
                >
                  <i className="fa-solid fa-circle-question text-indigo-400 text-[10px]"></i>
                  <span>"{q}"</span>
                </button>
              ))}
            </div>
          ) : (
            /* Tab 2: Specific Database Query Suggestions */
            <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
              {(quickPromptsByDb[dbConfig.id] || []).map((prompt, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleQuickPromptClick(prompt)}
                  className="text-[11px] bg-white hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 border border-slate-200 hover:border-indigo-300 rounded-md px-2.5 py-1 transition-colors cursor-pointer text-left shadow-2xs flex items-center gap-1"
                >
                  <i className="fa-solid fa-arrow-right text-indigo-400 text-[10px]"></i>
                  <span>"{prompt}"</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* AI Output / Explanation / Fix Result Container */}
        {aiOutput && (
          <div className="p-3.5 bg-indigo-50/40 border border-indigo-200/90 rounded-xl space-y-3 shadow-2xs animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-2 border-b border-indigo-200/70">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <h4 className="text-xs font-bold text-indigo-950 uppercase tracking-wider">
                  {aiOutput.title}
                </h4>
              </div>
              <button
                onClick={onCloseOutput}
                className="text-slate-400 hover:text-slate-700 text-xs p-1 rounded-md hover:bg-indigo-100/60 cursor-pointer transition-colors"
                title="Đóng kết quả phản hồi"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            {aiOutput.error ? (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-700">
                <i className="fa-solid fa-triangle-exclamation mr-1.5 text-rose-500"></i>
                {aiOutput.error}
              </div>
            ) : (
              <>
                {/* Primary Suggested / Example SQL block with 1-click apply */}
                {aiOutput.sqlOnly && (
                  <div className="p-3 bg-white rounded-lg border border-indigo-200 shadow-2xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-indigo-900 uppercase tracking-wider font-mono flex items-center gap-1">
                        <i className="fa-solid fa-terminal text-indigo-600"></i>
                        <span>Câu lệnh SQL đề xuất / Ví dụ thực hành:</span>
                      </span>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => onApplySql(aiOutput.sqlOnly!, false)}
                          className="px-2.5 py-1 text-xs font-medium bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 rounded-md cursor-pointer transition-colors flex items-center gap-1"
                          title="Nạp vào ô soạn thảo SQL"
                        >
                          <i className="fa-solid fa-arrow-up-right-from-square text-[10px]"></i>
                          <span>Chèn vào Editor</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => onApplySql(aiOutput.sqlOnly!, true)}
                          className="px-2.5 py-1 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded-md cursor-pointer shadow-xs transition-all flex items-center gap-1"
                          title="Chạy ngay câu lệnh này trên CSDL"
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

                {/* Pedagogical Analysis, Explanations, Tables, Examples */}
                <div className="bg-white/95 p-3.5 rounded-lg border border-indigo-100 shadow-2xs max-h-72 overflow-y-auto pr-2">
                  {renderFormattedMarkdown(aiOutput.rawText)}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
