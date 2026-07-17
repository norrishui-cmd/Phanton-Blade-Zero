# Phantom Blade Zero Wiki: 2,000-URL SEO Plan

Updated: 2026-07-17  
Target launch: 2026-10-29  
Site: https://phantombladezerowiki.wiki/

## Operating principle

The target is 2,000 useful live URLs by launch, not 2,000 automatically indexable placeholders. A URL enters the XML sitemap only when it has a distinct intent, a verified answer or dataset, unique metadata, a hub link, breadcrumbs, and no placeholder language. Candidate pages may be prepared as `noindex` until evidence is available.

## Final URL allocation

| Cluster | Target URLs | Primary intent |
| --- | ---: | --- |
| Core hubs and evergreen guides | 80 | beginner, release, FAQ, terminology |
| Main-story walkthrough | 180 | chapter, objective, route, stuck points |
| Side quests | 260 | start, steps, choices, rewards, bugs |
| Bosses and enemies | 220 | location, strategy, counters, rewards |
| Weapons and Phantom Edges | 180 | obtain, moves, upgrade, comparison |
| Builds and combat setups | 240 | weapon, boss, playstyle, progression |
| Items and materials | 260 | location, use, farming, upgrade cost |
| Maps and locations | 180 | route, NPC, item, shortcut, secret |
| Collectibles and achievements | 170 | checklist, unlock, missable, trophy |
| Characters, factions, and lore | 90 | identity, quest links, relationships |
| Platforms, settings, and fixes | 80 | PC/PS5, controls, performance, errors |
| Choices, endings, and New Game Plus | 60 | consequences, requirements, carryover |
| **Total** | **2,000** | |

## Rollout gates

| Deadline | Live target | What can be published |
| --- | ---: | --- |
| 2026-07-31 | 140 | confirmed release, platforms, official mechanics, high-intent FAQs |
| 2026-08-31 | 300 | official showcase entities, weapons, characters, combat concepts |
| 2026-09-30 | 650 | preview/demo-confirmed guides and structured entity hubs |
| 2026-10-20 | 1,000 | review/official data, launch preparation, verified databases |
| 2026-10-29 | 2,000 | in-game verified quest, boss, item, map, build, and fix pages |

If evidence arrives later than expected, keep the affected candidates out of the sitemap instead of weakening the site. The launch-week operating target is 200–250 reviewed pages per day across independent clusters, with a sample QA of at least 10% per batch.

## Page quality gate

Every indexable leaf page must include:

1. A direct answer in the first screen.
2. Exact in-game name and category.
3. Requirements or prerequisites.
4. Location or acquisition route where relevant.
5. Tested steps, strategy, stats, or outcome.
6. Rewards, costs, choices, or failure conditions where relevant.
7. Known bugs or version notes when observed.
8. Two or more relevant internal links plus a parent hub.
9. Unique title, description, H1, canonical, and appropriate schema.
10. Evidence status and a last-verified game version.

Run `node scripts/generate-sitemaps.mjs` and then `node scripts/seo-audit.mjs` before every deployment. Expansion stops when the audit has errors, representative pages fail factual review, or Google indexes less than 40% of the previous two batches.

## First-round priorities

- Remove operations and empty template pages from indexation and sitemaps.
- Strengthen release, PC/PS5, weapons, and pre-launch question pages using official storefront facts.
- Add missing Xbox, PS4, exclusivity, preorder, and weapon-count intents without inventing unannounced features.
- Replace hand-maintained sitemap drift with generated segmented sitemaps.
- Use the automated audit to block broken links, duplicate metadata, wrong canonicals, invalid JSON-LD, and sitemap leakage.

## Measurement

Track weekly: live/indexable/indexed URL counts, sitemap discovered URLs, crawl-to-index ratio by template, impressions per indexed URL, non-brand clicks, query clusters without landing pages, duplicate canonical exclusions, and pages with zero impressions after 28 days. Merge or noindex underperforming template batches before adding more of the same type.
