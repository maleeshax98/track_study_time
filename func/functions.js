export function calculateHours(timeRange) {
  // Split the time range into start and end times
  const [startTime, endTime] = timeRange.split("-").map((time) => time.trim());

  // Extract hours and minutes from start and end times
  const [startHour, startMinute] = startTime
    .split(".")
    .map((part) => parseInt(part, 10));
  const [endHour, endMinute] = endTime
    .split(".")
    .map((part) => parseInt(part, 10));

  // Calculate total minutes for start and end times
  const totalStartMinutes = startHour * 60 + startMinute;
  const totalEndMinutes = endHour * 60 + endMinute;

  // Calculate the duration in minutes
  const durationMinutes = totalEndMinutes - totalStartMinutes;

  // Convert minutes to hours
  const durationHours = durationMinutes / 60;

  return durationHours;
}

export function calculateHoursSum(data) {
  const hoursSumByDate = {};

  // Iterate through the data
  data.forEach((entry) => {
    const createdAt = new Date(entry.createdAt).toISOString().split("T")[0]; // Extracting only the date part
    const hours = entry.hours;

    // If the createdAt date already exists in the hoursSumByDate object, add the hours to its sum
    if (hoursSumByDate[createdAt]) {
      hoursSumByDate[createdAt] += hours;
    } else {
      // If the createdAt date doesn't exist, initialize it with the current hours value
      hoursSumByDate[createdAt] = hours;
    }
  });

  // Convert the object into an array of objects
  const result = Object.keys(hoursSumByDate).map((createdAt) => ({
    createdAt: createdAt,
    hoursSum: hoursSumByDate[createdAt],
  }));

  return result;
}
