# FactCheckAI

Overview
Fact Checker AI is a tool designed to verify the accuracy of written statements in articles and reports. The AI scans articles, checks the factual accuracy of key claims, and provides a summary of how truthful the content is. It is aimed at offering quick and reliable fact-checking for articles, making it easier to discern credible information from misleading content.

This version focuses solely on article fact-checking due to time constraints, with plans for future expansion to video-based fact-checking.

Our project addresses a critical need in today's information landscape: helping people make more informed decisions, particularly during high-stakes events like presidential elections. In an age where political discourse is often flooded with misinformation, our solution empowers voters to access accurate, unbiased information in real-time. By providing instant fact-checking during debates and political speeches, we aim to reduce the influence of misleading or false statements, allowing the electorate to focus on the actual issues at hand.

Our system integrates natural language processing (NLP) with advanced AI-driven fact-checking algorithms. It begins by analyzing live or pre-recorded YouTube videos of debates or speeches. Using the YouTube API, our application extracts video transcriptions and processes them through spaCy, a robust NLP library, to identify key claims and statements. These are then cross-referenced with fact-checking databases through our AI agent to determine their accuracy. The result is an easily accessible, real-time report on whether a statement is factually true, incorrect, or an opinion.

From a technical perspective, our project employs a variety of cutting-edge tools. We use Python as the core programming language, integrating with the YouTube API for transcription extraction and spaCy for linguistic processing. This combination allows our system to accurately extract and evaluate sentences from complex speech patterns. On the front end, we developed a browser extension using JavaScript and background.js to automatically provide fact-checking feedback as users browse YouTube videos or articles. This seamless integration enables users to view content without needing to manually input links.

Additionally, by leveraging pre-trained models and sophisticated algorithms, our system achieves real-time fact-checking without the need for extensive re-training, making it both scalable and efficient. This project highlights the power of NLP, AI, and real-world data integration, resulting in a technically complex yet user-friendly solution for promoting informed voting in presidential elections.
