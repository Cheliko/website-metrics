import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

interface MetricData {
  timestamp: string;
  impressions: number;
  clicks: number;
  cost: number;
  conversions: number;
}

interface MetricsChartProps {
  metrics: MetricData[];
}

// chart's scales and components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const DataChart: React.FC<MetricsChartProps> = ({ metrics }) => {
  if (!metrics || metrics.length === 0) {
    return <div>No data available</div>; // Handle no data case
  }

  const chartData = {
    labels: metrics.map((m) => m.timestamp),
    datasets: [
      {
        label: "Impressions",
        data: metrics.map((m) => m.impressions),
        borderColor: "rgba(75,192,192,1)",
        fill: false,
      },
      {
        label: "Clicks",
        data: metrics.map((m) => m.clicks),
        borderColor: "rgba(153,102,255,1)",
        fill: false,
      },
      {
        label: "Cost",
        data: metrics.map((m) => m.cost),
        borderColor: "rgba(255,159,64,1)",
        fill: false,
      },
      {
        label: "Conversions",
        data: metrics.map((m) => m.conversions),
        borderColor: "rgba(255,99,132,1)",
        fill: false,
      },
    ],
  };

  return <Line data={chartData} />;
};

export default DataChart;
