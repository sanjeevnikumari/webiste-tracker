
async function trackTab(tabId) {
  try {
    const tab = await chrome.tabs.get(tabId);

    if (!tab.url || !tab.url.startsWith("http")) {
      return;
    }

    const domain = new URL(tab.url).hostname;
    const now = Date.now();

    const data = await chrome.storage.local.get([
      "currentSite",
      "siteTotals",
      "history"
    ]);

    const previousSite = data.currentSite;
    const totals = data.siteTotals || {};
    const history = data.history || [];

    // Calculate the time spent on the previous website
    if (previousSite) {
      const duration = Math.max(
        0,
        now - previousSite.startedAt
      );

      const seconds = Math.floor(duration / 1000);

      totals[previousSite.domain] =
        (totals[previousSite.domain] || 0) + seconds;

      history.unshift({
        domain: previousSite.domain,
        url: previousSite.url,
        startedAt: previousSite.startedAt,
        duration: seconds
      });
    }

    // Start tracking the newly active website
    const currentSite = {
      domain: domain,
      url: tab.url,
      title: tab.title || domain,
      startedAt: now
    };

    await chrome.storage.local.set({
      currentSite: currentSite,
      siteTotals: totals,
      history: history.slice(0, 20)
    });

    console.log("Now tracking:", domain);
  } catch (error) {
    console.log("Could not track tab:", error);
  }
}

chrome.tabs.onActivated.addListener((activeInfo) => {
  trackTab(activeInfo.tabId);
});

// Initialize tracking when the extension is installed or updated
chrome.runtime.onInstalled.addListener(async () => {
  const data = await chrome.storage.local.get("currentSite");

  if (!data.currentSite) {
    const tabs = await chrome.tabs.query({
      active: true,
      lastFocusedWindow: true
    });

    if (tabs[0]) {
      trackTab(tabs[0].id);
    }
  }
});