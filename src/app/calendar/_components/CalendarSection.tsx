"use client";
import { Calendar } from "@/components/Calendar";
import { useState } from "react";
import { CalendarTimeManager } from "./CalendarTimeManager";
import { CalendarDaySection } from "./CalendarDaySection";
import { Reservation } from "@/app/calendar/page";
import { CalendarFilterByRooms } from "./CalendarFilterByRooms";

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
  const [selectedRooms, setSelectedRooms] = useState<string[]>([]);

  return (
    <section className="flex w-full justify-between gap-10">
      <div className="rounded-lg w-fit h-fit grow-0">
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

        {/* <CalendarTimeManager
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          selectedRoom={selectedRoom}
          setSelectedRoom={setSelectedRoom}
          availableRooms={availableRooms}
        /> */}
      </div>
      <CalendarFilterByRooms
        availableRooms={availableRooms}
        selectedRooms={selectedRooms}
        setSelectedRooms={setSelectedRooms}
      />

      <CalendarDaySection
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        reservations={reservations.filter(
          (reservation) => reservation.date.getDay() === selectedDate.getDay()
        )}
        room={selectedRooms[0]}
      />
    </section>
  );
}
