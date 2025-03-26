import os
import numpy as np
import cv2
from flask import Flask, request, jsonify
from flask_cors import CORS
from tensorflow.keras.models import load_model

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# Load the Model
MODEL_PATH = r"C:\g\New folder\model1.h5"

try:
    model = load_model(MODEL_PATH)
    print("✅ Model loaded successfully!")
    print(f"🔍 Expected input shape: {model.input_shape}")  # Debugging
except Exception as e:
    print(f"❌ Error loading model: {str(e)}")
    model = None

# Image Preprocessing Function
def preprocess_image(image):
    try:
        image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)  # Convert BGR to RGB
        image = cv2.resize(image, (64, 64))  # Resize to match model input
        image = image / 255.0  # Normalize pixel values
        image = np.expand_dims(image, axis=0)  # Add batch dimension
        return image
    except Exception as e:
        print(f"⚠️ Error in image preprocessing: {str(e)}")
        return None

@app.route("/predict", methods=["POST"])
def predict():
    if "image" not in request.files:
        return jsonify({"error": "❌ No image uploaded"}), 400

    file = request.files["image"]
    if file.filename == "":
        return jsonify({"error": "❌ No file selected"}), 400

    try:
        # Convert file to OpenCV format
        image = cv2.imdecode(np.frombuffer(file.read(), np.uint8), cv2.IMREAD_COLOR)

        if image is None:
            return jsonify({"error": "❌ Invalid image format"}), 400

        processed_image = preprocess_image(image)

        if processed_image is None:
            return jsonify({"error": "❌ Error processing image"}), 400

        if model is None:
            return jsonify({"error": "❌ Model is not loaded"}), 500

        # Predict
        prediction = model.predict(processed_image)[0][0]
        label = "Dog" if prediction > 0.5 else "Cat"

        return jsonify({"animal_name": label})
    except Exception as e:
        print(f"⚠️ Prediction Error: {str(e)}")  # Debugging line
        return jsonify({"error": "❌ Error processing image"}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=True)
