# 📖 TruthSEO Snapshot Protocol v1

**Enable full SEO indexing for WebAssembly and SPA applications using the TruthOrigin protocol.**
Built for frameworks like Blazor, Angular, React, Vue, and Web3 environments — this system delivers **clean, structured, and bot-friendly snapshots** with zero puppeteer or SSR hacks.

---

## ⚡ Quick Start

Add the following **two lines** to your `index.html`:

```html
<a href="/index" style="display:none;">SEO Entry</a>
<script src="https://cdn.jsdelivr.net/gh/magiccodingman/TruthSEO.SnapshotClient@main/truthseo-snapshot.js"></script>
```

> ✅ The `<script>` enables the snapshot protocol.
> ✅ The hidden `<a>` tag ensures bots discover your `/index` snapshot.

---

## 🧠 How Snapshotting Works

1. Go to: [https://TruthOrigin.com/tools/wasm-snapshot](https://truthorigin.com/tools/wasm-snapshot)
2. Enter your **website URL** or upload a `sitemap.xml`
3. The tool:
   - Loads each page in a hidden iframe
   - Waits for your page to declare snapshot readiness
   - Extracts a clean, bot-readable snapshot
   - Streams results into a downloadable `.tar` archive
4. You unzip and deploy the snapshots into your `wwwroot` or static file directory

---

## 🏷️ Declaring Snapshot Readiness

In your page content, **after hydration is complete**, add the following:

```html
<truthseo-snapshot-ready>
  <title>Your Page Title</title>
  <meta name="description" content="Your description here">
  <link rel="canonical" href="https://yoursite.com/this-page">
  <script type="application/ld+json">{ ... }</script>
</truthseo-snapshot-ready>
```

> ✅ This tag **declares the SEO metadata** for the page.
> ✅ The snapshot tool will **extract this block**, clean the `<head>`, and inject the SEO tags correctly.

The protocol will automatically:
- Remove previous `<title>`, `<meta>` (except viewport and charset), `<link rel=canonical>`, and JSON-LD
- Preserve non-SEO tags like stylesheets, manifests, and scripts

---

## ✨ What the Snapshot Includes

Each snapshot page is a standalone `.html`-like file (no extension) that includes:
- ✅ A reconstructed `<head>` with only relevant SEO metadata
- ✅ The complete DOM output post-hydration
- ✅ An embedded `<meta name="truthseo:snapshot-version" content="X">` for versioning
- ✅ Optional logic for rehydrating your app or redirecting users from static snapshot to live content

Example snapshot `<head>`:
```html
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="truthseo:snapshot-version" content="9">
  <title>Weather | Localhost</title>
  <meta name="description" content="Weather information display page.">
  <link rel="canonical" href="https://localhost/weather">
  <script type="application/ld+json">{...}</script>
</head>
```

---

## 🚀 Deployment Steps

1. Run the snapshot tool to generate a `.tar`
2. Extract the `.tar`
3. Copy the contents into your WebAssembly app’s `wwwroot`
4. Publish your site as usual

---

## 🤖 SEO & Bot Support

- Bots see **fully rendered HTML**, not JavaScript
- Structured Data (JSON-LD), metadata, OpenGraph, canonical links are **correctly placed** in the `<head>`
- The system is **framework-agnostic**, but works beautifully with Blazor, Angular, React, Vue, etc.
- Only `/index` differs in structure from other pages — it is accessible via `<a href="/index">`

---

## ⚠️ Snapshot Responsibility

It is **your responsibility** to:
- Keep snapshots up to date when content changes
- Ensure `<truthseo-snapshot-ready>` reflects what the user sees

Google and other search engines may penalize if your snapshot misrepresents the live page.

✅ Just be honest, and you're golden.

---

## ✅ Summary Checklist

| Step | Action |
|------|--------|
| ✅ 1 | Add the TruthSEO script + hidden anchor to `index.html` |
| ✅ 2 | Add `<truthseo-snapshot-ready>` block in your hydrated content |
| ✅ 3 | Use the snapshot tool to generate your `.tar` archive |
| ✅ 4 | Extract and deploy snapshot files into `wwwroot` |
| ✅ 5 | Ensure every important page has proper SEO truth blocks |

---

**TruthSEO: Bringing visibility to the invisible web — one snapshot at a time.**

