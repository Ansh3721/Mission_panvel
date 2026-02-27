import warnings
warnings.filterwarnings("ignore")

import os
os.environ["TF_CPP_MIN_LOG_LEVEL"] = "3"

import cv2
import torch
import time
import sounddevice as sd
import numpy as np
from scipy.io.wavfile import write
from transformers import pipeline

# ===================================
# USER INPUT SECTION
# ===================================

voice_enabled = False     # Set True if user gives audio
typed_text = ""           # Put text here if user types something

# ===================================
# LOAD MODELS (Load once)
# ===================================

# Text Emotion Model
text_emotion_model = pipeline(
    "text-classification",
    model="j-hartmann/emotion-english-distilroberta-base",
    top_k=None
)

# Voice Emotion Model
voice_emotion_model = pipeline(
    "audio-classification",
    model="superb/wav2vec2-base-superb-er",
    top_k=None
)

# Speech-to-Text Model
stt_model = pipeline(
    "automatic-speech-recognition",
    model="openai/whisper-small"
)

# ===================================
# FUNCTIONS
# ===================================

def get_top2_text_emotions(text):
    results = text_emotion_model(text)[0]
    top2 = sorted(results, key=lambda x: x['score'], reverse=True)[:2]
    return [
        {"emotion": r["label"], "percentage": round(r["score"]*100, 2)}
        for r in top2
    ]

def detect_voice():
    duration = 5
    fs = 16000

    print("Recording Audio...")
    recording = sd.rec(int(duration * fs), samplerate=fs, channels=1)
    sd.wait()
    write("temp_voice.wav", fs, recording)

    # Voice Emotion
    voice_results = voice_emotion_model("temp_voice.wav")
    voice_dict = {
        r["label"]: round(r["score"] * 100, 2)
        for r in voice_results
    }

    # Speech-to-Text
    text = stt_model("temp_voice.wav")["text"]

    # Emotion from spoken text
    text_emotions = get_top2_text_emotions(text)

    return {
        "spoken_text": text,
        "voice_emotion": voice_dict,
        "text_emotion_from_voice": text_emotions
    }

def detect_face():
    face_model = cv2.CascadeClassifier(
        cv2.data.haarcascades + "haarcascade_frontalface_default.xml"
    )

    cap = cv2.VideoCapture(0)
    print("Camera running for 3 seconds...")

    face_detected = False
    start_time = time.time()

    while time.time() - start_time < 3:
        ret, frame = cap.read()
        if not ret:
            break

        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        faces = face_model.detectMultiScale(gray, 1.3, 5)

        for (x, y, w, h) in faces:
            face_detected = True
            cv2.rectangle(frame, (x,y), (x+w,y+h), (255,0,0), 2)

        cv2.imshow("Face Detection", frame)
        cv2.waitKey(1)

    cap.release()
    cv2.destroyAllWindows()

    return {"face_detected": face_detected}
# ===================================
# MAIN EXECUTION
# ===================================

final_output = {}

# 1️⃣ Camera ALWAYS ON
final_output["facial_data"] = detect_face()

# 2️⃣ Voice (Only if user enables)
if voice_enabled:
    final_output["voice_data"] = detect_voice()

# 3️⃣ Typed Text (Only if user provides)
if typed_text.strip() != "":
    final_output["typed_text_emotion"] = get_top2_text_emotions(typed_text)

# ===================================
# FINAL RESULT
# ===================================

print("\nFINAL OUTPUT:\n")
print(final_output)