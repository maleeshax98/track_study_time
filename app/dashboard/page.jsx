"use client";

import Chart from "@/components/Chart";
import Header from "@/components/Header";
import OverallChart from "@/components/OverallChart";
import { months, weeks, years } from "@/constants/Arrays";
import { getWeekStartAndEndDates } from "@/func/getTimeRange";
import React, { useEffect, useState } from "react";

export default function Dashboard() {
  const [selectedMonth, setSelectedMonth] = useState(
    months[new Date().getMonth()]
  );
  const [selectedWeek, setSelectedWeek] = useState(weeks[0]);
  const [selectedYear, setSelectedYear] = useState(years[0]);
  const [weekStart, setWeekStart] = useState(null);
  const [weekEnd, setWeekEnd] = useState(null);
  const subjects = ["Maths", "Physics", "ICT"];

  useEffect(() => {
    // console.log(selectedMonth, selectedWeek, selectedYear);
    if (selectedWeek !== "Not Selected") {
      const { start, end } = getWeekStartAndEndDates(
        months.indexOf(selectedMonth),
        selectedYear,
        weeks.indexOf(selectedWeek)
      );
      setWeekStart(start);
      setWeekEnd(end);
    }

    // console.log(start, end);
  }, [selectedMonth, selectedWeek, selectedYear]);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="my-[10px] font-bold text-center">
        <p>Welcome Maleesha</p>
        <p>Dashboard</p>
      </div>
      <Header
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
        selectedWeek={selectedWeek}
        setSelectedWeek={setSelectedWeek}
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
      />

      <div>
        {selectedWeek !== "Not Selected" &&
          weekStart !== null &&
          weekEnd !== null && (
            <p>
              Time Range - {weekStart.toLocaleDateString()} -{" "}
              {weekEnd.toLocaleDateString()}{" "}
            </p>
          )}
      </div>

      <div>
        <p className="font-bold text-center my-[10px]">Overall Work Time</p>
        <center>
          <div className="w-full md:max-w-[950px]">
            <OverallChart
              selectedMonth={selectedMonth}
              selectedYear={selectedYear}
            />
          </div>
        </center>
      </div>

      {/* <div className="w-full mt-[20px] flex flex-wrap justify-center gap-[50px]"> */}
      <div className="mt-[50px] justify-center grid md:grid-cols-2 items-center gap-[50px] max-w-7xl mx-auto">
        {subjects.map((s) => (
          <div key={s} className="w-full md:max-w-[550px]">
            <Chart
              selectedMonth={selectedMonth}
              subject={s}
              selectedWeek={selectedWeek}
              selectedYear={selectedYear}
              weekStart={weekStart}
              weekEnd={weekEnd}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
