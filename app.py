from flask import Flask, render_template, Response, redirect, url_for
from deepface import DeepFace
import cv2
import threading
import time

app = Flask(__name__, static_url_path='/static')

# Set the required configurations
app.config['SERVER_NAME'] = 'localhost:5000'  # Replace with your server name
app.config['APPLICATION_ROOT'] = '/'
app.config['PREFERRED_URL_SCHEME'] = 'http'

# Load the pre-trained emotion detection model
model = DeepFace.build_model("Emotion")

# Define emotion labels
emotion_labels = ['angry', 'disgust', 'fear',
                  'happy', 'sad', 'surprise', 'neutral']

# Load face cascade classifier
face_cascade = cv2.CascadeClassifier(
    cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

# Global variable to store emotion
emotion_result = ''


def detect_emotion(frame):
    # Convert frame to grayscale
    gray_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

    # Detect faces in the frame
    faces = face_cascade.detectMultiScale(
        gray_frame, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30))

    for (x, y, w, h) in faces:
        # Extract the face ROI (Region of Interest)
        face_roi = gray_frame[y:y + h, x:x + w]

        # Resize the face ROI to match the input shape of the model
        resized_face = cv2.resize(
            face_roi, (48, 48), interpolation=cv2.INTER_AREA)

        # Normalize the resized face image
        normalized_face = resized_face / 255.0

        # Reshape the image to match the input shape of the model
        reshaped_face = normalized_face.reshape(1, 48, 48, 1)

        # Predict emotions using the pre-trained model
        preds = model.predict(reshaped_face)[0]
        emotion_idx = preds.argmax()
        emotion = emotion_labels[emotion_idx]

        # Draw rectangle around face and label with predicted emotion
        cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 0, 255), 2)
        cv2.putText(frame, emotion, (x, y - 10),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.9, (0, 0, 255), 2)

        # Update global variable with the detected emotion
        global emotion_result
        emotion_result = emotion

    return frame


def generate_frames():
    cap = cv2.VideoCapture(0)

    start_time = time.time()
    while time.time() - start_time < 5:  # Run for 5 seconds
        success, frame = cap.read()
        if not success:
            break
        else:
            frame = detect_emotion(frame)
            ret, buffer = cv2.imencode('.jpg', frame)
            frame = buffer.tobytes()
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

    # After 5 seconds, stop the video stream
    cap.release()
    time.sleep(1)  # Ensure the last frame is processed before redirection
    with app.app_context():
        # Redirect within the Flask application context
        # Yield a special frame to signal the end of the video stream
        yield b'--frame\r\nContent-Type: image/jpeg\r\n\r\n' + b'\r\n'


@app.route('/')
def index():
    return render_template('results.html', emotion=emotion_result)


@app.route('/connect')
def connect():
    return render_template('connect.html')


@app.route('/video_feed')
def video_feed():
    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')


@app.route('/callback')
def callback():
    return redirect("http://localhost:5000")

@app.route('/free-subscription')
def free_subscription():
    return render_template('free-subscription.html')

@app.route('/show_results')
def show_results():
    app.logger.info("Emotion detected: %s", emotion_result)
    return render_template('index.html', emotion=emotion_result)


if __name__ == "__main__":
    app.run(debug=True)