import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import VideoBrowser from "@/components/VideoBrowser";
import { VideoCover } from "@/components/VideoCard";
import { LineIcon } from "@/components/Icons";
import { doctors } from "@/lib/clinic";
import { TIKTOK, clips, fmt, topics } from "@/lib/videos";

export const metadata: Metadata = {
  title: "คลิปความรู้จากหมอหยง ทันตแพทย์เฉพาะทางโรคเหงือก",
  description: "รวมคลิป TikTok ของหมอหยง @dr.yongka เรื่องเหงือกร่น ปลูกเหงือก โรคปริทันต์ จัดฟัน และการดูแลช่องปาก พร้อมบทความสรุปจากคลิป",
  alternates: { canonical: "/videos" },
};

export default function VideosPage() {
  const yong = doctors[0];
  const pinned = clips.filter((c) => c.pinned);
  const withArticle = clips.filter((c) => c.article);

  return (
    <>
      <SiteHeader />
      <main className="vpage">
        <section className="wrap vhero">
          <div className="vhero-card">
            <div className="vhero-photo">
              {yong.photo && <Image src={yong.photo} alt={`${yong.nick} ${yong.full}`} fill sizes="120px" />}
            </div>
            <div className="vhero-text">
              <p className="muted small">ความรู้จากหมอ · คลิปจาก TikTok</p>
              <h1 className="h-display vhero-title">{TIKTOK.name}</h1>
              <p className="vhero-sub">{yong.full} ทันตแพทย์เฉพาะทางโรคเหงือก · @{TIKTOK.handle}</p>
              <dl className="vstats">
                <div><dt>ผู้ติดตาม</dt><dd>{TIKTOK.followers}</dd></div>
                <div><dt>ไลก์</dt><dd>{TIKTOK.likes}</dd></div>
                <div><dt>หัวข้อ</dt><dd>{topics.length}</dd></div>
              </dl>
            </div>
            <div className="vhero-actions">
              <a href={TIKTOK.url} className="btn-outline" target="_blank" rel="noopener">ติดตามบน TikTok</a>
              <button type="button" className="btn-primary" data-line-demo>
                <LineIcon /> <span style={{ marginLeft: 8 }}>จองคิวกับหมอหยง</span>
              </button>
            </div>
          </div>
        </section>

        <section className="wrap vsection" aria-labelledby="pinned-h">
          <div className="vsection-head">
            <h2 id="pinned-h" className="h-display vsection-title">คลิปปักหมุด</h2>
            <p className="muted small">3 คลิปที่คนดูมากที่สุด</p>
          </div>
          <div className="vpinned">
            {pinned.map((c) => (
              <Link key={c.slug} href={`/videos/${c.slug}`} className="vpinned-card">
                <VideoCover clip={c} sizes="140px" />
                <span className="vpinned-body">
                  <span className="vcard-topic">{c.topic}</span>
                  <span className="h-display vpinned-title">{c.title}</span>
                  <span className="small">{fmt(c.likes)} ไลก์{c.comments ? ` · ${c.comments} คอมเมนต์` : ""}</span>
                  <span className="vpinned-cta">{c.article ? "อ่านบทความ" : "ดูคลิป"}</span>
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="wrap vsection" aria-labelledby="all-h">
          <div className="vsection-head">
            <h2 id="all-h" className="h-display vsection-title">ทุกคลิป แยกตามหัวข้อ</h2>
            <a href={TIKTOK.url} target="_blank" rel="noopener" className="small">ดูทั้งหมดบน TikTok</a>
          </div>
          <VideoBrowser clips={clips} topics={topics} />
        </section>

        {withArticle.length > 0 && (
          <section className="wrap vsection" aria-labelledby="art-h">
            <h2 id="art-h" className="h-display vsection-title">บทความจากคลิป</h2>
            <div className="varticles">
              {withArticle.map((c) => (
                <Link key={c.slug} href={`/videos/${c.slug}`} className="varticle">
                  <span className="vcard-topic">{c.topic} · อ่าน {c.article!.minutes} นาที</span>
                  <span className="h-display varticle-title">{c.title}</span>
                  <span className="muted small">{c.article!.summary[0]}</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className="wrap vsection">
          <div className="vcta">
            <div>
              <h2 className="h-display">ดูคลิปแล้ว อยากให้หมอดูเคสจริง</h2>
              <p>ส่งรูปฟันทาง LINE หรือจองคิวตรวจกับหมอหยงที่คลินิก</p>
            </div>
            <button type="button" className="btn-white" data-line-demo><LineIcon /> จองคิวทาง LINE</button>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
