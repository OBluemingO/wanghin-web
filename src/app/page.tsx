import Image from "next/image";
import Hero from "@/components/Hero";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { GumLine } from "@/components/Icons";
import Link from "next/link";
import { VideoCard } from "@/components/VideoCard";
import ClinicMap from "@/components/ClinicMap";
import { clinic, doctors, reviews, services } from "@/lib/clinic";
import { TIKTOK, clips } from "@/lib/videos";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <GumLine fill="#FFE3C7" bg="#FFFFFF" />

        <section className="sso">
          <div className="wrap sso-row">
            <div>
              <h2 className="h-display sso-title">ใช้สิทธิประกันสังคมทำฟันได้ที่นี่</h2>
              <p className="sso-text">ยื่นบัตรประชาชนใบเดียว คลินิกตรวจสิทธิให้ก่อนรักษา ไม่ต้องสำรองจ่ายในส่วนที่เบิกได้</p>
            </div>
            <p className="sso-list">ขูดหินปูน อุดฟัน ถอนฟัน</p>
          </div>
        </section>

        <section id="services" className="wrap section">
          <div className="section-head">
            <h2 className="h-display section-title">ปัญหาอยู่ตรงไหน<br />เรามีคนดูแลตรงนั้น</h2>
            <p className="muted narrow">ราคาตามที่คลินิกประกาศ (บาท) อาจปรับเปลี่ยนได้ ส่วนที่ไม่ได้ระบุขึ้นกับแต่ละเคส หมอแจ้งราคาทุกขั้นตอนก่อนเริ่มทำ</p>
          </div>
          <div className="service-list">
            {services.map((s) => (
              <article key={s.part} className={s.featured ? "service featured" : "service"}>
                <div className="service-part">
                  <span className="dot" style={{ background: s.dot }} aria-hidden="true" />
                  <h3 className="h-display">{s.part}</h3>
                </div>
                <div className="service-items">
                  <p>{s.items}</p>
                  {s.prices && (
                    <ul className="service-prices">
                      {s.prices.map((p) => <li key={p.label}><span>{p.label}</span><b>{p.price}</b></li>)}
                    </ul>
                  )}
                  {s.note && <p className="service-note">{s.note}</p>}
                </div>
                <div className="service-price">
                  <p className="h-display">{s.price}</p>
                  <p className="service-who">{s.who}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="doctors" className="wrap section">
          <h2 className="h-display section-title">ทีมหมอเฉพาะทาง {doctors.length} ท่าน</h2>
          <p className="lead narrow">เคสเหงือกได้หมอเหงือก เคสรากฟันได้หมอรากฟัน ไม่ต้องส่งต่อไปที่อื่น</p>
          <div className="doctor-grid">
            {doctors.map((d) => (
              <figure key={d.nick} className="doctor">
                <div className="doctor-photo">
                  {d.photo ? (
                    <Image src={d.photo} alt={`${d.nick} ทันตแพทย์ด้าน${d.role}`} fill sizes="(max-width: 640px) 50vw, 240px" />
                  ) : (
                    <span>รูปจริงของ{d.nick}</span>
                  )}
                </div>
                <figcaption>
                  <p className="doctor-role">{d.role}</p>
                  <p className="h-display doctor-nick">{d.nick}</p>
                  <p className="muted small">{d.full}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section id="videos" className="wrap section">
          <div className="vsection-head">
            <div>
              <h2 className="h-display section-title">หมอหยงตอบเรื่องเหงือกบน TikTok</h2>
              <p className="lead narrow">{TIKTOK.followers} คนติดตามคลิปความรู้เรื่องเหงือกและฟันจากหมอหยง ดูคลิปที่คนดูมากที่สุดได้ที่นี่</p>
            </div>
            <Link href="/videos" className="btn-primary">ดูคลิปทั้งหมด</Link>
          </div>
          <div className="vgrid vgrid-teaser">
            {/* the pinned clips first, then the most-liked others, four in all */}
            {[...clips].sort((a, b) => Number(!!b.pinned) - Number(!!a.pinned) || b.likes - a.likes).slice(0, 4).map((c) => <VideoCard key={c.slug} clip={c} />)}
          </div>
        </section>

        <section id="line" className="wrap section">
          <div className="line-band">
            <div className="line-band-copy">
              <h2 className="h-display">จองคิวทาง LINE ได้ตลอด 24 ชั่วโมง</h2>
              <p>ทักมาตอนดึกก็ได้คิว ไม่ต้องรอแอดมินตอบตอนเช้า มีข้อความเตือนก่อนวันนัด 1 วัน</p>
              <a href="#line" data-line-demo className="btn-primary">ลองจองคิวในบอทตัวอย่าง</a>
            </div>
            <ol className="steps">
              <li><span className="h-display step-n">1</span><b>แอด LINE คลินิก</b><span className="muted small">สแกน QR หรือกดปุ่มจองบนเว็บ</span></li>
              <li><span className="h-display step-n">2</span><b>เลือกอาการ หมอ และเวลา</b><span className="muted small">เห็นช่วงเวลาที่ว่างจริงของหมอแต่ละคน</span></li>
              <li><span className="h-display step-n">3</span><b>ได้คิวยืนยันทันที</b><span className="muted small">เลื่อนหรือยกเลิกนัดในแชทได้เอง</span></li>
            </ol>
          </div>
        </section>

        <section id="reviews" className="wrap section">
          <h2 className="h-display section-title">คนไข้พูดถึงเรา</h2>
          <div className="review-grid">
            {reviews.map((r) => (
              <blockquote key={r.by}>
                <p className="h-display">“{r.quote}”</p>
                <footer className="muted small">{r.by}</footer>
              </blockquote>
            ))}
          </div>
        </section>

        <section id="visit" className="wrap section last">
          <div className="visit-row">
            <div className="visit-info">
              <h2 className="h-display section-title">มาที่คลินิก</h2>
              <dl>
                <dt>ที่อยู่</dt><dd>{clinic.address} กรุงเทพฯ {clinic.postalCode}</dd>
                <dt>เวลาเปิด</dt><dd>{clinic.hours}</dd>
                <dt>โทร</dt><dd><a href={`tel:${clinic.phoneE164}`}>{clinic.phone}</a></dd>
                <dt>LINE</dt><dd>{clinic.line}</dd>
              </dl>
            </div>
            <ClinicMap />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
