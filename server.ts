import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
  });

  // Gemini AI endpoint
  app.post('/api/gemini/generate', async (req, res) => {
    try {
      const { prompt, systemInstruction, apiKey } = req.body;
      const keyToUse = apiKey || process.env.GEMINI_API_KEY;

      if (!keyToUse) {
        return res.status(400).json({
          error: 'Chưa có Gemini API Key. Vui lòng nhập API Key ở thanh tiêu đề hoặc cấu hình biến môi trường GEMINI_API_KEY.',
        });
      }

      if (!prompt) {
        return res.status(400).json({ error: 'Nội dung prompt không được để trống.' });
      }

      const ai = new GoogleGenAI({
        apiKey: keyToUse,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });

      // Priority list of compliant models from SKILL.md.
      // gemini-flash-latest and gemini-2.5-flash have immediate availability when 3.8-flash experiences peak demand.
      const candidateModels = [
        'gemini-flash-latest',
        'gemini-2.5-flash',
        'gemini-3.1-flash-lite',
        'gemini-3.8-flash',
      ];

      let lastError: any = null;
      let responseText = '';

      for (const model of candidateModels) {
        try {
          const response = await ai.models.generateContent({
            model,
            contents: prompt,
            config: systemInstruction
              ? {
                  systemInstruction,
                  temperature: 0.2,
                }
              : {
                  temperature: 0.2,
                },
          });

          responseText = response.text || '';
          if (responseText) {
            return res.json({ text: responseText });
          }
        } catch (err: any) {
          lastError = err;
          const errStr = String(err?.message || err || '');
          const isTransient =
            err?.status === 503 ||
            err?.code === 503 ||
            err?.status === 'UNAVAILABLE' ||
            errStr.includes('503') ||
            errStr.includes('high demand') ||
            errStr.includes('UNAVAILABLE') ||
            errStr.includes('429');

          if (!isTransient) {
            // Non-transient error like invalid key or invalid argument: stop immediately
            break;
          }
          // On transient 503, immediately continue to next candidate model smoothly without noisy stderr
        }
      }

      if (lastError) {
        throw lastError;
      }

      return res.json({ text: responseText });
    } catch (error: any) {
      console.error('Gemini API Error in /api/gemini/generate:', error);
      const errMsg = String(error?.message || '');
      if (errMsg.includes('503') || errMsg.includes('high demand') || errMsg.includes('UNAVAILABLE')) {
        return res.status(503).json({
          error: 'Mô hình AI hiện đang có lượng truy cập cao trên Google Cloud (503). Vui lòng thử lại sau vài giây.',
        });
      }
      return res.status(500).json({
        error: error?.message || 'Có lỗi xảy ra khi gọi Gemini API. Vui lòng thử lại sau.',
      });
    }
  });

  // Vite middleware in dev, static files in production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[SQL Visualizer Server] Running on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
