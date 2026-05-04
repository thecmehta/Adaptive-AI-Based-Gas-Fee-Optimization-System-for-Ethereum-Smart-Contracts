import React, { useState } from "react";
import axios from "axios";

export default function ContractAnalyzer() {
  const [code, setCode] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyze = async () => {
    if (!code.trim()) {
      alert("Paste contract first");
      return;
    }

    try {
      setLoading(true);
      setResult(null);

      const res = await axios.post("http://127.0.0.1:5000/analyze", {
        code: code,
      });

      setResult(res.data);
    } catch (err) {
      console.error(err);
      alert("Backend error. Make sure API is running.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result.optimized_code);
  };

  return (
    <div style={{ marginTop: "20px" }}>

      {/* INPUT CARD */}
      <div style={cardStyle}>
        <h2 style={titleStyle}>
          🧠 Smart Contract Optimizer + AI
        </h2>

        <p style={subText}>
          Analyze contract efficiency, optimize gas usage, and get AI-based deployment timing.
        </p>

        <textarea
          rows="10"
          style={textareaStyle}
          placeholder="Paste Solidity contract here..."
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />

        <button onClick={analyze} style={buttonStyle(loading)}>
          {loading ? "Analyzing..." : "Analyze Contract"}
        </button>
      </div>

      {/* RESULT */}
      {result && (
        <div style={cardStyle}>

          {result.error && (
            <p style={{ color: "#f87171" }}>{result.error}</p>
          )}

          <div style={gridStyle}>

            {/* LEFT */}
            <div>
              <h3 style={sectionTitle}>🔍 Issues</h3>
              {result.issues.map((item, idx) => (
                <p key={idx} style={issueText}>
                  • {item}
                </p>
              ))}

              <h3 style={sectionTitle}>📏 Size</h3>
              <p style={text}>Original: {result.original_length}</p>
              <p style={text}>Optimized: {result.optimized_length}</p>
            </div>

            {/* RIGHT */}
            <div>
              <h3 style={sectionTitle}>🤖 AI Prediction</h3>
              <p style={text}>Gas: {result.predicted_gas}</p>

              <p style={{
                fontWeight: "bold",
                fontSize: "18px",
                color:
                  result.recommendation === "Deploy Now"
                    ? "#4ade80"
                    : "#f87171"
              }}>
                {result.recommendation}
              </p>
            </div>

          </div>

          {/* CODE */}
          <h3 style={sectionTitle}>✨ Optimized Contract</h3>

          <button onClick={copyToClipboard} style={copyButton}>
            📋 Copy Code
          </button>

          <pre style={codeBlock}>
            {result.optimized_code}
          </pre>

        </div>
      )}
    </div>
  );
}

/* ---------- STYLES ---------- */

const cardStyle = {
  background: "#020617", // darker = better contrast
  padding: "22px",
  borderRadius: "12px",
  marginTop: "20px",
  border: "1px solid #1e293b"
};

const titleStyle = {
  color: "#f8fafc",
  marginBottom: "8px"
};

const subText = {
  color: "#cbd5f5",
  marginBottom: "15px"
};

const textareaStyle = {
  width: "100%",
  fontFamily: "monospace",
  background: "#020617",
  color: "#f8fafc",
  border: "1px solid #334155",
  borderRadius: "8px",
  padding: "12px",
  marginBottom: "15px"
};

const buttonStyle = (loading) => ({
  background: loading ? "#475569" : "#2563eb",
  padding: "10px 18px",
  borderRadius: "8px",
  color: "#f8fafc",
  border: "none",
  cursor: "pointer",
  fontWeight: "500"
});

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "25px"
};

const sectionTitle = {
  color: "#f8fafc",
  marginBottom: "8px"
};

const issueText = {
  color: "#fde047", // bright yellow
  marginBottom: "5px"
};

const text = {
  color: "#e2e8f0"
};

const copyButton = {
  background: "#22c55e",
  color: "#020617",
  padding: "6px 12px",
  borderRadius: "6px",
  border: "none",
  cursor: "pointer",
  marginBottom: "10px",
  fontWeight: "500"
};

const codeBlock = {
  background: "#020617",
  padding: "15px",
  borderRadius: "8px",
  overflowX: "auto",
  border: "1px solid #334155",
  color: "#f8fafc"
};