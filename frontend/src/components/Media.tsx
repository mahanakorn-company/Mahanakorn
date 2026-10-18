import Image from 'next/image';
import type { CSSProperties, ReactNode } from 'react';
import TransitionLink from './TransitionLink';
import type { Img } from '@/lib/content';

type Props = {
  image: Img;
  /** Empty alt for decorative images that sit behind text. */
  decorative?: boolean;
  className?: string;
  style?: CSSProperties;
  imgStyle?: CSSProperties;
  sizes?: string;
  priority?: boolean;
  /** Load immediately instead of lazily (for photos that slide in sideways, which lazy-loading can miss). */
  eager?: boolean;
  /** Rounded-card "opens up" reveal on scroll. */
  clip?: boolean;
  /** Parallax speed (0–1). */
  speed?: number;
  /** Label for the floating cursor bubble on hover (desktop). */
  cursor?: string;
  href?: string;
  as?: 'div' | 'figure';
  children?: ReactNode;
};

/** Rounded photo card using next/image (responsive AVIF/WebP), optionally a link. */
export default function Media({ image, decorative, className, style, imgStyle, sizes = '(max-width: 900px) 100vw, 50vw', priority, eager, clip, speed, cursor, href, as = 'div', children }: Props) {
  const data: Record<string, string> = {};
  if (clip) data['data-clip'] = '';
  if (speed !== undefined) data['data-speed'] = String(speed);
  if (cursor) data['data-cursor'] = cursor;
  const cn = ['media', className].filter(Boolean).join(' ');
  const img = <Image className="img" src={image.src} alt={decorative ? '' : image.alt} fill sizes={sizes} priority={priority} loading={priority ? undefined : eager ? 'eager' : undefined} style={imgStyle} />;

  if (href) {
    return (
      <TransitionLink href={href} className={cn} style={style} {...data}>
        {img}
        {children}
      </TransitionLink>
    );
  }
  const Tag = as;
  return (
    <Tag className={cn} style={style} {...data}>
      {img}
      {children}
    </Tag>
  );
}

/** Small square thumbnail used in list rows. */
export function Thumb({ image }: { image: Img }) {
  return (
    <span className="tb">
      <Image src={image.src} alt="" fill sizes="60px" style={{ objectFit: 'cover' }} />
    </span>
  );
}
