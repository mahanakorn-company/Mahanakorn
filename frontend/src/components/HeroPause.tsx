'use client';

import { useState } from 'react';
import { Pause, Play } from './Icons';

/** Pauses the hero's slow background zoom (moving content longer than 5s needs a pause control). */
export default function HeroPause() {
  const [paused, setPaused] = useState(false);
  return (
    <button
      type="button"
      className="round-btn"
      aria-pressed={paused}
      aria-label={paused ? 'Play background motion' : 'Pause background motion'}
      onClick={() => {
        const next = !paused;
        setPaused(next);
        window.dispatchEvent(new CustomEvent('mk:hero-pause', { detail: next }));
      }}
    >
      {paused ? <Play /> : <Pause />}
    </button>
  );
}
