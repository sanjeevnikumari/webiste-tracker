# Chrome Tab Switching Tracker 🚀

A beginner-friendly Chrome extension built with JavaScript that detects tab switching and tracks recently visited websites using the Chrome Tabs API and Chrome Storage API.

## ✨ Features

* **Tab Switch Detection:** Detects when the active browser tab changes.
* **Website Information:** Retrieves the website title, URL, and domain.
* **Activity History:** Stores recently visited websites with timestamps.
* **Latest Tab Tracking:** Keeps a record of the current active website.
* **Local Storage:** Saves website activity using `chrome.storage.local`.
* **Limited History:** Maintains up to 20 recent website records.

## 🛠️ Technologies Used

* JavaScript
* Chrome Tabs API
* Chrome Storage API
* Chrome Extensions Manifest V3

## 📂 Project Structure

```text
chrome-tab-tracker/
├── manifest.json
├── background.js
├── popup.html
├── popup.js
└── README.md
```

*Note: The file structure above is a suggested structure. Adjust it according to the files present in your project.*

## ⚙️ Installation

1. Clone this repository:

   ```bash
   git clone YOUR_REPOSITORY_URL
   ```

2. Open Google Chrome and navigate to `chrome://extensions/`.

3. Enable **Developer mode**.

4. Click **Load unpacked**.

5. Select the project folder containing `manifest.json`.

6. Switch between browser tabs to test the extension.

## 🔑 How It Works

1. Listens for tab activation events using `chrome.tabs.onActivated`.
2. Retrieves active tab information using `chrome.tabs.get()`.
3. Filters out URLs that do not begin with HTTP.
4. Extracts the website domain using JavaScript's `URL` object.
5. Creates a record containing the title, domain, URL, and timestamp.
6. Stores the latest activity and the 20 most recent records in local extension storage.

## 📚 Key Concepts Learned

* Event listeners and callback functions
* Async/await and error handling
* JavaScript objects and arrays
* URL parsing
* Array methods such as `unshift()` and `slice()`
* Reading and writing browser extension storage
* Writing code by understanding the logic instead of simply copying it from AI

## 🔒 Privacy

Website activity is stored locally using Chrome extension storage. The extension is intended for personal learning and experimentation. It does not intentionally send browsing records to an external server.

## 🎯 Project Goal

The goal of this project is to learn Chrome extension development step by step, understand browser APIs, and build confidence in writing and debugging JavaScript code independently.

## 🌱 Learning in Progress

This project is part of my journey toward becoming a more independent developer by understanding the purpose behind every line of code.

---

**Built with curiosity and a willingness to learn. 💻**
<img width="1920" height="1080" alt="Screenshot (766)" src="https://github.com/user-attachments/assets/411181f6-6a84-49aa-9601-3011338ca632" />
