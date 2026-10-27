import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Image from 'next/image';
import Split from '@/components/Split';
import SwitchList from '@/components/SwitchList';
import TransitionLink from '@/components/TransitionLink';
import { PillLink } from '@/components/Pill';
import { ClosingCta, PageTitle } from '@/components/Sections';
import { ArrowRight } from '@/components/Icons';
import { eventTypes, functions, img, profile, type Img } from '@/lib/content';
import { cta, routes } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Our Services',
  description: 'Thai catering by Mahanakorn for destination weddings, private events, corporate events and fine dining.',
  alternates: { canonical: routes.services }
};

const service = (id: string) => eventTypes.find((e) => e.id === id)!;


/** A secondary action: a small text link with an arrow (the one primary action is always "Get a quote"). */
function TextLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <TransitionLink className="svc-link" href={href}>
      {children} <span aria-hidden="true"><ArrowRight size={11} /></span>
    </TransitionLink>
  );
}

/** One service: a large real photograph beside its number, name, existing description and the quote button. */
function ServiceBlock({ id, title, image, imagePosition, flip, quote, children }: {
  id: string; title: string; image: Img; imagePosition?: string; flip?: boolean; quote: string; children: ReactNode;
}) {
  return (
    <section id={id} className={`svc anchor${flip ? ' svc-flip' : ''}`} aria-labelledby={`${id}-title`}>
      <div className="in svc-grid">
        <figure className="svc-photo" data-reveal>
          <Image src={image.src} alt={image.alt} fill sizes="(max-width: 900px) 92vw, 46vw" style={{ objectFit: 'cover', objectPosition: imagePosition || 'center' }} />
        </figure>
        <div className="svc-text" data-stagger>
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
  Page flow: intro (title, photo, one line, quote) → Catering Services → 01 Vows Beyond Borders (destination weddings)
  → 02 Private Events → 03 Corporate Events → 04 Fine Dining → get a quote
*/
export default function ServicesPage() {
  const parties = service('parties');
  const company = service('company');

  return (
    <>
      <PageTitle title="Diverse Catering Services" />

      {/* Intro: one strong photograph */}
      <section className="svc-hero" aria-label="Diverse Catering Services">
        <div className="in">
          <figure className="svc-hero-photo">
            <Image src={img.marketSign.src} alt={img.marketSign.alt} fill priority sizes="(max-width: 1240px) 96vw, 1180px" style={{ objectFit: 'cover', objectPosition: 'center 55%' }} />
          </figure>
        </div>
      </section>

      {/* Catering Services: the client's four points, text only */}
      <section id="catering" className="sec anchor" aria-labelledby="catering-title">
        <div className="in svc-intro">
          <div className="svc-intro-head">
            <Split as="h2" id="catering-title" className="svc-title" text="Catering *Services*" />
            <TextLink href={routes.menu}>See our menu</TextLink>
          </div>
          <dl className="svc-points svc-points-2" data-stagger>
            {profile.catering.map((p) => <div key={p.title}><dt>{p.title}</dt><dd>{p.text}</dd></div>)}
          </dl>
        </div>
      </section>

      {/* 01 Vows Beyond Borders (destination weddings) */}
      <ServiceBlock id="weddings" title="Vows Beyond *Borders*" image={img.weddingLiveCounter} imagePosition="center 30%" quote={`${routes.quote}?event=weddings`}>
        <div className="svc-intro-copy">
          <p className="svc-kicker">I Do, Anywhere.</p>
          <p className="svc-sub">Curated destination weddings, flawlessly executed from Bangkok to beyond.</p>
        </div>
        <p className="svc-lead">We curate and execute luxury weddings in any destination, so your celebration feels intimate, effortless, and entirely yours, no matter where in the world you gather.</p>
      </ServiceBlock>

      {/* Vows Beyond Borders, in detail: food for each wedding event */}
      <section className="svc-detail" aria-label="Food for each wedding event">
        <div className="in">
          <div className="panel svc-detail-panel">
            <p className="lead-copy" style={{ maxWidth: 560 }}>Here is what we usually serve at each wedding event. Tap an event to see it.</p>
            <SwitchList items={functions} label="Wedding events" hint="Tap an event" initial={1} small link={{ href: `${routes.quote}?event=weddings&ask=sample-menu`, label: 'Ask for a sample menu' }} />
          </div>
        </div>
      </section>

      {/* 02 Private Events */}
      <ServiceBlock id="parties" title="Private *Events*" image={img.smoked} flip quote={`${routes.quote}?event=parties`}>
        <p className="svc-lead">{parties.text}</p>
        <div className="svc-intro-copy">
          <p className="svc-kicker">Gather. Privately.</p>
          <p className="svc-sub">Executed from Bangkok to beyond.</p>
        </div>
      </ServiceBlock>

      {/* 03 Corporate Events */}
      <ServiceBlock id="company" title="Corporate *Events*" image={img.teamServing} imagePosition="center 35%" quote={`${routes.quote}?event=company`}>
        <p className="svc-sub">Where Business Meets Celebration.</p>
        <p className="svc-lead">{company.text}</p>
      </ServiceBlock>

      {/* 04 Fine Dining: the client's Private Dining Experiences points */}
      <ServiceBlock id="private" title="Fine *Dining*" image={img.dessert} flip quote={`${routes.quote}?event=private`}>
        <dl className="svc-points">
          {profile.privateDining.map((p) => <div key={p.title}><dt>{p.title}</dt><dd>{p.text}</dd></div>)}
        </dl>
      </ServiceBlock>

      <ClosingCta label={cta.quote} title="Tell us *about*|your event" text="The type of event, date, place and number of guests. We reply with a menu idea and a price, usually in 1–2 days." />
    </>
  );
}
