import type { Metadata } from 'next';
import TransitionLink from '@/components/TransitionLink';
import { PageTitle, ClosingCta } from '@/components/Sections';
import FullMenuClient from '@/components/FullMenuClient';
import { routes } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Full Menu · Complete Thai Catering Selection',
  description:
    'Explore our complete 2026 catering menu: passed hors d’oeuvres, signature curries and noodles, and traditional Thai desserts.',
  alternates: { canonical: routes.fullMenu }
};

export default function FullMenuPage() {
  return (
    <>
      <PageTitle
        title="Full *Menu*"
        sub="Every hors d’oeuvre, main course and dessert on our menu."
        crumbs={
          <>
            <TransitionLink href={routes.home}>Home</TransitionLink>
            <span style={{ margin: '0 8px', opacity: 0.5 }}>/</span>
            <TransitionLink href={routes.menu}>Our Menu</TransitionLink>
            <span style={{ margin: '0 8px', opacity: 0.5 }}>/</span>
            <span>Full Menu</span>
          </>
        }
      />

      <section className="sec-sm" style={{ paddingTop: 0 }}>
        <div className="in">
          <FullMenuClient />
        </div>
      </section>

      <ClosingCta label="Found dishes you love?" title="Let's build|*your menu*" />
    </>
  );
}

