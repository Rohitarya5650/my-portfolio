// One-shot SEO/contact setup. Run ONCE with your real values:
//   node tools/apply-seo-config.mjs --domain https://www.yoursite.com --whatsapp 919876543210 \
//        [--city Jaipur --state Rajasthan --region IN-RJ]
// It fills in: canonical / Open Graph / sitemap / robots / JSON-LD URLs, the WhatsApp number
// (js/site-config.js) and the phone number in the JSON-LD business data.
// City/state/region default to Jaipur / Rajasthan / IN-RJ (only pass them to CHANGE them).
import { readFileSync, writeFileSync } from "node:fs";

const a = Object.fromEntries(process.argv.slice(2).reduce((acc, v, i, arr) => {
  if (v.startsWith("--")) acc.push([v.slice(2), arr[i + 1]]);
  return acc;
}, []));
const rw = (f, fn) => writeFileSync(f, fn(readFileSync(f, "utf8")));
const TOKEN = "https://YOUR-DOMAIN.com";

if (a.domain) {
  if (!/^https:\/\/[^/\s]+$/.test(a.domain)) throw new Error("--domain must look like https://www.example.com (no trailing slash)");
  for (const f of ["index.html", "robots.txt", "sitemap.xml"]) rw(f, (s) => s.split(TOKEN).join(a.domain));
}
if (a.whatsapp) {
  const digits = a.whatsapp.replace(/\D/g, "");
  if (digits.length < 10) throw new Error("--whatsapp needs country code + number, e.g. 919876543210");
  rw("js/site-config.js", (s) => s.replace(/whatsappNumber:\s*"[^"]*"/, `whatsappNumber: "${digits}"`));
  rw("index.html", (s) => s.includes('"telephone"') ? s : s.replace(/(\s*)"knowsAbout"/, `$1"telephone": "+${digits}",$1"knowsAbout"`));
}
const swap = (from, to) => to && rw("index.html", (s) => s.split(from).join(to));
swap("Jaipur", a.city); swap("Rajasthan", a.state); swap("IN-RJ", a.region);
console.log("Done. Remaining placeholders:", readFileSync("index.html", "utf8").includes(TOKEN) ? "domain NOT set" : "none");
