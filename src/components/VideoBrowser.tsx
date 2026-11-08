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

  // Only topics with clips on the site, counted from the clips actually shown here.
  const present = topics
    .map((t) => ({ name: t.name, count: clips.filter((c) => c.topic === t.name).length }))
    .filter((t) => t.count > 0)
    .sort((a, b) => b.count - a.count);

  return (
    <>
      <div className="vb-bar">
        <div role="group" aria-label="เลือกหัวข้อ" className="vb-chips">
          {[{ name: ALL, count: clips.length }, ...present].map((t) => (
            <button key={t.name} type="button" aria-pressed={topic === t.name} className="vb-chip" onClick={() => setTopic(t.name)}>
              {t.name} <span>{t.count}</span>
            </button>
          ))}
        </div>
        <div role="group" aria-label="เรียงตาม" className="vb-sort">
          <button type="button" aria-pressed={sort === "new"} onClick={() => setSort("new")}>ล่าสุด</button>
          <button type="button" aria-pressed={sort === "top"} onClick={() => setSort("top")}>ยอดนิยม</button>
        </div>
      </div>
      <div className="vgrid">
        {shown.map((c) => (
          <VideoCard key={c.slug} clip={c} />
        ))}
      </div>
    </>
  );
}
