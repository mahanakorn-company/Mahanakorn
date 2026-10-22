'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from 'react';
import { leavePage, restoreIfStuck, scrollToElement } from '@/lib/motion';

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & { href: string; children: ReactNode };

/** next/link with a short fade-out page transition. Modifier-clicks, external and same-page links behave normally. */
export default function TransitionLink({ href, onClick, children, ...rest }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  async function handle(e: MouseEvent<HTMLAnchorElement>) {
    onClick?.(e);
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const url = new URL(href, window.location.href);
    if (url.origin !== window.location.origin) return;
    if (url.pathname === pathname) {
      if (url.hash) {
        const target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
        if (target) {
          e.preventDefault();
          scrollToElement(target);
        }
      }
      return;
    }
    e.preventDefault();
    const started = Date.now();
    await leavePage();
    // Section links (#…): don't let Next jump straight there; PageMotion opens the page and then glides down.
    router.push(url.pathname + url.search + url.hash, { scroll: !url.hash });
    window.setTimeout(() => restoreIfStuck(started), 5000);
  }

  return (
    <Link href={href} onClick={handle} {...rest}>
      {children}
    </Link>
  );
}
