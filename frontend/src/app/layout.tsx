import type { Metadata, Viewport } from 'next';
import { Instrument_Sans, Instrument_Serif, Noto_Serif_Thai } from 'next/font/google';
import type { ReactNode } from 'react';
import SiteChrome from '@/components/SiteChrome';
import { site } from '@/lib/site';
import './globals.css';

const sans = Instrument_Sans({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-sans', display: 'swap' });
const serif = Instrument_Serif({ subsets: ['latin'], weight: '400', style: ['normal', 'italic'], variable: '--font-serif', display: 'swap' });
const thai = Noto_Serif_Thai({ subsets: ['thai'], weight: ['400', '500'], variable: '--font-thai', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} · Thai catering for weddings and events`, template: `%s · ${site.name}` },
  description: site.description,
  applicationName: site.name,
  openGraph: {
    type: 'website',
    siteName: site.name,
    title: `${site.name} · Thai catering for weddings and events`,
    description: site.description,
    images: [{ url: '/img/station-night.jpg', width: 1600, height: 1066, alt: 'Mahanakorn khao soi counter at night' }]
  },
  twitter: { card: 'summary_large_image' },
  alternates: { canonical: '/' },
  robots: { index: true, follow: true }
};

export const viewport: Viewport = { width: 'device-width', initialScale: 1, viewportFit: 'cover', themeColor: '#ffffff' };

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'FoodEstablishment',
  name: site.name,
  alternateName: site.thaiName,
  description: site.description,
  url: site.url,
  image: `${site.url}/img/station-night.jpg`,
  servesCuisine: ['Thai', 'Thai street food', 'Vegetarian Thai', 'Vegan Thai'],
  areaServed: ['Bangkok', 'Thailand', 'Bali', 'Jakarta', 'Delhi'],
  address: { '@type': 'PostalAddress', addressLocality: 'Bangkok', addressCountry: 'TH' },
  sameAs: [site.instagram]
};

// Runs before first paint: enables entrance animations only when motion is allowed, with a 4s safety fallback.
const motionScript = `(function(){try{var d=document.documentElement;if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;d.classList.add('motion');setTimeout(function(){if(!d.classList.contains('motion-ready'))d.classList.remove('motion')},4000)}catch(e){}})();`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable} ${thai.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </head>
      <body>
        <SiteChrome />
        <div className="page">
          <main id="main" tabIndex={-1}>{children}</main>
        </div>
      </body>
    </html>
  );
}
