from youtube_transcript_api import YouTubeTranscriptApi
import spacy
from transformers import pipeline

# Load spaCy's English model
nlp = spacy.load("en_core_web_sm")

# Initialize Hugging Face zero-shot classification pipeline for fact-checking
classifier = pipeline("zero-shot-classification", model="facebook/bart-large-mnli")

# Function to fetch YouTube transcript
def fetch_youtube_transcript(video_id):
    try:
        # Fetch transcript as a list of text chunks
        transcript = YouTubeTranscriptApi.get_transcript(video_id)
        # Combine all transcript text into a single string
        full_transcript = " ".join([entry['text'] for entry in transcript])
        return full_transcript
    except Exception as e:
        return f"Error fetching transcript: {e}"

# Function to clean up the transcript
def clean_transcript(transcript):
    # Remove unnecessary newlines and extra spaces
    cleaned = " ".join(transcript.split())
    return cleaned

# Function to extract sentences using spaCy's robust sentence tokenizer
def extract_sentences_spacy(transcript):
    doc = nlp(transcript)
    sentences = [sent.text.strip() for sent in doc.sents]
    return sentences

# Function to fact-check sentences using Hugging Face's zero-shot classification pipeline
def fact_check_sentence_huggingface(sentence):
    candidate_labels = ["true", "false", "uncertain"]
    result = classifier(sentence, candidate_labels)
    return result

# Function to process the transcript and fact-check each sentence
def process_and_fact_check(video_id):
    transcript = fetch_youtube_transcript(video_id)

    if "Error" not in transcript:
        # Clean and process transcript
        cleaned_transcript = clean_transcript(transcript)

        # Extract sentences using spaCy
        sentences = extract_sentences_spacy(cleaned_transcript)

        # Output sentences with fact-check results
        for i, sentence in enumerate(sentences, 1):
            print(f"Sentence {i}: {sentence}")
            fact_check_result = fact_check_sentence_huggingface(sentence)
            print(f"Fact-check result: {fact_check_result}\n")
    else:
        print(transcript)

# Replace 'YOUR_VIDEO_ID_HERE' with the actual video ID
video_id = "jujCV86WEPE"  # Example: Replace this with your actual video ID
process_and_fact_check(video_id)
