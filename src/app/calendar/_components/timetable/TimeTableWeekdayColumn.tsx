"use client";
import { twMerge } from "tailwind-merge";
import { ReservationWithTimestamp } from "./timetableUtils";
import { reverseReservationTypes } from "@/schemas/reservationSchemas";
import { Dispatch, SetStateAction, useState } from "react";

type TimeTableDayContentProps = {
  reservationTimeStamps: ReservationWithTimestamp[];
  typeFilters: string[];
  selectedRoom: string;
  role: string | null;
  openCloseReservationModal: Dispatch<SetStateAction<boolean>>;
  setReservationStartTime: Dispatch<SetStateAction<number | null | undefined>>;
  setReservationEndTime: Dispatch<SetStateAction<number | null | undefined>>;
  reservationStartTime?: number | null;
  reservationEndTime?: number | null;
};

export function TimeTableDayContent({
  reservationTimeStamps,
  typeFilters,
  selectedRoom,
  role,
  openCloseReservationModal,
  setReservationStartTime,
  setReservationEndTime,
  reservationStartTime,
  reservationEndTime,
}: TimeTableDayContentProps) {
  const [isDragging, setIsDragging] = useState(false);

  // Filter reservations if necessary
  const filteredReservations = role
    ? filterReservationsWithProperTypeAndRoom(
        reservationTimeStamps,
        typeFilters,
        selectedRoom,
      )
    : reservationTimeStamps;

  function filterReservationsWithProperTypeAndRoom(
    reservationTimeStamps: ReservationWithTimestamp[],
    typeFilters: string[],
    roomFilter: string,
  ) {
    return reservationTimeStamps.map((reservation) => {
      if (!reservation.reservation) {
        return {
          reservation: null,
          timestamp: reservation.timestamp,
        };
      }
      return {
        reservation:
          roomFilter === reservation.reservation?.classroom.name &&
          typeFilters.includes(
            reverseReservationTypes[reservation.reservation?.type],
          )
            ? reservation.reservation
            : null,
        timestamp: reservation.timestamp,
      };
    });
  }

  function handleMouseDown(timestamp: number) {
    // Clear previous range each time user starts a new drag
    setReservationStartTime(null);
    setReservationEndTime(null);

    setIsDragging(true);
    setReservationStartTime(timestamp);
    setReservationEndTime(timestamp);
  }

  function handleMouseEnter(timestamp: number) {
    if (isDragging) {
      setReservationEndTime(timestamp);
    }
  }

  function handleMouseUp(timestamp: number) {
    setIsDragging(false);
    setReservationEndTime(timestamp);
    openCloseReservationModal(true);
  }

  function isInSelectedRange(timestamp: number) {
    if (!reservationStartTime || !reservationEndTime) return false;
    const min = Math.min(reservationStartTime, reservationEndTime);
    const max = Math.max(reservationStartTime, reservationEndTime);
    return timestamp >= min && timestamp <= max;
  }

  return (
    <div className="pt-2" onMouseLeave={() => setIsDragging(false)}>
      {filteredReservations.map((reservation, j) => (
        <div
          key={reservation.timestamp}
          onMouseDown={() => handleMouseDown(reservation.timestamp)}
          onMouseEnter={() => handleMouseEnter(reservation.timestamp)}
          onMouseUp={() => handleMouseUp(reservation.timestamp)}
          className={twMerge(
            "h-2.5 cursor-pointer border-dotted border-primary text-center text-accent",
            j % 4 === 0 && "border-solid",
            reservation.reservation
              ? "border-l-2 border-r-2 border-solid border-accent bg-primary"
              : "border-t-2",
            // Mark the range with grey if in selected range
            isInSelectedRange(reservation.timestamp) &&
              reservationStartTime &&
              reservationEndTime &&
              "bg-primary/50",
          )}
        >
          {reservation.reservation &&
          reservation.reservation.startTime === reservation.timestamp
            ? reservation.reservation.title
            : ""}
        </div>
      ))}
    </div>
  );
}
