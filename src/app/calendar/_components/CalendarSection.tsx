"use client";
import { Calendar } from "@/components/Calendar";
import { useEffect, useState } from "react";
import { CalendarTimeManager } from "./CalendarTimeManager";
import { CalendarDaySection } from "./CalendarDaySection";
import { Reservation } from "@/app/calendar/page";
import { CalendarFilterByRooms } from "./CalendarFilterByRooms";
import { ZodSchema } from "zod";
import { z } from "zod";

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
      </div>
      <CalendarDaySection
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        reservations={reservations.filter(
          (reservation) => reservation.date.getDay() === selectedDate.getDay()
        )}
        availableRooms={availableRooms}
        equipment={equipment}
      />
    </section>
  );
}

function useFetch<T>(url: string, schema: ZodSchema<T>) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(url);
        const json = await res.json();
        setData(schema.parse(json));
        setLoading(false);
      } catch (error) {
        setError(JSON.stringify(error));
        setLoading(false);
      }
    };
    fetchData();
  });
  return { data, error, loading };
}
