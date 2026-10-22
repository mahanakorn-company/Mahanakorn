'use client';

import Image from 'next/image';
import { useId, useState } from 'react';
import type { SwitchItem } from '@/lib/content';

/**
 * Our Menu: the live food counters.
 * Desktop: a large typographic list; hovering, focusing or tapping a dish shows its real photo, description and
 * tags in the panel beside it (photos crossfade). Phones: the same list opens each dish in place.
 * Dishes without a real photo show their Thai name instead of a stand-in image.
 */
export default function MenuCounters({ items, initial = 0 }: { items: SwitchItem[]; initial?: number }) {
  const [active, setActive] = useState(initial);
  const uid = useId();
  const cur = items[active];

  const detail = (it: SwitchItem) => (
    <>
      {it.text && <p className="mc-text">{it.text}</p>}
      {it.tags && (
        <ul className="mc-tags" aria-label="Dietary notes">
          {it.tags.map((t) => <li key={t}>{t}</li>)}
        </ul>
      )}
    </>
  );

  const photo = (it: SwitchItem, sizes: string, eager?: boolean) =>
    it.image ? (
      <Image src={it.image.src} alt={it.image.alt} fill sizes={sizes} loading={eager ? 'eager' : undefined} style={{ objectFit: 'cover' }} />
    ) : (
      <span className="mc-noimg" lang="th">{it.thai}</span>
    );

  return (
    <div className="mc">
      <div>
      <ol className="mc-list" aria-label="Food counters">
        {items.map((it, i) => {
          const on = i === active;
          return (
            <li key={it.name} className={on ? 'on' : undefined}>
              <button
                type="button"
                className="mc-item"
                aria-pressed={on}
                aria-controls={`${uid}-panel ${uid}-inline-${i}`}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
              >
                <span className="mc-n">{String(i + 1).padStart(2, '0')}</span>
                <span className="mc-name">{it.name}</span>
                <span className="mc-th" lang="th">{it.thai}</span>
              </button>
              {/* Phones: the selected dish opens in place */}
              <div className="mc-inline" id={`${uid}-inline-${i}`} aria-hidden={!on}>
                <div>
                  <div className="mc-photo mc-photo-inline">{photo(it, '92vw')}</div>
                  {detail(it)}
                </div>
              </div>
            </li>
          );
        })}
      </ol>
      </div>

      {/* Desktop: the selected dish in a panel beside the list */}
      <div className="mc-panel" id={`${uid}-panel`} aria-live="polite">
        <div className="mc-photo">
          {items.map((it, i) => (
            <div key={it.name} className={`mc-layer${i === active ? ' on' : ''}`} aria-hidden={i !== active}>
              {photo(it, '(max-width: 1240px) 40vw, 500px', true)}
            </div>
          ))}
        </div>
        <div className="mc-caption">
          <span className="mc-caption-name">{cur.name}</span>
          <span className="mc-caption-th" lang="th">{cur.thai}</span>
        </div>
        {detail(cur)}
      </div>
    </div>
  );
}
