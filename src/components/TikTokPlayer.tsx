"use client";

import { useState } from "react";
import { type Clip } from "@/lib/videos";
import { VideoCover } from "./VideoCard";

/**
 * Click-to-play TikTok embed. The official player (tiktok.com/player/v1) loads only after the
 * visitor asks for it, so the page stays fast and TikTok sets nothing until then.
 */
export default function TikTokPlayer({ clip }: { clip: Clip }) {
  const [on, setOn] = useState(false);
  if (on) {
    return (
      <iframe
        className="vplayer"
        src={`https://www.tiktok.com/player/v1/${clip.id}?autoplay=1&rel=0&description=0&music_info=0`}
        title={`คลิป TikTok: ${clip.title}`}
        allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
        allowFullScreen
      />
    );
  }
  return (
    <button type="button" className="vplayer-btn" onClick={() => setOn(true)} aria-label={`เล่นคลิป ${clip.title}`}>
      <VideoCover clip={clip} big />
      <span className="vplayer-hint">กดเพื่อเล่นคลิปจาก TikTok</span>
    </button>
  );
}
