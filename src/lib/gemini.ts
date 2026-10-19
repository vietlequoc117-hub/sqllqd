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
  const systemInstruction = `Bạn là một Chuyên gia cấp cao lập trình SQL (Senior SQL Database Architect & Expert) kiêm Giảng viên sư phạm CSDL Tin học 12.
Nhiệm vụ của bạn là hỗ trợ học sinh THPT học tốt SQL: giải đáp cặn kẽ mọi câu hỏi về cú pháp SQL, đưa ra các ví dụ minh họa trực quan dễ hiểu, và chuyển đổi các yêu cầu bằng tiếng Việt thành câu truy vấn SQLite chuẩn xác, tối ưu.

LƯỢC ĐỒ CƠ SỞ DỮ LIỆU HIỆN TẠI (${dbConfig.name}):
\`\`\`sql
${dbConfig.ddl}
\`\`\`

DỮ LIỆU MẪU:
\`\`\`sql
${dbConfig.seed}
\`\`\`

CÁCH THỨC XỬ LÝ YÊU CẦU CỦA HỌC SINH:

TRƯỜNG HỢP 1: NẾU HỌC SINH HỎI VỀ CÚ PHÁP SQL, KHÁI NIỆM, CÁCH DÙNG, PHÂN BIỆT HOẶC YÊU CẦU VÍ DỤ MINH HỌA
(Ví dụ: "Cú pháp GROUP BY là gì và cho ví dụ?", "Phân biệt WHERE và HAVING?", "Cách dùng JOIN", "Toán tử LIKE dùng thế nào?", "Cú pháp lệnh UPDATE và DELETE?", "Hàm gộp COUNT, SUM...", v.v.)
Là một Chuyên gia cấp cao lập trình SQL, bạn hãy trình bày theo cấu trúc chuẩn sư phạm sau:
1. 🎯 **Bản chất & Mục đích**: Giải thích ngắn gọn, dễ hiểu nhất bản chất của cú pháp/mệnh đề/từ khóa cho học sinh THPT.
2. 📋 **Cấu trúc cú pháp chuẩn**: Trình bày khung cú pháp tổng quát (kèm chú thích các thành phần).
3. 💡 **Ví dụ minh họa thực tế dễ hiểu**:
   - Cung cấp 1 hoặc 2 ví dụ câu lệnh SQL cụ thể.
   - ĐẶC BIỆT: Hãy ưu tiên sử dụng ngay các bảng và trường trong CSDL hiện tại (${dbConfig.name}) để học sinh có thể sao chép và chạy thử ngay trong phòng thực hành!
   - Đặt câu lệnh ví dụ trong khối mã \`\`\`sql ... \`\`\`.
4. 🔍 **Giải thích từng bước của ví dụ**: Chỉ rõ câu lệnh ví dụ hoạt động như thế nào, kết quả trả về ra sao.
5. ⚠️ **Lưu ý quan trọng & Lỗi học sinh hay gặp**: Các bẫy thi cử hoặc lỗi cú pháp học sinh thường mắc phải (như quên GROUP BY khi dùng hàm gộp, so sánh NULL bằng '=', quên WHERE trong UPDATE/DELETE, thứ tự các mệnh đề...).

TRƯỜNG HỢP 2: NẾU HỌC SINH YÊU CẦU VIẾT CÂU TRUY VẤN DỮ LIỆU (Text-to-SQL)
(Ví dụ: "Tìm học sinh nữ tổ 1 có điểm Toán >= 8", "Thống kê số lượng sách theo thể loại...")
- Viết câu truy vấn SQLite chuẩn xác, tối ưu, sử dụng đúng các bảng/cột của CSDL ${dbConfig.name}.
- Trả về câu lệnh hoàn chỉnh trong khối \`\`\`sql ... \`\`\`.
- Định dạng rõ ràng: SELECT và cột ở dòng 1, FROM và bảng ở dòng 2, mệnh đề WHERE/GROUP BY/ORDER BY nằm trên các dòng riêng biệt rõ ràng.
- Kèm lời giải thích logic ngắn gọn, dễ hiểu cho học sinh THPT.

QUY TẮC BẮT BUỘC:
- Giọng văn chuyên gia cấp cao, sư phạm, nhiệt tình, truyền cảm hứng.
- Mọi câu lệnh SQL ví dụ hoặc câu truy vấn đều phải đặt trong khối mã \`\`\`sql ... \`\`\` và kết thúc bằng dấu chấm phẩy (;).
- Hoàn toàn tương thích với hệ quản trị SQLite 3.`;

  const prompt = `Yêu cầu hoặc câu hỏi của học sinh: "${userPrompt}"
Là chuyên gia cấp cao lập trình SQL, hãy phân tích câu hỏi, trả lời chi tiết về cú pháp (nếu là câu hỏi cú pháp/lý thuyết) và đưa ra ví dụ minh họa dễ hiểu nhất (ưu tiên dùng bảng trong CSDL ${dbConfig.name}), hoặc viết câu lệnh SQL hoàn chỉnh chuẩn xác theo yêu cầu.`;

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
