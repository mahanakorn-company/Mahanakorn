import type { Metadata } from 'next';
import TransitionLink from '@/components/TransitionLink';
import { PageTitle, ClosingCta } from '@/components/Sections';
import MenuClient from '@/components/MenuClient';
import { routes } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Our Menu · Authentic Thai Catering Selection',
  description:
    'Explore our authentic Thai catering menu: handcrafted hors d’oeuvres, signature curries and noodles, and traditional Thai desserts.',
  alternates: { canonical: routes.menu }
};

export default function MenuPage() {
  return (
    <>
      <PageTitle
        title="Our *Menu*"
        crumbs={
          <>
            <TransitionLink href={routes.home}>Home</TransitionLink>
            <span style={{ margin: '0 8px', opacity: 0.5 }}>/</span>
            <span>Our Menu</span>
          </>
        }
      />

      <section className="sec-sm" style={{ paddingTop: 0 }}>
        <div className="in">
          <MenuClient />
        </div>
      </section>

      <ClosingCta label="Found dishes you like?" title="Let's build|*your menu*" />
    </>
  );
}
