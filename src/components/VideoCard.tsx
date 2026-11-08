import Link from "next/link";
import { type Clip, fmt, toneOf } from "@/lib/videos";

/** A clip as a typographic cover: TikTok thumbnails expire, so the title is the cover. */
export function VideoCover({ clip, big = false }: { clip: Clip; big?: boolean }) {
  return (
    <div className={`vcover tone-${toneOf(clip.topic)}${big ? " big" : ""}`}>
      {clip.pinned && <span className="vpin">ปักหมุด</span>}
      <span className="h-display vcover-title">{clip.title}</span>
      <span className="vcover-foot">
        <svg aria-hidden="true" width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <circle cx="12" cy="12" r="10" />
          <path d="M10 8.2l5.6 3.8-5.6 3.8z" fill="currentColor" stroke="none" />
        </svg>
        <span className="vcover-meta">
          {fmt(clip.likes)} ไลก์{clip.duration ? ` · ${clip.duration}` : ""}
        </span>
      </span>
      <svg className="vcover-gum" viewBox="0 0 200 24" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 24 L0 10 Q16.7 -4 33.3 10 Q50 -4 66.7 10 Q83.3 -4 100 10 Q116.7 -4 133.3 10 Q150 -4 166.7 10 Q183.3 -4 200 10 L200 24 Z" />
      </svg>
    </div>
  );
}

export function VideoCard({ clip }: { clip: Clip }) {
  return (
    <Link href={`/videos/${clip.slug}`} className="vcard">
      <VideoCover clip={clip} />
      <span className="vcard-topic">{clip.topic}</span>
      <span className="vcard-title">{clip.title}</span>
    </Link>
  );
}
