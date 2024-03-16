import { startOfWeek, endOfWeek, addWeeks, format } from "date-fns";

export function getWeekStartAndEndDates(month, year, weekNumber) {
  const firstDayOfMonth = new Date(year, month, 1);
  const startOfWeekDate = startOfWeek(
    addWeeks(firstDayOfMonth, weekNumber - 1)
  );
  const endOfWeekDate = endOfWeek(startOfWeekDate);
  return { start: startOfWeekDate, end: endOfWeekDate };
}
