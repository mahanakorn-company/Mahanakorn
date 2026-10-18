import { PillLink } from '@/components/Pill';
import Split from '@/components/Split';
import { cta, routes } from '@/lib/site';

export default function NotFound() {
  return (
    <section className="ptitle" style={{ minHeight: '70vh', display: 'flex', alignItems: 'center' }}>
      <div className="in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24, textAlign: 'center' }}>
        <span className="br">Page not found</span>
        <Split as="h1" text="This page *isn't on the menu*" intro />
        <p className="mut">The link may be old, or the page has moved.</p>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
          <PillLink href={routes.home} variant="dk">Back to home</PillLink>
          <PillLink href={routes.quote} variant="ln">{cta.quote}</PillLink>
        </div>
      </div>
    </section>
  );
}
