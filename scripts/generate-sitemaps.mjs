import { readdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const origin = "https://phantombladezerowiki.wiki";
const today = new Date().toISOString().slice(0, 10);

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
  return relative === "index.html"
    ? `${origin}/`
    : `${origin}/${relative.replace(/index\.html$/, "")}`;
}

function bucket(url) {
  const pathname = new URL(url).pathname;
  if (pathname === "/de/" || pathname.startsWith("/de/")) return "de";
  if (pathname === "/ja/" || pathname.startsWith("/ja/")) return "ja";
  if (/^\/(combat|combat-guide|weapons|phantom-edges|bosses|builds|beginners-guide|difficulty|new-game-plus)(\/|$)/.test(pathname)) return "combat";
  if (/^\/(story|characters|lore|side-quests|walkthrough|endings|collectibles|achievements|maps|items|materials)(\/|$)/.test(pathname)) return "story";
  if (/^\/(platforms|settings|release-date|demo)(\/|$)/.test(pathname)) return "technical";
  return "core";
}

function urlset(urls) {
  const rows = urls.map((url) => `  <url><loc>${url}</loc><lastmod>${today}</lastmod></url>`).join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${rows}\n</urlset>\n`;
}

const htmlFiles = (await walk(root)).filter((file) => file.endsWith("index.html"));
const urls = [];
for (const file of htmlFiles) {
  const html = await readFile(file, "utf8");
  if (!/<meta\s+name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(html)) urls.push(pageUrl(file));
}
urls.sort();

const groups = { core: [], combat: [], story: [], technical: [], de: [], ja: [] };
for (const url of urls) groups[bucket(url)].push(url);

// Remove the legacy operations sitemap so it cannot be submitted separately.
await rm(path.join(root, "sitemap-ops.xml"), { force: true });

for (const [name, group] of Object.entries(groups)) {
  await writeFile(path.join(root, `sitemap-${name}.xml`), urlset(group));
}
await writeFile(path.join(root, "sitemap.xml"), urlset(urls));

const indexRows = Object.keys(groups)
  .map((name) => `  <sitemap><loc>${origin}/sitemap-${name}.xml</loc><lastmod>${today}</lastmod></sitemap>`)
  .join("\n");
await writeFile(
  path.join(root, "sitemap-index.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${indexRows}\n</sitemapindex>\n`,
);

console.log(`Generated six segmented sitemaps for ${urls.length} indexable URLs.`);
