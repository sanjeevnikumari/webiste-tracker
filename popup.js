
async function loadData() {
  const data = await chrome.storage.local.get([
    "currentSite",
    "siteTotals",
    "history"
  ]);

  const currentSite = data.currentSite;
  const totals = data.siteTotals || {};
  const history = data.history || [];

  // Show current website and its elapsed time
  const currentElement = document.getElementById("current");

  if (currentSite) {
    const elapsed = Math.floor(
      (Date.now() - currentSite.startedAt) / 1000
    );

    currentElement.textContent =
      currentSite.domain +
      "\n" +
      currentSite.url +
      "\nTime in current visit: " +
      elapsed +
      " seconds";
  } else {
    currentElement.textContent = "No website tracked yet.";
  }

  // Show total time per website
  const totalsList = document.getElementById("totals");
  totalsList.replaceChildren();

  const domains = Object.keys(totals);

  if (currentSite && !domains.includes(currentSite.domain)) {
    domains.push(currentSite.domain);
  }

  domains.sort((a, b) => {
    const timeA = (totals[a] || 0) +
      (currentSite && currentSite.domain === a
        ? Math.floor((Date.now() - currentSite.startedAt) / 1000)
        : 0);

    const timeB = (totals[b] || 0) +
      (currentSite && currentSite.domain === b
        ? Math.floor((Date.now() - currentSite.startedAt) / 1000)
        : 0);

    return timeB - timeA;
  });

  domains.forEach((domain) => {
    const item = document.createElement("li");

    let seconds = totals[domain] || 0;

    if (currentSite && currentSite.domain === domain) {
      seconds += Math.floor(
        (Date.now() - currentSite.startedAt) / 1000
      );
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

   item.textContent =
  domain + " - " +
  minutes + " min " +
  remainingSeconds + " sec";

    totalsList.appendChild(item);
  });

  // Show recent completed visits
  const historyList = document.getElementById("history");
  historyList.replaceChildren();

  if (history.length === 0) {
    const item = document.createElement("li");
    item.textContent = "No completed visits yet.";
    historyList.appendChild(item);
  }

  history.forEach((entry) => {
    if (!Number.isFinite(entry.duration)) {
    return;
  }

  const item = document.createElement("li");

  item.textContent =
    entry.domain + " - " +
    Math.floor(entry.duration / 60) + " min " +
    (entry.duration % 60) + " sec";

  historyList.appendChild(item);
  });
}

// Run when popup opens
loadData();

// Refresh the popup when stored data changes
chrome.storage.onChanged.addListener(() => {
  loadData();
});