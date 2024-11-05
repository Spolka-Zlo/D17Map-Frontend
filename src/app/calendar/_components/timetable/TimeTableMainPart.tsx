import React from "react";
import { twMerge } from "tailwind-merge";
import { Reservation } from "../../page";
import { TimeTableDayContent } from "./TimeTableWeekdayColumn";

type TimeTableMainPartProps = {
  reservations: Reservation[];
};

type weekdaysMapType = {
  Mon: Reservation[];
  Tue: Reservation[];
  Wed: Reservation[];
  Thu: Reservation[];
  Fri: Reservation[];
  Sat: Reservation[];
  Sun: Reservation[];
};

export type ReservationWithTimestamp = {
  reservation: Reservation | null;
  timestamp: number;
};

export function TimeTableMainPart({ reservations }: TimeTableMainPartProps) {
  function getWeekDay(date: string) {
    return new Date(date).toLocaleDateString("en-US", { weekday: "short" });
  }

  function weekdaysMap(reservations: Reservation[]) {
    const weekdaysMap: weekdaysMapType = {
      Mon: [],
      Tue: [],
      Wed: [],
      Thu: [],
      Fri: [],
      Sat: [],
      Sun: [],
    };
    reservations.forEach((reservation) => {
      const day = getWeekDay(reservation.date) as keyof weekdaysMapType;
      weekdaysMap[day].push(reservation);
    });
    return weekdaysMap;
  }

  function generateTimestamps(startHour: number, endHour: number, day?: Date) {
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

  function mapReservationsToTimestamps(
    dayReservations: Reservation[],
    day?: Date,
  ) {
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
    return currentEvents;
  }

  const mapWeekdaysToTimestamps = (weekdaysMap: weekdaysMapType) => {
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
          new Date(reservations[0]?.date),
        ) ?? [];
    });

    return timeStampWeekdayMap;
  };

  const timestampsMap = mapWeekdaysToTimestamps(weekdaysMap(reservations));
  return (
    <React.Fragment>
      {Object.entries(timestampsMap).map(([day, reservationTimeStamps], i) => (
        <div
          key={day}
          className="p-2"
          style={{
            gridColumn: i + 2,
            gridRow: 1,
          }}
        >
          <div className="border-b-4 border-black pb-3 text-center">{day}</div>
          <TimeTableDayContent
            reservationTimeStamps={reservationTimeStamps}
            day={day}
          />
        </div>
      ))}
    </React.Fragment>
  );
}
