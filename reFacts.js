

/*
const loadingDuration = 1500; // 1.5 seconds delay

// As soon as this script runs (when the user clicks the extension), it will start scraping the current page
(async () => {
    // Get the active tab (current page the user is viewing)
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    // Execute the content script on the active tab to capture the page URL
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: sendUrlToBackground
    });

    // Wait for 1.5 seconds, then redirect to the main content page
    setTimeout(() => {
        window.location.href = 'main.html'; // Redirect to the main content page
    }, loadingDuration);
})();

// Function that sends the captured URL to the background script for processing
function sendUrlToBackground() {
    chrome.runtime.sendMessage({ action: 'sendUrl' });
}
*/
const loadingDuration = 1500; // 1.5 seconds delay
console.log("hello0");
// As soon as this script runs, it captures the page URL
(async () => {
    // Get the active tab (current page the user is viewing)
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    console.log("hello1");

    // Send the URL to the background script for processing
    debugger;
    if (tab && tab.url) {
        debugger;
        chrome.runtime.sendMessage({ action: 'factCheck', data: tab.url });
    }

    // Wait for 1.5 seconds, then redirect to the main content page
    setTimeout(() => {
        window.location.href = 'main.html'; // Redirect to the main content page
    }, loadingDuration);
})();