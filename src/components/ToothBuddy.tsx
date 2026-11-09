"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

/**
 * "ฟันน้อย": a shy little 3D-rendered molar that floats in the corner as a guide.
 * The body is a pre-rendered image; dot eyes, blush and mouth are DOM so they can blink, glance
 * and blush without any WebGL cost. Come close with the pointer and it gets shy: it looks away,
 * blushes harder and leans back. Tapping it opens the LINE booking demo.
 */

// what it says (shyly) when each home-page section reaches the middle of the screen
const SECTION_LINES: Record<string, string> = {
  top: "สวัสดี… ลองกดฟันซี่ที่ปวดในโมเดลดูนะ",
  services: "เอ่อ… ใช้สิทธิประกันสังคมได้นะ ไม่ต้องสำรองจ่าย",
  doctors: "หมอที่นี่เฉพาะทางทั้งเหงือก รากฟัน รากเทียมเลยนะ…",
  videos: "คลิปหมอหยงดูแล้วเข้าใจง่ายมาก… ลองดูสิ",
  line: "จองคิวทาง LINE ได้ 24 ชม. หรือ… กดที่เราก็ได้นะ",
  reviews: "อ่านรีวิวจากคนไข้จริงก่อนก็ได้นะ…",
  visit: "คลินิกอยู่ตรงข้ามโลตัสวังหินเลย… ไม่หลงแน่",
};
const PAGE_LINES: [string, string][] = [
  ["/videos/", "ดูคลิปจบแล้ว… กดที่เราเพื่อจองคิวได้นะ"],
  ["/videos", "เลือกคลิปที่อยากดูได้เลย… หมอหยงเล่าเองทุกเรื่อง"],
];
const SHY_LINES = ["อ๊ะ… มองอยู่เหรอ…", "เขินจัง… กดเราเพื่อจองคิวก็ได้นะ", "อย่าจ้องนานสิ… >///<"];
const HIDE_ON = ["/proposal"];
const STORE = "toothbuddy-hidden";

export default function ToothBuddy() {
  const path = usePathname() ?? "/";
  const [shown, setShown] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [line, setLine] = useState("");
  const [bubble, setBubble] = useState(false);
  const [jump, setJump] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const shyCount = useRef(0);

  const say = (text: string, ms = 5200) => {
    setLine(text);
    setBubble(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setBubble(false), ms);
  };
  const sayRef = useRef(say);
  useEffect(() => { sayRef.current = say; });

  // peek in shortly after load, unless the visitor closed it earlier in this visit
  useEffect(() => {
    const t = setTimeout(() => {
      let stored = false;
      try { stored = !!sessionStorage.getItem(STORE); } catch {}
      if (stored) setHidden(true); else setShown(true);
    }, 900);
    return () => { clearTimeout(t); clearTimeout(timer.current); };
  }, []);

  // section-aware lines on the home page, a page line elsewhere
  useEffect(() => {
    if (hidden || !shown) return;
    const pageLine = PAGE_LINES.find(([p]) => path.startsWith(p))?.[1];
    if (pageLine) {
      const t = setTimeout(() => sayRef.current(pageLine, 6000), 400);
      return () => clearTimeout(t);
    }
    const els = Object.keys(SECTION_LINES).map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (!els.length) return;
    let last = "";
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting && e.target.id !== last) { last = e.target.id; sayRef.current(SECTION_LINES[last]); }
      }
    }, { rootMargin: "-45% 0px -45% 0px" });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [path, hidden, shown]);

  // reacts when someone picks a tooth on the 3D jaw
  useEffect(() => {
    const onSay = (e: Event) => { sayRef.current((e as CustomEvent<string>).detail, 6000); setJump((n) => n + 1); };
    window.addEventListener("buddy-say", onSay);
    return () => window.removeEventListener("buddy-say", onSay);
  }, []);

  // eyes glance toward the pointer from afar; up close it gets shy and looks away (mouse only)
  useEffect(() => {
    if (hidden || !window.matchMedia("(pointer: fine)").matches) return;
    let raf = 0, px = 0, py = 0, wasShy = false;
    const onMove = (e: PointerEvent) => {
      px = e.clientX; py = e.clientY;
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const el = rootRef.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const dx = px - (r.left + r.width / 2), dy = py - (r.top + r.height * 0.5);
        const d = Math.hypot(dx, dy) || 1;
        const shy = d < r.width * 1.7;
        const k = shy ? -1 : Math.min(1, d / 300);
        el.style.setProperty("--lx", ((dx / d) * k * 3).toFixed(2) + "px");
        el.style.setProperty("--ly", (shy ? 2.5 : (dy / d) * k * 2.4).toFixed(2) + "px");
        el.style.setProperty("--lean", shy ? (dx > 0 ? "-7deg" : "7deg") : "0deg");
        el.classList.toggle("is-shy", shy);
        if (shy && !wasShy) sayRef.current(SHY_LINES[shyCount.current++ % SHY_LINES.length], 2800);
        wasShy = shy;
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => { window.removeEventListener("pointermove", onMove); cancelAnimationFrame(raf); };
  }, [hidden]);

  if (hidden || HIDE_ON.some((p) => path.startsWith(p))) return null;

  const close = () => {
    setHidden(true);
    try { sessionStorage.setItem(STORE, "1"); } catch {}
  };

  return (
    <div ref={rootRef} className={`buddy${shown ? " is-in" : ""}`}>
      <div className={`buddy-bubble${bubble ? " is-on" : ""}`} role="status" aria-live="polite">
        {line}
      </div>
      <button
        type="button"
        className="buddy-body"
        data-line-demo
        aria-label="ฟันน้อย ผู้ช่วยของคลินิก กดเพื่อลองจองคิวทาง LINE"
        onClick={() => setTimeout(() => setJump((n) => n + 1))}
      >
        <span className="buddy-lean">
          <span key={jump} className={`buddy-hop${jump ? " is-happy" : ""}`}>
            {/* eslint-disable-next-line @next/next/no-img-element -- tiny pre-sized sprite, no optimisation needed */}
            <img src="/mascot/tooth.webp" alt="" width={320} height={320} draggable={false} />
            <span className="buddy-cheek l" />
            <span className="buddy-cheek r" />
            <span className="buddy-eye l" />
            <span className="buddy-eye r" />
            <span className="buddy-mouth" />
          </span>
        </span>
      </button>
      <button type="button" className="buddy-x" onClick={close} aria-label="ซ่อนฟันน้อย">×</button>
    </div>
  );
}
