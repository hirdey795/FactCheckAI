// Wait for the DOM to load completely
/*const loadingDuration = 2000
document.addEventListener('DOMContentLoaded', function () {
    // Send a message to the background script to get the HTML content
    chrome.runtime.sendMessage({ action: 'getHTML' })
        .then((response) => {
            // Log the raw result to see its exact structure
            console.log("Raw response: ", response);
            console.log("Raw response: ", response.result);

            if (response && response.result) {
                try {
                    // If the response is a JSON string, we parse it
                    const parsedResponse = JSON.parse(response.result);
                    console.log("Parsed response: ", parsedResponse);

                    // Now check if the 'data' field exists
                    if (parsedResponse && parsedResponse.data) {
                        // Replace newlines with <br> tags for correct HTML display
                        const formattedHTML = parsedResponse.data.replace(/\n/g, '<br>');
                        document.getElementById('results').innerHTML = formattedHTML;
                    } else {
                        document.getElementById('results').innerText = 'No valid results found.';
                    }
                } catch (error) {
                    // If parsing fails, we treat the result as plain text and replace newlines
                    console.error("Error parsing response, treating as plain text:", error);
                    const formattedText = response.result.replace(/\n/g, '<br>');
                    document.getElementById('results').innerHTML = formattedText;
                }
            } else {
                document.getElementById('results').innerText = 'No results found.';
            }
        })
        .catch((error) => {
            // Handle any errors that occur during the message sending process
            document.getElementById('results').innerText = 'Error: ' + error.message;
        });
});
*/
// Wait for the DOM to load completely
// Wait for the DOM to load completely
// Wait for the DOM to load completely
document.addEventListener('DOMContentLoaded', function () {
    const pageUrl = window.location.href;  // Get the current page URL
    console.log('Merged script: DOM fully loaded.');
    console.log('Merged script: Current page URL:', pageUrl);

    // Prepare the data to be sent to the server
    const requestData = JSON.stringify({ url: pageUrl });
    console.log('Merged script: Data being sent to the server:', requestData);

    // Fetch data from the Flask server
    fetch('http://localhost:5000/scrape', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: requestData  // Send the page URL to the Flask server
    })
        .then(response => {
            console.log('Merged script: Received response from Flask server.');
            console.log('Merged script: Response status:', response.status);

            if (!response.ok) {
                throw new Error(`Server error: ${response.statusText}`);
            }

            return response.json();  // Parse the JSON response
        })
        .then(data => {
            console.log('Merged script: Parsed response from Flask:', data);

            if (data && data.data) {
                // Replace newlines with <br> for HTML display and inject it into the results box
                const formattedHTML = data.data.replace(/\n/g, '<br>');
                console.log('Merged script: Injecting formatted HTML into the results box:', formattedHTML);
                document.getElementById('results').innerHTML = formattedHTML;
            } else {
                console.log('Merged script: No valid data received from the Flask server.');
                document.getElementById('results').innerText = 'No results found.';
            }
        })
        .catch(error => {
            // Handle any errors that occurred during fetch or parsing
            console.error('Merged script: Error during fetch or parsing:', error);
            document.getElementById('results').innerText = 'Error: ' + error.message;
        });
});