export const daysInMonth = (month, year) => {
  let d = new Date();
  return new Date(d.getFullYear(), month + 1, 0).getDate();
};
