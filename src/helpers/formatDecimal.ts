export const formatDecimal = (value: number) => {
  return value < 10 ? `0${value}` : `${value}`;
};
