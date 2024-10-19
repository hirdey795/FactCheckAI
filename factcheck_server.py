from flask import Flask, request, jsonify
from openai import OpenAI
from newspaper import Article
import json
client = OpenAI()
app = Flask(__name__)

# Function to scrape the article using Newspaper
def scrape_article(url):
    article = Article(url)
    article.download()
    article.parse()

    # Extract the title, authors, publication date, and text
    title = article.title
    authors = article.authors
    publish_date = article.publish_date
    text = article.text

    return {
        'title': title,
        'text': text
    }

# Endpoint to receive URL and scrape the article
@app.route('/scrape', methods=['POST'])
def scrape():
    data = request.json
    url = data.get('url')

    if not url:
        return jsonify({'error': 'No URL provided'}), 400

    try:
        # Scrape the article
        article_data = scrape_article(url)

        # Save the scraped article to a JSON file
        filename = "article.json"
        with open(filename, 'w') as f:
            json.dump(article_data, f)

        return jsonify({'status': 'success', 'file': filename}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
