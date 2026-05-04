import React, { useEffect, useState } from "react";
import axios from "axios";

export default function GasPanel() {
  const [gas, setGas] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchGas = async () => {
      try {
        const res = await axios.get(
          "https://api.blocknative.com/gasprices/blockprices"
        );

        const block = res.data.blockPrices[0];
        const estimate = block.estimatedPrices[0];

        setGas({
          base: block.baseFeePerGas,
          priority: estimate.maxPriorityFeePerGas,
          max: estimate.maxFeePerGas,
        });

        setError("");
      } catch (err) {
        console.error(err);
        setError("Failed to fetch gas data");
      }
    };

    fetchGas();
    const interval = setInterval(fetchGas, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={cardStyle}>
      <h2 style={titleStyle}>📊 Live Gas Data</h2>

      <p style={subText}>
        Real-time Ethereum gas fees (Gwei)
      </p>

      {error && <p style={{ color: "#f87171" }}>{error}</p>}

      {!gas ? (
        <p style={{ color: "#fde047" }}>Loading...</p>
      ) : (
        <div style={gridStyle}>

          <GasBox label="Base Fee" value={gas.base} />
          <GasBox label="Priority Fee" value={gas.priority} />
          <GasBox label="Max Fee" value={gas.max} />

        </div>
      )}
    </div>
  );
}

/* ---------- COMPONENT ---------- */

function GasBox({ label, value }) {
  const color = getGasColor(value);

  return (
    <div style={boxStyle}>
      <p style={labelStyle}>{label}</p>
      <h3 style={{ color }}>{value}</h3>
    </div>
  );
}

/* ---------- COLOR LOGIC ---------- */

function getGasColor(val) {
  if (val < 0.5) return "#4ade80";   // green = cheap
  if (val < 1.0) return "#fde047";   // yellow = medium
  return "#f87171";                  // red = expensive
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

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr",
  gap: "15px",
};

const boxStyle = {
  background: "#020617",
  padding: "15px",
  borderRadius: "10px",
  textAlign: "center",
  border: "1px solid #334155",
};

const labelStyle = {
  color: "#cbd5f5",
  fontSize: "13px",
};