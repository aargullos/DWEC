export const calculateEndDate = (startDate, totalHours) => {
  const endDate = new Date(startDate);
  endDate.setHours(endDate.getHours() + totalHours);
  return endDate;
};

export const calculateTotalHoursByDay = (totalHours) => {
  const hoursPerDay = Math.floor(totalHours / 5);
  const remainderHours = totalHours % 5;
  const hoursByDay = {
    Monday: hoursPerDay,
    Tuesday: hoursPerDay,
    Wednesday: hoursPerDay,
    Thursday: hoursPerDay,
    Friday: hoursPerDay,
  };
  if (remainderHours > 0) {
    const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    for (let i = 0; i < remainderHours; i++) {
      const randomIndex = Math.floor(Math.random() * weekdays.length);
      const day = weekdays[randomIndex];
      hoursByDay[day]++;
    }
  }
  return hoursByDay;
};
