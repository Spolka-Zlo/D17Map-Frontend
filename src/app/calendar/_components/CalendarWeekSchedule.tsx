import { Reservation } from "../page";
import { CalendarTimeTable } from "./CalendarTimeTable";

export function CalendarWeekSchedule({
  weekReservations,
}: {
  weekReservations: Reservation[];
}) {
  return (
    <div className="w-full bg-white/25 max-w-[1000px] rounded-lg p-2">
      <CalendarTimeTable
        reservations={weekReservations}
        rooms={[]}
        roomsToColors={{}}
        startTime={""}
        endTime={""}
      />
    </div>
  );
}
