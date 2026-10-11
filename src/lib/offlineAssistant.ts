import { DatabaseConfig } from '../types';
import { formatSql } from './formatSql';

export interface OfflineAiResult {
  text: string;
  sqlOnly?: string;
}

/**
 * Intelligent pedagogical SQL generation for high school curriculum (Tin học 12)
 * when Gemini API is unavailable or offline.
 */
export function generateOfflineSql(
  prompt: string,
  dbConfig: DatabaseConfig
): OfflineAiResult {
  const pLower = prompt.toLowerCase().trim();

  // 1. Try matching predefined sample queries for this database
  for (const sample of dbConfig.sampleQueries) {
    const titleLower = sample.title.toLowerCase();
    const words = pLower.split(/\s+/).filter(w => w.length > 2);
    const matchCount = words.filter(w => titleLower.includes(w)).length;
    if (matchCount >= 2 || titleLower.includes(pLower) || pLower.includes(titleLower.slice(0, 15))) {
      const formatted = formatSql(sample.sql);
      const text = `**[Trợ lý AI - Phân tích câu hỏi]**: "${prompt}"

\`\`\`sql
${formatted}
\`\`\`

**Giải thích logic:**
- ${sample.explanation}
- Mức độ: **${sample.difficulty}**`;
      return { text, sqlOnly: formatted };
    }
  }

  // 2. Extract available tables and columns from DDL
  const tableMatches = Array.from(dbConfig.ddl.matchAll(/CREATE\s+TABLE\s+([A-Za-z0-9_]+)\s*\(([\s\S]*?)\);/gi));
  const tables = tableMatches.map(m => ({
    name: m[1],
    columns: m[2]
      .split('\n')
      .map(line => line.trim().split(/\s+/)[0])
      .filter(col => col && !['PRIMARY', 'FOREIGN', 'CONSTRAINT', ')'].includes(col.toUpperCase())),
  }));

  const mainTable = tables[0]?.name || 'DATA';

  // 3. Heuristic generation based on high school query patterns
  let generatedSql = '';
  let rationale = '';

  if (pLower.includes('đếm') || pLower.includes('bao nhiêu') || pLower.includes('thống kê số')) {
    generatedSql = `SELECT COUNT(*) AS Tong_So\nFROM ${mainTable};`;
    rationale = `Sử dụng hàm gộp COUNT(*) từ bảng ${mainTable} để đếm tổng số lượng bản ghi thỏa mãn.`;
  } else if (pLower.includes('nữ')) {
    generatedSql = `SELECT *\nFROM HOC_SINH\nWHERE GT = 'Nữ';`;
    rationale = `Lọc danh sách học sinh mang giới tính 'Nữ' theo chuẩn sách giáo khoa.`;
  } else if (pLower.includes('nam')) {
    generatedSql = `SELECT *\nFROM HOC_SINH\nWHERE GT = 'Nam';`;
    rationale = `Lọc danh sách học sinh mang giới tính 'Nam'.`;
  } else if (pLower.includes('chưa trả') || pLower.includes('đang mượn')) {
    if (dbConfig.id === 'QL_TV') {
      generatedSql = `SELECT s.TenSach, dg.HoTen, mt.NgayMuon, mt.TrangThai\nFROM MUON_TRA mt\nJOIN SACH s ON mt.MaSach = s.MaSach\nJOIN DOCGIA dg ON mt.MaDocGia = dg.MaDocGia\nWHERE mt.TrangThai = 'Đang mượn';`;
      rationale = `Kết hợp bảng MUON_TRA, SACH và DOCGIA, lọc điều kiện TrangThai = 'Đang mượn'.`;
    } else {
      generatedSql = `SELECT * FROM ${mainTable} WHERE TrangThai = 'Chưa trả';`;
      rationale = `Lọc các bản ghi đang mượn chưa hoàn trả.`;
    }
  } else if (pLower.includes('cao nhất') || pLower.includes('lớn nhất') || pLower.includes('top')) {
    const colName = tables[0]?.columns[1] || 'Diem';
    generatedSql = `SELECT *\nFROM ${mainTable}\nORDER BY ${colName} DESC\nLIMIT 1;`;
    rationale = `Sắp xếp giảm dần (DESC) theo cột đánh giá và giới hạn 1 kết quả cao nhất bằng LIMIT 1.`;
  } else {
    // Default safe SELECT *
    generatedSql = `SELECT *\nFROM ${mainTable}\nLIMIT 10;`;
    rationale = `Truy vấn hiển thị thông tin tổng quan từ bảng ${mainTable}.`;
  }

  const formatted = formatSql(generatedSql);
  const text = `**[Trợ lý AI - Đề xuất câu lệnh SQL]**:

\`\`\`sql
${formatted}
\`\`\`

**Giải thích:**
- ${rationale}
- Dữ liệu truy vấn từ cơ sở dữ liệu **${dbConfig.name}**.`;

  return { text, sqlOnly: formatted };
}

/**
 * Intelligent pedagogical SQL query explainer for high school students
 */
export function explainOfflineSql(
  sqlQuery: string,
  dbConfig: DatabaseConfig
): OfflineAiResult {
  const cleanSql = sqlQuery.trim();
  const selectMatch = cleanSql.match(/SELECT\s+([\s\S]*?)\s+FROM/i);
  const fromMatch = cleanSql.match(/FROM\s+([A-Za-z0-9_]+)/i);
  const whereMatch = cleanSql.match(/WHERE\s+([\s\S]*?)(?:GROUP|ORDER|LIMIT|;|$)/i);
  const joinMatches = Array.from(cleanSql.matchAll(/JOIN\s+([A-Za-z0-9_]+)/gi)).map(m => m[1]);
  const orderMatch = cleanSql.match(/ORDER\s+BY\s+([\s\S]*?)(?:LIMIT|;|$)/i);
  const groupMatch = cleanSql.match(/GROUP\s+BY\s+([\s\S]*?)(?:HAVING|ORDER|LIMIT|;|$)/i);
  const limitMatch = cleanSql.match(/LIMIT\s+([0-9]+)/i);

  let explanation = `### 📚 Phân tích câu lệnh SQL (${dbConfig.name})\n\n`;
  explanation += `**1. Mục đích tổng quát:**\n`;
  explanation += `- Truy vấn và hiển thị dữ liệu từ bảng **${fromMatch ? fromMatch[1] : 'CSDL'}** trong cơ sở dữ liệu.\n\n`;

  explanation += `**2. Chi tiết từng mệnh đề:**\n`;
  if (selectMatch) {
    const cols = selectMatch[1].trim();
    if (cols === '*') {
      explanation += `- **Mệnh đề SELECT *:** Lấy toàn bộ các cột thông tin có trong bảng.\n`;
    } else {
      explanation += `- **Mệnh đề SELECT ${cols}:** Chỉ định rõ các cột dữ liệu cần hiển thị trong bảng kết quả.\n`;
    }
  }

  if (fromMatch) {
    explanation += `- **Mệnh đề FROM ${fromMatch[1]}:** Xác định bảng nguồn cung cấp dữ liệu ban đầu.\n`;
  }

  if (joinMatches.length > 0) {
    explanation += `- **Mệnh đề JOIN (${joinMatches.join(', ')}):** Kết nối nhiều bảng lại với nhau thông qua các khóa ngoại (Foreign Key) để tổng hợp thông tin.\n`;
  }

  if (whereMatch) {
    explanation += `- **Mệnh đề WHERE ${whereMatch[1].trim()}:** Áp dụng điều kiện lọc dữ liệu; chỉ những hàng dữ liệu thỏa mãn điều kiện này mới được giữ lại trong kết quả.\n`;
  }

  if (groupMatch) {
    explanation += `- **Mệnh đề GROUP BY ${groupMatch[1].trim()}:** Gom nhóm các dòng có cùng giá trị lại để tính toán các hàm tổng hợp như COUNT, SUM, AVG.\n`;
  }

  if (orderMatch) {
    const isDesc = /DESC/i.test(orderMatch[1]);
    explanation += `- **Mệnh đề ORDER BY ${orderMatch[1].trim()}:** Sắp xếp thứ tự các hàng theo chiều ${isDesc ? 'giảm dần (từ lớn đến bé)' : 'tăng dần (từ bé đến lớn)'}.\n`;
  }

  if (limitMatch) {
    explanation += `- **Mệnh đề LIMIT ${limitMatch[1]}:** Giới hạn chỉ lấy tối đa ${limitMatch[1]} dòng đầu tiên.\n`;
  }

  explanation += `\n**3. Ý nghĩa thực hành:**\n- Giúp người học làm quen với cú pháp chuẩn của hệ quản trị cơ sở dữ liệu quan hệ SQLite theo chương trình Tin học 12.`;

  return { text: explanation };
}

/**
 * Intelligent pedagogical SQL error fixer
 */
export function fixOfflineSql(
  sqlQuery: string,
  errorMessage: string,
  dbConfig: DatabaseConfig
): OfflineAiResult {
  let fixedSql = sqlQuery;
  let reason = '';
  let tip = '';

  // Case 1: Checking NULL with = instead of IS NULL
  if (/=\s*NULL/i.test(fixedSql)) {
    fixedSql = fixedSql.replace(/=\s*NULL/gi, 'IS NULL');
    reason = `Trong SQL, giá trị \`NULL\` đại diện cho dữ liệu chưa xác định, không thể dùng phép toán so sánh bằng (\`=\`). Phải dùng toán tử \`IS NULL\`.`;
    tip = `Luôn ghi nhớ: So sánh với NULL luôn dùng \`IS NULL\` hoặc \`IS NOT NULL\`.`;
  } else if (/(!=|<>\s*NULL)/i.test(fixedSql)) {
    fixedSql = fixedSql.replace(/(!=|<>\s*NULL)/gi, 'IS NOT NULL');
    reason = `Không được dùng \`!= NULL\` hoặc \`<> NULL\`. Phải dùng toán tử \`IS NOT NULL\`.`;
    tip = `Luôn dùng \`IS NOT NULL\` khi muốn lọc các ô có dữ liệu.`;
  }
  // Case 2: Missing quotation marks around string literal (e.g., Lop = 11B)
  else if (errorMessage.toLowerCase().includes('no such column')) {
    const missingColMatch = errorMessage.match(/no such column:\s*([A-Za-z0-9_]+)/i);
    const missingCol = missingColMatch ? missingColMatch[1] : '';

    if (missingCol && !['SELECT', 'FROM', 'WHERE'].includes(missingCol.toUpperCase())) {
      // If student wrote Lop = 11B without quotes
      if (fixedSql.includes(`= ${missingCol}`) || fixedSql.includes(`=${missingCol}`)) {
        fixedSql = fixedSql.replace(new RegExp(`(=|!=)\\s*${missingCol}`, 'g'), `$1 '${missingCol}'`);
        reason = `Hệ thống tưởng \`${missingCol}\` là tên một cột trong bảng vì thiếu dấu nháy đơn bao bọc chuỗi ký tự.`;
        tip = `Dữ liệu chuỗi ký tự (text/varchar) trong SQL luôn phải đặt trong dấu ngoặc đơn, ví dụ: '${missingCol}'.`;
      } else {
        reason = `Cột \`${missingCol}\` không tồn tại trong cơ sở dữ liệu này.`;
        tip = `Vui lòng kiểm tra bảng lược đồ CSDL bên trái để chọn đúng tên cột.`;
      }
    }
  }
  // Case 3: Syntax error near token
  else if (errorMessage.toLowerCase().includes('syntax error')) {
    reason = `Lỗi cú pháp SQL (sai thứ tự các mệnh đề hoặc gõ thiếu từ khóa).`;
    tip = `Thứ tự chuẩn của câu lệnh SQL: SELECT ... FROM ... [JOIN ...] [WHERE ...] [GROUP BY ...] [HAVING ...] [ORDER BY ...] [LIMIT ...];`;
  }
  // Case 4: General error
  else {
    reason = `Phát hiện lỗi khi thực thi câu truy vấn: "${errorMessage}".`;
    tip = `Hãy kiểm tra lại tên bảng, tên cột và kết thúc câu lệnh bằng dấu chấm phẩy (;).`;
  }

  // Ensure semicolon at the end
  if (!fixedSql.trim().endsWith(';')) {
    fixedSql = fixedSql.trim() + ';';
  }

  const formatted = formatSql(fixedSql);
  const text = `### 🛠️ Phân tích và Sửa lỗi câu lệnh SQL

**Nguyên nhân gây lỗi:**
- ${reason}

**Câu lệnh đã được sửa chuẩn xác:**
\`\`\`sql
${formatted}
\`\`\`

💡 **Mẹo sư phạm:**
- ${tip}`;

  return { text, sqlOnly: formatted };
}
