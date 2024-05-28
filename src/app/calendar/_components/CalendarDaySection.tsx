"use client";
import { Dispatch, SetStateAction, useState } from "react";
import { CalendarTimeTable } from "./CalendarTimeTable";
import { Reservation } from "@/app/calendar/page";
import { CalendarFilterByRooms } from "./CalendarFilterByRooms";
import { CalendarFilterByTimeRnage } from "./CalendarFilterByTimeRnage";

type CalendarDaySectionProps = {
  isOpen?: boolean;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
  reservations: Reservation[];
  availableRooms: string[];
  equipment: string[];
};

//isOpen and setIsOpen prepared for future use
export function CalendarDaySection({
  isOpen = true,
  setIsOpen,
  reservations,
  availableRooms,
  equipment,
}: CalendarDaySectionProps) {
  const [selectedRooms, setSelectedRooms] = useState<string[]>([]);
  return (
    <div className="flex gap-4 w-full grow">
      <div className="flex flex-col gap-4">
        <div className="w-full h-fit bg-white/25 max-w-[450px] rounded-lg p-2">
          <CalendarFilterByRooms
            availableRooms={availableRooms}
            selectedRooms={selectedRooms}
            setSelectedRooms={setSelectedRooms}
          />
        </div>
        <div className="w-full h-fit bg-white/25 max-w-[450px] rounded-lg p-2">
          <CalendarFilterByTimeRnage
            reservations={reservations}
            equipment={equipment}
          />
        </div>
      </div>
      <div className="w-full bg-white/25 max-w-[450px] rounded-lg p-2">
        <CalendarTimeTable reservations={reservations} rooms={availableRooms} />
      </div>
    </div>
  );
}
