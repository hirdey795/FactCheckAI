# FactCheckAI

Overview
Fact Checker AI is a tool designed to verify the accuracy of written statements in articles and reports. The AI scans articles, checks the factual accuracy of key claims, and provides a summary of how truthful the content is. It is aimed at offering quick and reliable fact-checking for articles, making it easier to discern credible information from misleading content.

This version focuses solely on article fact-checking due to time constraints, with plans for future expansion to video-based fact-checking.

Features
Article Fact-Checking: Analyze the factual accuracy of articles from online sources.
Browser Extension Integration: A browser extension that summarizes visited articles and indicates how factual they are.
Installation
To set up the Fact Checker AI on your local machine, follow these steps:

Clone the repository:

bash
Copy code
git clone https://github.com/your-username/fact-checker-ai.git
cd fact-checker-ai
Create and activate a virtual environment (recommended):

bash
Copy code
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
Install dependencies:

bash
Copy code
pip install -r requirements.txt
Run the application:

bash
Copy code
python main.py
Usage
Fact-Checking Articles
To fact-check an article, you can input the article URL or text:

bash
Copy code
python main.py --url "https://example.com/article"
or

bash
Copy code
python main.py --file input_article.txt
The AI will analyze the text, summarize key claims, and provide an evaluation of their accuracy.

Future Development
YouTube Video Fact-Checking: Add video transcription and fact-checking capabilities.
Real-time Speech Analysis: Analyze and fact-check live events.
Expanded Content Sources: Broaden beyond articles to include other text and media sources.
Contributing
We welcome contributions! If you're interested in improving this project, please follow the guidelines below:

Fork the repository.
Create a feature branch (git checkout -b feature-name).
Commit your changes (git commit -m 'Add some feature').
Push to the branch (git push origin feature-name).
Open a pull request.
