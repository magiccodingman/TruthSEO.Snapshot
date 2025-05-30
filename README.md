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
   - Loads pages in an iframe
   - Waits for `<truthseo-snapshot-ready>`
   - Extracts clean DOM and sanitized SEO metadata
   - Outputs a `.tar` archive of snapshot files
4. Unzip the tar file.
5. Build your WASM for release.
6. Copy all the folders and files from the provided tar file directly into your built wwwroot folder.
   - It’s recommended not to include snapshot files in source control to avoid unnecessary clutter.
7. Publish your wasm!

> ✨ Files are stored as `path/to/page/index.html`.

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

Not your physical `index.html`, but your hydrated homepage route (`/`) — the one users and bots actually see. For the snapshot you do need to have a `truthseo-snapshot-ready` tag as that's the initiator for the snapshot system to know it is loaded as it always starts from origin. But I suggest on your hydrated index page you add:
```html
<truthseo-snapshot-ready>
    <meta name="robots" content="noindex, follow" />
</truthseo-snapshot-ready>
```

As the index.html will have your actual index SEO, but when the bot sees the hidden href tag going to `/index/index.html`, we are telling the bot, "yes come to this page, but don't index it because it doesn't exist. This is just your visual gateway to see my nav bar and other links to begin your crawl exploration. So don't index this fake index page, just follow the links."

Or if you're feeling bold, why not put real SEO on your page, then replace your `wwwroot/index.html` with the `wwwroot/index/index.html`? Then every single page loads lightning fast with your snapshot pre render! The world is your burrito.

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
- ❗ Keep your snapshots updated. Misleading or outdated metadata will hurt SEO.
- ❗ Ensure snapshot metadata truthfully reflects visible content

Misleading metadata can result in SEO penalties. The protocol empowers honest visibility.

---

**TruthOrigin: Bringing visibility to the invisible web — one snapshot at a time.**

We give you the tools, the transparency, the fully mapped out guide as to how to resolve all your problems. But, your time is worth something. Let us help. Head over to [TruthOrigin.com](https://truthorigin.com) to learn how we can help you. Snapshots, SEO, CMS, you think that's SSR only? No! Let us empower your project today. We bring protocol to infrastructure.


---

## 🔍 Hosting & Routing Warnings (Must Read!)

While **TruthSnapshot Protocol** works across nearly all platforms and frontend frameworks, **your static host and routing practices can make or break your site's SEO visibility**. Below are critical warnings and best practices:

---

### 🆎 Route Capitalization Matters

TruthSnapshot supports **case-sensitive routing**, matching each route **exactly** as written in your `sitemap.xml`.

However, **many static hosts auto-lowercase URLs**, including paths in file systems, which can break this mapping silently.

**✅ Best Practice:**
Keep **all URLs lowercase** — in your app, sitemap, and snapshot references — to avoid mismatches, broken snapshot mapping, and unpredictable crawl behavior.

---

### 🧨 The Hidden ETag Problem

**Some static hosts (like Azure Static Web Apps)** add **identical `ETag` headers to every page**, regardless of content. While seemingly harmless, this causes **catastrophic SEO issues**:

* 🔍 Search engines like Google rely on `ETag` to detect content changes.
* ⚠️ If every page returns the **same `ETag`**, Google assumes all your pages are **identical**.
* ❌ Your site won't get crawled properly. Even when snapshots are perfectly structured, your content will be ignored.

This is a **host-level flaw** — **not** an issue with TruthSnapshot.

---

### ✅ Recommended Hosting: Netlify (or Others with Header Control)

To demonstrate the protocol in action, check out our live production demo:
📍 **[https://actiontermite757.com/](https://actiontermite757.com/)** (Built with 💙 for a local hero)

We recommend **Netlify**, as it allows you to override default behavior via `_headers` and `_redirects` in `wwwroot`:

#### `_headers` (Disables harmful caching and resets ETags)

```
/
  Cache-Control: no-store
  ETag: ""

/index.html
  Cache-Control: no-store
  ETag: ""

/ant/
  Cache-Control: no-store
  ETag: ""

/bed-bug/
  Cache-Control: no-store
  ETag: ""
```

As you can see each of the `ETag: ""` is an empty string. This is how the harmful identical `Etag` Id was bypassed.

#### `_redirects` (Fixes capitalization mismatches)

```
/Ant         /ant         301
/Ant/        /ant/        301
/Bed-Bug     /bed-bug     301
```

**📌 These changes ensure that:**

* Snapshots map correctly to actual routes
* Bots don’t get confused by misleading `ETag`s
* Your SEO metadata is respected and indexed accurately

---

### ❗ Final Takeaways

* Keep **all routes lowercase**
* Avoid static hosts that add **non-overridable `ETag`s**
* Use `_headers` to neutralize dangerous defaults
* Use `_redirects` to enforce clean, lowercase routing
* Validate your sitemap and snapshot output match your live routes precisely

---

TruthSnapshot gives you total control — but **you must choose a host that doesn’t fight you.**
Be mindful. Be visible.

---

## 🌐 Suggested Static Hosts (with ETag Control)

TruthSnapshot requires fine control over headers — especially **ETag overrides**, which are essential for proper SEO and indexing. Most static hosts assume “index.html-only routing,” which conflicts with how TruthSnapshot maps snapshots on a per-route basis.

Below are hosts we recommend — **ranked by ease of setup** — that *can* provide the control required, even if some need a little extra elbow grease.

---

### 🥇 **Netlify** – The Gold Standard

* ✅ Simple, file-based control using `_headers` and `_redirects`
* ✅ Full per-route ETag override with:

  ```bash
  /
    Cache-Control: no-store
    ETag: ""
  ```
* ✅ Works perfectly with folder-style `/page/index.html` snapshots
* ✅ Automatic SPA fallback *without interfering with snapshot logic*
* ⚠️ Requires manually writing `_headers` per route (but that’s expected)

**Recommended for: Everyone.** The easiest, most reliable option for deploying TruthSnapshot.

---

### 🥈 **AWS S3 + CloudFront** – Enterprise Control, Extra Setup

* ✅ ETags are **unique per file by default** — a good baseline
* ✅ Using **CloudFront**, you can fully override caching & headers
* ✅ Supports folder-based routing and snapshot structure
* ⚠️ Requires:

  * Custom `CachePolicy`
  * Proper S3 upload practices (ensure no multipart upload ETag weirdness)
  * CloudFront rules for header control

**Recommended for: Advanced users who need granular control or are already AWS-based.**

---

### 🥉 **Cloudflare Pages (with Workers)** – Powerful but Dev-Heavy

* ⚠️ No direct support for `_headers`, but you can:

  * Use **Cloudflare Workers** to inject/override headers
  * Programmatically strip or set `ETag` headers
* ✅ Works with folder-based snapshot paths
* ⚠️ Requires JavaScript Worker deployment or configuration script

**Recommended for: Power users comfortable writing Workers or looking for Cloudflare integration.**

---

### 🟨 **Azure Static Web Apps (with Azure Front Door)** – Functional but Clunky

* ❌ Azure Static Web Apps assign **identical ETags across all routes**, breaking SEO
* ⚠️ You **can override ETags** only by placing **Azure Front Door** or **Azure CDN** in front of your app
* ❌ This setup is **not native** to Azure SWA and adds platform complexity
* ✅ Once set up, ETag headers can be stripped or replaced per route

**Recommended for: Teams already deep in Azure who don’t mind setting up Front Door just to gain control.**

---

### 🟪 **Render.com** – Works in a Pinch

* ⚠️ Allows some header control via `static.yaml`
* ⚠️ Per-route control is limited — no `_headers` equivalent
* ❌ ETag override isn't as reliable — needs further validation
* ✅ Static file structure matches snapshot format

**Recommended for: Simple use cases, but verify ETag behavior before deploying.**

---

### ❌ **GitHub Pages, Firebase, Surge.sh, etc.** – Not Supported

* No header override
* No cache/ETag control
* Not compatible with SEO snapshots
* Do not use for production TruthSnapshot deployment

---

## 🧠 TL;DR

| Host                                | ETag Control | Folder Routing | Custom Headers           | Requires CDN/Workers? | Verdict                      |
| ----------------------------------- | ------------ | -------------- | ------------------------ | --------------------- | ---------------------------- |
| **Netlify**                         | ✅ Native     | ✅              | ✅ `_headers`             | ❌                     | **Best choice**              |
| **AWS + CloudFront**                | ✅ Yes        | ✅              | ✅ (via config)           | ⚠️ Yes (CDN config)   | Advanced, powerful           |
| **Cloudflare Pages**                | ⚠️ Workers   | ✅              | ✅ (via Workers)          | ✅ Yes (JS dev needed) | Dev-heavy option             |
| **Azure + Front Door**              | ✅ Hacky      | ✅              | ✅ (via Front Door rules) | ✅ Yes                 | Use only if already in Azure |
| **Render**                          | ⚠️ Partial   | ✅              | ⚠️ Limited               | ❌                     | OK with testing              |
| **Others (e.g., GitHub, Firebase)** | ❌ None       | ❌              | ❌ None                   | ❌                     | **Do not use**               |

---

TruthSnapshot opens up a new frontier of SPA/SEO harmony — but it **demands hosts that respect your control.**
Pick the right one, and you’ll unlock true discoverability across the web.


