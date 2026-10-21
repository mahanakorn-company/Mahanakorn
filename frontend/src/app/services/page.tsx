import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Image from 'next/image';
import Split from '@/components/Split';
import SwitchList from '@/components/SwitchList';
import TransitionLink from '@/components/TransitionLink';
import { PillLink } from '@/components/Pill';
import { ClosingCta, Faq, PageTitle } from '@/components/Sections';
import { ArrowRight } from '@/components/Icons';
import { eventTypes, functions, img, profile, type Img } from '@/lib/content';
import { cta, routes } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Our Services',
  description: 'Thai catering by Mahanakorn for destination weddings, private events, corporate events and fine dining.',
  alternates: { canonical: routes.services }
};

const service = (id: string) => eventTypes.find((e) => e.id === id)!;

const diets: [string, string, boolean][] = [
  ['Vegetarian', 'Thai without fish sauce', true],
  ['Vegan', 'Served at the Bali wedding', true],
  ['Egg-free', 'Desserts and mains', true],
  ['Jain', 'No onion, garlic or roots', false],
  ['Halal', 'Certified or halal-friendly (to check)', false],
  ['No beef or no pork', 'Can be set for your menu', false]
];
const venueNeeds = [['Space for each food counter', 'to confirm'], ['Electricity or gas', 'to confirm'], ['Water close to the counters', 'Needed'], ['Time to set up before serving', 'to confirm']];

/** A secondary action: a small text link with an arrow (the one primary action is always "Get a quote"). */
function TextLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <TransitionLink className="svc-link" href={href}>
      {children} <span aria-hidden="true"><ArrowRight size={11} /></span>
    </TransitionLink>
  );
}

/** One service: a large real photograph beside its number, name, existing description and the quote button. */
function ServiceBlock({ id, n, tagline, title, image, imagePosition, flip, quote, children }: {
  id: string; n: string; tagline: string; title: string; image: Img; imagePosition?: string; flip?: boolean; quote: string; children: ReactNode;
}) {
  return (
    <section id={id} className={`svc anchor${flip ? ' svc-flip' : ''}`} aria-labelledby={`${id}-title`}>
      <div className="in svc-grid">
        <figure className="svc-photo" data-reveal>
          <Image src={image.src} alt={image.alt} fill sizes="(max-width: 900px) 92vw, 46vw" style={{ objectFit: 'cover', objectPosition: imagePosition || 'center' }} />
        </figure>
        <div className="svc-text" data-stagger>
          <p className="svc-label"><span className="svc-n">{n}</span><span className="svc-rule" aria-hidden="true" /><span>{tagline}</span></p>
          <Split as="h2" id={`${id}-title`} className="svc-title" text={title} />
          {children}
          <div className="svc-actions">
            <PillLink href={quote} variant="dk">{cta.quote}</PillLink>
          </div>
        </div>
      </div>
    </section>
  );
}

/*
  Page flow: intro (title, photo, one line, quote) → Catering Services → 01 Destination Weddings (wedding events)
  → 02 Private Events → 03 Corporate Events → 04 Fine Dining → vegetarian food
  → what's included and venue needs (prices only on request) → questions → get a quote
*/
export default function ServicesPage() {
  const parties = service('parties');
  const company = service('company');

  return (
    <>
      <PageTitle
        title="Our services"
        sub="(Diverse Catering Services)"
        meta={[
          { label: 'Services', value: 'Destination Weddings · Private Events · Corporate Events · Fine Dining' },
          { label: 'Where', value: 'Thailand · Bali · Jakarta · India', note: 'And wherever your event is' }
        ]}
      />

      {/* Intro: one strong photograph, the existing line and the quote button */}
      <section className="svc-hero" aria-label="Diverse Catering Services">
        <div className="in">
          <figure className="svc-hero-photo">
            <Image src={img.marketSign.src} alt={img.marketSign.alt} fill priority sizes="(max-width: 1240px) 96vw, 1180px" style={{ objectFit: 'cover', objectPosition: 'center 55%' }} />
          </figure>
          <div className="svc-hero-foot">
            <p className="svc-hero-line" data-reveal>{profile.pillars[2].text}</p>
            <PillLink href={routes.quote} variant="dk">{cta.quote}</PillLink>
          </div>
        </div>
      </section>

      {/* Catering Services: the client's four points, text only */}
      <section id="catering" className="sec anchor" aria-labelledby="catering-title">
        <div className="in svc-intro">
          <div className="svc-intro-head">
            <p className="svc-label"><span>{profile.pillars[2].title}</span></p>
            <Split as="h2" id="catering-title" className="svc-title" text="Catering *Services*" />
            <TextLink href={routes.menu}>See our menu</TextLink>
          </div>
          <dl className="svc-points svc-points-2" data-stagger>
            {profile.catering.map((p) => <div key={p.title}><dt>{p.title}</dt><dd>{p.text}</dd></div>)}
          </dl>
        </div>
      </section>

      {/* 01 Destination Weddings */}
      <ServiceBlock id="weddings" n="01" tagline="Thai food for your wedding" title="Destination *Weddings*" image={img.signGuest} imagePosition="center 30%" quote={`${routes.quote}?event=weddings`}>
        <p className="svc-lead">Book us for one event or the whole weekend. We work next to your main caterer, and every guest finds something to eat.</p>
        <dl className="svc-options">
          <div>
            <dt className="cap mut">Option 1 · Most popular</dt>
            <dd><strong>Thai food counters at your wedding</strong><span>Added next to your Indian or main caterer</span></dd>
          </div>
          <div>
            <dt className="cap mut">Option 2</dt>
            <dd><strong>We cater a whole event</strong><span>Welcome dinner, reception or brunch</span></dd>
          </div>
        </dl>
      </ServiceBlock>

      {/* Destination Weddings, in detail: food for each wedding event */}
      <section className="svc-detail" aria-label="Food for each wedding event">
        <div className="in">
          <div className="panel svc-detail-panel">
            <p className="lead-copy" style={{ maxWidth: 560 }}>Here is what we usually serve at each wedding event. Tap an event to see it.</p>
            <SwitchList items={functions} label="Wedding events" hint="Tap an event" initial={1} small link={{ href: `${routes.quote}?event=weddings&ask=sample-menu`, label: 'Ask for a sample menu' }} />
          </div>
        </div>
      </section>

      {/* 02 Private Events */}
      <ServiceBlock id="parties" n="02" tagline={parties.line} title="Private *Events*" image={img.smoked} flip quote={`${routes.quote}?event=parties`}>
        <p className="svc-lead">{parties.text}</p>
        <dl className="svc-meta"><dt className="cap mut">What we usually serve</dt><dd>{parties.serve}</dd></dl>
      </ServiceBlock>

      {/* 03 Corporate Events */}
      <ServiceBlock id="company" n="03" tagline={company.line} title="Corporate *Events*" image={img.chef} imagePosition="center 40%" quote={`${routes.quote}?event=company`}>
        <p className="svc-lead">{company.text}</p>
        <dl className="svc-meta"><dt className="cap mut">What we usually serve</dt><dd>{company.serve}</dd></dl>
      </ServiceBlock>

      {/* 04 Fine Dining: the client's Private Dining Experiences points */}
      <ServiceBlock id="private" n="04" tagline="Private Dining Experiences" title="Fine *Dining*" image={img.dessert} flip quote={`${routes.quote}?event=private`}>
        <dl className="svc-points">
          {profile.privateDining.map((p) => <div key={p.title}><dt>{p.title}</dt><dd>{p.text}</dd></div>)}
        </dl>
      </ServiceBlock>

      {/* Vegetarian food (all events) */}
      <section id="diet" className="sec anchor" aria-labelledby="diet-title">
        <div className="in">
          <div className="panel svc-diet">
            <div className="svc-diet-head">
              <p className="svc-label"><span>Vegetarian, vegan and more</span></p>
              <Split as="h2" id="diet-title" className="svc-title" text="Food every guest *can eat*" />
              <p className="svc-lead">Real Thai taste without fish sauce. Every counter has a vegetarian, vegan and egg-free version, and every dish has a label so guests know what they are eating.</p>
            </div>
            <div className="rows">
              {diets.map(([d, note, ok], i) => (
                <div key={d} className="row r4 hov on-white"><span>{String(i + 1).padStart(2, '0')}</span><span>{d}</span><span className="fmt hide">{note}</span><span className={`st ${ok ? 'ok' : 'tbc'}`}>{ok ? 'Available' : 'To confirm'}</span></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What's included and venue needs (no prices: shared on request) */}
      <section id="venue" className="pb anchor" aria-labelledby="venue-title">
        <div className="in svc-venue">
          <dl className="svc-included" data-stagger>
            <div><dt className="cap mut">Included</dt><dd>The menu, Thai ingredients, chefs, cooking equipment, serving staff and food labels.</dd></div>
            <div><dt className="cap mut">Extras you can add</dt><dd>Thai tea and drinks bar, dessert table, a tasting, more staff.</dd></div>
            <div><dt className="cap mut">You, your planner or venue handle</dt><dd>The venue, decoration, other food, tables and linen, and alcohol.</dd></div>
          </dl>
          <div className="rows">
            <Split as="h2" id="venue-title" className="svc-subtitle" text="What we need *from your venue*" />
            <p className="mut" style={{ fontSize: 15, lineHeight: 1.6, paddingBottom: 12 }}>We share prices on request, based on your date, place and number of guests.</p>
            {venueNeeds.map(([k, v], i) => (
              <div key={k} className="row r4 hov"><span>{String(i + 1).padStart(2, '0')}</span><span>{k}</span><span className="fmt">{v}</span><span /></div>
            ))}
          </div>
        </div>
      </section>

      {/* Questions */}
      <section className="pb" aria-label="Questions">
        <div className="in">
          <Faq
            title="Common *questions*"
            items={[
              { q: 'How early should we book?', a: 'Answer to confirm with Mahanakorn.' },
              { q: 'What is the smallest event you cater?', a: 'Answer to confirm with Mahanakorn.' },
              { q: 'Can you cook at our office or at home?', a: 'Yes. We need some space, electricity and water close by. We check this with you before the event.' },
              { q: 'Can we taste the food first?', a: 'Yes, we can arrange a tasting. Where and how is to be confirmed.' },
              { q: "Isn't Thai food too spicy?", a: 'No. We cook every dish to your spice level, and every counter is marked mild, medium or spicy.' }
            ]}
          />
        </div>
      </section>

      <ClosingCta label={cta.quote} title="Tell us *about*|your event" text="The type of event, date, place and number of guests. We reply with a menu idea and a price, usually in 1–2 days." />
    </>
  );
}
