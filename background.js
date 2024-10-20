<<<<<<< HEAD
// Handles events in the background, such as message passing and performing checks

chrome.runtime.onInstalled.addListener(() => {
    console.log('FactAi extension installed.');
  });
  
  // Listen for when a tab is updated (for example, when a user navigates to a new page)
  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url) {
      // Check if the URL is a YouTube video or an article (based on domain)
      if (tab.url.includes('youtube.com/watch')) {
        // Inject YouTube content script
        chrome.scripting.executeScript({
          target: { tabId: tabId },
          files: ['youtubeContentScript.js']
        });
      } else if (isArticleURL(tab.url)) {
        // Inject article content script
        chrome.scripting.executeScript({
          target: { tabId: tabId },
          files: ['articleContentScript.js']
        });
      }
    }
  });
  
  // Function to determine if a URL is an article 
  function isArticleURL(url) {
    const articleDomains = ['news', 'blog', 'medium.com', 'article']; // Add more domains or rules if needed
    return articleDomains.some(domain => url.includes(domain));
  }
  
  // Listen for messages from content scripts (both for videos and articles)
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'factCheck') {
      console.log('Fact-check request received:', message.data);
  
      // This is where you would send the data to your Python server or API for fact-checking
      sendResponse({ result: "Fact-check completed" });
    }
  });
  
=======


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
>>>>>>> 652595bab8ed1d2ed79d0304a5c76ae4acbe0513
