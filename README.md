# Mahanakorn Thai Catering: website

The production version of the approved **v2 "Editorial"** design: a Next.js website with scroll animations, and an enquiry form that opens WhatsApp with the visitor's details ready to send (there is no backend).

```
mahanakorn-website/
└── frontend/   Next.js 14 (App Router, TypeScript), GSAP + ScrollTrigger, Lenis smooth scroll
```

## Run it locally

You need Node.js 18.18 or newer.

```bash
cd mahanakorn-website/frontend
npm install
npm run dev
```

Then open http://localhost:3000.

### Production build

```bash
cd frontend && npm run build && npm start      # website on :3000
```

### Checks

```bash
cd frontend && npm run typecheck
cd frontend && npm run build    # also type-checks
```

## Configuration

**frontend/.env.local** (see `.env.example`)

| Variable | What it does |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Public site URL, used for canonical links, the sitemap and social previews |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | WhatsApp Business number, digits with country code. **Leave empty and every WhatsApp button is hidden** (no dead links). |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Shown in the footer and privacy page |

`NEXT_PUBLIC_*` values are built into the site, so rebuild after changing them.

## API

| Method | Path | Body | Result |
|---|---|---|---|
| GET | `/api/health` | | `{ ok: true }` |
| POST | `/api/inquiries` | name, email, whatsapp, role, eventType (`wedding`, `party`, `corporate`, `private-dinner`, `pop-up`, `consulting`, `other`; defaults to `wedding`), date (`YYYY-MM`) or dateFlexible, destination, guests, functions[], need, diet[], hasPlanner, message | `201 { ok, id }` or `422 { ok:false, error, fields }` |
| POST | `/api/planner-pack` | name, company, email, whatsapp, upcoming | `201 { ok, id }` or `422` |
| GET | `/api/leads` | (admin token) | latest inquiries and planner-pack requests |

The posts are rate-limited to 10 per 15 minutes per IP and capped at 20 kB. A hidden "honeypot" field rejects simple bots. Every lead is saved **before** the email alert, so a mail failure never loses a lead.

## Editing content

- **Copy, dishes, food counters, wedding events, "How it works" steps and photos:** `frontend/src/lib/content.ts`
- **Site name, page addresses, nav labels, the main button wording ("Get a quote") and the WhatsApp message:** `frontend/src/lib/site.ts`
- **Photos:** `frontend/public/img/` (served through `next/image` as responsive AVIF/WebP). Replace the WhatsApp-compressed copies with the photographer's originals using the same file names.
- **Headings:** the `Split` component uses a small markup: `|` for a line break, `*word*` for italic serif, `**word**` for large italic serif.

Facts the client still has to confirm are marked in plain words on the page, for example `— guests (to confirm)`, `from THB — (to confirm)` and FAQ answers reading `Answer to confirm with Mahanakorn.` Search the code for `to confirm` to find them all.

## Pages

`/` Home · `/services` Our Services (Vows Beyond Borders, i.e. destination weddings, Private Events, Corporate Events and Fine Dining, with `#weddings`, `#parties`, `#company` and `#private` anchors; prices are not shown, they are given on request) · `/menu` Our Menu · `/get-a-quote` Get a quote (accepts `?event=weddings|parties|company|private`, `?type=indian` and `?ask=veg-menu|sample-menu|station-menu|joint-menu` to pre-fill the form) · `/privacy` · a 404 page · `/sitemap.xml` · `/robots.txt`

Old addresses redirect to the new ones: `/weddings`, `/indian-weddings` and `/events` → the matching part of `/services` (Indian weddings → Vows Beyond Borders), `/stations` → `/menu`, `/past-events`, `/celebrations` and `/past-weddings` (and their old Bali pages) → `/services`, `/planners` → `/services`, `/plan-your-menu` → `/get-a-quote` (see `frontend/next.config.mjs`).

## Bugs fixed from the design prototype

| # | Problem in the prototype | Fix in the code |
|---|---|---|
| 1 | "Menu" button showed on desktop | Header CSS fixed; the menu button only appears below 900px |
| 2 | Mobile menu could show on load (CSS overrode `hidden`) | Rendered from React state; `[hidden]` is enforced |
| 3 | Arrow characters garbled (mojibake) when served without UTF-8 | All icons are inline SVG; proper `<meta charset>` |
| 4 | Forms looked like they sent but sent nothing | Real API with validation, error messages per field, an error summary that takes focus, a loading state and server-error handling |
| 5 | Many `href="#"` dead links (WhatsApp, PDFs, privacy) | WhatsApp links come from config and hide when not set; "PDF" buttons now open the inquiry form pre-filled with the request; a real privacy page |
| 6 | Screen readers read split headings word by word | Each heading has one screen-reader copy; animated words are hidden from assistive tech |
| 7 | Header colour logic over dark sections was fragile | Header tone is tracked from two explicit states (over hero, over a dark section) |
| 8 | Page changes were full reloads, and the black curtain replayed on every page change | The black "mahanakorn" curtain plays once per visit. Page changes are client-side with a quick fade-out and fade-in. The intro can't replay even if a link is clicked mid-intro, and a safety timer restores the page if a navigation stalls |
| 9 | Leaving a page left scroll animations running | Each page's animations live in one GSAP context that is reverted on unmount |
| 10 | Leaving Home crashed React (`removeChild` error) because the pinned gallery is moved by GSAP | Each page sits in a wrapper keyed by the URL, so React replaces the wrapper instead of touching moved nodes |
| 11 | Hidden browser tabs pause animation frames, which could block navigation | Page transitions continue after 0.9s even if the animation is paused |
| 12 | `92vh` hero jumped on mobile when the address bar moved | Uses `svh` units with a `vh` fallback |
| 13 | Giant marquee text could cause sideways scrolling | `overflow-x: clip` on the page; verified no horizontal scroll at 375px |
| 14 | Pinned horizontal gallery fought touch scrolling | Pinning only on desktop with a mouse; touch devices get native swipe with snap |
| 15 | Floating thumbnail and "View" cursor appeared on touch screens | Limited to fine pointers |
| 16 | The film button did nothing | Disabled and labelled "Film coming soon" until the video exists |
| 17 | Scroll-lit text was grey (unreadable) when motion was off | Readable by default; greyed only by the animation |
| 18 | Content could stay hidden if scripts failed | Entrance states only apply after a pre-paint script confirms motion is allowed, with a 4s fallback |
| 19 | No reduced-motion handling for the hero zoom | Pause button for the hero zoom; all motion off for reduced-motion users |
| 20 | Unoptimised images, no SEO basics | `next/image`, per-page titles and descriptions, canonical URLs, Open Graph, JSON-LD (FoodEstablishment), sitemap and robots |
| 21 | No skip link; mobile menu had no focus handling | Skip link, focus trap in the mobile menu, Escape closes it, focus returns to the button |

## Deploying

- **Website:** Vercel, Netlify or any Node host (`npm run build && npm start`). Set the `NEXT_PUBLIC_*` variables before building.
- **API:** Render, Railway, Fly.io or a small VPS (`npm start`). Set `FRONTEND_ORIGIN` to the live site URL and `TRUST_PROXY=1` behind a proxy. Use a persistent disk for `DATA_DIR`, or swap `src/lib/store.js` for a database (the routes don't need to change).
