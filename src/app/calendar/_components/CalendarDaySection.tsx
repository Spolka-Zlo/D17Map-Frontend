import { Dispatch, SetStateAction } from "react";
import { CalendarTimeTable } from "./CalendarTimeTable";
import { Reservation } from "@/app/calendar/page";

type CalendarDaySectionProps = {
  isOpen?: boolean;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
  reservations: Reservation[];
  room: string;
};

//isOpen and setIsOpen prepared for future use
export function CalendarDaySection({
  isOpen = true,
  setIsOpen,
  reservations,
  room,
}: CalendarDaySectionProps) {
  return (
    <div className="bg-white w-full grow pl-10">
      <CalendarTimeTable reservations={reservations} room={room} />
    </div>
  );
}
