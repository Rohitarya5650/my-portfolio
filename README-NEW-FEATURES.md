# New portfolio features — setup guide

Everything you may need to edit lives in **`js/`**:

| File | What you edit |
|---|---|
| `js/projects-data.js` | My Projects (GitHub URLs) and Client Work (screenshots) |
| `js/site-config.js` | Sponsorship URL, Supabase keys for reviews |
| `sql/reviews-setup.sql` | Run once in Supabase |

## 1. Client screenshots (automatic, 3 ways)
Visitors never see the live site: only real full-page screenshots (desktop / tablet / mobile). The card and the viewer pick the one that matches the visitor's screen, and scrolling works with mouse, touch and keyboard.

**A. One command: add a client + capture** (needs `npm install` once; uses Chrome/Edge already on your PC)
```
node tools/add-client.mjs "Client Name" client-slug https://client-site.com "Short description"
```
Adds the card + site entry and captures desktop/tablet/mobile. Refresh the portfolio. Edit `description` / `tech` in `js/projects-data.js`.

**B. Windows double-click:** `capture-screenshots.bat` (installs tools the first time, then captures every site in `tools/sites.json`).

**C. In the cloud (no local browser / DNS problems):** push the project to GitHub, then Actions tab -> "Capture client screenshots" -> Run workflow. It captures and commits the images for you. (`tools/add-client.mjs ... --no-capture` adds the card without capturing.)

Per-site options in `tools/sites.json`: `"hide": [".cookie-banner"]` (CSS selectors to hide), `"wait": 3000` (extra ms for slow/animated sites).
Own screenshots instead? Set `screenshots: { desktop, tablet, mobile }` in `js/projects-data.js` manually.

## 2. My Projects → GitHub links
Fill in `github: "https://github.com/Rohitarya5650/<repo>"` for each project. Until you do, the button opens your GitHub profile.

## 3. Reviews backend (Supabase — free tier is enough)
1. Create a project at supabase.com.
2. SQL Editor → paste `sql/reviews-setup.sql` → Run.
3. Project Settings → API → copy **Project URL** and the **anon public** key into `js/site-config.js`. (Never use the `service_role` key.)
4. **Approving reviews:** Table Editor → `reviews` → change `status` from `pending` to `approved`. Only approved rows appear on the site, and emails are never exposed (the site reads a view without the email column).
Until the two values are set, the form is disabled and shows a notice (details on localhost, a neutral message for visitors).

## 4. Sponsorship
Put your own https URL in `sponsorUrl` (`js/site-config.js`). If left empty, "Propose Sponsor" opens the contact form with *Sponsorship* pre-selected.

## 5. Contact form
The new **Inquiry Type** field is sent to Web3Forms as `inquiry_type` with the rest of the form.

## 6. SEO + WhatsApp setup (do this once before publishing)
```
node tools/apply-seo-config.mjs --domain https://www.yoursite.com --whatsapp 919876543210
```
- Fills the canonical / Open Graph / sitemap / robots / structured-data URLs and your WhatsApp number (`js/site-config.js`), and adds your phone to the business schema.
- Defaults to **Jaipur / Rajasthan / IN-RJ**. To change the city: add `--city Pune --state Maharashtra --region IN-MH`.
- WhatsApp buttons (hero, below Services, under every client project, footer) all open a chat with your number and the pre-filled message from `whatsappMessage` in `js/site-config.js`.

After deploying: add the site in Google Search Console and submit `sitemap.xml`; create a free Google Business Profile (service-area business, Jaipur) using the same name and phone; link the site from your GitHub, LinkedIn and Instagram bios.
