import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const origin = "https://phantombladezerowiki.wiki";

const faq = [
  ["release","release-date","When will Phantom Blade Zero be released?","PlayStation lists Phantom Blade Zero for October 29, 2026 at 02:00 UTC. Steam currently displays October 28 in some regions because storefront dates can be localized. Use the release hub for the current countdown and recheck your regional store near launch.","../release-date/"],
  ["release","steam-date","Why does Steam show October 28 while PlayStation shows October 29?","The two listings do not prove that PC launches a full day earlier. PlayStation provides the precise time of October 29 at 02:00 UTC, while Steam may render the preceding calendar date in western time zones. Regional unlock maps will be verified when countdown data is available.","../release-date/news/steam-october-28-vs-ps5-october-29-explained/"],
  ["release","unlock-time","What is the confirmed global unlock time?","The most precise official listing currently available is PlayStation's October 29, 2026 at 02:00 UTC. PC and every regional store have not yet published a complete synchronized unlock table, so treat local conversion pages as provisional until platform countdowns appear.","../release-date/timezones/"],
  ["release","preorder","Can I preorder Phantom Blade Zero?","A complete official preorder program has not yet been published across the tracked PlayStation and Steam listings. Do not treat retailer placeholders as confirmed offers. The preorder answer page will be updated when an authorized store exposes purchase options and bonuses.","../questions/can-you-preorder-phantom-blade-zero/"],
  ["release","price","How much will Phantom Blade Zero cost?","S-GAME and the official platform listings have not confirmed a universal launch price. Prices can also vary by edition, currency, tax, and region. Wait for a live first-party purchase button rather than relying on placeholder retailer prices.","../release-date/editions/"],
  ["release","editions","What editions will be available?","No complete official Standard, Deluxe, Collector's, or upgrade-path comparison is available yet. The editions hub records confirmed contents only and will separate digital bonuses, physical items, and post-launch upgrades once official purchase pages go live.","../release-date/editions/"],
  ["release","preload","Will Phantom Blade Zero have preload?","Preload timing and download availability have not been announced. If preload is offered, timing may differ between PS5 and Steam and by region. The release hub will record first-party countdown evidence instead of extrapolating from other games.","../release-date/news/preload-editions-and-price-still-pending/"],
  ["release","state-of-play","Is there a dedicated Phantom Blade Zero State of Play?","Yes. PlayStation said a dedicated State of Play is planned for later in summer 2026 to cover features, mechanics, and story. The exact broadcast date and runtime still require a separate official announcement.","../release-date/news/dedicated-state-of-play-coming-later-summer-2026/"],

  ["beginner","ps5","Is Phantom Blade Zero coming to PS5?","Yes. PlayStation has an official PS5 product page listing one-player support, DualSense vibration and trigger effects, and Game Help. Final performance modes, install size, trophies, and preload details still need release-version confirmation.","../questions/is-phantom-blade-zero-on-ps5/"],
  ["beginner","pc","Is Phantom Blade Zero coming to PC?","Yes. Phantom Blade Zero has an official Steam page. It currently lists Windows 10 or Windows 11 64-bit, single-player, full controller support, Family Sharing, and Denuvo, while detailed CPU, GPU, memory, and storage requirements remain incomplete.","../questions/is-phantom-blade-zero-on-pc/"],
  ["beginner","xbox","Is Phantom Blade Zero coming to Xbox?","No Xbox version has been announced in the current official PlayStation, Steam, or S-GAME materials tracked here. This means unannounced, not permanently impossible. Store tags, fan posts, and retailer placeholders are not platform confirmation.","../questions/is-phantom-blade-zero-on-xbox/"],
  ["beginner","ps4","Is Phantom Blade Zero coming to PS4?","No PS4 version is announced. The official console listing is for PS5, and the game is presented as a current-generation release. A PS4 page or publisher announcement would be required before changing that status.","../questions/is-phantom-blade-zero-on-ps4/"],
  ["beginner","single-player","Is Phantom Blade Zero single-player?","Yes. Steam lists the Single-player feature and PlayStation lists one player. The official materials focus on Soul's story campaign rather than a shared online campaign.","../questions/is-phantom-blade-zero-single-player/"],
  ["beginner","multiplayer","Does Phantom Blade Zero have multiplayer, co-op, or PvP?","No multiplayer, co-op, or PvP mode is confirmed in the current official store features. Because both stores identify a single-player experience, players should not buy expecting online modes unless S-GAME announces them later.","../questions/does-phantom-blade-zero-have-multiplayer/"],
  ["beginner","controller","Does Phantom Blade Zero support controllers on PC?","Yes. Steam lists full controller support and explicitly says the developers recommend playing with a controller. Exact supported models, button remapping, glyph switching, and accessibility options should be checked in the retail settings menu.","../questions/does-phantom-blade-zero-support-controller/"],
  ["beginner","dualsense","Does the PS5 version use DualSense features?","Yes. The PlayStation page lists vibration and trigger effects for the DualSense wireless controller. The exact actions that use haptics or adaptive triggers have not yet been fully documented.","../questions/does-phantom-blade-zero-support-dualsense/"],
  ["beginner","game-help","Does Phantom Blade Zero support PS5 Game Help?","Yes. Game Help is listed on the official PlayStation product page. Which activities, objectives, or hints it covers will be clear only when the retail game and its help cards are available.","../questions/does-phantom-blade-zero-support-game-help/"],
  ["beginner","languages","Which languages does Phantom Blade Zero support?","Steam currently lists 15 interface and subtitle languages. English and Simplified Chinese are the two languages marked for full audio. The language page records the complete current table and should be rechecked if the store listing changes.","../languages/"],
  ["beginner","voice-languages","Which voice-over languages are confirmed?","English and Simplified Chinese are currently marked for full audio on Steam. German, Japanese, French, Korean, and the other listed languages have interface and subtitle support but are not presently marked for full voice-over.","../questions/what-languages-does-phantom-blade-zero-support/"],
  ["beginner","difficulty","Does Phantom Blade Zero have difficulty options?","A final retail difficulty menu and its exact modes have not been officially documented. Preview challenge cannot confirm launch settings. The answer will be updated from the release build rather than guessing from comparisons with Soulslikes.","../questions/does-phantom-blade-zero-have-difficulty-options/"],
  ["beginner","steam-deck","Is Phantom Blade Zero Steam Deck compatible?","Valve has not published a verified Steam Deck compatibility rating for the game. Full controller support is encouraging but does not establish performance, text readability, anti-cheat behavior, or Verified status.","../questions/is-phantom-blade-zero-steam-deck-compatible/"],

  ["combat","action-rpg","Is Phantom Blade Zero an action RPG?","Yes. Official descriptions combine action combat with equipment, weapons, armor, artifacts, skills, customization, and progression. The final depth of individual RPG systems should be judged from the retail game rather than trailer menus.","../questions/is-phantom-blade-zero-an-action-rpg/"],
  ["combat","soulslike","Is Phantom Blade Zero a Soulslike?","PlayStation's hands-on said the game walks a line between character action and Soulslikes. S-GAME emphasizes fast kungfu action and accessible execution, so it is more accurate to describe the overlap than to claim it follows every Soulslike convention.","../questions/is-phantom-blade-zero-a-soulslike/"],
  ["combat","block","Can you block attacks?","Yes. PlayStation's 2024 hands-on says holding L1 blocks incoming attacks in the preview build. Final stamina, chip damage, guard break, and unblockable rules still require retail testing.","../combat/block-guide/"],
  ["combat","parry","Can you parry attacks?","Yes. The same hands-on confirms timed parries and describes powerful counterattack opportunities. It does not prove that every attack is parryable or establish final timing windows.","../combat/parry-guide/"],
  ["combat","dodge","Can you dodge attacks?","Yes. Dodging is a confirmed defensive choice and can lead to a counterattack opportunity when timed correctly. Final invulnerability frames, direction rules, and resource costs are not yet published.","../combat/dodge-guide/"],
  ["combat","counterattacks","Are counterattacks part of combat?","Yes. PlayStation's hands-on connects timed parries and dodges with powerful counterattacks. The release guide will document exact inputs and weapon-specific follow-ups after testing.","../combat-guide/"],
  ["combat","fast-combat","Is combat fast-paced?","Yes. S-GAME presents Phantom Blade Zero around fast wuxia-inspired action, while the hands-on describes fluid combat. Speed does not eliminate defensive decision-making: block, parry, dodge, spacing, and punish timing still matter.","../combat-guide/"],
  ["combat","kungfu-motion-capture","How was the kungfu combat animated?","S-GAME says authentic kungfu movement, extensive motion capture, and action direction involving Kenji Tanigaki shape the choreography. This supports the visual combat identity, not assumptions about hidden frame data or move names.","../combat-guide/news/authentic-kungfu-choreography-and-animation/"],

  ["weapons","weapon-count","How many weapons are in Phantom Blade Zero?","The official Steam description promises more than 30 weapons. A final named list, categories, upgrade trees, and acquisition locations are not yet available, so the database will expand from verified retail entries.","../questions/how-many-weapons-in-phantom-blade-zero/"],
  ["weapons","phantom-edge-count","How many Phantom Edges are there?","Steam promises more than 20 unique Phantom Edges. Exact names, effects, slots, upgrade rules, and locations should wait for official or retail evidence.","../questions/how-many-phantom-edges/"],
  ["weapons","weapon-vs-edge","Are weapons and Phantom Edges the same thing?","No. The official description lists more than 30 weapons and more than 20 Phantom Edges as separate arsenal categories. Phantom Edges are presented as options that can be mixed and matched around a playstyle.","../phantom-edges/"],
  ["weapons","mix-and-match","Can weapons and Phantom Edges be mixed and matched?","Yes. S-GAME explicitly says the arsenal can be mixed and matched to fit your playstyle. Final slot limits, switching rules, and loadout restrictions remain to be documented.","../weapons/"],
  ["weapons","enemy-weapons","Can you obtain enemy weapons?","Yes, at least from some powerful foes. The official description says defeating powerful foes can grant their weapons. It does not promise that every enemy weapon is obtainable.","../questions/can-you-get-enemy-weapons/"],
  ["weapons","signature-techniques","Can you learn enemy signature techniques?","Yes, for supported rewards. S-GAME says powerful foes can yield their weapons and, with them, their signature techniques. The exact eligible foes and technique systems need retail verification.","../questions/can-you-use-enemy-signature-techniques/"],
  ["weapons","every-enemy-weapon","Can every enemy weapon be collected?","No official source says every enemy weapon is obtainable. The confirmed claim is narrower: powerful foes can award their weapons and signature techniques. Individual drops will be listed only after verification.","../weapons/news/powerful-foes-can-drop-their-weapons/"],
  ["bosses","boss-fights","Does Phantom Blade Zero have boss fights?","Yes. PlayStation's 2024 hands-on writer reported fighting a few bosses across a few levels, and official descriptions refer to powerful foes that can award weapons and techniques.","../bosses/news/playstation-hands-on-included-several-bosses/"],
  ["bosses","boss-count","How many bosses are in the game?","No complete authoritative boss count or retail roster has been published. Trailer cuts cannot establish unique encounters, optional variants, or final names, so this wiki will not invent a number.","../bosses/news/full-boss-roster-not-yet-published/"],
  ["bosses","boss-rewards","Do bosses drop weapons or techniques?","Some powerful foes can reward their weapons and signature techniques according to the official Steam description. It does not confirm that every boss has both rewards, so each guide will document actual drops separately.","../bosses/news/powerful-foes-tied-to-weapon-rewards/"],
  ["bosses","boss-difficulty","Are bosses designed like Soulslike bosses?","The hands-on places the overall combat between character action and Soulslikes, but that does not make every boss follow a Souls formula. Final checkpoints, healing, phase structure, difficulty modes, and death penalties need retail testing.","../bosses/"],

  ["about","protagonist","Who is the protagonist?","The protagonist is Soul, an elite assassin serving The Order. He is framed for the murder of the organization's patriarch and begins a search for the true culprit while facing a fatal condition.","../story/"],
  ["about","66-days","What does the 66-day premise mean?","Official story material says a mystic healer can delay Soul's death for 66 days. It establishes urgency in the narrative, but S-GAME has not confirmed that players face a continuously ticking real-time gameplay limit.","../questions/what-does-66-days-mean/"],
  ["about","rainblood","Is Phantom Blade Zero connected to Rainblood?","Yes. S-GAME describes Phantom Blade Zero as a spiritual rebirth of the Rainblood series, carrying forward its ideas in a new, larger production. That wording does not by itself confirm a direct sequel timeline.","../questions/is-phantom-blade-zero-related-to-rainblood/"],
  ["about","kungfupunk","What is Kungfupunk?","Kungfupunk is S-GAME's label for the game's blend of Chinese martial arts, wuxia ideas, steampunk-like machinery, occult elements, and a dark fictional world. It describes the creative style rather than a standard genre with fixed rules.","../questions/what-is-kungfupunk/"],
  ["about","open-world","Is Phantom Blade Zero open world?","S-GAME calls it a semi-open world built from multiple handcrafted maps of reasonable size. That is different from one seamless fully open map and leaves final travel, gating, and route structure to be verified.","../questions/is-phantom-blade-zero-open-world/"],
  ["about","engine","What engine does Phantom Blade Zero use?","Phantom Blade Zero is built with Unreal Engine 5. Engine choice alone does not establish final resolution, frame rate, ray tracing, shader behavior, or PC performance.","../questions/what-engine-does-phantom-blade-zero-use/"],
  ["about","developer","Who is making Phantom Blade Zero?","Phantom Blade Zero is developed by S-GAME. The studio's official introduction ties the project to its Rainblood roots and its long-term goal of presenting martial arts action at a larger scale.","../questions/who-made-phantom-blade-zero/"],
  ["about","hong-kong-cinema","Is the game inspired by Hong Kong action cinema?","Yes. S-GAME cites 1990s Hong Kong kungfu cinema as a major influence and worked with action director Kenji Tanigaki on choreography and motion capture.","../questions/is-phantom-blade-zero-inspired-by-hong-kong-action-movies/"],
  ["about","denuvo","Does the PC version use Denuvo?","The current Steam listing includes Denuvo Anti-tamper. DRM details can change, so this answer should be rechecked against the live store page and any publisher update before launch.","../questions/does-phantom-blade-zero-have-denuvo/"],
  ["about","family-sharing","Does Phantom Blade Zero support Steam Families?","Steam currently lists Family Sharing. Availability can still depend on region, account eligibility, and Valve's current Steam Families rules.","../questions/does-phantom-blade-zero-support-steam-family-sharing/"],
];

if (faq.length !== 50) throw new Error(`Expected 50 FAQs, found ${faq.length}`);

const categoryNames = { release:"Release & Buying", beginner:"Platforms & Beginner", combat:"Combat", weapons:"Weapons & Bosses", bosses:"Weapons & Bosses", about:"Story & Development" };
const grouped = [];
for (const category of ["release","beginner","combat","weapons","bosses","about"]) {
  const items = faq.filter(([group]) => group === category);
  if (!items.length) continue;
  if (category === "bosses") {
    const previous = grouped.at(-1);
    previous.items.push(...items);
  } else grouped.push({ category, title:categoryNames[category], items:[...items] });
}

const entities = faq.map(([, , question, answer]) => ({ "@type":"Question", name:question, acceptedAnswer:{ "@type":"Answer", text:answer } }));
const breadcrumb = { "@context":"https://schema.org", "@type":"BreadcrumbList", itemListElement:[
  {"@type":"ListItem",position:1,name:"Home",item:`${origin}/`},
  {"@type":"ListItem",position:2,name:"Phantom Blade Zero FAQ",item:`${origin}/faq/`},
]};
const categoryNav = grouped.map(({category,title}) => `<a class="button ghost" href="#${category}">${title}</a>`).join("");
const sections = grouped.map(({category,title,items}) => `<section class="section faq" id="${category}"><div class="section-head compact"><p class="eyebrow">${title}</p><h2>${title} FAQ</h2></div>${items.map(([,slug,question,answer,link],i) => `<details id="faq-${slug}"${category === "release" && i === 0 ? " open" : ""}><summary>${question}</summary><p>${answer} <a href="${link}">Read the related guide</a>.</p></details>`).join("")}</section>`).join("");

const faqHtml = `<!doctype html><html lang="en"><head><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" /><title>Phantom Blade Zero FAQ: 50 Confirmed Answers</title><meta name="description" content="Fifty source-checked Phantom Blade Zero FAQs covering release date, platforms, languages, combat, weapons, bosses, story, PC, PS5, and official features." /><link rel="canonical" href="${origin}/faq/" /><link rel="stylesheet" href="../styles.css" /><script type="application/ld+json">${JSON.stringify({"@context":"https://schema.org","@type":"FAQPage",mainEntity:entities})}</script><script type="application/ld+json">${JSON.stringify(breadcrumb)}</script></head><body><header class="site-header"><a class="brand" href="../"><span class="brand-mark">PBZ</span><span>Phantom Blade Zero Wiki</span></a><nav class="nav"><a href="../release-date/">Release</a><a href="../beginners-guide/">Beginner</a><a href="../combat-guide/">Combat</a><a href="../weapons/">Weapons</a><a href="../bosses/">Bosses</a><a href="../about/">About</a></nav></header><main><section class="page-hero"><p class="eyebrow">50 source-checked answers · Updated July 19, 2026</p><h1>Phantom Blade Zero FAQ</h1><p>Direct answers based on S-GAME, PlayStation, Steam, and documented hands-on material. Each question has a permanent anchor and a related guide for deeper context.</p><div class="hero-actions">${categoryNav}</div></section>${sections}<section class="section content-grid"><article class="article-body"><h2>How answers are verified</h2><p>Confirmed statements come from S-GAME, PlayStation, Steam, official presentations, or documented hands-on reports. Unannounced details are labeled plainly instead of filled with rumors, retailer placeholders, or assumptions from other action RPGs.</p><h2>When this FAQ changes</h2><p>Store features and pre-release plans can change. Time-sensitive answers are rechecked after major announcements and at launch; mechanical answers are then replaced with retail-build evidence and linked to the relevant guide.</p></article><aside class="toc"><h2>More help</h2><a href="../questions/">All question pages</a><a href="../news/">Verified news</a><a href="../sources/">Source policy</a></aside></section></main><footer class="footer"><p>Unofficial fan-made guide using official sources.</p><a href="../">Home</a></footer></body></html>\n`;
await writeFile(path.join(root,"faq","index.html"),faqHtml);

const moduleMap = {
  "release-date":["release-date","steam-date","unlock-time","preorder","price"],
  "beginners-guide":["ps5","pc","controller","languages","difficulty"],
  "combat-guide":["soulslike","block","parry","dodge","counterattacks"],
  weapons:["weapon-count","phantom-edge-count","weapon-vs-edge","enemy-weapons","signature-techniques"],
  bosses:["boss-fights","boss-count","boss-rewards","boss-difficulty","every-enemy-weapon"],
  about:["protagonist","66-days","rainblood","kungfupunk","engine"],
};

for (const [tab, slugs] of Object.entries(moduleMap)) {
  const cards = slugs.map((slug) => {
    const item = faq.find(([,s]) => s === slug);
    return `<a class="mini-card" href="../faq/#faq-${slug}"><strong>${item[2]}</strong>${item[3]}</a>`;
  }).join("");
  const module = `<section class="section" data-tab-faq="${tab}"><div class="section-head compact"><p class="eyebrow">Related FAQ</p><h2>Five Answers for This Section</h2><p>Open a source-checked answer directly, then follow its related guide when you need more detail.</p></div><div class="mini-cards">${cards}</div><p><a class="button ghost" href="../faq/">Browse all 50 FAQs</a></p></section>`;
  const file = path.join(root,tab,"index.html");
  let html = await readFile(file,"utf8");
  html = html.replace(/<section class="section" data-tab-faq="[\s\S]*?<\/section>/, "");
  html = html.replace(/(<section class="section" data-tab-news=)/, `${module}$1`);
  if (!html.includes(`data-tab-faq="${tab}"`)) html = html.replace("</main>",`${module}</main>`);
  if (!html.includes('href="../faq/"')) html = html.replace("</nav>",'<a href="../faq/">FAQ</a></nav>');
  await writeFile(file,html);
}

const homeFile = path.join(root,"index.html");
let home = await readFile(homeFile,"utf8");
if (!home.includes('href="./faq/"')) home = home.replace("</nav>",'<a href="./faq/">FAQ</a></nav>');
await writeFile(homeFile,home);

console.log("Expanded /faq/ to 50 source-checked answers and added five contextual FAQ links to each of six core tabs.");
