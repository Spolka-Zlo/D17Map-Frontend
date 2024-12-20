import { Reservation } from "@/schemas/reservationSchemas";
import { CalendarTimeTable } from "./timetable/CalendarTimeTable";

export function CalendarWeekSchedule({
  weekReservations,
  typeFilters,
  selectedRoom,
  events,
  role,
}: {
  weekReservations: Reservation[];
  typeFilters: string[];
  selectedRoom: string;
  events: Reservation[];
  role: string | null;
}) {
  return (
    <div className="w-full">
      <CalendarTimeTable
        reservations={weekReservations}
        typeFilters={typeFilters}
        selectedRoom={selectedRoom}
        events={events}
        role={role}
      />
    </div>
  );
}
