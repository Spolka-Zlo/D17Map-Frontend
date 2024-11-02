"use client";
import { Reservation } from "../page";
import { UserReservationItem } from "./UserReservationItem";

export function CalendarReservationsSection({
  weekUserReservations,
  mondayDate,
}: {
  weekUserReservations: Reservation[];
  mondayDate: number;
}) {
  return (
    <div className="flex w-[25vw] flex-col items-center justify-start px-2">
      <h1 className="text-center text-2xl">Your Upcoming Reservations</h1>
      <div className="flex w-full flex-col justify-center gap-8 px-2">
        {weekUserReservations.map((reservation) => (
          <UserReservationItem
            key={reservation.id}
            reservation={reservation}
            onClick={() => {}}
          />
        ))}
      </div>
    </div>
  );
}
