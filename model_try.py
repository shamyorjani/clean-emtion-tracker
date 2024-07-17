import cv2
from deepface import DeepFace

# Load face cascade classifier
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_frontalface_default.xml")

# Attempt to open webcam with different backends
backends = [cv2.CAP_DSHOW, cv2.CAP_V4L2, cv2.CAP_ANY]
video = None
for backend in backends:
    video = cv2.VideoCapture(0, backend)
    if video.isOpened():
        print(f"Webcam opened successfully with backend {backend}")
        break
else:
    raise Exception("Cannot open webcam with any backend")

while video.isOpened():
    ret, frame = video.read()
    if not ret:
        print("Failed to capture image")
        break

    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5)

    for (x, y, w, h) in faces:
        # Draw rectangle around face
        image = cv2.rectangle(frame, (x, y), (x + w, y + h), (89, 2, 236), 1)
        try:
            # Analyze emotions using DeepFace
            analyze = DeepFace.analyze(frame, actions=['emotion'])
            dominant_emotion = analyze['dominant_emotion']
            cv2.putText(image, dominant_emotion, (x, y - 10), cv2.FONT_HERSHEY_SIMPLEX, 1, (224, 77, 176), 2)
            print(dominant_emotion)
        except Exception as e:
            print(f'No face detected or analysis failed: {e}')

    cv2.imshow('video', frame)
    key = cv2.waitKey(1)
    if key == ord('q'):
        break

video.release()
cv2.destroyAllWindows()
