export const displayCount = (count: number) => {
  const strCount = count.toString();
  if (strCount.length > 3) {
    return "999";
  }

  return strCount.padStart(3, "0");
};
