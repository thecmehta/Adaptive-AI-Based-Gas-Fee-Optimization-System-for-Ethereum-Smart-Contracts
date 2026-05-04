import React, { useState } from "react";
import axios from "axios";

export default function PredictionPanel() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const getPrediction = async () => {
    try {
      setLoading(true);
      setData(null);

      const res = await axios.get("http://127.0.0.1:5000/predict");
      setData(res.data);

    } catch (err) {
      console.error(err);
      alert("Backend not running!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={cardStyle}>
      <h2 style={titleStyle}>🧠 AI Gas Prediction</h2>

      <p style={subText}>
        Predict optimal gas price and execution timing using LSTM model.
      </p>

      <button
        onClick={getPrediction}
        disabled={loading}
        style={buttonStyle(loading)}
      >
        {loading ? "Running..." : "⚡ Run AI"}
      </button>

      {data && (
        <div style={{ marginTop: "20px" }}>

          {/* Prediction */}
          <div style={boxStyle}>
            <p style={labelStyle}>Predicted Gas</p>
            <h2 style={valueStyle}>{data.prediction}</h2>
          </div>

          {/* Decision */}
          <div
            style={{
              ...boxStyle,
              marginTop: "12px",
              borderLeft: `5px solid ${
                data.decision === "SEND" ? "#4ade80" : "#f87171"
              }`,
            }}
          >
            <p style={labelStyle}>Decision</p>
            <h2
              style={{
                color:
                  data.decision === "SEND" ? "#4ade80" : "#f87171",
              }}
            >
              {data.decision}
            </h2>
          </div>

        </div>
      )}
    </div>
  );
}

/* ---------- STYLES ---------- */

const cardStyle = {
  background: "#020617",
  padding: "22px",
  borderRadius: "12px",
  border: "1px solid #1e293b",
  boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
};

const titleStyle = {
  color: "#f8fafc",
  marginBottom: "6px",
};

const subText = {
  color: "#cbd5f5",
  marginBottom: "15px",
};

const buttonStyle = (loading) => ({
  background: loading ? "#475569" : "#2563eb",
  padding: "10px 16px",
  borderRadius: "8px",
  border: "none",
  color: "#f8fafc",
  cursor: loading ? "not-allowed" : "pointer",
  fontWeight: "500",
});

const boxStyle = {
  background: "#020617",
  padding: "14px",
  borderRadius: "8px",
  border: "1px solid #334155",
};

const labelStyle = {
  color: "#cbd5f5",
  fontSize: "13px",
};

const valueStyle = {
  color: "#f8fafc",
};