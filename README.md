# Dental Care @Wanghin — redesign (Phase 1 proposal)

Next.js 16 site by Phayuphat Trilao: new brand, homepage with an interactive 3D tooth model (three.js), LINE OA booking-bot demo, and the proposal at `/proposal`.

## Run

```bash
npm install
npm run dev
```

## Environment

| Variable | Default | Purpose |
|---|---|---|
| `NEXT_PUBLIC_DEMO` | on (anything but `0`) | Shows the "design proposal" banner, sets `noindex`, blocks crawlers in robots.txt |
| `NEXT_PUBLIC_SITE_URL` | `https://wanghin-web.vercel.app` | Canonical URL, sitemap, Open Graph |

Set `NEXT_PUBLIC_DEMO=0` only when this becomes the clinic's real site.

## Structure

- `src/app/page.tsx` — homepage
- `src/app/proposal/page.tsx` — proposal (brand, LINE bot, SEO audit, scope)
- `src/components/JawViewer.tsx` — 3D jaw: hover opens the mouth, click a tooth or the gum, drag to rotate 360°
- `src/components/LineChat.tsx` — LINE booking demo
- `src/lib/clinic.ts` — clinic data, doctors, services, per-tooth info
- `public/models/jaw.glb` — jaw model (Blender, KHR_mesh_quantization)
