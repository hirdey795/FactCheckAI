from flask import Flask, request, jsonify
import requests
from uagents import Agent

app = Flask(__name__)
agent = Agent(name="fact-checker")

# Google Fact Check Tools API Key (you will need your own API key here)
API_KEY = "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"

# Function to query Google Fact Check Tools API
def google_fact_check(query):
    print(f"Querying Fact Check API with query: {query}")
    endpoint = f"https://factchecktools.googleapis.com/v1alpha1/claims:search?key={API_KEY}"
    params = {"query": query, "languageCode": "en"}

    response = requests.get(endpoint, params=params)
    print(f"API Response Code: {response.status_code}")

    if response.status_code == 200:
        data = response.json()
        print("Response from API:", data)

        if 'claims' in data and len(data['claims']) > 0:
            # Process the fact-checking claims returned by the API
            return data['claims']
        else:
            return {"message": "No claims found for this query."}
    else:
        return {"error": f"Error fetching fact-check: {response.status_code}"}

# Handle fact-check event
@agent.on_event("fact_check")
async def handle_fact_check(ctx, data):
    article_content = data.get('article_content')

    print(f"Fact-checking article with content: {article_content[:100]}...")  # For debugging

    # Fact-check using the full article content (you can query APIs or run custom logic here)
    fact_check_result = google_fact_check(article_content)

    return {
        "fact_check_result": fact_check_result,
        "status": "Fact-checked"
    }

# Flask endpoint to handle requests from the browser extension
@app.route("/fact_check", methods=["POST"])
def fact_check():
    # Check if a file is included in the request
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files['file']

    # Ensure a file was submitted
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    # Read the contents of the file
    article_content = file.read().decode('utf-8')

    print(f"Received article content: {article_content[:100]}...")  # Print the first 100 characters for debugging

    # Process the article content with the agent (fact-checking)
    result = agent.on_event('fact_check', {"article_content": article_content})

    return jsonify(result)

if __name__ == "__main__":
    app.run(port=5000, debug=True)
"""    
if __name__ == "__main__":
    app.run(port=5000)
"""