import { site } from './site';

export type ApiResult = { ok: true; id: string } | { ok: false; error: string; fields?: Record<string, string> };

async function post(path: string, body: unknown): Promise<ApiResult> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 15000);
  try {
    const res = await fetch(`${site.apiUrl}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal: controller.signal
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok && data.ok) return { ok: true, id: data.id };
    return { ok: false, error: data.error || `Something went wrong (error ${res.status}). Please try again or message us on WhatsApp.`, fields: data.fields };
  } catch {
    return { ok: false, error: "We couldn't reach our server. Check your connection and try again, or message us on WhatsApp." };
  } finally {
    clearTimeout(timer);
  }
}

export const submitInquiry = (body: unknown) => post('/api/inquiries', body);
export const submitPlannerPack = (body: unknown) => post('/api/planner-pack', body);
