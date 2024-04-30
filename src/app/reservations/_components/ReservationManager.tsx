"use client";
import { Dispatch, SetStateAction, use } from "react";
import { Reservation } from "../page";
import { Dropdown } from "@/components/Dropdown";

type ReservationManagerProps = {
  reservation: Reservation;
  setReservation: Dispatch<SetStateAction<Reservation | null>>;
};
export default function ReservationManager({
  reservation,
  setReservation,
}: ReservationManagerProps) {
  return (
    <div
      onClick={(e) => {
        setReservation(null);
      }}
      className="fixed inset-0 flex items-center justify-center bg-primary/50 text-center"
    >
      <div
        className="bg-white p-4 rounded-md w-[20vw] h-fit flex flex-col gap-4"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <h2>{reservation.name}</h2>
        <div>
          <h3>Sala: {reservation.room}</h3>
        </div>
        <p>This is the content of the popup.</p>
        <button onClick={() => setReservation(null)}>Close</button>
      </div>
    </div>
  );
}
