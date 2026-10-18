import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { inquirySchema, plannerPackSchema, fieldErrors } from './lib/validation.js';

/**
 * Builds the Express app. Dependencies are injected so tests can use a temp store and a silent notifier.
 * @param {{ store: ReturnType<import('./lib/store.js').createStore>, notify: Function, origins: string[], adminToken?: string, trustProxy?: number, rateLimitMax?: number }} deps
 */
export function createApp({ store, notify, origins, adminToken = '', trustProxy = 0, rateLimitMax = 10 }) {
  const app = express();
  app.set('trust proxy', trustProxy);
  app.disable('x-powered-by');
  app.use(helmet());
  app.use(
    cors({
      origin(origin, cb) {
        // Allow same-origin/server-to-server calls (no Origin header) and the configured site origins.
        if (!origin || origins.includes(origin)) return cb(null, true);
        return cb(null, false);
      },
      methods: ['GET', 'POST'],
      allowedHeaders: ['Content-Type', 'Authorization']
    })
  );
  app.use(express.json({ limit: '20kb' }));

  const writeLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: rateLimitMax,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    message: { ok: false, error: 'Too many requests. Please try again in a few minutes, or message us on WhatsApp.' }
  });

  app.get('/api/health', (_req, res) => res.json({ ok: true, service: 'mahanakorn-api' }));

  app.post('/api/inquiries', writeLimiter, async (req, res, next) => {
    try {
      const parsed = inquirySchema.safeParse(req.body ?? {});
      if (!parsed.success) return res.status(422).json({ ok: false, error: 'Please check the highlighted fields.', fields: fieldErrors(parsed.error) });
      const { company: _hp, ...data } = parsed.data;
      const lead = await store.add('inquiries', { ...data, source: 'website', userAgent: req.get('user-agent') || '' });
      await notify(`New ${data.eventType} inquiry: ${data.name} (${data.destination}, ${data.guests})`, [
        `Event: ${data.eventType}`,
        `Name: ${data.name} (${data.role})`,
        `Email: ${data.email}`,
        `WhatsApp: ${data.whatsapp}`,
        `Date: ${data.dateFlexible ? 'Not fixed yet' : data.date}`,
        `Where: ${data.destination}${data.venue ? ' · ' + data.venue : ''}`,
        `Guests: ${data.guests}`,
        data.functions.length ? `Wedding events: ${data.functions.join(', ')}` : '',
        data.need ? `Need: ${data.need}` : '',
        data.diet.length ? `Diet: ${data.diet.join(', ')}` : '',
        data.hasPlanner ? `Has planner: ${data.hasPlanner}` : '',
        data.message ? `Message: ${data.message}` : '',
        `Lead id: ${lead.id}`
      ]);
      return res.status(201).json({ ok: true, id: lead.id });
    } catch (err) {
      return next(err);
    }
  });

  app.post('/api/planner-pack', writeLimiter, async (req, res, next) => {
    try {
      const parsed = plannerPackSchema.safeParse(req.body ?? {});
      if (!parsed.success) return res.status(422).json({ ok: false, error: 'Please check the highlighted fields.', fields: fieldErrors(parsed.error) });
      const { website: _hp, ...data } = parsed.data;
      const lead = await store.add('planner-pack', { ...data, source: 'website' });
      await notify(`Planner pack request: ${data.company}`, [
        `Name: ${data.name}`,
        `Company: ${data.company}`,
        `Email: ${data.email}`,
        `WhatsApp: ${data.whatsapp}`,
        data.upcoming ? `Upcoming: ${data.upcoming}` : '',
        `Lead id: ${lead.id}`
      ]);
      return res.status(201).json({ ok: true, id: lead.id });
    } catch (err) {
      return next(err);
    }
  });

  app.get('/api/leads', async (req, res, next) => {
    try {
      if (!adminToken) return res.status(404).json({ ok: false, error: 'Not found' });
      if (req.get('authorization') !== `Bearer ${adminToken}`) return res.status(401).json({ ok: false, error: 'Unauthorized' });
      const [inquiries, plannerPack] = await Promise.all([store.list('inquiries'), store.list('planner-pack')]);
      return res.json({ ok: true, inquiries, plannerPack });
    } catch (err) {
      return next(err);
    }
  });

  app.use((_req, res) => res.status(404).json({ ok: false, error: 'Not found' }));

  // eslint-disable-next-line no-unused-vars
  app.use((err, _req, res, _next) => {
    if (err?.type === 'entity.parse.failed') return res.status(400).json({ ok: false, error: 'Invalid JSON body.' });
    if (err?.type === 'entity.too.large') return res.status(413).json({ ok: false, error: 'Request is too large.' });
    console.error(err);
    return res.status(500).json({ ok: false, error: 'Something went wrong on our side. Please message us on WhatsApp.' });
  });

  return app;
}
