import React, { useState } from "react";
import { ethers } from "ethers";

export default function ExecuteButton() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [txHash, setTxHash] = useState("");

  const execute = async () => {
    try {
      if (!window.ethereum) {
        alert("Install MetaMask");
        return;
      }

      setLoading(true);
      setStatus("🔌 Connecting wallet...");
      setTxHash("");

      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();

      setStatus("📡 Sending transaction...");

      const contractAddress = "PASTE_YOUR_CONTRACT_ADDRESS";
      const abi = ["function addNumbers(uint256 n) public"];
      const contract = new ethers.Contract(contractAddress, abi, signer);

      const tx = await contract.addNumbers(10);
      setTxHash(tx.hash);

      setStatus("⏳ Waiting for confirmation...");
      await tx.wait();

      setStatus("✅ Transaction Successful!");
    } catch (err) {
      console.error(err);
      setStatus("❌ Transaction failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={cardStyle}>

      <h2 style={titleStyle}>🚀 Execute Transaction</h2>

      <p style={subText}>
        Interact with your smart contract directly from the dashboard.
      </p>

      <button
        onClick={execute}
        disabled={loading}
        style={buttonStyle(loading)}
      >
        {loading ? "Processing..." : "🚀 Execute Transaction"}
      </button>

      {/* STATUS */}
      {status && (
        <p style={{
          marginTop: "15px",
          fontWeight: "500",
          color: getStatusColor(status)
        }}>
          {status}
        </p>
      )}

      {/* TX HASH */}
      {txHash && (
        <div style={hashBox}>
          <p style={{ fontSize: "12px", color: "#cbd5f5" }}>
            TX Hash:
          </p>

          <a
            href={`https://sepolia.etherscan.io/tx/${txHash}`}
            target="_blank"
            rel="noreferrer"
            style={linkStyle}
          >
            {txHash.slice(0, 20)}...
          </a>
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
  boxShadow: "0 4px 20px rgba(0,0,0,0.3)"
};

const titleStyle = {
  color: "#f8fafc",
  marginBottom: "8px"
};

const subText = {
  color: "#cbd5f5",
  marginBottom: "15px"
};

const buttonStyle = (loading) => ({
  background: loading ? "#475569" : "#2563eb",
  padding: "12px 18px",
  borderRadius: "8px",
  border: "none",
  color: "#f8fafc",
  cursor: loading ? "not-allowed" : "pointer",
  fontWeight: "500"
});

const hashBox = {
  marginTop: "15px",
  padding: "10px",
  background: "#020617",
  borderRadius: "8px",
  border: "1px solid #334155"
};

const linkStyle = {
  color: "#60a5fa",
  fontSize: "13px",
  textDecoration: "none"
};

/* ---------- STATUS COLOR ---------- */

function getStatusColor(status) {
  if (status.includes("Successful")) return "#4ade80";
  if (status.includes("failed")) return "#f87171";
  return "#fde047";
}