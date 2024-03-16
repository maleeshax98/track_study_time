"use client";
import React, { useEffect, useState } from "react";
import AddModal from "./AddModal";
import { getWeekData, getWorkingHoursByMonth } from "@/actions/actions";

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

// Register ChartJS components using ChartJS.register
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip
);

export default function Chart({
  subject,
  weekStart,
  weekEnd,
  selectedWeek,
  selectedMonth,
  selectedYear,
}) {
  const [update, setUpdate] = useState(1);
  const [workedTime, setWorkedTime] = useState(0);
  const [toWorkHours, setToWorkHours] = useState(9);
  const [pending, setPending] = useState(false);
  const [options, setOptions] = useState({
    labels: [""],
    datasets: [
      {
        fill: true,
        data: [0],
        backgroundColor: "purple",
      },
    ],
  });

  useEffect(() => {
    const run = async (weekStart, weekEnd) => {
      setPending(true);
      if (weekEnd && weekStart) {
        const res =
          selectedWeek === "Not Selected"
            ? await getWorkingHoursByMonth(selectedMonth, selectedYear)
            : await getWeekData(weekStart, weekEnd, subject);
        // console.log(subject, "==> ", res);
        setOptions((prev) => ({
          ...prev,
          labels:
            selectedWeek === "Not Selected"
              ? res.map((r) => `${r.startDate}-${r.endDate}`)
              : res.map((r) => r.createdAt),
          datasets: [
            {
              fill: true,
              data:
                selectedWeek === "Not Selected"
                  ? res.map((r) => r.totalHours)
                  : res.map((r) => r.hoursSum),
              tension: 0.5,
              backgroundColor:
                subject === "Maths"
                  ? "#DE5353"
                  : subject === "Physics"
                  ? "#1072e3"
                  : "#10e348",
              borderColor:
                subject === "Maths"
                  ? "#DE5353"
                  : subject === "Physics"
                  ? "#1072e3"
                  : "#10e348",
            },
          ],
        }));

        if (selectedWeek !== "Not Selected") {
          let workedHours = 0;

          res.map((r) => {
            workedHours = workedHours + r.hoursSum;
          });

          setWorkedTime(workedHours);
          setToWorkHours(9 - workedHours < 0 ? 0 : 9 - workedHours);
        }
      }
      setPending(false);
    };

    run(weekStart, weekEnd, subject);
  }, []);

  useEffect(() => {
    setPending(true);
    const run = async (weekStart, weekEnd) => {
      // console.log(selectedWeek);

      // Check if selectedWeek is "Not Selected", if true, proceed without checking weekEnd and weekStart
      if (selectedWeek === "Not Selected") {
        const res = await getWorkingHoursByMonth(
          selectedMonth,
          selectedYear,
          subject
        );
        // console.log(subject, "==> ", res);

        setOptions((prev) => ({
          ...prev,
          labels: res.map((r) => `${r.startDate}-${r.endDate}`),
          datasets: [
            {
              fill: true,
              data: res.map((r) => r.totalHours),
              tension: 0.5,
              backgroundColor:
                subject === "Maths"
                  ? "#DE5353"
                  : subject === "Physics"
                  ? "#1072e3"
                  : "#10e348",
              borderColor:
                subject === "Maths"
                  ? "#DE5353"
                  : subject === "Physics"
                  ? "#1072e3"
                  : "#10e348",
            },
          ],
        }));

        let workedHours = 0;
        res.forEach((r) => {
          workedHours += r.totalHours;
        });

        setWorkedTime(workedHours.toFixed(2));
        setToWorkHours(9 - workedHours.toFixed(2) < 0 ? 0 : 9 - workedHours.toFixed(2));

      } else if (weekEnd && weekStart) {
        const res = await getWeekData(weekStart, weekEnd, subject);
        // console.log(subject, "==> ", res);

        setOptions((prev) => ({
          ...prev,
          labels: res.map((r) => r.createdAt),
          datasets: [
            {
              fill: true,
              data: res.map((r) => r.hoursSum),
              tension: 0.5,
              backgroundColor:
                subject === "Maths"
                  ? "#DE5353"
                  : subject === "Physics"
                  ? "#1072e3"
                  : "#10e348",
              borderColor:
                subject === "Maths"
                  ? "#DE5353"
                  : subject === "Physics"
                  ? "#1072e3"
                  : "#10e348",
            },
          ],
        }));

        let workedHours = 0;
        res.forEach((r) => {
          workedHours += r.hoursSum;
        });

        setWorkedTime(workedHours.toFixed(2));
        setToWorkHours(9 - workedHours.toFixed(2) < 0 ? 0 : 9 - workedHours.toFixed(2));
      }

      setPending(false);
    };

    run(weekStart, weekEnd);
  }, [weekStart, weekEnd, update, selectedWeek, selectedMonth]);

  if (pending) {
    return <Loading />;
  }

  return (
    <div>
      <p className="font-bold ">{subject}</p>
      <div>
        <Line data={options} />
        {
          <div className="my-[10px] font-semibold">
            <p>Worked Time: {workedTime}Hours</p>
            {selectedWeek !== "Not Selected" && (
              <p>You have to work: {toWorkHours}Hours More</p>
            )}
          </div>
        }
        <AddModal subject={subject} setUpdate={setUpdate} />
      </div>
    </div>
  );
}
