from transformers import pipeline

classifier = pipeline(
    "text-classification",
    model="j-hartmann/emotion-english-distilroberta-base",
    top_k=None  # ✅ IMPORTANT FIX
)

def get_top2_emotions(text):
    results = classifier(text)[0]   # list of emotions
    
    print("DEBUG:", results)  # 👈 temporarily keep this
    
    top2 = sorted(results, key=lambda x: x['score'], reverse=True)[:2]
    
    return [
        {
            "emotion": item["label"],
            "percentage": round(item["score"] * 100, 2)
        }
        for item in top2
    ]

text = "i am snakecharmer and today i found a red species of snake in my garden" \
""
print(get_top2_emotions(text))