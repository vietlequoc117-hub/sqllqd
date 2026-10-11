import { DatabaseConfig } from '../types';
import { formatSql } from './formatSql';
import {
  generateOfflineSql,
  explainOfflineSql,
  fixOfflineSql,
} from './offlineAssistant';

export interface AiTaskResult {
  text: string;
  error?: string;
  sqlOnly?: string;
}

async function callGeminiApi(
  prompt: string,
  systemInstruction?: string
): Promise<string> {
  const res = await fetch('/api/gemini/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      prompt,
      systemInstruction,
    }),
  });

  const data = await res.json().catch(() => ({}));
  if (res.ok && data.text) {
    return data.text;
  }

  throw new Error(data.error || `HTTP ${res.status}`);
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
 * Hoạt động tự động 100% không cần học sinh thiết lập API key.
 */
export async function generateTextToSql(
  userPrompt: string,
  dbConfig: DatabaseConfig
): Promise<AiTaskResult> {
  const systemInstruction = `Bạn là một chuyên gia cơ sở dữ liệu SQLite và giảng viên hướng dẫn thực hành Tin học 12.
Nhiệm vụ của bạn là nhận yêu cầu bằng tiếng Việt của học sinh và chuyển thành câu truy vấn SQLite chuẩn xác, tối ưu, dễ hiểu.
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
- ĐỊNH DẠNG CẤU TRÚC RÕ RÀNG THEO CHUẨN SƯ PHẠM:
  + Mệnh đề SELECT và danh sách các cột trên dòng 1
  + Mệnh đề FROM và tên bảng trên dòng 2
  + Mệnh đề WHERE đứng RIÊNG TRÊN 1 DÒNG ĐỘC LẬP
  + Điều kiện lọc nằm ở dòng tiếp theo ngay bên dưới WHERE
- Sau khối mã, hãy thêm 1-2 câu giải thích ngắn gọn bằng tiếng Việt về logic truy vấn cho học sinh dễ hiểu.
- Luôn kết thúc câu lệnh SQL bằng dấu chấm phẩy (;).
- Đảm bảo tương thích hoàn toàn với SQLite 3.`;

  const prompt = `Yêu cầu của học sinh: "${userPrompt}"
Hãy viết câu lệnh SQL SQLite chính xác để đáp ứng yêu cầu trên. Chú ý cấu trúc xuống dòng đúng chuẩn (mệnh đề WHERE đứng riêng 1 dòng độc lập).`;

  try {
    let rawText = await callGeminiApi(prompt, systemInstruction);
    rawText = rawText.replace(/```(?:sql)?\s*([\s\S]*?)```/gi, (_full, sqlBlock) => {
      const formatted = formatSql(sqlBlock);
      return `\`\`\`sql\n${formatted}\n\`\`\``;
    });
    const sqlOnly = extractSqlCode(rawText);
    return { text: rawText, sqlOnly };
  } catch (_error: any) {
    // Tự động chuyển đổi sang bộ trợ lý nội bộ sư phạm (Offline pedagogical engine)
    return generateOfflineSql(userPrompt, dbConfig);
  }
}

/**
 * 2. Giải thích cú pháp và kết quả câu lệnh SQL cho học sinh
 */
export async function explainSql(
  sqlQuery: string,
  dbConfig: DatabaseConfig
): Promise<AiTaskResult> {
  const systemInstruction = `Bạn là giáo viên dạy môn Tin học 12 (chủ đề Cơ sở dữ liệu và SQL).
Nhiệm vụ của bạn là phân tích chi tiết, dễ hiểu từng mệnh đề của câu lệnh SQL cho học sinh THPT.

LƯỢC ĐỒ CƠ SỞ DỮ LIỆU HIỆN TẠI:
\`\`\`sql
${dbConfig.ddl}
\`\`\`

CẤU TRÚC PHÂN TÍCH:
1. **Mục đích tổng quát**: Câu lệnh này dùng để làm gì?
2. **Chi tiết từng mệnh đề**:
   - Mệnh đề (SELECT, FROM, JOIN, WHERE, GROUP BY, HAVING, ORDER BY, LIMIT...): Nêu rõ tác dụng đối với các trường/bảng liên quan.
3. **Ý nghĩa kết quả**: Kết quả trả về sẽ có dạng như thế nào.
Trình bày ngắn gọn, gạch đầu dòng rõ ràng, ngôn ngữ sư phạm dễ hiểu cho học sinh THPT.`;

  const prompt = `Hãy giải thích câu lệnh SQL sau một cách rõ ràng, sư phạm:
\`\`\`sql
${sqlQuery}
\`\`\``;

  try {
    const rawText = await callGeminiApi(prompt, systemInstruction);
    return { text: rawText };
  } catch (_error: any) {
    return explainOfflineSql(sqlQuery, dbConfig);
  }
}

/**
 * 3. Tự động phân tích và sửa lỗi cú pháp khi học sinh gõ sai câu lệnh SQL
 */
export async function fixSqlError(
  sqlQuery: string,
  errorMessage: string,
  dbConfig: DatabaseConfig
): Promise<AiTaskResult> {
  const systemInstruction = `Bạn là trợ lý gỡ lỗi SQL dành cho học sinh THPT.
Học sinh vừa chạy một câu lệnh SQL và gặp lỗi cú pháp hoặc vi phạm ràng buộc CSDL.

LƯỢC ĐỒ CƠ SỞ DỮ LIỆU HIỆN TẠI:
\`\`\`sql
${dbConfig.ddl}
\`\`\`

NHIỆM VỤ:
1. Chỉ ra chính xác nguyên nhân gây lỗi (sai tên bảng/cột, thiếu dấu ngoặc, lỗi kiểu dữ liệu, thiếu nháy đơn, vi phạm ràng buộc...).
2. Cung cấp câu lệnh SQL ĐÃ ĐƯỢC SỬA LỖI hoàn chỉnh trong khối \`\`\`sql ... \`\`\`.
3. Đưa ra mẹo nhỏ giúp học sinh tránh lỗi này trong tương lai.`;

  const prompt = `Câu lệnh bị lỗi:
\`\`\`sql
${sqlQuery}
\`\`\`

Thông báo lỗi từ hệ thống SQLite:
"${errorMessage}"

Hãy phân tích lỗi và sửa lại câu lệnh chính xác cho học sinh.`;

  try {
    let rawText = await callGeminiApi(prompt, systemInstruction);
    rawText = rawText.replace(/```(?:sql)?\s*([\s\S]*?)```/gi, (_full, sqlBlock) => {
      const formatted = formatSql(sqlBlock);
      return `\`\`\`sql\n${formatted}\n\`\`\``;
    });
    const sqlOnly = extractSqlCode(rawText);
    return { text: rawText, sqlOnly };
  } catch (_error: any) {
    return fixOfflineSql(sqlQuery, errorMessage, dbConfig);
  }
}
