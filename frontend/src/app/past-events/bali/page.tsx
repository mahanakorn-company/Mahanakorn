import type { Metadata } from 'next';
import Media from '@/components/Media';
import Split from '@/components/Split';
import TransitionLink from '@/components/TransitionLink';
import { PillLink } from '@/components/Pill';
import { ClosingCta, PageTitle } from '@/components/Sections';
import { Play } from '@/components/Icons';
import { baliMenu, img } from '@/lib/content';
import { routes } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Past Events · An Indian wedding in Bali',
  description: 'How Mahanakorn served Thai food at a three-day Indian wedding in Bali: live food counters at the Mehendi, the Sangeet and a fun fair, with a vegan version of every dish.',
  alternates: { canonical: routes.baliWedding }
};

const story = [
  ['01 · What they asked for', 'Thai food for the *whole* weekend', 'The couple wanted Thai food that their families, many of them vegetarian, would enjoy at the Mehendi, the Sangeet and the fun fair.'],
  ['02 · What was hard', 'Real Thai taste, *far from* Bangkok', 'Finding Thai ingredients in Bali, cooking for many vegetarian guests, working next to the Indian caterer, and hot evenings outdoors.'],
  ['03 · What we did', 'Live food counters, *clearly labelled*', 'We set up live food counters at each event. Every dish had a hand-drawn name card that showed its vegan version.']
];
const strip: [typeof img.chilli, number, number][] = [[img.chilli, 0.25, 200], [img.guest, 0.7, 280], [img.chef, 0.4, 340], [img.padthai, 0.85, 230], [img.krapaoCard, 0.3, 210], [img.papaya, 0.6, 300]];

export default function BaliPage() {
  return (
    <>
      <article aria-labelledby="bali-title" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <PageTitle
          title="Bali"
          sub="(a three-day Indian wedding)"
          crumbs={<><TransitionLink href={routes.pastEvents}>Past events</TransitionLink> / Bali wedding</>}
          meta={[
            { label: 'Couple', value: 'Aashna × Girish', note: 'With written permission, to confirm' },
            { label: 'Dates', value: '4–6 September 2025' },
            { label: 'Events', value: 'Mehendi · Sangeet · Fun fair' }
          ]}
        >
          <span id="bali-title" className="sr-only">Thai food at a three-day Indian wedding in Bali</span>
        </PageTitle>

        <Media as="figure" image={img.stationNight} clip priority sizes="100vw" style={{ height: 'clamp(480px, 58vw, 820px)' }}>
          <figcaption className="cap-in"><span className="cap">Khao soi counter</span><span style={{ fontSize: 12 }}>Photo credit to come</span></figcaption>
        </Media>

        <section className="sec-sm" aria-label="Facts">
          <div className="in grid-auto" style={{ ['--min' as string]: '170px' }} data-stagger>
            <div className="stat"><span className="n" data-count="3">3</span><span className="br">days</span></div>
            <div className="stat"><span className="n">—</span><span className="br">guests (to confirm)</span></div>
            <div className="stat"><span className="n">—</span><span className="br">food counters (to confirm)</span></div>
            <div className="stat"><span className="n">—</span><span className="br">vegetarian guests (to confirm)</span></div>
          </div>
        </section>

        <section className="sec-sm" aria-label="The story">
          <div className="in">
            {story.map(([label, title, body]) => (
              <div key={label} className="story-row">
                <span className="br" data-reveal>{label}</span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <Split text={title} style={{ fontSize: 'clamp(26px, 2.8vw, 40px)', fontWeight: 500, lineHeight: 1.12 }} />
                  <p data-reveal className="mut" style={{ lineHeight: 1.7, fontSize: 16, maxWidth: 620 }}>{body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </article>

      <section className="dark" data-dark aria-label="Photos from the wedding" style={{ padding: '20px 20px 0', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--smoke)' }}><span>Photos</span><span>Mehendi · Sangeet · Fun fair</span></div>
        <div className="grid-auto" style={{ ['--min' as string]: '150px', ['--gap' as string]: '10px', alignItems: 'start', paddingTop: 40 }}>
          {strip.map(([im, sp, h]) => <Media key={im.src} image={im} speed={sp} sizes="240px" style={{ height: h, borderRadius: 8 }} />)}
        </div>
        <p aria-hidden="true" className="giant" data-marquee style={{ marginTop: 40 }}>Bali <span className="s">2025</span> · Thai wedding <span className="s">food</span></p>
      </section>

      <section className="sec" aria-labelledby="quote">
        <div className="in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, textAlign: 'center' }}>
          <span className="br" data-reveal>What the couple said</span>
          <Split as="blockquote" id="quote" className="s" text="“Their words will go here once we have them.”" style={{ fontSize: 'clamp(34px, 4.2vw, 62px)', lineHeight: 1.12, maxWidth: 920 }} />
          <span className="cap" data-reveal>Aashna × Girish</span>
        </div>
      </section>

      <section className="pb" aria-labelledby="menu">
        <div className="in grid-auto" style={{ ['--gap' as string]: '40px', alignItems: 'start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <span className="br">The menu</span>
            <Split id="menu" text="What *we* served" style={{ fontSize: 'clamp(34px, 4vw, 58px)', lineHeight: 1, fontWeight: 500, textTransform: 'uppercase' }} />
            <Media image={img.khaosoi} clip style={{ height: 360, marginTop: 12 }} />
          </div>
          <div className="rows">
            {baliMenu.map(([en, th, tag], i) => (
              <div key={en} className="row r3 hov">
                <span>{String(i + 1).padStart(2, '0')}</span>
                <span style={{ display: 'flex', flexDirection: 'column' }}><span>{en}</span><span className="th mut" lang="th" style={{ fontSize: 13 }}>{th}</span></span>
                <span className="cap mut">{tag}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Media as="div" image={img.signGuest} clip decorative style={{ height: 'clamp(440px, 48vw, 680px)' }} imgStyle={{ objectPosition: 'center 30%' }}>
        <div className="shade" style={{ background: 'rgba(10,10,10,.42)' }} />
        <button type="button" className="pill" disabled aria-label="Wedding video coming soon" style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', minHeight: 58, paddingLeft: 24, zIndex: 2, opacity: 1 }}>
          Video coming soon <span className="ic" style={{ width: 42, height: 42 }}><Play /></span>
        </button>
        <span className="cap" style={{ position: 'absolute', left: 24, bottom: 22, color: '#fff', zIndex: 2 }}>The weekend in 45 seconds</span>
      </Media>

      <section className="sec-sm" aria-label="Credits">
        <div className="in" style={{ display: 'flex', flexWrap: 'wrap', gap: '12px 40px', alignItems: 'baseline' }} data-stagger>
          <span className="br">Who else worked on it</span>
          <span style={{ fontSize: 14 }}>Planner · to add</span><span style={{ fontSize: 14 }}>Venue · to add</span><span style={{ fontSize: 14 }}>Photos · to add</span><span style={{ fontSize: 14 }}>Indian food · to add</span>
        </div>
      </section>

      <section className="pb" aria-label="More past events">
        <div className="in" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
          <span className="mut" style={{ fontSize: 15 }}>We also cook at pop-up dinners and restaurant nights in Jakarta and Delhi.</span>
          <PillLink href={routes.pastEvents} variant="dk">See all past events</PillLink>
        </div>
      </section>

      <ClosingCta label="Like what you see?" title="Planning|*something similar?*" text="Tell us about your event and we will send a menu idea." />
    </>
  );
}
