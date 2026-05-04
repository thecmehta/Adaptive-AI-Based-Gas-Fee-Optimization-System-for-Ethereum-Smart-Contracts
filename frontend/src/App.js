import React from "react";
import GasPanel from "./components/GasPanel";
import PredictionPanel from "./components/PredictionPanel";
import ExecuteButton from "./components/ExecuteButton";
import GasChart from "./components/GasChart";
import ContractAnalyzer from "./components/ContractAnalyzer";

function App() {
  return (
    <div style={containerStyle}>

      {/* HEADER CARD (🔥 FIXED) */}
      <div style={headerCard}>
        <h1 style={titleStyle}>
          🚀 Adaptive Gas Optimization Dashboard
        </h1>
        <p style={subtitleStyle}>
          Optimize contracts, predict gas fees, and execute transactions intelligently using AI.
        </p>
      </div>

      {/* ANALYZER */}
      <div style={{ marginBottom: "30px" }}>
        <ContractAnalyzer />
      </div>

      {/* GRID */}
      <div style={gridStyle}>
        <div style={cardWrapper}><GasPanel /></div>
        <div style={cardWrapper}><PredictionPanel /></div>
        <div style={cardWrapper}><GasChart /></div>
        <div style={cardWrapper}><ExecuteButton /></div>
      </div>

    </div>
  );
}

export default App;

/* ---------- STYLES ---------- */

const containerStyle = {
  padding: "30px",
  maxWidth: "1200px",
  margin: "auto",
  fontFamily: "Inter, sans-serif",
  color: "#f8fafc",
};

/* 🔥 NEW: header is now a card */
const headerCard = {
  background: "#020617",
  padding: "20px",
  borderRadius: "12px",
  border: "1px solid #1e293b",
  marginBottom: "25px",
};

const titleStyle = {
  marginBottom: "6px",
  color: "#f8fafc",
};

const subtitleStyle = {
  color: "#cbd5f5",
};

/* 🔥 responsive grid */
const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  gap: "20px",
};

const cardWrapper = {
  display: "flex",
};