# Content editing

## Main content

Edit `src/features/event/config.ts`. `EventConfig` in `types.ts` checks the required content shape.

| Setting | Used for |
| --- | --- |
| `name`, `shortName`, `organizer`, `year` | Identity, hero, header, footer and metadata |
| `description` | Page description and basic Open Graph text |
| `hero` | Tagline used by the promo video; the typed hero title uses `name` and highlights `year` |
| `dates` | Registration window and event start/end used by the hero, overview and tests; the full schedule lives in the `dates` constant at the top of `config.ts` |
| `venue`, `audience`, `teamSize`, `entryFee` | Overview facts |
| `prizeAmount`, `prizes` | Total cash prize, per-category cash awards shown on the site (`categories`), and the perks list (`perks` and `intro` are used only by the promo video) |
| `overview`, `milestones` | Overview heading and the key dates timeline |
| `tracks` | Track heading and Category A/B names, and levels for the track panels (descriptions are used by the promo video) |
| `faq` | Factual questions and answers |
| `registrationMessages` | FAQ text for validated registration state |
| `closing` | Final call to action and contact copy |
| `contactEmail`, `instagramUrl` | Working contact links |
| `sourcePostUrl` | Original content reference; not a registration destination |
| `navigation` | Desktop and mobile anchor links |
| `logo` | Public asset path, alt text and intrinsic dimensions |

Keep dates as `YYYY-MM-DD`. The formatter fixes the timezone to UTC. Registration status never changes automatically with the date. Content follows the participant-facing parts of the Datathon Proposal AY26/27.

When changing a fact, also check any manually written FAQ answer about that fact. The date answer is derived automatically; other answers are editable text. Keep all project text in English, including visitor-facing content, documentation, code comments and handoffs.

Publish only what participants need. Keep organiser-only proposal details off the site: partner finalisation, internal grading, informal rankings, shortlist sizes, tentative room numbers, per-item costs and unconfirmed partner or dataset names. Do not add unverified prize allocations.

## Registration

Change both settings in `config.ts` when a destination is available:

```ts
registrationUrl: "https://YOUR-REAL-DESTINATION",
registrationStatus: "open",
```

Replace the sample with a real URL; do not paste the sample into production. Prefer HTTPS. Only absolute HTTP(S) URLs pass the validation.

| Status | URL | Visible behavior |
| --- | --- | --- |
| `unavailable` | Any | Disabled “Registration unavailable” |
| `closed` | Any | Disabled “Registration closed” |
| `open` | Missing or invalid | Disabled “Registration unavailable” |
| `open` | Valid HTTP(S) | “Register now” link, new tab, `noopener noreferrer`, accessible new-tab indication |

To close, set the status to `closed`. To disable registration without marking it closed, use `registrationUrl: null` and `registrationStatus: "unavailable"`. Do not use `#`, an empty string, a fake form or the old poster's registration destination.

`RegistrationCTA` is the only registration control implementation. Update its style once to update the header, mobile menu, hero, FAQ and closing section. The shared `.button` CSS also styles the ordinary event and return links.

## Visuals

Edit CSS variables in `src/app/globals.css` for colors, section spacing, radius and font families. Tailwind utilities remain available for local layout needs. Preserve readable contrast and keyboard focus when changing colors.

Replace or add the production logo in `public/images/`, then update `logo.src`, `logo.alt`, `logo.width` and `logo.height`. The original `References/sds_logo.jpg` is preserved. Do not distort or recolor it. The hero's SVG motif is decorative code, independent of the official logo.

There is no poster on the current page. A future poster can be a content reference or a properly sized image within a section, never a full-page background or an Instagram screenshot.

## Before sharing changes

Run `npm test`, `npm run lint`, `npm run typecheck` and `npm run build`. Check the page at mobile and desktop widths, open the menu with a keyboard, use Escape, open FAQ entries and verify every registration control has the intended state. Build again and restart production after editing content.
