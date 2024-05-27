"use client";
import { Calendar } from "@/components/Calendar";
import { useState } from "react";
import { CalendarTimeManager } from "./CalendarTimeManager";
import { CalendarDaySection } from "./CalendarDaySection";
import { Reservation } from "@/app/calendar/page";

type CalendarSectionProps = {
  reservations: Reservation[];
  availableRooms: string[];
};

export function CalendarSection({
  reservations,
  availableRooms,
}: CalendarSectionProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState("room");

  return (
    <section className="flex w-full justify-between gap-10">
      <div className="grid grid-cols-2 maxSM:grid-cols-1 maxSM:grid-rows-2 rounded-lg w-full h-fit grow-0">
        <Calendar
          mode="single"
          selected={selectedDate}
          onDayClick={(day) => {
            setIsOpen(selectedDate.getDay() === day.getDay() ? !isOpen : true);
            setSelectedDate(day);
          }}
          disabled={{ before: new Date() }}
          className="z-10 rounded-lg"
        />

        <CalendarTimeManager
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          selectedRoom={selectedRoom}
          setSelectedRoom={setSelectedRoom}
          availableRooms={availableRooms}
        />
      </div>

      <CalendarDaySection
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        reservations={reservations.filter(
          (reservation) =>
            reservation.date.toDateString === selectedDate.toDateString
        )}
        room={selectedRoom}
      />
    </section>
  );
}
