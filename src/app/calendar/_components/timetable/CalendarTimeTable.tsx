import React from "react";
import { TimeTableHoursColumn } from "./TimeTableHoursColumn";
import { TimeTableMainPart } from "./TimeTableMainPart";
import { Reservation } from "@/schemas/reservationSchemas";

type CalendarTimeTableProps = {
  reservations: Reservation[];
  typeFilters: string[];
  selectedRoom: string;
  events: Reservation[];
  role: string | null;
};

export function CalendarTimeTable({
  reservations,
  typeFilters,
  selectedRoom,
  events,
  role,
}: CalendarTimeTableProps) {
  return (
    <div className="relative">
      <div className="grid w-full grid-cols-8 grid-rows-1">
        <TimeTableHoursColumn />
        <TimeTableMainPart
          reservations={role ? reservations : events}
          typeFilters={typeFilters}
          selectedRoom={selectedRoom}
          role={role}
        />
      </div>
    </div>
  );
}
