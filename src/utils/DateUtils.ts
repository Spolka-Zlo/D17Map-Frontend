export function getWeekDay(date: string) {
  return new Date(date).toLocaleDateString("en-US", { weekday: "short" });
}
export const toTimestamp = (date: string) => new Date(date).getTime();
