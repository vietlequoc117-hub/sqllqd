import fs from 'fs';
import path from 'path';
import { Packer, Document } from 'docx';
import { DATABASES } from '../src/data/databases.js';
import { EXERCISES_BY_DATABASE } from '../src/data/exercises.js';
import { createDatabaseDocx } from '../src/lib/docxExport.js';
import { DatabaseId } from '../src/types.js';

const outDir = path.resolve(process.cwd(), 'public', 'downloads');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

export const DB_DOCX_FILES: Record<DatabaseId, { filename: string; title: string }> = {
  HOC_SINH: {
    filename: 'Bai_Tap_SQL_CSDL_Hoc_Sinh.docx',
    title: 'Bài tập SQL - CSDL Học Sinh (15 câu)',
  },
  KINH_DOANH: {
    filename: 'Bai_Tap_SQL_CSDL_Kinh_Doanh.docx',
    title: 'Bài tập SQL - CSDL Kinh Doanh (15 câu)',
  },
  HOC_TAP: {
    filename: 'Bai_Tap_SQL_CSDL_Hoc_Tap.docx',
    title: 'Bài tập SQL - CSDL Học Tập (15 câu)',
  },
  AM_NHAC: {
    filename: 'Bai_Tap_SQL_CSDL_Am_Nhac.docx',
    title: 'Bài tập SQL - CSDL Âm Nhạc (15 câu)',
  },
  QL_XE: {
    filename: 'Bai_Tap_SQL_CSDL_QL_Xe.docx',
    title: 'Bài tập SQL - CSDL QL_XE (15 câu)',
  },
  QL_VANG: {
    filename: 'Bai_Tap_SQL_CSDL_QL_Vang.docx',
    title: 'Bài tập SQL - CSDL QL_VANG (15 câu)',
  },
  QL_CANBO: {
    filename: 'Bai_Tap_SQL_CSDL_QL_Canbo.docx',
    title: 'Bài tập SQL - CSDL QL_Canbo (15 câu)',
  },
  QL_TV: {
    filename: 'Bai_Tap_SQL_CSDL_QL_TV.docx',
    title: 'Bài tập SQL - CSDL QL_TV (15 câu)',
  },
};

async function generateAll() {
  console.log('Generating docx files for 5 databases...');

  for (const [id, config] of Object.entries(DATABASES)) {
    const dbId = id as DatabaseId;
    const exercises = EXERCISES_BY_DATABASE[dbId];
    const { filename } = DB_DOCX_FILES[dbId];
    const filePath = path.join(outDir, filename);

    console.log(`Creating docx for ${config.name} (${exercises.length} exercises)...`);
    const doc = createDatabaseDocx(config, exercises, { includeAnswers: true });
    const buffer = await Packer.toBuffer(doc);
    fs.writeFileSync(filePath, buffer);
    console.log(`Saved: ${filePath} (${buffer.length} bytes)`);

    // Also generate student exam version (without answers)
    const studentFilename = filename.replace('.docx', '_De_Bai.docx');
    const studentPath = path.join(outDir, studentFilename);
    const studentDoc = createDatabaseDocx(config, exercises, { includeAnswers: false });
    const studentBuffer = await Packer.toBuffer(studentDoc);
    fs.writeFileSync(studentPath, studentBuffer);
    console.log(`Saved student version: ${studentPath} (${studentBuffer.length} bytes)`);
  }

  console.log('Successfully generated all DOCX files!');
}

generateAll().catch((err) => {
  console.error('Error generating docx files:', err);
  process.exit(1);
});
