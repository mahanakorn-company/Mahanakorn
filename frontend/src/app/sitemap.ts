import type { MetadataRoute } from 'next';
import { routes, site } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: string[] = [routes.home, routes.services, routes.menu, routes.pastEvents, routes.planners, routes.quote, routes.privacy];
  return pages.map((p) => ({
    url: `${site.url}${p === '/' ? '' : p}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: p === routes.home ? 1 : p === routes.quote ? 0.9 : 0.7
  }));
}
