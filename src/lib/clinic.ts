export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://wanghin-web.vercel.app";
/** Demo mode: proposal banner + noindex. Set NEXT_PUBLIC_DEMO=0 when the clinic adopts the site. */
export const DEMO = process.env.NEXT_PUBLIC_DEMO !== "0";

export const clinic = {
  name: "Dental Care @Wanghin",
  nameTh: "เดนทัลแคร์ แอท วังหิน",
  since: 2016,
  phone: "098-882-4785",
  phoneE164: "+66988824785",
  line: "@dentalcarewanghin",
  facebook: "https://www.facebook.com/dentalcarewanghin/",
  address: "ซอยลาดพร้าววังหิน 79 ตรงข้ามโลตัสวังหิน",
  district: "ลาดพร้าว",
  city: "กรุงเทพมหานคร",
  postalCode: "10230",
  hours: "ทุกวัน 10:00–19:00 น.",
};

export type Doctor = { nick: string; full: string; role: string; photo?: string };
export const doctors: Doctor[] = [
  { nick: "หมอหยง", full: "ทพญ.สุพรรัตน์ สกุลศักดิ์ศรี", role: "โรคเหงือก", photo: "https://www.dentalcareatwanghin.com/images/ready-template/crop-1730644978703.jpg" },
  { nick: "หมอพริ้ม", full: "ทพญ.ภัทริกา โพธิทัต", role: "โรคเหงือก", photo: "https://www.dentalcareatwanghin.com/images/ready-template/crop-1730645575360.jpg" },
  { nick: "หมอเอ๋", full: "ทพญ.ภัทร์ศรี อัสดรมิ่งมิตร", role: "รักษารากฟัน", photo: "https://www.dentalcareatwanghin.com/images/ready-template/crop-1730645116500.jpg" },
  { nick: "ทพ.พชร", full: "ทพ.พชร อภิธนังศิริ", role: "ใส่ฟันและรากเทียม", photo: "https://www.dentalcareatwanghin.com/images/ready-template/crop-1730645226375.jpg" },
  { nick: "หมอไน้ซ์", full: "[ชื่อเต็ม]", role: "อุดฟันเพื่อความสวยงาม", photo: "https://www.dentalcareatwanghin.com/images/ready-template/crop-1730645616034.jpg" },
];

export type Service = { part: string; items: string; price: string; who: string; dot: string; featured?: boolean };
export const services: Service[] = [
  { part: "เหงือก", items: "รักษาโรคเหงือก ผ่าตัดเหงือก ปลูกเหงือก ตัดแต่งเหงือกด้วยเลเซอร์", price: "เลเซอร์ 2,500 บาท", who: "หมอหยง หมอพริ้ม", dot: "#F2CBD4", featured: true },
  { part: "ตัวฟัน", items: "ขูดหินปูน อุดฟัน อุดฟันเพื่อความสวยงาม ปิดช่องฟัน ฟอกสีฟัน", price: "ใช้ประกันสังคมได้", who: "ทีมทันตแพทย์ หมอไน้ซ์", dot: "#C9CFCC" },
  { part: "รากฟัน", items: "รักษารากฟัน ฟันผุลึกถึงโพรงประสาท หนองปลายราก", price: "สอบถามตามเคส", who: "หมอเอ๋", dot: "#E9D8BF" },
  { part: "ฟันที่หายไป", items: "ฟันปลอมถอดได้ สะพานฟัน ครอบฟัน รากเทียม", price: "สอบถามตามเคส", who: "ทพ.พชร", dot: "#B8445F" },
  { part: "การเรียงฟัน", items: "จัดฟัน แก้ฟันซ้อนเก ฟันยื่น สบฟันไม่ดี", price: "เริ่มจ่าย 999 บาท", who: "ผ่อนกับคลินิก 0%", dot: "#3B1E2A" },
  { part: "ฟันเด็ก", items: "ทันตกรรมเด็ก เคลือบฟลูออไรด์ ถอนฟันน้ำนม", price: "สอบถามตามเคส", who: "ทีมทันตแพทย์", dot: "#9FC5B6" },
];

export const reviews = [
  { quote: "คุณหมอหยงใจดี มือเบามาก แจ้งราคาก่อนทำทุกขั้นตอน", by: "Pirunrat P." },
  { quote: "คุณหมอคอยถามตลอดว่ารู้สึกอย่างไร และติดตามผลหลังรักษาตลอด", by: "Joy S." },
  { quote: "แต่ก่อนแปรงฟันเลือดออกทุกวัน ตอนนี้ไม่มีแล้ว กลิ่นปากก็หาย", by: "เกียรติศักดิ์ พ." },
];

type Kind = "incisor" | "canine" | "premolar" | "molar";
const TYPES: { name: string; kind: Kind }[] = [
  { name: "ฟันตัดซี่กลาง", kind: "incisor" },
  { name: "ฟันตัดซี่ข้าง", kind: "incisor" },
  { name: "ฟันเขี้ยว", kind: "canine" },
  { name: "ฟันกรามน้อยซี่ที่ 1", kind: "premolar" },
  { name: "ฟันกรามน้อยซี่ที่ 2", kind: "premolar" },
  { name: "ฟันกรามซี่ที่ 1", kind: "molar" },
  { name: "ฟันกรามซี่ที่ 2", kind: "molar" },
];

export type Tooth = { id: number; name: string; kind: Kind; upper: boolean; fdi: number; side: "ขวา" | "ซ้าย" };
/** Same order as the Blender export: lower right, lower left, upper right, upper left. */
export const teeth: Tooth[] = (() => {
  const out: Tooth[] = [];
  for (const upper of [false, true]) {
    for (const dir of [-1, 1]) {
      TYPES.forEach((t, i) => {
        const q = upper ? (dir < 0 ? 1 : 2) : dir < 0 ? 4 : 3;
        out.push({ id: out.length + 1, name: t.name, kind: t.kind, upper, fdi: q * 10 + i + 1, side: dir < 0 ? "ขวา" : "ซ้าย" });
      });
    }
  }
  return out;
})();

export const GUM_LOWER = 29;
export const GUM_UPPER = 30;

const CARE: Record<Kind, { care: string; who: string }> = {
  incisor: { care: "อุดฟันเพื่อความสวยงาม ปิดช่องฟัน ฟอกสีฟัน", who: "ดูแลโดยหมอไน้ซ์ ถ้ายิ้มแล้วเห็นเหงือกเยอะ หมอหยงตัดแต่งด้วยเลเซอร์ได้" },
  canine: { care: "จัดฟัน ขูดหินปูน อุดฟัน", who: "จัดฟันเริ่มจ่าย 999 บาท ผ่อนกับคลินิก 0%" },
  premolar: { care: "อุดฟัน ขูดหินปูน รักษารากฟัน", who: "ทีมทันตแพทย์ และหมอเอ๋สำหรับงานรากฟัน ใช้สิทธิประกันสังคมได้" },
  molar: { care: "รักษารากฟัน ครอบฟัน รากเทียม", who: "หมอเอ๋ดูแลรากฟัน ทพ.พชรดูแลครอบฟันและรากเทียม" },
};

export type Info = { kicker: string; title: string; care: string; who: string; cta: string };
export function infoFor(sel: number): Info {
  if (!sel) {
    return { kicker: "เลือกฟันจากโมเดล", title: "ชี้ที่โมเดลให้ปากเปิด แล้วกดฟันซี่ที่มีปัญหา", care: "ระบบจะบอกว่าซี่นั้นมักต้องรักษาแบบไหน และหมอคนไหนดูแลโดยตรง", who: "ลากเพื่อหมุนดูรอบตัว กดที่เหงือกได้ด้วย", cta: "จองคิวทาง LINE" };
  }
  if (sel === GUM_LOWER || sel === GUM_UPPER) {
    return { kicker: "เหงือก" + (sel === GUM_UPPER ? "บน" : "ล่าง"), title: "หมอหยง และหมอพริ้ม ทันตแพทย์เฉพาะทางโรคเหงือก", care: "รักษาโรคเหงือก ผ่าตัดและปลูกเหงือก ตัดแต่งเหงือกด้วยเลเซอร์", who: "เลเซอร์ 1 ซี่ 2,500 บาท, 2 ซี่ 4,000 บาท, 3–8 ซี่ 4,999 บาท", cta: "จองกับหมอเหงือกทาง LINE" };
  }
  const t = teeth[sel - 1];
  const pos = (t.upper ? "บน" : "ล่าง") + t.side;
  return { kicker: `ซี่ ${t.fdi} ${pos}`, title: `${t.name} ${pos}`, care: CARE[t.kind].care, who: CARE[t.kind].who, cta: `จองคิวเรื่องซี่ ${t.fdi} ทาง LINE` };
}
