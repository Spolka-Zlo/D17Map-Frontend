import { Reservation } from "@/schemas/reservationSchemas";
import { CalendarTimeTable } from "./timetable/CalendarTimeTable";

export function CalendarWeekSchedule({
  weekReservations,
  typeFilters,
  selectedRoom,
}: {
  weekReservations: Reservation[];
  typeFilters: string[];
  selectedRoom: string;
}) {
  return (
    <div className="w-full">
      <CalendarTimeTable
        reservations={weekReservations}
        typeFilters={typeFilters}
        selectedRoom={selectedRoom}
      />
    </div>
  );
}
