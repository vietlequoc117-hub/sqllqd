import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  WidthType,
  AlignmentType,
  BorderStyle,
  ShadingType,
  convertInchesToTwip
} from 'docx';
import { DatabaseConfig, Exercise } from '../types';

export function createDatabaseDocx(
  dbConfig: DatabaseConfig,
  exercises: Exercise[],
  options: { includeAnswers?: boolean } = { includeAnswers: true }
): Document {
  const includeAnswers = options.includeAnswers !== false;

  const doc = new Document({
    styles: {
      default: {
        document: {
          run: {
            font: 'Times New Roman',
            size: 24, // 12pt
            color: '1E293B',
          },
          paragraph: {
            spacing: {
              line: 276, // 1.15 line spacing
              after: 120,
            },
          },
        },
      },
    },
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: convertInchesToTwip(0.8),
              bottom: convertInchesToTwip(0.8),
              left: convertInchesToTwip(0.9),
              right: convertInchesToTwip(0.8),
            },
          },
        },
        children: [
          // Header: School Header
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            borders: {
              top: { style: BorderStyle.NONE },
              bottom: { style: BorderStyle.NONE },
              left: { style: BorderStyle.NONE },
              right: { style: BorderStyle.NONE },
              insideHorizontal: { style: BorderStyle.NONE },
              insideVertical: { style: BorderStyle.NONE },
            },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    width: { size: 50, type: WidthType.PERCENTAGE },
                    children: [
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                          new TextRun({
                            text: 'SỞ GIÁO DỤC VÀ ĐÀO TẠO',
                            size: 20,
                            bold: true,
                          }),
                        ],
                      }),
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                          new TextRun({
                            text: 'TRƯỜNG THPT CHUYÊN / CHUẨN',
                            size: 20,
                            bold: true,
                          }),
                        ],
                      }),
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                          new TextRun({
                            text: '---------------------',
                            size: 20,
                            color: '64748B',
                          }),
                        ],
                      }),
                    ],
                  }),
                  new TableCell({
                    width: { size: 50, type: WidthType.PERCENTAGE },
                    children: [
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                          new TextRun({
                            text: 'CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM',
                            size: 20,
                            bold: true,
                          }),
                        ],
                      }),
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                          new TextRun({
                            text: 'Độc lập - Tự do - Hạnh phúc',
                            size: 20,
                            italics: true,
                            bold: true,
                          }),
                        ],
                      }),
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                          new TextRun({
                            text: '---------------------',
                            size: 20,
                            color: '64748B',
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),

          new Paragraph({ spacing: { before: 200, after: 100 } }),

          // Title
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: 'BÀI TẬP TỰ LUẬN TRUY VẤN CƠ SỞ DỮ LIỆU SQL',
                size: 32, // 16pt
                bold: true,
                color: '1E3A8A', // Indigo / Dark Blue
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: `CHUYÊN ĐỀ: ${dbConfig.name.toUpperCase()}`,
                size: 26, // 13pt
                bold: true,
                color: '0369A1',
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: '(Ma trận 3 cấp độ: 5 Nhận biết - 5 Thông hiểu - 5 Vận dụng • Chuẩn SGK Tin học)',
                size: 22, // 11pt
                italics: true,
                color: '475569',
              }),
            ],
          }),

          new Paragraph({ spacing: { before: 150, after: 150 } }),

          // Student metadata box
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            borders: {
              top: { style: BorderStyle.SINGLE, size: 2, color: 'CBD5E1' },
              bottom: { style: BorderStyle.SINGLE, size: 2, color: 'CBD5E1' },
              left: { style: BorderStyle.SINGLE, size: 2, color: 'CBD5E1' },
              right: { style: BorderStyle.SINGLE, size: 2, color: 'CBD5E1' },
              insideHorizontal: { style: BorderStyle.NONE },
              insideVertical: { style: BorderStyle.NONE },
            },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    shading: { type: ShadingType.CLEAR, fill: 'F8FAFC' },
                    children: [
                      new Paragraph({
                        spacing: { before: 60, after: 60 },
                        children: [
                          new TextRun({ text: 'Họ và tên học sinh: ................................................................ ', bold: true }),
                          new TextRun({ text: 'Lớp: ........................   ', bold: true }),
                          new TextRun({ text: 'Ngày làm bài: ....../....../202...', bold: true }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),

          new Paragraph({ spacing: { before: 200, after: 100 } }),

          // Database Information Section
          new Paragraph({
            children: [
              new TextRun({
                text: 'A. CẤU TRÚC VÀ ĐẶC TẢ CƠ SỞ DỮ LIỆU',
                size: 26,
                bold: true,
                color: '1E3A8A',
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'Mô tả hệ thống: ', bold: true }),
              new TextRun({ text: dbConfig.description }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'Phân loại: ', bold: true }),
              new TextRun({ text: `${dbConfig.badge} (${dbConfig.subtitle})` }),
            ],
          }),

          // Schema DDL box
          new Paragraph({
            spacing: { before: 100, after: 60 },
            children: [
              new TextRun({
                text: 'Cấu trúc định nghĩa bảng (DDL):',
                bold: true,
                color: '334155',
              }),
            ],
          }),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            borders: {
              top: { style: BorderStyle.SINGLE, size: 2, color: 'CBD5E1' },
              bottom: { style: BorderStyle.SINGLE, size: 2, color: 'CBD5E1' },
              left: { style: BorderStyle.SINGLE, size: 6, color: '3B82F6' },
              right: { style: BorderStyle.SINGLE, size: 2, color: 'CBD5E1' },
              insideHorizontal: { style: BorderStyle.NONE },
              insideVertical: { style: BorderStyle.NONE },
            },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    shading: { type: ShadingType.CLEAR, fill: 'F1F5F9' },
                    children: dbConfig.ddl.split('\n').map((line) =>
                      new Paragraph({
                        spacing: { before: 20, after: 20 },
                        children: [
                          new TextRun({
                            text: line,
                            font: 'Courier New',
                            size: 19,
                            color: '1E293B',
                          }),
                        ],
                      })
                    ),
                  }),
                ],
              }),
            ],
          }),

          new Paragraph({ spacing: { before: 240, after: 100 } }),

          // Part B: Exercises
          new Paragraph({
            children: [
              new TextRun({
                text: 'B. HỆ THỐNG CÂU HỎI TỰ LUẬN',
                size: 26,
                bold: true,
                color: '1E3A8A',
              }),
            ],
          }),

          ...buildExercisesSection(
            'PHẦN I. CÁC CÂU HỎI MỨC ĐỘ NHẬN BIẾT (5 CÂU)',
            exercises.filter((e) => e.level === 'Nhận biết'),
            '059669', // Emerald
            includeAnswers
          ),

          ...buildExercisesSection(
            'PHẦN II. CÁC CÂU HỎI MỨC ĐỘ THÔNG HIỂU (5 CÂU)',
            exercises.filter((e) => e.level === 'Thông hiểu'),
            '0284C7', // Sky
            includeAnswers
          ),

          ...buildExercisesSection(
            'PHẦN III. CÁC CÂU HỎI MỨC ĐỘ VẬN DỤNG (5 CÂU)',
            exercises.filter((e) => e.level === 'Vận dụng'),
            'D97706', // Amber
            includeAnswers
          ),

          // Footer notes
          new Paragraph({ spacing: { before: 300, after: 100 } }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: '--- HẾT ---',
                bold: true,
                color: '64748B',
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: 'Học sinh thực hành trực tiếp và kiểm tra kết quả truy vấn trên ứng dụng SQL Studio.',
                italics: true,
                size: 20,
                color: '64748B',
              }),
            ],
          }),
        ],
      },
    ],
  });

  return doc;
}

function buildExercisesSection(
  title: string,
  exercises: Exercise[],
  colorHex: string,
  includeAnswers: boolean
): (Paragraph | Table)[] {
  const result: (Paragraph | Table)[] = [];

  result.push(
    new Paragraph({
      spacing: { before: 240, after: 120 },
      children: [
        new TextRun({
          text: title,
          size: 24,
          bold: true,
          color: colorHex,
        }),
      ],
    })
  );

  exercises.forEach((ex) => {
    // Question paragraph
    result.push(
      new Paragraph({
        spacing: { before: 100, after: 60 },
        children: [
          new TextRun({
            text: `Câu ${ex.order} [${ex.level}]: `,
            bold: true,
            color: '0F172A',
          }),
          new TextRun({
            text: ex.question,
            bold: false,
          }),
        ],
      })
    );

    // Hint
    result.push(
      new Paragraph({
        spacing: { before: 40, after: 80 },
        indent: { left: convertInchesToTwip(0.3) },
        children: [
          new TextRun({
            text: '💡 Gợi ý: ',
            italics: true,
            bold: true,
            color: '475569',
            size: 22,
          }),
          new TextRun({
            text: ex.hint,
            italics: true,
            color: '475569',
            size: 22,
          }),
        ],
      })
    );

    // If answers are included, show SQL code box & explanation
    if (includeAnswers) {
      result.push(
        new Table({
          width: { size: 95, type: WidthType.PERCENTAGE },
          alignment: AlignmentType.CENTER,
          borders: {
            top: { style: BorderStyle.SINGLE, size: 2, color: 'CBD5E1' },
            bottom: { style: BorderStyle.SINGLE, size: 2, color: 'CBD5E1' },
            left: { style: BorderStyle.SINGLE, size: 6, color: colorHex },
            right: { style: BorderStyle.SINGLE, size: 2, color: 'CBD5E1' },
            insideHorizontal: { style: BorderStyle.NONE },
            insideVertical: { style: BorderStyle.NONE },
          },
          rows: [
            new TableRow({
              children: [
                new TableCell({
                  shading: { type: ShadingType.CLEAR, fill: 'F8FAFC' },
                  children: [
                    new Paragraph({
                      spacing: { before: 40, after: 40 },
                      children: [
                        new TextRun({
                          text: 'Đáp án câu lệnh SQL:',
                          size: 20,
                          bold: true,
                          color: '334155',
                        }),
                      ],
                    }),
                    // Split SQL by lines
                    ...ex.solutionSql.split('\n').map(
                      (line) =>
                        new Paragraph({
                          spacing: { before: 20, after: 20 },
                          children: [
                            new TextRun({
                              text: line,
                              font: 'Courier New',
                              size: 21,
                              color: '0F172A',
                              bold: true,
                            }),
                          ],
                        })
                    ),
                    new Paragraph({
                      spacing: { before: 60, after: 40 },
                      children: [
                        new TextRun({
                          text: 'Giải thích: ',
                          size: 20,
                          bold: true,
                          color: '475569',
                        }),
                        new TextRun({
                          text: ex.explanation,
                          size: 20,
                          color: '475569',
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          ],
        })
      );
    } else {
      // Blank space for students to write answer
      result.push(
        new Paragraph({
          spacing: { before: 40, after: 120 },
          indent: { left: convertInchesToTwip(0.3) },
          children: [
            new TextRun({
              text: 'Bài làm của học sinh:\n................................................................................................................................................\n................................................................................................................................................',
              color: '94A3B8',
              size: 22,
            }),
          ],
        })
      );
    }
  });

  return result;
}

export async function downloadDocxBlob(doc: Document, filename: string) {
  const blob = await Packer.toBlob(doc);
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
