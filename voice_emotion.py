import warnings
warnings.filterwarnings("ignore")

import os
os.environ["TF_CPP_MIN_LOG_LEVEL"] = "3"

from transformers import pipeline

# -------------------------------
# Load Models (only once)
# -------------------------------

# 🎙 Speech-to-Text
stt = pipeline(
    "automatic-speech-recognition",
    model="openai/whisper-small"
)

# 😊 Voice Emotion
voice_emotion_classifier = pipeline(
    "audio-classification",
    model="superb/wav2vec2-base-superb-er",
    top_k=None
)

# 🧠 Text Emotion
text_emotion_classifier = pipeline(
    "text-classification",
    model="j-hartmann/emotion-english-distilroberta-base",
    top_k=None
)

# -------------------------------
# Function: Get Top 2 Text Emotions
# -------------------------------
def get_top2_text_emotions(text):
    results = text_emotion_classifier(text)[0]
    top2 = sorted(results, key=lambda x: x['score'], reverse=True)[:2]

    return [
        {
            "emotion": item["label"],
            "percentage": round(item["score"] * 100, 2)
        }
        for item in top2
    ]

# -------------------------------
# Audio File
# -------------------------------
audio_file = "voice.wav"  # replace with your file

# -------------------------------
# Run Speech-to-Text
# -------------------------------
text = stt(audio_file)["text"]

# -------------------------------
# Run Voice Emotion
# -------------------------------
voice_results = voice_emotion_classifier(audio_file)
voice_emotions = {
    r['label']: round(r['score'] * 100, 2)
    for r in voice_results
}

# -------------------------------
# Run Text Emotion
# -------------------------------
text_emotions = get_top2_text_emotions(text)

# -------------------------------
# Final Output
# -------------------------------
final_output = {
    "transcribed_text": text,
    "voice_emotions": voice_emotions,
    "text_top2_emotions": text_emotions
}

print(final_output)