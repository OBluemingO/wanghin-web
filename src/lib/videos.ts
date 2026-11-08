/**
 * Dr. Yong's TikTok clips (@dr.yongka). Titles, captions, likes and dates come from the public
 * clips (counts as seen 9 Nov 2026 and will drift). "pinned" marks the three most-liked clips
 * found; confirm against the account's real pinned clips before launch.
 */
export const TIKTOK = {
  handle: "dr.yongka",
  url: "https://www.tiktok.com/@dr.yongka",
  name: "หมอหยง ครบเครื่องเรื่องฟัน",
  followers: "32.5K",
  likes: "342.9K",
};

export type Tone = "mist" | "soft" | "clean" | "ink";

export type Topic = { name: string; count: number; tone: Tone };

/** The account's own playlists, with clip counts. */
export const topics: Topic[] = [
  { name: "โรคเหงือก โรคปริทันต์", count: 92, tone: "soft" },
  { name: "จัดฟันกับหมอหยง", count: 86, tone: "clean" },
  { name: "ความรู้ฟันและเหงือก", count: 83, tone: "mist" },
  { name: "ปลูกเหงือก เหงือกร่น", count: 26, tone: "soft" },
  { name: "ตัดเหงือกด้วยเลเซอร์", count: 23, tone: "ink" },
  { name: "รากเทียม", count: 16, tone: "clean" },
  { name: "จัดฟัน ในคนไข้โรคเหงือก", count: 16, tone: "clean" },
  { name: "ก้อนเนื้อเหงือก", count: 3, tone: "ink" },
  { name: "การทำความสะอาดช่องปาก", count: 3, tone: "mist" },
];

export type Section = { h: string; p: string[] };

export type Clip = {
  slug: string;
  id: string;
  title: string;
  /** The doctor's own caption on TikTok. */
  caption: string;
  topic: string;
  likes: number;
  comments?: number;
  duration?: string;
  date: string;
  pinned?: boolean;
  /** Article drafted from the clip. Needs the doctor's review before going live. */
  article?: {
    minutes: number;
    summary: string[];
    sections: Section[];
    askedInComments: string[];
    cta: { label: string; who: string };
  };
};

export const clips: Clip[] = [
  {
    slug: "mouthwash", id: "7202530927308737819", title: "อันตรายจากน้ำยาบ้วนปาก",
    caption: "อันตรายจากน้ำยาบ้วนปาก", topic: "การทำความสะอาดช่องปาก",
    likes: 3160, comments: 88, duration: "1:35", date: "2023-02-21", pinned: true,
  },
  {
    slug: "gum-recession-graft", id: "7298956137880210694", title: "เหงือกร่น ปลูกเหงือกได้ไหม",
    caption: "เคสเหงือกร่น เคสนี้ปลูกเหงือกเพื่อการรักษา", topic: "ปลูกเหงือก เหงือกร่น",
    likes: 3019, comments: 71, date: "2023-11-08", pinned: true,
  },
  {
    slug: "bone-loss-50", id: "7302430484766821638", title: "กระดูกเบ้าฟันละลายเกิน 50% ยังเก็บฟันได้ไหม",
    caption: "กระดูกเบ้าฟันละลายเกิน 50% พบแพทย์เฉพาะทางก่อนว่าเก็บได้มั้ยนะคะ", topic: "โรคเหงือก โรคปริทันต์",
    likes: 1390, comments: 85, date: "2023-11-17", pinned: true,
  },
  {
    slug: "retainer-timing", id: "7203320839834520858", title: "ถอดเหล็กจัดฟัน พิมพ์รีเทนเนอร์ตอนไหนดี",
    caption: "ถอดเหล็กจัดฟัน พิมพ์รีเทนเนอร์ตอนไหนดี", topic: "จัดฟันกับหมอหยง",
    likes: 1350, duration: "0:36", date: "2023-02-23",
  },
  {
    slug: "subgingival-scaling", id: "7358453792624446727", title: "ขูดหินปูนใต้เหงือก ต้องใช้เครื่องมือพิเศษ",
    caption: "ขูดหินปูนใต้เหงือก ต้องใช้เครื่องมือพิเศษ และต้องตรวจให้ละเอียด เพื่อให้เกลี้ยงเรียบร้อย", topic: "โรคเหงือก โรคปริทันต์",
    likes: 475, comments: 23, date: "2024-04-16",
  },
  {
    slug: "last-molar-extraction", id: "7295770469314120965", title: "ถอนฟันกรามซี่สุดท้าย ต้องใส่ฟันปลอมไหม",
    caption: "ถอนฟันกรามซี่สุดท้าย จำเป็นต้องใส่ฟันปลอมถ้ามีฟันคู่สบ", topic: "ความรู้ฟันและเหงือก",
    likes: 472, comments: 28, duration: "1:05", date: "2023-10-30",
    article: {
      minutes: 3,
      summary: [
        "ถ้าฟันกรามที่ถอนไปมีฟันคู่สบ คือฟันอีกขากรรไกรที่เคยกัดกัน หมอหยงแนะนำให้ใส่ฟันทดแทน",
        "ฟันคู่สบที่ไม่มีฟันให้กัด อาจค่อยๆ ยื่นยาวเข้ามาในช่องว่าง ทำให้การสบฟันเปลี่ยน",
        "ทางเลือกมีทั้งฟันปลอมถอดได้และรากเทียม หมอจะดูกระดูกและฟันข้างเคียงก่อนแนะนำ",
      ],
      sections: [
        {
          h: "ฟันคู่สบคืออะไร",
          p: ["ฟันคู่สบคือฟันในขากรรไกรอีกฝั่งที่กัดลงมาตรงกับซี่ที่ถอน เช่น ถอนฟันกรามล่างซี่สุดท้าย ฟันคู่สบคือฟันกรามบนซี่สุดท้ายที่อยู่ตรงกัน"],
        },
        {
          h: "ถ้าไม่ใส่ฟัน จะเกิดอะไรขึ้น",
          p: [
            "เมื่อฟันคู่สบไม่มีฟันให้กัด ฟันซี่นั้นอาจค่อยๆ ยื่นยาวลงมาในช่องว่าง เศษอาหารติดง่ายขึ้น และการสบฟันของทั้งปากอาจเปลี่ยนไป",
            "ถ้าซี่ที่ถอนไม่มีฟันคู่สบ เช่น ฟันฝั่งตรงข้ามถูกถอนไปแล้ว บางเคสอาจไม่จำเป็นต้องใส่ ควรให้หมอตรวจก่อนตัดสินใจ",
          ],
        },
        {
          h: "ทางเลือกในการใส่ฟัน",
          p: [
            "ฟันปลอมถอดได้ เริ่มต้นได้เร็วและราคาต่ำกว่า ถอดออกมาทำความสะอาดได้",
            "รากเทียม ยึดกับกระดูกขากรรไกรโดยไม่ต้องกรอฟันข้างเคียง ต้องมีกระดูกเพียงพอ",
            "สะพานฟันต้องมีฟันหลักทั้งสองข้างของช่องว่าง ฟันกรามซี่สุดท้ายมักไม่มีฟันอยู่ด้านหลัง จึงมักไม่ใช่ทางเลือกแรก",
          ],
        },
      ],
      askedInComments: [
        "ถอนฟันกรามบนซี่รองสุดท้าย ฟันข้างๆ จะล้มไหม",
        "ไม่อยากทำรากเทียม ทำครอบฟันแทนได้ไหม",
        "ถอนฟันกรามซี่ที่ 2 ไปแล้ว จะเคี้ยวข้าวได้ปกติไหม",
      ],
      cta: { label: "ปรึกษาทางเลือกใส่ฟัน", who: "ทพ.พชร ทันตแพทย์ใส่ฟันและรากเทียม" },
    },
  },
  {
    slug: "gum-abscess", id: "7261991445022690566", title: "ตุ่มหนองที่เหงือก มาจากฟันซี่ไหน",
    caption: "ตุ่มหนองที่เหงือก มาจากฟันซี่ไหน ใช้วิธีนี้", topic: "โรคเหงือก โรคปริทันต์",
    likes: 383, comments: 23, duration: "0:49", date: "2023-07-31",
  },
  {
    slug: "bony-growth", id: "7220068101344234778", title: "เหงือกปูด กระดูกงอก ใช่มะเร็งไหม",
    caption: "เหงือกปูด กระดูกงอก ใช่มะเร็งหรือเปล่า", topic: "ก้อนเนื้อเหงือก",
    likes: 326, comments: 29, date: "2023-04-09",
  },
  {
    slug: "crowded-teeth", id: "7416352443149110546", title: "แก้ฟันซ้อนเก แบบง่ายๆ",
    caption: "แก้ฟันซ้อนเก แบบง่ายๆ", topic: "จัดฟันกับหมอหยง",
    likes: 224, duration: "1:15", date: "2024-09-19",
  },
  {
    slug: "laser-gum-contouring", id: "7332488945868999943", title: "ตัดเหงือกด้วยเลเซอร์ ยิ้มเห็นเหงือกน้อยลง",
    caption: "เหงือกดูเป็นธรรมชาติ กลมกลืน ยิ้มสวยขึ้นด้วยการตัดเหงือกด้วยเลเซอร์", topic: "ตัดเหงือกด้วยเลเซอร์",
    likes: 101, date: "2024-02-06",
  },
];

export const toneOf = (topic: string): Tone => topics.find((t) => t.name === topic)?.tone ?? "mist";
export const fmt = (n: number) => n.toLocaleString("en-US");
export const thaiDate = (iso: string) =>
  new Date(iso + "T00:00:00Z").toLocaleDateString("th-TH", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
export const clipBySlug = (slug: string) => clips.find((c) => c.slug === slug);
export const tiktokUrl = (c: Clip) => `${TIKTOK.url}/video/${c.id}`;
