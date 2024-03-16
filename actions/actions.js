"use server";
import prisma from "@/func/db";
import { calculateHours, calculateHoursSum } from "@/func/functions";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  format,
} from "date-fns";

export async function getWeekData(startDate, endDate, subject) {
  if (!startDate || !endDate) {
    return;
  }

  try {
    const data = await prisma.workingHours.findMany({
      where: {
        AND: [
          { createdAt: { gte: startDate } },
          { createdAt: { lt: endDate } },
          { subject: subject },
        ],
      },
    });

    const result = calculateHoursSum(data);

    return result;
  } catch (err) {
    console.log(err);
  }
}

export async function addData(subject, finalTimeRange) {
  try {
    if (!finalTimeRange) {
      return { error: "Please enter study hours" };
    }

    const hours = calculateHours(finalTimeRange);
    // console.log(hours);

    const data = await prisma.workingHours.create({
      data: {
        hours,
        subject,
      },
    });

    if (!data) {
      return { error: "Something went wrong!" };
    }

    return { success: true };
  } catch (err) {
    console.log(err);
  }
}

export async function getWorkingHoursByMonth(monthName, year, subject) {
  try {
    // Parse month name into a Date object
    const monthDate = new Date(monthName + " 1, " + year);

    // Calculate start and end of the month
    const monthStart = startOfMonth(monthDate);
    const monthEnd = endOfMonth(monthDate);

    // Initialize array to store week data
    const weeks = [];

    // Loop through each week in the month
    let currentWeekStart = startOfWeek(monthStart);
    while (currentWeekStart <= monthEnd) {
      const currentWeekEnd = endOfWeek(currentWeekStart);

      // Query working hours data for the current week
      const workingHours = await prisma.workingHours.findMany({
        where: {
          createdAt: {
            gte: currentWeekStart,
            lte: currentWeekEnd,
          },
          subject: subject,
        },
      });

      // Calculate total working hours for the week
      const totalHours = workingHours.reduce(
        (acc, curr) => acc + curr.hours,
        0
      );

      // Format current week start and end dates
      const formattedWeekStart = format(currentWeekStart, "yyyy-MM-dd");
      const formattedWeekEnd = format(currentWeekEnd, "yyyy-MM-dd");

      // Add week data to weeks array
      weeks.push({
        startDate: formattedWeekStart,
        endDate: formattedWeekEnd,
        totalHours: totalHours,
        // workingHours: workingHours,
      });

      // Move to next week
      currentWeekStart = startOfWeek(
        new Date(currentWeekEnd.setDate(currentWeekEnd.getDate() + 1))
      );
    }

    // Return weeks data as array
    // console.log(weeks);
    return weeks;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export async function getOverallHours(month, year) {
  // Parse month name into a Date object
  const monthDate = new Date(month + " 1, " + year);

  // Calculate start and end of the month
  const startDate = startOfMonth(monthDate);
  const endDate = endOfMonth(monthDate);

  const workingHours = await prisma.workingHours.findMany({
    where: {
      createdAt: {
        gte: startDate,
        lt: endDate,
      },
    },
    select: {
      subject: true,
      createdAt: true,
      hours: true,
    },
  });

  // Grouping the results by subject and date portion of createdAt
  const groupedHours = workingHours.reduce((acc, curr) => {
    const dateKey = curr.createdAt.toISOString().split("T")[0]; // Extracting date portion
    const key = `${curr.subject}_${dateKey}`;
    if (!acc[key]) {
      acc[key] = {
        subject: curr.subject,
        createdAt: dateKey, // Storing only date portion
        hours: curr.hours,
      };
    } else {
      acc[key].hours += curr.hours;
    }
    return acc;
  }, {});

  // Converting the grouped hours object into an array
  const result = Object.values(groupedHours);

  console.log(result);
  return result;
}
