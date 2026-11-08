"use client";

import { useCallback, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { infoFor, GUM_LOWER } from "@/lib/clinic";
import LineChat from "./LineChat";
import { LineIcon } from "./Icons";

const JawViewer = dynamic(() => import("./JawViewer"), { ssr: false, loading: () => <div className="jaw-canvas" aria-hidden="true" /> });

export default function Hero() {
  const [sel, setSel] = useState(0);
  const [faceToken, setFaceToken] = useState(0);
  const [openToken, setOpenToken] = useState(0);
  const [demo, setDemo] = useState(false);
  const info = infoFor(sel);

  const quick = (id: number) => {
    setSel(id);
    setFaceToken((n) => n + 1);
    if (id !== GUM_LOWER) setOpenToken((n) => n + 1);
  };
  const onSelect = useCallback((id: number) => setSel(id), []);

  useEffect(() => {
    if (!demo) return;
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setDemo(false);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [demo]);

  useEffect(() => {
    const open = (e: Event) => {
      const a = (e.target as HTMLElement).closest("[data-line-demo]");
      if (a) { e.preventDefault(); setDemo(true); }
    };
    document.addEventListener("click", open);
    return () => document.removeEventListener("click", open);
  }, []);

  return (
    <section id="top" className="hero">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <p className="eyebrow-line">คลินิกทันตกรรมย่านลาดพร้าว–วังหิน เปิดมาตั้งแต่ปี 2016</p>
          <h1 className="h-display hero-title">ฟันจะดีได้<br />เหงือกต้องดีก่อน</h1>
          <p className="hero-lead">ทันตแพทย์เฉพาะทางด้านเหงือก รากฟัน และรากเทียม อยู่ในคลินิกเดียว ใช้สิทธิประกันสังคมได้โดยไม่ต้องสำรองจ่าย</p>

          <div className="info-card" aria-live="polite">
            <p className="info-kicker">{info.kicker}</p>
            <p className="h-display info-title">{info.title}</p>
            <p className="info-care">{info.care}</p>
            <p className="info-who">{info.who}</p>
            <a href="#line" data-line-demo className="btn-white">
              <LineIcon />
              {info.cta}
            </a>
          </div>
        </div>

        <div className="hero-model">
          <div className="model-disc" aria-hidden="true" />
          <JawViewer selected={sel} onSelect={onSelect} faceToken={faceToken} openToken={openToken} label="โมเดลฟันทั้งปาก 3 มิติ ลากเพื่อหมุน ชี้เพื่อให้ปากเปิด แล้วกดเลือกฟันแต่ละซี่" />
          <p className="model-hint">ลากเพื่อหมุนรอบตัว ชี้ให้ปากเปิด แล้วกดฟันซี่ที่มีปัญหา</p>
          <div className="quick">
            <button type="button" className="chip" onClick={() => quick(15)}>ฟันหน้า</button>
            <button type="button" className="chip" onClick={() => quick(13)}>ฟันกราม</button>
            <button type="button" className="chip" onClick={() => quick(GUM_LOWER)}>เหงือก</button>
          </div>
        </div>
      </div>

      {demo && (
        <div className="modal" onClick={(e) => e.target === e.currentTarget && setDemo(false)}>
          <div role="dialog" aria-modal="true" aria-label="ตัวอย่างบอท LINE จองคิว">
            <LineChat onClose={() => setDemo(false)} />
          </div>
        </div>
      )}
    </section>
  );
}
