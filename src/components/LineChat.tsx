"use client";

import { useEffect, useRef, useState } from "react";

type Booking = { doc: string; concern: string; slot: Slot; code: string };
type Slot = { label: string; key: string };
type Msg =
  | { kind: "me"; text: string }
  | { kind: "bot"; text: string }
  | { kind: "doctor"; doc: string; role: string; slots: Slot[] }
  | { kind: "confirm"; doc: string; concern: string; slot: Slot }
  | { kind: "booked"; booking: Booking; title: string };
type Chips = "none" | "concern" | "confirm" | "again" | "manage" | "cancel";

const CONCERNS = [
  { label: "เหงือกบวม เลือดออก", doc: "หมอหยง ทพญ.สุพรรัตน์", role: "ทันตแพทย์เฉพาะทางโรคเหงือก" },
  { label: "ปวดฟัน", doc: "หมอเอ๋ ทพญ.ภัทร์ศรี", role: "ทันตแพทย์รักษารากฟัน" },
  { label: "ขูดหินปูน อุดฟัน", doc: "ทีมทันตแพทย์", role: "ทันตกรรมทั่วไป ใช้ประกันสังคมได้" },
  { label: "ปรึกษาจัดฟัน", doc: "ทันตแพทย์จัดฟัน", role: "ปรึกษาเรื่องจัดฟัน" },
  { label: "ใส่ฟัน รากเทียม", doc: "ทพ.พชร", role: "ทันตแพทย์ใส่ฟันและรากเทียม" },
];
const PHONE = "098-882-4785";
const WELCOME: Msg = { kind: "bot", text: "สวัสดีค่ะ Dental Care @วังหิน\nกดเมนูด้านล่าง หรือพิมพ์คำถามมาได้ตลอด 24 ชม." };
const ANSWERS = {
  price: "ราคาตามที่คลินิกประกาศ (บาท)\n• ขูดหินปูน 700–1,600 ต่อครั้ง\n• อุดฟันสีเงิน ด้านแรก 700–900\n• เลเซอร์ตัดแต่งเหงือก 1 ซี่ 2,500 / 2 ซี่ 4,000 / 3–8 ซี่ 4,999\n• จัดฟัน จ่ายครั้งแรก 999 ผ่อนกับคลินิก 0%\nงานอื่นหมอแจ้งราคาก่อนทำทุกครั้งค่ะ",
  sso: "ขูดหินปูน อุดฟัน ถอนฟัน ใช้สิทธิประกันสังคมได้ค่ะ\nนำบัตรประชาชนมาใบเดียว คลินิกตรวจสิทธิให้ก่อน ไม่ต้องสำรองจ่ายในส่วนที่เบิกได้",
  travel: "ซอยลาดพร้าววังหิน 79 ตรงข้ามโลตัสวังหิน\nเปิดทุกวัน 10:00–19:00 น.\nโทร " + PHONE,
  urgent: `ถ้าปวดมาก บวมมาก หรือเลือดไม่หยุด โทรหาคลินิกได้ทันทีที่ ${PHONE} ค่ะ\nเจ้าหน้าที่จะหาคิวด่วนให้`,
  handoff: "ขอส่งต่อคำถามนี้ให้เจ้าหน้าที่นะคะ จะตอบกลับในเวลาทำการ 10:00–19:00 น.\nถ้าต้องการจองคิว กดปุ่ม \"จองคิว\" ด้านล่างได้เลยค่ะ",
};

const DAYS = ["อา.", "จ.", "อ.", "พ.", "พฤ.", "ศ.", "ส."];
const MONTHS = ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."];
const TIMES = ["10:30", "13:00", "15:30", "17:30"];

/** The next four free slots (example data) from now, clinic time (Bangkok), open daily 10:00–19:00. */
function nextSlots(seed: number, exclude?: string): Slot[] {
  const bkk = new Date(Date.now() + (7 * 60 + new Date().getTimezoneOffset()) * 60000);
  const out: Slot[] = [];
  for (let d = 0; out.length < 4 && d < 14; d++) {
    const day = new Date(bkk.getFullYear(), bkk.getMonth(), bkk.getDate() + d);
    // pretend two of the four times are already taken, varying by doctor and day
    TIMES.filter((_, i) => (i + d + seed) % 2 === 0).forEach((t) => {
      const [h, m] = t.split(":").map(Number);
      if (d === 0 && h * 60 + m < bkk.getHours() * 60 + bkk.getMinutes() + 120) return; // at least 2 h ahead
      const key = `${String(day.getDate()).padStart(2, "0")}${String(day.getMonth() + 1).padStart(2, "0")}-${t}`;
      if (out.length < 4 && key !== exclude) out.push({ key, label: `${DAYS[day.getDay()]} ${day.getDate()} ${MONTHS[day.getMonth()]} ${t}` });
    });
  }
  return out;
}

export function ClinicAvatar({ size = 36 }: { size?: number }) {
  // The clinic's own profile picture, as patients see it on LINE and Facebook.
  // eslint-disable-next-line @next/next/no-img-element
  return <img src="/clinic-logo.png" width={size} height={size} alt="" style={{ borderRadius: "50%", background: "#fff", flex: "0 0 auto" }} />;
}

export default function LineChat({ onClose }: { onClose?: () => void }) {
  const [log, setLog] = useState<Msg[]>([WELCOME]);
  const [chips, setChips] = useState<Chips>("none");
  const [pending, setPending] = useState<{ doc: string; concern: string; slot?: Slot; rebook?: boolean } | null>(null);
  const [picked, setPicked] = useState<Record<number, string>>({}); // doctor-card index -> chosen slot key
  const [booking, setBooking] = useState<Booking | null>(null);
  const [text, setText] = useState("");
  const scroller = useRef<HTMLDivElement>(null);
  const seq = useRef(3);

  useEffect(() => {
    const el = scroller.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [log, chips]);

  const add = (...m: Msg[]) => setLog((l) => [...l, ...m]);
  // only the newest time card can still be used; older ones are history
  const lastDoctor = log.reduce((n, m, i) => (m.kind === "doctor" ? i : n), -1);

  const startBooking = (said = "จองคิว") => {
    setPending(null);
    add({ kind: "me", text: said }, { kind: "bot", text: booking ? `ตอนนี้มีนัดอยู่แล้ว ${booking.slot.label} นะคะ ถ้าจะจองเพิ่ม เลือกเรื่องได้เลยค่ะ` : "มีอาการหรืออยากทำเรื่องไหนคะ" });
    setChips("concern");
  };
  const pickConcern = (c: (typeof CONCERNS)[number]) => {
    const i = CONCERNS.indexOf(c);
    add(
      { kind: "me", text: c.label },
      { kind: "bot", text: `เรื่องนี้${c.doc}ดูแลโดยตรง เลือกเวลาได้เลยค่ะ` },
      { kind: "doctor", doc: c.doc, role: c.role, slots: nextSlots(i) },
    );
    setPending({ doc: c.doc, concern: c.label });
    setChips("none");
  };
  const pickSlot = (cardIndex: number, slot: Slot) => {
    if (!pending || cardIndex !== lastDoctor || picked[cardIndex]) return;
    setPicked((p) => ({ ...p, [cardIndex]: slot.key }));
    add({ kind: "me", text: slot.label }, { kind: "confirm", doc: pending.doc, concern: pending.concern, slot });
    setPending({ ...pending, slot });
    setChips("confirm");
  };
  const confirm = () => {
    if (!pending?.slot) return;
    const code = `WH-${pending.slot.key.slice(0, 4)}-${String(seq.current++).padStart(2, "0")}`;
    const b: Booking = { doc: pending.doc, concern: pending.concern, slot: pending.slot, code };
    setBooking(b);
    add(
      { kind: "me", text: "ยืนยันนัด" },
      { kind: "booked", booking: b, title: pending.rebook ? "เลื่อนนัดเรียบร้อย" : "จองคิวเรียบร้อย" },
      { kind: "bot", text: "จะส่งข้อความเตือนก่อนวันนัด 1 วันค่ะ\nถ้าใช้สิทธิประกันสังคม นำบัตรประชาชนมาด้วยนะคะ" },
    );
    setPending(null);
    setChips("again");
  };
  const changeSlot = () => {
    if (!pending) return;
    add({ kind: "me", text: "เปลี่ยนเวลา" }, { kind: "doctor", doc: pending.doc, role: "เลือกเวลาใหม่", slots: nextSlots(1, pending.slot?.key) });
    setPending({ ...pending, slot: undefined });
    setChips("none");
  };
  const manage = (said = "เลื่อน/ยกเลิกนัด") => {
    setPending(null);
    if (!booking) {
      add({ kind: "me", text: said }, { kind: "bot", text: `ยังไม่พบนัดที่จองผ่าน LINE ค่ะ ถ้าจองทางโทรศัพท์ไว้ พิมพ์ชื่อ-นามสกุลมาได้ เจ้าหน้าที่จะตรวจให้\nหรือโทร ${PHONE}` });
      setChips("none");
      return;
    }
    add({ kind: "me", text: said }, { kind: "booked", booking, title: "นัดของคุณ" }, { kind: "bot", text: "ต้องการเลื่อนหรือยกเลิกนัดนี้คะ" });
    setChips("manage");
  };
  const reschedule = () => {
    if (!booking) return;
    add({ kind: "me", text: "เลื่อนนัด" }, { kind: "doctor", doc: booking.doc, role: "เลือกเวลาใหม่", slots: nextSlots(2, booking.slot.key) });
    setPending({ doc: booking.doc, concern: booking.concern, rebook: true });
    setChips("none");
  };
  const cancel = () => {
    add({ kind: "me", text: "ยกเลิกนัด" }, { kind: "bot", text: "ยืนยันยกเลิกนัดนี้ใช่ไหมคะ" });
    setChips("cancel");
  };
  const cancelYes = () => {
    if (!booking) return;
    add({ kind: "me", text: "ยืนยันยกเลิก" }, { kind: "bot", text: `ยกเลิกนัด ${booking.code} แล้วค่ะ\nถ้าสะดวกวันไหน กด "จองคิว" ใหม่ได้ตลอดเลยนะคะ` });
    setBooking(null);
    setChips("again");
  };
  const ask = (q: string, a: string) => {
    add({ kind: "me", text: q }, { kind: "bot", text: a });
    if (chips === "confirm" || chips === "cancel") return; // keep a half-finished step open
    setChips("none");
  };

  // free text: route a typed message the way the real bot's keyword rules would
  const send = () => {
    const q = text.trim();
    if (!q) return;
    setText("");
    if (/ปวดมาก|บวมมาก|เลือดไม่หยุด|ฉุกเฉิน|ด่วน/.test(q)) return ask(q, ANSWERS.urgent);
    if (/เลื่อน|ยกเลิก/.test(q)) return manage(q);
    if (/จอง|นัด|คิว/.test(q)) return startBooking(q);
    if (/ประกัน|สิทธิ/.test(q)) return ask(q, ANSWERS.sso);
    if (/ราคา|เท่าไร|เท่าไหร่|โปร|ผ่อน|บาท/.test(q)) return ask(q, ANSWERS.price);
    if (/ที่อยู่|ทาง|แผนที่|อยู่ไหน|เปิด|ปิด|กี่โมง|เวลา|โทร|เบอร์/.test(q)) return ask(q, ANSWERS.travel);
    ask(q, ANSWERS.handoff);
  };

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
          if (m.kind === "doctor") {
            const live = i === lastDoctor && !picked[i] && !!pending;
            return (
              <div key={i} className={`line-card${live ? "" : " used"}`}>
                <div className="line-card-head">
                  <div className="line-card-role">{m.role}</div>
                  <div className="h-display line-card-doc">{m.doc}</div>
                </div>
                <div className="line-card-body">
                  <div className="line-card-note">เวลาว่างที่ใกล้ที่สุด (ตัวอย่าง)</div>
                  {m.slots.map((s) => (
                    <button
                      key={s.key}
                      type="button"
                      className={`slot${picked[i] === s.key ? " is-picked" : ""}`}
                      disabled={!live}
                      aria-pressed={picked[i] === s.key}
                      onClick={() => pickSlot(i, s)}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
            );
          }
          if (m.kind === "booked")
            return (
              <div key={i} className="line-card pad">
                <div className="line-card-ok">{m.title}</div>
                <div className="h-display line-card-doc dark">เลขนัด {m.booking.code}</div>
                <dl className="line-dl">
                  <dt>เรื่อง</dt><dd>{m.booking.concern}</dd>
                  <dt>หมอ</dt><dd>{m.booking.doc}</dd>
                  <dt>เวลา</dt><dd><b>{m.booking.slot.label}</b></dd>
                  <dt>ที่</dt><dd>ตรงข้ามโลตัสวังหิน</dd>
                </dl>
              </div>
            );
          return (
            <div key={i} className="line-card pad">
              <div className="h-display line-card-doc dark">ตรวจรายละเอียดนัด</div>
              <dl className="line-dl">
                <dt>เรื่อง</dt><dd>{m.concern}</dd>
                <dt>หมอ</dt><dd>{m.doc}</dd>
                <dt>เวลา</dt><dd><b>{m.slot.label}</b></dd>
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
          {chips === "manage" && (
            <>
              <button type="button" className="chip-line" onClick={reschedule}>เลื่อนนัด</button>
              <button type="button" className="chip-line" onClick={cancel}>ยกเลิกนัด</button>
            </>
          )}
          {chips === "cancel" && (
            <>
              <button type="button" className="chip-line solid" onClick={cancelYes}>ยืนยันยกเลิก</button>
              <button type="button" className="chip-line" onClick={() => { add({ kind: "me", text: "ไม่ยกเลิก" }, { kind: "bot", text: "เก็บนัดไว้ตามเดิมค่ะ" }); setChips("none"); }}>ไม่ยกเลิก</button>
            </>
          )}
          {chips === "again" && <button type="button" className="chip-line" onClick={() => startBooking("จองคิวอีกครั้ง")}>จองคิวอีกครั้ง</button>}
        </div>
      )}

      <form className="line-input" onSubmit={(e) => { e.preventDefault(); send(); }}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="พิมพ์ข้อความ เช่น ขูดหินปูนราคาเท่าไร"
          aria-label="พิมพ์ข้อความถึงคลินิก"
          enterKeyHint="send"
        />
        <button type="submit" aria-label="ส่งข้อความ" disabled={!text.trim()}>
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M3.4 20.4 21 12 3.4 3.6l.1 6.5L15 12 3.5 13.9z" fill="currentColor" /></svg>
        </button>
      </form>

      <nav className="line-menu" aria-label="เมนูของคลินิก">
        <button type="button" className="menu-main" onClick={() => startBooking()}>จองคิว</button>
        <button type="button" onClick={() => ask("ราคาและโปรฯ", ANSWERS.price)}>ราคาและโปรฯ</button>
        <button type="button" onClick={() => ask("ประกันสังคม", ANSWERS.sso)}>ประกันสังคม</button>
        <button type="button" onClick={() => ask("การเดินทาง", ANSWERS.travel)}>การเดินทาง</button>
        <button type="button" onClick={() => manage()}>เลื่อน/ยกเลิกนัด</button>
      </nav>
    </div>
  );
}
