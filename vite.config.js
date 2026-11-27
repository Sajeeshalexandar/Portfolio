import react from '@vitejs/plugin-react';
import contactHandler from './api/contact.js';
import { defineConfig, loadEnv } from 'vite';

function localContactApi() {
  return {
    name: 'local-contact-api',
    configureServer(server) {
      server.middlewares.use('/api/contact', async (req, res) => {
        if (req.method === 'POST') {
          const chunks = [];
          for await (const chunk of req) chunks.push(chunk);

          try {
            req.body = JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}');
          } catch {
            res.statusCode = 400;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: false, message: 'Invalid JSON request body.' }));
            return;
          }
        }

        res.status = (statusCode) => {
          res.statusCode = statusCode;
          return res;
        };
        res.json = (data) => {
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(data));
          return res;
        };

        try {
          await contactHandler(req, res);
        } catch (error) {
          console.error('Local contact API error:', error);
          if (!res.headersSent) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: false, message: 'An error occurred while sending your message.' }));
          } else {
            res.destroy(error);
          }
        }
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  if (!process.env.EMAIL_USER && env.EMAIL_USER) process.env.EMAIL_USER = env.EMAIL_USER;
  if (!process.env.EMAIL_PASS && env.EMAIL_PASS) process.env.EMAIL_PASS = env.EMAIL_PASS;

  return {
    plugins: [react(), localContactApi()],
    server: {
      port: Number(env.PORT) || 5173,
    },
  };
});
