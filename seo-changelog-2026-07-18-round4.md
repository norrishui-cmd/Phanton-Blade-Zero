# SEO Round 4 — Languages, PC Purchase Intent, and Structured Data

Date: 2026-07-18  
Canonical origin: `https://phantombladezerowiki.wiki`

## Outcome

- HTML routes: 124 → 132
- Indexable URLs: 85 → 93
- New indexable pages: 8
- SEO audit errors: 0
- Thin-content warnings: 0
- BreadcrumbList coverage: every indexable non-home page
- Homepage WebSite schema: added
- Sitemaps: regenerated with the canonical origin and current `lastmod`

## New search-intent cluster

- `/languages/`
- `/questions/what-languages-does-phantom-blade-zero-support/`
- `/questions/does-phantom-blade-zero-have-english-voice-acting/`
- `/questions/does-phantom-blade-zero-have-chinese-voice-acting/`
- `/questions/does-phantom-blade-zero-support-japanese/`
- `/questions/does-phantom-blade-zero-have-denuvo/`
- `/questions/does-phantom-blade-zero-support-steam-family-sharing/`
- `/questions/is-phantom-blade-zero-an-action-rpg/`

## Verified facts used

The current official Steam listing shows 15 supported interface/subtitle languages. English and Simplified Chinese are marked for full audio. It also identifies Windows 10/11 64-bit, single-player, Family Sharing, and third-party Denuvo DRM. PlayStation continues to list PS5, one player, DualSense vibration and trigger effects, Game Help, and an October 29, 2026 release at 02:00 UTC.

## Quality controls

- Language support distinguishes interface, subtitles, and full audio.
- Traditional Chinese and Japanese are not described as dubbed because Steam does not mark full audio for those rows.
- Denuvo and Family Sharing pages show a checked date because storefront configuration can change.
- Breadcrumb schema uses the canonical domain and is now enforced by the audit script.
- No unconfirmed boss, weapon, quest, ending, or performance claim was added.

## Validation

```bash
node scripts/generate-sitemaps.mjs
node scripts/seo-audit.mjs
```

Expected result: `132 HTML pages; 93 indexable; 0 errors; 0 warnings.`

## Recommended next trigger

The next major content expansion should follow the dedicated Phantom Blade Zero State of Play announced for later in summer 2026. Convert only explicitly named mechanics, characters, locations, weapons, enemies, and systems into indexable entity pages.
