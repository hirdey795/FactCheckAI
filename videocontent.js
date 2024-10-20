// content.js

// Function to extract YouTube video ID from the URL
function getYouTubeVideoId() {
    let url = window.location.href;
    let videoId = null;

    if (url.includes("youtube.com/watch?v=")) {
        videoId = url.split("v=")[1]?.split("&")[0];  // Extract video ID from URL
    }

    return videoId;
}

// Send video ID to the background script for fact-checking
function sendVideoIdForFactCheck() {
    let videoId = getYouTubeVideoId();
    if (videoId) {
        chrome.runtime.sendMessage({ videoId: videoId }, function(response) {
            console.log("Fact-checking results:", response);
            // Display the fact-checking results in the page (you can customize this)
            let outputDiv = document.createElement('div');
            outputDiv.id = 'fact-check-results';
            outputDiv.style.position = 'fixed';
            outputDiv.style.top = '10px';
            outputDiv.style.right = '10px';
            outputDiv.style.backgroundColor = 'white';
            outputDiv.style.zIndex = '1000';
            outputDiv.style.padding = '20px';
            outputDiv.innerHTML = `<h4>Fact-checking Results:</h4><p>${response.result}</p>`;
            document.body.appendChild(outputDiv);
        });
    }
}

// Run the fact-checking when the content script is injected on YouTube pages
window.onload = function() {
    sendVideoIdForFactCheck();
};
