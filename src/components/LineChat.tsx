"use client";

import { useEffect, useRef, useState } from "react";

type Msg =
  | { kind: "me"; text: string }
  | { kind: "bot"; text: string }
  | { kind: "doctor"; doc: string; role: string }
  | { kind: "confirm"; doc: string; concern: string; slot: string };

const CONCERNS = [
  { label: "เหงือกบวม เลือดออก", doc: "หมอหยง ทพญ.สุพรรัตน์", role: "ทันตแพทย์เฉพาะทางโรคเหงือก" },
  { label: "ปวดฟัน", doc: "หมอเอ๋ ทพญ.ภัทร์ศรี", role: "ทันตแพทย์รักษารากฟัน" },
  { label: "ขูดหินปูน อุดฟัน", doc: "ทีมทันตแพทย์", role: "ทันตกรรมทั่วไป ใช้ประกันสังคมได้" },
  { label: "ปรึกษาจัดฟัน", doc: "ทันตแพทย์จัดฟัน", role: "ปรึกษาจัดฟันฟรี" },
  { label: "ใส่ฟัน รากเทียม", doc: "ทพ.พชร", role: "ทันตแพทย์ใส่ฟันและรากเทียม" },
];
const SLOTS = ["ส. 7 พ.ย. 11:00", "ส. 7 พ.ย. 14:30", "อา. 8 พ.ย. 10:30", "จ. 9 พ.ย. 17:00"];
const WELCOME: Msg = { kind: "bot", text: "สวัสดีค่ะ Dental Care @วังหิน\nกดเมนูด้านล่าง หรือพิมพ์คำถามมาได้ตลอด 24 ชม." };

export function ClinicAvatar({ size = 36 }: { size?: number }) {
  // The clinic's own profile picture, as patients see it on LINE and Facebook.
  // eslint-disable-next-line @next/next/no-img-element
  return <img src="/clinic-logo.png" width={size} height={size} alt="" style={{ borderRadius: "50%", background: "#fff", flex: "0 0 auto" }} />;
}

export default function LineChat({ onClose }: { onClose?: () => void }) {
  const [log, setLog] = useState<Msg[]>([WELCOME]);
  const [chips, setChips] = useState<"none" | "concern" | "confirm" | "again">("none");
  const [pending, setPending] = useState<{ doc: string; concern: string; slot?: string } | null>(null);
  const scroller = useRef<HTMLDivElement>(null);

  useEffect(() => { scroller.current?.scrollTo({ top: scroller.current.scrollHeight }); }, [log, chips]);

  const add = (...m: Msg[]) => setLog((l) => [...l, ...m]);

  const startBooking = () => {
    add({ kind: "me", text: "จองคิว" }, { kind: "bot", text: "มีอาการหรืออยากทำเรื่องไหนคะ" });
    setChips("concern");
  };
  const pickConcern = (c: (typeof CONCERNS)[number]) => {
    add({ kind: "me", text: c.label }, { kind: "bot", text: `เรื่องนี้${c.doc}ดูแลโดยตรง เลือกเวลาได้เลยค่ะ` }, { kind: "doctor", doc: c.doc, role: c.role });
    setPending({ doc: c.doc, concern: c.label });
    setChips("none");
  };
  const pickSlot = (slot: string) => {
    if (!pending) return;
    add({ kind: "me", text: slot }, { kind: "confirm", doc: pending.doc, concern: pending.concern, slot });
    setPending({ ...pending, slot });
    setChips("confirm");
  };
  const confirm = () => {
    add({ kind: "me", text: "ยืนยันนัด" }, { kind: "bot", text: "ยืนยันแล้วค่ะ เลขนัด WH-1107-03\nจะส่งข้อความเตือนก่อนวันนัด 1 วัน\nถ้าใช้สิทธิประกันสังคม นำบัตรประชาชนมาด้วยนะคะ" });
    setChips("again");
  };
  const changeSlot = () => {
    if (!pending) return;
    add({ kind: "me", text: "เปลี่ยนเวลา" }, { kind: "doctor", doc: pending.doc, role: "เลือกเวลาใหม่" });
    setChips("none");
  };
  const ask = (q: string, a: string) => add({ kind: "me", text: q }, { kind: "bot", text: a });

  return (
    <div className="line-phone">
      <div className="line-head">
        <ClinicAvatar />
        <div className="line-head-text">
          <div className="h-display line-name">Dental Care @วังหิน</div>
          <div className="line-sub">ตัวอย่างบอท LINE OA จองคิว</div>
        </div>
        {onClose && (
          <button type="button" className="line-close" aria-label="ปิดตัวอย่าง" onClick={onClose}>
            ×
          </button>
        )}
      </div>

      <div className="line-chat" ref={scroller} aria-live="polite">
        {log.map((m, i) => {
          if (m.kind === "me" || m.kind === "bot") return <div key={i} className={`bubble ${m.kind}`}>{m.text}</div>;
          if (m.kind === "doctor")
            return (
              <div key={i} className="line-card">
                <div className="line-card-head">
                  <div className="line-card-role">{m.role}</div>
                  <div className="h-display line-card-doc">{m.doc}</div>
                </div>
                <div className="line-card-body">
                  <div className="line-card-note">เวลาว่างที่ใกล้ที่สุด (ตัวอย่าง)</div>
                  {SLOTS.map((s) => (
                    <button key={s} type="button" className="slot" onClick={() => pickSlot(s)}>{s}</button>
                  ))}
                </div>
              </div>
            );
          return (
            <div key={i} className="line-card pad">
              <div className="h-display line-card-doc dark">ตรวจรายละเอียดนัด</div>
              <dl className="line-dl">
                <dt>เรื่อง</dt><dd>{m.concern}</dd>
                <dt>หมอ</dt><dd>{m.doc}</dd>
                <dt>เวลา</dt><dd><b>{m.slot}</b></dd>
                <dt>ที่</dt><dd>ตรงข้ามโลตัสวังหิน</dd>
              </dl>
            </div>
          );
        })}
      </div>

      {chips !== "none" && (
        <div className="line-chips">
          {chips === "concern" && CONCERNS.map((c) => (
            <button key={c.label} type="button" className="chip-line" onClick={() => pickConcern(c)}>{c.label}</button>
          ))}
          {chips === "confirm" && (
            <>
              <button type="button" className="chip-line solid" onClick={confirm}>ยืนยันนัด</button>
              <button type="button" className="chip-line" onClick={changeSlot}>เปลี่ยนเวลา</button>
            </>
          )}
          {chips === "again" && <button type="button" className="chip-line" onClick={startBooking}>จองคิวอีกครั้ง</button>}
        </div>
      )}

      <nav className="line-menu" aria-label="เมนูของคลินิก">
        <button type="button" className="menu-main" onClick={startBooking}>จองคิว</button>
        <button type="button" onClick={() => ask("ราคาและโปรฯ", "จัดฟัน จ่ายครั้งแรก 999 บาท ผ่อนกับคลินิก 0%\nเลเซอร์ตัดแต่งเหงือก 1 ซี่ 2,500 บาท, 2 ซี่ 4,000 บาท, 3–8 ซี่ 4,999 บาท\nงานอื่นหมอแจ้งราคาก่อนทำทุกครั้ง")}>ราคาและโปรฯ</button>
        <button type="button" onClick={() => ask("ประกันสังคม", "ขูดหินปูน อุดฟัน ถอนฟัน ใช้สิทธิได้ค่ะ\nนำบัตรประชาชนมาใบเดียว คลินิกตรวจสิทธิให้ก่อน ไม่ต้องสำรองจ่ายในส่วนที่เบิกได้")}>ประกันสังคม</button>
        <button type="button" onClick={() => ask("การเดินทาง", "ซอยลาดพร้าววังหิน 79 ตรงข้ามโลตัสวังหิน\nเปิดทุกวัน 10:00–19:00 น.")}>การเดินทาง</button>
        <button type="button" onClick={() => ask("เลื่อน/ยกเลิกนัด", "ยังไม่พบนัดของคุณในระบบค่ะ ถ้าจองทางโทรศัพท์ไว้ พิมพ์ชื่อ-นามสกุลมาได้ เจ้าหน้าที่จะตรวจให้")}>เลื่อน/ยกเลิกนัด</button>
      </nav>
    </div>
  );
}
