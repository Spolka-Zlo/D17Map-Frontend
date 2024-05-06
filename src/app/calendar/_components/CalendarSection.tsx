"use client";
import { Calendar } from "@/components/Calendar";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { CalendarTimeManager } from "./CalendarTimeManager";

export function CalendarSection() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const [isOpen, setIsOpen] = useState(false);
  console.log(selectedDate);
  console.log(isOpen);
  return (
    <section className="grid grid-cols-2 maxSM:grid-cols-1 maxSM:grid-rows-2 rounded-lg">
      <Calendar
        mode="single"
        selected={selectedDate}
        onDayClick={(day: Date) => {
          setSelectedDate(day);
          setIsOpen(true);
        }}
        disabled={{ before: new Date() }}
        className="z-10 rounded-lg"
      />
      <CalendarTimeManager isOpen={isOpen} setIsOpen={setIsOpen} />
    </section>
  );
}
