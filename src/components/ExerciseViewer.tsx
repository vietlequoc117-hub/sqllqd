import React, { useState } from 'react';
import { DatabaseConfig, DatabaseId, Exercise, ExerciseLevel } from '../types';
import { DATABASES } from '../data/databases';
import { EXERCISES_BY_DATABASE } from '../data/exercises';
import { createDatabaseDocx, downloadDocxBlob } from '../lib/docxExport';

interface ExerciseViewerProps {
  exercises: Exercise[];
  databaseName: string;
  databaseId: DatabaseId;
  dbConfig: DatabaseConfig;
  onApplySql: (sql: string, autoRun?: boolean) => void;
  onPracticePrompt: (promptText: string) => void;
}

const DB_DOWNLOAD_INFO: Record<
  DatabaseId,
  { filename: string; studentFilename: string; name: string; subtitle: string; icon: string }
> = {
  HOC_SINH: {
    filename: 'Bai_Tap_SQL_CSDL_Hoc_Sinh.docx',
    studentFilename: 'Bai_Tap_SQL_CSDL_Hoc_Sinh_De_Bai.docx',
    name: 'CSDL Học Sinh',
    subtitle: 'Đơn Bảng • Giáo Dục (15 câu)',
    icon: 'fa-graduation-cap text-indigo-500',
  },
  KINH_DOANH: {
    filename: 'Bai_Tap_SQL_CSDL_Kinh_Doanh.docx',
    studentFilename: 'Bai_Tap_SQL_CSDL_Kinh_Doanh_De_Bai.docx',
    name: 'CSDL Kinh Doanh',
    subtitle: '3 Bảng • Bán Hàng (15 câu)',
    icon: 'fa-cart-shopping text-emerald-500',
  },
  HOC_TAP: {
    filename: 'Bai_Tap_SQL_CSDL_Hoc_Tap.docx',
    studentFilename: 'Bai_Tap_SQL_CSDL_Hoc_Tap_De_Bai.docx',
    name: 'CSDL Học Tập',
    subtitle: '3 Bảng • Điểm Số (15 câu)',
    icon: 'fa-book-open text-sky-500',
  },
  AM_NHAC: {
    filename: 'Bai_Tap_SQL_CSDL_Am_Nhac.docx',
    studentFilename: 'Bai_Tap_SQL_CSDL_Am_Nhac_De_Bai.docx',
    name: 'CSDL Âm Nhạc',
    subtitle: '4 Bảng • Âm Nhạc (15 câu)',
    icon: 'fa-music text-purple-500',
  },
  QL_XE: {
    filename: 'Bai_Tap_SQL_CSDL_QL_Xe.docx',
    studentFilename: 'Bai_Tap_SQL_CSDL_QL_Xe_De_Bai.docx',
    name: 'CSDL QL_XE',
    subtitle: '3 Bảng • Quản Lý Xe (15 câu)',
    icon: 'fa-motorcycle text-indigo-500',
  },
  QL_VANG: {
    filename: 'Bai_Tap_SQL_CSDL_QL_Vang.docx',
    studentFilename: 'Bai_Tap_SQL_CSDL_QL_Vang_De_Bai.docx',
    name: 'CSDL QL_VANG',
    subtitle: '3 Bảng • Quản Lý Vàng (15 câu)',
    icon: 'fa-coins text-amber-500',
  },
  QL_CANBO: {
    filename: 'Bai_Tap_SQL_CSDL_QL_Canbo.docx',
    studentFilename: 'Bai_Tap_SQL_CSDL_QL_Canbo_De_Bai.docx',
    name: 'CSDL QL_Canbo',
    subtitle: '3 Bảng • Quản Lý Cán Bộ (15 câu)',
    icon: 'fa-id-card-clip text-teal-600',
  },
  QL_TV: {
    filename: 'Bai_Tap_SQL_CSDL_QL_TV.docx',
    studentFilename: 'Bai_Tap_SQL_CSDL_QL_TV_De_Bai.docx',
    name: 'CSDL QL_TV',
    subtitle: '4 Bảng • Quản Lý Thư Viện (15 câu)',
    icon: 'fa-book-atlas text-indigo-600',
  },
};

export const ExerciseViewer: React.FC<ExerciseViewerProps> = ({
  exercises,
  databaseName,
  databaseId,
  dbConfig,
  onApplySql,
  onPracticePrompt,
}) => {
  const [selectedLevel, setSelectedLevel] = useState<ExerciseLevel | 'ALL'>('ALL');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState<boolean>(false);
  const [isExporting, setIsExporting] = useState<boolean>(false);

  const filteredExercises =
    selectedLevel === 'ALL'
      ? exercises
      : exercises.filter((ex) => ex.level === selectedLevel);

  const countBiet = exercises.filter((e) => e.level === 'Nhận biết').length;
  const countHieu = exercises.filter((e) => e.level === 'Thông hiểu').length;
  const countVanDung = exercises.filter((e) => e.level === 'Vận dụng').length;

  const handleCopy = (sql: string, id: string) => {
    navigator.clipboard.writeText(sql);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  const handleDownloadDocx = async (targetDbId: DatabaseId, withAnswers: boolean) => {
    try {
      setIsExporting(true);
      const targetConfig = DATABASES[targetDbId];
      const targetExercises = EXERCISES_BY_DATABASE[targetDbId];
      const info = DB_DOWNLOAD_INFO[targetDbId];
      const filename = withAnswers ? info.filename : info.studentFilename;

      // First attempt to fetch the pre-generated static file
      const res = await fetch(`/downloads/${filename}`);
      if (res.ok) {
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      } else {
        // Fallback: Generate dynamically on client
        const doc = createDatabaseDocx(targetConfig, targetExercises, {
          includeAnswers: withAnswers,
        });
        await downloadDocxBlob(doc, filename);
      }
    } catch (err) {
      console.error('Error downloading docx:', err);
      // Client dynamic fallback
      const targetConfig = DATABASES[targetDbId];
      const targetExercises = EXERCISES_BY_DATABASE[targetDbId];
      const info = DB_DOWNLOAD_INFO[targetDbId];
      const filename = withAnswers ? info.filename : info.studentFilename;
      const doc = createDatabaseDocx(targetConfig, targetExercises, {
        includeAnswers: withAnswers,
      });
      await downloadDocxBlob(doc, filename);
    } finally {
      setIsExporting(false);
    }
  };

  const getLevelBadge = (level: ExerciseLevel) => {
    switch (level) {
      case 'Nhận biết':
        return {
          bg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          dot: 'bg-emerald-500',
          label: 'Mức Biết (Nhận biết)',
        };
      case 'Thông hiểu':
        return {
          bg: 'bg-sky-50 text-sky-700 border-sky-200',
          dot: 'bg-sky-500',
          label: 'Mức Hiểu (Thông hiểu)',
        };
      case 'Vận dụng':
        return {
          bg: 'bg-amber-50 text-amber-700 border-amber-200',
          dot: 'bg-amber-500',
          label: 'Mức Vận dụng',
        };
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-2xs overflow-hidden flex flex-col relative">
      {/* Header */}
      <div className="p-3.5 bg-slate-50 border-b border-slate-200">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm shrink-0">
              <i className="fa-solid fa-graduation-cap"></i>
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2 flex-wrap">
                <span>Bài Tập Tự Luận SQL • {databaseName}</span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 font-mono">
                  {exercises.length} Câu Hỏi (5 Biết • 5 Hiểu • 5 VD)
                </span>
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Rèn luyện kỹ năng viết truy vấn SQL theo 3 cấp độ tư duy sư phạm chuẩn Bộ GD&ĐT
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap justify-between sm:justify-end">
            {/* Level Filter Pills */}
            <div className="inline-flex p-1 bg-white rounded-lg border border-slate-200 text-xs shrink-0">
              <button
                type="button"
                onClick={() => setSelectedLevel('ALL')}
                className={`px-2 py-1 font-semibold rounded-md transition-all cursor-pointer ${
                  selectedLevel === 'ALL'
                    ? 'bg-indigo-600 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Tất cả ({exercises.length})
              </button>
              <button
                type="button"
                onClick={() => setSelectedLevel('Nhận biết')}
                className={`px-2 py-1 font-semibold rounded-md transition-all cursor-pointer flex items-center gap-1 ${
                  selectedLevel === 'Nhận biết'
                    ? 'bg-emerald-600 text-white shadow-2xs'
                    : 'text-emerald-700 hover:bg-emerald-50'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                Biết ({countBiet})
              </button>
              <button
                type="button"
                onClick={() => setSelectedLevel('Thông hiểu')}
                className={`px-2 py-1 font-semibold rounded-md transition-all cursor-pointer flex items-center gap-1 ${
                  selectedLevel === 'Thông hiểu'
                    ? 'bg-sky-600 text-white shadow-2xs'
                    : 'text-sky-700 hover:bg-sky-50'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
                Hiểu ({countHieu})
              </button>
              <button
                type="button"
                onClick={() => setSelectedLevel('Vận dụng')}
                className={`px-2 py-1 font-semibold rounded-md transition-all cursor-pointer flex items-center gap-1 ${
                  selectedLevel === 'Vận dụng'
                    ? 'bg-amber-600 text-white shadow-2xs'
                    : 'text-amber-700 hover:bg-amber-50'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                Vận dụng ({countVanDung})
              </button>
            </div>

            {/* Word DOCX Download Button */}
            <button
              type="button"
              onClick={() => setIsDownloadModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-2xs transition-all cursor-pointer"
              title="Tải đề bài và đáp án ra file Microsoft Word (.docx)"
            >
              <i className="fa-solid fa-file-word text-sm"></i>
              <span>Tải file Word (.docx)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Exercises List */}
      <div className="p-3 sm:p-4 divide-y divide-slate-100 max-h-[520px] overflow-y-auto space-y-3">
        {filteredExercises.map((ex) => {
          const isExpanded = expandedId === ex.id;
          const badge = getLevelBadge(ex.level);

          return (
            <div
              key={ex.id}
              className="pt-3 first:pt-0 transition-all rounded-lg hover:bg-slate-50/60 p-2"
            >
              {/* Question Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-xs font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                      #{ex.order}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-semibold border ${badge.bg}`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`}></span>
                      {badge.label}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm font-medium text-slate-900 leading-relaxed">
                    {ex.question}
                  </p>
                  <p className="text-[11px] text-slate-500 italic flex items-center gap-1">
                    <i className="fa-regular fa-lightbulb text-amber-500 text-xs"></i>
                    <span>Gợi ý: {ex.hint}</span>
                  </p>
                </div>

                {/* Action buttons */}
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => {
                      const prompt = `-- Bài tập #${ex.order} [${ex.level}]: ${ex.question}\n-- Gợi ý: ${ex.hint}\n\nSELECT `;
                      onPracticePrompt(prompt);
                    }}
                    className="px-2.5 py-1 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-md shadow-2xs transition-colors cursor-pointer flex items-center gap-1"
                    title="Chèn đề bài vào khung soạn thảo để tự làm"
                  >
                    <i className="fa-solid fa-pen text-[10px] text-indigo-500"></i>
                    <span className="hidden sm:inline">Tự làm</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setExpandedId(isExpanded ? null : ex.id)}
                    className={`px-2.5 py-1 text-xs font-semibold rounded-md border transition-all cursor-pointer flex items-center gap-1 ${
                      isExpanded
                        ? 'bg-indigo-50 border-indigo-200 text-indigo-700'
                        : 'bg-indigo-600 hover:bg-indigo-700 text-white border-transparent shadow-2xs'
                    }`}
                  >
                    <i
                      className={`fa-solid ${
                        isExpanded ? 'fa-eye-slash' : 'fa-check'
                      } text-[10px]`}
                    ></i>
                    <span>{isExpanded ? 'Đóng' : 'Xem đáp án'}</span>
                  </button>
                </div>
              </div>

              {/* Solution Accordion */}
              {isExpanded && (
                <div className="mt-3 pt-3 border-t border-slate-200/80 bg-slate-900 rounded-lg p-3 text-slate-100 animate-fadeIn">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-300 flex items-center gap-1.5">
                      <i className="fa-solid fa-code"></i>
                      <span>Câu Lệnh SQL Chuẩn Mực</span>
                    </span>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleCopy(ex.solutionSql, ex.id)}
                        className="px-2 py-0.5 text-[11px] font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 rounded border border-slate-700 transition-colors cursor-pointer flex items-center gap-1"
                      >
                        <i
                          className={`fa-solid ${
                            copiedId === ex.id ? 'fa-check text-emerald-400' : 'fa-copy'
                          } text-[10px]`}
                        ></i>
                        <span>{copiedId === ex.id ? 'Đã sao chép' : 'Sao chép'}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => onApplySql(ex.solutionSql, true)}
                        className="px-2 py-0.5 text-[11px] font-semibold bg-emerald-600 hover:bg-emerald-500 text-white rounded shadow-2xs transition-colors cursor-pointer flex items-center gap-1"
                        title="Nạp vào ô soạn thảo và tự động chạy truy vấn"
                      >
                        <i className="fa-solid fa-play text-[9px]"></i>
                        <span>Nạp & Chạy thử</span>
                      </button>
                    </div>
                  </div>

                  {/* SQL Code Block */}
                  <pre className="font-mono text-xs leading-relaxed text-emerald-300 bg-slate-950 p-2.5 rounded border border-slate-800 overflow-x-auto whitespace-pre-wrap">
                    {ex.solutionSql}
                  </pre>

                  {/* Pedagogical Explanation */}
                  <div className="mt-2.5 pt-2 border-t border-slate-800 text-[11px] text-slate-300 flex items-start gap-1.5 leading-relaxed">
                    <i className="fa-solid fa-circle-info text-sky-400 mt-0.5 shrink-0"></i>
                    <div>
                      <span className="font-semibold text-sky-300">Giải thích phương pháp: </span>
                      <span>{ex.explanation}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* MODAL: DOWNLOAD WORD (.DOCX) DIALOG */}
      {isDownloadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 max-w-xl w-full max-h-[90vh] flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="p-4 bg-gradient-to-r from-blue-700 to-indigo-700 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-xl text-white">
                  <i className="fa-solid fa-file-word"></i>
                </div>
                <div>
                  <h3 className="font-bold text-base leading-tight">
                    Tải Bài Tập Tự Luận SQL (.docx)
                  </h3>
                  <p className="text-xs text-blue-100">
                    File Microsoft Word chuẩn mực • Định dạng trang A4 sẵn sàng in ấn
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsDownloadModalOpen(false)}
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 overflow-y-auto space-y-5">
              {/* Highlighted Current Database */}
              <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200">
                <div className="flex items-center justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-blue-600 text-white rounded text-[10px] font-bold uppercase tracking-wider">
                      Đang chọn
                    </span>
                    <h4 className="font-bold text-sm text-slate-900">{databaseName}</h4>
                  </div>
                  <span className="text-xs text-slate-500 font-medium">15 câu (5 Biết - 5 Hiểu - 5 VD)</span>
                </div>
                <p className="text-xs text-slate-600 mb-3">
                  Tải nhanh đề cương cho CSDL đang làm việc, tích hợp cấu trúc DDL và hệ thống bài tập.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    disabled={isExporting}
                    onClick={() => handleDownloadDocx(databaseId, true)}
                    className="flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-2xs transition-colors cursor-pointer disabled:opacity-50"
                  >
                    <i className="fa-solid fa-file-circle-check text-sm"></i>
                    <span>Tải Bản Có Đáp Án (.docx)</span>
                  </button>

                  <button
                    type="button"
                    disabled={isExporting}
                    onClick={() => handleDownloadDocx(databaseId, false)}
                    className="flex items-center justify-center gap-2 px-3 py-2 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-lg text-xs font-semibold shadow-2xs transition-colors cursor-pointer disabled:opacity-50"
                  >
                    <i className="fa-solid fa-file-pen text-sm text-blue-600"></i>
                    <span>Bản Đề Bài Học Sinh (.docx)</span>
                  </button>
                </div>
              </div>

              {/* All 5 Databases List */}
              <div>
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2.5 flex items-center justify-between">
                  <span>Tải trọn bộ 5 Cơ Sở Dữ Liệu</span>
                  <span className="text-[11px] text-slate-500 font-normal font-sans">
                    Mỗi file gồm 15 bài tập
                  </span>
                </h4>

                <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden">
                  {(Object.keys(DB_DOWNLOAD_INFO) as DatabaseId[]).map((dbKey) => {
                    const info = DB_DOWNLOAD_INFO[dbKey];
                    const isCurrent = dbKey === databaseId;

                    return (
                      <div
                        key={dbKey}
                        className={`p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                          isCurrent ? 'bg-indigo-50/40' : 'bg-white hover:bg-slate-50'
                        } transition-colors`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-sm shrink-0">
                            <i className={`fa-solid ${info.icon}`}></i>
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-slate-900">{info.name}</span>
                              {isCurrent && (
                                <span className="text-[9px] px-1.5 py-0.2 rounded bg-indigo-100 text-indigo-700 font-semibold">
                                  Hiện tại
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-slate-500">{info.subtitle}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 self-end sm:self-auto">
                          <button
                            type="button"
                            disabled={isExporting}
                            onClick={() => handleDownloadDocx(dbKey, true)}
                            className="px-2.5 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-md text-[11px] font-semibold transition-colors cursor-pointer flex items-center gap-1"
                            title="Tải file có đáp án và giải thích"
                          >
                            <i className="fa-solid fa-download text-[10px]"></i>
                            <span>Có đáp án</span>
                          </button>

                          <button
                            type="button"
                            disabled={isExporting}
                            onClick={() => handleDownloadDocx(dbKey, false)}
                            className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 rounded-md text-[11px] font-semibold transition-colors cursor-pointer flex items-center gap-1"
                            title="Tải bản đề bài học sinh không có đáp án"
                          >
                            <i className="fa-solid fa-file-lines text-[10px]"></i>
                            <span>Bản đề bài</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Note */}
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-[11px] text-slate-500 leading-relaxed flex items-start gap-2">
                <i className="fa-solid fa-circle-info text-blue-500 mt-0.5 shrink-0"></i>
                <span>
                  Các tệp tin Word (.docx) được định dạng theo quy chuẩn văn bản của Bộ GD&ĐT (quốc hiệu, tiêu ngữ, thông tin học sinh, khung mã DDL và câu lệnh SQL font Consolas có kẻ khung đẹp mắt).
                </span>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-3 bg-slate-50 border-t border-slate-200 flex justify-end">
              <button
                type="button"
                onClick={() => setIsDownloadModalOpen(false)}
                className="px-4 py-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
