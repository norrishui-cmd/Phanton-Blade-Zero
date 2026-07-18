import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const generator = path.join(root, "scripts/round3-content.mjs");
let script = await readFile(generator, "utf8");
script = script
  .replace('href="../../lore/">Lore', 'href="../../lore/kungfupunk/">Lore')
  .replace("Yes. Phantom Blade Zero's official Steam page says powerful foes can drop their weapons.", "Yes. The official Phantom Blade Zero Steam page says powerful foes can drop weapons.");
await writeFile(generator, script);

const additions = {
  "questions/are-there-multiple-endings/index.html": " <p>A checked date will be retained so future announcements can replace this pending answer cleanly.</p>",
  "questions/can-you-change-difficulty/index.html": " <p>Platform differences will be documented separately if the menus do not match.</p>",
  "questions/does-phantom-blade-zero-have-difficulty-options/index.html": " <p>The guide will also distinguish difficulty selection from accessibility assists.</p>",
  "questions/does-phantom-blade-zero-have-new-game-plus/index.html": " <p>A post-credits unlock screen or an official S-GAME statement is required for confirmation.</p>",
  "questions/does-phantom-blade-zero-have-photo-mode/index.html": " <p>Any platform-specific capture tools will be described separately from an in-game mode.</p>",
  "questions/does-phantom-blade-zero-support-controller/index.html": " <p>The release guide will record the platform, connection method, controller firmware, and game patch for every tested result, so basic input support is not confused with full haptics or adaptive-trigger support.</p>",
  "trailers/index.html": " <p>Trailer pages also link to the corresponding verified guide rather than duplicating speculative conclusions.</p>",
};

for (const [relative, addition] of Object.entries(additions)) {
  const file = path.join(root, relative);
  let html = await readFile(file, "utf8");
  if (!html.includes(addition.trim())) html = html.replace("</article>", `${addition}</article>`);
  await writeFile(file, html);
}

console.log("Applied Round 3 audit fixes.");
