"use client";
import { Dispatch, SetStateAction } from "react";
import { Classroom, Reservation } from "../page";
import { UserReservationItem } from "./UserReservationItem";
import { CalendarReservationForm } from "./CalendarReservationForm";

type CalendarReservationsSectionProps = {
  weekUserReservations: Reservation[];
  mondayDate: number;
  isReservationModalOpen: boolean;
  openCloseReservationModal: Dispatch<SetStateAction<boolean>>;
  equipment: string[];
  classrooms: Classroom[];
};

export function CalendarReservationsSection({
  weekUserReservations,
  mondayDate,
  isReservationModalOpen,
  openCloseReservationModal,
  equipment,
  classrooms,
}: CalendarReservationsSectionProps) {
  return (
    <div className="flex w-[25vw] flex-col items-center justify-start px-2">
      <h1 className="text-center text-2xl">Your Upcoming Reservations</h1>
      {isReservationModalOpen && (
        <CalendarReservationForm
          open={isReservationModalOpen}
          setOpen={openCloseReservationModal}
          room="Room 1"
          setRoom={() => {}}
          date={new Date()}
          startTime="12:00"
          endTime="13:00"
          equipment={equipment}
          classrooms={classrooms}
        />
      )}

      <div className="flex w-full flex-col justify-center gap-8 px-2">
        {weekUserReservations.map((reservation) => (
          <UserReservationItem
            key={reservation.id}
            reservation={reservation}
            cancelReservation={() => {}}
            editReservation={() => {}}
          />
        ))}
      </div>
    </div>
  );
}
