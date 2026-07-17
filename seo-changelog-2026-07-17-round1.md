# SEO Round 1 — 2026-07-17

## Outcome

- Audited 114 HTML route pages plus the custom 404 page.
- Kept 75 player-facing, canonical URLs in generated segmented sitemaps.
- Added `noindex, follow` to 39 operations, empty-template, or pre-launch placeholder pages.
- Removed the operations sitemap from the sitemap index and removed the duplicate sitemap declaration from `robots.txt`.
- Added automatic sitemap generation and an SEO audit with zero blocking errors at handoff.

## New high-intent pages

- `/questions/is-phantom-blade-zero-on-xbox/`
- `/questions/is-phantom-blade-zero-on-ps4/`
- `/questions/is-phantom-blade-zero-ps5-exclusive/`
- `/questions/can-you-preorder-phantom-blade-zero/`
- `/questions/how-many-weapons-in-phantom-blade-zero/`
- `/questions/how-many-phantom-edges/`

## Strengthened pages

- Homepage: corrected countdown to the official 02:00 UTC PlayStation time and removed public links to SEO operations/templates.
- Release date: direct answer, official time, old-date explanation, platform status, preorder status, and Article schema.
- Platforms: official PS5/Steam evidence table and unannounced-platform distinctions.
- PC and PS5 answers: official store evidence and feature-status separation.
- Open-world answer: cited S-GAME's official semi-open-world description.
- Weapons: confirmed 30+ weapons, 20+ Phantom Edges, acquisition statement, and launch database fields.
- Questions/search/HTML sitemap: player-facing architecture and links to the new intent pages.

## Indexation holds

Operations and publishing-template pages are noindexed. Empty pre-launch databases for bosses, builds, achievements, collectibles, endings, materials, settings, quests, walkthroughs, and “best” pages are also noindexed until their page-specific evidence is available. Files remain in place so they can be completed and re-enabled without breaking internal plans.

## Validation commands

```bash
node scripts/generate-sitemaps.mjs
node scripts/seo-audit.mjs
```

The final audit reported zero broken links, duplicate metadata errors, canonical mismatches, invalid JSON-LD blocks, or sitemap/indexation mismatches. Remaining word-count warnings are a review queue, not proof that a concise direct-answer or hub page is invalid.
