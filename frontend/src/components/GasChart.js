import React from "react";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend
);

export default function GasChart() {
  const data = {
    labels: ["1", "2", "3", "4", "5"],
    datasets: [
      {
        label: "Gas Trend (Gwei)",
        data: [0.8, 1.2, 0.9, 1.1, 0.7],
        borderWidth: 3,
        tension: 0.4,
        fill: true,

        // 🔥 HIGH CONTRAST COLORS
        borderColor: "#60a5fa",
        backgroundColor: "rgba(96,165,250,0.15)",
        pointBackgroundColor: "#60a5fa",
        pointBorderColor: "#ffffff",
        pointRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: "#f8fafc", // 🔥 brighter
        },
      },
      tooltip: {
        backgroundColor: "#020617",
        titleColor: "#f8fafc",
        bodyColor: "#cbd5f5",
        borderColor: "#334155",
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#cbd5f5", // 🔥 brighter
        },
        grid: {
          color: "#1e293b", // subtle grid
        },
      },
      y: {
        ticks: {
          color: "#cbd5f5",
        },
        grid: {
          color: "#1e293b",
        },
      },
    },
  };

  return (
    <div style={cardStyle}>
      <h2 style={titleStyle}>📈 Gas Trend</h2>

      <p style={subText}>
        Real-time gas movement visualization
      </p>

      <Line data={data} options={options} />
    </div>
  );
}

/* ---------- STYLES ---------- */

const cardStyle = {
  background: "#020617", // darker for contrast
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