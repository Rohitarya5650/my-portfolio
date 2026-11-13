// Optimises full-page screenshots for the web.
//   npm i sharp
//   node tools/optimize-screenshots.mjs ./raw-shots ./images/client-work
// For every .png/.jpg/.jpeg in the input folder it writes:
//   <name>.webp        full-page image (quality 85, visually lossless for UI shots)
//   <name>-thumb.webp  800x600 crop of the top of the page, for the card
// NOTE: WebP cannot exceed 16383px in height. Taller pages are saved as
//       high-quality JPEG (<name>.jpg) instead.
import sharp from "sharp";
import { readdirSync, mkdirSync } from "node:fs";
import { join, parse } from "node:path";

const [, , inDir = "./raw-shots", outDir = "./images/client-work"] = process.argv;
mkdirSync(outDir, { recursive: true });

for (const file of readdirSync(inDir).filter((f) => /\.(png|jpe?g)$/i.test(f))) {
  const { name } = parse(file);
  const img = sharp(join(inDir, file));
  const { width, height } = await img.metadata();
  if (height <= 16383) {
    await img.clone().webp({ quality: 85, effort: 5 }).toFile(join(outDir, `${name}.webp`));
  } else {
    await img.clone().jpeg({ quality: 85, mozjpeg: true }).toFile(join(outDir, `${name}.jpg`));
    console.warn(`${file}: ${height}px tall -> saved as JPEG (WebP limit is 16383px)`);
  }
  await img.clone()
    .extract({ left: 0, top: 0, width, height: Math.min(height, Math.round(width * 0.75)) })
    .resize(800).webp({ quality: 80 }).toFile(join(outDir, `${name}-thumb.webp`));
  console.log(`✓ ${file}`);
}
