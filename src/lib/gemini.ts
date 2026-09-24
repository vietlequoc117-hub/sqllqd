import { DatabaseConfig } from '../types';
import { formatSql } from './formatSql';

export interface AiTaskResult {
  text: string;
  error?: string;
  sqlOnly?: string;
}

const LOCAL_STORAGE_KEY = 'sql_visualizer_gemini_api_key';

export function getStoredApiKey(): string {
  if (typeof window === 'undefined') return '';
  return localStorage.getItem(LOCAL_STORAGE_KEY) || '';
}

export function setStoredApiKey(key: string): void {
  if (typeof window === 'undefined') return;
  if (key) {
    localStorage.setItem(LOCAL_STORAGE_KEY, key.trim());
  } else {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  }
}

async function callGeminiApi(
  prompt: string,
  systemInstruction?: string,
  customApiKey?: string
): Promise<string> {
  const effectiveKey = (customApiKey || getStoredApiKey()).trim();

  try {
    const res = await fetch('/api/gemini/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt,
        systemInstruction,
        apiKey: effectiveKey || undefined,
      }),
    });

    const data = await res.json().catch(() => ({}));
    if (res.ok && data.text) {
      return data.text;
    }

    throw new Error(data.error || `Lỗi từ máy chủ AI (HTTP ${res.status}). Vui lòng thử lại.`);
  } catch (err: any) {
    throw new Error(err?.message || 'Không thể kết nối đến máy chủ AI. Vui lòng kiểm tra lại mạng.');
  }
}

function extractSqlCode(text: string): string {
  // Extract ```sql ... ``` or ``` ... ``` block
  let code = '';
  const match = text.match(/```(?:sql)?\s*([\s\S]*?)```/i);
  if (match && match[1]) {
    code = match[1].trim();
  } else {
    // If no markdown block, check if starts with SELECT/INSERT/UPDATE/DELETE
    const trimmed = text.trim();
    if (/^(SELECT|INSERT|UPDATE|DELETE|CREATE|ALTER|DROP|WITH|PRAGMA)\b/i.test(trimmed)) {
      code = trimmed;
    } else {
      code = text.trim();
    }
  }
  return formatSql(code);
}

/**
 * 1. Chuyển đổi ngôn ngữ tự nhiên thành câu lệnh SQL (Text-to-SQL)
 */
export async function generateTextToSql(
  userPrompt: string,
  dbConfig: DatabaseConfig,
  apiKey?: string
): Promise<AiTaskResult> {
  const systemInstruction = `Bạn là một chuyên gia cơ sở dữ liệu SQLite hàng đầu và giảng viên hướng dẫn thực hành SQL.
Nhiệm vụ của bạn là nhận yêu cầu bằng tiếng Việt của người dùng và chuyển thành câu truy vấn SQLite chuẩn xác, tối ưu, an toàn.
Chỉ sử dụng các bảng và trường có trong lược đồ được cung cấp.

LƯỢC ĐỒ CƠ SỞ DỮ LIỆU (${dbConfig.name}):
\`\`\`sql
${dbConfig.ddl}
\`\`\`

DỮ LIỆU MẪU HIỆN CÓ:
\`\`\`sql
${dbConfig.seed}
\`\`\`

QUY TẮC TRẢ VỀ:
- Hãy trả về câu lệnh SQL hoàn chỉnh trong khối mã markdown \`\`\`sql ... \`\`\`.
- ĐỊNH DẠNG CẤU TRÚC RÕ RÀNG THEO CHUẨN SƯ PHẠM (ĐÚNG TỪNG DÒNG NHƯ HÌNH MINH HỌA SGK):
  + Mệnh đề SELECT và danh sách các cột trên dòng 1
  + Mệnh đề FROM và tên bảng trên dòng 2
  + Mệnh đề WHERE đứng RIÊNG TRÊN 1 DÒNG ĐỘC LẬP
  + Điều kiện lọc nằm ở dòng tiếp theo ngay bên dưới WHERE
  Ví dụ chuẩn bắt buộc:
  \`\`\`sql
  SELECT MaSo,HoDem,Ten,GT,DoanVien,NgSinh,DiaChi,To_hoc,Toan,Van
  FROM HOC_SINH
  WHERE
  GT = 'Nữ';
  \`\`\`
- Sau khối mã, hãy thêm 1-2 câu giải thích ngắn gọn bằng tiếng Việt về logic truy vấn.
- Luôn kết thúc câu lệnh SQL bằng dấu chấm phẩy (;).
- Đảm bảo tương thích hoàn toàn với SQLite 3 (ví dụ dùng phép ghép chuỗi ||, hàm ROUND, DATE...).`;

  const prompt = `Yêu cầu người dùng: "${userPrompt}"
Hãy viết câu lệnh SQL SQLite chính xác để đáp ứng yêu cầu trên. Chú ý cấu trúc xuống dòng đúng chuẩn (mệnh đề WHERE đứng riêng 1 dòng độc lập).`;

  try {
    let rawText = await callGeminiApi(prompt, systemInstruction, apiKey);
    rawText = rawText.replace(/```(?:sql)?\s*([\s\S]*?)```/gi, (_full, sqlBlock) => {
      const formatted = formatSql(sqlBlock);
      return `\`\`\`sql\n${formatted}\n\`\`\``;
    });
    const sqlOnly = extractSqlCode(rawText);
    return { text: rawText, sqlOnly };
  } catch (error: any) {
    return { text: '', error: error?.message || 'Có lỗi xảy ra khi tạo câu lệnh SQL.' };
  }
}

/**
 * 2. Giải thích cú pháp và kết quả câu lệnh SQL
 */
export async function explainSql(
  sqlQuery: string,
  dbConfig: DatabaseConfig,
  apiKey?: string
): Promise<AiTaskResult> {
  const systemInstruction = `Bạn là giảng viên dạy môn Cơ sở dữ liệu và SQL.
Nhiệm vụ của bạn là phân tích chi tiết, dễ hiểu từng mệnh đề của câu lệnh SQL cho người học.

LƯỢC ĐỒ CƠ SỞ DỮ LIỆU HIỆN TẠI:
\`\`\`sql
${dbConfig.ddl}
\`\`\`

CẤU TRÚC PHÂN TÍCH:
1. **Mục đích tổng quát**: Câu lệnh này dùng để làm gì?
2. **Chi tiết từng mệnh đề**:
   - Mệnh đề (SELECT, FROM, JOIN, WHERE, GROUP BY, HAVING, ORDER BY, LIMIT, v.v.): Nêu rõ tác dụng đối với các trường/bảng liên quan.
3. **Ý nghĩa kết quả**: Kết quả trả về sẽ có dạng như thế nào.
Trình bày ngắn gọn, gạch đầu dòng rõ ràng, không dùng thuật ngữ quá xa rời thực tế.`;

  const prompt = `Hãy giải thích câu lệnh SQL sau một cách rõ ràng, sư phạm:
\`\`\`sql
${sqlQuery}
\`\`\``;

  try {
    const rawText = await callGeminiApi(prompt, systemInstruction, apiKey);
    return { text: rawText };
  } catch (error: any) {
    return { text: '', error: error?.message || 'Có lỗi xảy ra khi giải thích câu lệnh SQL.' };
  }
}

/**
 * 3. Tự động phân tích và sửa lỗi cú pháp khi truy vấn SQL bị lỗi
 */
export async function fixSqlError(
  sqlQuery: string,
  errorMessage: string,
  dbConfig: DatabaseConfig,
  apiKey?: string
): Promise<AiTaskResult> {
  const systemInstruction = `Bạn là chuyên gia gỡ lỗi SQL (SQL Debugging Assistant).
Người học vừa chạy một câu lệnh SQL và gặp lỗi cú pháp hoặc vi phạm ràng buộc CSDL.

LƯỢC ĐỒ CƠ SỞ DỮ LIỆU HIỆN TẠI:
\`\`\`sql
${dbConfig.ddl}
\`\`\`

NHIỆM VỤ:
1. Chỉ ra chính xác nguyên nhân gây lỗi (sai tên bảng/cột, thiếu dấu ngoặc, lỗi kiểu dữ liệu, sai cú pháp JOIN, vi phạm ràng buộc khóa ngoại, v.v.).
2. Cung cấp câu lệnh SQL ĐÃ ĐƯỢC SỬA LỖI hoàn chỉnh trong khối \`\`\`sql ... \`\`\`.
3. Đưa ra mẹo nhỏ giúp người học tránh lỗi này trong tương lai.`;

  const prompt = `Câu lệnh bị lỗi:
\`\`\`sql
${sqlQuery}
\`\`\`

Thông báo lỗi từ hệ thống SQLite:
"${errorMessage}"

Hãy phân tích lỗi và sửa lại câu lệnh chính xác.`;

  try {
    let rawText = await callGeminiApi(prompt, systemInstruction, apiKey);
    rawText = rawText.replace(/```(?:sql)?\s*([\s\S]*?)```/gi, (_full, sqlBlock) => {
      const formatted = formatSql(sqlBlock);
      return `\`\`\`sql\n${formatted}\n\`\`\``;
    });
    const sqlOnly = extractSqlCode(rawText);
    return { text: rawText, sqlOnly };
  } catch (error: any) {
    return { text: '', error: error?.message || 'Có lỗi xảy ra khi sửa lỗi SQL.' };
  }
}
