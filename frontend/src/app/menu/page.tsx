import type { Metadata } from 'next';
import Image from 'next/image';
import Split from '@/components/Split';
import HeroPause from '@/components/HeroPause';
import MenuCounters from '@/components/MenuCounters';
import { PillLink } from '@/components/Pill';
import { ClosingCta } from '@/components/Sections';
import { img, stationSets, stations } from '@/lib/content';
import { cta, routes } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Our Menu · Live Thai food counters',
  description: 'Khao soi, papaya salad, larb, krapao, Thai grill, miang kham and mango sticky rice, cooked live at your wedding, with a vegan version of almost every dish.',
  alternates: { canonical: routes.menu }
};

// A real photo for each ready-made menu (same order as stationSets).
const setPhotos = [img.stationNight, img.riceSalad, img.padthai];

/*
  Page flow: hero → choose your counters (interactive dish list) → ready-made menus → on the day → get a quote
*/
export default function MenuPage() {
  return (
    <>
      <section className="media hero" data-hero aria-labelledby="hero-title" style={{ height: 'clamp(600px, 86svh, 900px)' }}>
        <div className="hero-move">
          <Image className="img" src={img.menuHero.src} alt="" fill priority sizes="100vw" style={{ objectPosition: 'center 55%' }} />
        </div>
        <div className="shade" style={{ background: 'linear-gradient(180deg, rgba(10,10,10,.3) 0%, rgba(10,10,10,.18) 40%, rgba(10,10,10,.68) 100%)' }} />
        <div className="hero-foot">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, maxWidth: 820 }}>
            <span className="cap" data-intro-fade style={{ color: '#F4F1EC' }}>Our menu · live Thai food counters</span>
            <Split as="h1" id="hero-title" className="plain" text="Thai food, cooked *in front of your guests*" intro />
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 10 }} data-intro-fade>
            <HeroPause />
            <PillLink href={routes.quote}>{cta.quote}</PillLink>
          </div>
        </div>
      </section>

      {/* 1. Choose your counters */}
      <section className="sec" aria-labelledby="counters">
        <div className="in">
          <div className="menu-intro">
            <div className="menu-intro-head">
              <p className="svc-label"><span>Choose your counters</span></p>
              <Split as="h2" id="counters" className="svc-title" text="Pick the dishes *you love*" />
            </div>
            <p data-reveal className="svc-lead">Each counter is a small Thai street-food stall. A chef cooks one dish fresh for each guest. Most events have 3 to 5 counters.</p>
          </div>
          <MenuCounters items={stations} />
          <p className="menu-note">Guests per counter and space needed: to confirm</p>
        </div>
      </section>

      {/* 2. Ready-made menus */}
      <section id="sets" className="sec anchor menu-sets-sec" aria-labelledby="sets-title">
        <div className="in">
          <div className="menu-intro">
            <div className="menu-intro-head">
              <p className="svc-label"><span>Not sure what to pick?</span></p>
              <Split as="h2" id="sets-title" className="svc-title" text="Ready-made *menus*" />
            </div>
            <p data-reveal className="svc-lead">Start with one of these and change anything you like.</p>
          </div>
          <div className="menu-sets">
            {stationSets.map((set, s) => (
              <article key={set.name} className="menu-set" aria-labelledby={`set-${s}`} data-reveal>
                <figure className="menu-set-photo">
                  <Image src={setPhotos[s].src} alt={setPhotos[s].alt} fill sizes="(max-width: 900px) 92vw, 30vw" style={{ objectFit: 'cover' }} />
                </figure>
                <p className="svc-label"><span>{set.when}</span></p>
                <h3 id={`set-${s}`} className="menu-set-name">{set.name}</h3>
                <ol className="menu-set-items">
                  {set.items.map(([en, th], i) => (
                    <li key={en}>
                      <span className="mc-n">{String(i + 1).padStart(2, '0')}</span>
                      <span className="menu-set-en">{en}</span>
                      <span className="menu-set-th" lang="th">{th}</span>
                    </li>
                  ))}
                </ol>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 3. On the day */}
      <section className="sec" aria-labelledby="serve" style={{ paddingTop: 0 }}>
        <div className="in">
          <div className="panel menu-day">
            <figure className="menu-day-photo" data-reveal>
              <Image src={img.krapaoCard.src} alt={img.krapaoCard.alt} fill sizes="(max-width: 900px) 92vw, 44vw" style={{ objectFit: 'cover' }} />
            </figure>
            <div className="menu-day-text">
              <p className="svc-label"><span>On the day</span></p>
              <h2 id="serve" className="lit"><span>Served on banana leaf and clay plates.</span><span>A name card for every dish.</span><span>Vegan dishes clearly marked.</span><span>Enough chefs, so no long queues.</span></h2>
              <p data-reveal className="svc-lead">No buffet trays. Each counter looks like a Thai market stall, and we plan the layout with your wedding planner.</p>
            </div>
          </div>
        </div>
      </section>

      <ClosingCta label="Found dishes you like?" title="Let's build|*your menu*" text="Tell us your date, place and number of guests. We send a menu idea and a price." />
    </>
  );
}
