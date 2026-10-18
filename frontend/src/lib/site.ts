/** Site-wide settings. Values that change per deployment come from environment variables (see .env.example). */
export const site = {
  name: 'Mahanakorn Thai Catering',
  shortName: 'mahanakorn',
  thaiName: 'มหานคร',
  tagline: 'Thai catering for every event',
  description:
    'Thai catering for weddings, parties, company events and private dinners. Live food counters and sit-down Thai dinners, with vegetarian, vegan and egg-free options, in Thailand, Bali, India and beyond.',
  url: (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/$/, ''),
  apiUrl: (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000').replace(/\/$/, ''),
  whatsappNumber: (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '').replace(/\D/g, ''),
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || '',
  instagram: 'https://www.instagram.com/mahanakorn.ww/'
};

/** Page addresses in one place, so links never drift out of sync. */
export const routes = {
  home: '/',
  services: '/services',
  menu: '/menu',
  pastEvents: '/past-events',
  baliWedding: '/past-events/bali',
  planners: '/planners',
  quote: '/get-a-quote',
  privacy: '/privacy'
} as const;

/** The main call-to-action wording, used on every page. */
export const cta = { quote: 'Get a quote' };

export const nav = [
  { href: routes.home, label: 'Home' },
  { href: routes.services, label: 'Our Services' },
  { href: routes.menu, label: 'Our Menu' },
  { href: routes.pastEvents, label: 'Past Events' },
  { href: routes.planners, label: 'For Planners' }
];

export const mobileNav = [
  { href: routes.home, label: 'Home' },
  { href: routes.services, label: 'Our Services' },
  { href: routes.menu, label: 'Our Menu' },
  { href: routes.pastEvents, label: 'Past Events' },
  { href: routes.planners, label: 'For Planners' }
];

/** Pages whose first section is a dark full-bleed photo (header starts in its light-on-dark style). */
export const heroPages: string[] = [routes.home, routes.menu];

/** WhatsApp link with a pre-filled first message; null when no number is configured. */
export function whatsappLink(message = "Hi Mahanakorn, we're planning an event and would love to talk about Thai food.") {
  if (!site.whatsappNumber) return null;
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
