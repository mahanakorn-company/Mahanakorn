'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { gsap } from 'gsap';
import { submitInquiry } from '@/lib/api';
import { emailOk, nameOk, phoneOk } from '@/lib/validate';
import { prefersReducedMotion, scrollToElement } from '@/lib/motion';
import { routes, whatsappLink } from '@/lib/site';
import { PillLink } from '../Pill';
import { ArrowRight, Restart } from '../Icons';

const ROLES = [['host', 'My celebration'], ['private', 'Private events'], ['company', 'Corporate events'], ['other', 'Other']] as const;
export const EVENT_TYPES = [['wedding', 'Vows Beyond Borders (weddings)'], ['party', 'Private event'], ['corporate', 'Corporate event'], ['private-dinner', 'Fine dining'], ['other', 'Something else']] as const;

export type InquiryPreset = { eventType?: string; functions?: string[]; diet?: string[]; message?: string; need?: string };

type Data = {
  name: string; email: string; whatsapp: string; role: string; eventType: string;
  date: string; dateFlexible: boolean; destination: string; venue: string; guests: string;
  functions: string[]; need: string; diet: string[]; message: string; company: string;
};
type Errors = Partial<Record<keyof Data | '_', string>>;
type Step = 1 | 'done';

const LABELS: Partial<Record<keyof Data, string>> = { name: 'Your name', email: 'Email', whatsapp: 'WhatsApp number', role: 'I am…', eventType: 'Type of event', date: 'Event date', destination: 'Where is the event?', guests: 'Number of guests' };

function check(d: Data): Errors {
  const e: Errors = {};
  if (!nameOk(d.name)) e.name = 'Please enter your name.';
  if (!emailOk(d.email)) e.email = 'Please enter a valid email address, e.g. name@example.com.';
  if (!phoneOk(d.whatsapp)) e.whatsapp = 'Please enter a WhatsApp number with country code, e.g. +91 98765 43210.';
  if (!d.role) e.role = 'Please choose who you are.';
  return e;
}

export default function InquiryForm({ preset }: { preset?: InquiryPreset }) {
  const [step, setStep] = useState<Step>(1);
  const [busy, setBusy] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [serverError, setServerError] = useState('');
  const [data, setData] = useState<Data>({
    name: '', email: '', whatsapp: '', role: 'host', eventType: preset?.eventType ?? '', date: '', dateFlexible: false, destination: '', venue: '', guests: '',
    functions: preset?.functions ?? [], need: preset?.need ?? '', diet: preset?.diet ?? [], message: preset?.message ?? '', company: ''
  });
  const boxRef = useRef<HTMLDivElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const first = useRef(true);
  const wa = whatsappLink();

  const set = <K extends keyof Data>(k: K, v: Data[K]) => {
    setData((d) => ({ ...d, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };
  const toggle = (k: 'functions' | 'diet', v: string) => set(k, data[k].includes(v) ? data[k].filter((x) => x !== v) : [...data[k], v]);

  // Animate each step in, move focus to its heading and bring the form into view.
  useEffect(() => {
    if (first.current) { first.current = false; return; }
    const box = boxRef.current;
    if (!box) return;
    headingRef.current?.focus({ preventScroll: true });
    scrollToElement(box);
    if (!prefersReducedMotion()) {
      const pane = box.querySelector('[data-pane]');
      if (pane) gsap.fromTo(pane.children, { y: 24, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.05, duration: 0.6, ease: 'power3.out' });
    }
  }, [step]);

  function fail(errs: Errors) {
    setErrors(errs);
    requestAnimationFrame(() => summaryRef.current?.focus());
  }

  async function send(e: FormEvent) {
    e.preventDefault();
    const errs = check(data);
    if (Object.keys(errs).length) return fail(errs);
    setBusy(true);
    setServerError('');
    const res = await submitInquiry({
      ...data,
      date: data.dateFlexible ? '' : data.date,
      destination: data.destination || undefined,
      guests: data.guests || undefined,
      functions: data.eventType === 'wedding' ? data.functions : [],
      need: data.need || undefined
    });
    setBusy(false);
    if (res.ok) {
      setErrors({}); setStep('done');
      const link = whatsappLink(`Hi Mahanakorn, I'm ${data.name.trim()}. I just sent an enquiry on your website.${data.message.trim() ? ` ${data.message.trim()}` : ''}`);
      if (link) window.location.href = link;
      return;
    }
    const fields = (res.fields || {}) as Errors;
    setServerError(res.error);
    fail(fields);
  }

  const err = (k: keyof Data) => errors[k];
  const field = (k: keyof Data) => ({ 'aria-invalid': err(k) ? true : undefined, 'aria-describedby': err(k) ? `e-${k}` : undefined });
  const errorList = Object.entries(errors).filter(([, v]) => v) as [keyof Data, string][];

  return (
    <div ref={boxRef} className="panel" style={{ flex: '1.4 1 520px', minWidth: 0, padding: 'clamp(28px,4vw,56px)', display: 'flex', flexDirection: 'column', gap: 32 }}>
      {(errorList.length > 0 || serverError) && step !== 'done' && (
        <div ref={summaryRef} tabIndex={-1} className="form-alert" role="alert">
          <strong>{serverError || 'Please check these fields:'}</strong>
          {errorList.length > 0 && (
            <ul style={{ marginTop: 6, paddingLeft: 18, listStyle: 'disc' }}>
              {errorList.map(([k]) => <li key={k}><a href={`#q-${k}`}>{LABELS[k] ?? k}</a></li>)}
            </ul>
          )}
        </div>
      )}

      {step === 1 && (
        <form data-pane="1" noValidate onSubmit={send} aria-label="Your details" style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          <h2 ref={headingRef} tabIndex={-1} style={{ fontSize: 'clamp(30px,3.2vw,44px)', fontWeight: 500, lineHeight: 1.1, outline: 'none' }}>Tell us <span className="s">about you</span></h2>
          <div className="f">
            <label htmlFor="q-name">Your name</label>
            <input className="ul" id="q-name" name="name" type="text" autoComplete="name" required value={data.name} onChange={(e) => set('name', e.target.value)} {...field('name')} />
            {err('name') && <span className="err" id="e-name">{err('name')}</span>}
          </div>
          <div className="grid-auto" style={{ ['--min' as string]: '220px', ['--gap' as string]: '28px' }}>
            <div className="f">
              <label htmlFor="q-email">Email</label>
              <input className="ul" id="q-email" name="email" type="email" autoComplete="email" inputMode="email" required value={data.email} onChange={(e) => set('email', e.target.value)} {...field('email')} />
              {err('email') && <span className="err" id="e-email">{err('email')}</span>}
            </div>
            <div className="f">
              <label htmlFor="q-whatsapp">WhatsApp, with country code</label>
              <input className="ul" id="q-whatsapp" name="whatsapp" type="tel" autoComplete="tel" inputMode="tel" required value={data.whatsapp} onChange={(e) => set('whatsapp', e.target.value)} {...field('whatsapp')} />
              {err('whatsapp') && <span className="err" id="e-whatsapp">{err('whatsapp')}</span>}
            </div>
          </div>
          <fieldset id="q-role">
            <legend className="sr-only">I am…</legend>
            <div className="opts">
              {ROLES.map(([v, l]) => (
                <label key={v} className="opt"><input type="radio" name="role" value={v} checked={data.role === v} onChange={() => set('role', v)} />{l}</label>
              ))}
            </div>
          </fieldset>
          {/* Honeypot for bots: hidden from people and screen readers. */}
          <div className="hp" aria-hidden="true">
            <label htmlFor="q-company">Company</label>
            <input id="q-company" tabIndex={-1} autoComplete="off" value={data.company} onChange={(e) => set('company', e.target.value)} />
          </div>
          <div className="f">
            <label htmlFor="q-message">Anything else? (optional)</label>
            <textarea className="ul" id="q-message" name="message" rows={3} maxLength={2000} placeholder="Type of event, date, place, number of guests, favourite dishes" value={data.message} onChange={(e) => set('message', e.target.value)} />
          </div>
          <button type="submit" className="pill dk" style={{ alignSelf: 'flex-start' }} disabled={busy} aria-busy={busy}>{busy ? 'Sending…' : 'Send my details'} <span className="ic"><ArrowRight /></span></button>
          <p className="br" style={{ lineHeight: 1.5 }}>By sending, you agree to our <a href={routes.privacy}>privacy policy</a>. We only use your details to reply to you.</p>
        </form>
      )}

      {step === 'done' && (
        <div data-pane="done" role="status" style={{ display: 'flex', flexDirection: 'column', gap: 18, padding: '12px 0' }}>
          <span className="th" style={{ color: 'var(--tamarind)', fontSize: 20 }}>ขอบคุณ · thank you</span>
          <h2 ref={headingRef} tabIndex={-1} style={{ fontSize: 'clamp(36px,4.4vw,62px)', fontWeight: 500, lineHeight: 1, textTransform: 'uppercase', letterSpacing: '-.02em', outline: 'none' }}>We&apos;ve <span className="s">got it</span></h2>
          <p className="mut" style={{ lineHeight: 1.6, fontSize: 16, maxWidth: 460 }}>Thanks, {data.name.split(' ')[0]}. We&apos;ll message you on WhatsApp at {data.whatsapp} with a menu idea and a price.</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            <PillLink href={routes.services} variant="dk">See our services</PillLink>
            <PillLink href={routes.menu} variant="ln">See our menu</PillLink>
            {wa && <PillLink href={wa} variant="wa">WhatsApp us now</PillLink>}
          </div>
          <button type="button" className="pill ln" style={{ alignSelf: 'flex-start' }} onClick={() => { setData((d) => ({ ...d, message: '' })); setStep(1); }}>Send another request <span className="ic"><Restart /></span></button>
        </div>
      )}
    </div>
  );
}
