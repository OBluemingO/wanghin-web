import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import TikTokPlayer from "@/components/TikTokPlayer";
import { VideoCard } from "@/components/VideoCard";
import { LineIcon } from "@/components/Icons";
import { DEMO, doctors } from "@/lib/clinic";
import { clipBySlug, clips, fmt, thaiDate, tiktokUrl } from "@/lib/videos";

export function generateStaticParams() {
  return clips.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/videos/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const clip = clipBySlug(slug);
  if (!clip) return {};
  return {
    title: `${clip.title} | หมอหยง`,
    description: clip.article ? clip.article.summary.join(" ") : `${clip.caption} คลิปจากหมอหยง ทันตแพทย์เฉพาะทางโรคเหงือก`,
    alternates: { canonical: `/videos/${clip.slug}` },
  };
}

export default async function VideoPage({ params }: PageProps<"/videos/[slug]">) {
  const { slug } = await params;
  const clip = clipBySlug(slug);
  if (!clip) notFound();
  const yong = doctors[0];
  const a = clip.article;
  const related = clips.filter((c) => c.slug !== clip.slug && c.topic === clip.topic)
    .concat(clips.filter((c) => c.slug !== clip.slug && c.topic !== clip.topic))
    .slice(0, 5);

  return (
    <>
      <SiteHeader />
      <main className="vpage">
        <nav aria-label="เส้นทาง" className="wrap vcrumb small">
          <Link href="/videos">ความรู้จากหมอ</Link> <span aria-hidden="true">›</span> <span>{clip.topic}</span>
        </nav>

        <div className="wrap vdetail">
          <aside className="vdetail-side">
            <div className="vdetail-sticky">
              <TikTokPlayer clip={clip} />
              <p className="small vdetail-stats">
                <b>{fmt(clip.likes)}</b> ไลก์{clip.comments ? <> · <b>{clip.comments}</b> คอมเมนต์</> : null} · {thaiDate(clip.date)}
              </p>
              <a href={tiktokUrl(clip)} target="_blank" rel="noopener" className="btn-outline vfull">ดูบน TikTok</a>
              <div className="vbook">
                <p className="h-display vbook-title">{a ? a.cta.label : "ปรึกษาหมอหยง"}</p>
                <p className="muted small">{a ? a.cta.who : "ทันตแพทย์เฉพาะทางโรคเหงือก"}</p>
                <button type="button" className="btn-primary vfull" data-line-demo><LineIcon /> <span style={{ marginLeft: 8 }}>จองคิวทาง LINE</span></button>
              </div>
            </div>
          </aside>

          <article className="vdetail-main">
            <p className="vcard-topic">{clip.topic}{a ? ` · อ่าน ${a.minutes} นาที` : ""}</p>
            <h1 className="h-display vdetail-title">{clip.title}</h1>
            <div className="vbyline">
              <span className="vbyline-photo">{yong.photo && <Image src={yong.photo} alt="" fill sizes="44px" />}</span>
              <span className="small"><b>หมอหยง</b><br /><span className="muted">{yong.full} ทันตแพทย์เฉพาะทางโรคเหงือก</span></span>
            </div>

            <blockquote className="vcaption">
              <p className="small muted">หมอหยงเขียนไว้ใต้คลิป</p>
              <p className="h-display">“{clip.caption}”</p>
            </blockquote>

            {a ? (
              <>
                <div className="vsummary">
                  <p className="vsummary-h">สรุปจากคลิป</p>
                  <ul>{a.summary.map((s) => <li key={s}>{s}</li>)}</ul>
                </div>
                {a.sections.map((s) => (
                  <section key={s.h} className="vprose">
                    <h2 className="h-display">{s.h}</h2>
                    {s.p.map((p) => <p key={p}>{p}</p>)}
                  </section>
                ))}
                {a.askedInComments?.length ? (
                  <section className="vprose">
                    <h2 className="h-display">คำถามจากคอมเมนต์</h2>
                    <ul className="vasked">{a.askedInComments.map((q) => <li key={q}>{q}</li>)}</ul>
                  </section>
                ) : null}
                {a.searches?.length ? (
                  <section className="vprose">
                    <h2 className="h-display">คนหาคลิปนี้ด้วยคำว่า</h2>
                    <ul className="vsearches">{a.searches.map((q) => <li key={q}>{q}</li>)}</ul>
                  </section>
                ) : null}
                <p className="muted small vnote">ทุกเคสต่างกัน ถ้ามีอาการแบบนี้ ส่งรูปฟันให้หมอดูทาง LINE หรือจองคิวตรวจที่คลินิก หมอต้องเห็นฟันก่อนจึงแนะนำได้ตรง</p>
                {DEMO && <p className="vdraft small">ร่างบทความตัวอย่าง เรียบเรียงจากคลิป หมอหยงต้องตรวจก่อนเผยแพร่จริง</p>}
              </>
            ) : (
              <div className="vsummary">
                <p className="vsummary-h">บทความจากคลิปนี้</p>
                <p>กำลังเรียบเรียงจากคลิป ระหว่างนี้กดเล่นคลิปด้านข้างได้เลย</p>
              </div>
            )}
          </article>
        </div>

        <section className="wrap vsection" aria-labelledby="rel-h">
          <h2 id="rel-h" className="h-display vsection-title">คลิปอื่นของหมอหยง</h2>
          <div className="vgrid">{related.map((c) => <VideoCard key={c.slug} clip={c} />)}</div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
