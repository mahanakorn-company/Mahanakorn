import type { Metadata } from 'next';
import Image from 'next/image';
import Split from '@/components/Split';
import { PillLink } from '@/components/Pill';
import { ClosingCta } from '@/components/Sections';
import { img, stationSets } from '@/lib/content';
import { routes } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Our Menu · Curations',
  description: 'Curated Thai catering menus by Mahanakorn: Bangkok night market, fresh daylight celebrations, and late-night street food counters.',
  alternates: { canonical: routes.menu }
};

// A real photo for each ready-made menu (same order as stationSets).
const setPhotos = [img.khaosoiCups, img.riceSalad, img.pandanToast];

export default function MenuPage() {
  return (
    <>
      <section id="sets" className="sec anchor menu-sets-sec" aria-labelledby="sets-title" style={{ paddingTop: 'clamp(116px, 12vw, 170px)' }}>
        <div className="in">
          <div className="menu-intro" style={{ marginBottom: 'clamp(36px, 4vw, 64px)' }}>
            <div className="menu-intro-head">
              <Split as="h1" id="sets-title" className="svc-title" text="*Curations*" intro />
            </div>
          </div>
          <div className="menu-sets">
            {stationSets.map((set, s) => (
              <article key={set.name} className="menu-set" aria-label={set.name} data-reveal>
                <figure className="menu-set-photo">
                  <Image src={setPhotos[s].src} alt={setPhotos[s].alt} fill sizes="(max-width: 900px) 92vw, 30vw" style={{ objectFit: 'cover' }} />
                </figure>
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

          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 'clamp(44px, 5.5vw, 68px)' }} data-reveal>
            <PillLink href={routes.fullMenu} variant="dk" style={{ minWidth: 220, justifyContent: 'center' }}>
              View full menu
            </PillLink>
          </div>
        </div>
      </section>

      <ClosingCta label="Found dishes you like?" title="Let's build|*your menu*" />
    </>
  );
}
