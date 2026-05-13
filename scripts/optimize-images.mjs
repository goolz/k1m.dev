#!/usr/bin/env node
/**
 * Converts raster assets under public/images and root-level public/*.png to WebP,
 * removes originals, then updates references in public/*.html, *.css, *.webmanifest, *.xml.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.join(__dirname, "..");
const publicDir = path.join(repoRoot, "public");

const RASTER_EXT = /\.(png|jpe?g)$/i;

/** Safari / clients probe `/apple-touch-icon.png`; keep PNG for that path. */
const SKIP_ROOT_RASTER = new Set(["apple-touch-icon.png"]);

function collectRasterPaths() {
  const out = [];
  const imagesDir = path.join(publicDir, "images");
  for (const name of fs.readdirSync(imagesDir)) {
    const p = path.join(imagesDir, name);
    if (fs.statSync(p).isFile() && RASTER_EXT.test(name)) out.push(p);
  }
  for (const name of fs.readdirSync(publicDir)) {
    const p = path.join(publicDir, name);
    if (!fs.statSync(p).isFile() || !RASTER_EXT.test(name)) continue;
    if (SKIP_ROOT_RASTER.has(name)) continue;
    out.push(p);
  }
  return out;
}

async function convertToWebp(absPath) {
  const base = path.basename(absPath);
  const dir = path.dirname(absPath);
  const baseNoExt = base.replace(RASTER_EXT, "");
  const webpName = `${baseNoExt}.webp`;
  const outPath = path.join(dir, webpName);
  const isSmallIcon = /favicon|android-chrome|apple-touch/i.test(base);
  const quality = isSmallIcon
    ? 92
    : /\.jpe?g$/i.test(base)
      ? 85
      : 82;

  await sharp(absPath)
    .webp({ quality, effort: 6 })
    .toFile(outPath);

  fs.unlinkSync(absPath);
  return { from: base, to: webpName };
}

function replacementPairs(results) {
  const pairs = [];
  for (const { from, to } of results) {
    pairs.push([from, to]);
    if (from.includes(" ")) {
      pairs.push([encodeURIComponent(from), encodeURIComponent(to)]);
    }
  }
  pairs.sort((a, b) => b[0].length - a[0].length);
  return pairs;
}

function replaceInPublicStaticFiles(pairs) {
  const exts = new Set([".html", ".css", ".webmanifest", ".xml"]);
  function walk(dir) {
    for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, ent.name);
      if (ent.isDirectory()) walk(p);
      else if (exts.has(path.extname(ent.name).toLowerCase())) {
        let s = fs.readFileSync(p, "utf8");
        const orig = s;
        for (const [from, to] of pairs) {
          if (!s.includes(from)) continue;
          s = s.split(from).join(to);
        }
        if (s !== orig) fs.writeFileSync(p, s);
      }
    }
  }
  walk(publicDir);
}

async function main() {
  const files = collectRasterPaths();
  const results = [];
  for (const f of files) {
    process.stderr.write(`Converting ${path.relative(repoRoot, f)}\n`);
    results.push(await convertToWebp(f));
  }
  replaceInPublicStaticFiles(replacementPairs(results));
  process.stderr.write(`Done: ${results.length} assets → WebP\n`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
