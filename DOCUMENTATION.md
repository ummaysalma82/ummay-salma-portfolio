# Ummay Salma — Portfolio Website Documentation

Single-page portfolio: `ummay_salma_portfolio.html` (HTML + CSS + JavaScript in one file, no build step, no libraries).
Last updated: 31 October 2026.

---

## 1. Files in this folder

| File | What it is |
|---|---|
| `ummay_salma_portfolio.html` | The website. Open it in any browser to preview. |
| `google-apps-script.gs` | Optional script that saves form questions to Google Sheets / Google Docs. Not part of the website itself — you paste it into Google Apps Script (see §6, Option B). |
| `DOCUMENTATION.md` | This guide. |

---

## 2. Change log — this update

| # | Request | What changed |
|---|---|---|
| 1 | Better logo, with an option to insert a logo image | The "US" monogram was redesigned as typography: white **U** + gradient **S**, tighter letter-spacing, a small cyan accent dot, a larger 42 px tile and a hover effect. A logo-image option was added through `SITE_CONFIG.logoImage` (see §4). If the image path is wrong, the "US" typographic logo is shown automatically — the header never breaks. |
| 2 | New designation | Hero line now reads **Product Designer · UI & UX Designer · Graphic Designer**. For consistency the same wording was applied to the browser tab title, the search description (meta description) and the first sentence of the About section. |
| 3 | Areas I love working on | Now: **Mobile Apps · Product Design · Web Experiences · UX Research** ("SaaS Products" was replaced by "Product Design"). |
| 4 | StockFlow = upcoming / running project | A pulsing **IN PROGRESS** badge sits on the StockFlow card image. The StockFlow pop-up also shows "In progress · full case study coming soon". |
| 5 | Email + question form | Email `salmamonowara@gmail.com` is shown in the Contact section with a *Copy* button. A new form titled **Have any question?** has **Name**, **Email** and **Message** fields. Submissions go to your email (Option A) and, if you set it up, also to Google Sheets / Google Docs (Option B). |
| 6 | Back to top not working | Fixed (cause explained in §7). Works for the footer link, the Contact link and the logo. |
| 7 | Documentation | This file, plus short comments inside the code. |

### Update 2 — Behance links in the project pop-ups

The placeholder sentence at the bottom of each project pop-up ("Replace this overview with a link…") was replaced by a highlighted link button (gradient card with an arrow). It opens in a new tab.

| Project | Button text | Opens |
|---|---|---|
| BookLoop | View BookLoop on Behance | Bookloop case study |
| Delivera | View Delivera on Behance | Delivera case study |
| Nestora | View Nestora on Behance | Nestora (Nastora) rental case study |
| StockFlow | **Check out my other projects** | "Styled Comfort" clothing brand landing page on Behance |

Note: the StockFlow button deliberately points to a different project (it is still in progress). The Nestora link on Behance is spelled "Nastora" in its own address; the address is used exactly as given.

### Update 3 — your own images in the Hero, Work and About sections

Before this update, those visuals were drawn with CSS (not pictures), so they could not be swapped. Now each one has an image slot in `SITE_CONFIG.images` (§4A). Leave a slot empty and the original illustration stays.

**Extra fix found while testing:** on phones the decorative glow in the hero made the page 560 px wide (it could be dragged sideways). It is now clipped, so the page fits the screen width.

---

## 3. How the page is organised

Top to bottom: Header (logo + navigation) → Hero → Areas strip → **Work** (4 project cards) → **About** → **Process** → **Skills** → **Contact** (email + form) → Footer.

Inside the file:

1. `<style>` — all design. Colours are CSS variables at the top (`:root`). Change `--cyan`, `--blue`, `--purple` etc. to retheme the whole site.
2. `<body>` — the content, section by section (each section has an `id`: `work`, `about`, `process`, `skills`, `contact`).
3. `<script>` — starts with **`SITE_CONFIG`** (the settings you are most likely to change), then the behaviour: menu, scroll effects, project pop-up, copy buttons, back-to-top, question form.

---

## 4. Logo

**Default:** the typographic "US" monogram (nothing to do).

**To use your own logo image:**

1. Export your logo as PNG (transparent background), SVG or WebP. Height around 84–120 px works well; it is shown at 42 px tall.
2. Put it in an `assets` folder next to `ummay_salma_portfolio.html` (e.g. `assets/logo.png`).
3. In the `SITE_CONFIG` block near the end of the HTML file set:

```js
logoImage: 'assets/logo.png',
logoImageAlt: 'Ummay Salma logo',
hideNameWithLogo: false,   // true = show only the image, hide the "ummaysalma." text
```

If your logo already contains your name, set `hideNameWithLogo: true`.
To go back to the typographic logo, set `logoImage: ''`.

> When you upload the site to a host, upload the `assets` folder too, otherwise the image will not be found (the "US" logo will be shown instead).

---

## 4A. Replacing the illustrations with your own images

Three places can use your pictures. Open the HTML file, find `SITE_CONFIG` (end of the file, inside `<script>`) and fill the `images` block:

```js
images: {
  hero:  { src: 'assets/hero.jpg',  alt: 'Ummay Salma — portfolio hero image' },
  about: { src: 'assets/about.jpg', alt: 'Portrait of Ummay Salma' },
  projects: {
    bookloop:  { src: 'assets/bookloop.jpg',  alt: 'BookLoop app screens' },
    delivera:  { src: 'assets/delivera.jpg',  alt: 'Delivera app screens' },
    nestora:   { src: 'assets/nestora.jpg',   alt: 'Nestora website screens' },
    stockflow: { src: 'assets/stockflow.jpg', alt: 'StockFlow dashboard screens' }
  }
}
```

### Steps
1. Create a folder named `assets` next to `ummay_salma_portfolio.html`.
2. Export your images (sizes below) and put them in that folder.
3. Write each file path in the matching `src`. Leave `src: ''` to keep the illustration.
4. Refresh the page (hard refresh: Ctrl/Cmd + Shift + R).
5. When you publish, upload the `assets` folder too.

### Best sizes (export at 2× so they stay sharp on retina screens)

| Slot | Shape on the page | Export size | What happens on the page |
|---|---|---|---|
| Hero | Portrait, 4:5 | **800 × 1000 px** | Replaces the dashboard card. The orbit lines and the two floating chips ("Human-centered", "Product thinking") stay on top. |
| About | Square (about 1:1) | **800 × 800 px** | Fills the rounded frame. The "Designing with intent" caption and the "Curiosity → Clarity → Craft" sticker stay, on a soft dark shade at the bottom. |
| Each project | Landscape, about 19:10 | **1200 × 640 px** | Fills the card top. The "In progress" badge on StockFlow stays. Slight zoom on hover. |

### Good to know
- **Cropping:** images fill their frame and are cropped from the centre. On phones the project cover is less wide, so the sides are trimmed — keep the important part (phone screens, logo, face) in the middle.
- **To show the whole image without cropping,** change `object-fit: cover` to `object-fit: contain` in the CSS rules `.hero-image`, `.project-img` or `.about-img`.
- **File format and weight:** JPG or WebP for photos/screens, PNG or SVG when you need transparency. Aim for under 300 KB each so the page loads fast (tools like squoosh.app help).
- **File names:** use lowercase letters, numbers and hyphens, no spaces (`bookloop-cover.jpg`).
- **Web links:** a full `https://…` address also works, but do not link to Behance/Instagram images directly — those sites can block or change them. Download the image and keep it in `assets`.
- **Wrong path?** The illustration stays and nothing breaks. In Chrome, open DevTools → Console to see which path was not found.
- **Alt text:** write a short description of what the image shows. It is read by screen readers and helps accessibility and SEO.

---

## 5. Everyday edits

| What | Where |
|---|---|
| Designation line | Search for `Product Designer ·` in the hero (`<p class="eyebrow">`). |
| Areas I love working on | `<div class="focus-items">` — one `<span><i></i> Name</span>` per item. |
| Project title / text / tags | The matching `<article class="project-card">`, plus its pop-up text in `projectInfo` in the script. |
| Mark a project "In progress" | Add `<span class="status-badge art-status"><i></i> In progress</span>` inside its `project-art` block (copy it from StockFlow), and add `status: '...'` to that project in `projectInfo`. |
| **Remove** the badge when StockFlow is finished | Delete that `<span class="status-badge …">` line and the `status:` line in `projectInfo.stockflow`. |
| Change a project's Behance link or button text | In the script, find `projectInfo` → the project → edit `link` (the address), `linkKicker` (small text above) and `linkLabel` (button text). Leave `link` out and the button is hidden for that project. |
| Email address | `SITE_CONFIG.email` (all email links on the page update). Also change it in `formEmailEndpoint` (§6) and in `google-apps-script.gs` if you use them. |
| Behance link | Search for `ummaysalma82` (3 places). |

---

## 6. Question form — how messages reach you

The website is plain HTML, so it cannot send email by itself. The form therefore posts to a free service. Two options are built in; use A, B, or both.

### Option A — send each question to your email (already switched on)

Uses **FormSubmit** (formsubmit.co), free, no account.

1. Upload / host the website (§8). *(Opening the file straight from your computer may be blocked by the browser; test on the hosted link.)*
2. Open the live site and send **one test question**.
3. FormSubmit emails `salmamonowara@gmail.com` an **activation link**. Click it once (check Spam/Promotions).
4. Done. Every new question now arrives in your inbox as a table (name, email, message, page). Use *Reply* to answer the visitor.

Notes
- Until step 3 is done, questions are **not** delivered.
- Your email address appears in the page source because it is in the form's address. It is already shown publicly in the Contact section, so nothing new is exposed. If you want it hidden, FormSubmit can give you a random-looking alias after activation — replace the address in `formEmailEndpoint` with that alias.
- The form includes a hidden "honeypot" field to catch most spam bots.

### Option B — also save each question to Google Sheets / Google Docs

Uses **Google Apps Script** (free, inside your own Google account). Each question becomes a new row in a Google Sheet; optionally also a new entry in a Google Doc and an email copy.

1. Go to **sheets.google.com**, create a blank spreadsheet, name it e.g. *Portfolio questions*.
2. Menu **Extensions → Apps Script**.
3. Delete the sample code and paste everything from `google-apps-script.gs`. Click **Save**.
4. *(Optional)* To also log into a Google Doc: create a Doc, copy the long ID from its URL (`docs.google.com/document/d/`**`THIS-PART`**`/edit`) and paste it into `DOC_ID`.
5. Click **Deploy → New deployment → ⚙ Select type → Web app**.
   - *Execute as:* **Me**
   - *Who has access:* **Anyone**
   - Click **Deploy** and approve the permission screen (Google shows "unverified app" because it is your own script: *Advanced → Go to project*).
6. Copy the **Web app URL** (ends with `/exec`).
7. In `ummay_salma_portfolio.html`, in `SITE_CONFIG`, paste it:

```js
googleScriptUrl: 'https://script.google.com/macros/s/XXXXXXXX/exec'
```

8. Send a test question. A row should appear in the **Questions** tab.

If you change the Apps Script code later, use **Deploy → Manage deployments → ✏ → New version**; the URL stays the same.

Why a Sheet and not "only a Doc"? A Sheet keeps Name / Email / Message in separate columns, which is easier to sort and search. The Doc option is included because you asked for it.

### What the visitor sees

- Empty or invalid fields: red outline + a small message (no sending).
- Sending: button is disabled while it works.
- Success: green "Thank you! Your question has been sent…" and the form clears.
- Failure (no internet, service down): a message with your email address as a clickable fallback.

---

## 7. Back-to-top bug — cause and fix

**Cause:** the "Back to top" links pointed to `#top`, and `id="top"` was on the header. The header is `position: fixed` (it stays glued to the screen), and a browser cannot scroll *to* an element that is fixed to the screen, so nothing happened.

**Fix:**
- `id="top"` now sits on a normal, invisible anchor at the very start of the page.
- A small script also forces a smooth scroll to the top (it respects the visitor's "reduce motion" setting).

---

## 8. Publishing

Any static host works (Netlify Drop, GitHub Pages, Cloudflare Pages, Vercel). Upload `ummay_salma_portfolio.html` (rename it to `index.html` so the plain address opens it) and the `assets` folder if you use a logo image.

### Before you publish — checklist

- [ ] Option A activated (§6) and a test question received.
- [ ] If using Option B: a test row appears in the Sheet.
- [ ] Click *Explore concept* on all four projects and confirm each Behance button opens the right page. When StockFlow's case study is published, change its `link` and `linkLabel` in `projectInfo`.
- [ ] Behance links open your profile.
- [ ] Check on a phone: menu, form, Back to top.
- [ ] If using a logo image or any of the section images: the `assets` folder is uploaded.

---

## 9. What was tested (31 Oct 2026, desktop 1366 px and phone 390 px, Chrome)

22 automated checks passed (plus 4 more for the Behance links in Update 2 — each pop-up button has the correct address and opens in a new tab): designation text; focus areas; US logo and image-logo switch; StockFlow badge + pop-up status (and absent on other projects); email text and `mailto:` link; form title and labels; empty-form and bad-email blocking; valid submission (request body contained name, email, message); success message and form reset; failure fallback with email link; Back to top from footer, Contact and logo; no JavaScript errors; no sideways scrolling on phone.

**Not tested here:** real delivery to your inbox / Google Sheet (needs your activation and your Google account — the steps in §6). The sending requests were simulated in the test.

---

## 10. Troubleshooting

| Problem | Likely reason | Fix |
|---|---|---|
| Form says "Sorry, something went wrong" | Opened the file directly from the computer, or no internet | Test on the hosted link. |
| Form says success but no email arrives | Activation link not clicked yet | Click the FormSubmit activation email (check Spam). |
| Nothing appears in Google Sheet | Web app access not set to "Anyone", or old deployment | Redeploy as in §6 B step 5 and re-paste the `/exec` URL. |
| Logo image not showing | Wrong path or folder not uploaded | The "US" logo shows meanwhile; fix `logoImage` path. |
| A hero / About / project image does not appear | Wrong path, wrong file name (capital letters matter on most hosts), or `assets` folder not uploaded | Fix the `src` path; the illustration stays until the image loads. |
| Changes not visible | Browser cache | Hard refresh (Ctrl/Cmd + Shift + R). |
