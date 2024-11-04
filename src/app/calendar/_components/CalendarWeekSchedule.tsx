import { Reservation } from "../page";
import { CalendarTimeTable } from "./CalendarTimeTable";

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
