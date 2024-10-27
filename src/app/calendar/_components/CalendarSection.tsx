"use client";
import { Calendar } from "@/components/Calendar";
import { useState } from "react";
import { CalendarTimeManager } from "./CalendarTimeManager";
import { CalendarDaySection } from "./CalendarDaySection";
import { Reservation } from "@/app/calendar2/page";
import { CalendarFilterByRooms } from "./CalendarFilterByRooms";
import { CalendarWeekSchedule } from "./CalendarWeekSchedule";

type CalendarSectionProps = {
  reservations: Reservation[];
  availableRooms: string[];
  equipment: string[];
};

export function CalendarSection({
  reservations,
  availableRooms,
  equipment,
}: CalendarSectionProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="flex w-full justify-between gap-10">
      <CalendarWeekSchedule weekReservations={reservations} />
    </section>
  );
}
