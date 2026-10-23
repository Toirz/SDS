# NUS SDS Datathon 2027

English-language event website built with Next.js App Router, React, strict TypeScript and Tailwind CSS. The content retains the historical 2026 dates; registration buttons open the user-supplied Google Form. No API keys, cloud accounts or external services are required to run the project. All project content, documentation and implementation handoffs use English.

## Run locally

Use **Node.js 24 LTS**, tested with **24.20.0**, and **npm 11.19.0**. With nvm:

```bash
nvm install
nvm use
npm ci
npm run dev
```

Open http://localhost:3000. If Node.js 24 is already installed, only the two npm commands are needed.

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Build for production without downloading remote fonts |
| `npm run start` | Start the production server after building |
| `npm run lint` | Run ESLint; warnings also fail the check |
| `npm run typecheck` | Generate route types and run strict TypeScript checks |
| `npm test` | Check CTA states, safe URLs and dates across timezones with Node.js's built-in test runner |

To check and run the production version:

```bash
npm test
npm run lint
npm run typecheck
npm run build
npm run start
```

`npm run start` serves the production build at **http://localhost:3000**. After updating and rebuilding, stop the old server with `Ctrl+C` and run `npm run start` again; a running server can retain HTML from the previous build and request CSS/JS files that no longer exist. The approved design is available on port 3000 as a local deployment.

## Main structure

```text
src/app/                    Route /, layout, metadata, CSS and 404 page
src/components/layout/      Header, footer and mobile navigation
src/components/ui/          Shared container and section heading
src/features/event/         Configuration, types, registration logic, tests and sections
public/images/              Website logo
docs/                       Architecture, content editing guide and roadmap
References/                 Original user-supplied images, preserved unchanged
```

## Edit content and registration

Edit **`src/features/event/config.ts`** to change content, dates, venue, prizes, email, Instagram or the logo path. Dates use `YYYY-MM-DD` without a time. The date FAQ and timeline share the same date values. See the [content editing guide](docs/content-editing.md) for individual settings.

Registration uses two fields in the same file:

```ts
registrationUrl: "https://docs.google.com/forms/d/e/1FAIpQLSdu4_BHd9Aua3wc7cBTvlvC2P0KJeHwNw_lZVO8UYO1ft-jYg/viewform",
registrationStatus: "open",
```

When replacing the form, enter an absolute URL starting with `https://` or `http://` and keep the status as `"open"`. Disable registration with `registrationUrl: null` and `registrationStatus: "unavailable"`.

Close registration with `registrationStatus: "closed"`. Closed status always takes priority; a missing or invalid URL always disables the CTA. All CTAs use `RegistrationCTA`; active links open a new tab with an announcement for screen readers. **Status never changes automatically based on the current date.** Production requires a rebuild after configuration changes.

Colors, fonts, spacing and radii are defined at the top of **`src/app/globals.css`**. The sun/moon button in the header switches between the light theme (white background, black text and the original yellow highlights) and the dark theme (navy-black `#0A0D14` background inspired by [LifeHack 2026](https://lifehack2026.nuscomputing.com/), white text and `#0D1118` information panels). The default is dark; the preference is saved in localStorage and restored before the page appears. If the browser blocks storage, the button still switches the current page's theme. Palettes are in `:root` (dark) and `:root[data-theme="light"]` (light), with typography and spacing inspired by [Notion](https://www.notion.com/). The [Inter](https://rsms.me/inter/) font is stored at **`public/fonts/InterVariable.woff2`**, with its license at **`public/fonts/Inter-LICENSE.txt`**; no external font service is used during builds or page visits. The production logo at **`public/images/sds-logo.jpg`** is an unchanged copy of `References/sds_logo.jpg`. When replacing it, update the path, dimensions and alt text in the configuration; preserve its original proportions and place logos with white backgrounds on a light surface.

## Scope and future deployment

Implemented features include the landing page, mobile navigation, CTAs, FAQ with smooth 300 ms expand/collapse transitions, 404 page, title/description/text Open Graph metadata and reduced-motion support. Most of the interface uses Server Components; the header, mobile navigation, hero title and individual FAQ entries use Client Components. The FAQ supports Enter/Space, allows each answer to remain open independently and disables animation for reduced motion. Reloading resets the scroll position to the top, including URLs with fragments; the header divider appears only after scrolling and disappears at the top.

Browser tests for header scrolling, title typing, theme switching and FAQ animations are in `tests/header-scroll.test.mjs`, `tests/hero-typing.test.mjs`, `tests/theme-toggle.test.mjs` and `tests/faq-animation.test.mjs`. Run them against a local server on port 3000 with Playwright/Chromium installed outside the project: `NODE_PATH=/path/to/browser-tools/node_modules node --test tests/*.test.mjs`.

Authentication, a database, an internal registration form, dashboards, chat, team management and Team Finder are outside the current scope. See the [architecture](docs/architecture.md) and [roadmap](docs/roadmap.md).

No domain or hosting service has been selected. Once a domain is available, add `metadataBase`, canonical metadata and the real Open Graph URL in `src/app/layout.tsx`; add a social preview image only when an approved asset is available. No placeholder production URL is configured.

## Versions and dependency notes

Versions are pinned in `package-lock.json`: Next.js 16.4.0, React 19.3.0, Tailwind CSS 4.3.3, TypeScript 5.9.3 and ESLint 9.39.5. Setup follows the official documentation for [Next.js](https://nextjs.org/docs/app/getting-started/installation), [ESLint with Next.js](https://nextjs.org/docs/app/api-reference/config/eslint), [Tailwind CSS](https://tailwindcss.com/docs/installation/framework-guides/nextjs) and [Node.js LTS](https://nodejs.org/en/about/previous-releases).

The existing dependency review records ESLint 9 as past support but compatible with the React, import and accessibility plugins used by `eslint-config-next@16.4.0`. Do not force its peer dependencies onto ESLint 10. Reassess the upgrade when Next.js updates its plugins.

On 12 October 2026, `npm audit --omit=dev` reported no vulnerabilities. The full audit reported five high-severity findings, all originating from `braces` in the lint tooling. At that review, [advisory GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm) had no patch. The project's glob patterns are internal; the website does not pass visitor input to this tool. Keep the compatible lint configuration; do not run `npm audit fix --force` to downgrade the Next.js configuration to an older major. Review again by **12 November 2026** or before deployment, whichever comes first.

No poster image has been supplied. Event content uses facts from `Prompt.txt`; the source post is stored in the configuration for future manual reference.

## Initial verification results

On 12 October 2026:

- A clean `npm ci` completed successfully with no invalid peer dependencies.
- `npm test`: five tests passed, covering registration status/URL combinations and dates in three timezones.
- Lint passed without errors or warnings; strict typechecking and the production build passed. Route `/` was statically prerendered.
- Chromium checks at 320, 390, 768, 1024 and 1440px confirmed that images loaded, no horizontal overflow occurred and the main page had no console errors or failed requests.
- Checks covered the skip link, Tab/Enter, Escape and focus restoration in the menu, anchor navigation, menu closure when switching to desktop, keyboard FAQ controls, the default disabled CTA and the 404 return link.
- Axe found no WCAG 2 A/AA or 2.1 AA violations at those widths, including with the menu and FAQ open. This was automated testing, not a complete screen reader assessment.
- Both reference websites were opened in Chromium. Browser tools were installed outside the project without adding application dependencies.

That initial verification did not cover Firefox/Safari, physical mobile devices or the real registration form, whose URL had not yet been supplied. The website had not been deployed publicly.

## Verification after the redesign

On 12 October 2026, Chromium checks at 320, 390, 768, 1024 and 1440px found no horizontal overflow. Local Inter loaded successfully; the background was white and headings used weight 650. Desktop navigation was centered in the viewport, with the logo and registration controls 24px from the edges; hover and pressed states used gray backgrounds. Section padding was reduced to 32–48px; page height at 1440px decreased from approximately 4,493px to 3,001px. Dates, venue, eligibility and prizes had dedicated panels with icons, borders and yellow highlights. Menu, FAQ, anchor navigation, skip link, keyboard controls, unavailable CTAs and the 404 page all passed. Axe found no WCAG 2 A/AA or 2.1 AA violations, including with the menu and FAQ open; no console errors or failed requests occurred. The browser and deployment limitations above still apply to that verification.
