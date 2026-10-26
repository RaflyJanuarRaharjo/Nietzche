# Nietzsche — landing page

Next.js (App Router) + Tailwind v4 build of the Figma frame
`🏀 Dribbble Shot › Frame 100` (node 353:883).

## Run (Windows CMD)

```
npm install
npm run assets
npm run dev
```

Open http://localhost:3000

`npm run assets` downloads every image/SVG from Figma into `public\figma\`.
The Figma export links expire ~7 days after 26 Oct 2026 — run it before then.
If they expire, re-export the five section nodes from Figma and update `PREFIX`
in `scripts\download-figma-assets.mjs`.

## Structure

```
src/app/page.tsx                    page composition
src/components/Navbar.tsx           sticky nav + mobile menu
src/components/Hero.tsx             headline + interactive prompt box
src/components/Intro.tsx            "We are … a team of AI agents" with inline mascots
src/components/Agents.tsx           5 agent cards
src/components/illustrations/       layered isometric art (Default + Hover variants)
src/components/Testimonial.tsx      quote carousel (add quotes to the array)
src/components/CtaFooter.tsx        CTA, floating prop scene, footer
```

## Notes

- Hover an agent card: illustration layers lift, using the Figma Hover variant positions.
- Fonts: SF Pro → system / Inter fallback; Hannari → Noto Sans (what the Figma export renders).
- Respects `prefers-reduced-motion`.
