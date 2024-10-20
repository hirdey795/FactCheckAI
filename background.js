

//handles events in the background, such as message passing and performing checks 

chrome.runtime.onInstalled.addListener(() => {
  console.log('FactAi extension installed.');
});

// Listen for when a tab is updated (for example, when a user navigates to a new page)
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url) {
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      files: ['contentScript.js']
    });
  }
});

// Listen for messages from content scripts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'factCheck') {
    console.log('Fact-check request received:', message.data);
    // Here you could implement the logic to send a fact-checking request to your API
    // and return the results back to the content script
    sendResponse({ result: "Fact-check completed" });
  }
});
