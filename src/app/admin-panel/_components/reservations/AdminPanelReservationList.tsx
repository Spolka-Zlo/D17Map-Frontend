"use client";

import { useContext } from "react";
import { EditContext } from "../AdminPanelListItem";
import { EditDeleteButtonsSection } from "../EditDeleteButtonsSection";
import { twMerge } from "tailwind-merge";
import { Reservation } from "@/schemas/reservationSchemas";

type AdminPanelReservationListProps = {
  reservations: Reservation[];
};

export function AdminPanelReservationList({
  reservations,
}: AdminPanelReservationListProps) {
  const { editedElement, setEditedElement } = useContext(EditContext);
  return (
    <ul className="flex flex-col items-stretch justify-start gap-2 p-2">
      <span
        className="cursor-pointer rounded-md border-2 border-primary bg-white/0 p-2 text-center"
        onClick={() => setEditedElement(null)}
      >
        Wyczyść
      </span>
      {reservations.map((reservation) => (
        <li
          key={reservation.id}
          className={twMerge(
            "flex items-center justify-between gap-2 rounded-md border-2 border-primary bg-white/0 p-2",
            editedElement === reservation.title && "bg-accent/10",
          )}
        >
          <h3>{reservation.title}</h3>

          <EditDeleteButtonsSection
            onEdit={() => setEditedElement(reservation.title)}
            onDelete={() => {}}
          />
        </li>
      ))}
    </ul>
  );
}
