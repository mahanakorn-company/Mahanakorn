'use client';

import { useCallback, useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react';
import Media from './Media';
import TransitionLink from './TransitionLink';
import { ArrowLeft, ArrowRight } from './Icons';
import type { Img } from '@/lib/content';

type Item = { id: string; name: string; image: Img; href: string };

/**
 * Compact sideways-scrolling row of cards (native scroll with snap, so touch, trackpad and keyboard all work).
 * Desktop mice can also drag it, and the arrow buttons move one card at a time.
 */
export default function EventsCarousel({ items, more }: { items: Item[]; more: { href: string; label: string; title: string } }) {
  const trackRef = useRef<HTMLOListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [progress, setProgress] = useState(0);
  const drag = useRef({ down: false, moved: false, x: 0, left: 0 });

  const update = useCallback(() => {
    const t = trackRef.current;
    if (!t) return;
    const max = t.scrollWidth - t.clientWidth;
    setAtStart(t.scrollLeft <= 4);
    setAtEnd(t.scrollLeft >= max - 4);
    setProgress(max > 0 ? t.scrollLeft / max : 1);
  }, []);

  useEffect(() => {
    const t = trackRef.current;
    if (!t) return;
    update();
    t.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      t.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [update]);

  const step = (dir: 1 | -1) => {
    const t = trackRef.current;
    const card = t?.querySelector('li');
    if (!t || !card) return;
    const gap = parseFloat(getComputedStyle(t).columnGap) || 0;
    const by = dir * (card.getBoundingClientRect().width + gap);
    const from = t.scrollLeft;
    t.scrollBy({ left: by, behavior: 'smooth' });
    // Some browsers skip smooth scrolling (reduced motion, background tabs): jump instead if nothing moved.
    window.setTimeout(() => { if (t.scrollLeft === from) t.scrollBy({ left: by }); }, 350);
  };

  // Mouse drag to scroll (touch already scrolls natively).
  const onDown = (e: ReactPointerEvent) => {
    if (e.pointerType !== 'mouse' || e.button !== 0 || !trackRef.current) return;
    drag.current = { down: true, moved: false, x: e.clientX, left: trackRef.current.scrollLeft };
  };
  const onMove = (e: ReactPointerEvent) => {
    const d = drag.current;
    const t = trackRef.current;
    if (!d.down || !t) return;
    const dx = e.clientX - d.x;
    if (!d.moved && Math.abs(dx) > 6) { d.moved = true; t.classList.add('dragging'); }
    if (d.moved) t.scrollLeft = d.left - dx;
  };
  const onUp = () => {
    drag.current.down = false;
    trackRef.current?.classList.remove('dragging');
  };

  return (
    <div className="evc">
      <ol
        ref={trackRef}
        className="evc-track"
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerLeave={onUp}
        // A drag should not also open the card it started on.
        onClickCapture={(e) => { if (drag.current.moved) { e.preventDefault(); e.stopPropagation(); drag.current.moved = false; } }}
        onDragStart={(e) => e.preventDefault()}
      >
        {items.map((it, i) => (
          <li key={it.id} className="evc-item">
            <Media image={it.image} href={it.href} cursor="View" eager className="evc-photo" sizes="(max-width: 700px) 78vw, 290px">
              <span className="evc-n" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
              <span className="sr-only">{it.name}</span>
            </Media>
            <TransitionLink href={it.href} className="evc-cap" tabIndex={-1}>
              <b>{it.name}</b>
            </TransitionLink>
          </li>
        ))}
        <li className="evc-item">
          <TransitionLink href={more.href} className="evc-more" data-cursor="Ask">
            <span className="cap" style={{ color: 'var(--smoke)' }}>{more.label}</span>
            <span className="evc-more-title">{more.title}</span>
            <span className="hcard-end-go" aria-hidden="true"><ArrowRight size={18} /></span>
          </TransitionLink>
        </li>
      </ol>
      <div className="evc-foot">
        <span className="hs-bar" aria-hidden="true"><span style={{ transform: `scaleX(${Math.max(progress, 0.08)})` }} /></span>
        <span className="evc-arrows">
          <button type="button" className="evc-btn" onClick={() => step(-1)} disabled={atStart} aria-label="Previous events"><ArrowLeft size={16} /></button>
          <button type="button" className="evc-btn" onClick={() => step(1)} disabled={atEnd} aria-label="Next events"><ArrowRight size={16} /></button>
        </span>
      </div>
    </div>
  );
}
