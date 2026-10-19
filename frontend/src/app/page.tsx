import Image from 'next/image';
import Media from '@/components/Media';
import Split from '@/components/Split';
import HeroPause from '@/components/HeroPause';
import TransitionLink from '@/components/TransitionLink';
import EventsCarousel from '@/components/EventsCarousel';
import { PillLabel, PillLink } from '@/components/Pill';
import { FooterNav } from '@/components/Sections';
import { ArrowRight } from '@/components/Icons';
import { eventTypes, img, pastEvents, stationStrip, steps } from '@/lib/content';
import { cta, routes } from '@/lib/site';

/*
  Home page flow (one simple story):
  1 What we do  2 Who we are  3 Events we cater  4 Our food counters  5 Ways we serve
  6 Why people choose us  7 How it works  8 Past events  9 We come to you + footer  10 Get a quote
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
              Weddings, parties, company events and private dinners. Live food counters and sit-down Thai dinners, with vegetarian options at every counter.
            </p>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 10 }} data-intro-fade>
            <HeroPause />
            <PillLink href={routes.menu} variant="ln">See our menu</PillLink>
            <PillLink href={routes.quote}>{cta.quote}</PillLink>
          </div>
        </div>
      </section>

      {/* 2. Who we are */}
      <section className="sec" aria-labelledby="about">
        <div className="in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 28 }}>
          <span className="br" data-reveal>Who we are</span>
          <div className="statement">
            <div className="cut" aria-hidden="true">
              <Image className="img" src={img.chef.src} alt="" fill sizes="260px" style={{ objectFit: 'cover', objectPosition: '62% 30%' }} />
            </div>
            <Split id="about" text="**real** Thai food,|cooked *fresh* for every|guest at your *event*" />
          </div>
          <p data-reveal className="lead-copy" style={{ textAlign: 'center', maxWidth: 480 }}>
            Born out of love for Thai food, Mahanakorn is a homegrown crew from Thailand. We cook at weddings, parties, company events and pop-ups around the world, with a vegetarian version of almost every dish.
          </p>
        </div>
      </section>

      {/* 3. Events we cater: a compact row that scrolls sideways */}
      <section className="sec-sm" aria-labelledby="events">
        <div className="in" style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: 20 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <span className="br">Events we cater</span>
              <Split id="events" text="Any event, *big or small*" style={{ fontSize: 'clamp(32px, 4vw, 56px)', lineHeight: 1, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '-.015em' }} />
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

      {/* 5. Ways we serve */}
      <section aria-labelledby="ways" style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 'clamp(64px, 8vw, 120px)' }}>
        <div className="in" style={{ display: 'flex', flexDirection: 'column', gap: 12, paddingBottom: 24 }}>
          <span className="br">How we serve</span>
          <Split id="ways" text="Three ways *to serve*" style={{ fontSize: 'clamp(32px, 4vw, 56px)', lineHeight: 1, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '-.015em' }} />
        </div>
        <div className="grid-auto">
          <Media image={img.baskets} href={routes.menu} clip cursor="View" style={{ height: 'clamp(420px, 40vw, 600px)' }}>
            <div className="tag-in">
              <span className="extra"><span>Cooked fresh in front of your guests</span></span>
              <PillLabel>Live food counters</PillLabel>
            </div>
          </Media>
          <Media image={img.prawns} href={`${routes.services}#private`} clip cursor="View" style={{ height: 'clamp(420px, 40vw, 600px)' }}>
            <div className="tag-in">
              <span className="extra"><span>Served at the table, course by course</span></span>
              <PillLabel>Sit-down Thai dinners</PillLabel>
            </div>
          </Media>
          <Media image={img.canapes} href={`${routes.services}#parties`} clip cursor="View" style={{ height: 'clamp(420px, 40vw, 600px)' }}>
            <div className="tag-in">
              <span className="extra"><span>For drinks, parties and late nights</span></span>
              <PillLabel>Small bites and late-night food</PillLabel>
            </div>
          </Media>
        </div>
      </section>

      {/* 6. Why people choose us */}
      <section className="panel sec" aria-labelledby="why" style={{ marginTop: 'clamp(64px, 8vw, 120px)' }}>
        <div className="in grid-auto" style={{ ['--gap' as string]: '48px', alignItems: 'start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <span className="br">Why people choose us</span>
            <Media image={img.chef} clip style={{ height: 'clamp(320px, 32vw, 460px)' }} imgStyle={{ objectPosition: '60% 40%' }} />
            <span className="br">The Mahanakorn team, Bangkok · team photo to come</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
            <h2 id="why" className="lit">
              <span>Fresh ingredients, cooked in front of your guests.</span>
              <span>Traditional Thai cooking, from a team from Thailand.</span>
              <span>A menu made for your event, diet and culture.</span>
              <span>Care and detail in every dish.</span>
            </h2>
            <div className="grid-auto" style={{ ['--min' as string]: '140px', marginTop: 12 }} data-stagger>
              <div className="stat"><span className="n" data-count="8">8</span><span className="br">live food counters</span></div>
              <div className="stat"><span className="n" data-count="6">6</span><span className="br">kinds of events</span></div>
              <div className="stat"><span className="n">1,000+</span><span className="br">guests we can cater for</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. How it works */}
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

      {/* 8. Past events */}
      <section className="pb" aria-labelledby="past">
        <div className="in" style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: 20 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <span className="br">Past events</span>
              <Split id="past" text="Where we've *cooked*" style={{ fontSize: 'clamp(32px, 4vw, 56px)', lineHeight: 1, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '-.015em' }} />
            </div>
            <PillLink href={routes.pastEvents} variant="dk">See past events</PillLink>
          </div>
          <div className="grid-auto" style={{ ['--min' as string]: '280px', ['--gap' as string]: '24px', alignItems: 'start' }}>
            <Media image={img.marketSign} href={routes.baliWedding} clip cursor="View" style={{ height: 460 }}>
              <div className="tag-in">
                <span className="extra"><span>Thai food counters at the Mehendi, Sangeet and a fun fair</span></span>
                <PillLabel>Bali · Indian wedding · 2025</PillLabel>
              </div>
            </Media>
            <div className="rows">
              {pastEvents.map((e, i) => (
                <TransitionLink key={e.name} className="row r4" href={i === 0 ? routes.baliWedding : routes.pastEvents}>
                  <span>{String(i + 1).padStart(2, '0')}</span>
                  <span style={{ display: 'flex', flexDirection: 'column' }}><span>{e.place} · {e.name}</span><span className="mut" style={{ fontSize: 13 }}>{e.kind}</span></span>
                  <span className="fmt">{e.year}</span>
                  <span className="go" aria-hidden="true"><ArrowRight /></span>
                </TransitionLink>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 9. We come to you + footer */}
      <section className="dark" data-dark aria-labelledby="where" style={{ padding: '20px 20px 0', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div aria-hidden="true" className="grid-auto" style={{ ['--min' as string]: '140px', ['--gap' as string]: '10px', alignItems: 'start', paddingTop: 40 }}>
          {[[img.chilli, 0.2, 170], [img.larb, 0.6, 230], [img.baskets, 0.35, 310], [img.miang, 0.75, 200], [img.krapaoCard, 0.3, 170], [img.mango, 0.55, 250]].map(([im, sp, h], i) => (
            <Media key={i} image={im as typeof img.chilli} decorative speed={sp as number} sizes="200px" style={{ height: h as number, borderRadius: 8 }} />
          ))}
        </div>
        <p aria-hidden="true" className="giant" data-marquee style={{ marginTop: 40 }}>
          Maha<span className="s" style={{ letterSpacing: '-.02em' }}>nakorn</span> · Thai catering <span className="s">for every event</span>
        </p>
        <div className="grid-auto" style={{ ['--gap' as string]: '40px', padding: '90px 20px 70px', alignItems: 'start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
            <span className="br">We come to you</span>
            <Split id="where" text="We bring the team and the food to your venue." style={{ fontSize: 'clamp(26px, 2.6vw, 36px)', fontWeight: 500, lineHeight: 1.25, maxWidth: 480 }} />
            <p data-reveal className="mut" style={{ lineHeight: 1.6, fontSize: 15, maxWidth: 420 }}>Hotels, villas, rooftops, offices and restaurants. We plan everything with you, or with your event planner.</p>
            <PillLink href={routes.quote} style={{ alignSelf: 'flex-start' }}>{cta.quote}</PillLink>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <ul className="lit" data-on="#FFFFFF" data-off="#5E5B57" style={{ fontSize: 'clamp(36px, 3.8vw, 54px)', lineHeight: 1.12 }}>
              <li>Bangkok</li><li>Bali</li><li>Jakarta</li><li>Delhi</li><li className="s">your venue</li>
            </ul>
          </div>
        </div>
        <FooterNav />
      </section>

      {/* 10. Get a quote */}
      <section className="dark" data-dark aria-labelledby="closing" style={{ padding: '72px 20px 64px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 40, textAlign: 'center' }}>
        <h2 id="closing" data-grow style={{ fontSize: 'clamp(46px, 8vw, 128px)', lineHeight: 0.92, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '-.035em' }}>
          Planning<br /><span className="s">an event?</span>
        </h2>
        <p className="mut" style={{ maxWidth: 440, lineHeight: 1.6 }}>Tell us the type of event, date, place and number of guests. We reply with a menu idea and a price.</p>
        <PillLink href={routes.quote}>{cta.quote}</PillLink>
      </section>
    </>
  );
}
