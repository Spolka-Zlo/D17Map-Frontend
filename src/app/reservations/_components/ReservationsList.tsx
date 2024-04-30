"use client";

import { ListElement } from "@/components/ListElement";
import { Reservation } from "../page";
import { useState } from "react";
import ReservationManager from "./ReservationManager";

type ReservationsListProps = {
  reservations: Reservation[];
};

export default function ReservationsList({
  reservations,
}: ReservationsListProps) {
  const [reservation, setReservation] = useState<Reservation | null>(null);
  return (
    <div>
      <ul className="flex flex-col gap-5 pt-12">
        {reservations.map((reservation) => (
          <ListElement
            key={reservation.id}
            text={`${reservation.name} - ${reservation.date} ${reservation.startTime}-${reservation.endTime}`}
            textClassName="text-secondary"
            onClick={() => setReservation(reservation)}
          />
        ))}
      </ul>
      {reservation && (
        <ReservationManager
          reservation={reservation}
          setReservation={setReservation}
        />
      )}
    </div>
  );
}
