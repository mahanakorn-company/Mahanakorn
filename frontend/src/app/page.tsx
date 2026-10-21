import Image from 'next/image';
import Media from '@/components/Media';
import Split from '@/components/Split';
import HeroPause from '@/components/HeroPause';
import TransitionLink from '@/components/TransitionLink';
import EventsCarousel from '@/components/EventsCarousel';
import { PillLink } from '@/components/Pill';
import { ClosingCta } from '@/components/Sections';
import { ArrowRight } from '@/components/Icons';
import { eventTypes, img, profile, stationStrip, steps, team } from '@/lib/content';
import { cta, routes } from '@/lib/site';

/*
  Home page flow (one simple story):
  1 What we do  2 Brand introduction  3 Events we cater  4 Our food counters  5 Mission Statement
  6 How it works  8 OUR TEAM  9 Get a quote + footer
*/
export default function HomePage() {
  return (
    <>
      {/* 1. Opening: what we do, in one sentence */}
      <section className="media hero" data-hero aria-labelledby="hero-title">
        <div className="hero-move">
          <Image className="img" src={img.stationNight.src} alt="" fill priority sizes="100vw" />
        </div>
        <div className="shade" style={{ background: 'linear-gradient(180deg, rgba(10,10,10,.28) 0%, rgba(10,10,10,.22) 40%, rgba(10,10,10,.66) 100%)' }} />
        <div className="hero-foot">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18, maxWidth: 920 }}>
            <span className="cap" data-intro-fade style={{ color: '#F4F1EC' }}>Mahanakorn · Thai catering from Bangkok</span>
            <Split as="h1" id="hero-title" className="plain" text="Thai catering for *every event*" intro />
            <p data-intro-fade style={{ fontSize: 17, maxWidth: 540, lineHeight: 1.5, color: '#F4F1EC' }}>
              Destination Weddings, Private Events, Corporate Events, Fine Dining
            </p>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 10 }} data-intro-fade>
            <HeroPause />
            <PillLink href={routes.menu} variant="ln">See our menu</PillLink>
            <PillLink href={routes.quote}>{cta.quote}</PillLink>
          </div>
        </div>
      </section>

      {/* 2. Brand introduction (client's wording only) */}
      <section className="sec" aria-labelledby="about">
        <div className="in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 28 }}>
          <div className="statement">
            <div className="cut" aria-hidden="true">
              <Image className="img" src={img.chef.src} alt="" fill sizes="260px" style={{ objectFit: 'cover', objectPosition: '62% 30%' }} />
            </div>
            <Split id="about" text="Born out of love|for *Thai food*, Mahanakorn|is a homegrown crew|from *Thailand*" />
          </div>
          <dl className="points" style={{ maxWidth: 860, width: '100%' }} data-stagger>
            {[profile.pillars[0], profile.pillars[3]].map((p) => <div key={p.title}><dt>{p.title}</dt><dd>{p.text}</dd></div>)}
          </dl>
        </div>
      </section>

      {/* 3. Events we cater: a compact row that scrolls sideways */}
      <section className="sec-sm" aria-labelledby="events">
        <div className="in" style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: 20 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <span className="br">Events we cater</span>
              <Split id="events" text="Diverse *Catering Services*" style={{ fontSize: 'clamp(32px, 4vw, 56px)', lineHeight: 1, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '-.015em' }} />
              <p data-reveal className="lead-copy" style={{ maxWidth: 520 }}>{profile.pillars[2].text}</p>
            </div>
            <PillLink href={routes.services} variant="dk">See our services</PillLink>
          </div>
          <EventsCarousel
            items={eventTypes.map((e) => ({ id: e.id, name: e.name, line: e.line, image: e.image, href: `${routes.services}#${e.id}` }))}
            more={{ href: routes.quote, label: 'Something else?', title: 'Tell us your idea' }}
          />
        </div>
      </section>

      {/* 4. Our live food counters (pinned, slides sideways) */}
      {/* Block-level wrapper on purpose: ScrollTrigger turns pin spacing off when a pinned element's parent is a
          flex container, which made the following sections slide over the pinned gallery. */}
      <div className="hs-wrap" style={{ marginTop: 'clamp(48px, 6vw, 96px)' }}>
        <section data-hscroll aria-labelledby="counters" className="hs panel">
          <div className="hs-head in">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <span className="br">Our food</span>
              <Split id="counters" text="Our live *food counters*" style={{ fontSize: 'clamp(34px, 4.4vw, 64px)', lineHeight: 1, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '-.015em' }} />
            </div>
            <div className="hs-meta">
              <span className="hs-count" aria-hidden="true"><b data-hs-index>01</b><span> / {String(stationStrip.length).padStart(2, '0')}</span></span>
              <span className="hs-bar" aria-hidden="true"><span data-hs-progress /></span>
              <PillLink href={routes.menu} variant="dk">See the full menu</PillLink>
            </div>
          </div>
          <div className="hwrap">
            <ol className="htrack">
              {stationStrip.map((s, i) => (
                <li key={s.name} className="hcard-li">
                  <TransitionLink href={routes.menu} className="hcard" data-cursor="View">
                    <Media image={s.image} eager sizes="(max-width: 900px) 72vw, 28vw" />
                    <span className="hcard-cap">
                      <span className="hcard-n">{String(i + 1).padStart(2, '0')}</span>
                      <span className="hcard-name"><b>{s.name}</b><span className="th mut" lang="th">{s.thai}</span></span>
                      <span className="hcard-line">{s.line}</span>
                    </span>
                  </TransitionLink>
                </li>
              ))}
              <li className="hcard-li">
                <TransitionLink href={routes.menu} className="hcard hcard-end" data-cursor="Open">
                  <span className="cap" style={{ color: 'var(--smoke)' }}>Our menu</span>
                  <span className="hcard-end-title">See every <span className="s">dish</span></span>
                  <span className="hcard-end-go" aria-hidden="true"><ArrowRight size={18} /></span>
                </TransitionLink>
              </li>
            </ol>
          </div>
          <p className="hs-hint br" aria-hidden="true">Swipe to see more →</p>
        </section>
      </div>

      {/* 5. Mission Statement (client's wording only) */}
      <section className="panel sec" aria-labelledby="why" style={{ marginTop: 'clamp(64px, 8vw, 120px)' }}>
        <div className="in grid-auto" style={{ ['--gap' as string]: '48px', alignItems: 'start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <span className="br">Mission Statement</span>
            <Media image={img.guest} className="side-photo" sizes="(max-width: 700px) 90vw, 440px" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
            <h2 id="why" className="lit">
              {profile.mission.map((m) => <span key={m.title}>{m.title}</span>)}
            </h2>
            <dl className="points" data-stagger>
              {profile.mission.map((m) => <div key={m.title}><dt>{m.title}</dt><dd>{m.text}</dd></div>)}
            </dl>
          </div>
        </div>
      </section>

      {/* 6. How it works */}
      <section className="sec" aria-labelledby="how">
        <div className="in" style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: 20 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <span className="br">How it works</span>
              <Split id="how" text="Four *simple* steps" style={{ fontSize: 'clamp(32px, 4vw, 56px)', lineHeight: 1, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '-.015em' }} />
            </div>
            <PillLink href={routes.quote} variant="dk">{cta.quote}</PillLink>
          </div>
          <ol className="grid-auto" style={{ ['--min' as string]: '220px', ['--gap' as string]: '24px' }} data-stagger>
            {steps.map((s, i) => (
              <li key={s.title} className="stat" style={{ gap: 10 }}>
                <span className="n" style={{ fontSize: 'clamp(40px, 4vw, 60px)' }}>{String(i + 1).padStart(2, '0')}</span>
                <strong style={{ fontSize: 19, fontWeight: 600 }}>{s.title}</strong>
                <span className="mut" style={{ lineHeight: 1.55 }}>{s.text}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 8. OUR TEAM (client's wording only) */}
      <section className="sec" aria-labelledby="team" style={{ paddingTop: 0 }}>
        <div className="in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 40, textAlign: 'center' }}>
          <Split id="team" text="OUR *TEAM*" style={{ fontSize: 'clamp(32px, 4vw, 56px)', lineHeight: 1, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '-.015em' }} />
          <ul className="team" data-stagger>
            {team.map((p) => (
              <li key={p.lines[0]}>
                <span className="team-photo"><Image src={p.image.src} alt={p.image.alt} fill sizes="180px" /></span>
                <span className="cap mut">{p.role}</span>
                <strong>{p.lines[0]}</strong>
                {p.lines.slice(1).map((l) => <span key={l} className="mut">{l}</span>)}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 9. Get a quote + footer (small) */}
      <ClosingCta label="Planning an event?" title="Let's cook *for your guests*" text="Tell us the type of event, date, place and number of guests. We reply with a menu idea and a price." />
    </>
  );
}
