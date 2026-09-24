export type DatabaseId = 'HOC_SINH' | 'KINH_DOANH' | 'HOC_TAP' | 'THU_VIEN' | 'AM_NHAC';

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
