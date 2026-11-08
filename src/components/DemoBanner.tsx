import Link from "next/link";

export default function DemoBanner() {
  return (
    <div role="note" className="demo-banner">
      ตัวอย่างการออกแบบใหม่ที่ ตอบไว Studio เสนอให้ Dental Care @Wanghin ยังไม่ใช่เว็บไซต์ทางการของคลินิก{" "}
      <Link href="/proposal">ดูข้อเสนอทั้งหมด</Link>
    </div>
  );
}
