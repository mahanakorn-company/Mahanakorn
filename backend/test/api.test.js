import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import request from 'supertest';
import { createApp } from '../src/app.js';
import { createStore } from '../src/lib/store.js';

let dir;
let app;
const sent = [];
const ORIGIN = 'http://localhost:3000';

function nextMonth() {
  const d = new Date();
  d.setMonth(d.getMonth() + 3);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
}

const validInquiry = () => ({
  name: 'Aashna Sharma',
  email: 'Aashna@Example.com',
  whatsapp: '+91 98765 43210',
  role: 'couple',
  date: nextMonth(),
  destination: 'phuket',
  guests: '200-350',
  functions: ['mehendi', 'sangeet'],
  need: 'stations-alongside',
  diet: ['vegetarian', 'jain'],
  hasPlanner: 'yes',
  message: 'Mild spice for grandparents please.',
  company: ''
});

before(async () => {
  dir = await fs.mkdtemp(path.join(os.tmpdir(), 'mahanakorn-'));
  app = createApp({
    store: createStore(dir),
    notify: async (subject) => { sent.push(subject); return { sent: false }; },
    origins: [ORIGIN],
    adminToken: 'secret',
    rateLimitMax: 1000
  });
});

after(async () => { await fs.rm(dir, { recursive: true, force: true }); });

test('health check', async () => {
  const res = await request(app).get('/api/health');
  assert.equal(res.status, 200);
  assert.equal(res.body.ok, true);
});

test('accepts a valid inquiry, normalises email, stores and notifies', async () => {
  const res = await request(app).post('/api/inquiries').set('Origin', ORIGIN).send(validInquiry());
  assert.equal(res.status, 201);
  assert.ok(res.body.id);
  assert.equal(res.headers['access-control-allow-origin'], ORIGIN);
  const raw = await fs.readFile(path.join(dir, 'inquiries.jsonl'), 'utf8');
  const row = JSON.parse(raw.trim().split('\n').pop());
  assert.equal(row.email, 'aashna@example.com');
  assert.equal(row.company, undefined, 'honeypot field is not stored');
  assert.match(sent.at(-1), /New wedding inquiry/);
});

test('accepts non-wedding events and defaults older requests to a wedding', async () => {
  const res = await request(app)
    .post('/api/inquiries')
    .send({ ...validInquiry(), role: 'company', eventType: 'corporate', destination: 'jakarta', functions: [] });
  assert.equal(res.status, 201);
  assert.match(sent.at(-1), /New corporate inquiry/);
  const bad = await request(app).post('/api/inquiries').send({ ...validInquiry(), eventType: 'not-an-event' });
  assert.equal(bad.status, 422);
  assert.ok(bad.body.fields.eventType);
});

test('returns field errors for an invalid inquiry', async () => {
  const res = await request(app).post('/api/inquiries').send({ ...validInquiry(), email: 'nope', whatsapp: '12', destination: 'mars' });
  assert.equal(res.status, 422);
  assert.ok(res.body.fields.email);
  assert.ok(res.body.fields.whatsapp);
  assert.ok(res.body.fields.destination);
});

test('requires a date unless the date is flexible', async () => {
  const missing = await request(app).post('/api/inquiries').send({ ...validInquiry(), date: '' });
  assert.equal(missing.status, 422);
  assert.ok(missing.body.fields.date);
  const flexible = await request(app).post('/api/inquiries').send({ ...validInquiry(), date: '', dateFlexible: true });
  assert.equal(flexible.status, 201);
});

test('rejects a date in the past', async () => {
  const res = await request(app).post('/api/inquiries').send({ ...validInquiry(), date: '2020-01' });
  assert.equal(res.status, 422);
  assert.ok(res.body.fields.date);
});

test('rejects spam caught by the honeypot', async () => {
  const res = await request(app).post('/api/inquiries').send({ ...validInquiry(), company: 'Buy now' });
  assert.equal(res.status, 422);
});

test('accepts a planner pack request', async () => {
  const res = await request(app).post('/api/planner-pack').send({ name: 'Riya Kapoor', company: 'Harmony Weddings', email: 'riya@harmony.example', whatsapp: '+66 81 234 5678', upcoming: 'Phuket, March' });
  assert.equal(res.status, 201);
});

test('rejects malformed JSON cleanly', async () => {
  const res = await request(app).post('/api/inquiries').set('Content-Type', 'application/json').send('{bad json');
  assert.equal(res.status, 400);
});

test('does not send CORS headers to unknown origins', async () => {
  const res = await request(app).get('/api/health').set('Origin', 'https://evil.example');
  assert.equal(res.headers['access-control-allow-origin'], undefined);
});

test('leads endpoint needs the admin token', async () => {
  const denied = await request(app).get('/api/leads');
  assert.equal(denied.status, 401);
  const ok = await request(app).get('/api/leads').set('Authorization', 'Bearer secret');
  assert.equal(ok.status, 200);
  assert.ok(ok.body.inquiries.length >= 2);
  assert.equal(ok.body.plannerPack.length, 1);
});
