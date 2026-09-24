import { DatabaseConfig, QueryResult, TableData, TableColumnInfo } from '../types';

declare global {
  interface Window {
    initSqlJs: any;
  }
}

let sqlInstance: any = null;
let currentDb: any = null;

export async function getSqlInstance() {
  if (sqlInstance) return sqlInstance;

  if (typeof window === 'undefined' || !window.initSqlJs) {
    // Wait for script to load if needed
    await new Promise((resolve, reject) => {
      let attempts = 0;
      const check = () => {
        if (window.initSqlJs) {
          resolve(true);
        } else if (attempts > 50) {
          reject(new Error('sql.js chưa sẵn sàng trên trình duyệt. Vui lòng kiểm tra kết nối mạng.'));
        } else {
          attempts++;
          setTimeout(check, 100);
        }
      };
      check();
    });
  }

  sqlInstance = await window.initSqlJs({
    locateFile: (file: string) => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/${file}`,
  });
  return sqlInstance;
}

export async function initializeDatabase(config: DatabaseConfig): Promise<void> {
  const SQL = await getSqlInstance();

  if (currentDb) {
    try {
      currentDb.close();
    } catch (e) {
      console.warn('Lỗi đóng CSDL cũ:', e);
    }
  }

  currentDb = new SQL.Database();

  // Enable foreign keys in SQLite
  currentDb.run('PRAGMA foreign_keys = ON;');

  // Run DDL
  currentDb.run(config.ddl);

  // Run Seed data
  if (config.seed && config.seed.trim().length > 0) {
    currentDb.run(config.seed);
  }
}

export function getCurrentDb() {
  return currentDb;
}

export function executeQuery(sqlString: string): QueryResult {
  const trimmed = sqlString.trim();
  const timestamp = new Date().toLocaleTimeString('vi-VN');

  if (!trimmed) {
    return {
      columns: [],
      values: [],
      executionTimeMs: 0,
      queryType: 'SELECT',
      rawQuery: sqlString,
      error: 'Câu lệnh SQL rỗng. Vui lòng nhập câu lệnh để thực thi.',
      timestamp,
    };
  }

  if (!currentDb) {
    return {
      columns: [],
      values: [],
      executionTimeMs: 0,
      queryType: 'SELECT',
      rawQuery: sqlString,
      error: 'CSDL chưa được khởi tạo. Vui lòng chọn hoặc tải lại CSDL.',
      timestamp,
    };
  }

  const firstWord = trimmed.split(/\s+/)[0]?.toUpperCase();
  const isSelect = firstWord === 'SELECT' || firstWord === 'WITH' || firstWord === 'PRAGMA' || firstWord === 'EXPLAIN';
  const isDml = firstWord === 'INSERT' || firstWord === 'UPDATE' || firstWord === 'DELETE';
  const queryType: 'SELECT' | 'DML' | 'DDL' = isSelect ? 'SELECT' : isDml ? 'DML' : 'DDL';

  const startTime = performance.now();

  try {
    const results = currentDb.exec(trimmed);
    const endTime = performance.now();
    const executionTimeMs = Math.round((endTime - startTime) * 100) / 100;

    if (results && results.length > 0) {
      const lastResult = results[results.length - 1];
      const affected = isDml ? currentDb.getRowsModified() : undefined;

      return {
        columns: lastResult.columns || [],
        values: lastResult.values || [],
        affectedRows: affected,
        executionTimeMs,
        queryType,
        rawQuery: sqlString,
        timestamp,
      };
    }

    // Statements with no tabular result (DML/DDL)
    const affected = isDml ? currentDb.getRowsModified() : undefined;
    return {
      columns: [],
      values: [],
      affectedRows: affected,
      executionTimeMs,
      queryType,
      rawQuery: sqlString,
      timestamp,
    };
  } catch (error: any) {
    const endTime = performance.now();
    return {
      columns: [],
      values: [],
      executionTimeMs: Math.round((endTime - startTime) * 100) / 100,
      queryType,
      rawQuery: sqlString,
      error: error?.message || 'Lỗi cú pháp hoặc thực thi câu lệnh SQL.',
      timestamp,
    };
  }
}

export function getAllTablesData(): TableData[] {
  if (!currentDb) return [];

  try {
    const tableQuery = currentDb.exec(
      "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY name;"
    );

    if (!tableQuery || tableQuery.length === 0 || !tableQuery[0].values) {
      return [];
    }

    const tableNames: string[] = tableQuery[0].values.map((v: any) => v[0]);
    const tablesData: TableData[] = [];

    for (const tableName of tableNames) {
      // Pragma column info
      const pragmaResult = currentDb.exec(`PRAGMA table_info("${tableName}");`);
      const columnDetails: TableColumnInfo[] = [];

      if (pragmaResult && pragmaResult.length > 0 && pragmaResult[0].values) {
        for (const row of pragmaResult[0].values) {
          columnDetails.push({
            cid: row[0],
            name: row[1],
            type: row[2],
            notnull: row[3],
            dflt_value: row[4],
            pk: row[5],
          });
        }
      }

      // Query table content
      const contentResult = currentDb.exec(`SELECT * FROM "${tableName}";`);
      let columns: string[] = [];
      let rows: any[][] = [];

      if (contentResult && contentResult.length > 0) {
        columns = contentResult[0].columns || [];
        rows = contentResult[0].values || [];
      } else {
        columns = columnDetails.map((c) => c.name);
      }

      tablesData.push({
        tableName,
        columns,
        columnDetails,
        rows,
        rowCount: rows.length,
      });
    }

    return tablesData;
  } catch (err) {
    console.error('Lỗi khi tải dữ liệu bảng:', err);
    return [];
  }
}
