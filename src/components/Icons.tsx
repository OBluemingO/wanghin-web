export function LineIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <rect width="24" height="24" rx="6" fill="#06C755" />
      <path d="M12 5.5c-4 0-7 2.4-7 5.4 0 2.7 2.4 4.9 5.6 5.3l-.4 1.9c-.1.4.3.7.6.5l3.3-2.4c2.7-.6 4.9-2.7 4.9-5.3 0-3-3-5.4-7-5.4z" fill="#FFFFFF" />
    </svg>
  );
}

export function BrandMark({ size = 40, bg = "#B8445F", fg = "#FFFFFF", label }: { size?: number; bg?: string; fg?: string; label?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" role={label ? "img" : undefined} aria-label={label} aria-hidden={label ? undefined : true}>
      <rect width="48" height="48" rx="12" fill={bg} />
      <path d="M9 39 L9 25 Q16.5 13 24 25 Q31.5 13 39 25 L39 39 Q39 41 37 41 L11 41 Q9 41 9 39 Z" fill={fg} />
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
