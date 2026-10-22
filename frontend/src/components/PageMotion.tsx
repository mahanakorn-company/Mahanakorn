'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { getLenis, isFinePointer, markArrival, prefersReducedMotion, revealPage, scrollToElement } from '@/lib/motion';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const EASE = 'expo.out';
const $$ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) => Array.from(root.querySelectorAll<T>(sel));
const words = (el: Element) => $$('.w > span', el);
const inView = (el: Element) => { const r = el.getBoundingClientRect(); return r.top < window.innerHeight * 0.92 && r.bottom > 0; };

/**
 * All scroll and entrance motion for the current page. Mounted from app/template.tsx, so it runs again on every
 * navigation and everything it creates is reverted when the page unmounts (no leaked ScrollTriggers).
 */
export default function PageMotion() {
  const marker = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const doc = document.documentElement;
    const body = document.body;
    const main = document.getElementById('main');
    const header = document.getElementById('site-header');
    if (!main) return;
    doc.classList.add('motion-ready');

    const lenis = getLenis();
    if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
    body.classList.remove('is-dark');
    if (header) header.dataset.hidden = 'false';

    const hero = main.querySelector<HTMLElement>('[data-hero]');
    let overHero = !!hero;
    let overDark = false;
    const setTone = () => { if (header) header.dataset.tone = overHero || overDark ? 'dark' : 'light'; };
    setTone();

    const cleanups: Array<() => void> = [];

    // In-page anchors (e.g. #pack) use smooth scrolling.
    const onAnchor = (e: Event) => {
      const a = (e.target as Element).closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!a) return;
      const target = document.getElementById(decodeURIComponent(a.getAttribute('href')!.slice(1)));
      if (target) { e.preventDefault(); scrollToElement(target); }
    };
    main.addEventListener('click', onAnchor);
    cleanups.push(() => main.removeEventListener('click', onAnchor));

    // Arriving through a link to a section (e.g. footer "Corporate Events" → /services#company): the page opens at
    // the top as usual, then glides down to that section. It stops if the visitor starts scrolling themselves.
    const hash = decodeURIComponent(window.location.hash.slice(1));
    if (hash) {
      let stopped = false;
      const targetY = () => {
        const target = document.getElementById(hash);
        return target ? target.getBoundingClientRect().top + window.scrollY - 96 : null;
      };
      const glide = window.setTimeout(() => {
        ScrollTrigger.refresh();
        const y = targetY();
        if (stopped || y === null) return;
        // If anything above the section grew while gliding (fonts, photos), finish exactly on it.
        const settle = () => { const end = targetY(); if (!stopped && end !== null && Math.abs(window.scrollY - end) > 2) lenis?.scrollTo(end, { duration: 0.4 }); };
        if (lenis) lenis.scrollTo(y, { duration: 1.1, onComplete: settle });
        else window.scrollTo({ top: y, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
      }, 600);
      const stop = () => { stopped = true; };
      const inputs = ['wheel', 'touchstart', 'keydown', 'pointerdown'] as const;
      inputs.forEach((ev) => window.addEventListener(ev, stop, { passive: true, once: true }));
      cleanups.push(() => {
        window.clearTimeout(glide);
        inputs.forEach((ev) => window.removeEventListener(ev, stop));
      });
    }

    if (prefersReducedMotion()) {
      // No animation: still keep the header readable over the hero.
      if (hero) {
        const onScroll = () => { overHero = hero.getBoundingClientRect().bottom > 90; setTone(); };
        window.addEventListener('scroll', onScroll, { passive: true });
        cleanups.push(() => window.removeEventListener('scroll', onScroll));
      }
      return () => cleanups.forEach((fn) => fn());
    }

    /* ---------- entrance: the black curtain only on the first visit; later pages fade in ---------- */
    const intro = gsap.timeline();
    const hadCurtain = revealPage(intro);
    const start = hadCurtain ? '-=0.55' : 0;
    if (!hadCurtain) {
      markArrival();
      const route = marker.current?.closest('.route');
      // clearProps matters: any transform left on this wrapper (even translate(0, 0)) stops the pinned gallery's
      // position: fixed from sticking to the screen, so it would scroll away and leave a blank white screen.
      if (route) {
        intro.fromTo(route, { opacity: 0, y: 14 }, {
          opacity: 1, y: 0, duration: 0.45, ease: 'power2.out', clearProps: 'transform,opacity',
          onComplete: () => ScrollTrigger.refresh()
        }, 0);
      }
    }

    if (hero) {
      const hImg = hero.querySelector('.hero-move');
      const hWords = $$('[data-intro-words] .w > span', hero);
      const hFade = $$('[data-intro-fade]', hero);
      intro.addLabel('in', start)
        .fromTo(hero, { clipPath: 'inset(7% 7% 7% 7% round 22px)' }, { clipPath: 'inset(0% 0% 0% 0% round 12px)', duration: 1.5, ease: 'expo.inOut' }, 'in')
        .fromTo(hImg, { scale: 1.3 }, { scale: 1.06, duration: 2, ease: EASE }, 'in')
        .fromTo(hWords, { yPercent: 115, y: 0 }, { yPercent: 0, stagger: 0.06, duration: 1.2, ease: EASE }, 'in+=0.6')
        .fromTo(hFade, { y: 24, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.08, duration: 0.9, ease: 'power3.out' }, 'in+=0.9');

      // Slow "breathing" zoom on the hero photo, with a pause control (WCAG 2.2.2).
      const kb = gsap.to(hImg, { scale: 1.14, duration: 14, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 3 });
      const onToggle = (e: Event) => { const paused = (e as CustomEvent<boolean>).detail; kb.paused(paused); };
      window.addEventListener('mk:hero-pause', onToggle);
      cleanups.push(() => window.removeEventListener('mk:hero-pause', onToggle));

      gsap.to(hero.querySelector('.hero-foot'), { y: -90, opacity: 0.25, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true } });
      gsap.to(hero.querySelector('.hero-move'), { yPercent: 14, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true } });
      ScrollTrigger.create({
        trigger: hero, start: 'bottom top+=90',
        onEnter: () => { overHero = false; setTone(); },
        onLeaveBack: () => { overHero = true; setTone(); }
      });
    } else {
      const pWords = $$('[data-intro-words] .w > span', main);
      intro.fromTo(pWords, { yPercent: 115, y: 0 }, { yPercent: 0, stagger: 0.05, duration: 1.2, ease: EASE }, start);
      const meta = $$('.ptitle .meta > div', main);
      if (meta.length) intro.fromTo(meta, { y: 20, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.08, duration: 0.8, ease: 'power3.out' }, '<0.4');
      const fades = $$('[data-intro-fade]', main);
      if (fades.length) intro.fromTo(fades, { y: 24, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.08, duration: 0.8, ease: 'power3.out' }, '<0.1');
    }

    /* ---------- pinned horizontal station gallery (desktop mice only; touch swipes natively) ----------
       Created before every other ScrollTrigger so their start/end positions already include the pin's scroll
       distance. pinSpacing is explicit because ScrollTrigger disables it for pins inside flex containers. */
    const mm = gsap.matchMedia();
    mm.add('(min-width: 901px) and (hover: hover)', () => {
      $$('[data-hscroll]', main).forEach((sec) => {
        const track = sec.querySelector<HTMLElement>('.htrack');
        if (!track) return;
        const index = sec.querySelector<HTMLElement>('[data-hs-index]');
        const bar = sec.querySelector<HTMLElement>('[data-hs-progress]');
        const cards = $$('.hcard', track);
        const stations = cards.filter((c) => !c.classList.contains('hcard-end')).length;
        const dist = () => Math.max(0, track.scrollWidth - sec.clientWidth);
        let last = '';
        const slide = gsap.to(track, {
          x: () => -dist(),
          ease: 'none',
          scrollTrigger: {
            trigger: sec,
            start: 'top top+=12',
            end: () => '+=' + dist(),
            pin: true,
            pinSpacing: true,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            refreshPriority: 1,
            onUpdate: (self) => {
              if (bar) bar.style.transform = `scaleX(${self.progress.toFixed(4)})`;
              if (index) {
                const n = String(Math.min(stations, Math.round(self.progress * (stations - 1)) + 1)).padStart(2, '0');
                if (n !== last) { index.textContent = n; last = n; }
              }
            }
          }
        });
        // Each photo drifts gently inside its card as the row slides past.
        cards.forEach((card) => {
          const im = card.querySelector('img');
          if (!im) return;
          gsap.fromTo(im, { xPercent: -6, scale: 1.14 }, { xPercent: 6, scale: 1.14, ease: 'none', scrollTrigger: { trigger: card, containerAnimation: slide, start: 'left right', end: 'right left', scrub: true } });
        });
      });
    });
    cleanups.push(() => mm.revert());

    /* ---------- header: hide on scroll down, show on scroll up; progress bar ---------- */
    ScrollTrigger.create({
      start: 0, end: 'max',
      onUpdate: (self) => { if (header) header.dataset.hidden = String(self.scroll() > 300 && self.direction === 1); }
    });
    const progress = document.getElementById('progress');
    if (progress) gsap.fromTo(progress, { scaleX: 0 }, { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: 0.3 } });

    /* ---------- headings: words rise ---------- */
    $$('[data-split]', main).forEach((el) => {
      const w = words(el);
      if (inView(el)) { gsap.fromTo(w, { yPercent: 115 }, { yPercent: 0, stagger: 0.04, duration: 1.1, ease: EASE, delay: hadCurtain ? 1.4 : 0.4 }); return; }
      gsap.set(w, { yPercent: 115 });
      ScrollTrigger.create({ trigger: el, start: 'top 90%', once: true, onEnter: () => gsap.to(w, { yPercent: 0, stagger: 0.045, duration: 1.1, ease: EASE }) });
    });

    /* ---------- generic reveals ---------- */
    $$('[data-reveal]', main).forEach((el) => {
      if (inView(el)) return;
      gsap.set(el, { y: 50, opacity: 0 });
      ScrollTrigger.create({ trigger: el, start: 'top 92%', once: true, onEnter: () => gsap.to(el, { y: 0, opacity: 1, duration: 1.1, ease: EASE }) });
    });
    $$('[data-stagger]', main).forEach((box) => {
      const kids = Array.from(box.children);
      if (!kids.length || inView(box)) return;
      gsap.set(kids, { y: 34, opacity: 0 });
      ScrollTrigger.create({ trigger: box, start: 'top 88%', once: true, onEnter: () => gsap.to(kids, { y: 0, opacity: 1, stagger: 0.07, duration: 0.9, ease: EASE }) });
    });
    $$('.rows', main).forEach((r) => {
      const kids = $$('.row, .grp, details', r);
      if (!kids.length || inView(r)) return;
      gsap.set(kids, { x: -40, opacity: 0 });
      ScrollTrigger.create({ trigger: r, start: 'top 86%', once: true, onEnter: () => gsap.to(kids, { x: 0, opacity: 1, stagger: 0.05, duration: 0.9, ease: EASE }) });
    });
    $$('.switch-list', main).forEach((l) => {
      const kids = $$('.mi', l);
      if (!kids.length || inView(l)) return;
      gsap.set(kids, { yPercent: 60, opacity: 0 });
      ScrollTrigger.create({ trigger: l, start: 'top 85%', once: true, onEnter: () => gsap.to(kids, { yPercent: 0, opacity: 1, stagger: 0.06, duration: 1, ease: EASE }) });
    });

    /* ---------- photos: card opens up, image settles; parallax ---------- */
    $$('[data-clip]', main).forEach((m) => {
      gsap.fromTo(m, { clipPath: 'inset(9% 7% 9% 7% round 20px)' }, { clipPath: 'inset(0% 0% 0% 0% round 12px)', ease: 'none', scrollTrigger: { trigger: m, start: 'top bottom', end: 'top 35%', scrub: 0.6 } });
      const im = m.querySelector('img');
      if (im) gsap.fromTo(im, { scale: 1.3 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: m, start: 'top bottom', end: 'bottom top', scrub: 0.6 } });
    });
    $$('[data-speed]', main).forEach((el) => {
      const s = parseFloat(el.dataset.speed || '0.1');
      gsap.fromTo(el, { y: 120 * s }, { y: -120 * s, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } });
    });
    $$('.statement', main).forEach((st) => {
      const cut = st.querySelector('.cut');
      if (cut) gsap.fromTo(cut, { scale: 0.55, rotate: -6, borderRadius: 40 }, { scale: 1, rotate: 0, borderRadius: 8, ease: 'none', scrollTrigger: { trigger: st, start: 'top 85%', end: 'center 45%', scrub: 0.8 } });
    });

    /* ---------- scroll-lit lines ---------- */
    $$('.lit', main).forEach((lit) => {
      const lines = Array.from(lit.children);
      const on = lit.dataset.on || '#111111';
      const off = lit.dataset.off || '#C9C4BC';
      gsap.set(lines, { x: -12, color: off });
      const tl = gsap.timeline({ scrollTrigger: { trigger: lit, start: 'top 78%', end: 'bottom 38%', scrub: 0.5 } });
      lines.forEach((ln, i) => {
        tl.to(ln, { color: on, x: 0, duration: 1 }, i);
        if (i < lines.length - 1) tl.to(ln, { color: off, duration: 1 }, i + 1);
      });
    });

    /* ---------- counters, marquee, closing word ---------- */
    $$('[data-count]', main).forEach((el) => {
      const to = parseFloat(el.dataset.count || '0');
      const o = { v: 0 };
      ScrollTrigger.create({ trigger: el, start: 'top 90%', once: true, onEnter: () => gsap.to(o, { v: to, duration: 1.6, ease: 'power3.out', onUpdate: () => { el.textContent = String(Math.round(o.v)); } }) });
    });
    $$('[data-marquee]', main).forEach((el) => {
      gsap.fromTo(el, { xPercent: 4 }, { xPercent: -22, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 0.6 } });
    });
    $$('[data-grow]', main).forEach((el) => {
      gsap.fromTo(el, { scale: 0.7, opacity: 0.2 }, { scale: 1, opacity: 1, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'center 55%', scrub: 0.6 } });
    });

    /* ---------- dark sections: page background turns night, header switches tone ---------- */
    $$('[data-dark]', main).forEach((sec) => {
      ScrollTrigger.create({
        trigger: sec, start: 'top 55%', end: 'bottom 45%',
        onToggle: (self) => { overDark = self.isActive; body.classList.toggle('is-dark', self.isActive); setTone(); }
      });
    });

    /* ---------- recalculate once photos have loaded ---------- */
    let t: number | undefined;
    // Never recalculate while a section is pinned (a photo further down can finish loading mid-pin): that made
    // the pinned gallery jump. Wait until the pin is released instead.
    const pinned = () => ScrollTrigger.getAll().some((st) => st.pin && st.isActive);
    const refresh = () => {
      window.clearTimeout(t);
      t = window.setTimeout(() => (pinned() ? refresh() : ScrollTrigger.refresh()), pinned() ? 400 : 150);
    };
    main.addEventListener('load', refresh, true);
    window.addEventListener('load', refresh);
    const ro = new ResizeObserver(refresh);
    ro.observe(main);
    cleanups.push(() => { main.removeEventListener('load', refresh, true); window.removeEventListener('load', refresh); ro.disconnect(); window.clearTimeout(t); });

    if (!isFinePointer()) ScrollTrigger.config({ ignoreMobileResize: true });

    return () => {
      cleanups.forEach((fn) => fn());
      body.classList.remove('is-dark');
    };
  });

  return <span ref={marker} hidden />;
}
