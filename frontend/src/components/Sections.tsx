import Image from 'next/image';
import type { ReactNode } from 'react';
import Split from './Split';
import TransitionLink from './TransitionLink';
import { PillLink } from './Pill';
import { Thumb } from './Media';
import { ArrowRight } from './Icons';
import { cta, routes, site, whatsappLink } from '@/lib/site';
import type { FunctionRow } from '@/lib/content';

/** Big serif page title with a sub-line and three meta columns (inner pages). */
export function PageTitle({ title, sub, crumbs, meta, children }: { title: string; sub?: string; crumbs?: ReactNode; meta?: { label: string; value: string; note?: string }[]; children?: ReactNode }) {
  return (
    <section className="ptitle">
      <div className="in">
        {crumbs && <nav aria-label="Breadcrumb" className="br crumbs" data-intro-fade>{crumbs}</nav>}
        <Split as="h1" text={title} intro />
        {sub && <Split as="p" className="sub" text={sub} intro />}
        {meta && (
          <dl className="meta">
            {meta.map((m) => (
              <div key={m.label}>
                <dt className="br">{m.label}</dt>
                <dd className="cap">{m.value}</dd>
                {m.note && <dd className="mut" style={{ fontSize: 12 }}>{m.note}</dd>}
              </div>
            ))}
          </dl>
        )}
        {children}
      </div>
    </section>
  );
}

/** Wedding events grouped by day; hovering opens extra photos. */
export function WeekendRows({ days, href = `${routes.services}#weddings` }: { days: { day: string; items: FunctionRow[] }[]; href?: string }) {
  return (
    <div className="rows">
      {days.map((d) => (
        <div key={d.day} style={{ display: 'contents' }}>
          <span className="cap mut grp">{d.day}</span>
          {d.items.map((r) => (
            <TransitionLink key={d.day + r.name} className="row" href={href}>
              <span>{r.n}</span>
              <span>{r.name}</span>
              <span className="fmt">{r.fmt}</span>
              <span className="thumbs" aria-hidden="true">
                <span className="more"><Thumb image={r.thumbs[1]} /><Thumb image={r.thumbs[2]} /></span>
                <Thumb image={r.thumbs[0]} />
              </span>
              <span className="go" aria-hidden="true"><ArrowRight /></span>
            </TransitionLink>
          ))}
        </div>
      ))}
    </div>
  );
}

export function Faq({ title, items, onWhite }: { title: string; items: { q: string; a: string }[]; onWhite?: boolean }) {
  return (
    <div className="rows">
      <Split as="h2" text={title} style={{ fontSize: 'clamp(24px, 2.6vw, 34px)', fontWeight: 600, textTransform: 'uppercase', marginBottom: 16 }} />
      {items.map((it, i) => (
        <details key={it.q} className={`fq${onWhite ? ' on-white' : ''}`}>
          <summary>
            <span>{String(i + 1).padStart(2, '0')}</span>
            <span>{it.q}</span>
            <span className="plus" aria-hidden="true">+</span>
          </summary>
          <p>{it.a}</p>
        </details>
      ))}
    </div>
  );
}

export function FooterNav() {
  return (
    <footer className="foot">
      <div className="cols">
        <div className="col">
          <span style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Image src={site.logo} alt="" width={394} height={640} sizes="44px" style={{ width: 'auto', height: 72 }} />
            <strong style={{ fontSize: 22, letterSpacing: '-.02em' }}>{site.shortName}</strong>
          </span>
          <span className="mut" style={{ lineHeight: 1.5 }}>Born out of love for Thai food, Mahanakorn is a homegrown crew from Thailand.</span>
          <span className="th mut">{site.thaiName}</span>
        </div>
        <nav className="col" aria-label="Services">
          <span className="cap mut">Services</span>
          <TransitionLink href={`${routes.services}#weddings`}>Weddings</TransitionLink>
          <TransitionLink href={`${routes.services}#indian-weddings`}>Indian weddings</TransitionLink>
          <TransitionLink href={`${routes.services}#parties`}>Private parties</TransitionLink>
          <TransitionLink href={`${routes.services}#private`}>Private dining</TransitionLink>
          <TransitionLink href={routes.pastEvents}>Past events</TransitionLink>
        </nav>
        <nav className="col" aria-label="Food">
          <span className="cap mut">Food</span>
          <TransitionLink href={routes.menu}>Our menu</TransitionLink>
          <TransitionLink href={`${routes.menu}#sets`}>Ready-made menus</TransitionLink>
          <TransitionLink href={`${routes.services}#diet`}>Vegetarian food</TransitionLink>
        </nav>
        <div className="col">
          <span className="cap mut">Contact</span>
          <TransitionLink href={routes.quote}>{cta.quote}</TransitionLink>
          {whatsappLink() && <a href={whatsappLink()!} target="_blank" rel="noopener noreferrer">WhatsApp</a>}
          {site.email && <span style={{ userSelect: 'all' }}>{site.email}</span>}
          <TransitionLink href={routes.planners}>For planners</TransitionLink>
        </div>
      </div>
      <div className="foot-row">
        <span>© {new Date().getFullYear()} {site.name}, Bangkok</span>
        <span style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
          <TransitionLink href={routes.privacy}>Privacy</TransitionLink>
          <TransitionLink href={`${routes.privacy}#credits`}>Photo credits</TransitionLink>
          <a href={site.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
        </span>
      </div>
    </footer>
  );
}

/** Small dark closing section: a short heading, the two main actions and the footer. */
export function ClosingCta({ label = 'Ready when you are', title, text }: { label?: string; title: string; text?: string }) {
  const wa = whatsappLink();
  return (
    <section className="dark" data-dark aria-label={cta.quote} style={{ padding: 'clamp(48px, 5vw, 72px) 20px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18, textAlign: 'center' }}>
      <span className="br">{label}</span>
      <Split as="h2" text={title} style={{ fontSize: 'clamp(30px, 4vw, 56px)', lineHeight: 1, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '-.02em' }} />
      {text && <p data-reveal className="mut" style={{ maxWidth: 420, lineHeight: 1.6 }}>{text}</p>}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center' }}>
        <PillLink href={routes.quote}>{cta.quote}</PillLink>
        {wa && <PillLink href={wa} variant="wa">WhatsApp</PillLink>}
      </div>
      <div style={{ width: '100%', marginTop: 40, textAlign: 'left' }}>
        <FooterNav />
      </div>
    </section>
  );
}
