

//handles events in the background, such as message passing and performing checks 
/*
let initialUrl = null; // Variable to store the initial URL when the extension is opened

chrome.runtime.onInstalled.addListener(() => {
  console.log('FactAi extension installed.');
});

// Function to capture the URL when the extension is first activated
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'captureUrl') {
    console.log('Capturing initial URL:', message.url);
    initialUrl = message.url; // Store the initial URL when the extension opens
    sendResponse({ status: 'URL captured', url: initialUrl });
  } else if (message.action === 'factCheck') {
    // Ensure the fact-checking request uses the initially stored URL
    console.log('Fact-check request received:', initialUrl || message.data);
    sendResponse({ result: `Fact-check completed for ${initialUrl || message.data}` });
  }
});

// Only inject contentScript.js once for the initial tab when the extension opens
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && initialUrl && tab.url === initialUrl) {
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      files: ['contentScript.js']
    });
  }
});


let responseHTML = ''; // Variable to store the response HTML

// Function to handle message passing
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'getHTML') {
    // Asynchronous operation, like a fetch request to the Flask server
    fetch('http://127.0.0.1:5000/scrape', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: message.data }) // Assuming message.data contains the URL
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Server error: ${response.statusText}`);
        }
        return response.text();  // Assuming the Flask server returns HTML content
      })
      .then(html => {
        console.log('Received HTML from Flask server:', html);
        sendResponse({ result: html });  // Send the HTML back to the content script
      })
      .catch(error => {
        console.error('Error fetching from Flask server:', error);
        sendResponse({ error: 'Fact-check failed', details: error.message });
      });

    // Return true to indicate the response will be sent asynchronously
    return true;
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'getHTML') {
    // Asynchronous operation, like a fetch request to the Flask server
    console.log('getHTML');
    fetch('http://127.0.0.1:5000/scrape', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: message.data }) // Assuming message.data contains the URL
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Server error: ${response.statusText}`);
        }
        return response.text();  // Assuming Flask server returns HTML content
      })
      .then(html => {
        sendResponse({ result: html });  // Send the HTML back to the content script
      })
      .catch(error => {
        console.error('Error fetching from Flask server:', error);
        sendResponse({ error: 'Fact-check failed', details: error.message });
      });

    return true;  // Keep the message channel open for async response
  }
})
*/
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('background.js: Received message:', message);

  if (message.action === 'factCheck') {
    console.log('background.js: Fact-checking action initiated for URL:', message.url);

    // Fetch from the Flask server
    fetch('http://localhost:5000/scrape', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: message.url })  // Send the URL to Flask
    })
      .then(response => {
        console.log('background.js: Received response from Flask server.');

        if (!response.ok) {
          throw new Error(`background.js: Server error: ${response.statusText}`);
        }

        return response.json();  // Assuming Flask returns JSON
      })
      .then(data => {
        console.log('background.js: Parsed response from Flask server:', data);

        if (data && data.data) {
          sendResponse({ data: data.data });
        } else {
          console.log('background.js: No valid data in the response from Flask.');
          sendResponse({ error: 'No valid data returned.' });
        }
      })
      .catch(error => {
        console.error('background.js: Error during fetch operation:', error);
        sendResponse({ error: error.message });
      });

    return true;  // Keep the message channel open for async response
  }
});