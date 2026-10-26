// Downloads every Figma asset referenced in src/ (paths like /figma/<section>/<file>)
// into public/figma/<section>/<file>.
//
// Usage:  npm run assets
//
// The Figma MCP asset URLs expire ~7 days after export (exported 26 Oct 2026).
// If they have expired, re-export from Figma (same node ids) and update PREFIX below.

import { mkdir, readdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";

const PREFIX = {
  hero: "https://www.figma.com/api/mcp/asset/6706ba0c-cc81-4991-85c0-ad45ab8d4604", // node 353:885
  intro: "https://www.figma.com/api/mcp/asset/cda87fcf-b5cc-45a4-9e7f-2cc690515c22", // node 353:949
  agents: "https://www.figma.com/api/mcp/asset/426ec0a9-8d53-419a-b77c-104dd2295927", // node 353:974
  testimonial: "https://www.figma.com/api/mcp/asset/71acf3e0-df01-4114-8e37-7f6dcbadfa09", // node 353:1014
  cta: "https://www.figma.com/api/mcp/asset/f0329257-7392-4f88-87fa-18006bc025b9", // node 353:1025
};

const root = path.resolve(import.meta.dirname, "..");
const PATTERN = /\/figma\/(hero|intro|agents|testimonial|cta)\/([a-z0-9]+\.(?:svg|png))/g;

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(p)));
    else if (/\.(tsx?|css)$/.test(entry.name)) out.push(p);
  }
  return out;
}

const refs = new Map();
for (const file of await walk(path.join(root, "src"))) {
  const text = await readFile(file, "utf8");
  for (const [, section, name] of text.matchAll(PATTERN)) refs.set(`${section}/${name}`, { section, name });
}

console.log(`Found ${refs.size} assets referenced in src/`);

let ok = 0;
let skipped = 0;
const failed = [];

await Promise.all(
  [...refs.values()].map(async ({ section, name }) => {
    const dest = path.join(root, "public", "figma", section, name);
    try {
      if ((await stat(dest)).size > 0) {
        skipped++;
        return;
      }
    } catch {}
    try {
      const res = await fetch(`${PREFIX[section]}/${name}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const buf = Buffer.from(await res.arrayBuffer());
      if (buf.length === 0) throw new Error("empty file");
      await mkdir(path.dirname(dest), { recursive: true });
      await writeFile(dest, buf);
      ok++;
    } catch (e) {
      failed.push(`${section}/${name} (${e.message})`);
    }
  }),
);

console.log(`Downloaded ${ok}, already present ${skipped}, failed ${failed.length}`);
if (failed.length) {
  console.log(failed.map((f) => "  - " + f).join("\n"));
  process.exitCode = 1;
}
