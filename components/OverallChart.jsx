"use client";
import React, { useEffect, useState } from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Tooltip,
  PointElement,
  LineElement,
} from "chart.js";
import { Line } from "react-chartjs-2";
import Loading from "./Loading";
import { getOverallHours } from "@/actions/actions";

// Register ChartJS components using ChartJS.register
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip
);

const colors = {
  Maths: "#DE5353",
  Physics: "#1072e3",
  ICT: "#10e348",
};

export default function OverallChart({ selectedMonth, selectedYear }) {
  const [pending, setPending] = useState(false);
  const [options, setOptions] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    setPending(true);
    const run = async (month, year) => {
      const res = await getOverallHours(month, year);

      // Aggregate hours for the same createdAt value
      const aggregatedData = res.reduce((acc, curr) => {
        const existingEntry = acc.find(
          (item) => item.createdAt === curr.createdAt
        );
        if (existingEntry) {
          existingEntry.hours += curr.hours;
        } else {
          acc.push(curr);
        }
        return acc;
      }, []);

      const labels = aggregatedData.map((r) => r.createdAt);
      const datasets = Object.keys(colors).map((subject) => {
        const data = aggregatedData
          .filter((item) => item.subject === subject)
          .map((item) => item.hours);
        return {
          label: subject,
          data: data,
          backgroundColor: colors[subject],
          borderColor: colors[subject],
          fill: false,
        };
      });

      setOptions({
        labels: labels,
        datasets: datasets,
      });

      setPending(false);
    };

    run(selectedMonth, selectedYear);
  }, [selectedMonth, selectedYear]);

  if (pending) {
    return <Loading />;
  }

  return (
    <div>
      <Line data={options} />
    </div>
  );
}
