export const getDateConverter = (date: Date) => {
  return date.toISOString().split("T")[0];
};
