import requests
from flask import Flask, request, jsonify

app = Flask(__name__)

# Your Google Gemini API key (replace with your actual key)
GOOGLE_GEMINI_API_KEY = "YOUR_GOOGLE_GEMINI_API_KEY"

# Function to send the article to Google Gemini for summarization
def summarize_with_gemini(article_text):
    headers = {
        "Authorization": f"Bearer {GOOGLE_GEMINI_API_KEY}",
        "Content-Type": "application/json"
    }

    # API endpoint for Google Gemini summarization (replace with the actual endpoint)
    url = "https://api.google-gemini.com/v1/summarize"

    # Payload contains the article text
    payload = {
        "article_text": article_text
    }

    # Send a POST request to Google Gemini's summarization API
    response = requests.post(url, json=payload, headers=headers)

    # Process the response
    if response.status_code == 200:
        return response.json()
    else:
        return {"error": f"Failed with status code {response.status_code}"}

# Define the event handler for summarization
@app.route("/summarize", methods=["POST"])
def summarize():
    # Extract the article content sent by the browser extension
    data = request.json
    article_content = data.get('article_content')

    # Log the article content for debugging
    print(f"Received article content for summarization: {article_content[:100]}...")

    # Summarize the article using Google Gemini
    summarization_result = summarize_with_gemini(article_content)

    # Return the summary as JSON
    return jsonify(summarization_result)

if __name__ == "__main__":
    app.run(port=5001, debug=True)