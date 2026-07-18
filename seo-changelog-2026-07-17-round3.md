# SEO Round 3 — Content Quality and Verified Long-Tail Expansion

Date: 2026-07-17  
Canonical origin: `https://phantombladezerowiki.wiki`

## Outcome

- HTML routes: 120 → 124
- Indexable URLs: 81 → 85
- SEO audit errors: 0
- Thin-content warnings: 41 → 0
- Sitemaps regenerated with the canonical domain and current `lastmod`

## New verified question URLs

- `/questions/can-you-get-enemy-weapons/`
- `/questions/can-you-use-enemy-signature-techniques/`
- `/questions/is-phantom-blade-zero-inspired-by-hong-kong-action-movies/`
- `/questions/is-phantom-blade-zero-related-to-rainblood/`

## Content upgraded

Expanded 41 indexable pages across beginner, combat, comparison, lore, story, guides, platforms, updates, trailers, sources, and pending-feature answers. The upgrades separate confirmed public facts from release-version tests and avoid presenting demo-era terminology or genre assumptions as final mechanics.

## Primary evidence used

- Official Steam page: story premise, 30+ weapons, 20+ Phantom Edges, enemy weapons and signature techniques, Hong Kong action-film influence, Unreal Engine 5, and motion capture.
- Official PlayStation store: October 29, 2026 timing, PS5, one-player listing, DualSense features, and Game Help.
- S-GAME's 2023 PlayStation Blog introduction: Rainblood lineage, The Order, Soul's 66-day cure, Kungfupunk, semi-open world, and combat direction.
- PlayStation's 2024 Summer Game Fest hands-on: demonstrated block, parry, dodge, and counterattack framing.
- PlayStation's June/July 2026 posts: October launch context and a dedicated State of Play planned for later in summer.

## Quality gate

Run:

```bash
node scripts/generate-sitemaps.mjs
node scripts/seo-audit.mjs
```

Expected result: `124 HTML pages; 85 indexable; 0 errors; 0 warnings.`

## Next round

After the dedicated State of Play, convert newly confirmed mechanics, characters, weapons, locations, and story entities into answer-first pages. Do not activate placeholder database URLs until each has a concrete answer and primary evidence.
