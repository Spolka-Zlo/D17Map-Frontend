import { Reservation } from "@/app/calendar/page";
import React from "react";
import { twMerge } from "tailwind-merge";

type CalendarTimeTableProps = {
  room: string;
  startTime?: string;
  endTime?: string;
  reservations: Reservation[];
};

export function CalendarTimeTable({
  room,
  startTime,
  endTime,
  reservations,
}: CalendarTimeTableProps) {
  if (!room && !startTime && !endTime) {
    return null;
  }

  function fillTimeTableForRoom(reservations: Reservation[], room: string) {
    reservations = reservations.filter(
      (reservation) => reservation.room === room
    );
    const timeTable = Array.from({ length: 15 * 4 }, (_, i) => ({
      time: `${Math.floor(i / 4) + 7}:${i % 4 === 0 ? "00" : (i % 4) * 15}`,
      reservationInTime: reservations.find(
        (reservation) =>
          reservation.startTime <
            `${Math.floor(i / 4) + 7}:${i % 4 === 0 ? "00" : (i % 4) * 15}` &&
          `${Math.floor(i / 4) + 7}:${i % 4 === 0 ? "00" : (i % 4) * 15}` <
            reservation.endTime
      ),
    }));
    return timeTable;
  }

  return (
    <div className="relative">
      <div className="grid grid-col-4 grid-rows-1 w-full">
        <div className="border-r-4 p-2">
          <div className="text-center pb-8 border-b-4">Time</div>
          <div className="pt-4">
            {Array.from({ length: 15 }, (_, i) => (
              <React.Fragment key={i}>
                <div className="h-3 border-t-2">{i + 7}:00</div>
                <div className="h-3"></div>
                <div className="h-3"></div>
                <div className="h-3"></div>
              </React.Fragment>
            ))}
          </div>
        </div>
        <div className="p-2 col-start-2 col-end-5">
          <div className="text-center pb-8 border-b-4">Reservations</div>
          <div className="pt-4">
            {fillTimeTableForRoom(reservations, room).map((reservation, i) => (
              <div
                key={reservation.time}
                className={twMerge(
                  "text-center h-3 border-t-2 border-dotted border-primary",
                  i % 4 === 0 && "border-solid",
                  reservation.reservationInTime && "bg-secondary border-none"
                )}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
