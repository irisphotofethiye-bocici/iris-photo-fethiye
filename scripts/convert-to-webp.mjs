/**
 * convert-to-webp.mjs
 * Converts all JPEG/JPG/PNG images in public/ to WebP using Sharp.
 * Skips og-image.jpg (social media OG images need JPEG).
 * Deletes originals after successful conversion.
 */

import sharp from "sharp";
import { readdir, unlink, stat } from "fs/promises";
import { join, extname, basename, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = join(__dirname, "..", "public");
const SKIP = ["og-image.jpg"];

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const full = join(dir, e.name);
    if (e.isDirectory()) {
      files.push(...(await walk(full)));
    } else {
      files.push(full);
    }
  }
  return files;
}

async function convert(filePath) {
  const ext = extname(filePath).toLowerCase();
  const name = basename(filePath);

  if (![".jpg", ".jpeg", ".png"].includes(ext)) return;
  if (SKIP.includes(name)) {
    console.log(`  SKIP  ${name}`);
    return;
  }

  const webpPath = filePath.replace(/\.(jpg|jpeg|png)$/i, ".webp");
  const isLogo = filePath.includes("logo");

  const options = isLogo
    ? { lossless: true }        // logo: lossless — şeffaflık korunur
    : { quality: 82 };          // fotoğraflar: kaliteli sıkıştırma

  try {
    const before = (await stat(filePath)).size;
    await sharp(filePath).webp(options).toFile(webpPath);
    const after = (await stat(webpPath)).size;
    const saving = Math.round((1 - after / before) * 100);
    await unlink(filePath);
    console.log(`  OK  ${name} → .webp  (${(before/1024).toFixed(0)}KB → ${(after/1024).toFixed(0)}KB, -%${saving})`);
  } catch (err) {
    console.error(`  ERR ${name}: ${err.message}`);
  }
}

const files = await walk(PUBLIC_DIR);
console.log(`\nDönüştürülüyor: ${files.filter(f => /\.(jpg|jpeg|png)$/i.test(f)).length} dosya\n`);
for (const f of files) await convert(f);
console.log("\nTamamlandı.");
