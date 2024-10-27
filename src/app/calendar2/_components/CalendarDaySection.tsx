"use client";
import { Dispatch, SetStateAction, useState } from "react";
import { CalendarTimeTable } from "./CalendarTimeTable";
import { Reservation } from "@/app/calendar2/page";
import { CalendarFilterByRooms } from "./CalendarFilterByRooms";
import { CalendarFilterByTimeRange } from "./CalendarFilterByTimeRange";
import { CalendarReservationForm } from "./CalendarReservationForm";

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
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<string>("");
  const colors = ["bg-secondary", "bg-primary", "bg-mapGrey"] as const;
  const roomsToColors = selectedRooms.reduce(
    (acc, room, i) => ({ ...acc, [room]: colors[i] }),
    {} as Record<string, (typeof colors)[number]>
  );
  return (
    <div className="flex gap-4 w-full grow">
      <div className="flex flex-col gap-4">
        <div className="w-full h-fit bg-white/25 max-w-[450px] rounded-lg p-2">
          <CalendarFilterByTimeRange
            reservations={reservations}
            equipment={equipment}
            startTime={startTime}
            setStartTime={setStartTime}
            endTime={endTime}
            setEndTime={setEndTime}
            room={selectedRoom}
            setRoom={setSelectedRoom}
            setFormOpen={setFormOpen}
          />
        </div>
      </div>
      <div className="w-full h-fit bg-white/25 max-w-[450px] rounded-lg p-2">
        <CalendarFilterByRooms
          availableRooms={availableRooms}
          selectedRooms={selectedRooms}
          setSelectedRooms={setSelectedRooms}
        />
        <ul className="flex justify-center gap-4">
          {selectedRooms.map((room) => (
            <li key={room} className="flex justify-center items-center gap-1">
              <div
                className={`h-5 w-5 p-1 rounded-full ${roomsToColors[room]}`}
              ></div>
              <span>{room}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="w-full bg-white/25 max-w-[450px] rounded-lg p-2">
        <CalendarTimeTable
          reservations={reservations}
          rooms={selectedRooms}
          roomsToColors={roomsToColors}
          startTime={startTime}
          endTime={endTime}
          setStartTime={setStartTime}
          setEndTime={setEndTime}
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
