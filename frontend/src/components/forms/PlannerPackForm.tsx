'use client';

import { useRef, useState, type FormEvent } from 'react';
import { submitPlannerPack } from '@/lib/api';
import { emailOk, nameOk, phoneOk } from '@/lib/validate';
import { ArrowRight, Restart } from '../Icons';

type Data = { name: string; company: string; email: string; whatsapp: string; upcoming: string; website: string };
type Errors = Partial<Record<keyof Data, string>>;

export default function PlannerPackForm() {
  const [data, setData] = useState<Data>({ name: '', company: '', email: '', whatsapp: '', upcoming: '', website: '' });
  const [errors, setErrors] = useState<Errors>({});
  const [serverError, setServerError] = useState('');
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const alertRef = useRef<HTMLDivElement>(null);
  const doneRef = useRef<HTMLHeadingElement>(null);

  const set = (k: keyof Data, v: string) => { setData((d) => ({ ...d, [k]: v })); if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined })); };

  async function submit(e: FormEvent) {
    e.preventDefault();
    const errs: Errors = {};
    if (!nameOk(data.name)) errs.name = 'Please enter your name.';
    if (data.company.trim().length < 2) errs.company = 'Please enter your company.';
    if (!emailOk(data.email)) errs.email = 'Please enter a valid work email.';
    if (!phoneOk(data.whatsapp)) errs.whatsapp = 'Please enter a WhatsApp number with country code.';
    setErrors(errs);
    if (Object.keys(errs).length) { requestAnimationFrame(() => alertRef.current?.focus()); return; }
    setBusy(true);
    setServerError('');
    const res = await submitPlannerPack(data);
    setBusy(false);
    if (res.ok) { setDone(true); requestAnimationFrame(() => doneRef.current?.focus()); return; }
    setServerError(res.error);
    setErrors((res.fields || {}) as Errors);
    requestAnimationFrame(() => alertRef.current?.focus());
  }

  const a = (k: keyof Data) => ({ 'aria-invalid': errors[k] ? true : undefined, 'aria-describedby': errors[k] ? `pe-${k}` : undefined });
  const hasErr = serverError || Object.values(errors).some(Boolean);

  if (done) {
    return (
      <div role="status" style={{ background: '#fff', color: 'var(--ink)', borderRadius: 12, padding: 36, display: 'flex', flexDirection: 'column', gap: 14 }}>
        <span className="th" style={{ color: 'var(--tamarind)', fontSize: 18 }}>ขอบคุณ</span>
        <h3 ref={doneRef} tabIndex={-1} style={{ fontSize: 30, fontWeight: 500, lineHeight: 1.1, textTransform: 'uppercase', outline: 'none' }}>The pack is <span className="s">on its way</span></h3>
        <p className="mut" style={{ lineHeight: 1.6 }}>We&apos;ll email it to {data.email} and our events lead will message you on WhatsApp.</p>
        <button type="button" className="pill ln" style={{ alignSelf: 'flex-start' }} onClick={() => { setDone(false); setData({ name: '', company: '', email: '', whatsapp: '', upcoming: '', website: '' }); }}>
          Send another request <span className="ic"><Restart /></span>
        </button>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={submit} aria-label="Planner pack request" style={{ background: '#fff', color: 'var(--ink)', borderRadius: 12, padding: 36, display: 'flex', flexDirection: 'column', gap: 22 }}>
      {hasErr && (
        <div ref={alertRef} tabIndex={-1} className="form-alert" role="alert">{serverError || 'Please check the highlighted fields.'}</div>
      )}
      <div className="f"><label htmlFor="p-name">Your name</label><input className="ul" id="p-name" type="text" autoComplete="name" value={data.name} onChange={(e) => set('name', e.target.value)} {...a('name')} />{errors.name && <span className="err" id="pe-name">{errors.name}</span>}</div>
      <div className="f"><label htmlFor="p-company">Company</label><input className="ul" id="p-company" type="text" autoComplete="organization" value={data.company} onChange={(e) => set('company', e.target.value)} {...a('company')} />{errors.company && <span className="err" id="pe-company">{errors.company}</span>}</div>
      <div className="grid-auto" style={{ ['--min' as string]: '180px', ['--gap' as string]: '22px' }}>
        <div className="f"><label htmlFor="p-email">Work email</label><input className="ul" id="p-email" type="email" inputMode="email" autoComplete="email" value={data.email} onChange={(e) => set('email', e.target.value)} {...a('email')} />{errors.email && <span className="err" id="pe-email">{errors.email}</span>}</div>
        <div className="f"><label htmlFor="p-whatsapp">WhatsApp</label><input className="ul" id="p-whatsapp" type="tel" inputMode="tel" autoComplete="tel" value={data.whatsapp} onChange={(e) => set('whatsapp', e.target.value)} {...a('whatsapp')} />{errors.whatsapp && <span className="err" id="pe-whatsapp">{errors.whatsapp}</span>}</div>
      </div>
      <div className="f"><label htmlFor="p-upcoming">Upcoming dates or markets (optional)</label><input className="ul" id="p-upcoming" type="text" maxLength={300} placeholder="e.g. Phuket, March 2027, 300 guests" value={data.upcoming} onChange={(e) => set('upcoming', e.target.value)} /></div>
      <div className="hp" aria-hidden="true"><label htmlFor="p-website">Website</label><input id="p-website" tabIndex={-1} autoComplete="off" value={data.website} onChange={(e) => set('website', e.target.value)} /></div>
      <button type="submit" className="pill dk" style={{ alignSelf: 'flex-start' }} disabled={busy} aria-busy={busy}>{busy ? 'Sending…' : 'Send me the pack'} <span className="ic"><ArrowRight /></span></button>
    </form>
  );
}
