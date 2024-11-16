import { Reservation } from "../../page";
import { weekdaysMapType } from "./TimeTableMainPart";

export type ReservationWithTimestamp = {
  reservation: Reservation | null;
  timestamp: number;
};

export function generateTimestamps(
  startHour: number,
  endHour: number,
  day?: Date,
) {
  if (!day) {
    return [];
  }
  day.setHours(0, 0, 0, 0);
  const startTime = day.getTime() + startHour * 3600 * 1000;
  const timestamps = new Array((endHour - startHour) * 4)
    .fill(0)
    .map((_, i) => startTime + i * 1000 * 60 * 15);
  return timestamps;
}

export function mapReservationsToTimestamps(
  dayReservations: Reservation[],
  day?: Date,
) {
  console.log("day", day);
  const timestamps = generateTimestamps(7, 22, day);
  const currentEvents = timestamps.map((timestamp) => {
    return {
      reservation:
        dayReservations.find((reservation) => {
          return (
            reservation.startTime <= timestamp &&
            reservation.endTime >= timestamp
          );
        }) || null,
      timestamp: timestamp,
    };
  });
  console.log("curr", currentEvents);
  return currentEvents;
}

export const mapWeekdaysToTimestamps = (
  weekdaysMap: weekdaysMapType,
  mondayDate: number,
) => {
  const timeStampWeekdayMap: Record<
    keyof weekdaysMapType,
    ReservationWithTimestamp[]
  > = {
    Mon: [],
    Tue: [],
    Wed: [],
    Thu: [],
    Fri: [],
    Sat: [],
    Sun: [],
  };

  Object.entries(weekdaysMap).forEach(([day, reservations]) => {
    const weekDay = day as keyof weekdaysMapType;
    timeStampWeekdayMap[weekDay] =
      mapReservationsToTimestamps(
        reservations,
        new Date(
          mondayDate +
            24 *
              3600 *
              1000 *
              ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].indexOf(day),
        ),
      ) ?? [];
  });

  return timeStampWeekdayMap;
};
