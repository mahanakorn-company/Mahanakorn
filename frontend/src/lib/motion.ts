import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let lenis: Lenis | null = null;
let tick: ((time: number) => void) | null = null;

export function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function isFinePointer() {
  return typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
}

/** Smooth scrolling (Lenis) driven by GSAP's ticker so ScrollTrigger stays in sync. Skipped for reduced motion. */
export function initSmooth() {
  if (lenis || prefersReducedMotion()) return lenis;
  lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
  lenis.on('scroll', ScrollTrigger.update);
  tick = (time) => lenis?.raf(time * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);
  return lenis;
}

export function destroySmooth() {
  if (tick) gsap.ticker.remove(tick);
  lenis?.destroy();
  lenis = null;
  tick = null;
}

export const getLenis = () => lenis;

export function scrollToElement(el: Element, offset = -96) {
  if (lenis) lenis.scrollTo(el as HTMLElement, { offset, duration: 1.2 });
  else el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' });
}

export function lockScroll(locked: boolean) {
  if (lenis) (locked ? lenis.stop() : lenis.start());
  document.documentElement.style.overflow = locked ? 'hidden' : '';
}

/* ---------- intro curtain (first visit only) and page transitions ---------- */

const curtainEl = () => document.getElementById('curtain');
let lastArrival = 0;
let introPlayed = false;

export function isCurtainShown() {
  const c = curtainEl();
  return !!c && getComputedStyle(c).display !== 'none';
}

/**
 * Lifts the black intro curtain, once per visit. CSS shows the curtain on first paint
 * (`html.motion:not(.intro-done)`). As soon as the intro starts, `intro-done` is added to <html>, so even if the
 * intro is cut short (e.g. a link is clicked and the page's animations are reverted), the curtain can never
 * come back on later pages.
 */
export function revealPage(tl: gsap.core.Timeline) {
  const c = curtainEl();
  lastArrival = Date.now();
  if (!c || introPlayed || !isCurtainShown()) {
    introPlayed = true;
    document.documentElement.classList.add('intro-done');
    return false;
  }
  // Counted as played only once the timeline actually starts, so React Strict Mode's mount/unmount/mount in
  // development doesn't use up the intro before anyone sees it.
  tl.set(c, { display: 'flex' }, 0).add(() => {
    introPlayed = true;
    document.documentElement.classList.add('intro-done');
  }, 0);
  const mark = c.firstElementChild;
  tl.fromTo(mark, { yPercent: 110, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.55, ease: 'expo.out' })
    .to(mark, { yPercent: -110, opacity: 0, duration: 0.45, ease: 'power3.in' }, '+=0.1')
    .fromTo(c, { yPercent: 0 }, { yPercent: -100, duration: 0.9, ease: 'expo.inOut' }, '-=0.2')
    .set(c, { display: 'none', yPercent: 0 });
  return true;
}

/** Quick fade of the current page before navigating; the next page then plays its own entrance. */
export function leavePage(): Promise<void> {
  const route = document.querySelector<HTMLElement>('.route');
  if (!route || prefersReducedMotion()) return Promise.resolve();
  return new Promise((resolve) => {
    let settled = false;
    const done = () => { if (!settled) { settled = true; resolve(); } };
    gsap.to(route, { opacity: 0, y: -14, duration: 0.32, ease: 'power2.in', onComplete: done });
    // Animation frames pause in background tabs; never let a paused animation block navigation.
    window.setTimeout(done, 450);
  });
}

/** Safety net: if a navigation stalls, bring the faded page back instead of leaving it blank. */
export function restoreIfStuck(since: number) {
  if (lastArrival >= since) return;
  const route = document.querySelector<HTMLElement>('.route');
  if (route) gsap.to(route, { opacity: 1, y: 0, duration: 0.3, clearProps: 'transform,opacity' });
}

/** Marks a new page as arrived (used by the safety net above). */
export function markArrival() {
  lastArrival = Date.now();
}
