'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { gsap } from 'gsap';
import TransitionLink from './TransitionLink';
import { PillLink } from './Pill';
import { Close, MenuIcon } from './Icons';
import { cta, heroPages, mobileNav, nav, routes, site, whatsappLink } from '@/lib/site';
import { destroySmooth, initSmooth, isFinePointer, lockScroll, prefersReducedMotion } from '@/lib/motion';

const isActive = (pathname: string, href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

/** Fixed header, full-screen mobile menu, page curtain, cursor bubble, magnetic buttons and the WhatsApp button. */
export default function SiteChrome() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const openBtnRef = useRef<HTMLButtonElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const wa = whatsappLink();
  const tone = heroPages.includes(pathname) ? 'dark' : 'light';

  // Smooth scrolling for the whole session.
  useEffect(() => {
    initSmooth();
    return () => destroySmooth();
  }, []);

  // Close the menu on navigation.
  useEffect(() => { setOpen(false); }, [pathname]);

  // Mobile menu: lock scroll, focus trap, Escape to close, animated entry.
  useEffect(() => {
    const menu = menuRef.current;
    if (!open || !menu) return;
    lockScroll(true);
    const focusables = () => Array.from(menu.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'));
    focusables()[0]?.focus();
    if (!prefersReducedMotion()) {
      gsap.fromTo(menu, { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: 0.7, ease: 'expo.inOut' });
      gsap.fromTo(menu.querySelectorAll('.big'), { yPercent: 100, opacity: 0 }, { yPercent: 0, opacity: 1, stagger: 0.06, delay: 0.25, duration: 0.8, ease: 'expo.out' });
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setOpen(false); return; }
      if (e.key !== 'Tab') return;
      const items = focusables();
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      lockScroll(false);
      openBtnRef.current?.focus();
    };
  }, [open]);

  // Cursor bubble and magnetic buttons (desktop mice only), via event delegation.
  useEffect(() => {
    const cur = cursorRef.current;
    if (!cur || !isFinePointer() || prefersReducedMotion()) return;
    const cx = gsap.quickTo(cur, 'x', { duration: 0.45, ease: 'power3' });
    const cy = gsap.quickTo(cur, 'y', { duration: 0.45, ease: 'power3' });
    const mags = new WeakMap<Element, { x: (v: number) => void; y: (v: number) => void }>();
    let hovered: Element | null = null;
    let magnet: HTMLElement | null = null;

    const onMove = (e: PointerEvent) => {
      cx(e.clientX); cy(e.clientY);
      const t = e.target as Element | null;
      const label = t?.closest?.('[data-cursor]') || null;
      if (label !== hovered) {
        hovered = label;
        if (label) { cur.textContent = (label as HTMLElement).dataset.cursor || ''; gsap.to(cur, { scale: 1, duration: 0.35, ease: 'back.out(2)' }); }
        else gsap.to(cur, { scale: 0, duration: 0.25 });
      }
      const m = (t?.closest?.('.pill, .round-btn') as HTMLElement) || null;
      if (magnet && magnet !== m) { const q = mags.get(magnet); q?.x(0); q?.y(0); }
      magnet = m;
      if (m) {
        let q = mags.get(m);
        if (!q) { q = { x: gsap.quickTo(m, 'x', { duration: 0.5, ease: 'power3' }), y: gsap.quickTo(m, 'y', { duration: 0.5, ease: 'power3' }) }; mags.set(m, q); }
        const r = m.getBoundingClientRect();
        q.x((e.clientX - r.left - r.width / 2) * 0.22);
        q.y((e.clientY - r.top - r.height / 2) * 0.3);
      }
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  // Hide the cursor bubble when the page changes under it.
  useEffect(() => { if (cursorRef.current) gsap.set(cursorRef.current, { scale: 0 }); }, [pathname]);

  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <header id="site-header" className="hdr" data-tone={tone}>
        <TransitionLink className="brand" href="/" aria-label={`${site.name}, home`}>
          <span className="brand-badge" aria-hidden="true"><Image src={site.logoMark} alt="" width={140} height={256} priority sizes="40px" /></span>
          <span className="brand-text">
            <b>{site.shortName}</b>
            <span>{site.thaiName} · {site.tagline}</span>
          </span>
        </TransitionLink>
        <nav className="gnav" aria-label="Main">
          {nav.map((n) => (
            <TransitionLink key={n.href} href={n.href} aria-current={isActive(pathname, n.href) ? 'page' : undefined}>
              {isActive(pathname, n.href) ? '● ' : ''}{n.label}
            </TransitionLink>
          ))}
        </nav>
        <span className="hdr-actions">
          {pathname !== routes.quote && <PillLink href={routes.quote} variant="dk" small className="hdr-cta">{cta.quote}</PillLink>}
          <button ref={openBtnRef} type="button" className="pill sm menu-btn" aria-expanded={open} aria-controls="mnav" onClick={() => setOpen(true)}>
            Menu <span className="ic"><MenuIcon /></span>
          </button>
        </span>
      </header>

      <div id="mnav" ref={menuRef} className="mnav" role="dialog" aria-modal="true" aria-label="Site menu" hidden={!open}>
        <button type="button" className="pill sm x" onClick={() => setOpen(false)}>
          Close <span className="ic"><Close /></span>
        </button>
        <nav aria-label="Mobile">
          {mobileNav.map((n) => (
            <TransitionLink key={n.href} className="big" href={n.href} aria-current={pathname === n.href ? 'page' : undefined}>{n.label}</TransitionLink>
          ))}
        </nav>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          <PillLink href={routes.quote}>{cta.quote}</PillLink>
          {wa && <PillLink href={wa} variant="wa">WhatsApp</PillLink>}
        </div>
      </div>

      <div id="curtain" className="curtain" aria-hidden="true">
        <div className="curtain-mark">
          <span className="curtain-badge"><Image src={site.logo} alt="" width={394} height={640} priority sizes="120px" /></span>
          <b>{site.shortName}</b>
        </div>
      </div>
      <div id="progress" className="progress" aria-hidden="true" />
      <div ref={cursorRef} className="cursor" aria-hidden="true" />
      {wa && pathname !== routes.quote && <PillLink href={wa} variant="wa" className="fab" ariaLabel="Chat with us on WhatsApp">WhatsApp</PillLink>}
    </>
  );
}
