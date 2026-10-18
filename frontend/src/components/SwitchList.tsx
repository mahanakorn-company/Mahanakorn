'use client';

import Image from 'next/image';
import { useId, useState } from 'react';
import type { SwitchItem } from '@/lib/content';
import { PillLink } from './Pill';

type Props = {
  items: SwitchItem[];
  label: string;
  hint?: string;
  initial?: number;
  small?: boolean;
  panelHeight?: number;
  link?: { href: string; label: string };
};

/**
 * Giant list where hovering, focusing or tapping an item shows its photo and details in the side panel.
 * Items are real toggle buttons (keyboard and screen-reader friendly); the panel is announced politely.
 */
export default function SwitchList({ items, label, hint, initial = 0, small, panelHeight = 420, link }: Props) {
  const [active, setActive] = useState(initial);
  const panelId = useId();
  const cur = items[active];

  return (
    <div className="switch">
      <div className="switch-list" role="group" aria-label={label}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, marginBottom: 14 }}>
          <span className="br">{label}</span>
          {hint && <span className="br">{hint}</span>}
        </div>
        {items.map((it, i) => (
          <button
            key={it.name}
            type="button"
            className={`mi${small ? ' sm' : ''}`}
            aria-pressed={i === active}
            aria-controls={panelId}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            onClick={() => setActive(i)}
          >
            {it.name}
          </button>
        ))}
      </div>

      <div className="switch-panel" id={panelId} aria-live="polite">
        <div className="media" style={{ height: panelHeight }}>
          {cur.image ? (
            <Image key={cur.image.src} className="img fade-in" src={cur.image.src} alt={cur.image.alt} fill sizes="(max-width: 900px) 100vw, 40vw" />
          ) : (
            <div className="ph-box">
              <span className="cap">Photo needed</span>
              <span style={{ fontSize: 14 }}>{cur.shot}</span>
            </div>
          )}
          {cur.thai && (
            <span className="th" style={{ position: 'absolute', left: 14, top: 14, background: '#fff', color: 'var(--ink)', borderRadius: 6, padding: '4px 12px', fontSize: 16, zIndex: 2 }}>
              {cur.thai}
            </span>
          )}
        </div>
        <span className="cap mut">{cur.meta ?? cur.name}</span>
        {cur.text && <p style={{ lineHeight: 1.6, fontSize: 16 }}>{cur.text}</p>}
        {cur.list && (
          <ul className="panel-list">
            {cur.list.map((x) => <li key={x}>{x}</li>)}
          </ul>
        )}
        {cur.tags && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {cur.tags.map((t) => <span key={t} className="tag">{t}</span>)}
          </div>
        )}
        {link && <PillLink href={link.href} variant="dk" style={{ alignSelf: 'flex-start', marginTop: 8 }}>{link.label}</PillLink>}
      </div>
    </div>
  );
}
