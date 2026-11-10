# Datathon promo video (Remotion)

A 33-second 16:9 promo for the competition site. Every fact on screen is read from
`../src/features/event/config.ts`, so the video only shows public, participant-facing
information and stays in sync with the website.

```bash
cd video
npm ci
npm run studio      # preview and scrub in the browser
npm run render      # out/datathon-promo-16x9.mp4
npm run render:webm # out/datathon-promo-16x9.webm
npm run poster      # out/datathon-promo-poster.jpg
npm run publish     # render both and copy them to ../public/videos for the hero
```
