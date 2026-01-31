"use client";

import { Chart, ChartConfiguration, registerables } from "chart.js";
import { useEffect, useRef, useState } from "react";

Chart.register(...registerables);

interface ChartProps {
  labels: string[];
  counts: number[];
}

function getThemeColors() {
  if (typeof window === "undefined") {
    return { text: "#8afff3", primary: "#8afff3" };
  }

  const rootStyle = getComputedStyle(document.documentElement);

  return {
    text: rootStyle.getPropertyValue("--color-text-main").trim() || "#fff",
    primary:
      rootStyle.getPropertyValue("--$color-primary-active").trim() || "#8afff3",
  };
}

export default function ExecutionChart({ labels, counts }: ChartProps) {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);

  const [{ text, primary }] = useState(getThemeColors);

  useEffect(() => {
    if (!chartRef.current) return;

    const abbreviatedLabels = labels.map((label) => {
      const year = label.replace(/[^0-9]/g, "");
      return `'${year.slice(2)}`;
    });

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    const config: ChartConfiguration<"bar", number[]> = {
      type: "bar",
      data: {
        labels: abbreviatedLabels,
        datasets: [
          {
            label: "연간 집행 건수",
            data: counts,
            base: 10000,
            backgroundColor: primary,
            borderColor: primary,
            borderWidth: 1,
            borderRadius: { topLeft: 4, topRight: 4 },
            barThickness: 18,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: 2000,
          easing: "easeOutQuart",
          delay: (context) => context.dataIndex * 200,
        },
        scales: {
          x: {
            grid: {
              display: true,
              color: "rgba(255,255,255,0.2)",
            },
            ticks: {
              font: { size: 12, weight: 500 },
              color: text,
            },
          },
          y: {
            beginAtZero: false,
            min: 10000,
            grid: {
              color: "rgba(255,255,255,0.2)",
            },
            ticks: {
              callback: (value) => value.toLocaleString(),
              color: text,
            },
          },
        },
        plugins: {
          legend: {
            display: true,
            position: "top",
            align: "end",
            labels: {
              boxWidth: 11,
              boxHeight: 11,
              padding: 10,
              font: {
                size: 11,
                weight: 400,
              },
              color: text,
            },
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                const rawValue = context.raw as [number, number];
                return ` 집행: ${rawValue[1].toLocaleString()} 건`;
              },
            },
          },
        },
      },
    };

    chartInstance.current = new Chart(ctx, config);

    return () => {
      chartInstance.current?.destroy();
    };
  }, [labels, counts, text, primary]);

  return <canvas ref={chartRef} />;
}
