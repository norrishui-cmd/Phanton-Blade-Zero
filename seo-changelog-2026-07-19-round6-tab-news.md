# SEO Round 6 — News Modules for Every Primary Tab

Date: 2026-07-19  
Canonical origin: `https://phantombladezerowiki.wiki`

## Outcome

- HTML routes: 158 → 195
- Indexable URLs: 119 → 156
- Independent NewsArticle URLs: 30
- Section news indexes: 6
- All-news hub: 1
- SEO audit errors: 0
- Thin-content warnings: 0
- AdSense coverage: 195/195 pages

## Tab coverage

Each primary navigation tab now includes a visible five-story news module and a dedicated news index:

- Release: 5 articles under `/release-date/news/`
- Beginner: 5 articles under `/beginners-guide/news/`
- Combat: 5 articles under `/combat-guide/news/`
- Weapons: 5 articles under `/weapons/news/`
- Bosses: 5 articles under `/bosses/news/`
- About: 5 editorial and technical articles under `/about/news/`

The root `/news/` page links all 30 stories and identifies the corresponding tab.

## Content policy

- Release news covers the October 29 date, Steam/PS5 date display, dedicated State of Play, pending buying details, and global unlock tracking.
- Beginner news covers controller recommendation, 15 languages, single-player status, semi-open world, and spoiler-free preparation.
- Combat news covers block/parry/dodge, genre framing, kungfu choreography, controller support, and the State of Play mechanics watchlist.
- Weapon news covers 30+ weapons, 20+ Phantom Edges, enemy weapon rewards, signature techniques, and the database quality gate.
- Boss news covers powerful-foe rewards, PlayStation hands-on boss coverage, the unpublished roster, spoiler-free preparation, and boss-guide verification standards.
- About news records sourcing policy, domain migration, German/Japanese rollout, AdSense configuration, and the sitemap quality gate.

No invented boss, weapon, quest, reward, or performance claim was added.

## Technical implementation

- Every story has a unique title, meta description, canonical URL, H1, and main content.
- Every story includes NewsArticle and BreadcrumbList JSON-LD.
- Every section index and the root news hub include BreadcrumbList schema.
- The audit now requires NewsArticle schema on independent news URLs.
- Sitemaps were regenerated and include all 37 new indexable pages.
- The AdSense installer was rerun so all new pages include the ownership script and account meta tag exactly once.

## Validation

```bash
node scripts/install-adsense.mjs
node scripts/generate-sitemaps.mjs
node scripts/seo-audit.mjs
```

Expected result: `195 HTML pages; 156 indexable; 0 errors; 0 warnings.`
