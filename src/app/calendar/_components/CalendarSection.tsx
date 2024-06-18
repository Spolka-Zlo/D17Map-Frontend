"use client";
import { Calendar } from "@/components/Calendar";
import { useEffect, useState } from "react";
import { CalendarDaySection } from "./CalendarDaySection";
import {
  ClassRoom,
  Reservation,
  ReservationWithoutEquipment,
  reservationsSchema,
} from "@/app/calendar/page";
import { useFetch } from "@/hooks/useFetch";

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
    `http://localhost:8080/reservations?day=${
      selectedDate.toISOString().split("T")[0]
    }`,
    reservationsSchema
  );
  // useEffect(() => {
  //   if (!reservations || !availableRooms) {
  //     return;
  //   }
  //   mergeReservationsWithEquipment(reservations, availableRooms);
  // }, [reservations, availableRooms]);

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
