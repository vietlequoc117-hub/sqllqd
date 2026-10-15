/**
 * High-performance, lightweight SQL Syntax Highlighter
 * Specially designed for SQLite & High school database curriculum.
 * Accurately highlights keywords in bold blue/purple, strings in coral/red,
 * numbers in emerald, comments in slate italic, matching the user reference image.
 */

const SQL_KEYWORDS = new Set([
  'SELECT', 'FROM', 'WHERE', 'INSERT', 'INTO', 'VALUES', 'UPDATE', 'SET',
  'DELETE', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'CROSS', 'NATURAL',
  'ON', 'GROUP', 'BY', 'ORDER', 'HAVING', 'LIMIT', 'OFFSET', 'ASC', 'DESC',
  'AND', 'OR', 'NOT', 'IN', 'BETWEEN', 'LIKE', 'IS', 'NULL', 'AS', 'DISTINCT',
  'UNION', 'ALL', 'CASE', 'WHEN', 'THEN', 'ELSE', 'END', 'EXISTS',
  'CREATE', 'TABLE', 'DROP', 'ALTER', 'VIEW', 'INDEX', 'TRIGGER', 'DATABASE',
  'PRIMARY', 'KEY', 'FOREIGN', 'REFERENCES', 'DEFAULT', 'CHECK', 'UNIQUE',
  'AUTOINCREMENT', 'INTEGER', 'INT', 'TEXT', 'REAL', 'FLOAT', 'DOUBLE',
  'BLOB', 'VARCHAR', 'CHAR', 'NUMERIC', 'BOOLEAN', 'DATE', 'DATETIME',
  'PRAGMA', 'BEGIN', 'TRANSACTION', 'COMMIT', 'ROLLBACK'
]);

const SQL_FUNCTIONS = new Set([
  'COUNT', 'SUM', 'AVG', 'MIN', 'MAX', 'ROUND', 'UPPER', 'LOWER',
  'LENGTH', 'SUBSTR', 'TRIM', 'COALESCE', 'IFNULL', 'TOTAL', 'INSTR',
  'RANDOM', 'ABS', 'STRFTIME', 'DATE', 'TIME'
]);

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export interface HighlightOptions {
  isDark?: boolean;
}

export function highlightSqlToHtml(sql: string, options: HighlightOptions = {}): string {
  if (!sql) return '';

  const isDark = Boolean(options.isDark);

  // Exact match for user reference image:
  // DELETE, FROM, WHERE in bold blue / purple
  const keywordClass = isDark
    ? 'text-blue-400 font-bold'
    : 'text-blue-600 font-bold';

  const funcClass = isDark
    ? 'text-purple-400 font-bold'
    : 'text-purple-600 font-bold';

  // Exact match for '000000' in user reference image: coral / red
  const stringClass = isDark
    ? 'text-rose-400'
    : 'text-rose-600 font-medium';

  const numberClass = isDark
    ? 'text-emerald-400'
    : 'text-emerald-600 font-medium';

  const commentClass = isDark
    ? 'text-slate-500 italic'
    : 'text-slate-400 italic';

  const operatorClass = isDark
    ? 'text-slate-300'
    : 'text-slate-600 font-medium';

  // Regular expression matching tokens in priority order:
  // 1. Strings: '...' or "..." (supports escaping)
  // 2. Line comment: -- ...
  // 3. Block comment: /* ... */
  // 4. Numbers: 123, 45.67
  // 5. Words (keywords, functions, identifiers): [A-Za-z_][A-Za-z0-9_]*
  // 6. Operators: <=, >=, <>, !=, =, <, >, +, -, *, /, %, ;, ,, etc.
  const tokenRegex = /('(?:''|[^'\\]|\\.)*'|"(?:""|[^"\\]|\\.)*")|(--[^\r\n]*)|(\/\*[\s\S]*?\*\/)|(\b\d+(?:\.\d+)?\b)|(\b[A-Za-z_][A-Za-z0-9_]*\b)|([=!<>]=?|<>|[+\-*/%(),;.]|\bAND\b|\bOR\b|\bNOT\b)/gi;

  let lastIndex = 0;
  let html = '';
  let match: RegExpExecArray | null;

  while ((match = tokenRegex.exec(sql)) !== null) {
    if (match.index > lastIndex) {
      html += escapeHtml(sql.substring(lastIndex, match.index));
    }

    const [fullMatch, strLiteral, lineComment, blockComment, numberMatch, wordMatch, opMatch] = match;

    if (strLiteral !== undefined) {
      html += `<span class="${stringClass}">${escapeHtml(strLiteral)}</span>`;
    } else if (lineComment !== undefined || blockComment !== undefined) {
      const comment = lineComment || blockComment;
      html += `<span class="${commentClass}">${escapeHtml(comment)}</span>`;
    } else if (numberMatch !== undefined) {
      html += `<span class="${numberClass}">${escapeHtml(numberMatch)}</span>`;
    } else if (wordMatch !== undefined) {
      const upperWord = wordMatch.toUpperCase();
      if (SQL_KEYWORDS.has(upperWord)) {
        html += `<span class="${keywordClass}">${escapeHtml(wordMatch)}</span>`;
      } else if (SQL_FUNCTIONS.has(upperWord)) {
        html += `<span class="${funcClass}">${escapeHtml(wordMatch)}</span>`;
      } else {
        html += escapeHtml(wordMatch);
      }
    } else if (opMatch !== undefined) {
      html += `<span class="${operatorClass}">${escapeHtml(opMatch)}</span>`;
    } else {
      html += escapeHtml(fullMatch);
    }

    lastIndex = tokenRegex.lastIndex;
  }

  if (lastIndex < sql.length) {
    html += escapeHtml(sql.substring(lastIndex));
  }

  return html;
}
