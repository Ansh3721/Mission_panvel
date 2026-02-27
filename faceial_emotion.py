from deepface import DeepFace
import cv2
import time
from datetime import datetime

face_cascade = cv2.CascadeClassifier(
    cv2.data.haarcascades + "haarcascade_frontalface_default.xml"
)

cap = cv2.VideoCapture(0)

print("Press 'q' to quit")

last_analysis_time = 0
emotion_log = []

while True:
    ret, frame = cap.read()
    if not ret:
        break

    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(gray, 1.3, 5)

    current_time = time.time()

    for (x, y, w, h) in faces:

        cv2.rectangle(frame, (x, y), (x+w, y+h),
                      (0, 255, 0), 2)

        if current_time - last_analysis_time >= 10:

            face = frame[y:y+h, x:x+w]
            face = cv2.resize(face, (224, 224))

            try:
                result = DeepFace.analyze(
                    face,
                    actions=['emotion'],
                    enforce_detection=False
                )

                emotions = result[0]['emotion']

                # 🔥 Get top 2 emotions
                sorted_emotions = sorted(
                    emotions.items(),
                    key=lambda x: x[1],
                    reverse=True
                )

                top_1 = sorted_emotions[0]
                top_2 = sorted_emotions[1]

                data = {
                    "time": datetime.now().strftime("%H:%M:%S"),
                    "top_1": {
                        "emotion": top_1[0],
                        "percentage": round(top_1[1], 2)
                    },
                    "top_2": {
                        "emotion": top_2[0],
                        "percentage": round(top_2[1], 2)
                    }
                }

                emotion_log.append(data)

                print("Logged:", data)

                last_analysis_time = current_time

            except:
                pass

    cv2.imshow("Top 2 Emotion Logger", frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()

print("\nFinal Emotion Array:\n")
print(emotion_log)