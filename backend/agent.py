import requests
from flask import Flask, request, jsonify

# Initialize the Fetch agent
app = Flask(__name__)

# Your Perplexity API key (replace this with your actual key)
PERPLEXITY_API_KEY = "INSERT REAL PEPLEXITY API KEY!!!"

# Function to send a fact-check request to Perplexity
def fact_check_with_perplexity(article_text, news_agency):
    headers = {
        "Authorization": f"Bearer {PERPLEXITY_API_KEY}",
        "Content-Type": "application/json"
    }

    # API endpoint for Perplexity (REPLACE with the actual endpoint)
    url = "https://api.perplexity.ai/v1/fact_check"

    # The body of the request contains the article text and the news agency to exclude
    payload = {
        "query": article_text,
        "exclude_sources": [news_agency]  # Specify the news agency to exclude from references
    }

    # Send a POST request to Perplexity's fact-checking API
    response = requests.post(url, json=payload, headers=headers)

    # Process the response
    if response.status_code == 200:
        return response.json()
    else:
        return {"error": f"Failed with status code {response.status_code}"}

# Define the event handler for fact-checking
@app.route("/fact_check", methods=["POST"])
def fact_check():
    # Extract the article content and news agency (sent by the browser extension)
    data = request.json
    article_content = data.get('article_content')
    news_agency = data.get('news_agency')

    # Log the article content and news agency for debugging
    print(f"Received article content: {article_content[:100]}...")
    print(f"Received news agency: {news_agency}")

    # Fact-check the article using Perplexity, excluding the specified news agency
    fact_check_result = fact_check_with_perplexity(article_content, news_agency)

    # Return the result as JSON
    return jsonify(fact_check_result)

if __name__ == "__main__":
    app.run(port=5000, debug=True)