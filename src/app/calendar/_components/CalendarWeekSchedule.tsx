import { Reservation } from "@/schemas/reservationSchemas";
import { CalendarTimeTable } from "./timetable/CalendarTimeTable";
import { Dispatch, SetStateAction } from "react";

export type CalendarWeekScheduleProps = {
  weekReservations: Reservation[];
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

export function CalendarWeekSchedule({
  weekReservations,
  typeFilters,
  selectedRoom,
  events,
  role,
  openCloseReservationModal,
  setReservationStartTime,
  setReservationEndTime,
  reservationStartTime,
  reservationEndTime,
}: CalendarWeekScheduleProps) {
  return (
    <div className="w-full">
      <CalendarTimeTable
        reservations={weekReservations}
        typeFilters={typeFilters}
        selectedRoom={selectedRoom}
        events={events}
        role={role}
        openCloseReservationModal={openCloseReservationModal}
        reservationStartTime={reservationStartTime}
        reservationEndTime={reservationEndTime}
        setReservationStartTime={setReservationStartTime}
        setReservationEndTime={setReservationEndTime}
      />
    </div>
  );
}
