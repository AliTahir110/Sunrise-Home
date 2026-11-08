# Sunrise Homes Services

Local Next.js App Router website with TypeScript, Tailwind CSS 4, GSAP ScrollTrigger, Lucide icons and locally hosted Manrope / Inter fonts. The supplied green-and-gold logo is stored at `public/Brand/sunrise-logo.png` and displayed without cropping or distortion.

## Run locally

Use Node.js 22.9+ (Node 24 recommended).

```sh
npm ci
npm run dev
```

Open http://127.0.0.1:3000. On this Mac, Node is installed through nvm; run `source ~/.nvm/nvm.sh && nvm use 24` if node is not on PATH.

```sh
npm run lint
npm run typecheck
npm run build
npm start
```

## Pages and editing

Home, About, Services, Accommodation, Referrals, Safeguarding, Contact, Careers, Privacy and Cookies are implemented. Shared contact details and services are in `data/site.ts`; internal page content is in `app/[slug]/page.tsx`. Home sections are in `app/page.tsx`. Global responsive styling is in `app/globals.css`.

Desktop storytelling uses native scrolling with a limited GSAP pin; mobile and reduced-motion users see all three stages in normal document flow. GSAP contexts clean up on navigation. Reveals preserve readable server-rendered content if scripts fail. GSAP handles the React-rendered Split Text entrance and scroll reveals; Motion handles bento hover, the sunrise motif, story/gallery crossfades and form feedback. CSS handles button, accordion and sheet transitions. Radix primitives provide FAQ and modal keyboard/focus behaviour. See THIRD-PARTY-NOTICES.md for sources and licenses.

## Enquiries and careers applications

General and referral forms validate locally, use a honeypot, and prepare a `mailto:` draft only after the visitor presses Prepare Email. The visitor must review and send from their email app; those forms do not upload or store information on the website.

The Careers page has a multipart application form with server-side field, file-type and 5 MB size validation, a honeypot and basic rate limiting. It delivers applications and PDF/DOC/DOCX résumés through the Resend email API only when `RESEND_API_KEY`, `CAREERS_FROM_EMAIL` and optionally `CAREERS_TO_EMAIL` are configured. Copy `.env.example` to `.env.local` for local development and set the same secrets in Render. The sending domain must be verified with the provider. Without those variables, the form shows the recruitment email fallback and does not accept the application. Before production use, approve the recruitment privacy/retention process, add appropriate malware scanning and spam protection, and ensure access to the receiving inbox is restricted.

## Deployment (not performed)

Deploy only after business approval and completing `LAUNCH-CHECKLIST.md`. A Node-compatible Next.js host can run `npm ci`, `npm run build`, and `npm start`. Put HTTPS and your approved domain in front of the server. Update `data/site.ts` if the canonical domain changes. Metadata, organisation JSON-LD, `/sitemap.xml` and `/robots.txt` are included. Keep preview/staging deployments private or configure noindex there. Do not point production DNS at this project until approved.

## Content sources

Reviewed 17 October 2026:
- https://www.sunrisehomesservices.com/index.html — organisation, East Midlands, 16+, general telephone, company number.
- https://sunrisehomesservices.com/contact.html — general and referral email addresses; urgent placement telephone.
- https://sunrisehomesservices.com/referrals.html — planned placement discussions and visits, urgent availability caveat.
- https://sunrisehomesservices.com/services.html — support areas; historical page, confirm current offer before launch.
- https://sunrisehomesservices.com/about.html — manager summaries and staff development.
- https://sunrisehomesservices.com/careers.html — recruitment approach and jobs inbox; its different postal address is not used as the registered office.
- https://sunrisehomesservices.com/privacy.html — linked published organisational notice, not copied or treated as approval of new website wording.

Manager summaries use the published About page; time-dependent experience totals are omitted. No testimonials, accreditation or regulatory registration claims have been added. The accommodation gallery is explicitly labelled illustrative; verified property photographs are still required before presenting actual homes.

## Images

Locally hosted illustrative stock photographs under the Unsplash license (https://unsplash.com/license). Images are not represented as Sunrise properties or residents.
- Living room: https://images.unsplash.com/photo-1600210492486-724fe5c67fb0
- Kitchen: https://images.unsplash.com/photo-1484154218962-a197022b5858
- Sunrise: https://images.unsplash.com/photo-1470252649378-9c29740c9fa8

## Verification and limitations

Production build, TypeScript and ESLint pass. Production dependency audit reports zero vulnerabilities. The full audit reports five high-severity entries in the development-only eslint-config-next → fast-glob → micromatch → braces chain; npm suggests an incompatible Next 14 lint-config downgrade. Review upstream fixes before using lint tooling on untrusted patterns. No forced downgrade was applied.

Safari desktop checks verified homepage rendering, FAQ expansion, gallery switching, lightbox opening, keyboard image navigation and Escape dismissal, and client-side navigation from the animated homepage to Contact. An animation teardown issue found during navigation was fixed by reverting GSAP pinning in layout-effect cleanup and keeping split headline markup under React ownership. Mobile viewport checks, reduced-motion runtime behaviour and Lighthouse scores remain unverified. Responsive layouts, visible focus, semantic landmarks, form labels, native validation and reduced-motion fallbacks are implemented; no WCAG certification is claimed.

## Render Web Service

Use branch `main`, leave Root Directory blank, set Build Command to `npm ci && npm run build`, and Start Command to `npm start`. Set `NODE_VERSION=24`. No publish directory is required. The production start script binds to `0.0.0.0`; Next.js reads Render’s `PORT` environment variable automatically (3000 locally when unset). Development remains bound to localhost.
