import type { Metadata } from 'next';
import Image from 'next/image';
import Media, { Thumb } from '@/components/Media';
import Split from '@/components/Split';
import TransitionLink from '@/components/TransitionLink';
import PlannerPackForm from '@/components/forms/PlannerPackForm';
import { PillLink } from '@/components/Pill';
import { Faq, FooterNav, PageTitle } from '@/components/Sections';
import { ArrowRight } from '@/components/Icons';
import { img } from '@/lib/content';
import { routes, whatsappLink } from '@/lib/site';

export const metadata: Metadata = {
  title: 'For Planners',
  description: 'Add live Thai food counters or a sit-down Thai dinner to your client’s wedding or event. Options, venue needs and partner terms in one planner pack.',
  alternates: { canonical: routes.planners }
};

const formats = [
  ['Live food counters', 'ตลาด', 'Welcome dinner, Mehendi, Sangeet', 'Space, electricity, water'],
  ['Sit-down Thai dinner', 'ชาววัง', 'Welcome dinner, reception', 'Use of a kitchen'],
  ['Small bites', 'กินเล่น', 'Cocktail evening', 'A prep area'],
  ['Late-night food', 'ดึก', 'After-party', 'Electricity']
];
const standards: [string, boolean][] = [['Food safety certification', false], ['Public liability insurance', false], ['Allergy labels at every counter', true], ['Venue references', false]];

export default function PlannersPage() {
  const wa = whatsappLink("Hi Mahanakorn, I'm an event planner and would like to talk about Thai catering for a client.");
  return (
    <>
      <PageTitle
        title="For planners"
        sub="(wedding and event planners, and venues)"
        meta={[
          { label: 'What we offer', value: 'Food counters · Dinners · Small bites' },
          { label: 'Where we have cooked', value: 'Bali · Jakarta · Delhi' },
          { label: 'For you', value: 'A free planner pack (PDF)' }
        ]}
      />

      <section className="dark" data-dark aria-labelledby="partner" style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--smoke)' }}><span>For planners and venues</span><span>What we offer</span></div>
        <div className="grid-auto" style={{ ['--gap' as string]: '40px', padding: '80px 20px 40px', alignItems: 'start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ position: 'relative', width: 40, height: 40, borderRadius: '50%', overflow: 'hidden' }}><Image src={img.chef.src} alt="" fill sizes="40px" style={{ objectFit: 'cover' }} /></span>
              <span style={{ display: 'flex', flexDirection: 'column', fontSize: 11, fontWeight: 600, textTransform: 'uppercase' }}><span>Events manager</span><span className="mut">Mahanakorn</span></span>
            </div>
            <Split id="partner" text="Your Thai food partner for *weddings and events*." style={{ fontSize: 'clamp(26px, 2.8vw, 40px)', fontWeight: 500, lineHeight: 1.22, maxWidth: 540 }} />
            <p data-reveal className="mut" style={{ lineHeight: 1.6, fontSize: 15, maxWidth: 440 }}>Add live Thai food counters or a sit-down Thai dinner to your client&apos;s wedding, party or company event. We work with the main caterer and the venue, and send you everything we need in writing.</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              <a className="pill" href="#pack">Get the planner pack <span className="ic"><ArrowRight /></span></a>
              {wa && <PillLink href={wa} variant="wa">WhatsApp our events manager</PillLink>}
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <span className="br">What we offer</span>
            <ul className="lit" data-on="#FFFFFF" data-off="#5E5B57" style={{ fontSize: 'clamp(36px, 3.8vw, 54px)', lineHeight: 1.12 }}>
              <li>Live food counters</li><li>Sit-down dinners</li><li>Small bites</li><li>Late-night food</li>
            </ul>
            <Media image={img.padthai} clip style={{ height: 240 }} />
          </div>
        </div>
        <p aria-hidden="true" className="giant" data-marquee>for <span className="s">planners</span> · for <span className="s">venues</span></p>
      </section>

      <section className="sec" aria-labelledby="specs">
        <div className="in" style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
          <Split id="specs" text="Why planners *work with us*" style={{ textAlign: 'center', fontSize: 'clamp(30px, 3.4vw, 46px)', fontWeight: 600, textTransform: 'uppercase' }} />
          <div className="grid-auto" style={{ ['--min' as string]: '220px', ['--gap' as string]: '28px' }} data-stagger>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}><span className="br">01 · Easy to add</span><p style={{ lineHeight: 1.6 }}>Book us for one event or the whole weekend.</p></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}><span className="br">02 · Clear needs, in writing</span><p style={{ lineHeight: 1.6 }}>Space, electricity, water and setup time for every option.</p></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}><span className="br">03 · One person to talk to</span><p style={{ lineHeight: 1.6 }}>An events manager who replies quickly and joins your venue visit.</p></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}><span className="br">04 · Partner terms</span><p style={{ lineHeight: 1.6 }}>Partner rates or commission, to confirm.</p></div>
          </div>
        </div>
      </section>

      <section className="pb" aria-labelledby="needs">
        <div className="in rows">
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: 16, marginBottom: 16 }}>
            <Split id="needs" text="What each option *needs*" style={{ fontSize: 'clamp(24px, 2.6vw, 34px)', fontWeight: 600, textTransform: 'uppercase' }} />
            <a className="cap" href="#pack" style={{ textDecoration: 'none' }}>Full details are in the planner pack →</a>
          </div>
          {formats.map(([name, th, best, needs], i) => (
            <div key={name} className="row r5 hov">
              <span>{String(i + 1).padStart(2, '0')}</span>
              <span style={{ display: 'flex', flexDirection: 'column' }}><span>{name}</span><span className="th mut" lang="th" style={{ fontSize: 13 }}>{th}</span></span>
              <span className="fmt">{best}</span>
              <span className="fmt">{needs}</span>
              <span className="mut">guests: to confirm</span>
            </div>
          ))}
        </div>
      </section>

      <section className="pb" aria-labelledby="cooked">
        <div className="in rows">
          <Split id="cooked" text="Where *we've* cooked" style={{ fontSize: 'clamp(24px, 2.6vw, 34px)', fontWeight: 600, textTransform: 'uppercase', marginBottom: 16 }} />
          <span className="cap mut grp">Bali</span>
          <TransitionLink className="row" href={routes.baliWedding}>
            <span>01</span><span>Three-day Indian wedding</span><span className="fmt">2025</span>
            <span className="thumbs" aria-hidden="true"><span className="more"><Thumb image={img.guest} /></span><Thumb image={img.marketSign} /></span>
            <span className="go" aria-hidden="true"><ArrowRight /></span>
          </TransitionLink>
          <span className="cap mut grp">Jakarta</span>
          <div className="row hov"><span>01</span><span>Hause Rooftop · Table Tales</span><span className="fmt">2025</span><span className="thumbs" aria-hidden="true"><Thumb image={img.riceSalad} /></span><span /></div>
          <div className="row hov"><span>02</span><span>Queen&apos;s Tandoor · Thai dinner</span><span className="fmt">2025</span><span className="thumbs" aria-hidden="true"><span className="tb ph">Photo</span></span><span /></div>
          <span className="cap mut grp">Delhi</span>
          <div className="row hov"><span>01</span><span>Foul Play · Thai grill night</span><span className="fmt">2026</span><span className="thumbs" aria-hidden="true"><span className="tb ph">Photo</span></span><span /></div>
        </div>
      </section>

      <section className="panel sec" aria-label="Standards and planner questions">
        <div className="in grid-auto" style={{ ['--min' as string]: '320px', ['--gap' as string]: '48px' }}>
          <div className="rows">
            <Split text="What venues *ask for*" style={{ fontSize: 'clamp(24px, 2.6vw, 34px)', fontWeight: 600, textTransform: 'uppercase', marginBottom: 16 }} />
            {standards.map(([s, ok], i) => (
              <div key={s} className="row r3 hov on-white"><span>{String(i + 1).padStart(2, '0')}</span><span>{s}</span><span className={`st ${ok ? 'ok' : 'tbc'}`}>{ok ? 'In place' : 'To confirm'}</span></div>
            ))}
          </div>
          <Faq
            onWhite
            title="Planner *questions*"
            items={[
              { q: "Can you work under the main caterer's contract?", a: 'Answer to confirm with Mahanakorn.' },
              { q: 'Do resorts allow you in as an outside caterer?', a: 'List of approved venues to confirm with Mahanakorn.' },
              { q: 'Can we arrange a tasting for planners?', a: 'Answer to confirm with Mahanakorn.' }
            ]}
          />
        </div>
      </section>

      <section id="pack" className="dark" data-dark aria-labelledby="pack-title" style={{ padding: 'clamp(64px, 7vw, 110px) 20px 20px' }}>
        <div className="in grid-auto" style={{ ['--min' as string]: '320px', ['--gap' as string]: '48px', alignItems: 'start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
            <span className="br">Free planner pack</span>
            <Split id="pack-title" text="All the answers *your clients need,* in one PDF" style={{ fontSize: 'clamp(40px, 5.4vw, 82px)', lineHeight: 0.94, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '-.03em' }} />
            <p data-reveal className="mut" style={{ lineHeight: 1.6, fontSize: 15, maxWidth: 420 }}>Our options and sample menus, venue needs, how early to book, booking terms, partner rates and past events.</p>
            <div aria-hidden="true" style={{ display: 'flex', gap: 14, marginTop: 10 }} data-stagger>
              <div style={{ width: 170, height: 230, background: '#fff', color: 'var(--ink)', borderRadius: 8, padding: 16, display: 'flex', flexDirection: 'column', gap: 8, transform: 'rotate(-3deg)' }}>
                <strong style={{ fontSize: 13, letterSpacing: '-.02em' }}>mahanakorn</strong>
                <span style={{ fontSize: 26, fontWeight: 500, lineHeight: 0.95, textTransform: 'uppercase' }}>Planner <span className="s">pack</span></span>
                <div style={{ position: 'relative', flex: 1, borderRadius: 5, overflow: 'hidden' }}><Image src={img.stationNight.src} alt="" fill sizes="140px" style={{ objectFit: 'cover' }} /></div>
              </div>
              <div style={{ width: 170, height: 230, background: '#1C1B19', borderRadius: 8, padding: 16, display: 'flex', flexDirection: 'column', gap: 7, transform: 'rotate(2deg) translateY(14px)' }}>
                <span className="cap" style={{ color: 'var(--smoke)' }}>Venue needs</span>
                <span style={{ height: 7, background: '#2E2C29', borderRadius: 4 }} />
                <span style={{ height: 7, width: '70%', background: '#2E2C29', borderRadius: 4 }} />
                <span style={{ height: 7, width: '85%', background: '#2E2C29', borderRadius: 4 }} />
                <span style={{ flex: 1, background: '#2E2C29', borderRadius: 5, marginTop: 6 }} />
              </div>
            </div>
          </div>
          <PlannerPackForm />
        </div>
        <div style={{ marginTop: 80 }}><FooterNav /></div>
      </section>
    </>
  );
}
