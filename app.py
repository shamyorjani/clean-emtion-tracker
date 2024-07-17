from flask import Flask, redirect, render_template, Response, jsonify
import threading
import cv2
from fer import FER
import time

cap = cv2.VideoCapture(0)
# Initialize the emotion detector
emotion_detector = FER(mtcnn=True)

app = Flask(__name__)
detected_emotion = ""

# Function to start face detection and emotion recognition
def detect_emotion():
    global detected_emotion
    
    while True:
        ret, frame = cap.read()
        if not ret:
            break

        # Detect emotions
        emotions = emotion_detector.detect_emotions(frame)
        if emotions:
            detected_emotion = max(emotions[0]["emotions"], key=emotions[0]["emotions"].get)

        time.sleep(5)  # Update the emotion every 5 seconds

    cap.release()

# Function to generate video stream
def generate_frames():
    # cap = cv2.VideoCapture(-1)
    while True:
        success, frame = cap.read()
        if not success:
            break
        else:
            ret, buffer = cv2.imencode('.jpg', frame)
            frame = buffer.tobytes()
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

# Route to display detected emotion
@app.route('/')
def index():
    return render_template('results.html', emotion=detected_emotion)

@app.route('/get_emotion')
def home():
    return render_template('index.html',emotion=detected_emotion)

@app.route('/connect')
def connect():
    return render_template('connect.html')

@app.route('/connection')
def connection():
    return render_template('connect.html')

@app.route('/callback')
def callback():
    return redirect("http://localhost:5000")

@app.route('/free-subscription')
def free_subscription():
    return render_template('free-subscription.html')

@app.route('/video_feed')
def video_feed():
    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/emotion', methods=['GET'])
def get_emotion():
    return jsonify(emotion=detected_emotion)

if __name__ == "__main__":
    # Start the emotion detection in a separate thread
    t = threading.Thread(target=detect_emotion)
    t.start()

    # Run the Flask app
    app.run(debug=True, use_reloader=False)
