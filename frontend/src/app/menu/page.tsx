import type { Metadata } from 'next';
import Image from 'next/image';
import Split from '@/components/Split';
import HeroPause from '@/components/HeroPause';
import SwitchList from '@/components/SwitchList';
import { PillLink } from '@/components/Pill';
import { ClosingCta } from '@/components/Sections';
import { img, stationSets, stations } from '@/lib/content';
import { cta, routes } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Our Menu · Live Thai food counters',
  description: 'Khao soi, papaya salad, larb, krapao, Thai grill, miang kham and mango sticky rice, cooked live at your wedding, with a vegan version of almost every dish.',
  alternates: { canonical: routes.menu }
};

export default function MenuPage() {
  return (
    <>
      <section className="media hero" data-hero aria-labelledby="hero-title" style={{ height: 'clamp(600px, 86svh, 900px)' }}>
        <div className="hero-move">
          <Image className="img" src={img.marketSign.src} alt="" fill priority sizes="100vw" style={{ objectPosition: 'center 38%' }} />
        </div>
        <div className="shade" style={{ background: 'linear-gradient(180deg, rgba(10,10,10,.25) 0%, rgba(10,10,10,.2) 45%, rgba(10,10,10,.62) 100%)' }} />
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

      {/* 1. Every counter, explained */}
      <section className="sec" aria-labelledby="counters">
        <div className="in" style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 640 }}>
            <span className="br">Choose your counters</span>
            <Split id="counters" text="Pick the dishes *you love*" style={{ fontSize: 'clamp(30px, 3.6vw, 52px)', lineHeight: 1, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '-.015em' }} />
            <p data-reveal className="lead-copy">Each counter is a small Thai street-food stall. A chef cooks one dish fresh for each guest. Most events have 3 to 5 counters.</p>
          </div>
          <SwitchList items={stations} label="Food counters" hint="Tap a dish to see it" />
          <p className="br">Guests per counter and space needed: to confirm</p>
        </div>
      </section>

      {/* 2. Ready-made menus */}
      <section id="sets" className="sec" aria-labelledby="sets-title">
        <div className="in" style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 640 }}>
            <span className="br">Not sure what to pick?</span>
            <Split as="h2" id="sets-title" text="Ready-made *menus*" style={{ fontSize: 'clamp(30px, 3.6vw, 52px)', lineHeight: 1, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '-.015em' }} />
            <p data-reveal className="lead-copy">Start with one of these and change anything you like.</p>
          </div>
          <div className="grid-auto" style={{ ['--min' as string]: '290px', ['--gap' as string]: '28px' }}>
            {stationSets.map((set) => (
              <div key={set.name} className="rows">
                <span className="cap mut grp">{set.when}</span>
                <strong style={{ fontSize: 'clamp(22px, 2vw, 28px)', fontWeight: 600, textTransform: 'uppercase', marginBottom: 6 }}>{set.name}</strong>
                {set.items.map(([en, th], i) => (
                  <div key={en} className="row r3 hov"><span>{String(i + 1).padStart(2, '0')}</span><span>{en}</span><span className="th mut" lang="th" style={{ fontSize: 14 }}>{th}</span></div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. How it looks on the day */}
      <section className="panel sec" aria-labelledby="serve">
        <div className="in grid-auto" style={{ ['--gap' as string]: '48px', alignItems: 'start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }} data-reveal>
            <div style={{ position: 'relative', width: 72, height: 72, borderRadius: 6, overflow: 'hidden' }}><Image src={img.krapaoCard.src} alt="" fill sizes="72px" style={{ objectFit: 'cover' }} /></div>
            <span className="cap mut">On the day</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
            <h2 id="serve" className="lit"><span>Served on banana leaf and clay plates.</span><span>A name card for every dish.</span><span>Vegan dishes clearly marked.</span><span>Enough chefs, so no long queues.</span></h2>
            <p data-reveal className="lead-copy">No buffet trays. Each counter looks like a Thai market stall, and we plan the layout with your wedding planner.</p>
          </div>
        </div>
      </section>

      <ClosingCta label="Found dishes you like?" title="Let's build|*your menu*" text="Tell us your date, place and number of guests. We send a menu idea and a price." />
    </>
  );
}
