export type DatabaseId = 'HOC_SINH' | 'KINH_DOANH' | 'HOC_TAP' | 'AM_NHAC' | 'QL_XE' | 'QL_VANG' | 'QL_CANBO' | 'QL_TV';

export type ExerciseLevel = 'Nhận biết' | 'Thông hiểu' | 'Vận dụng';
export type QuizLevel = 'Nhận biết' | 'Thông hiểu' | 'Vận dụng';

export interface Exercise {
  id: string;
  level: ExerciseLevel;
  order: number;
  question: string;
  hint: string;
  solutionSql: string;
  explanation: string;
}

export interface QuizOption {
  key: 'A' | 'B' | 'C' | 'D';
  text: string;
}

export interface QuizQuestion {
  id: string;
  databaseId: DatabaseId;
  level: QuizLevel;
  order: number;
  question: string;
  sqlSnippet?: string;
  options: QuizOption[];
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  explanation: string;
  relatedSql?: string;
}

export interface SampleQuery {
  title: string;
  sql: string;
  explanation: string;
  difficulty: 'Cơ bản' | 'Trung bình' | 'Nâng cao';
}

export interface DatabaseConfig {
  id: DatabaseId;
  name: string;
  subtitle: string;
  description: string;
  badge: string;
  iconClass: string;
  ddl: string;
  seed: string;
  mermaidErd: string;
  sampleQueries: SampleQuery[];
}

export interface QueryResult {
  columns: string[];
  values: (string | number | boolean | null)[][];
  affectedRows?: number;
  executionTimeMs: number;
  queryType: 'SELECT' | 'DML' | 'DDL';
  rawQuery: string;
  error?: string;
  timestamp: string;
}

export interface TableColumnInfo {
  cid: number;
  name: string;
  type: string;
  notnull: number;
  dflt_value: any;
  pk: number;
}

export interface TableData {
  tableName: string;
  columns: string[];
  columnDetails: TableColumnInfo[];
  rows: (string | number | boolean | null)[][];
  rowCount: number;
}

export interface GeminiResponse {
  text?: string;
  error?: string;
}
