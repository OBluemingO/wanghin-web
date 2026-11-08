import type { Metadata } from "next";
import Link from "next/link";
import LineChat, { ClinicAvatar } from "@/components/LineChat";
import { BrandMark, GumLine } from "@/components/Icons";
import styles from "./proposal.module.css";

export const metadata: Metadata = {
  title: "ข้อเสนอจาก Phayuphat Trilao",
  description: "อัตลักษณ์แบรนด์ เว็บไซต์ใหม่ LINE OA บอทจองคิว และแผน SEO สำหรับ Dental Care @Wanghin",
  robots: { index: false, follow: false },
};

const palette = [
  { name: "ชมพูเหงือก", hex: "#B8445F", use: "ปุ่มหลัก" },
  { name: "เหงือกอ่อน", hex: "#F2CBD4", use: "พื้นแถบเด่น" },
  { name: "หมึกพลัม", hex: "#3B1E2A", use: "ตัวหนังสือ" },
  { name: "เคลือบฟัน", hex: "#F4F6F5", use: "พื้นหลัง" },
  { name: "เทาสะอาด", hex: "#E7ECEA", use: "ช่องรูปภาพ" },
];

const audit: { ok: boolean; what: string; detail: string }[] = [
  { ok: false, what: "ไม่มีข้อมูลโครงสร้าง (schema)", detail: "Google ไม่รู้เวลาเปิด ที่อยู่ เบอร์ ว่าเป็นคลินิกทันตกรรม" },
  { ok: false, what: "รูป 45 จาก 46 รูปไม่มี alt", detail: "Google ค้นหารูปเคสจัดฟันและเลเซอร์ไม่เจอ" },
  { ok: false, what: "มี H1 ถึง 5 อันในหน้าแรก", detail: "รวม \"หน้าแรก\" และ \"We Specialize In\" หัวข้อหลักไม่ชัด" },
  { ok: false, what: "คำอธิบายหน้าซ้ำกับชื่อหน้า", detail: "ผลค้นหาไม่มีเหตุผลให้คนกดเข้า" },
  { ok: false, what: "URL เป็นตัวเลข เมนูมีคำซ้ำ", detail: "เช่น /17544317/ และเมนู \"รักษาโรคเหงือก\" ซ้ำ 4 ครั้งในชื่อลิงก์เดียว" },
  { ok: false, what: "LINE ID ไม่ตรงกันในแต่ละหน้า", detail: "@cem0540l ในหน้าติดต่อ แต่ @dentalcarewanghin ในหน้าโปรโมชัน" },
  { ok: false, what: "บทความโควิดซ้ำในหลายหน้า", detail: "เนื้อหาเดียวกันอยู่ทั้งหน้าแรก เกี่ยวกับเรา และบริการ" },
  { ok: false, what: "เบอร์โทรกดโทรไม่ได้ โหลด 3.2 วินาที", detail: "jQuery รุ่นปี 2013 ไม่มีลิงก์ tel: บนมือถือ" },
  { ok: true, what: "มี sitemap.xml, canonical, Open Graph", detail: "robots.txt ยังว่างอยู่" },
  { ok: true, what: "มีเนื้อหาที่หมอเขียนเองจำนวนมาก", detail: "เรื่องเหงือกร่นและเลเซอร์ นำมาเรียบเรียงเป็นบทความได้ทันที" },
];

const keywords = ["ทำฟัน ลาดพร้าว", "ทำฟันประกันสังคม ลาดพร้าว", "ขูดหินปูนประกันสังคม", "ตัดเหงือกเลเซอร์ ราคา", "หมอเหงือก กรุงเทพ", "เหงือกร่น รักษา", "จัดฟัน ผ่อน 0%", "รักษารากฟัน วังหิน", "คลินิกทันตกรรม ใกล้โลตัสวังหิน"];


const items: { name: string; what: string; price: number }[] = [
  { name: "อัตลักษณ์แบรนด์", what: "เครื่องหมาย ชุดสี ตัวอักษร ลายขอบเหงือก และน้ำเสียงในการเขียน", price: 3000 },
  { name: "เว็บไซต์ใหม่", what: "หน้าแรก บริการ 6 หน้า ทีมหมอพร้อมรูปจริง รีวิว การเดินทางพร้อมแผนที่ ย้ายเนื้อหาเดิมพร้อม redirect ทุกลิงก์ โหลดเร็วบนมือถือ", price: 15000 },
  { name: "โมเดลฟัน 3 มิติ", what: "ปั้นโมเดลฟันทั้งปาก ชี้แล้วปากเปิด กดได้ทุกซี่และเหงือก หมุนได้รอบตัว บอกว่าซี่นั้นรักษาอะไรและหมอคนไหนดูแล", price: 5000 },
  { name: "หน้าคลิปหมอหยง", what: "รวมคลิป TikTok พร้อมรูปปก แยกตามหัวข้อ คลิปปักหมุด เล่นคลิปในเว็บ และบทความจากคลิป 3 เรื่อง", price: 3000 },
  { name: "LINE OA บอทจองคิว", what: "Rich menu จอง เลื่อน ยกเลิกนัดตามตารางหมอจริง เตือนก่อนวันนัด 1 วัน ตอบคำถามที่หมออนุมัติ 30 เรื่อง ส่งต่อเจ้าหน้าที่เมื่อเร่งด่วน", price: 12000 },
  { name: "SEO ฐานแรก", what: "แก้ 8 จุดจากการตรวจเว็บเดิม ข้อมูลโครงสร้างแบบคลินิกทันตกรรม จัด Google Business Profile ติดตั้ง Search Console และ GA4", price: 4000 },
];
const listTotal = items.reduce((n, it) => n + it.price, 0);
const BUNDLE = 29900;
const CARE = 1500;
const SEO_MONTHLY = 2500;
const baht = (n: number) => n.toLocaleString("en-US");

const addons: { name: string; price: number; unit?: string }[] = [
  { name: "หน้าบริการหรือหน้าโปรโมชันเพิ่ม", price: 1500, unit: "หน้า" },
  { name: "บทความจากคลิปหมอหยงเพิ่ม", price: 800, unit: "เรื่อง" },
  { name: "คำตอบบอท LINE เพิ่ม 10 เรื่อง", price: 1000 },
  { name: "แกลเลอรีเคสก่อน-หลังรักษา", price: 3000 },
  { name: "เว็บภาษาอังกฤษสำหรับคนไข้ต่างชาติ", price: 6000 },
  { name: "ส่งนัดเข้า Google Calendar ของหมอแต่ละท่าน", price: 3000 },
];

const demos: { tag: string; title: string; text: string; href: string; cta: string; line?: boolean }[] = [
  { tag: "หน้าแรก", title: "โมเดลฟัน 3 มิติ", text: "ชี้ที่โมเดลให้ปากเปิด กดฟันแต่ละซี่หรือเหงือก ลากหมุนดูรอบตัว", href: "/", cta: "เปิดหน้าแรก" },
  { tag: "LINE OA", title: "บอทจองคิว", text: "ลองจองคิวตั้งแต่เลือกอาการ เลือกหมอ เลือกเวลา จนได้เลขนัด", href: "#demo", cta: "ลองจองคิว", line: true },
  { tag: "TikTok", title: "คลิปหมอหยง", text: "คลิปจริงจาก @dr.yongka พร้อมรูปปก แยกหัวข้อ และบทความจากคลิป", href: "/videos", cta: "เปิดหน้าคลิป" },
  { tag: "การเดินทาง", title: "แผนที่และนำทาง", text: "แผนที่ในเว็บไม่มีค่าใช้จ่ายรายเดือน กดนำทางด้วย Google Maps ได้ทันที", href: "/#visit", cta: "ดูแผนที่" },
];

export default function Proposal() {
  return (
    <main className={styles.page}>
      <header className={styles.top}>
        <div className={`wrap ${styles.topRow}`}>
          <Link href="/" className="brand" aria-label="กลับไปหน้าเว็บตัวอย่าง">
            <BrandMark />
            <span className="brand-text"><span className="h-display brand-name">Dental Care</span><span className="brand-at">@วังหิน</span></span>
          </Link>
          <Link href="/" className="btn-primary">ดูเว็บตัวอย่าง</Link>
        </div>
        <div className="wrap">
          <p className={styles.kicker}>ข้อเสนอจาก Phayuphat Trilao สำหรับ Dental Care @วังหิน</p>
          <h1 className={`h-display ${styles.h1}`}>ใช้เวลา 6 สัปดาห์<br />ได้เว็บใหม่ บอทจองคิว และฐาน SEO</h1>
          <nav className={styles.toc} aria-label="ส่วนของข้อเสนอ">
            <a href="#demo">เว็บตัวอย่าง</a><a href="#brand">อัตลักษณ์แบรนด์</a><a href="#line-bot">LINE บอท</a><a href="#seo">SEO</a><a href="#scope">ราคาและขอบเขตงาน</a><a href="#changes">เพิ่มหรือปรับงาน</a>
          </nav>
        </div>
      </header>

      <section id="demo" className={`wrap ${styles.section}`}>
        <h2 className={`h-display ${styles.h2}`}>ลองของจริงในเว็บตัวอย่าง</h2>
        <p className="lead narrow">ทุกอย่างในข้อเสนอนี้ทำเป็นเว็บที่ใช้งานได้แล้ว เปิดบนมือถือหรือคอมพิวเตอร์ได้เลย</p>
        <div className={styles.demoGrid}>
          {demos.map((d) => (
            <Link key={d.title} href={d.href} className={styles.demoCard} {...(d.line ? { "data-line-demo": "" } : {})}>
              <span className={styles.demoTag}>{d.tag}</span>
              <span className={`h-display ${styles.demoTitle}`}>{d.title}</span>
              <span className={styles.demoText}>{d.text}</span>
              <span className={styles.demoGo}>{d.cta}</span>
            </Link>
          ))}
        </div>
      </section>

      <section id="brand" className={`wrap ${styles.section}`}>
        <h2 className={`h-display ${styles.h2}`}>อัตลักษณ์แบรนด์</h2>
        <div className={styles.brandGrid}>
          <div className={styles.markCol}>
            <div className={styles.lockup}>
              <BrandMark size={96} label="เครื่องหมาย Dental Care @วังหิน" />
              <div><div className="h-display" style={{ fontSize: 46, fontWeight: 700, lineHeight: 1.05 }}>Dental Care</div><div style={{ fontSize: 26, color: "var(--gum)", fontWeight: 600 }}>@วังหิน</div></div>
            </div>
            <p>เครื่องหมายคือแนวขอบเหงือกที่โอบซี่ฟันสองซี่ไว้ เล่าสิ่งที่คลินิกนี้ต่างจากที่อื่นในภาพเดียว คือหมอเจ้าของเป็นทันตแพทย์เฉพาะทางโรคเหงือก</p>
            <div className={styles.markVariants}>
              <div style={{ background: "#F2CBD4" }}><BrandMark size={60} /></div>
              <div style={{ background: "#3B1E2A" }}><BrandMark size={60} bg="#F2CBD4" fg="#3B1E2A" /></div>
              <div style={{ background: "#F4F6F5" }}><BrandMark size={60} bg="#3B1E2A" /></div>
            </div>
          </div>
          <div>
            <h3 className={`h-display ${styles.h3}`}>สี</h3>
            <div className={styles.palette}>
              {palette.map((c) => (
                <div key={c.hex}>
                  <div className={styles.swatch} style={{ background: c.hex }} />
                  <p className={styles.swName}>{c.name}</p>
                  <p className="muted small">{c.hex} {c.use}</p>
                </div>
              ))}
            </div>
            <p className="muted small" style={{ marginTop: 10 }}>ไม่ใช้ฟ้า-ขาวแบบคลินิกทั่วไป ชมพูเหงือกบนพื้นขาวผ่านเกณฑ์อ่านง่าย 5.2:1 สีเขียว LINE ใช้เฉพาะไอคอน LINE</p>
          </div>
        </div>
        <div className={styles.typeRow}>
          <div className={styles.typeCard}>
            <p className="h-display" style={{ fontSize: "clamp(36px,5vw,60px)", fontWeight: 700, lineHeight: 1.1 }}>ฟันจะดีได้ เหงือกต้องดีก่อน</p>
            <p className="muted small">Anuphan ตัวหนา สำหรับหัวข้อ</p>
            <p style={{ fontSize: 20, marginTop: 12 }}>ยื่นบัตรประชาชนใบเดียว คลินิกตรวจสิทธิประกันสังคมให้ก่อนรักษา</p>
            <p className="muted small">IBM Plex Sans Thai Looped สำหรับเนื้อหา แบบมีหัว คนไข้สูงวัยอ่านง่ายกว่า</p>
          </div>
          <div className={styles.voice}>
            <h3 className={`h-display ${styles.h3}`}>น้ำเสียงในการเขียน</h3>
            <div className={styles.before}><p className="muted small">ข้อความเดิมบนเว็บ</p><p><s>เราพร้อมดูแล Take care สุขภาพฟันและเหงือกของคุณนะค่ะ</s></p></div>
            <div className={styles.after}><p className="muted small">ข้อความใหม่</p><p><b>เคสเหงือกได้หมอเหงือก เคสรากฟันได้หมอรากฟัน ไม่ต้องส่งต่อไปที่อื่น</b></p></div>
          </div>
        </div>
        <div className={styles.gumDemo}>
          <div style={{ height: 32, background: "#fff" }} />
          <GumLine fill="#F2CBD4" bg="#fff" height={56} />
          <div style={{ height: 24, background: "#F2CBD4" }} />
        </div>
        <p className="muted small" style={{ marginTop: 8 }}>ลายเส้นขอบเหงือก หยักตามแนวเหงือกจริงรอบซี่ฟัน ใช้เป็นรอยต่อระหว่างส่วนของหน้าเท่านั้น</p>
      </section>

      <section id="line-bot" className={`wrap ${styles.section}`}>
        <h2 className={`h-display ${styles.h2}`}>LINE OA บอทจองคิวและตอบคำถาม</h2>
        <p className="lead narrow">ลองกดเมนูในโทรศัพท์ด้านซ้ายได้เลย ด้านขวาคือตัวอย่างคำถามที่คนไข้พิมพ์เป็นภาษาพูด</p>
        <div className={styles.phones}>
          <div className={styles.phoneWrap}><LineChat /></div>
          <div className={`line-phone static ${styles.faqPhone}`}>
            <div className="line-head"><ClinicAvatar /><div className="line-head-text"><div className="h-display line-name">Dental Care @วังหิน</div><div className="line-sub">ถามได้ด้วยภาษาพูด ไม่ต้องกดเมนู</div></div></div>
            <div className="line-chat">
              <div className="bubble me">ใช้ประกันสังคมขูดหินปูนได้มั้ยคะ</div>
              <div className="bubble bot">ได้ค่ะ นำบัตรประชาชนมาใบเดียว คลินิกตรวจสิทธิให้ก่อน ไม่ต้องสำรองจ่ายในส่วนที่เบิกได้</div>
              <div className="bubble me">ตัดเหงือกเลเซอร์ 2 ซี่เท่าไหร่</div>
              <div className="bubble bot">2 ซี่ 4,000 บาทค่ะ ถ้า 3–8 ซี่ราคาเหมา 4,999 บาท ทำโดยหมอหยง ทันตแพทย์เฉพาะทางเหงือก</div>
              <div className="bubble me">จัดฟันผ่อนได้ไหม</div>
              <div className="bubble bot">{"ผ่อนกับคลินิก 0% ได้ค่ะ\n3,000 บาท 2 งวดแรก แล้ว 1,500 × 26 งวด\n5,000 บาท 2 งวดแรก แล้ว 1,500 × 22 งวด\n10,000 บาท งวดแรก แล้ว 1,500 × 20 งวด"}</div>
              <div className="bubble me">ปวดฟันมากเลย แก้มบวมด้วย</div>
              <div className="bubble bot">อาการปวดและบวมควรให้หมอดูเร็วที่สุดค่ะ พรุ่งนี้ 10:00 ยังมีคิวกับหมอเอ๋ ทันตแพทย์รักษารากฟัน</div>
              <div className={styles.handoff}>ส่งเรื่องให้เจ้าหน้าที่แล้ว จะโทรกลับเมื่อคลินิกเปิด 10:00</div>
            </div>
          </div>
        </div>

        <h3 className={`h-display ${styles.h3}`} style={{ marginTop: 48 }}>บอททำงานอย่างไร</h3>
        <div className={styles.flow}>
          <div className={styles.node}>คนไข้ทัก LINE</div>
          <div className={styles.arrow} aria-hidden="true" />
          <div className={`${styles.node} ${styles.nodeDark}`}><b>บอทอ่านข้อความ</b><br />แยกว่าต้องการอะไร</div>
          <div className={styles.arrow} aria-hidden="true" />
          <ul className={styles.branches}>
            <li><span className={styles.node}><b>จอง เลื่อน ยกเลิกนัด</b></span><span className={styles.arrowSm} aria-hidden="true" /><span className={`${styles.node} ${styles.nodeSoft}`}>ตารางหมอจริง เตือนก่อน 1 วัน</span></li>
            <li><span className={styles.node}><b>ถามราคา สิทธิ เวลาเปิด</b></span><span className={styles.arrowSm} aria-hidden="true" /><span className={`${styles.node} ${styles.nodeSoft}`}>คลังคำตอบที่หมออนุมัติแล้ว</span></li>
            <li><span className={`${styles.node} ${styles.nodeAlert}`}><b>ปวด บวม เลือดไม่หยุด</b> หรือถามนอกเรื่อง</span><span className={styles.arrowSm} aria-hidden="true" /><span className={`${styles.node} ${styles.nodeGum}`}>ส่งต่อเจ้าหน้าที่ทันที</span></li>
          </ul>
        </div>
        <div className={styles.three}>
          <div><h4 className="h-display">บอทตอบเองได้</h4><p>ใช้สิทธิประกันสังคมได้ไหม<br />ราคาเลเซอร์เหงือก โปรจัดฟัน 999<br />เวลาเปิด การเดินทาง<br />เตรียมตัวก่อนมาทำฟัน<br />ดูแลตัวเองหลังถอนฟัน<br />เลื่อนหรือยกเลิกนัด</p></div>
          <div><h4 className="h-display">ต้องได้จากคลินิกก่อนเริ่ม</h4><p>ตารางลงตรวจของหมอแต่ละคน<br />ราคางานที่ให้บอทบอกได้<br />คำตอบที่หมอตรวจและอนุมัติ<br />คนรับเรื่องที่บอทส่งต่อ<br />LINE OA เดิมของคลินิก 1 บัญชี</p></div>
          <div><h4 className="h-display">บอทจะไม่ทำ</h4><p>ไม่วินิจฉัยอาการแทนหมอ<br />ไม่ยืนยันราคาเคสที่ต้องตรวจก่อน<br />ไม่เก็บข้อมูลสุขภาพเกินที่ใช้นัด<br />อาการเร่งด่วน ส่งต่อคนทันที</p></div>
        </div>
      </section>

      <section id="seo" className={`wrap ${styles.section}`}>
        <h2 className={`h-display ${styles.h2}`}>SEO: เว็บเดิมมีพื้นฐาน แต่ Google อ่านไม่ออกว่าคลินิกทำอะไร</h2>
        <p className="muted">ตรวจจากเว็บจริง dentalcareatwanghin.com วันที่ 6 พ.ย. 2026</p>
        <div className={styles.seoGrid}>
          <div>
            <h3 className={`h-display ${styles.h3}`}>สถานะตอนนี้</h3>
            <ul className={styles.audit}>
              {audit.map((a) => (
                <li key={a.what}>
                  <span className={a.ok ? styles.badgeOk : styles.badgeFix}>{a.ok ? "ใช้ได้" : "ต้องแก้"}</span>
                  <div><p className={styles.auditWhat}>{a.what}</p><p className="muted small">{a.detail}</p></div>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.plan}>
            <h3 className={`h-display ${styles.h3}`}>แผนที่จะทำ</h3>
            <div><h4 className="h-display">ฐานเทคนิค ทำพร้อมเว็บใหม่</h4><p>H1 เดียวต่อหน้า alt ทุกรูป ข้อมูลโครงสร้างแบบ Dentist URL ที่อ่านออก และ redirect 301 จากลิงก์เดิมทุกหน้า เว็บตัวอย่างนี้มีข้อมูลโครงสร้างแล้ว</p></div>
            <div><h4 className="h-display">Google Maps และรีวิว</h4><p>จัด Google Business Profile ให้ครบ ใช้ชื่อ ที่อยู่ เบอร์ และ LINE ID ชุดเดียวกันทุกช่องทาง บอทส่งลิงก์ขอรีวิวหลังคนไข้มาตามนัด</p></div>
            <div><h4 className="h-display">หน้าบริการ 6 หน้า + บทความ 4 เรื่อง</h4><p>หนึ่งหน้าต่อหนึ่งเรื่องที่คนค้น เรียบเรียงจากที่หมอหยงเขียนไว้ ให้หมอตรวจก่อนเผยแพร่</p></div>
            <div><h4 className="h-display">วัดผล</h4><p>Search Console และ GA4 นับการกดจองทาง LINE และการกดโทร รายงานทุกเดือน</p></div>
          </div>
        </div>
        <h3 className={`h-display ${styles.h3}`} style={{ marginTop: 32 }}>คำค้นที่จะทำหน้ารองรับ</h3>
        <p className="muted small">ชุดตั้งต้นจากบริการจริงของคลินิก ยืนยันปริมาณการค้นด้วย Search Console หลังเปิดเว็บ 4 สัปดาห์</p>
        <div className={styles.keywords}>{keywords.map((k) => <span key={k}>{k}</span>)}</div>
      </section>

      <section id="scope" className={styles.scope}>
        <div className={`wrap ${styles.section}`}>
          <h2 className={`h-display ${styles.h2}`}>ขอบเขตงานและราคา</h2>
          <p className={styles.scopeLead}>ราคาเป็นเงินบาท จ่ายครั้งเดียว ทุกงานเป็นของคลินิกทั้งหมด รวมโค้ดและบัญชีต่างๆ</p>

          <div className={styles.priceTable} role="table" aria-label="ราคางานแต่ละส่วน">
            {items.map((it) => (
              <div key={it.name} role="row" className={styles.priceRow}>
                <div role="cell">
                  <p className={`h-display ${styles.priceName}`}>{it.name}</p>
                  <p className={styles.priceWhat}>{it.what}</p>
                </div>
                <p role="cell" className={`h-display ${styles.priceAmt}`}>{baht(it.price)}</p>
              </div>
            ))}
            <div role="row" className={`${styles.priceRow} ${styles.priceSum}`}>
              <p role="cell">ราคาปกติแยกรายการ</p>
              <p role="cell" className={`h-display ${styles.priceAmt}`}><s>{baht(listTotal)}</s></p>
            </div>
          </div>

          <div className={styles.bundle}>
            <div>
              <p className={styles.bundleKicker}>ราคาพิเศษสำหรับคลินิกแรกที่ร่วมงานกับเรา</p>
              <p className={`h-display ${styles.bundlePrice}`}>{baht(BUNDLE)}</p>
              <p>ได้ครบทุกส่วน ลดจากราคาแยกรายการ {baht(listTotal - BUNDLE)} บาท</p>
            </div>
            <ul>
              <li>แลกกับการให้เราใช้งานนี้เป็นผลงานตัวอย่าง พร้อมรีวิวสั้นๆ จากคลินิกหลังเปิดใช้งาน</li>
              <li>แบ่งจ่าย 3 งวด: 30% เมื่อเริ่มงาน 40% เมื่อส่งเว็บให้ทดสอบ 30% เมื่อเปิดใช้งานจริง</li>
              <li>ไม่คิดค่าดูแลระบบ 2 เดือนแรก แก้งานได้ 2 รอบต่อส่วน ยืนราคา 30 วัน</li>
            </ul>
          </div>

          <h3 className={`h-display ${styles.subH}`}>ค่าใช้จ่ายรายเดือนหลังเปิดใช้งาน</h3>
          <div className={styles.cards}>
            <div>
              <h3 className="h-display">ดูแลระบบ</h3>
              <ul><li>โฮสต์เว็บและเซิร์ฟเวอร์บอท LINE</li><li>แก้ราคา ตารางหมอ คำตอบบอท ตามที่คลินิกแจ้ง</li><li>สำรองข้อมูลและอัปเดตความปลอดภัย</li><li>รายงานนัดที่จองผ่าน LINE ทุกเดือน</li></ul>
              <p className="h-display">{baht(CARE)} บาท/เดือน</p>
            </div>
            <div>
              <h3 className="h-display">SEO ต่อเนื่อง <span className={styles.optional}>เลือกเพิ่มได้</span></h3>
              <ul><li>บทความใหม่ 2 เรื่องต่อเดือน เรียบเรียงจากคลิปหมอหยง</li><li>โพสต์และตอบรีวิวบน Google Business Profile</li><li>ติดตามอันดับคำค้นและรายงานผล</li></ul>
              <p className="h-display">{baht(SEO_MONTHLY)} บาท/เดือน</p>
            </div>
            <div>
              <h3 className="h-display">คลินิกจ่ายตรง</h3>
              <ul><li>LINE OA แพ็กเกจฟรีส่งได้ 300 ข้อความ/เดือน ข้อความที่บอทตอบกลับไม่นับ</li><li>ถ้าส่งข้อความเตือนนัดเกินโควตา ใช้แพ็กเกจ Basic 1,280 บาท/เดือน (15,000 ข้อความ)</li><li>ต่ออายุโดเมนเดิมของคลินิกตามปกติ</li></ul>
              <p className="h-display">0–1,280 บาท/เดือน</p>
            </div>
          </div>

          <div className={styles.market}>
            <h3 className="h-display">เทียบกับราคาตลาด</h3>
            <ul>
              <li>เว็บคลินิกจากเอเจนซีทั่วไปเริ่มราว 20,000–26,000 บาท จ่ายครั้งเดียว ได้หน้าทีมแพทย์และ SEO พื้นฐาน ไม่มีบอทจองคิว ไม่มีโมเดล 3 มิติ</li>
              <li>ระบบแชทและจองคิวสำเร็จรูปสำหรับคลินิก 590–6,000 บาทต่อเดือน หรือ 7,000–72,000 บาทต่อปี ไม่ได้เป็นเจ้าของระบบ</li>
              <li>ข้อเสนอนี้ได้ทั้งเว็บและบอทในราคา {baht(BUNDLE)} บาท จ่ายครั้งเดียวและเป็นของคลินิก ค่าดูแลรวมโฮสต์ {baht(CARE)} บาทต่อเดือน</li>
            </ul>
          </div>

          <ol className={styles.timeline}>
            <li><b className="h-display">สัปดาห์ 1</b><span>เก็บตารางหมอ ราคา รูปจริง และคำตอบที่หมออนุมัติ</span></li>
            <li><b className="h-display">สัปดาห์ 2–3</b><span>สร้างเว็บใหม่ ย้ายเนื้อหาเดิม ทำโมเดลฟันและหน้าคลิป</span></li>
            <li><b className="h-display">สัปดาห์ 3–4</b><span>ตั้งบอทจองคิวและถาม-ตอบ ทดสอบกับทีมคลินิก</span></li>
            <li><b className="h-display">สัปดาห์ 5</b><span>เปิดใช้งานจริง ย้ายโดเมน ตั้งค่า SEO และ Google Maps</span></li>
            <li><b className="h-display">สัปดาห์ 6</b><span>ปรับจากข้อความลูกค้าจริง ส่งรายงานผลแรก</span></li>
          </ol>
          <div className={styles.two}>
            <div><h3 className="h-display">คลินิกช่วยเตรียม</h3><p>ตารางลงตรวจของหมอแต่ละท่าน รูปหมอและรูปคลินิก ราคางานที่ให้บอกได้ เลขใบอนุญาตสถานพยาบาล สิทธิ์แอดมิน LINE OA และโดเมนเดิม</p></div>
            <div><h3 className="h-display">สิ่งที่จะวัดหลังเปิดใช้</h3><p>จำนวนนัดที่จองผ่าน LINE ต่อสัปดาห์ ข้อความที่บอทตอบเองเทียบกับที่ส่งต่อคน การกดโทรและกดจองจากเว็บ และคำค้นที่ขึ้นหน้าแรกของ Google</p></div>
          </div>
          <p className={styles.contact}>
            ติดต่อ: Phayuphat Trilao · <a href="tel:+66825914037">082-591-4037</a> · <a href="mailto:phayuphat118@gmail.com">phayuphat118@gmail.com</a>
          </p>
        </div>
      </section>
      <section id="changes" className={`wrap ${styles.section} ${styles.changes}`}>
        <h2 className={`h-display ${styles.h2}`}>อยากเพิ่มหรือปรับอะไร คุยกันได้</h2>
        <p className="lead narrow">ขอบเขตด้านบนเป็นจุดเริ่มต้น ถ้าคลินิกอยากได้เพิ่ม หรืออยากเปลี่ยนสิ่งที่ตกลงไว้ ทั้งก่อนเริ่มงาน ระหว่างทำ หรือหลังเปิดใช้ แจ้งได้ตลอด</p>

        <ol className={styles.steps}>
          <li><span className={`h-display ${styles.stepN}`}>1</span><b>บอกสิ่งที่อยากได้</b><span>โทร ส่งอีเมล หรือส่งรูปตัวอย่างที่ชอบมาก็ได้ ไม่ต้องเขียนเป็นเอกสาร</span></li>
          <li><span className={`h-display ${styles.stepN}`}>2</span><b>ได้ราคาและเวลาก่อนเริ่ม</b><span>เราประเมินกลับภายใน 2 วันทำการ บอกชัดว่าเพิ่มกี่บาท ใช้เวลากี่วัน กระทบกำหนดเปิดหรือไม่</span></li>
          <li><span className={`h-display ${styles.stepN}`}>3</span><b>ตกลงแล้วค่อยทำ</b><span>ไม่มีค่าใช้จ่ายที่ไม่ได้ตกลงกันก่อน ถ้าราคาไม่เหมาะ ตัดหรือเลื่อนไปทำทีหลังได้</span></li>
        </ol>

        <div className={styles.changeGrid}>
          <div className={styles.freeBox}>
            <h3 className="h-display">ไม่คิดเพิ่ม</h3>
            <ul>
              <li>แก้งานในขอบเขตเดิม 2 รอบต่อส่วน เช่น สี ข้อความ รูป ลำดับหัวข้อ</li>
              <li>ระหว่างใช้บริการดูแลรายเดือน แก้ราคา ตารางหมอ เวลาเปิด และคำตอบบอทได้ตลอด</li>
              <li>แก้จุดที่ทำงานไม่ถูกต้อง ไม่ว่าเมื่อไหร่ก็ตาม</li>
            </ul>
          </div>
          <div className={styles.addonBox}>
            <h3 className="h-display">งานเพิ่มที่คลินิกมักขอ <span className={styles.optional}>ราคาเริ่มต้น</span></h3>
            <ul className={styles.addons}>
              {addons.map((a) => (
                <li key={a.name}><span>{a.name}</span><b className="h-display">{baht(a.price)} บาท{a.unit ? <small> / {a.unit}</small> : null}</b></li>
              ))}
            </ul>
            <p className="muted small">งานที่ไม่อยู่ในรายการนี้ก็ทำได้ ประเมินราคาให้ตามขั้นตอนด้านบน</p>
          </div>
        </div>

        <div className={styles.talk}>
          <div>
            <p className={`h-display ${styles.talkTitle}`}>คุยรายละเอียดหรือปรับ requirement</p>
            <p className="muted">Phayuphat Trilao</p>
          </div>
          <div className={styles.talkBtns}>
            <a href="tel:+66825914037" className="btn-primary">โทร 082-591-4037</a>
            <a href={`mailto:phayuphat118@gmail.com?subject=${encodeURIComponent("ขอเพิ่มหรือปรับงานเว็บ Dental Care @วังหิน")}`} className="btn-outline">ส่งอีเมล</a>
          </div>
        </div>
      </section>

    </main>
  );
}
