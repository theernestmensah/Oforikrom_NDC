# NDC Oforikrom Constituency website

The website of the National Democratic Congress (NDC), Oforikrom Constituency, Kumasi.

Built with [Astro](https://astro.build) and [Tailwind CSS](https://tailwindcss.com). It outputs plain, fast HTML that works on any web host and loads quickly on mobile data.

## Pages

| Page | What it does |
| --- | --- |
| Home (`/`) | Hero, community band, 2024 results, the Reset agenda, **branch finder**, news and events, TEIN and Youth, join call to action |
| About (`/about`) | The constituency, its four zonal councils and 15 electoral areas, the party and its motto |
| Leadership (`/leadership`) | Constituency executives and the Municipal Chief Executive |
| News (`/news`) | News list and individual articles, with WhatsApp, Facebook and X sharing |
| Events (`/events`) | Upcoming and past events, with "Add to Google Calendar" links |
| Get involved (`/get-involved`) | Join and volunteer form, volunteer roles, TEIN, dues and donations |
| Contact (`/contact`) | Contact details, contact form and common questions |

## Running it on your computer

You need [Node.js](https://nodejs.org) 22 or newer.

```bash
npm install
```

```bash
npm run dev
```

Then open http://localhost:4321. Changes you save appear straight away.

## Before going live

Work through this list. Everything you need to change is in `src/data/`.

1. **Contact details** in `src/data/site.ts`: WhatsApp number, phone, email, office address, social media links. Anything left empty is hidden.
2. **Forms** in `src/data/site.ts`. Pick one:
   - Set `contact.whatsapp`. Forms open WhatsApp with the person's details filled in, ready to send to that number. No account needed.
   - Or set `forms.endpoint` to a [Formspree](https://formspree.io) form URL to receive submissions by email.
3. **Executives** in `src/data/leaders.ts`: add names, phone numbers and photos as they are confirmed.
4. **Branch contacts** in `src/data/areas.ts`: add a coordinator name and WhatsApp number for each electoral area if you want people to reach branches directly.
5. **Events** in `src/data/events.ts`: the three events marked `sample: true` are placeholders. They show on your computer but are **left out of the live site**. Replace them with real events.
6. **Logo** in `src/data/site.ts`: put the official NDC logo file in `public/images/` and set `logo: '/images/your-logo.png'`.
7. **Domain** in `astro.config.mjs` (`site`) and `public/robots.txt`: replace `ndc-oforikrom.example.com` with the real web address.
8. **Check the facts** on the About and Home pages (electoral areas, results, MCE) against the latest official information.

### Photos the site is ready for

While running locally, empty photo slots show a small "Photo needed" label. On the live site they show a Kente pattern instead, so nothing looks broken.

- Hero: a rally or community photo (`photos.hero` in `site.ts`, landscape or portrait)
- Youth section: students or Youth Wing members at KNUST (`photos.youth`, portrait 4:5)
- Each executive: a head-and-shoulders portrait (`src/data/leaders.ts`)
- News covers: landscape 16:9 (`image:` at the top of each news post)

Put photos in `public/images/`. Keep each one under about 300 KB so pages stay fast on mobile data (resize to around 1600px wide and save as JPG or WebP).

## Adding a news post

1. Copy any file in `src/content/news/`, for example `become-a-polling-agent.md`.
2. Rename it. The file name becomes the web address, e.g. `branch-forum-recap.md` becomes `/news/branch-forum-recap`.
3. Edit the details between the `---` lines at the top:

```yaml
---
title: 'Headline of the post'
date: 2026-11-15
excerpt: 'One or two sentences shown in news lists and when shared on WhatsApp.'
tag: Announcement # Announcement, Explainer, Guide, Get involved or Press release
image: '/images/news/branch-forum.jpg' # optional
imageAlt: 'What the photo shows' # optional
featured: false # set true to show it first on the home page
---
```

4. Write the article below the second `---` in plain text. Use `## ` for subheadings, `- ` for bullet points and `[link text](https://...)` for links.

## Publishing the site

```bash
npm run build
```

This creates a `dist` folder containing the finished website. You can:

- **Upload it to any host** (cPanel or FTP): upload everything inside `dist`.
- **Use a free static host** such as Cloudflare Pages, Netlify or Vercel: connect the project and set the build command to `npm run build` and the output folder to `dist`.

To preview the finished build on your computer first, run `npm run preview`.

## Design notes

- **Colours** are the party's red, green, black and white. Red is used for actions (buttons and links), green for progress and confirmation. The site supports light and dark mode, following the visitor's phone settings, with a toggle in the header.
- **Kente patterns** are generated in code from simple shapes (`src/lib/kente.ts`), drawing on the woven strips of Kumasi's Kente tradition. No image files are needed.
- **Fonts**: Bricolage Grotesque for headings, Figtree for text. Both are bundled with the site.
- **Accessibility**: keyboard navigation, a skip link, labelled forms with clear error messages, and reduced motion for visitors who turn animation off.

## Where the facts come from

- Electoral areas and zonal councils: Oforikrom Municipal Assembly composite budgets (Ministry of Finance, 2023 and 2025).
- 2024 results: [Graphic Online](https://www.graphic.com.gh/ghana-elections/ashanti/oforikrom-constituency-presidential-and-parliamentary-results-election-2024.html) and [GhanaWeb](https://www.ghanaweb.com/elections/2024/constituency-results/Oforikrom-319).
- Municipal Chief Executive: [Oforikrom Municipal Assembly](https://ofkma.gov.gh).
- No-Fees-Stress launch (July 2025): [Ghana News Agency](https://gna.org.gh/2025/07/president-mahama-launches-no-fees-stress-policy/).
