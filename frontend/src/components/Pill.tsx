import type { ReactNode } from 'react';
import TransitionLink from './TransitionLink';
import { ArrowRight, External, WhatsApp } from './Icons';

type Variant = 'light' | 'dk' | 'ln' | 'wa';
type Common = { variant?: Variant; small?: boolean; icon?: ReactNode; className?: string; children: ReactNode; style?: React.CSSProperties };

function cls(variant: Variant, small?: boolean, extra?: string) {
  return ['pill', variant !== 'light' ? variant : '', small ? 'sm' : '', extra || ''].filter(Boolean).join(' ');
}

/** Pill link. Internal paths use the page transition; http(s) links open in a new tab. */
export function PillLink({ href, variant = 'light', small, icon, className, children, style, ariaLabel }: Common & { href: string; ariaLabel?: string }) {
  const external = /^https?:\/\//.test(href);
  const ic = icon ?? (external ? (variant === 'wa' ? <WhatsApp /> : <External />) : <ArrowRight />);
  const body = (
    <>
      {children}
      <span className="ic">{ic}</span>
    </>
  );
  if (external) {
    return (
      <a href={href} className={cls(variant, small, className)} style={style} target="_blank" rel="noopener noreferrer" aria-label={ariaLabel}>
        {body}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  }
  return (
    <TransitionLink href={href} className={cls(variant, small, className)} style={style} aria-label={ariaLabel}>
      {body}
    </TransitionLink>
  );
}

/** Pill-shaped visual label used inside a larger link (e.g. a photo card), so links are never nested. */
export function PillLabel({ variant = 'light', small, icon, className, children, style }: Common) {
  return (
    <span className={cls(variant, small, className)} style={style}>
      {children}
      <span className="ic">{icon ?? <ArrowRight />}</span>
    </span>
  );
}

export function pillClass(variant: Variant = 'light', small?: boolean, extra?: string) {
  return cls(variant, small, extra);
}
