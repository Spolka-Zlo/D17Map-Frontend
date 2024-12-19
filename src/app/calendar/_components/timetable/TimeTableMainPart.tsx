import React from "react";
import { TimeTableDayContent } from "./TimeTableWeekdayColumn";
import { mapWeekdaysToTimestamps } from "./timetableUtils";
import { useSearchParams } from "next/navigation";
import { Reservation } from "@/schemas/reservationSchemas";

export type TimeTableMainPartProps = {
  reservations: Reservation[];
  typeFilters: string[];
  selectedRoom: string;
};

export type weekdaysMapType = {
  Mon: Reservation[];
  Tue: Reservation[];
  Wed: Reservation[];
  Thu: Reservation[];
  Fri: Reservation[];
  Sat: Reservation[];
  Sun: Reservation[];
};

export function TimeTableMainPart({
  reservations,
  typeFilters,
  selectedRoom,
}: TimeTableMainPartProps) {
  const searchParams = useSearchParams();
  const mondayDate = Number(searchParams.get("date"));
  function getWeekDay(date: string) {
    return new Date(date).toLocaleDateString("en-UK", { weekday: "short" });
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

  const timestampsMap = mapWeekdaysToTimestamps(
    weekdaysMap(reservations),
    mondayDate,
  );

  return (
    <>
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
            typeFilters={typeFilters}
            selectedRoom={selectedRoom}
          />
        </div>
      ))}
    </>
  );
}
