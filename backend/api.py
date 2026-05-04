from flask import Flask, request, jsonify
from flask_cors import CORS
import subprocess
import os
from optimizer import optimize_contract

app = Flask(__name__)
CORS(app)

# ================================
# 🔧 PATH CONFIG
# ================================
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

PYTHON_PATH = "C:\\Users\\thecm\\AppData\\Local\\Programs\\Python\\Python310\\python.exe"
LSTM_PATH = os.path.join(BASE_DIR, "lstm_model.py")


# ================================
# 🤖 LSTM GAS PREDICTION
# ================================
def get_prediction():
    try:
        output = subprocess.check_output(
            f'"{PYTHON_PATH}" "{LSTM_PATH}"',
            shell=True
        ).decode()

        # safer parsing
        if ":" in output:
            value = float(output.split(":")[-1].strip())
        else:
            value = float(output.strip())

        return value

    except Exception as e:
        print("LSTM ERROR:", e)
        return 0.8  # fallback


# ================================
# 🔮 API: ONLY PREDICTION
# ================================
@app.route("/predict", methods=["GET"])
def predict():
    value = get_prediction()

    return jsonify({
        "prediction": value,
        "decision": "SEND" if value < 1 else "WAIT"
    })


# ================================
# 🧠 API: ANALYZE + OPTIMIZE + AI
# ================================
@app.route("/analyze", methods=["POST"])
def analyze():
    try:
        data = request.get_json()

        if not data or "code" not in data:
            return jsonify({"error": "Missing contract code"}), 400

        code = data.get("code", "").strip()

        if not code:
            return jsonify({"error": "Empty contract code"}), 400

        # 🔍 Analyze + optimize
        optimized_code, suggestions = optimize_contract(code)

        # 🤖 AI prediction
        prediction = get_prediction()

        # 🧠 Decision logic
        recommendation = "Deploy Now" if prediction < 1 else "Wait"

        # 🔥 Response
        return jsonify({
            "issues": suggestions,
            "optimized_code": optimized_code,
            "original_length": len(code),
            "optimized_length": len(optimized_code),
            "predicted_gas": round(prediction, 4),
            "recommendation": recommendation
        })

    except Exception as e:
        print("ANALYZE ERROR:", e)

        return jsonify({
            "error": "Internal server error",
            "details": str(e)
        }), 500


# ================================
# 🧪 HEALTH CHECK (IMPORTANT)
# ================================
@app.route("/")
def home():
    return jsonify({
        "status": "running",
        "message": "API is working"
    })


# ================================
# 🚀 RUN SERVER
# ================================
if __name__ == "__main__":
    print("🚀 Server running at http://127.0.0.1:5000")
    app.run(port=5000, debug=True)