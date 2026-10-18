import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';

/**
 * Minimal append-only lead store: one JSON object per line in <dataDir>/<collection>.jsonl.
 * Good enough for a small catering business; swap for a database later without touching the routes.
 */
export function createStore(dataDir) {
  const file = (collection) => path.join(dataDir, `${collection}.jsonl`);

  async function add(collection, record) {
    await fs.mkdir(dataDir, { recursive: true });
    const row = { id: crypto.randomUUID(), createdAt: new Date().toISOString(), ...record };
    await fs.appendFile(file(collection), JSON.stringify(row) + '\n', 'utf8');
    return row;
  }

  async function list(collection, { limit = 100 } = {}) {
    let raw = '';
    try {
      raw = await fs.readFile(file(collection), 'utf8');
    } catch (err) {
      if (err.code === 'ENOENT') return [];
      throw err;
    }
    const rows = raw
      .split('\n')
      .filter(Boolean)
      .map((line) => {
        try { return JSON.parse(line); } catch { return null; }
      })
      .filter(Boolean);
    return rows.reverse().slice(0, limit);
  }

  return { add, list };
}
