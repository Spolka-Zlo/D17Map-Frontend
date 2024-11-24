"use client";

import { Reservation } from "@/schemas/reservationSchemas";
import { deleteReservation } from "../../../shared-endpoints/deleteReservation";
import { useState } from "react";
import { ConfirmationModal } from "@/components/ConfirmationModal";

export function UserReservationItem({
  reservation,
  editReservation,
}: {
  reservation: Reservation;
  editReservation: () => void;
}) {
  const [isConfirmationModalOpen, openCloseConfirmationModal] = useState(false);

  return (
    <div className="relative flex w-full flex-col items-center justify-between gap-3 rounded-md border-2 border-black p-2 text-center text-primary">
      <div>
        <div>{reservation.title}</div>
        <div className="absolute right-2 top-2 z-10 flex justify-between gap-1">
          <button
            className="text-md h-6 w-6 cursor-pointer rounded-md p-0 text-accent"
            onClick={editReservation}
            aria-label="Edit reservation"
          >
            &#x1F589;
          </button>
          <button
            className="text-md h-6 w-6 cursor-pointer rounded-md p-0 text-red-500"
            aria-label="Cancel reservation"
            onClick={() => openCloseConfirmationModal(true)}
          >
            &#x1F5D1;
          </button>
        </div>
      </div>
      <div className="flex items-center justify-between gap-5">
        <div className="text-center">
          {new Intl.DateTimeFormat("pl", {
            hour: "numeric",
            minute: "numeric",
          }).format(reservation.startTime)}
          -
          {new Intl.DateTimeFormat("pl", {
            hour: "numeric",
            minute: "numeric",
          }).format(reservation.endTime)}
        </div>
        <span className="h-1 w-1 rounded-full bg-primary/50" />{" "}
        <div>{reservation.classroom.name}</div>
        <span className="h-1 w-1 rounded-full bg-primary/50" />{" "}
        <div>{reservation.date}</div>
      </div>
      <div>{reservation.description}</div>
      <ConfirmationModal
        isOpen={isConfirmationModalOpen}
        onClose={() => {
          openCloseConfirmationModal(false);
        }}
        onConfirm={async () => {
          await deleteReservation(reservation.id);
          openCloseConfirmationModal(false);
        }}
        message="Czy na pewno chcesz odwołać rezerwację?"
        title="Odwołanie rezerwacji"
      />
    </div>
  );
}
