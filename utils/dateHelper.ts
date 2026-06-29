//This calculates which week (1-4) an order falls into
export const getWeekNumber = (startDate: string) => {
  const start = new Date(startDate);
  const now = new Date();
  const diffTime = start.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return Math.max(1, Math.min(4, Math.ceil(diffDays / 7)));
};