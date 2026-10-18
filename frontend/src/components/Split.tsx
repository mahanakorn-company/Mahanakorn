import type { CSSProperties, ReactNode } from 'react';

type Tag = 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'blockquote';
type Props = {
  as?: Tag;
  /** Markup: `|` = line break, `*word*` = italic serif, `**word**` = large italic serif. */
  text: string;
  id?: string;
  className?: string;
  style?: CSSProperties;
  /** Animate with the page intro (above the fold) instead of on scroll. */
  intro?: boolean;
};

const TOKEN = /\*\*(.+?)\*\*|\*(.+?)\*|([^*]+)/g;

function plain(text: string) {
  return text.replace(/\*/g, '').replace(/\s*\|\s*/g, ' ').trim();
}

/**
 * Heading split into word spans for the rise-in animation. Screen readers get the sentence once
 * (sr-only copy) and the animated words are hidden from them, so headings are no longer read word by word.
 */
export default function Split({ as = 'h2', text, id, className, style, intro }: Props) {
  const Tag = as;
  const lines = text.split('|');
  let key = 0;
  const out: ReactNode[] = [];
  lines.forEach((line, li) => {
    if (li > 0) out.push(<br key={`br${key++}`} />);
    const tokens = Array.from(line.matchAll(TOKEN));
    tokens.forEach((m) => {
      const big = m[1] !== undefined;
      const italic = big || m[2] !== undefined;
      const raw = m[1] ?? m[2] ?? m[3] ?? '';
      const lead = /^\s/.test(raw);
      const trail = /\s$/.test(raw);
      const words = raw.trim().split(/\s+/).filter(Boolean);
      if (lead) out.push(' ');
      words.forEach((w, wi) => {
        out.push(
          <span className="w" key={`w${key++}`}>
            <span className={italic ? (big ? 's big' : 's') : undefined}>{w}</span>
          </span>
        );
        if (wi < words.length - 1) out.push(' ');
      });
      if (trail) out.push(' ');
    });
  });

  const dataProps = intro ? { 'data-intro-words': '' } : { 'data-split': '' };
  return (
    <Tag id={id} className={className} style={style} {...dataProps}>
      <span className="sr-only">{plain(text)}</span>
      <span aria-hidden="true">{out}</span>
    </Tag>
  );
}
