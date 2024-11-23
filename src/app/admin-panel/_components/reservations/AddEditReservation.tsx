"use client";

import { useContext } from "react";
import { EditContext } from "../AdminPanelListItem";
import { AddEditReservationForm } from "./AddEditReservationForm";
import { Reservation } from "@/schemas/reservationSchemas";

export function AddEditReservation({
  reservations,
}: {
  reservations: Reservation[];
}) {
  const { editedElement } = useContext(EditContext);
  const reservation = reservations.find(
    (reservation) => reservation.id === editedElement,
  );
  return <AddEditReservationForm reservation={reservation} />;
}
