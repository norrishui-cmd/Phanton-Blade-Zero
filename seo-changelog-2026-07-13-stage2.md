# SEO Changelog - 2026-07-13 Stage 2

## Summary

Expanded the site from guide seed pages into a more scalable SEO publishing system.

## Added Pages

- `/html-sitemap/`
- `/templates/boss-guide-template/`
- `/templates/weapon-guide-template/`
- `/templates/quest-guide-template/`
- `/templates/item-guide-template/`
- `/guides/beginner-mistakes/`
- `/combat/defense-guide/`
- `/settings/language-subtitles/`
- `/questions/is-phantom-blade-zero-on-game-pass/`
- `/questions/is-phantom-blade-zero-steam-deck-compatible/`
- `/questions/does-phantom-blade-zero-have-character-creation/`
- `/comparisons/phantom-blade-zero-vs-sekiro/`
- `/comparisons/phantom-blade-zero-vs-ninja-gaiden/`

## Sitemap System

- Full sitemap now contains 84 HTML URLs.
- Added `sitemap-index.xml`.
- Added cluster sitemaps:
  - `sitemap-core.xml`
  - `sitemap-combat.xml`
  - `sitemap-story.xml`
  - `sitemap-technical.xml`
  - `sitemap-ops.xml`
- `robots.txt` now references both sitemap index and full sitemap.

## Quality Goal

The new template pages define publish gates for boss, weapon, quest, and item pages, which is essential before scaling toward hundreds or thousands of URLs.
