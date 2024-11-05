"use client";
import { twMerge } from "tailwind-merge";
import { ReservationWithTimestamp } from "./TimeTableMainPart";
import { Reservation } from "../../page";
import { useEffect, useState } from "react";

type TimeTableDayContentProps = {
  reservationTimeStamps: ReservationWithTimestamp[];
  day: string;
  typeFilters: string[];
  selectedRoom: string;
};

export function TimeTableDayContent({
  reservationTimeStamps,
  day,
  typeFilters,
  selectedRoom,
}: TimeTableDayContentProps) {
  const roomFilters = ["2.41"];

  const filteredReservations = filterReservationsWithProperTypeAndRoom(
    reservationTimeStamps,
    typeFilters,
    selectedRoom,
  );

  function filterReservationsWithProperTypeAndRoom(
    reservationTimeStamps: ReservationWithTimestamp[],
    typeFilters: string[],
    roomFilter: string,
  ) {
    return reservationTimeStamps.map(
      (reservation: ReservationWithTimestamp) => {
        if (!reservation.reservation) {
          return {
            reservation: null,
            timestamp: reservation.timestamp,
          };
        }
        return roomFilter === reservation.reservation?.classroom.name &&
          typeFilters.includes(reservation.reservation?.type)
          ? {
              reservation: reservation.reservation,
              timestamp: reservation.timestamp,
            }
          : {
              reservation: null,
              timestamp: reservation.timestamp,
            };
      },
    );
  }
  return (
    <div className="pt-2">
      {filteredReservations.map((reservation, j) => (
        <div
          key={j + day}
          className={twMerge(
            "h-2.5 cursor-pointer border-dotted border-primary text-center text-accent",
            j % 4 === 0 && "border-solid",
            reservation?.reservation
              ? "border-l-2 border-r-2 border-solid border-accent bg-primary"
              : "border-t-2",
            reservation?.reservation &&
              reservation?.reservation.startTime === reservation.timestamp &&
              "border-t-2 border-solid border-accent",
            reservation?.reservation &&
              reservation?.reservation.endTime === reservation.timestamp &&
              "border-b-2 border-solid border-accent",
          )}
        >
          {reservation?.reservation &&
          reservation?.reservation.startTime === reservation.timestamp
            ? reservation?.reservation.title
            : ""}
        </div>
      ))}
    </div>
  );
}
