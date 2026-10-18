import { config } from './config.js';
import { createApp } from './app.js';
import { createStore } from './lib/store.js';
import { createNotifier } from './lib/notify.js';

const app = createApp({
  store: createStore(config.dataDir),
  notify: createNotifier(config.smtp),
  origins: config.origins,
  adminToken: config.adminToken,
  trustProxy: config.trustProxy
});

const server = app.listen(config.port, () => {
  console.log(`Mahanakorn API listening on http://localhost:${config.port} (allowed origins: ${config.origins.join(', ')})`);
});

const shutdown = () => server.close(() => process.exit(0));
process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
