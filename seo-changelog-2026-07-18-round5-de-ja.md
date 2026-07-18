# SEO Round 5 — German and Japanese Launch

Date: 2026-07-18  
Canonical origin: `https://phantombladezerowiki.wiki`

## Outcome

- HTML routes: 132 → 158
- Indexable URLs: 93 → 119
- German pages: 13
- Japanese pages: 13
- SEO audit errors: 0
- Thin-content warnings: 0
- Reciprocal hreflang: English, German, Japanese, and x-default
- Dedicated language sitemaps: `sitemap-de.xml` and `sitemap-ja.xml`

## German routes

- `/de/`
- `/de/erscheinungsdatum/`
- `/de/plattformen/`
- `/de/sprachen/`
- `/de/kampf-guide/`
- `/de/anfaenger-guide/`
- `/de/fragen/`
- `/de/fragen/phantom-blade-zero-ps5/`
- `/de/fragen/phantom-blade-zero-pc/`
- `/de/fragen/phantom-blade-zero-xbox/`
- `/de/fragen/ist-es-einzelspieler/`
- `/de/fragen/ist-es-open-world/`
- `/de/pc-systemanforderungen/`

## Japanese routes

- `/ja/`
- `/ja/発売日/`
- `/ja/対応機種/`
- `/ja/対応言語/`
- `/ja/戦闘ガイド/`
- `/ja/初心者ガイド/`
- `/ja/よくある質問/`
- `/ja/よくある質問/ps5版はある/`
- `/ja/よくある質問/pc版はある/`
- `/ja/よくある質問/xbox版はある/`
- `/ja/よくある質問/シングルプレイ専用/`
- `/ja/よくある質問/オープンワールド/`
- `/ja/pc動作環境/`

## Localization rules

- Pages are independently written for local search intent rather than copied through a generic translation template.
- German pages state that German interface and subtitles are confirmed but German full audio is not.
- Japanese pages state that Japanese interface and subtitles are confirmed but Japanese full audio is not.
- Release, platform, language, controller, DRM, and system-requirement claims remain tied to official Steam, PlayStation, and S-GAME sources.
- Unconfirmed bosses, quests, items, endings, and performance targets remain outside the localized sitemap.

## Technical implementation

- Each localized page has a self-canonical URL and matching `<html lang>` value.
- The 13 English counterparts now link reciprocally to German and Japanese alternatives.
- Every localized page includes `en`, `de`, `ja`, and `x-default` hreflang links.
- `sitemap-index.xml` now references six segmented sitemaps: core, combat, story, technical, German, and Japanese.
- The audit uses a Japanese character-based content threshold instead of an English whitespace word count.

## Validation

```bash
node scripts/generate-sitemaps.mjs
node scripts/seo-audit.mjs
```

Expected result: `158 HTML pages; 119 indexable; 0 errors; 0 warnings.`

## Next localization wave

Expand only after GSC shows impressions for the first 13-page clusters. Recommended next pages: release time by region, DualSense/controller support, Steam Deck status, English/Chinese audio, Denuvo, weapon count, Phantom Edge count, Kungfupunk, Soul, and the 66-day premise.
