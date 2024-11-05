import { Reservation } from "@/app/calendar/page";
import React from "react";
import { TimeTableHoursColumn } from "./TimeTableHoursColumn";
import { TimeTableMainPart } from "./TimeTableMainPart";

type CalendarTimeTableProps = {
  reservations: Reservation[];
};

export function CalendarTimeTable({ reservations }: CalendarTimeTableProps) {
  return (
    <div className="relative">
      <div className="grid w-full grid-cols-8 grid-rows-1">
        <TimeTableHoursColumn />
        <TimeTableMainPart reservations={reservations} />
      </div>
    </div>
  );
}
