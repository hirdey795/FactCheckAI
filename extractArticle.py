import spacy

# Load a pre-trained NLP model (spaCy in this example)
nlp = spacy.load("en_core_web_sm")

def extract_title_and_body(full_text):
    # Process the full page text with NLP model
    doc = nlp(full_text)

    # Simple heuristic: first line with substantial length is likely the title
    sentences = [sent.text.strip() for sent in doc.sents]
    
    # Example: Assume title is the first long sentence (e.g., > 5 words)
    title = None
    for sentence in sentences:
        if len(sentence.split()) > 5:
            title = sentence
            break

    # The rest of the text is likely the article body
    body = "\n".join(sentences[1:])

    return title, body

# Example usage
full_page_text = """Sample text scraped from the page.
This is the title of the article.

Here starts the article content. 
It has multiple paragraphs and provides news or blog information."""

title, body = extract_title_and_body(full_page_text)
print("Title:", title)
print("Body:", body)