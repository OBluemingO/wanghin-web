export function LineIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <rect width="24" height="24" rx="6" fill="#06C755" />
      <path d="M12 5.5c-4 0-7 2.4-7 5.4 0 2.7 2.4 4.9 5.6 5.3l-.4 1.9c-.1.4.3.7.6.5l3.3-2.4c2.7-.6 4.9-2.7 4.9-5.3 0-3-3-5.4-7-5.4z" fill="#FFFFFF" />
    </svg>
  );
}

/**
 * The clinic's mark, redrawn from its original logo (a molar held by a caring hand inside an oval ring)
 * in the new palette: white tooth, soft-pink hand, on gum pink. Simple enough to read at favicon size.
 */
export function BrandMark({ size = 40, bg = "#B8445F", fg = "#FFFFFF", accent = "#F2CBD4", label }: { size?: number; bg?: string; fg?: string; accent?: string; label?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" role={label ? "img" : undefined} aria-label={label} aria-hidden={label ? undefined : true}>
      <rect width="48" height="48" rx="12" fill={bg} />
      <ellipse cx="24" cy="24.5" rx="17.2" ry="19" fill="none" stroke={accent} strokeWidth="1.3" opacity="0.55" />
      <path d="M13.6 17.4C13.6 11.2 18.8 9.6 24 12.3 29.2 9.6 34.4 11.2 34.4 17.4 34.4 22.4 32.4 24.6 31.8 28.6L30.3 37.2C29.9 39.8 27.2 39.8 26.8 37.2L25.5 30.4C25.2 28.9 22.8 28.9 22.5 30.4L21.2 37.2C20.8 39.8 18.1 39.8 17.7 37.2L16.2 28.6C15.6 24.6 13.6 22.4 13.6 17.4Z" fill={fg} />
      {/* the caring hand from the original logo: fingers and thumb cup the crown, the wrist runs into the ring */}
      <path fill={accent} stroke={bg} strokeWidth="1.3" strokeLinejoin="round" paintOrder="stroke" d="M13.2 15.6C15.2 18.8 19.4 21.6 24.6 22.6C29.2 23.4 33 24.8 36.2 27.2C37.8 28.6 39 30.2 39.8 31.9A17.2 19 0 0 0 41.1 27.3C39.2 25.8 37.2 23.8 35.4 21.4C33.2 19.8 31 18.6 28.6 18C26 17.3 23.2 16.1 21 15.4C19.7 15 19 16.3 19.9 17.1C21.6 18.5 23.8 19.5 26 20.1C23.8 20.3 21.2 19.8 18.9 18.8C17.3 18.1 15.9 16.7 15.2 15.3C14.7 14.3 13.4 14.4 13.2 15.6Z" />
    </svg>
  );
}

const SCALLOP = "M0 0 Q60 56 120 0 Q180 56 240 0 Q300 56 360 0 Q420 56 480 0 Q540 56 600 0 Q660 56 720 0 Q780 56 840 0 Q900 56 960 0 Q1020 56 1080 0 Q1140 56 1200 0 Q1260 56 1320 0 Q1380 56 1440 0 L1440 80 L0 80 Z";

/** The brand's gumline: the scalloped edge gum makes around teeth. Used only between page sections. */
export function GumLine({ fill, bg = "transparent", height = 56 }: { fill: string; bg?: string; height?: number }) {
  return (
    <svg viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true" style={{ display: "block", width: "100%", height, background: bg }}>
      <path d={SCALLOP} fill={fill} />
    </svg>
  );
}
