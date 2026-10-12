# Architecture

## Application boundary

One Next.js App Router application serves the public event page at `/`. There is no separate backend, database, API route or authentication. `Prompt.txt` is the supplied specification and remains unchanged.

`src/app/page.tsx` composes small event sections. The root layout provides the shared header, footer, skip link and metadata. The explicit not-found page returns visitors to the event.

## Content and behavior

`src/features/event/config.ts` is the typed source of event facts, editorial copy, links and registration settings. `types.ts` defines the contract. ISO date-only strings are formatted explicitly in UTC so the server timezone cannot shift a date.

`registration.ts` accepts only absolute HTTP(S) destinations for an explicitly open registration. Closed takes priority; unavailable, missing or invalid destinations return a disabled state. Every public registration control uses `components/registration-cta.tsx`, including the FAQ. The FAQ description reflects the same validated state.

The configuration is compiled into the page, so production content updates require a new build. No request to an external service is needed to render the event.

## Rendering and dependencies

Page sections, header, footer and CTA are Server Components. Only `mobile-navigation.tsx` is a Client Component; it receives navigation links and the rendered CTA as children. It is a disclosure menu, supports Escape, restores focus to its toggle on Escape, and moves focus to a selected anchor target. Native details/summary handles FAQ interaction without JavaScript.

Tailwind CSS is wired through its PostCSS plugin. Shared visual patterns use CSS classes and tokens; the page needs no global state, icon package, animation package, generic button wrapper or CMS. System fonts remove build-time font downloads. The supplied JPG remains unchanged and Next Image serves appropriately sized copies.

Node.js 24 LTS and exact stable dependency versions are recorded in `.nvmrc`, `package.json` and the npm lockfile. Node's built-in runner executes the small TypeScript behavioral tests directly. ESLint runs separately from the build, using the installed Next.js flat configuration.

## Design contract

The screen introduces the competition, makes dates and eligibility easy to find, and directs visitors to a real external form only when configured. Its default registration state is unavailable, with no implication of a future opening.

The visual identity uses charcoal, warm off-white, yellow and amber from the supplied logo's direction. A large dark hero leads into light editorial sections, compact factual details, ordered activity rows, a simple timeline and a yellow prize band. The geometric SVG is decorative; it represents no dataset or event statistics and does not recreate the SDS logo.

Navigation collapses below 768px. Sections stack on mobile, touch targets remain comfortable, focus is visible, and reduced-motion preferences disable smooth scrolling and transitions. Required layout checks cover 320, 768, 1024 and 1440px, plus 390px.

The references [LifeHack](https://lifehack2026.nuscomputing.com/) and [NEBULA X](https://nebulax.com.sg/) inform navigation hierarchy, facts near the hero, anchor navigation and control consistency. Their branding, copy, event details and images are not reused. Countdown, glow and decorative intro animations are outside this design.

## Remaining deployment configuration

Add a real production domain, canonical URL and approved social preview asset when available. No hosting vendor or paid service has been selected. Dependency audit limitations and the next review date are recorded in the README.
