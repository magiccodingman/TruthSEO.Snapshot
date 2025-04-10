(() => {
    const SCRIPT_VERSION = 6;
    const SNAPSHOT_QUERY_KEY = "truthseo-snapshot";
    const META_TAG_NAME = "truthseo:snapshot-ready";
    const MAX_WAIT_TIME_MS = 10_000;

    function startSnapshotCheck() {
        const query = new URL(location.href).searchParams;
        const snapshotRequested = query.has(SNAPSHOT_QUERY_KEY);
               

        if (!snapshotRequested) {
            return;
        }

        console.log(`[TruthSEO v${SCRIPT_VERSION}] Snapshot script initialized`);
        console.log(`[TruthSEO v${SCRIPT_VERSION}] Current URL:`, location.href);
        console.log(`[TruthSEO v${SCRIPT_VERSION}] Snapshot param detected:`, snapshotRequested);

        console.log(`[TruthSEO v${SCRIPT_VERSION}] Snapshot mode activated. Looking for meta tag:`, META_TAG_NAME);

        waitForMetaTag(META_TAG_NAME, MAX_WAIT_TIME_MS)
            .then(() => {
                console.log(`[TruthSEO v${SCRIPT_VERSION}] Meta tag detected — capturing HTML...`);
                const html = document.documentElement.outerHTML;
                console.log(`[TruthSEO v${SCRIPT_VERSION}] HTML captured. Length:`, html.length);
                postSnapshotData(html);
            })
            .catch((err) => {
                console.warn(`[TruthSEO v${SCRIPT_VERSION}] Snapshot aborted. Reason:`, err);
            });
    }

    function waitForMetaTag(name, timeout) {
        return new Promise((resolve, reject) => {
            console.log(`[TruthSEO v${SCRIPT_VERSION}] Checking DOM for meta tag:`, name);

            let resolved = false;

            const immediateTag = document.querySelector(`meta[name="${name}"]`);
            if (immediateTag) {
                console.log(`[TruthSEO v${SCRIPT_VERSION}] Meta tag already present:`, immediateTag);
                resolve();
                return;
            }

            console.log(`[TruthSEO v${SCRIPT_VERSION}] Meta tag not found. Setting up MutationObserver and polling...`);

            const observer = new MutationObserver(() => {
                const tag = document.querySelector(`meta[name="${name}"]`);
                if (tag) {
                    console.log(`[TruthSEO v${SCRIPT_VERSION}] Meta tag found via MutationObserver:`, tag);
                    cleanup();
                    resolve();
                }
            });

            const poller = setInterval(() => {
                const tag = document.querySelector(`meta[name="${name}"]`);
                if (tag) {
                    console.log(`[TruthSEO v${SCRIPT_VERSION}] Meta tag found via polling:`, tag);
                    cleanup();
                    resolve();
                }
            }, 100);

            const timeoutId = setTimeout(() => {
                if (!resolved) {
                    console.warn(`[TruthSEO v${SCRIPT_VERSION}] Timeout waiting for meta tag.`);
                    cleanup();
                    reject("Meta tag timeout");
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

    // Listen for navigation trigger
    window.addEventListener("message", (event) => {
        if (event?.data?.type === "truthseo:navigate") {
            console.log(`[TruthSEO v${SCRIPT_VERSION}] Received navigate request. Rerunning snapshot check.`);
            setTimeout(startSnapshotCheck, 50); // slight delay to allow DOM update
        }
    });

    // Handle internal navigation and manual route change
    window.addEventListener("message", (event) => {
        if (!event?.data || event.data.type !== "truthseo:navigate") return;

        const target = event.data.targetPath;
        if (typeof target === "string" &&
            window.location.pathname + window.location.search !== target) {
            console.log("[TruthSEO] Navigating to route:", target);
            history.pushState({}, "", target);
            window.dispatchEvent(new PopStateEvent("popstate")); // Manually trigger SPA router
        }
    });

    // Run snapshot logic on first load
    startSnapshotCheck();

    // Optional debug comment
    const debugComment = document.createComment(`truthseo-snapshot-script-version: ${SCRIPT_VERSION}`);
    document.documentElement.appendChild(debugComment);
})();
