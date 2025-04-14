(() => {
    const SCRIPT_VERSION = 1;
    const SNAPSHOT_QUERY_KEY = "truthseo-snapshot";
    const ELEMENT_TAG_NAME = "truthseo-snapshot-ready";
    const MAX_WAIT_TIME_MS = 10_000;

    function startSnapshotCheck() {
        const query = new URL(location.href).searchParams;
        const snapshotRequested = query.has(SNAPSHOT_QUERY_KEY);

        if (!snapshotRequested) return;

        console.log(`[TruthSEO v${SCRIPT_VERSION}] Snapshot script initialized`);
        console.log(`[TruthSEO v${SCRIPT_VERSION}] Current URL:`, location.href);
        console.log(`[TruthSEO v${SCRIPT_VERSION}] Snapshot param detected:`, snapshotRequested);

        console.log(`[TruthSEO v${SCRIPT_VERSION}] Snapshot mode activated. Looking for element: <${ELEMENT_TAG_NAME}>`);

        waitForElement(ELEMENT_TAG_NAME, MAX_WAIT_TIME_MS)
            .then(() => {
                console.log(`[TruthSEO v${SCRIPT_VERSION}] Custom element detected — capturing HTML...`);
                const rawHtml = document.documentElement.outerHTML;
                const html = sanitizeAndTransformSnapshot(rawHtml);
                console.log(`[TruthSEO v${SCRIPT_VERSION}] HTML captured. Length:`, html.length);
                postSnapshotData(html);
            })
            .catch((err) => {
                console.warn(`[TruthSEO v${SCRIPT_VERSION}] Snapshot aborted. Reason:`, err);
            });
    }

    function waitForElement(tagName, timeout) {
        return new Promise((resolve, reject) => {
            console.log(`[TruthSEO v${SCRIPT_VERSION}] Checking DOM for <${tagName}>...`);

            let resolved = false;

            const immediate = document.querySelector(tagName);
            if (immediate) {
                console.log(`[TruthSEO v${SCRIPT_VERSION}] Element already present:`, immediate);
                resolve();
                return;
            }

            console.log(`[TruthSEO v${SCRIPT_VERSION}] Element not found. Setting up MutationObserver and polling...`);

            const observer = new MutationObserver(() => {
                const el = document.querySelector(tagName);
                if (el) {
                    console.log(`[TruthSEO v${SCRIPT_VERSION}] Element found via MutationObserver:`, el);
                    cleanup();
                    resolve();
                }
            });

            const poller = setInterval(() => {
                const el = document.querySelector(tagName);
                if (el) {
                    console.log(`[TruthSEO v${SCRIPT_VERSION}] Element found via polling:`, el);
                    cleanup();
                    resolve();
                }
            }, 100);

            const timeoutId = setTimeout(() => {
                if (!resolved) {
                    console.warn(`[TruthSEO v${SCRIPT_VERSION}] Timeout waiting for <${tagName}>.`);
                    cleanup();
                    reject("Element timeout");
                }
            }, timeout);

            function cleanup() {
                if (resolved) return;
                resolved = true;
                observer.disconnect();
                clearInterval(poller);
                clearTimeout(timeoutId);
            }

            observer.observe(document.documentElement, {
                childList: true,
                subtree: true
            });
        });
    }

    function sanitizeAndTransformSnapshot(html) {
        try {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, "text/html");
            const head = doc.head;

            // 1. Remove all JSON-LD script tags
            const jsonLdScripts = head.querySelectorAll('script[type="application/ld+json"]');
            jsonLdScripts.forEach(script => script.remove());

            // 2. Remove all title tags
            const titleTags = head.querySelectorAll("title");
            titleTags.forEach(title => title.remove());

            // 3. Remove all canonical link tags
            const canonicalLinks = head.querySelectorAll('link[rel="canonical"]');
            canonicalLinks.forEach(link => link.remove());

            // 4. Remove all meta tags except charset, viewport, http-equiv
            const metaTags = head.querySelectorAll("meta");
            metaTags.forEach(meta => {
                const name = meta.getAttribute("name")?.toLowerCase();
                const httpEquiv = meta.getAttribute("http-equiv");
                const charset = meta.getAttribute("charset");

                const isAllowed =
                    charset ||
                    httpEquiv ||
                    name === "viewport";

                if (!isAllowed) {
                    meta.remove();
                }
            });

            // 5. Inject snapshot version tag at the end of valid meta section
            const versionMeta = doc.createElement("meta");
            versionMeta.setAttribute("name", "truthseo:snapshot-version");
            versionMeta.setAttribute("content", "9"); // update this dynamically if needed
            head.insertBefore(versionMeta, head.querySelector("base") || head.firstChild);

            // 6. Inject snapshot-ready content wrapped in comments
            const snapshotTag = doc.querySelector("truthseo-snapshot-ready");
            if (snapshotTag) {
                const content = snapshotTag.innerHTML.trim();
                if (content.length > 0) {
                    head.appendChild(doc.createTextNode("\n"));
                    head.appendChild(doc.createComment(" TruthSEO-Snapshot "));
                    head.appendChild(doc.createTextNode("\n"));

                    const wrapper = doc.createElement("div");
                    wrapper.innerHTML = content;
                    while (wrapper.firstChild) {
                        head.appendChild(wrapper.firstChild);
                        head.appendChild(doc.createTextNode("\n"));
                    }

                    head.appendChild(doc.createComment(" TruthSEO-Snapshot-Done "));
                    head.appendChild(doc.createTextNode("\n"));
                }
                snapshotTag.remove();
            }

            return "<!DOCTYPE html>\n" + doc.documentElement.outerHTML;
        } catch (e) {
            console.error("Failed to sanitize snapshot:", e);
            return html;
        }
    }



    function postSnapshotData(html) {
        try {
            const origin = "*";
            console.log(`[TruthSEO v${SCRIPT_VERSION}] Sending snapshot via postMessage...`);
            window.parent.postMessage({
                type: "truthseo:snapshot",
                html: html
            }, origin);
            console.log(`[TruthSEO v${SCRIPT_VERSION}] postMessage sent successfully.`);
        } catch (e) {
            console.error(`[TruthSEO v${SCRIPT_VERSION}] postMessage failed:`, e);
        }
    }

    // Listen for snapshot re-trigger
    window.addEventListener("message", (event) => {
        if (event?.data?.type === "truthseo:navigate") {
            console.log(`[TruthSEO v${SCRIPT_VERSION}] Received navigate request. Rerunning snapshot check.`);
            setTimeout(startSnapshotCheck, 50);
        }
    });

    // Handle internal navigation routing
    window.addEventListener("message", (event) => {
        if (!event?.data || event.data.type !== "truthseo:navigate") return;

        const target = event.data.targetPath;
        if (typeof target === "string" &&
            window.location.pathname + window.location.search !== target) {
            console.log(`[TruthSEO v${SCRIPT_VERSION}] Navigating to route:`, target);
            history.pushState({}, "", target);
            window.dispatchEvent(new PopStateEvent("popstate"));
        }
    });

    startSnapshotCheck();

    const debugComment = document.createComment(`truthseo-snapshot-script-version: ${SCRIPT_VERSION}`);
    document.documentElement.appendChild(debugComment);
})();
