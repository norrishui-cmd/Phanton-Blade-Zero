import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const origin = "https://phantombladezerowiki.wiki";
const errors = [];
const warnings = [];

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if ([".git", "node_modules"].includes(entry.name)) continue;
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(absolute)));
    else files.push(absolute);
  }
  return files;
}

function pageUrl(file) {
  const relative = path.relative(root, file).replaceAll(path.sep, "/");
  return relative === "index.html" ? `${origin}/` : `${origin}/${relative.replace(/index\.html$/, "")}`;
}

function get(html, pattern) {
  return html.match(pattern)?.[1]?.trim() ?? "";
}

function strip(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z#0-9]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function internalTargetExists(href, sourceFile, allFiles) {
  if (/^(https?:|mailto:|tel:|#|javascript:)/i.test(href)) return true;
  const clean = href.split(/[?#]/)[0];
  if (!clean) return true;
  const sourceUrl = new URL(pageUrl(sourceFile));
  const resolved = new URL(clean, sourceUrl);
  if (resolved.origin !== origin) return true;
  let target = decodeURIComponent(resolved.pathname);
  if (target.endsWith("/")) target += "index.html";
  else if (!path.extname(target)) target += "/index.html";
  return allFiles.has(path.join(root, target.replace(/^\//, "")));
}

const allFiles = new Set(await walk(root));
const htmlFiles = [...allFiles].filter((file) => file.endsWith("index.html"));
const values = { title: new Map(), description: new Map(), canonical: new Map() };
const indexableUrls = new Set();
const requiredFaqTabs = new Set(["release-date", "beginners-guide", "combat-guide", "weapons", "bosses", "about"]);
const requiredRound8Pages = new Set(["characters/index.html","equipment/index.html","equipment/armor/index.html","equipment/artifacts/index.html","equipment/skills/index.html","equipment/enemy-weapons/index.html","equipment/signature-techniques/index.html","gameplay/index.html","gameplay/semi-open-world/index.html","gameplay/handcrafted-map-activities/index.html","gameplay/shifting-realities/index.html","gameplay/memory-echoes/index.html","gameplay/augmentation/index.html","gameplay/higher-powers/index.html","gameplay/66-day-premise/index.html"]);

for (const file of htmlFiles) {
  const relative = path.relative(root, file);
  const html = await readFile(file, "utf8");
  const title = get(html, /<title>([\s\S]*?)<\/title>/i);
  const description = get(html, /<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i);
  const canonical = get(html, /<link\s+rel=["']canonical["']\s+href=["']([^"']*)["']/i);
  const h1Count = (html.match(/<h1(?:\s|>)/gi) ?? []).length;
  const noindex = /<meta\s+name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(html);
  const isHome = pageUrl(file) === `${origin}/`;
  const isNewsArticle = /(^|[\\/])news[\\/][^\\/]+[\\/]index\.html$/.test(relative);
  const adsenseScriptCount = (html.match(/pagead2\.googlesyndication\.com\/pagead\/js\/adsbygoogle\.js\?client=ca-pub-9505220977121599/g) ?? []).length;
  const adsenseMetaCount = (html.match(/name=["']google-adsense-account["'][^>]*content=["']ca-pub-9505220977121599["']/g) ?? []).length;
  const languageMenus = (html.match(/<details class="language-menu"/g) ?? []).length;
  if (languageMenus !== 1) errors.push(`${relative}: expected exactly one navigation language dropdown, found ${languageMenus}`);
  for (const label of ["English","Deutsch","日本語"]) if (!html.includes(`>${label}</a>`)) errors.push(`${relative}: language dropdown is missing ${label}`);
  if (requiredRound8Pages.has(relative.replaceAll(path.sep,"/"))) {
    if (!html.includes("Source and update status")) errors.push(`${relative}: Round 8 entity page is missing source/update disclosure`);
    if (!/href="https:\/\/(store\.steampowered\.com|blog\.playstation\.com)/.test(html)) errors.push(`${relative}: Round 8 entity page is missing its primary-source link`);
  }

  if (relative === "faq/index.html") {
    const faqDetails = (html.match(/<details id="faq-[^"]+"/g) ?? []).length;
    const faqQuestions = (html.match(/"@type":"Question"/g) ?? []).length;
    if (faqDetails !== 50) errors.push(`${relative}: expected 50 visible FAQ entries, found ${faqDetails}`);
    if (faqQuestions !== 50) errors.push(`${relative}: expected 50 FAQPage Question entities, found ${faqQuestions}`);
  }
  const topLevel = relative.replaceAll(path.sep, "/").match(/^([^/]+)\/index\.html$/)?.[1];
  if (topLevel && requiredFaqTabs.has(topLevel)) {
    const moduleCount = (html.match(new RegExp(`data-tab-faq="${topLevel}"`, "g")) ?? []).length;
    const faqLinks = (html.match(/href="\.\.\/faq\/#faq-[^"]+"/g) ?? []).length;
    if (moduleCount !== 1) errors.push(`${relative}: expected one contextual FAQ module, found ${moduleCount}`);
    if (faqLinks < 5) errors.push(`${relative}: expected at least five contextual FAQ links, found ${faqLinks}`);
  }

  if (!title) errors.push(`${relative}: missing title`);
  if (!description) errors.push(`${relative}: missing meta description`);
  if (!canonical) errors.push(`${relative}: missing canonical`);
  if (canonical && canonical !== pageUrl(file)) errors.push(`${relative}: canonical does not match page URL`);
  if (h1Count !== 1) errors.push(`${relative}: expected one H1, found ${h1Count}`);
  if (!noindex) indexableUrls.add(pageUrl(file));
  if (adsenseScriptCount !== 1) errors.push(`${relative}: expected exactly one AdSense account script, found ${adsenseScriptCount}`);
  if (adsenseMetaCount !== 1) errors.push(`${relative}: expected exactly one AdSense account meta tag, found ${adsenseMetaCount}`);
  if (!noindex && !isHome && !html.includes('"@type":"BreadcrumbList"')) {
    errors.push(`${relative}: indexable page is missing BreadcrumbList schema`);
  }
  if (!noindex && isNewsArticle && !html.includes('"@type":"NewsArticle"')) {
    errors.push(`${relative}: news story is missing NewsArticle schema`);
  }

  for (const [key, value] of Object.entries({ title, description, canonical })) {
    if (!value) continue;
    const existing = values[key].get(value);
    if (existing) errors.push(`${relative}: duplicate ${key} also used by ${existing}`);
    else values[key].set(value, relative);
  }

  const mainText = strip(get(html, /<main[^>]*>([\s\S]*?)<\/main>/i));
  const wordCount = mainText.split(/\s+/).filter(Boolean).length;
  const language = get(html, /<html\s+lang=["']([^"']+)["']/i).toLowerCase();
  const cjkCount = (mainText.match(/[\u3040-\u30ff\u3400-\u9fff]/g) ?? []).length;
  const localizedPath = new URL(pageUrl(file)).pathname.match(/^\/(de|ja)\//)?.[1];
  if (!noindex && localizedPath) {
    if (language !== localizedPath) errors.push(`${relative}: html lang must match localized path`);
    for (const hreflang of ["en", "de", "ja", "x-default"]) {
      if (!html.includes(`hreflang="${hreflang}"`)) errors.push(`${relative}: missing ${hreflang} hreflang`);
    }
  }
  if (!noindex && language.startsWith("ja") && cjkCount < 250) warnings.push(`${relative}: only ${cjkCount} Japanese main-content characters`);
  else if (!noindex && !language.startsWith("ja") && wordCount < 140) warnings.push(`${relative}: only ${wordCount} main-content words`);

  for (const match of html.matchAll(/href=["']([^"']+)["']/gi)) {
    if (!internalTargetExists(match[1], file, allFiles)) errors.push(`${relative}: broken internal link ${match[1]}`);
  }

  for (const match of html.matchAll(/<script\s+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    try { JSON.parse(match[1]); } catch { errors.push(`${relative}: invalid JSON-LD`); }
  }
}

const sitemapFiles = ["sitemap-core.xml", "sitemap-combat.xml", "sitemap-story.xml", "sitemap-technical.xml", "sitemap-de.xml", "sitemap-ja.xml"];
const adsText = (await readFile(path.join(root, "ads.txt"), "utf8")).trim();
if (adsText !== "google.com, pub-9505220977121599, DIRECT, f08c47fec0942fa0") errors.push("ads.txt: publisher record is missing or incorrect");
const sitemapUrls = new Set();
for (const name of sitemapFiles) {
  const xml = await readFile(path.join(root, name), "utf8");
  for (const match of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) sitemapUrls.add(match[1]);
}
for (const url of indexableUrls) if (!sitemapUrls.has(url)) errors.push(`Sitemap missing indexable URL: ${url}`);
for (const url of sitemapUrls) if (!indexableUrls.has(url)) errors.push(`Sitemap contains non-indexable or missing URL: ${url}`);

console.log(`SEO audit: ${htmlFiles.length} HTML pages; ${indexableUrls.size} indexable; ${errors.length} errors; ${warnings.length} warnings.`);
for (const error of errors) console.error(`ERROR ${error}`);
for (const warning of warnings) console.warn(`WARN  ${warning}`);
if (errors.length) process.exitCode = 1;
