"use client";
import { Dispatch, SetStateAction, useState } from "react";
import { CalendarTimeTable } from "./CalendarTimeTable";
import { Reservation } from "@/app/calendar2/page";
import { CalendarReservationForm } from "./CalendarReservationForm";

type CalendarDaySectionProps = {
  isOpen?: boolean;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
  reservations: Reservation[];
  availableRooms: string[];
  equipment: string[];
};

export function CalendarDaySection({
  isOpen = true,
  setIsOpen,
  reservations,
  availableRooms,
  equipment,
}: CalendarDaySectionProps) {
  const [formOpen, setFormOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<string>("");
  const colors = ["bg-secondary", "bg-primary", "bg-mapGrey"] as const;
  // const roomsToColors = selectedRooms.reduce(
  //   (acc, room, i) => ({ ...acc, [room]: colors[i] }),
  //   {} as Record<string, (typeof colors)[number]>
  // );
  return (
    <div className="flex gap-4 w-full grow">
      <div className="flex flex-col gap-4"></div>
      <div className="w-full h-fit bg-white/25 max-w-[450px] rounded-lg p-2"></div>
      <div className="w-full bg-white/25 max-w-[450px] rounded-lg p-2">
        <CalendarTimeTable
          reservations={reservations}
          rooms={[]}
          roomsToColors={{}}
          startTime={""}
          endTime={""}
        />
      </div>
      {formOpen && (
        <CalendarReservationForm
          room={selectedRoom}
          setRoom={setSelectedRoom}
          availableRooms={availableRooms}
          date={new Date()}
          open={formOpen}
          setOpen={setFormOpen}
          startTime={startTime}
          setStartTime={setStartTime}
          endTime={endTime}
          setEndTime={setEndTime}
        />
      )}
    </div>
  );
}
