import type { Metadata } from 'next';
import Media from '@/components/Media';
import Split from '@/components/Split';
import InquiryForm, { type InquiryPreset } from '@/components/forms/InquiryForm';
import { PillLabel } from '@/components/Pill';
import { Dot } from '@/components/Icons';
import { FooterNav } from '@/components/Sections';
import { img, steps } from '@/lib/content';
import { routes } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Get a quote',
  description: 'Tell us your type of event, date, place and number of guests. We reply on WhatsApp with a Thai menu idea and a price.',
  alternates: { canonical: routes.quote }
};

// ?event= values used by links on the Services page, mapped to the form's event types.
const EVENTS: Record<string, string> = { weddings: 'wedding', wedding: 'wedding', parties: 'party', company: 'corporate', private: 'private-dinner' };

const ASKS: Record<string, string> = {
  'sample-menu': 'Please send us a sample menu.',
  'veg-menu': 'Please send us the vegetarian sample menu.',
  'station-menu': 'Please send us the live food counter menu and prices.',
  'joint-menu': 'We would like to ask about a joint Thai and Indian menu.'
};

/** Presets from links elsewhere on the site, e.g. /get-a-quote?type=indian&ask=veg-menu or /get-a-quote?event=company */
function presetFrom(params: Record<string, string | string[] | undefined>): InquiryPreset {
  const one = (k: string) => (Array.isArray(params[k]) ? params[k]![0] : (params[k] as string | undefined));
  const preset: InquiryPreset = {};
  const event = one('event');
  if (event && EVENTS[event]) preset.eventType = EVENTS[event];
  if (one('type') === 'indian') { preset.eventType = 'wedding'; preset.functions = ['mehendi', 'sangeet']; preset.diet = ['vegetarian']; preset.need = 'stations-alongside'; }
  const ask = one('ask');
  if (ask && ASKS[ask]) preset.message = ASKS[ask];
  return preset;
}

export default function GetAQuotePage({ searchParams }: { searchParams: Record<string, string | string[] | undefined> }) {
  const preset = presetFrom(searchParams);
  return (
    <>
      <section className="ptitle" style={{ paddingBottom: 40 }}>
        <div className="in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, textAlign: 'center' }}>
          <Split as="h1" text="Share your *thoughts*" intro style={{ fontFamily: 'var(--f-sans)', fontWeight: 500, letterSpacing: '-.035em' }} />
        </div>
      </section>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'stretch' }}>
        <aside aria-label="Your experience, curated" style={{ flex: '1 1 360px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Media image={img.teamBangkok} clip style={{ minHeight: 520, flex: 1 }}>
            <div className="tag-in"><PillLabel icon={<Dot />}>Our team in Bangkok</PillLabel></div>
          </Media>
          <div className="panel" style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <span className="cap" style={{ paddingBottom: 6, fontWeight: 600 }}>Your experience, curated</span>
            <ol className="rows" style={{ gap: 8 }}>
              {steps.map((s, i) => (
                <li key={s.title} className="stp"><span>{String(i + 1).padStart(2, '0')}</span><span><b style={{ fontWeight: 700 }}>{s.title}.</b> <span style={{ fontWeight: 500 }}>{s.text}</span></span></li>
              ))}
            </ol>
          </div>
        </aside>
        <InquiryForm preset={preset} />
      </div>

      <div style={{ marginTop: 12 }}><FooterNav /></div>
    </>
  );
}
