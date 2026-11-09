import Image from "next/image";
import Link from "next/link";
import { type Clip, fmt, toneOf } from "@/lib/videos";

function PlayDisc({ size = 40 }: { size?: number }) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 40 40" className="vplay">
      <circle cx="20" cy="20" r="20" fill="#FFFFFF" />
      <path d="M16 12.5 L28 20 L16 27.5 Z" fill="#1F2A3C" />
    </svg>
  );
}

/**
 * A clip's cover. With a saved frame, the photo fills the card and everything on it sits on a
 * solid chip or a dark scrim so it reads over any frame. Without one, the title is the cover.
 */
export function VideoCover({ clip, big = false, sizes = "(max-width: 640px) 50vw, 230px" }: { clip: Clip; big?: boolean; sizes?: string }) {
  if (clip.thumb) {
    return (
      <div className={`vcover photo${big ? " big" : ""}`}>
        <Image src={clip.thumb} alt="" fill sizes={sizes} className="vphoto" />
        {clip.pinned && <span className="vpin">ปักหมุด</span>}
        {clip.duration && <span className="vdur">{clip.duration}</span>}
        <span className="vcover-foot">
          <PlayDisc size={big ? 56 : 40} />
          <span className="vcover-meta">{fmt(clip.likes)} ไลก์</span>
        </span>
      </div>
    );
  }
  return (
    <div className={`vcover tone-${toneOf(clip.topic)}${big ? " big" : ""}`}>
      {clip.pinned && <span className="vpin">ปักหมุด</span>}
      <span className="h-display vcover-title">{clip.title}</span>
      <span className="vcover-foot">
        <PlayDisc size={34} />
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
