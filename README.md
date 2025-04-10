# 🚀 TruthSEO Snapshot Client

**Add true SEO snapshotting to your WebAssembly or SPA-based site with a single script tag.**  
Enable Google and other search engines to fully index your content — even if it’s Blazor, Web3, or dynamic JavaScript.

---

## 📦 Quick Start

Just add these **two lines** to your site’s `index.html`:

```html
<a href="/index" style="display:none;">SEO Entry</a>
<script src="https://cdn.jsdelivr.net/gh/magiccodingman/TruthSEO.SnapshotClient@main/truthseo-snapshot.js"></script>
```

That’s it! Your site is now snapshot-compatible.

The hidden `a` tag with an href allows search bots to discover the snapshot gateway page naturally.

---

## 🛠️ How It Works

Once the script is added:

1. Go to [https://sayou.biz/tools/wasm-snapshot](https://sayou.biz/tools/wasm-snapshot)
2. Enter the **URL of your site**, or preferably upload a `sitemap.xml`
3. The tool will:
   - Crawl the site or sitemap
   - Wait for a special `<meta>` tag on each page
   - Capture the full outer HTML
   - Stream the snapshot results directly into a `.tar` archive
4. Once finished, **unzip the `.tar`** and copy the contents directly into your `wwwroot` folder

---

## 🔍 Marking Pages as "Ready"

For each page you want snapshotted, you **must include** this tag **when the page is ready**:

```html
<meta name="truthseo:snapshot-ready">
```

Place this tag:
- **After hydration**
- After any loading logic (like fetching from APIs)
- Anywhere that represents the final, ready-to-capture version of your page

The snapshot tool will **wait** for this tag to appear before capturing the HTML.

---

## 📦 What Gets Created

- Tar file with the structure you'll need with the snapshots.
- Each snapshot is saved as a **raw HTML file** with no `.html` extension
- The folder and file structure mirrors your site’s SEO paths
- A small script is embedded in each snapshot to:
  - Support soft redirects if a user lands on a snapshot file directly
  - Rehydrate your app via index routing (optional, mainly for Web3/IPFS use cases)

---

## 📦 How To Deploy

The provided tar file simply needs to be extracted. Then copy all the files and folders directly into your project `wwwroot` and then publish! That's it, you're done!

---

## 🤖 SEO Notes

- Bots will see **real HTML** — not JavaScript, not placeholders
- You get full support for:
  - JSON-LD structured data
  - Meta tags
  - OpenGraph tags
  - Canonical links
- All snapshot pages are bot-identical to traditional SSR
- The only page not in the same path as the links is your index page. It instead snapshots automatically `/index`  
  To help bots discover it, add a hidden `<a href="/index">` link somewhere on your root page

---

## ⚠️ Responsibility Notice

It is **100% your responsibility** to keep snapshots up to date.  
If your snapshot content doesn’t match what a user sees, **search engines may penalize you for cloaking**.

This is standard across all pre-rendering and SSR practices — just be honest, and you'll be fine.

---

## ✅ Summary

| Step | What to do |
|------|------------|
| ✅ 1 | Add the script tag to `index.html` |
| ✅ 2 | Use `<meta name="truthseo:snapshot-ready">` where appropriate |
| ✅ 3 | Use [sayou.biz/tools/wasm-snapshot](https://sayou.biz/tools/wasm-snapshot) to generate your `.tar` |
| ✅ 4 | Unzip and place snapshot files in `wwwroot` |
| ✅ 5 | Optionally add `<a href="/index" hidden>` for SEO entry point |
| 🚨 | Keep your snapshots up to date to avoid SEO penalties |

---

**Now, WebAssembly apps can finally be indexed just like server-rendered pages.**  

🛰️ *TruthSEO: Bringing visibility to the invisible web.*

---

Let me know if you want this converted into a `README.md`, a NuGet or NPM README, or formatted with screenshots!
