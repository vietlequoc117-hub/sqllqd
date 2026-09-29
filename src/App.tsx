import React, { useState, useEffect, useCallback } from 'react';
import { DatabaseId, QueryResult, TableData } from './types';
import { DATABASES } from './data/databases';
import {
  initializeDatabase,
  executeQuery,
  getAllTablesData,
  getSqlInstance,
} from './lib/sqlEngine';
import {
  getStoredApiKey,
  setStoredApiKey,
  generateTextToSql,
  explainSql,
  fixSqlError,
} from './lib/gemini';
import { Header } from './components/Header';
import { DataViewer } from './components/DataViewer';
import { ErdViewer } from './components/ErdViewer';
import { ExerciseViewer } from './components/ExerciseViewer';
import { QuizViewer } from './components/QuizViewer';
import { SqlEditor } from './components/SqlEditor';
import { QueryResultView } from './components/QueryResult';
import { GeminiPanel } from './components/GeminiPanel';
import { EXERCISES_BY_DATABASE } from './data/exercises';
import { QUIZZES_BY_DATABASE } from './data/quizzes';

export default function App() {
  const [currentDbId, setCurrentDbId] = useState<DatabaseId>('HOC_SINH');
  const [apiKey, setApiKey] = useState<string>('');
  const [isEngineReady, setIsEngineReady] = useState<boolean>(false);
  const [isDbLoading, setIsDbLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'data' | 'erd' | 'quiz' | 'exercises'>('data');
  const [sqlInput, setSqlInput] = useState<string>('');
  const [queryResult, setQueryResult] = useState<QueryResult | null>(null);
  const [tablesData, setTablesData] = useState<TableData[]>([]);
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [notification, setNotification] = useState<string | null>(null);

  // AI Assistant states
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isExplaining, setIsExplaining] = useState<boolean>(false);
  const [isFixing, setIsFixing] = useState<boolean>(false);
  const [aiOutput, setAiOutput] = useState<{
    type: 'text-to-sql' | 'explain' | 'fix' | null;
    title: string;
    rawText: string;
    sqlOnly?: string;
    error?: string;
  } | null>(null);

  const activeDbConfig = DATABASES[currentDbId];

  // Load saved API Key from localStorage
  useEffect(() => {
    const savedKey = getStoredApiKey();
    if (savedKey) {
      setApiKey(savedKey);
    }
  }, []);

  const handleApiKeyChange = (newKey: string) => {
    setApiKey(newKey);
    setStoredApiKey(newKey);
    showNotification('Đã cập nhật Gemini API Key!');
  };

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification((prev) => (prev === msg ? null : prev));
    }, 3000);
  };

  // Initialize SQLite database
  const loadDatabase = useCallback(async (dbId: DatabaseId) => {
    setIsDbLoading(true);
    try {
      await getSqlInstance();
      setIsEngineReady(true);

      const config = DATABASES[dbId];
      await initializeDatabase(config);

      // Refresh tables
      const tables = getAllTablesData();
      setTablesData(tables);

      // Default sample query into editor
      if (config.sampleQueries && config.sampleQueries.length > 0) {
        setSqlInput(config.sampleQueries[0].sql);
      } else {
        setSqlInput(`SELECT *\nFROM ${tables[0]?.tableName || 'HOC_SINH'};`);
      }

      setQueryResult(null);
      setAiOutput(null);
    } catch (err: any) {
      console.error('Lỗi khởi tạo CSDL:', err);
      showNotification('Không thể khởi tạo CSDL: ' + err.message);
    } finally {
      setIsDbLoading(false);
    }
  }, []);

  // Init on mount
  useEffect(() => {
    loadDatabase(currentDbId);
  }, [currentDbId, loadDatabase]);

  // Handle switching Database
  const handleSelectDb = (id: DatabaseId) => {
    if (id === currentDbId) return;
    setCurrentDbId(id);
  };

  // Reset database to initial schema & seeds
  const handleResetDb = async () => {
    await loadDatabase(currentDbId);
    showNotification(`Đã khôi phục CSDL "${activeDbConfig.name}" về dữ liệu gốc!`);
  };

  // Execute SQL query
  const handleExecuteSql = (customSql?: string) => {
    const sqlToRun = customSql !== undefined ? customSql : sqlInput;
    if (!sqlToRun.trim()) return;

    setIsExecuting(true);
    try {
      const res = executeQuery(sqlToRun);
      setQueryResult(res);

      if (!res.error) {
        if (res.queryType === 'SELECT') {
          showNotification('Thực thi lệnh SELECT thành công');
        } else {
          showNotification(`Thực thi lệnh ${res.queryType} thành công!`);
        }
      }

      // If DML or DDL, auto-refresh the tables data viewer!
      if (res.queryType === 'DML' || res.queryType === 'DDL') {
        const updatedTables = getAllTablesData();
        setTablesData(updatedTables);
      }
    } catch (err: any) {
      console.error('Lỗi thực thi:', err);
    } finally {
      setIsExecuting(false);
    }
  };

  // Gemini: Text-to-SQL
  const handleTextToSql = async (prompt: string) => {
    setIsGenerating(true);
    setAiOutput({
      type: 'text-to-sql',
      title: 'Kết quả sinh câu lệnh SQL từ Gemini',
      rawText: 'Đang liên hệ Gemini AI...',
    });

    const res = await generateTextToSql(prompt, activeDbConfig, apiKey);
    if (res.error) {
      setAiOutput({
        type: 'text-to-sql',
        title: 'Lỗi sinh SQL từ Gemini',
        rawText: '',
        error: res.error,
      });
    } else {
      setAiOutput({
        type: 'text-to-sql',
        title: `SQL cho yêu cầu: "${prompt}"`,
        rawText: res.text,
        sqlOnly: res.sqlOnly,
      });
    }
    setIsGenerating(false);
  };

  // Gemini: Explain SQL
  const handleExplainSql = async () => {
    if (!sqlInput.trim()) return;
    setIsExplaining(true);
    setAiOutput({
      type: 'explain',
      title: 'Đang giải thích câu lệnh SQL...',
      rawText: 'Gemini đang phân tích chi tiết từng mệnh đề...',
    });

    const res = await explainSql(sqlInput, activeDbConfig, apiKey);
    if (res.error) {
      setAiOutput({
        type: 'explain',
        title: 'Lỗi khi giải thích SQL',
        rawText: '',
        error: res.error,
      });
    } else {
      setAiOutput({
        type: 'explain',
        title: 'Phân tích & Giải thích câu lệnh SQL',
        rawText: res.text,
      });
    }
    setIsExplaining(false);
  };

  // Gemini: Fix SQL Error
  const handleFixSql = async (sql: string, errorMsg: string) => {
    setIsFixing(true);
    setAiOutput({
      type: 'fix',
      title: 'Trợ lý Gemini đang phân tích lỗi...',
      rawText: 'Đang kiểm tra cú pháp và lược đồ quan hệ...',
    });

    const res = await fixSqlError(sql, errorMsg, activeDbConfig, apiKey);
    if (res.error) {
      setAiOutput({
        type: 'fix',
        title: 'Không thể phân tích lỗi',
        rawText: '',
        error: res.error,
      });
    } else {
      setAiOutput({
        type: 'fix',
        title: 'Chẩn đoán & Sửa lỗi câu lệnh SQL',
        rawText: res.text,
        sqlOnly: res.sqlOnly,
      });
    }
    setIsFixing(false);
  };

  // Apply SQL from AI
  const handleApplySql = (sql: string, autoRun: boolean = false) => {
    setSqlInput(sql);
    showNotification('Đã nạp câu lệnh vào trình soạn thảo!');
    if (autoRun) {
      setTimeout(() => {
        handleExecuteSql(sql);
      }, 50);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-800">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-xl shadow-lg border border-slate-700 text-xs font-medium flex items-center gap-2 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <i className="fa-solid fa-circle-info text-indigo-400"></i>
          <span>{notification}</span>
        </div>
      )}

      {/* Header */}
      <Header
        currentDbId={currentDbId}
        onSelectDb={handleSelectDb}
        onResetDb={handleResetDb}
        isDbLoading={isDbLoading}
        apiKey={apiKey}
        onApiKeyChange={handleApiKeyChange}
        isEngineReady={isEngineReady}
      />

      {/* Main Workspace Layout */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-4 lg:p-6">
        {/* Quick DB Info Banner */}
        <div className="mb-4 bg-white border border-slate-200 rounded-xl p-3.5 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center shrink-0">
              <i className={`${activeDbConfig.iconClass} text-base`}></i>
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-sm font-bold text-slate-900">{activeDbConfig.name}</h2>
                <span className="text-[11px] font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded-full">
                  {activeDbConfig.badge}
                </span>
                <span className="text-xs text-slate-500 font-medium hidden md:inline">
                  • {activeDbConfig.subtitle}
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-0.5">{activeDbConfig.description}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
            {/* Tab switch for Left Panel */}
            <div className="inline-flex p-1 bg-slate-100 rounded-lg border border-slate-200 text-xs flex-wrap gap-0.5">
              <button
                type="button"
                onClick={() => setActiveTab('data')}
                className={`px-2.5 py-1 font-semibold rounded-md transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'data'
                    ? 'bg-white text-indigo-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <i className="fa-solid fa-table"></i>
                <span>Dữ liệu ({tablesData.length})</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('erd')}
                className={`px-2.5 py-1 font-semibold rounded-md transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'erd'
                    ? 'bg-white text-indigo-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <i className="fa-solid fa-diagram-project"></i>
                <span>Sơ đồ ERD</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('quiz')}
                className={`px-2.5 py-1 font-semibold rounded-md transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'quiz'
                    ? 'bg-white text-indigo-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <i className="fa-solid fa-list-check text-indigo-600"></i>
                <span>Trắc nghiệm ({QUIZZES_BY_DATABASE[currentDbId]?.length || 10} câu)</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('exercises')}
                className={`px-2.5 py-1 font-semibold rounded-md transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'exercises'
                    ? 'bg-white text-indigo-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <i className="fa-solid fa-graduation-cap text-indigo-500"></i>
                <span>Tự luận ({EXERCISES_BY_DATABASE[currentDbId]?.length || 15} câu)</span>
              </button>
            </div>
          </div>
        </div>

        {/* 2-Column Main Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-start">
          
          {/* Left Column: Schema, Data Viewer, ERD, Quiz, or Exercises */}
          <section className="lg:col-span-6 flex flex-col gap-4">
            {activeTab === 'data' ? (
              <DataViewer
                tables={tablesData}
                onRefresh={() => {
                  const updated = getAllTablesData();
                  setTablesData(updated);
                  showNotification('Đã làm mới dữ liệu các bảng!');
                }}
              />
            ) : activeTab === 'erd' ? (
              <ErdViewer
                mermaidCode={activeDbConfig.mermaidErd}
                databaseName={activeDbConfig.name}
              />
            ) : activeTab === 'quiz' ? (
              <QuizViewer
                quizzes={QUIZZES_BY_DATABASE[currentDbId] || []}
                databaseName={activeDbConfig.name}
                databaseId={currentDbId}
                dbConfig={activeDbConfig}
                onApplySql={handleApplySql}
                onPracticePrompt={(prompt) => {
                  setSqlInput(prompt);
                  showNotification('Đã nạp đề bài vào khung soạn thảo!');
                }}
              />
            ) : (
              <ExerciseViewer
                exercises={EXERCISES_BY_DATABASE[currentDbId] || []}
                databaseName={activeDbConfig.name}
                databaseId={currentDbId}
                dbConfig={activeDbConfig}
                onApplySql={handleApplySql}
                onPracticePrompt={(prompt) => {
                  setSqlInput(prompt);
                  showNotification('Đã nạp đề bài vào khung soạn thảo!');
                }}
              />
            )}

            {/* Schema DDL Quick Preview accordion / card */}
            <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-2xs">
              <details className="group">
                <summary className="text-xs font-semibold text-slate-700 flex items-center justify-between cursor-pointer select-none">
                  <div className="flex items-center gap-2">
                    <i className="fa-solid fa-code text-indigo-500"></i>
                    <span>Xem mã DDL định nghĩa các bảng (SQLite Syntax)</span>
                  </div>
                  <i className="fa-solid fa-chevron-down text-slate-400 group-open:rotate-180 transition-transform text-xs"></i>
                </summary>
                <pre className="mt-2.5 p-3 bg-slate-900 text-indigo-200 rounded-lg text-[11px] font-mono overflow-x-auto leading-relaxed max-h-48">
                  {activeDbConfig.ddl}
                </pre>
              </details>
            </div>
          </section>

          {/* Right Column: SQL Editor, Gemini AI Assistant & Query Result */}
          <section className="lg:col-span-6 flex flex-col gap-4">
            {/* Gemini Assistant (Text-to-SQL + Explanations) */}
            <GeminiPanel
              dbConfig={activeDbConfig}
              onApplySql={handleApplySql}
              onGenerateTextToSql={handleTextToSql}
              isGenerating={isGenerating}
              aiOutput={aiOutput}
              onCloseOutput={() => setAiOutput(null)}
            />

            {/* SQL Practice Editor */}
            <SqlEditor
              sql={sqlInput}
              onChange={setSqlInput}
              onExecute={() => handleExecuteSql()}
              isExecuting={isExecuting}
              sampleQueries={activeDbConfig.sampleQueries}
              onExplain={handleExplainSql}
              isExplaining={isExplaining}
            />

            {/* Query Result View */}
            <QueryResultView
              result={queryResult}
              onAskGeminiFix={handleFixSql}
              isFixing={isFixing}
            />
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-8 border-t border-slate-200 bg-white py-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>
            <strong>SQL Lab Visualizer</strong> • Môi trường thực hành CSDL trực quan trên trình duyệt (WebAssembly SQLite & Mermaid ERD).
          </p>
          <div className="flex items-center gap-4 text-slate-400">
            <span>5 Bộ CSDL: Học sinh, Kinh doanh, Học tập, Thư viện, Âm nhạc</span>
            <span>•</span>
            <span>Gemini Flash AI</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
