"use client";
import { Calendar } from "@/components/Calendar";
import { useState } from "react";
import { CalendarTimeManager } from "./CalendarTimeManager";
import { CalendarDaySection } from "./CalendarDaySection";

type ReservationType = "Lecture" | "Consultation" | "Exam";

type Reservation = {
  title: string;
  startTime: string;
  endTime: string;
  date: Date;
};

export function CalendarSection() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const [isOpen, setIsOpen] = useState(false);
  return (
    <section className="flex">
      <div className="grid grid-cols-2 maxSM:grid-cols-1 maxSM:grid-rows-2 rounded-lg">
        <Calendar
          mode="single"
          selected={selectedDate}
          onDayClick={(day) => {
            setIsOpen(
              !selectedDate || selectedDate.getDay === day.getDay
                ? !isOpen
                : true
            );
            setSelectedDate(day);
          }}
          disabled={{ before: new Date() }}
          className="z-10 rounded-lg"
        />

        <CalendarTimeManager isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
      <CalendarDaySection isOpen={isOpen} setIsOpen={setIsOpen} />
    </section>
  );
}
