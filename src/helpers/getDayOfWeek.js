export const getDayOfWeek = (timestamp) => {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const date = new Date(timestamp * 1000);
  return `${daysOfWeek[date.getDay()]} ${date.getDate()}`;
};
