"use client";
import { Calendar } from "@/components/Calendar";
import { use, useEffect, useState } from "react";
import { CalendarTimeManager } from "./CalendarTimeManager";
import { CalendarDaySection } from "./CalendarDaySection";
import {
  ClassRoom,
  Reservation,
  ReservationWithoutEquipment,
  reservationsSchema,
} from "@/app/calendar/page";
import { CalendarFilterByRooms } from "./CalendarFilterByRooms";
import { ZodSchema } from "zod";
import { z } from "zod";

type CalendarSectionProps = {
  availableRooms: ClassRoom[];
  equipment: string[];
};

export function CalendarSection({
  availableRooms,
  equipment,
}: CalendarSectionProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isOpen, setIsOpen] = useState(false);

  const {
    data: reservations,
    error,
    loading,
  } = useFetch(
    `http://localhost:8080/reservations?day=2024-06-18`,
    reservationsSchema
  );
  useEffect(() => {
    if (!reservations || !availableRooms) {
      return;
    }
    mergeReservationsWithEquipment(reservations, availableRooms);
  }, [reservations, availableRooms]);

  function mergeReservationsWithEquipment(
    reservations: ReservationWithoutEquipment[],
    rooms: ClassRoom[]
  ): Reservation[] {
    return reservations.map((reservation) => {
      const room = rooms.find(
        (room) => room.name === reservation.classroom.name
      );
      if (!room) {
        return { ...reservation, roomE: { equipment: [], capacity: 0 } };
      }
      return {
        ...reservation,
        roomE: {
          equipment: room.equipment,
          capacity: room.capacity,
        },
      };
    });
  }

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
        reservations={
          reservations
            ? mergeReservationsWithEquipment(reservations, availableRooms)
            : []
        }
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
        setData(json);
        setLoading(false);
      } catch (error) {
        setError(JSON.stringify(error));
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);
  return { data, error, loading };
}
