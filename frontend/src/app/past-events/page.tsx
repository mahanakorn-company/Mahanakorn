import type { Metadata } from 'next';
import Media, { Thumb } from '@/components/Media';
import Split from '@/components/Split';
import { PillLabel, PillLink } from '@/components/Pill';
import { ClosingCta, PageTitle } from '@/components/Sections';
import { img } from '@/lib/content';
import { routes } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Past Events',
  description: 'Weddings, pop-up dinners and restaurant nights Mahanakorn has cooked at, in Bali, Jakarta and Delhi.',
  alternates: { canonical: routes.pastEvents }
};

const others = [
  { place: 'Jakarta', name: 'Table Tales pop-up dinner at Hause Rooftop', kind: 'Pop-up dinner', year: '2025', thumb: img.riceSalad },
  // Mahanakorn's own dish photos for now; swap in photos from these nights when the client sends them.
  { place: 'Jakarta', name: "Thai dinner with Queen's Tandoor", kind: 'Restaurant night', year: '2025', thumb: img.prawns },
  { place: 'Delhi', name: 'Thai grill night at Foul Play', kind: 'Restaurant night', year: '2026', thumb: img.krapaoEgg }
];

export default function PastEventsPage() {
  return (
    <>
      <PageTitle
        title="Past events"
        sub="(where we've cooked)"
        meta={[
          { label: 'Kinds of events', value: 'Weddings · Pop-ups · Restaurant nights' },
          { label: 'Cities', value: 'Bali · Jakarta · Delhi' },
          { label: 'Full story', value: 'Indian wedding in Bali, 2025' }
        ]}
      />

      {/* Featured story */}
      <section aria-labelledby="featured" className="grid-auto" style={{ ['--gap' as string]: '12px' }}>
        <Media image={img.marketSign} clip priority style={{ height: 'clamp(440px, 48vw, 680px)' }}>
          <div className="tag-in"><PillLabel>Bali · Indian wedding · 2025</PillLabel></div>
        </Media>
        <div className="panel" style={{ padding: 'clamp(28px, 4vw, 56px)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 28 }}>
          <span className="br">Featured · Wedding</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Split as="h2" id="featured" text="Three days of Thai food *in Bali*" style={{ fontSize: 'clamp(30px, 3.6vw, 52px)', lineHeight: 1, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '-.015em' }} />
            <p data-reveal className="mut" style={{ lineHeight: 1.65, fontSize: 16, maxWidth: 460 }}>
              Live Thai food counters at the Mehendi, the Sangeet and a fun fair, next to the Indian caterer, with a vegan version of every dish.
            </p>
            <dl className="facts">
              <div><dt className="br">Dates</dt><dd>4–6 September 2025</dd></div>
              <div><dt className="br">Events</dt><dd>Mehendi · Sangeet · Fun fair</dd></div>
              <div><dt className="br">On the menu</dt><dd>Khao soi, som tum, larb, krapao, miang kham, mango sticky rice</dd></div>
            </dl>
          </div>
          <PillLink href={`${routes.quote}?event=weddings`} variant="dk" style={{ alignSelf: 'flex-start' }}>Plan something similar</PillLink>
        </div>
      </section>

      {/* Other events */}
      <section className="sec" aria-labelledby="more">
        <div className="in rows">
          <Split id="more" text="Pop-ups and *restaurant nights*" style={{ fontSize: 'clamp(24px, 2.6vw, 34px)', fontWeight: 600, textTransform: 'uppercase', marginBottom: 16 }} />
          <span className="cap mut grp">Full stories coming soon</span>
          {others.map((e, i) => (
            <div key={e.name} className="row hov">
              <span>{String(i + 1).padStart(2, '0')}</span>
              <span style={{ display: 'flex', flexDirection: 'column' }}><span>{e.place} · {e.name}</span><span className="mut" style={{ fontSize: 13 }}>{e.kind}</span></span>
              <span className="fmt">{e.year}</span>
              <span className="thumbs" aria-hidden="true">{e.thumb ? <Thumb image={e.thumb} /> : <span className="tb ph">Photo</span>}</span>
              <span />
            </div>
          ))}
        </div>
      </section>

      <ClosingCta label="Your event next?" title="Planning|*something similar?*" text="Tell us about your event and we will send a menu idea and a price." />
    </>
  );
}
