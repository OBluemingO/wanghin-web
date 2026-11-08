"use client";

import { useMemo, useState } from "react";
import { type Clip, type Topic } from "@/lib/videos";
import { VideoCard } from "./VideoCard";

const ALL = "ทั้งหมด";

export default function VideoBrowser({ clips, topics }: { clips: Clip[]; topics: Topic[] }) {
  const [topic, setTopic] = useState(ALL);
  const [sort, setSort] = useState<"new" | "top">("new");

  const shown = useMemo(() => {
    const list = topic === ALL ? clips.slice() : clips.filter((c) => c.topic === topic);
    return list.sort((a, b) => (sort === "top" ? b.likes - a.likes : b.date.localeCompare(a.date)));
  }, [clips, topic, sort]);

  // Only offer topics that have at least one clip on the site.
  const present = topics.filter((t) => clips.some((c) => c.topic === t.name));

  return (
    <>
      <div className="vb-bar">
        <div role="group" aria-label="เลือกหัวข้อ" className="vb-chips">
          {[{ name: ALL, count: clips.length }, ...present].map((t) => (
            <button key={t.name} type="button" aria-pressed={topic === t.name} className="vb-chip" onClick={() => setTopic(t.name)}>
              {t.name} <span>{t.name === ALL ? clips.length : t.count}</span>
            </button>
          ))}
        </div>
        <div role="group" aria-label="เรียงตาม" className="vb-sort">
          <button type="button" aria-pressed={sort === "new"} onClick={() => setSort("new")}>ล่าสุด</button>
          <button type="button" aria-pressed={sort === "top"} onClick={() => setSort("top")}>ยอดนิยม</button>
        </div>
      </div>
      {topic !== ALL && (
        <p className="muted small vb-note">
          แสดง {shown.length} คลิปบนเว็บ จากทั้งหมด {present.find((t) => t.name === topic)?.count} คลิปในหัวข้อนี้บน TikTok
        </p>
      )}
      <div className="vgrid">
        {shown.map((c) => (
          <VideoCard key={c.slug} clip={c} />
        ))}
      </div>
    </>
  );
}
