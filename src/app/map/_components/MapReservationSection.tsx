"use client";
import {
  ClassRoom,
  Reservation,
  ReservationWithoutEquipment,
  reservationsSchema,
} from "@/app/calendar/page";
import { Calendar } from "@/components/Calendar";
import { useFetch } from "@/hooks/useFetch";
import { useEffect, useState } from "react";
import { MapSection } from "./MapSection";
type MapReservationSectionProps = {
  rooms: ClassRoom[];
  equipment: string[];
};

export function MapReservationSection({
  rooms,
  equipment,
}: MapReservationSectionProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const { data, error, loading } = useFetch(
    `http://localhost:8080/reservations?day=${
      selectedDate.toISOString().split("T")[0]
    }`,
    reservationsSchema
  );
  console.log(rooms);

  function mergeReservationsWithEquipment(
    reservations: ReservationWithoutEquipment[],
    rooms: ClassRoom[]
  ): Reservation[] {
    if (!reservations || !rooms) {
      return [];
    }
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
    <div className="w-full flex flex-row justify-stretch gap-5">
      <MapSection
        reservations={mergeReservationsWithEquipment(data ?? [], rooms)}
        rooms={rooms}
      />
      <div className="rounded-lg w-fit h-fit grow-0 p-10">
        <Calendar
          mode="single"
          selected={selectedDate}
          onDayClick={(day) => {
            setSelectedDate(day);
          }}
          disabled={{ before: new Date() }}
          className="z-10 rounded-lg"
        />
      </div>
    </div>
  );
}
