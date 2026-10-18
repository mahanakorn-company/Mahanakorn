import 'dotenv/config';
import path from 'node:path';

const list = (v) => (v || '').split(',').map((s) => s.trim()).filter(Boolean);

export const config = {
  port: Number(process.env.PORT) || 4000,
  origins: list(process.env.FRONTEND_ORIGIN || 'http://localhost:3000'),
  dataDir: path.resolve(process.env.DATA_DIR || './data'),
  adminToken: process.env.ADMIN_TOKEN || '',
  trustProxy: Number(process.env.TRUST_PROXY) || 0,
  smtp: {
    host: process.env.SMTP_HOST || '',
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === 'true',
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
    from: process.env.MAIL_FROM || 'Mahanakorn Website <no-reply@example.com>',
    to: process.env.MAIL_TO || ''
  }
};
