// Adds a client project AND takes its real screenshots in one command.
//
//   node tools/add-client.mjs "Stone Bazar India" stone-bazar https://stonebazaarindia.com/index.html "Short description"
//   (or:  npm run add-client -- "Name" slug https://url "Description")
//
// It (1) adds the site to tools/sites.json, (2) adds a card to js/projects-data.js,
// (3) captures desktop + tablet + mobile full-page screenshots.
// Add  --no-capture  to skip step 3 (e.g. when the screenshots will be made by GitHub Actions).
import { readFileSync, writeFileSync } from "node:fs";
import { spawnSync } from "node:child_process";

const args = process.argv.slice(2).filter((a) => !a.startsWith("--"));
const noCapture = process.argv.includes("--no-capture");
const [name, slug, url, description] = args;
if (!name || !slug || !url) {
  console.error('Usage: node tools/add-client.mjs "Client Name" slug https://client-site.com ["Short description"]');
  process.exit(1);
}
if (!/^[a-z0-9-]+$/.test(slug)) { console.error("slug: only lowercase letters, numbers and dashes (e.g. stone-bazar)"); process.exit(1); }
if (!/^https?:\/\/\S+$/.test(url)) { console.error("url must start with http:// or https://"); process.exit(1); }

// 1) sites.json
const sitesFile = "tools/sites.json";
const sites = JSON.parse(readFileSync(sitesFile, "utf8"));
const existing = sites.find((s) => s.slug === slug);
if (existing) existing.url = url; else sites.push({ slug, url, hide: [], wait: 1500 });
writeFileSync(sitesFile, JSON.stringify(sites, null, 2) + "\n");
console.log(`✓ tools/sites.json  (${slug})`);

// 2) projects-data.js
const dataFile = "js/projects-data.js";
let data = readFileSync(dataFile, "utf8");
if (data.includes(`slug: "${slug}"`)) {
  console.log("• js/projects-data.js already has this slug, card left as is");
} else {
  const esc = (s) => s.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
  const entry = `
    {
      slug: "${slug}",
      name: "${esc(name)}",
      description:
        "${esc(description || `A responsive website designed and developed for ${name}.`)}",
      tech: ["HTML5", "CSS3", "JavaScript"], // TODO: set the real tech stack
      screenshots: {
        // placeholders: replaced automatically once screenshots are captured
        desktop: "./images/client-work/placeholder-desktop.svg",
        tablet:  "./images/client-work/placeholder-tablet.svg",
        mobile:  "./images/client-work/placeholder-mobile.svg"
      },
      placeholder: true
    },`;
  const re = /clientWork:\s*\[/;
  if (!re.test(data)) { console.error("Could not find `clientWork: [` in js/projects-data.js"); process.exit(1); }
  data = data.replace(re, (m) => m + entry);
  writeFileSync(dataFile, data);
  console.log("✓ js/projects-data.js  (new card added at the top; edit description/tech there)");
}

// 3) screenshots
if (noCapture) { console.log("Skipped capture. Run:  node tools/capture-all.mjs " + slug); process.exit(0); }
const r = spawnSync(process.execPath, ["tools/capture-all.mjs", slug], { stdio: "inherit" });
process.exit(r.status ?? 0);
