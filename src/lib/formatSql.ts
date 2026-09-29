/**
 * Formats an SQL query into pedagogical multiline style:
 * SELECT ...
 * FROM ...
 * WHERE ...
 * GROUP BY ...
 * ORDER BY ...
 */
export function formatSql(rawSql: string): string {
  if (!rawSql || !rawSql.trim()) return '';

  let sql = rawSql.trim();

  // Normalize spaces
  sql = sql.replace(/\r\n/g, '\n').replace(/\t/g, ' ');

  // List of keywords to uppercase
  const allKeywords = [
    'SELECT', 'DISTINCT', 'AS', 'FROM', 'WHERE', 'JOIN', 'INNER JOIN', 'LEFT JOIN',
    'RIGHT JOIN', 'CROSS JOIN', 'ON', 'GROUP BY', 'HAVING', 'ORDER BY', 'ASC', 'DESC',
    'LIMIT', 'OFFSET', 'INSERT INTO', 'VALUES', 'UPDATE', 'SET', 'DELETE FROM',
    'CREATE TABLE', 'ALTER TABLE', 'DROP TABLE', 'PRIMARY KEY', 'FOREIGN KEY',
    'REFERENCES', 'AUTOINCREMENT', 'AND', 'OR', 'NOT', 'NULL', 'IS NULL',
    'IS NOT NULL', 'IN', 'BETWEEN', 'LIKE', 'COUNT', 'SUM', 'AVG', 'MIN', 'MAX',
    'ROUND', 'UNION', 'ALL', 'CASE', 'WHEN', 'THEN', 'ELSE', 'END'
  ];

  // Uppercase keywords when they appear as words
  allKeywords.forEach((kw) => {
    const regex = new RegExp(`\\b${kw}\\b`, 'gi');
    sql = sql.replace(regex, kw);
  });

  // Major clause boundaries that should start on a fresh newline
  const clauseKeywords = [
    'SELECT',
    'FROM',
    'WHERE',
    'LEFT JOIN',
    'RIGHT JOIN',
    'INNER JOIN',
    'JOIN',
    'GROUP BY',
    'HAVING',
    'ORDER BY',
    'LIMIT',
    'INSERT INTO',
    'VALUES',
    'UPDATE',
    'SET',
    'DELETE FROM',
    'UNION ALL',
    'UNION'
  ];

  // Split lines if not already on separate lines
  // Create a regex to match clause keywords outside parentheses or strings
  for (const clause of clauseKeywords) {
    // Replace with \n<CLAUSE> if it's not already preceded by newline
    const re = new RegExp(`(^|[^\\n])\\s*\\b(${clause})\\b`, 'g');
    sql = sql.replace(re, (_match, prefix, kw) => {
      const cleanPrefix = prefix.trimEnd();
      if (!cleanPrefix) return kw;
      return `${cleanPrefix}\n${kw}`;
    });
  }

  // Clean up multiple consecutive empty lines and trim each line
  const rawLines = sql
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  const formattedLines: string[] = [];
  for (let i = 0; i < rawLines.length; i++) {
    const line = rawLines[i];
    // If line is just "WHERE" and has a condition on next line, keep condition on the same line (WHERE condition)
    if (/^WHERE$/i.test(line) && i + 1 < rawLines.length) {
      const nextLine = rawLines[i + 1];
      const isNextClause = clauseKeywords.some(
        (kw) => kw !== 'WHERE' && new RegExp(`^${kw}\\b`, 'i').test(nextLine)
      );
      if (!isNextClause) {
        formattedLines.push(`WHERE ${nextLine}`);
        i++;
        continue;
      }
    }
    formattedLines.push(line);
  }

  let result = formattedLines.join('\n');

  // Ensure trailing semicolon if missing
  if (!result.endsWith(';')) {
    result += ';';
  }

  return result;
}
