'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { gsap } from 'gsap';
import { submitInquiry } from '@/lib/api';
import { emailOk, minMonth, monthOk, nameOk, phoneOk } from '@/lib/validate';
import { prefersReducedMotion, scrollToElement } from '@/lib/motion';
import { routes, whatsappLink } from '@/lib/site';
import { PillLink } from '../Pill';
import { ArrowLeft, ArrowRight, Restart } from '../Icons';

const ROLES = [['host', 'My celebration'], ['private', 'Private events'], ['company', 'Corporate events'], ['other', 'Other']] as const;
export const EVENT_TYPES = [['wedding', 'Vows Beyond Borders (weddings)'], ['party', 'Private event'], ['corporate', 'Corporate event'], ['private-dinner', 'Fine dining'], ['other', 'Something else']] as const;
const DESTINATIONS = [['bangkok', 'Bangkok'], ['phuket', 'Phuket'], ['koh-samui', 'Koh Samui'], ['krabi', 'Krabi'], ['hua-hin', 'Hua Hin'], ['bali', 'Bali'], ['jakarta', 'Jakarta'], ['india', 'India'], ['other', 'Other or undecided']] as const;
const GUESTS = [['under-50', 'Under 50'], ['50-100', '50–100'], ['100-200', '100–200'], ['200-350', '200–350'], ['350-plus', '350+']] as const;
const FUNCTIONS = [['welcome-dinner', 'Welcome dinner'], ['mehendi', 'Mehendi'], ['haldi', 'Haldi'], ['sangeet', 'Sangeet'], ['wedding-lunch', 'Wedding lunch'], ['reception', 'Reception'], ['after-party', 'After-party'], ['brunch', 'Brunch']] as const;
const NEEDS = [['full-function', 'Catering for a whole event'], ['stations-alongside', 'Thai food counters next to another caterer'], ['not-sure', 'Not sure yet']] as const;
const DIETS = [['vegetarian', 'Vegetarian'], ['vegan', 'Vegan'], ['jain', 'Jain'], ['egg-free', 'Egg-free'], ['halal', 'Halal'], ['allergies', 'Allergies']] as const;

export type InquiryPreset = { eventType?: string; functions?: string[]; diet?: string[]; message?: string; need?: string };

type Data = {
  name: string; email: string; whatsapp: string; role: string; eventType: string;
  date: string; dateFlexible: boolean; destination: string; venue: string; guests: string;
  functions: string[]; need: string; diet: string[]; message: string; company: string;
};
type Errors = Partial<Record<keyof Data | '_', string>>;
type Step = 1 | 2 | 'done';

const LABELS: Partial<Record<keyof Data, string>> = { name: 'Your name', email: 'Email', whatsapp: 'WhatsApp number', role: 'I am…', eventType: 'Type of event', date: 'Event date', destination: 'Where is the event?', guests: 'Number of guests' };

function check(step: 1 | 2, d: Data): Errors {
  const e: Errors = {};
  if (step === 1) {
    if (!nameOk(d.name)) e.name = 'Please enter your name.';
    if (!emailOk(d.email)) e.email = 'Please enter a valid email address, e.g. name@example.com.';
    if (!phoneOk(d.whatsapp)) e.whatsapp = 'Please enter a WhatsApp number with country code, e.g. +91 98765 43210.';
    if (!d.role) e.role = 'Please choose who you are.';
  } else {
    if (!d.eventType) e.eventType = 'Please choose the type of event.';
    if (!d.dateFlexible) { const m = d.date ? monthOk(d.date) : 'Please choose a month, or tick "Not fixed yet".'; if (m) e.date = m; }
    if (!d.destination) e.destination = 'Please choose where the event is.';
    if (!d.guests) e.guests = 'Please choose an approximate guest count.';
  }
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

  function next(e: FormEvent) {
    e.preventDefault();
    const errs = check(1, data);
    if (Object.keys(errs).length) return fail(errs);
    setErrors({});
    setStep(2);
  }

  async function send(e: FormEvent) {
    e.preventDefault();
    const errs = check(2, data);
    if (Object.keys(errs).length) return fail(errs);
    setBusy(true);
    setServerError('');
    const res = await submitInquiry({
      ...data,
      date: data.dateFlexible ? '' : data.date,
      functions: data.eventType === 'wedding' ? data.functions : [],
      need: data.need || undefined
    });
    setBusy(false);
    if (res.ok) { setErrors({}); setStep('done'); return; }
    const fields = (res.fields || {}) as Errors;
    const step1Fields: (keyof Data)[] = ['name', 'email', 'whatsapp', 'role'];
    if (Object.keys(fields).some((k) => step1Fields.includes(k as keyof Data))) setStep(1);
    setServerError(res.error);
    fail(fields);
  }

  const err = (k: keyof Data) => errors[k];
  const field = (k: keyof Data) => ({ 'aria-invalid': err(k) ? true : undefined, 'aria-describedby': err(k) ? `e-${k}` : undefined });
  const errorList = Object.entries(errors).filter(([, v]) => v) as [keyof Data, string][];

  return (
    <div ref={boxRef} className="panel" style={{ flex: '1.4 1 520px', minWidth: 0, padding: 'clamp(28px,4vw,56px)', display: 'flex', flexDirection: 'column', gap: 32 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
        <span className="cap" aria-live="polite">{step === 'done' ? 'Sent' : `Step ${step} of 2`}</span>
        <span aria-hidden="true" style={{ display: 'flex', gap: 6 }}>
          <span className="bar on" />
          <span className={`bar${step !== 1 ? ' on' : ''}`} />
        </span>
      </div>

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
        <form data-pane="1" noValidate onSubmit={next} aria-label="Step 1 of 2: About you" style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          <h2 ref={headingRef} tabIndex={-1} style={{ fontSize: 'clamp(30px,3.2vw,44px)', fontWeight: 500, lineHeight: 1.1, outline: 'none' }}>About <span className="s">you</span></h2>
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
          <button type="submit" className="pill dk" style={{ alignSelf: 'flex-start' }}>Continue <span className="ic"><ArrowRight /></span></button>
        </form>
      )}

      {step === 2 && (
        <form data-pane="2" noValidate onSubmit={send} aria-label="Step 2 of 2: Your event" style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          <h2 ref={headingRef} tabIndex={-1} style={{ fontSize: 'clamp(30px,3.2vw,44px)', fontWeight: 500, lineHeight: 1.1, outline: 'none' }}>Your <span className="s">event</span></h2>
          <fieldset id="q-eventType" {...field('eventType')}>
            <legend className="lg">What kind of event?</legend>
            <div className="opts">{EVENT_TYPES.map(([v, l]) => <label key={v} className="opt"><input type="radio" name="eventType" value={v} checked={data.eventType === v} onChange={() => set('eventType', v)} />{l}</label>)}</div>
            {err('eventType') && <span className="err" id="e-eventType">{err('eventType')}</span>}
          </fieldset>
          <div className="grid-auto" style={{ ['--min' as string]: '220px', ['--gap' as string]: '28px' }}>
            <div className="f">
              <label htmlFor="q-date">Event date</label>
              <input className="ul" id="q-date" name="date" type="month" min={minMonth()} disabled={data.dateFlexible} value={data.date} onChange={(e) => set('date', e.target.value)} {...field('date')} />
              <label className="opt" style={{ alignSelf: 'flex-start', minHeight: 40, marginTop: 6 }}>
                <input type="checkbox" checked={data.dateFlexible} onChange={(e) => set('dateFlexible', e.target.checked)} />Not fixed yet
              </label>
              {err('date') && <span className="err" id="e-date">{err('date')}</span>}
            </div>
            <div className="f">
              <label htmlFor="q-destination">Where is the event?</label>
              <select className="ul" id="q-destination" name="destination" value={data.destination} onChange={(e) => set('destination', e.target.value)} {...field('destination')}>
                <option value="">Choose</option>
                {DESTINATIONS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
              </select>
              {err('destination') && <span className="err" id="e-destination">{err('destination')}</span>}
            </div>
            <div className="f">
              <label htmlFor="q-venue">Venue (optional)</label>
              <input className="ul" id="q-venue" name="venue" type="text" maxLength={120} value={data.venue} onChange={(e) => set('venue', e.target.value)} />
            </div>
            <div className="f">
              <label htmlFor="q-guests">Number of guests (roughly)</label>
              <select className="ul" id="q-guests" name="guests" value={data.guests} onChange={(e) => set('guests', e.target.value)} {...field('guests')}>
                <option value="">Choose</option>
                {GUESTS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
              </select>
              {err('guests') && <span className="err" id="e-guests">{err('guests')}</span>}
            </div>
          </div>
          {data.eventType === 'wedding' && (
            <fieldset>
              <legend className="lg">Which wedding events? (optional)</legend>
              <div className="opts">{FUNCTIONS.map(([v, l]) => <label key={v} className="opt"><input type="checkbox" checked={data.functions.includes(v)} onChange={() => toggle('functions', v)} />{l}</label>)}</div>
            </fieldset>
          )}
          <fieldset>
            <legend className="lg">What do you need? (optional)</legend>
            <div className="opts">{NEEDS.map(([v, l]) => <label key={v} className="opt"><input type="radio" name="need" checked={data.need === v} onChange={() => set('need', v)} />{l}</label>)}</div>
          </fieldset>
          <fieldset>
            <legend className="lg">Food needs (optional)</legend>
            <div className="opts">{DIETS.map(([v, l]) => <label key={v} className="opt"><input type="checkbox" checked={data.diet.includes(v)} onChange={() => toggle('diet', v)} />{l}</label>)}</div>
          </fieldset>
          <div className="f">
            <label htmlFor="q-message">Anything else? (optional)</label>
            <textarea className="ul" id="q-message" name="message" rows={3} maxLength={2000} placeholder="Favourite dishes, the mood, spice levels" value={data.message} onChange={(e) => set('message', e.target.value)} />
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            <button type="button" className="pill ln" onClick={() => { setErrors({}); setServerError(''); setStep(1); }}>Back <span className="ic"><ArrowLeft /></span></button>
            <button type="submit" className="pill dk" disabled={busy} aria-busy={busy}>{busy ? 'Sending…' : 'Send my details'} <span className="ic"><ArrowRight /></span></button>
          </div>
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
