import { Reservation } from "../page";
import { CalendarTimeTable } from "./timetable/CalendarTimeTable";

export function CalendarWeekSchedule({
  weekReservations,
}: {
  weekReservations: Reservation[];
}) {
  return (
    <div className="w-full">
      <CalendarTimeTable reservations={weekReservations} />
    </div>
  );
}
