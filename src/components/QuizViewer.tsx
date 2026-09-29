import React, { useState } from 'react';
import { DatabaseConfig, DatabaseId, QuizLevel, QuizQuestion } from '../types';

interface QuizViewerProps {
  quizzes: QuizQuestion[];
  databaseName: string;
  databaseId: DatabaseId;
  dbConfig: DatabaseConfig;
  onApplySql: (sql: string, autoRun?: boolean) => void;
  onPracticePrompt: (promptText: string) => void;
}

export const QuizViewer: React.FC<QuizViewerProps> = ({
  quizzes,
  databaseName,
  databaseId,
  dbConfig,
  onApplySql,
  onPracticePrompt,
}) => {
  const [selectedLevel, setSelectedLevel] = useState<QuizLevel | 'ALL'>('ALL');
  // Record of user answers: questionId -> 'A' | 'B' | 'C' | 'D'
  const [userAnswers, setUserAnswers] = useState<Record<string, 'A' | 'B' | 'C' | 'D'>>({});
  // Show explanations for specific questions or all
  const [revealedExplanations, setRevealedExplanations] = useState<Record<string, boolean>>({});
  const [showAllAnswers, setShowAllAnswers] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Filter questions
  const filteredQuizzes =
    selectedLevel === 'ALL'
      ? quizzes
      : quizzes.filter((q) => q.level === selectedLevel);

  const countBiet = quizzes.filter((q) => q.level === 'Nhận biết').length;
  const countHieu = quizzes.filter((q) => q.level === 'Thông hiểu').length;
  const countVanDung = quizzes.filter((q) => q.level === 'Vận dụng').length;

  // Calculate score
  const totalQuestions = quizzes.length;
  const answeredCount = Object.keys(userAnswers).length;
  const correctCount = quizzes.filter(
    (q) => userAnswers[q.id] === q.correctAnswer
  ).length;
  const scorePercent = answeredCount > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

  const handleSelectOption = (questionId: string, optionKey: 'A' | 'B' | 'C' | 'D') => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: optionKey,
    }));
    // Automatically reveal explanation for this question
    setRevealedExplanations((prev) => ({
      ...prev,
      [questionId]: true,
    }));
  };

  const handleResetQuiz = () => {
    setUserAnswers({});
    setRevealedExplanations({});
    setShowAllAnswers(false);
  };

  const handleToggleShowAll = () => {
    setShowAllAnswers((prev) => !prev);
  };

  const handleCopySql = (sql: string, id: string) => {
    navigator.clipboard.writeText(sql);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  const getLevelBadgeClass = (level: QuizLevel) => {
    switch (level) {
      case 'Nhận biết':
        return 'bg-sky-50 text-sky-700 border-sky-200';
      case 'Thông hiểu':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Vận dụng':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-2xs overflow-hidden">
      {/* Quiz Top Header */}
      <div className="p-4 border-b border-slate-200 bg-linear-to-r from-slate-50 via-indigo-50/20 to-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse"></span>
            <h3 className="text-sm font-bold text-slate-900">
              10 Câu Trắc Nghiệm SQL - {databaseName}
            </h3>
            <span className="text-[11px] font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded-full">
              Chuẩn GDPT 2018 (3 Biết • 3 Hiểu • 4 Vận dụng)
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Kiểm tra kiến thức truy vấn, cú pháp SQL và tư duy cơ sở dữ liệu với phản hồi tức thì & kiểm chứng trực tiếp trên CSDL SQLite.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleToggleShowAll}
            className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-2xs transition-all flex items-center gap-1.5 cursor-pointer"
            title="Bật/Tắt hiển thị đáp án cho toàn bộ câu hỏi"
          >
            <i className={`fa-solid ${showAllAnswers ? 'fa-eye-slash text-amber-500' : 'fa-eye text-indigo-500'}`}></i>
            <span>{showAllAnswers ? 'Ẩn đáp án' : 'Hiện đáp án'}</span>
          </button>
          <button
            type="button"
            onClick={handleResetQuiz}
            className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-2xs transition-all flex items-center gap-1.5 cursor-pointer"
            title="Làm lại tất cả câu trắc nghiệm"
          >
            <i className="fa-solid fa-rotate-left text-slate-500"></i>
            <span>Làm lại</span>
          </button>
        </div>
      </div>

      {/* Progress & Score Bar */}
      <div className="px-4 py-3 bg-slate-50/80 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        {/* Level Filters */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            type="button"
            onClick={() => setSelectedLevel('ALL')}
            className={`px-2.5 py-1 rounded-md font-medium text-xs transition-colors cursor-pointer ${
              selectedLevel === 'ALL'
                ? 'bg-slate-900 text-white shadow-2xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            Tất cả (10)
          </button>
          <button
            type="button"
            onClick={() => setSelectedLevel('Nhận biết')}
            className={`px-2.5 py-1 rounded-md font-medium text-xs transition-colors cursor-pointer flex items-center gap-1 ${
              selectedLevel === 'Nhận biết'
                ? 'bg-sky-600 text-white shadow-2xs'
                : 'bg-white text-sky-700 border border-sky-200 hover:bg-sky-50'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
            Biết ({countBiet})
          </button>
          <button
            type="button"
            onClick={() => setSelectedLevel('Thông hiểu')}
            className={`px-2.5 py-1 rounded-md font-medium text-xs transition-colors cursor-pointer flex items-center gap-1 ${
              selectedLevel === 'Thông hiểu'
                ? 'bg-emerald-600 text-white shadow-2xs'
                : 'bg-white text-emerald-700 border border-emerald-200 hover:bg-emerald-50'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            Hiểu ({countHieu})
          </button>
          <button
            type="button"
            onClick={() => setSelectedLevel('Vận dụng')}
            className={`px-2.5 py-1 rounded-md font-medium text-xs transition-colors cursor-pointer flex items-center gap-1 ${
              selectedLevel === 'Vận dụng'
                ? 'bg-purple-600 text-white shadow-2xs'
                : 'bg-white text-purple-700 border border-purple-200 hover:bg-purple-50'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
            Vận dụng ({countVanDung})
          </button>
        </div>

        {/* Score & Answers Count */}
        <div className="flex items-center gap-3 self-end sm:self-center">
          <div className="text-slate-600 font-medium">
            Đã làm: <strong className="text-slate-900 font-bold">{answeredCount}/{totalQuestions}</strong> câu
          </div>
          <div className="text-slate-600 font-medium">
            Đúng: <strong className="text-emerald-600 font-bold">{correctCount}/{totalQuestions}</strong> câu
          </div>
          {answeredCount > 0 && (
            <div className="px-2 py-0.5 rounded-full font-bold bg-indigo-100 text-indigo-800 text-[11px]">
              {scorePercent}%
            </div>
          )}
        </div>
      </div>

      {/* Questions List */}
      <div className="p-4 space-y-5 max-h-[680px] overflow-y-auto">
        {filteredQuizzes.map((q) => {
          const userAnswer = userAnswers[q.id];
          const hasAnswered = userAnswer !== undefined;
          const isCorrect = hasAnswered && userAnswer === q.correctAnswer;
          const isExplanationShown = showAllAnswers || revealedExplanations[q.id];

          return (
            <div
              key={q.id}
              className={`p-4 rounded-xl border transition-all ${
                hasAnswered
                  ? isCorrect
                    ? 'border-emerald-200 bg-emerald-50/20 shadow-xs'
                    : 'border-rose-200 bg-rose-50/20 shadow-xs'
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              {/* Question Header */}
              <div className="flex items-start justify-between gap-3 mb-2.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-xs text-slate-800 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-md">
                    Câu {q.order}
                  </span>
                  <span
                    className={`text-[11px] font-semibold border px-2 py-0.5 rounded-full ${getLevelBadgeClass(
                      q.level
                    )}`}
                  >
                    {q.level}
                  </span>
                  {hasAnswered && (
                    <span
                      className={`text-xs font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                        isCorrect
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : 'bg-rose-100 text-rose-800 border border-rose-300'
                      }`}
                    >
                      <i className={`fa-solid ${isCorrect ? 'fa-circle-check text-emerald-600' : 'fa-circle-xmark text-rose-600'}`}></i>
                      {isCorrect ? 'Chính xác!' : `Chưa đúng (Đáp án: ${q.correctAnswer})`}
                    </span>
                  )}
                </div>

                {q.relatedSql && (
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => onApplySql(q.relatedSql!, true)}
                      className="px-2 py-1 rounded-md bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 text-[11px] font-medium transition-colors flex items-center gap-1 cursor-pointer"
                      title="Nạp và chạy câu lệnh này trong SQL Editor để xem bảng kết quả thực tế!"
                    >
                      <i className="fa-solid fa-play text-indigo-600 text-[10px]"></i>
                      <span>Kiểm chứng SQL</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleCopySql(q.relatedSql!, q.id)}
                      className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                      title="Sao chép câu lệnh SQL"
                    >
                      <i
                        className={`fa-solid ${
                          copiedId === q.id ? 'fa-check text-emerald-500' : 'fa-copy'
                        } text-xs`}
                      ></i>
                    </button>
                  </div>
                )}
              </div>

              {/* Question Text */}
              <p className="text-xs sm:text-sm font-medium text-slate-800 whitespace-pre-line leading-relaxed mb-3">
                {q.question}
              </p>

              {/* Optional SQL Snippet */}
              {q.sqlSnippet && (
                <div className="mb-3 rounded-lg overflow-hidden border border-slate-700 shadow-2xs">
                  <div className="bg-slate-800 px-3 py-1 flex items-center justify-between text-[11px] text-slate-300 font-mono">
                    <span>Đoạn mã SQL</span>
                    <button
                      type="button"
                      onClick={() => handleCopySql(q.sqlSnippet!, `${q.id}-snippet`)}
                      className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                    >
                      <i
                        className={`fa-solid ${
                          copiedId === `${q.id}-snippet`
                            ? 'fa-check text-emerald-400'
                            : 'fa-copy'
                        }`}
                      ></i>
                    </button>
                  </div>
                  <pre className="p-3 bg-slate-900 text-indigo-200 font-mono text-xs overflow-x-auto leading-relaxed">
                    {q.sqlSnippet}
                  </pre>
                </div>
              )}

              {/* 4 Options */}
              <div className="grid grid-cols-1 gap-2 my-3">
                {q.options.map((opt) => {
                  const isThisSelected = userAnswer === opt.key;
                  const isThisCorrectAnswer = opt.key === q.correctAnswer;
                  const shouldHighlightAsCorrect =
                    (hasAnswered || showAllAnswers) && isThisCorrectAnswer;
                  const shouldHighlightAsWrong =
                    hasAnswered && isThisSelected && !isThisCorrectAnswer;

                  let buttonStyles =
                    'border-slate-200 bg-slate-50/60 hover:bg-slate-100 text-slate-700 hover:border-slate-300';
                  let keyBadgeStyles =
                    'bg-slate-200 text-slate-700 border-slate-300';

                  if (shouldHighlightAsCorrect) {
                    buttonStyles =
                      'border-emerald-500 bg-emerald-50 text-emerald-950 font-semibold ring-1 ring-emerald-400';
                    keyBadgeStyles =
                      'bg-emerald-600 text-white border-emerald-600';
                  } else if (shouldHighlightAsWrong) {
                    buttonStyles =
                      'border-rose-400 bg-rose-50 text-rose-950 ring-1 ring-rose-300 line-through decoration-rose-400';
                    keyBadgeStyles = 'bg-rose-500 text-white border-rose-500';
                  } else if (isThisSelected) {
                    buttonStyles =
                      'border-indigo-500 bg-indigo-50 text-indigo-900 font-semibold ring-1 ring-indigo-400';
                    keyBadgeStyles = 'bg-indigo-600 text-white border-indigo-600';
                  }

                  return (
                    <button
                      key={opt.key}
                      type="button"
                      onClick={() => handleSelectOption(q.id, opt.key)}
                      className={`w-full text-left p-2.5 rounded-lg border transition-all flex items-start gap-2.5 cursor-pointer text-xs sm:text-[13px] ${buttonStyles}`}
                    >
                      <span
                        className={`w-5 h-5 rounded-md border text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5 transition-colors ${keyBadgeStyles}`}
                      >
                        {opt.key}
                      </span>
                      <span className="flex-1 leading-relaxed font-mono sm:font-sans">{opt.text}</span>
                      {shouldHighlightAsCorrect && (
                        <i className="fa-solid fa-circle-check text-emerald-600 text-sm mt-0.5 shrink-0"></i>
                      )}
                      {shouldHighlightAsWrong && (
                        <i className="fa-solid fa-circle-xmark text-rose-600 text-sm mt-0.5 shrink-0"></i>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation section */}
              {isExplanationShown && (
                <div className="mt-3 p-3 rounded-lg bg-indigo-50/70 border border-indigo-100 text-xs text-slate-700 animate-in fade-in duration-200">
                  <div className="flex items-center gap-1.5 font-bold text-indigo-900 mb-1">
                    <i className="fa-solid fa-lightbulb text-amber-500"></i>
                    <span>Giải thích chi tiết (Đáp án đúng: {q.correctAnswer}):</span>
                  </div>
                  <p className="leading-relaxed text-slate-700">{q.explanation}</p>
                  {q.relatedSql && (
                    <div className="mt-2 pt-2 border-t border-indigo-100 flex items-center justify-between">
                      <span className="text-[11px] text-indigo-800 font-medium">
                        💡 Thử chạy câu lệnh SQL này trong trình soạn thảo để thấy dữ liệu trả về!
                      </span>
                      <button
                        type="button"
                        onClick={() => onApplySql(q.relatedSql!, true)}
                        className="text-[11px] text-indigo-700 hover:text-indigo-900 font-bold hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <span>Chạy ngay</span>
                        <i className="fa-solid fa-arrow-right text-[10px]"></i>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
