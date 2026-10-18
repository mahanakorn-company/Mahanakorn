type IconProps = { size?: number };

export const ArrowRight = ({ size = 12 }: IconProps) => (
  <svg aria-hidden="true" width={size} height={size} viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 6h8M7 3l3 3-3 3" />
  </svg>
);
export const ArrowLeft = ({ size = 12 }: IconProps) => (
  <svg aria-hidden="true" width={size} height={size} viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 6H2M5 3L2 6l3 3" />
  </svg>
);
export const External = ({ size = 12 }: IconProps) => (
  <svg aria-hidden="true" width={size} height={size} viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3.5 8.5l5-5M4.5 3.5h4v4" />
  </svg>
);
export const Restart = ({ size = 12 }: IconProps) => (
  <svg aria-hidden="true" width={size} height={size} viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2.5 6a3.5 3.5 0 1 0 1-2.5M2.5 2v1.5H4" />
  </svg>
);
export const MenuIcon = ({ size = 12 }: IconProps) => (
  <svg aria-hidden="true" width={size} height={size} viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
    <path d="M2 4h8M2 8h8" />
  </svg>
);
export const Close = ({ size = 12 }: IconProps) => (
  <svg aria-hidden="true" width={size} height={size} viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
    <path d="M3 3l6 6M9 3L3 9" />
  </svg>
);
export const Play = ({ size = 12 }: IconProps) => (
  <svg aria-hidden="true" width={size} height={size} viewBox="0 0 14 14" fill="currentColor">
    <path d="M3 1.5v11l9-5.5z" />
  </svg>
);
export const Pause = ({ size = 12 }: IconProps) => (
  <svg aria-hidden="true" width={size} height={size} viewBox="0 0 14 14" fill="currentColor">
    <rect x="2" y="1" width="3.5" height="12" rx="1" />
    <rect x="8.5" y="1" width="3.5" height="12" rx="1" />
  </svg>
);
export const Dot = () => <svg aria-hidden="true" width="8" height="8" viewBox="0 0 8 8" fill="currentColor"><circle cx="4" cy="4" r="4" /></svg>;
export const WhatsApp = ({ size = 13 }: IconProps) => (
  <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.4 8.4 0 0 1-12.4 7.4L3 21l2.1-5.4A8.4 8.4 0 1 1 21 11.5z" />
  </svg>
);
