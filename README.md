# FOUR YEARS, TWO STARS

Interactive anniversary prototype for Linh Lan x Lan Linh.

## Run

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Prototype Scope

- Vite + React + TypeScript.
- Motion for React for section and UI animation.
- Canvas starfield and cursor trail.
- Fixed Visual Novel overlay system with replaceable character art placeholders.
- localStorage progress, profile, achievements, Starlog, tarot, gacha, and stars.
- Tone.js audio manager skeleton only; audio starts after a user gesture.
- Long-scroll gated journey: Constellation, Scrapbook, Tarot, Gacha, Finale.

## Phase 2 TODO

- Replace character placeholders by setting `artSrc` in `src/data/guides.ts`.
- Replace scrapbook/gacha/tarot placeholder copy with final anniversary content.
- Add real music stems and mood layers inside `src/lib/audioManager.ts`.
- Expand constellation puzzles and hidden Starlog entries.
- Add final assets, QA screenshots, and browser-console regression checks once the in-app browser runtime is available.
