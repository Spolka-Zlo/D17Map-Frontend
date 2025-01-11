import React, { Dispatch, SetStateAction } from "react";
import { TimeTableDayContent } from "./TimeTableWeekdayColumn";
import { mapWeekdaysToTimestamps } from "./timetableUtils";
import { useSearchParams } from "next/navigation";
import { Reservation } from "@/schemas/reservationSchemas";

export type weekdaysMapType = {
  Mon: Reservation[];
  Tue: Reservation[];
  Wed: Reservation[];
  Thu: Reservation[];
  Fri: Reservation[];
  Sat: Reservation[];
  Sun: Reservation[];
};

export type TimeTableMainPartProps = {
  reservations: Reservation[];
  typeFilters: string[];
  selectedRoom: string;
  role: string | null;
  openCloseReservationModal: Dispatch<SetStateAction<boolean>>;
  setReservationStartTime: Dispatch<SetStateAction<number | null | undefined>>;
  setReservationEndTime: Dispatch<SetStateAction<number | null | undefined>>;
  reservationStartTime?: number | null;
  reservationEndTime?: number | null;
};

export function TimeTableMainPart({
  reservations,
  typeFilters,
  selectedRoom,
  role,
  openCloseReservationModal,
  setReservationStartTime,
  setReservationEndTime,
  reservationStartTime,
  reservationEndTime,
}: TimeTableMainPartProps) {
  const searchParams = useSearchParams();
  const mondayDate = Number(searchParams.get("date"));
  function getWeekDay(date: string) {
    return new Date(date).toLocaleDateString("en-UK", { weekday: "short" });
  }

  function weekdaysMap(reservations: Reservation[]) {
    const weekdaysMap: weekdaysMapType = {
      Mon: [],
      Tue: [],
      Wed: [],
      Thu: [],
      Fri: [],
      Sat: [],
      Sun: [],
    };
    reservations.forEach((reservation) => {
      const day = getWeekDay(reservation.date) as keyof weekdaysMapType;
      weekdaysMap[day].push(reservation);
    });
    return weekdaysMap;
  }

  const timestampsMap = mapWeekdaysToTimestamps(
    weekdaysMap(reservations),
    mondayDate,
  );

  return (
    <>
      {Object.entries(timestampsMap).map(([day, reservationTimeStamps], i) => (
        <div
          key={day}
          className={`p-2 maxXS:col-start-${i + 1} xs:col-start-${i + 2}`}
          style={{
            gridRow: 1,
          }}
        >
          <div className="border-b-4 border-black pb-3 text-center">{day}</div>
          <TimeTableDayContent
            reservationTimeStamps={reservationTimeStamps}
            typeFilters={typeFilters}
            selectedRoom={selectedRoom}
            role={role}
            openCloseReservationModal={openCloseReservationModal}
            setReservationStartTime={setReservationStartTime}
            setReservationEndTime={setReservationEndTime}
            reservationStartTime={reservationStartTime}
            reservationEndTime={reservationEndTime}
          />
        </div>
      ))}
    </>
  );
}
