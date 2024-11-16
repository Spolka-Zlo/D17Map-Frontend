import { Reservation } from "@/app/calendar/page";
import React from "react";
import { TimeTableHoursColumn } from "./TimeTableHoursColumn";
import { TimeTableMainPart } from "./TimeTableMainPart";

type CalendarTimeTableProps = {
  reservations: Reservation[];
  typeFilters: string[];
  selectedRoom: string;
};

export function CalendarTimeTable({
  reservations,
  typeFilters,
  selectedRoom,
}: CalendarTimeTableProps) {
  return (
    <div className="relative">
      <div className="grid w-full grid-cols-8 grid-rows-1">
        <TimeTableHoursColumn />
        <TimeTableMainPart
          reservations={reservations}
          typeFilters={typeFilters}
          selectedRoom={selectedRoom}
        />
      </div>
    </div>
  );
}
