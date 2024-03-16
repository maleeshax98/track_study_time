"use client";
import React, { useState } from "react";
import { Tabs, Tab, Card, CardBody, CardHeader } from "@nextui-org/react";
import { months, weeks, years } from "@/constants/Arrays";

export default function Header({
  selectedYear,
  selectedMonth,
  selectedWeek,
  setSelectedMonth,
  setSelectedWeek,
  setSelectedYear,
}) {
  
  const handleMonthChange = (month) => {
    setSelectedMonth(month);
  };

  const handleWeekChange = (week) => {
    setSelectedWeek(week);
  };

  const handleYearChange = (year) => {
    setSelectedYear(year);
  };

  return (
    <div>
      <div className="flex w-full flex-col justify-center items-center mt-[20px]">
        <Tabs
          aria-label="Options"
          selectedKey={selectedYear}
          onSelectionChange={handleYearChange}
        >
          {years.map((year) => (
            <Tab key={year} title={year} />
          ))}
        </Tabs>
        <br />
        <Tabs
          aria-label="Options"
          selectedKey={selectedMonth}
          onSelectionChange={handleMonthChange}
        >
          {months.map((month) => (
            <Tab key={month} title={month} />
          ))}
        </Tabs>
        <br />
        <Tabs
          aria-label="Options"
          selectedKey={selectedWeek}
          onSelectionChange={handleWeekChange}
        >
          {weeks.map((week) => (
            <Tab key={week} title={week} />
          ))}
        </Tabs>
      </div>
    </div>
  );
}
