"use client";

import { ListElement } from "@/components/ListElement";
import { Reservation } from "../page";
import Link from "next/link";

type ReservationsListProps = {
  reservations: Reservation[];
};

export default function ReservationsList({
  reservations,
}: ReservationsListProps) {
  return (
    <ul className="flex flex-col gap-5 pt-12">
      {reservations.map((reservation) => (
        <Link key={reservation.id} href={`/reservations/${reservation.id}`}>
          <ListElement
            key={reservation.id}
            text={`${reservation.name} - ${reservation.date} ${reservation.startTime}-${reservation.endTime}`}
            textClassName="text-secondary"
          />
        </Link>
      ))}
    </ul>
  );
}
