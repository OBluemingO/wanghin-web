import type { Metadata, Viewport } from "next";
import "@fontsource/anuphan/thai-500.css";
import "@fontsource/anuphan/thai-600.css";
import "@fontsource/anuphan/thai-700.css";
import "@fontsource/anuphan/latin-600.css";
import "@fontsource/anuphan/latin-700.css";
import "@fontsource/ibm-plex-sans-thai-looped/thai-400.css";
import "@fontsource/ibm-plex-sans-thai-looped/thai-500.css";
import "@fontsource/ibm-plex-sans-thai-looped/thai-600.css";
import "@fontsource/ibm-plex-sans-thai-looped/latin-400.css";
import "@fontsource/ibm-plex-sans-thai-looped/latin-600.css";
import "./globals.css";
import { clinic, DEMO, SITE_URL } from "@/lib/clinic";
import DemoBanner from "@/components/DemoBanner";
import LineDemoModal from "@/components/LineDemoModal";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "ทำฟัน ลาดพร้าว วังหิน หมอเหงือกเฉพาะทาง ใช้ประกันสังคมได้ | Dental Care @Wanghin",
    template: "%s | Dental Care @Wanghin",
  },
  description:
    "คลินิกทันตกรรมย่านลาดพร้าว–วังหิน ตรงข้ามโลตัสวังหิน ทันตแพทย์เฉพาะทางเหงือก รากฟัน และรากเทียม ขูดหินปูน อุดฟัน ถอนฟันด้วยสิทธิประกันสังคม เปิดทุกวัน 10:00–19:00 น.",
  openGraph: {
    type: "website",
    locale: "th_TH",
    siteName: clinic.name,
    title: "Dental Care @Wanghin คลินิกทันตกรรม ลาดพร้าว–วังหิน",
    description: "หมอเหงือกเฉพาะทาง รากฟัน รากเทียม ใช้สิทธิประกันสังคมได้ จองคิวทาง LINE ได้ตลอด 24 ชั่วโมง",
  },
  robots: DEMO ? { index: false, follow: false } : { index: true, follow: true },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = { themeColor: "#3B1E2A", width: "device-width", initialScale: 1 };

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Dentist",
  name: clinic.name,
  alternateName: clinic.nameTh,
  url: SITE_URL,
  telephone: clinic.phoneE164,
  foundingDate: String(clinic.since),
  address: {
    "@type": "PostalAddress",
    streetAddress: clinic.address,
    addressLocality: clinic.district,
    addressRegion: clinic.city,
    postalCode: clinic.postalCode,
    addressCountry: "TH",
  },
  geo: { "@type": "GeoCoordinates", latitude: clinic.geo.lat, longitude: clinic.geo.lng },
  hasMap: clinic.googleMapsUrl,
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "10:00",
      closes: "19:00",
    },
  ],
  sameAs: [clinic.facebook],
  medicalSpecialty: ["Periodontics", "Endodontics", "Prosthodontics", "Orthodontics"],
  availableService: [
    { "@type": "MedicalProcedure", name: "ตัดแต่งเหงือกด้วยเลเซอร์" },
    { "@type": "MedicalProcedure", name: "รักษาโรคเหงือก ปลูกเหงือก" },
    { "@type": "MedicalProcedure", name: "รักษารากฟัน" },
    { "@type": "MedicalProcedure", name: "รากเทียม ครอบฟัน สะพานฟัน" },
    { "@type": "MedicalProcedure", name: "จัดฟัน" },
    { "@type": "MedicalProcedure", name: "ขูดหินปูน อุดฟัน ถอนฟัน (ประกันสังคม)" },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="th">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
        {DEMO && <DemoBanner />}
        {children}
        <LineDemoModal />
      </body>
    </html>
  );
}
