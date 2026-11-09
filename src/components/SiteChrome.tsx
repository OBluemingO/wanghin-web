import Link from "next/link";
import { clinic } from "@/lib/clinic";
import { BrandMark, GumLine } from "./Icons";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="wrap header-row">
        <Link href="/" className="brand" aria-label="Dental Care @Wanghin หน้าแรก">
          <BrandMark />
          <span className="brand-text">
            <span className="h-display brand-name">Dental Care</span>
            <span className="brand-at">@วังหิน</span>
          </span>
        </Link>
        <nav aria-label="เมนูหลัก" className="main-nav">
          <Link href="/#services">บริการและราคา</Link>
          <Link href="/#doctors">ทีมหมอ</Link>
          <Link href="/videos">คลิปหมอหยง</Link>
          <Link href="/#reviews">รีวิว</Link>
          <Link href="/#visit">การเดินทาง</Link>
        </nav>
        <a href={`tel:${clinic.phoneE164}`} className="header-phone">{clinic.phone}</a>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <GumLine fill="#1F2A3C" bg="#F4F6F8" height={40} />
      <div className="wrap footer-row">
        <p>Dental Care @Wanghin คลินิกทันตกรรม ลาดพร้าว–วังหิน</p>
        <p>เลขที่ใบอนุญาตสถานพยาบาล [ใส่เลขจริง]</p>
      </div>
    </footer>
  );
}
