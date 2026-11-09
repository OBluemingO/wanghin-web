export function LineIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <rect width="24" height="24" rx="6" fill="#06C755" />
      <path d="M12 5.5c-4 0-7 2.4-7 5.4 0 2.7 2.4 4.9 5.6 5.3l-.4 1.9c-.1.4.3.7.6.5l3.3-2.4c2.7-.6 4.9-2.7 4.9-5.3 0-3-3-5.4-7-5.4z" fill="#FFFFFF" />
    </svg>
  );
}

/**
 * The clinic's mark: its original logo (a molar cradled by an open hand inside an oval ring, with a small
 * base line), redrawn as clean vectors over a trace of the old orange artwork and recoloured for the new
 * palette. Tooth and ring take `fg`; the hand is cut from the background with an `fg` outline, as the
 * original hand is white on orange. The wrist leaves through the ring and the edge of the icon.
 */
export const MARK_TOOTH = "M18.2 10.5C20.4 9.9 22.6 10.4 24.4 11.2C26.4 10.2 28.6 9.9 30.6 10.6C32.8 11.4 33.9 13.4 33.9 16.2C33.9 19.6 32.6 22.4 32.1 25.4C31.8 27.8 32.3 30.4 31.6 32.8C30.9 35.2 29.6 37.6 27.6 37.7C26.4 37.7 26.2 36.4 26.2 35L26.1 30.6C26 28.6 25.2 26.8 24 26.8C22.8 26.8 22 28.6 21.9 30.6L22 35C22 36.4 21.6 37.8 20.4 37.6C18.4 37.3 17 35 16.4 32.6C15.8 30.2 16.6 27 16.2 24.4C15.8 21.6 14.4 19.2 14.4 15.8C14.4 12.8 16 10.9 18.2 10.5Z";
export const MARK_HAND = "M16.6 17.4C17.6 19.6 19.6 21.4 22.2 22C25 22.6 28.4 22 30.8 22.2C33.4 22.6 36 24.8 39.4 26.4C41.8 27.5 44.4 28.3 48.5 29V24.9C45 24.4 42 23.6 39.6 22.4C36.4 20.4 33.6 17.6 30.4 17.2C27.6 16.8 24.6 17 22.6 17.1C21.6 17.2 21.6 18.3 22.5 18.5C23.8 18.7 25 18.6 25.8 19.1C26.2 19.6 25.6 20 24.8 20.1C22.6 20.4 20.4 19.6 18.6 18.3C17.9 17.8 17.4 17.1 16.9 17C16.6 16.9 16.5 17.2 16.6 17.4Z";

export function BrandMark({ size = 40, bg = "#B4500A", fg = "#FFFFFF", label }: { size?: number; bg?: string; fg?: string; label?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" role={label ? "img" : undefined} aria-label={label} aria-hidden={label ? undefined : true}>
      <rect width="48" height="48" rx="12" fill={bg} />
      <ellipse cx="23.8" cy="24" rx="14.7" ry="18.8" fill="none" stroke={fg} strokeWidth="1.1" />
      <path d={MARK_TOOTH} fill={fg} />
      <rect x="21.6" y="39.7" width="4.8" height="0.8" rx="0.4" fill={fg} />
      <path d={MARK_HAND} fill={bg} stroke={fg} strokeWidth="0.8" strokeLinejoin="round" />
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
