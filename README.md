# 📖 TruthSnapshot Protocol (Powered by [TruthOrigin](https://truthorigin.com))

**The definitive solution for SEO in WebAssembly, SPA, and decentralized environments.**
TruthSnapshot enables **blazing-fast pre-rendered pages** with accurate SEO metadata for every route, while maintaining dynamic client-side routing.

**TruthSnapshot is a next-gen snapshot and SEO system built for modern frontend frameworks — including Blazor WebAssembly, React, Angular, Vue, and even IPFS/Web3.** This is not framework dependant! This works anywhere and on anything!
It enables instant-loading, search engine–friendly HTML snapshots that are **pre-rendered, metadata-optimized, and hydration-aware** — all without SSR, Puppeteer, or backend hacks.

By placing a single script in your app and running our snapshot tool, you gain **dynamic per-page SEO**, blazing-fast initial load times, and **full control over routing and metadata — even on decentralized or static hosting.**

TruthSnapshot bridges the gap between rich client-side apps and structured web visibility.  
**Now, your content isn’t just beautiful. It’s discoverable.**

---

## ⚡ Quick Start

Add this to your `index.html` of your WASM application:

```html
<a href="/index/index.html" style="display: none;" aria-hidden="true" tabindex="-1">Bot Gateway</a>

<script
  id="truthorigin-snapshot"
  data-version="1"
  data-force-origin="false"
  src="https://cdn.jsdelivr.net/gh/magiccodingman/TruthSEO.SnapshotClient@main/truthseo-snapshot.js">
</script>
```
* ✅ Enables the TruthSnapshot hydration and version control.
* ✅ `data-version` lets you enforce sync between snapshots and the live site.
  - Suggested you bump this up any time you directly make updates/changes to your index.html
* ✅ `data-force-origin` (optional) forces live index.html hydration every time.
* ✅ The hidden `<a>` tag ensures bots discover your `/index` snapshot.

---

## 🧬 How Snapshotting Works

With your index.html updated, you can republish your application and use your true base domain. Or if you wish, you can just use your local host url. Either way, make sure your `sitemap.xml` uses URLs from your localhost or live production environment before running the snapshots. As all snapshots are utilizing your resources client side.
1. Go to: [https://TruthOrigin.com/tools/wasm-snapshot](https://truthorigin.com/tools/wasm-snapshot)
2. Upload a `sitemap.xml`
3. The tool:
   - Loads pages in a iframe
   - Waits for `<truthseo-snapshot-ready>` to appear
   - Extracts clean DOM and sanitized SEO metadata
   - Outputs a `.tar` archive of snapshot files
4. Unzip the tar file.
5. Build your WASM for release.
6. Copy all the folders and files from the provided tar file directly into your built wwwroot folder.
   - It’s recommended not to include snapshot files in source control to avoid unnecessary clutter.
7. Publish your wasm!

> ✨ Files are stored as `path/to/page/index.html` instead of extensionless files.

---

## 🏷️ Declaring Snapshot Readiness

After your app has hydrated, inject:

```html
<truthseo-snapshot-ready>
  <title>Your Page Title</title>
  <meta name="description" content="Your description here">
  <link rel="canonical" href="https://yourdomain.com/page">
  <script type="application/ld+json">{ ... }</script>
</truthseo-snapshot-ready>
```

* ✅ This content replaces the `<head>` contents during snapshot.
* ✅ All pre-existing `<title>`, canonical tags, meta tags (except charset, viewport, http-equiv), and JSON-LD are stripped before injecting this.

A script is also injected near the `</body>` to:
- Compare snapshot version to origin `/index.html`
- Redirect if `data-version` mismatch is found
- Maintain seamless hydration without full reload if versions match

If `data-force-origin="true"`, redirection always occurs regardless of version match.

---

## ✨ What the Snapshot Includes

Each snapshot consists of:
- ✅ A proper folder structure ending in `/index.html`
- ✅ Injected `<head>` containing:
  - Cleaned metadata
  - Your declared `<truthseo-snapshot-ready>` contents
  - `<meta name="truthseo:snapshot-version" content="X">`
- ✅ Embedded logic near `</body>` for version sync & hydration
- ✅ Your app's DOM at full hydration state

---

## Index Page Suggestion

Not your index.html but your routed and hydrated index page that is your base `/` route. For the snapshot you do need to have a `truthseo-snapshot-ready` tag as that's the initiator for the snapshot system to know it is loaded as it always starts from origin. But I suggest on your hydrated index page you add:
```html
<truthseo-snapshot-ready>
    <meta name="robots" content="noindex, follow" />
</truthseo-snapshot-ready>
```

As the index.html will have your actual index SEO, but when the bot sees the hidden href tag going to `/index/index.html`, we are telling the bot, "yes come to this page, but don't index it because it doesn't exist. This is just your visual gateway to see my nav bar and other links to begin your crawl exploration. So don't index this fake index page, just follow the links."

---

## 🧐 How It Works for Users & Bots

- 🔍 Bots see fully formed HTML with SEO and semantic metadata
- 👤 Users land on fast-loading pre-rendered content with no hydration delay
- ✨ If snapshot version is outdated, a soft redirection syncs back to latest `/index.html`
- 🚀 Framework hydration begins **without reload** if version matches

Works on:
- Blazor WebAssembly
- Angular / React / Vue
- Web3 + IPFS paths
- Static Hosts (e.g., Azure Static Web Apps, Netlify, GitHub Pages)
- Literally anything!

---

## ⚠️ Your Responsibility

You must:
- ✅ Keep snapshots updated with new content
- ✅ Ensure snapshot metadata truthfully reflects visible content

Misleading metadata can result in SEO penalties. The protocol empowers honest visibility.

---

**TruthSEO: Bringing visibility to the invisible web — one snapshot at a time.**
