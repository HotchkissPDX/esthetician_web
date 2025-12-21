### Goal
Make a React + Vite site (hosted on GitHub Pages) SEO-friendly by:
- Injecting correct head tags with `react-helmet-async`
- Prerendering routes to static HTML so crawlers see tags immediately
- Deploying the prerendered output to GitHub Pages

---

### Prerequisites
- React + Vite project (already in place)
- GitHub Pages deployment (already configured)
- React Router (assumed) for multi-page routes

Key project routes (from docs): `/`, `/about`, `/services`, `/testimonials`, `/contact`, `/book`

---

### Part 1 — Add `react-helmet-async`

1) Install
```
npm i react-helmet-async
```

2) Wrap the app once with `HelmetProvider` (usually in `src/main.jsx` or `src/App.jsx`)
```jsx
// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.jsx';

const helmetContext = {};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider context={helmetContext}>
      <App />
    </HelmetProvider>
  </React.StrictMode>
);
```

3) Add per-page metadata with `Helmet` (example: `src/pages/Services.jsx`)
```jsx
import { Helmet } from 'react-helmet-async';

export default function Services() {
  const url = 'https://<your-domain>/services';
  const title = 'Facials, Peels, and Skincare Services | Sage Esthetics';
  const desc = 'Personalized facials, chemical peels, and acne treatments designed for clear, glowing skin.';
  const ogImage = 'https://<your-domain>/og/services.jpg'; // absolute URL

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={desc} />
        <link rel="canonical" href={url} />

        {/* Open Graph / Twitter */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={desc} />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={ogImage} />
        <meta name="twitter:card" content="summary_large_image" />

        {/* Optional robots control */}
        <meta name="robots" content="index, follow, max-image-preview:large" />
      </Helmet>
      {/* page UI */}
    </>
  );
}
```

4) Provide sensible defaults at a layout level (so each page only overrides what it needs)
```jsx
// src/components/SeoDefaults.jsx
import { Helmet } from 'react-helmet-async';

export default function SeoDefaults() {
  return (
    <Helmet>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#2e7d6b" />
      <meta name="robots" content="index, follow" />
      <meta property="og:site_name" content="Sage Esthetics" />
      <meta name="twitter:site" content="@yourhandle" />
      {/* add favicon, apple-touch-icon, manifest links here if needed */}
    </Helmet>
  );
}
```
Use `SeoDefaults` once near the top of your app shell.

5) JSON‑LD for rich results when relevant (local business, FAQ, etc.)
```jsx
<Helmet>
  <script type="application/ld+json">{`
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Sage Esthetics",
    "image": "https://<your-domain>/og/brand.jpg",
    "url": "https://<your-domain>/",
    "telephone": "+1-555-555-5555",
    "address": { "@type": "PostalAddress", "streetAddress": "123 Main St", "addressLocality": "City", "addressRegion": "CA", "postalCode": "94000", "addressCountry": "US" }
  }
  `}</script>
</Helmet>
```

Tips
- Use absolute URLs for `og:image` and `canonical`.
- Keep titles ~50–60 chars, descriptions ~155–160 chars (guidelines, not strict limits).
- Use `<meta name="robots" content="noindex">` on thin/staging pages and remove for production.

---

### Part 2 — Prerender your routes (static HTML)

For GitHub Pages, prerendering ensures crawlers/social scrapers see meta tags in the initial HTML without executing JS.

#### Use a Vite prerender plugin (Puppeteer-based)
A prerender plugin will build the SPA and then render specified routes in headless Chrome, saving each final HTML to `dist`.

1) Install
```
npm i -D vite-plugin-prerender puppeteer
```

2) Configure in `vite.config.ts`/`vite.config.js`
```js
// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import prerender from 'vite-plugin-prerender';
import path from 'node:path';

export default defineConfig({
  plugins: [
    react(),
    prerender({
      staticDir: path.resolve(__dirname, 'dist'),
      routes: [
        '/',
        '/about',
        '/services',
        '/testimonials',
        '/contact',
        '/book'
      ],
      // optional: tweak renderer settings, wait for network idle, etc.
      // rendererOptions: { renderAfterDocumentEvent: 'app-ready' }
    })
  ],
  base: '/', // or '/<repo-name>/' if using a project page
});
```
The plugin runs after `vite build`, opens each route in headless Chrome, and writes the fully rendered HTML (including Helmet tags) into `dist`.

3) Ensure your router supports static paths
- Use `createBrowserRouter` or `BrowserRouter` normally; prerender plugins load the built app and navigate to each path.
- If you need a trailing-slash policy, keep it consistent across `routes` and Router.

4) Build
```
npm run build
```
Inspect `dist/<route>/index.html` or `dist/index.html` to confirm head tags are present in the HTML source.

---

### Part 3 — Deploy prerendered output to GitHub Pages

Your repo already has a GitHub Actions workflow at `.github/workflows/deploy.yml`. Ensure it:
- Installs deps
- Builds the site
- Commits/prunes `dist` to the `gh-pages` branch (or uses `actions/deploy-pages` for the `pages` deployment)

Example (static site to GitHub Pages via `actions/upload-pages-artifact`):
```yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch: {}

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20' }
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```
If you use Option A (prerender plugin), ensure the build step triggers prerendering (most plugins run during `vite build`). If not, add a separate prerender script step: `npm run prerender`.

GitHub Pages base URL
- For user/organization pages (domain root), set `base: '/'` in `vite.config` and ensure `CNAME` is present (you already have `CNAME`).
- For project pages at `https://user.github.io/repo`, set `base: '/repo/'` and make sure your router and canonical links reflect that.

---

### Part 4 — Sitemaps and robots

Add a sitemap to help discovery:
- Generate at build time with `sitemap` package
```
npm i -D sitemap
```
```js
// scripts/generate-sitemap.mjs
import { SitemapStream, streamToPromise } from 'sitemap';
import { createWriteStream } from 'node:fs';

const hostname = 'https://<your-domain>';
const routes = ['/', '/about', '/services', '/testimonials', '/contact', '/book'];

const smStream = new SitemapStream({ hostname });
const writeStream = createWriteStream('./dist/sitemap.xml');
smStream.pipe(writeStream);
routes.forEach((url) => smStream.write({ url, changefreq: 'monthly', priority: 0.8 }));
smStream.end();
await streamToPromise(smStream);
```
Add to build pipeline after `vite build`.

Create `public/robots.txt`:
```
User-agent: *
Allow: /
Sitemap: https://<your-domain>/sitemap.xml
```
`public/` files are copied to `dist/` by Vite.

---

### Part 5 — Validate

- After build/prerender, open `dist/index.html` and other route HTML files and check:
  - `<title>` and `<meta name="description">` are present
  - `link rel="canonical"` is correct
  - OG/Twitter tags present with absolute URLs
- Use social debuggers to verify:
  - Facebook Sharing Debugger
  - X/Twitter Card Validator
  - LinkedIn Post Inspector
- Use `curl -s https://<your-domain>/services | grep -i '<meta'` to verify head tags are in server response.

---

### Part 6 — Common pitfalls and fixes

- Missing absolute URLs for OG images — social previews break. Always use `https://...` for `og:image`.
- Wrong Vite `base` on GitHub Project Pages — causes broken asset links. Set `base` properly.
- Client-side only tags — if prerender isn’t running or route isn’t listed, initial HTML lacks tags. Ensure all public routes are included in `routes` for prerender.
- Dynamic data in Helmet (from JSON) — prerender waits for network idle. If you fetch locally hosted JSON, it should resolve during prerender. If not, configure the plugin’s `renderAfterDocumentEvent` and dispatch that event when data is ready.
- Duplicated canonical tags — centralize defaults and override per page only as needed.

---

### Quick checklist
- [ ] `react-helmet-async` installed and `HelmetProvider` wrapped
- [ ] Each route has unique `title` + `meta description` (+ OG/Twitter)
- [ ] Prerender plugin configured with all routes
- [ ] Build produces HTML with meta tags visible in page source
- [ ] `sitemap.xml` and `robots.txt` included
- [ ] GitHub Pages workflow deploys `dist/`