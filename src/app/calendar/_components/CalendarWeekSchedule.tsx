import { Reservation } from "../page";
import { CalendarTimeTable } from "./CalendarTimeTable";

export function CalendarWeekSchedule({
  weekReservations,
  mondayDate,
}: {
  weekReservations: Reservation[];
  mondayDate: number;
}) {
  return (
    <div className="w-full">
      <CalendarTimeTable
        reservations={weekReservations}
        mondayDate={mondayDate}
      />
    </div>
  );
}
