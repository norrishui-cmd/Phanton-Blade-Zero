import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const origin = "https://phantombladezerowiki.wiki";
const steam = "https://store.steampowered.com/app/4115450/Phantom_Blade_Zero/";
const playstation = "https://www.playstation.com/en-us/games/phantom-blade-zero/";

const languages = [
  ["English", "Interface, full audio, subtitles"],
  ["Simplified Chinese", "Interface, full audio, subtitles"],
  ["French", "Interface and subtitles"],
  ["German", "Interface and subtitles"],
  ["Spanish – Spain", "Interface and subtitles"],
  ["Russian", "Interface and subtitles"],
  ["Japanese", "Interface and subtitles"],
  ["Traditional Chinese", "Interface and subtitles"],
  ["Portuguese – Brazil", "Interface and subtitles"],
  ["Korean", "Interface and subtitles"],
  ["Italian", "Interface and subtitles"],
  ["Thai", "Interface and subtitles"],
  ["Vietnamese", "Interface and subtitles"],
  ["Portuguese – Portugal", "Interface and subtitles"],
  ["Spanish – Latin America", "Interface and subtitles"],
];

function faqSchema(question, answer) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [{ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } }],
  });
}

function questionPage({ slug, title, description, answer, schemaAnswer, sections, related }) {
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" /><title>${title}</title><meta name="description" content="${description}" /><link rel="canonical" href="${origin}/questions/${slug}/" /><link rel="stylesheet" href="../../styles.css" /><script type="application/ld+json">${faqSchema(title, schemaAnswer)}</script></head>
<body><header class="site-header"><a class="brand" href="../../"><span class="brand-mark">PBZ</span><span>Phantom Blade Zero Wiki</span></a><nav class="nav"><a href="../">Questions</a><a href="../../platforms/">Platforms</a><a href="../../languages/">Languages</a><a href="../../sources/">Sources</a></nav></header><main><section class="page-hero"><p class="eyebrow">Official storefront check · July 18, 2026</p><h1>${title}</h1><p>${answer}</p></section><section class="section content-grid"><article class="article-body">${sections}<h2>Verification Note</h2><p>This answer uses the current <a href="${steam}">official Steam listing</a>. Store features can change before release, so the page records a checked date and will be retested against the October 2026 retail build.</p></article><aside class="toc"><h2>Related Answers</h2>${related.map(([href, label]) => `<a href="${href}">${label}</a>`).join("")}</aside></section></main><footer class="footer"><p>Unofficial fan guide using official storefront evidence.</p><a href="../../">Home</a></footer></body></html>\n`;
}

const pages = [
  {
    slug: "what-languages-does-phantom-blade-zero-support",
    title: "What Languages Does Phantom Blade Zero Support?",
    description: "Phantom Blade Zero lists 15 Steam languages, with full English and Simplified Chinese audio. See the confirmed interface, audio, and subtitle support.",
    answer: "<strong>Steam currently lists 15 supported languages.</strong> English and Simplified Chinese include full audio; the other listed languages currently include interface text and subtitles.",
    schemaAnswer: "Steam lists 15 languages for Phantom Blade Zero. English and Simplified Chinese include interface, full audio, and subtitles; thirteen additional languages list interface and subtitle support.",
    sections: `<h2>Confirmed Language Count</h2><p>The Steam language table lists English, Simplified Chinese, French, German, Spanish from Spain, Russian, Japanese, Traditional Chinese, Brazilian Portuguese, Korean, Italian, Thai, Vietnamese, Portuguese from Portugal, and Latin American Spanish.</p><h2>Audio vs. Text Support</h2><p>Only English and Simplified Chinese currently carry checkmarks for full audio. All 15 languages are marked for interface and subtitles. This distinction matters because a supported menu language does not automatically mean dubbed dialogue.</p><h2>What Still Needs Release Testing</h2><p>The listing does not explain whether language packs require separate downloads, whether voice and text can be selected independently, or whether every cinematic has matching subtitle options. Those settings will be checked on PS5 and PC after launch.</p>`,
    related: [["../../languages/", "Full Language Table"], ["../does-phantom-blade-zero-have-english-voice-acting/", "English Voice Acting"], ["../does-phantom-blade-zero-have-chinese-voice-acting/", "Chinese Voice Acting"]],
  },
  {
    slug: "does-phantom-blade-zero-have-english-voice-acting",
    title: "Does Phantom Blade Zero Have English Voice Acting?",
    description: "Yes. The official Phantom Blade Zero Steam listing marks English for full audio, interface text, and subtitles. See what remains to be tested.",
    answer: "<strong>Yes.</strong> The official Steam language table marks English for full audio, interface text, and subtitles.",
    schemaAnswer: "Yes. The official Steam listing marks English as supported for interface text, full audio, and subtitles.",
    sections: `<h2>What the Listing Confirms</h2><p>The English row has all three support indicators: interface, full audio, and subtitles. That is stronger evidence than a trailer voice track because it describes the planned game-language package rather than one marketing video.</p><h2>What Full Audio Does Not Guarantee</h2><p>The listing does not yet specify the cast, regional accent options, lip-sync behavior, audio-description support, or whether every incidental NPC line is voiced. It also does not confirm that PS5 and PC language downloads work identically.</p><h2>Launch Checks</h2><p>The retail guide will verify whether players can combine English voices with another text language, change audio mid-save, preview voices before starting, and download or remove voice packs separately. Any patch-dependent difference will be dated.</p>`,
    related: [["../what-languages-does-phantom-blade-zero-support/", "All Languages"], ["../does-phantom-blade-zero-have-chinese-voice-acting/", "Chinese Voice Acting"], ["../../settings/language-subtitles/", "Language Settings"]],
  },
  {
    slug: "does-phantom-blade-zero-have-chinese-voice-acting",
    title: "Does Phantom Blade Zero Have Chinese Voice Acting?",
    description: "Yes. Steam lists full Simplified Chinese audio, interface text, and subtitles for Phantom Blade Zero. Traditional Chinese is currently text only.",
    answer: "<strong>Yes.</strong> Simplified Chinese is listed with full audio, interface text, and subtitles. Traditional Chinese is listed for interface text and subtitles, without a full-audio checkmark.",
    schemaAnswer: "Yes. Steam marks Simplified Chinese for interface, full audio, and subtitles. Traditional Chinese is listed for interface and subtitles but not full audio.",
    sections: `<h2>Simplified and Traditional Chinese Differ</h2><p>The Steam table treats them as separate language options. Simplified Chinese currently has all three checkmarks, including full audio. Traditional Chinese has interface and subtitle support but no listed full-audio checkmark.</p><h2>How to Read That Difference</h2><p>Traditional Chinese players may still be able to use Chinese voices by combining a Simplified Chinese audio track with Traditional Chinese text, but the storefront does not explicitly confirm independent audio and text selection. The site will not promise that combination until the menus are tested.</p><h2>Release Checks</h2><p>Testing will cover voice selection, subtitle script, text size, dialogue logs, cinematic subtitles, and whether language packs are separate downloads on PS5 or Steam.</p>`,
    related: [["../what-languages-does-phantom-blade-zero-support/", "All Languages"], ["../does-phantom-blade-zero-have-english-voice-acting/", "English Voice Acting"], ["../../settings/language-subtitles/", "Language Settings"]],
  },
  {
    slug: "does-phantom-blade-zero-support-japanese",
    title: "Does Phantom Blade Zero Support Japanese?",
    description: "Yes. Steam lists Japanese interface text and subtitles for Phantom Blade Zero, but does not currently mark Japanese full audio.",
    answer: "<strong>Yes, for text.</strong> Steam lists Japanese interface and subtitle support, but the current table does not mark Japanese full audio.",
    schemaAnswer: "Yes. The Steam listing marks Japanese for interface and subtitles. It does not currently mark Japanese for full audio.",
    sections: `<h2>Confirmed Japanese Support</h2><p>The Japanese row is checked for interface text and subtitles. That should cover menus, settings, item text, and subtitle presentation at the storefront level, although completeness and translation quality can only be judged in the finished game.</p><h2>No Japanese Dub Confirmation</h2><p>The same row does not carry a full-audio checkmark. A Japanese trailer, regional store page, or community tag would not override the language table. If a dub is announced later, this answer and the central language table will be updated together.</p><h2>Retail Tests</h2><p>After launch, the guide will verify text selection, font rendering, subtitle size, dialogue coverage, button prompts, independent voice selection, and whether PC and PS5 expose the same choices.</p>`,
    related: [["../what-languages-does-phantom-blade-zero-support/", "All Languages"], ["../../languages/", "Language Table"], ["../../settings/language-subtitles/", "Language Settings"]],
  },
  {
    slug: "does-phantom-blade-zero-have-denuvo",
    title: "Does Phantom Blade Zero Have Denuvo on PC?",
    description: "The current Steam listing says Phantom Blade Zero incorporates third-party Denuvo DRM. Learn what is confirmed and why the status is time-sensitive.",
    answer: "<strong>Currently, yes.</strong> Steam states that the PC version incorporates third-party DRM: Denuvo.",
    schemaAnswer: "Yes, according to the current Steam listing. It states that Phantom Blade Zero incorporates third-party DRM identified as Denuvo. The status may change before or after launch.",
    sections: `<h2>What Is Confirmed</h2><p>The Steam feature panel explicitly identifies Denuvo as third-party DRM. This is a current storefront disclosure for the PC version; it does not apply to the PS5 edition and does not by itself describe online requirements or activation limits.</p><h2>What Is Not Yet Published</h2><p>The listing does not specify first-launch behavior, offline activation, device limits, removal plans, or measurable performance impact. Those questions require publisher documentation or controlled retail testing rather than assumptions based on other games.</p><h2>Why the Status Can Change</h2><p>Publishers sometimes update DRM disclosures before or after release. This page keeps a checked date and will compare the live Steam disclosure with the installed retail build instead of treating the pre-launch status as permanent.</p>`,
    related: [["../../platforms/steam/", "Steam Version"], ["../../platforms/pc-system-requirements/", "PC Requirements"], ["../is-phantom-blade-zero-on-pc/", "PC Availability"]],
  },
  {
    slug: "does-phantom-blade-zero-support-steam-family-sharing",
    title: "Does Phantom Blade Zero Support Steam Family Sharing?",
    description: "The current Phantom Blade Zero Steam feature list includes Family Sharing. Final eligibility and account behavior still require launch verification.",
    answer: "<strong>The current Steam listing includes Family Sharing.</strong> Final availability remains subject to Steam rules and the release configuration.",
    schemaAnswer: "The current Steam listing includes Family Sharing as a feature. Final sharing eligibility and behavior should be verified after the game releases.",
    sections: `<h2>Current Store Evidence</h2><p>Family Sharing appears in the Steam feature list alongside single-player support. That indicates planned eligibility, but the storefront does not explain household access, simultaneous play, regional restrictions, DLC sharing, or how third-party DRM interacts with a shared installation.</p><h2>What Players Should Expect</h2><p>Steam Families and publisher settings determine whether a specific account can borrow a title. A feature badge is useful evidence, not a guarantee that every account, region, or launch-day configuration will behave identically.</p><h2>Launch Verification</h2><p>The guide will test library visibility, installation, save separation, offline behavior, DLC ownership, and any Denuvo activation message using compliant household accounts. Results will state the Steam client version and date.</p>`,
    related: [["../../platforms/steam/", "Steam Guide"], ["../does-phantom-blade-zero-have-denuvo/", "Denuvo Status"], ["../is-phantom-blade-zero-single-player/", "Single Player"]],
  },
  {
    slug: "is-phantom-blade-zero-an-action-rpg",
    title: "Is Phantom Blade Zero an Action RPG?",
    description: "Yes. Steam categorizes Phantom Blade Zero as Action and RPG, while PlayStation describes it as a fast-paced action RPG with wuxia combat.",
    answer: "<strong>Yes.</strong> Steam lists the genres as Action and RPG, and PlayStation describes Phantom Blade Zero as a fast-paced action RPG.",
    schemaAnswer: "Yes. Steam lists Phantom Blade Zero under Action and RPG, and PlayStation describes it as a fast-paced action RPG with a semi-open world.",
    sections: `<h2>Official Genre Evidence</h2><p>The Steam product information names Action and RPG as the official genres. PlayStation's July 2026 feature calls it a flashy, fast-paced action RPG in a dark semi-open world. S-GAME also emphasizes weapon acquisition, customization, skills, and handcrafted combat encounters.</p><h2>Why the Label Is Broad</h2><p>Action RPG does not settle whether the game is a Soulslike, character-action game, hack and slash, or a mixture. Those labels describe overlapping combat expectations and community comparisons. They do not prove identical death, checkpoint, leveling, posture, loot, or difficulty systems.</p><h2>Best Pre-Launch Description</h2><p>The safest short description is a single-player wuxia action RPG with fast combat, a semi-open structure, more than 30 weapons, and more than 20 Phantom Edges. More specific genre judgments should follow retail testing.</p>`,
    related: [["../is-phantom-blade-zero-a-soulslike/", "Is It a Soulslike?"], ["../../comparisons/", "Comparisons"], ["../../combat-guide/", "Combat Guide"]],
  },
];

for (const page of pages) {
  const directory = path.join(root, "questions", page.slug);
  await mkdir(directory, { recursive: true });
  await writeFile(path.join(directory, "index.html"), questionPage(page));
}

const languageRows = languages.map(([name, support]) => `<tr><td>${name}</td><td>${support}</td></tr>`).join("");
const languageDir = path.join(root, "languages");
await mkdir(languageDir, { recursive: true });
await writeFile(path.join(languageDir, "index.html"), `<!doctype html>
<html lang="en"><head><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" /><title>Phantom Blade Zero Languages, Audio and Subtitles</title><meta name="description" content="Complete Phantom Blade Zero language table: 15 Steam languages, English and Simplified Chinese voice acting, plus interface and subtitle support." /><link rel="canonical" href="${origin}/languages/" /><link rel="stylesheet" href="../styles.css" /></head><body><header class="site-header"><a class="brand" href="../"><span class="brand-mark">PBZ</span><span>Phantom Blade Zero Wiki</span></a><nav class="nav"><a href="../questions/">Questions</a><a href="../platforms/">Platforms</a><a href="../settings/language-subtitles/">Settings</a><a href="../sources/">Sources</a></nav></header><main><section class="page-hero"><p class="eyebrow">Official Steam language table · checked July 18, 2026</p><h1>Phantom Blade Zero Languages</h1><p><strong>Steam lists 15 supported languages.</strong> English and Simplified Chinese include full audio; all listed languages include interface text and subtitles.</p></section><section class="section content-grid"><article class="article-body"><h2>Confirmed Language Support</h2><div class="table-wrap" role="region" aria-label="Phantom Blade Zero supported languages" tabindex="0"><table><thead><tr><th>Language</th><th>Steam support</th></tr></thead><tbody>${languageRows}</tbody></table></div><h2>How to Read the Table</h2><p>“Full audio” means the storefront marks a language for voiced game audio. Interface and subtitle checks indicate localized text, not a dub. Traditional Chinese and Japanese are currently listed for text and subtitles but not full audio.</p><h2>Information Still Pending</h2><p>The official listing does not yet explain independent voice-and-text selection, optional language-pack sizes, subtitle customization, dialogue logs, or whether PS5 and Steam expose identical options. Those details will be tested after launch.</p><h2>Direct Answers</h2><p>See the guides for <a href="../questions/does-phantom-blade-zero-have-english-voice-acting/">English voices</a>, <a href="../questions/does-phantom-blade-zero-have-chinese-voice-acting/">Chinese voices</a>, and <a href="../questions/does-phantom-blade-zero-support-japanese/">Japanese support</a>.</p><h2>Primary Source</h2><p>The table is transcribed from the <a href="${steam}">official Steam product page</a>. Storefront data can change before release, so the checked date remains visible.</p></article><aside class="toc"><h2>Quick Summary</h2><p>15 languages</p><p>2 full-audio languages</p><p>15 interface languages</p><p>15 subtitle languages</p><a href="../settings/language-subtitles/">Language Settings</a></aside></section></main><footer class="footer"><p>Unofficial fan guide using official storefront data.</p><a href="../">Home</a></footer></body></html>\n`);

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if ([".git", "node_modules"].includes(entry.name)) continue;
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(absolute));
    else files.push(absolute);
  }
  return files;
}

function labelFromPath(segment) {
  return segment.split("-").map((word) => word ? word[0].toUpperCase() + word.slice(1) : word).join(" ");
}

for (const file of (await walk(root)).filter((item) => item.endsWith("index.html"))) {
  let html = await readFile(file, "utf8");
  const noindex = /<meta\s+name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(html);
  const relative = path.relative(root, file).replaceAll(path.sep, "/").replace(/index\.html$/, "");
  if (noindex || !relative || html.includes('"@type":"BreadcrumbList"')) continue;
  const segments = relative.split("/").filter(Boolean);
  const items = [{ "@type": "ListItem", position: 1, name: "Home", item: `${origin}/` }];
  let accumulated = "";
  segments.forEach((segment, index) => {
    accumulated += `${segment}/`;
    const isLast = index === segments.length - 1;
    const h1 = html.match(/<h1>([\s\S]*?)<\/h1>/i)?.[1]?.replace(/<[^>]+>/g, "").trim();
    items.push({ "@type": "ListItem", position: index + 2, name: isLast && h1 ? h1 : labelFromPath(segment), item: `${origin}/${accumulated}` });
  });
  const schema = JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: items });
  html = html.replace("</head>", `<script type="application/ld+json">${schema}</script></head>`);
  await writeFile(file, html);
}

const homeFile = path.join(root, "index.html");
let home = await readFile(homeFile, "utf8");
if (!home.includes('"@type":"WebSite"')) {
  const website = JSON.stringify({ "@context": "https://schema.org", "@type": "WebSite", name: "Phantom Blade Zero Wiki", url: `${origin}/`, inLanguage: "en" });
  home = home.replace("</head>", `<script type="application/ld+json">${website}</script></head>`);
  await writeFile(homeFile, home);
}

const hubFile = path.join(root, "questions/index.html");
let hub = await readFile(hubFile, "utf8");
if (!hub.includes("what-languages-does-phantom-blade-zero-support")) {
  const anchor = `<a class="mini-card" href="./who-made-phantom-blade-zero/"><strong>Who made the game?</strong>Developer, publisher, and technology.</a>`;
  const cards = `${anchor}<a class="mini-card" href="./what-languages-does-phantom-blade-zero-support/"><strong>What languages?</strong>15 official Steam languages.</a><a class="mini-card" href="./does-phantom-blade-zero-have-english-voice-acting/"><strong>English voice acting?</strong>Full audio confirmed.</a><a class="mini-card" href="./does-phantom-blade-zero-have-chinese-voice-acting/"><strong>Chinese voice acting?</strong>Simplified Chinese full audio.</a><a class="mini-card" href="./does-phantom-blade-zero-support-japanese/"><strong>Japanese support?</strong>Interface and subtitles confirmed.</a><a class="mini-card" href="./does-phantom-blade-zero-have-denuvo/"><strong>Denuvo on PC?</strong>Current Steam disclosure.</a><a class="mini-card" href="./does-phantom-blade-zero-support-steam-family-sharing/"><strong>Steam Family Sharing?</strong>Current feature status.</a><a class="mini-card" href="./is-phantom-blade-zero-an-action-rpg/"><strong>Is it an action RPG?</strong>Official genre framing.</a>`;
  hub = hub.replace(anchor, cards);
  await writeFile(hubFile, hub);
}

for (const relative of ["settings/language-subtitles/index.html", "platforms/steam/index.html", "platforms/index.html"]) {
  const file = path.join(root, relative);
  let html = await readFile(file, "utf8");
  if (!html.includes('href="../../languages/"') && !html.includes('href="../languages/"')) {
    const href = relative.split("/").length === 3 ? "../../languages/" : "../languages/";
    html = html.replace("</article>", `<h2>Verified Language Table</h2><p>Steam currently lists 15 interface and subtitle languages, with full audio for English and Simplified Chinese. See the <a href="${href}">complete language table</a> for the exact breakdown and checked date.</p></article>`);
    await writeFile(file, html);
  }
}

console.log(`Added ${pages.length + 1} indexable pages and BreadcrumbList schema to indexable non-home routes.`);
