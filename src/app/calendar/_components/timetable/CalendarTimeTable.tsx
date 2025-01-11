import React, { Dispatch, SetStateAction } from "react";
import { TimeTableHoursColumn } from "./TimeTableHoursColumn";
import { TimeTableMainPart } from "./TimeTableMainPart";
import { Reservation } from "@/schemas/reservationSchemas";

type CalendarTimeTableProps = {
  reservations: Reservation[];
  typeFilters: string[];
  selectedRoom: string;
  events: Reservation[];
  role: string | null;
  openCloseReservationModal: Dispatch<SetStateAction<boolean>>;
  setReservationStartTime: Dispatch<SetStateAction<number | null | undefined>>;
  setReservationEndTime: Dispatch<SetStateAction<number | null | undefined>>;
  reservationStartTime?: number | null;
  reservationEndTime?: number | null;
};

export function CalendarTimeTable({
  reservations,
  typeFilters,
  selectedRoom,
  events,
  role,
  openCloseReservationModal,
  setReservationStartTime,
  setReservationEndTime,
  reservationStartTime,
  reservationEndTime,
}: CalendarTimeTableProps) {
  return (
    <div className="relative">
      <div className="grid w-full grid-rows-1 xs:grid-cols-8 maxXS:grid-cols-7">
        <TimeTableHoursColumn />
        <TimeTableMainPart
          reservations={role ? reservations : events}
          typeFilters={typeFilters}
          selectedRoom={selectedRoom}
          role={role}
          openCloseReservationModal={openCloseReservationModal}
          setReservationStartTime={setReservationStartTime}
          setReservationEndTime={setReservationEndTime}
          reservationStartTime={reservationStartTime}
          reservationEndTime={reservationEndTime}
        />
      </div>
    </div>
  );
}
