import { Reservation } from "@/app/calendar/page";
import React from "react";
import { twMerge } from "tailwind-merge";

type CalendarTimeTableProps = {
  reservations: Reservation[];
  mondayDate: number;
};

export function CalendarTimeTable({
  reservations,
  mondayDate,
}: CalendarTimeTableProps) {
  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  function fillTimeTableForRoom(reservations: Reservation[]) {
    const timeTable = Array.from({ length: 60 }, (_, i) => ({
      time: i + 7 + ":00",
      colors: "",
    }));
    return timeTable;
  }

  return (
    <div className="relative">
      <div className="grid-col-9 grid w-full grid-rows-1">
        <div className="border-r-4 border-black p-2">
          <div className="border-b-4 border-black pb-3 text-center">Time</div>
          <div className="pt-2">
            {Array.from({ length: 15 }, (_, i) => (
              <React.Fragment key={i}>
                <div className="h-2.5 border-t-2 border-black">{i + 7}:00</div>
                <div className="h-2.5"></div>
                <div className="h-2.5"></div>
                <div className="h-2.5"></div>
              </React.Fragment>
            ))}
          </div>
        </div>
        {weekDays.map((day, i) => (
          <div
            key={day}
            className="p-2"
            style={{
              gridColumn: i + 2,
              gridRow: 1,
            }}
          >
            <div className="border-b-4 border-black pb-3 text-center">
              {day}
            </div>
            <div className="pt-2">
              {fillTimeTableForRoom(reservations).map((reservation, i) => (
                <div
                  id={reservation.time}
                  key={reservation.time}
                  className={twMerge(
                    "h-2.5 w-full cursor-pointer border-t-2 border-dotted border-primary text-center",
                    i % 4 === 0 && "border-solid",
                    reservation.colors,
                  )}
                ></div>
              ))}
            </div>
          </div>
        ))}
        {/* </div> */}
      </div>
    </div>
  );
}
