import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const publisherId = "ca-pub-9505220977121599";
const meta = `<meta name="google-adsense-account" content="${publisherId}" />`;
const script = `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${publisherId}" crossorigin="anonymous"></script>`;

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

let updated = 0;
for (const file of (await walk(root)).filter((item) => item.endsWith("index.html"))) {
  let html = await readFile(file, "utf8");
  const before = html;
  if (!html.includes('name="google-adsense-account"')) html = html.replace("</head>", `${meta}</head>`);
  if (!html.includes("pagead2.googlesyndication.com/pagead/js/adsbygoogle.js")) html = html.replace("</head>", `${script}</head>`);
  if (html !== before) {
    await writeFile(file, html);
    updated += 1;
  }
}

console.log(`AdSense ownership code installed or verified across all HTML pages; ${updated} files updated.`);
