'use client';

import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import PageMotion from '@/components/PageMotion';

/**
 * Wraps every page in a div keyed by the URL path, so each navigation replaces the whole wrapper:
 * - every page gets a fresh entrance and fresh scroll animations (PageMotion re-mounts);
 * - React only ever removes this wrapper, never a node GSAP has moved. ScrollTrigger's pinning moves pinned
 *   sections into a "pin-spacer" element, and removing them individually caused
 *   "Failed to execute 'removeChild'" crashes when leaving the home page.
 */
export default function Template({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return (
    <div className="route" key={pathname}>
      {children}
      <PageMotion />
    </div>
  );
}
