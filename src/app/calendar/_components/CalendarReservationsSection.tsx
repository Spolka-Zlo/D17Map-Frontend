"use client";
import { Dispatch, SetStateAction, useState } from "react";
import { UserReservationItem } from "./UserReservationItem";
import { CalendarReservationForm } from "./CalendarReservationForm";
import { Reservation } from "@/schemas/reservationSchemas";
import { Equipment } from "@/schemas/equipmentSchemas";
import { Classroom } from "@/schemas/classroomSchemas";

type CalendarReservationsSectionProps = {
  weekUserReservations: Reservation[];
  mondayDate: number;
  isReservationModalOpen: boolean;
  openCloseReservationModal: Dispatch<SetStateAction<boolean>>;
  equipments: Equipment[];
  classrooms: Classroom[];
  reservationTypes: string[];
  userUpcomingReservations: Reservation[];
};

export function CalendarReservationsSection({
  weekUserReservations,
  mondayDate,
  isReservationModalOpen,
  openCloseReservationModal,
  equipments,
  classrooms,
  reservationTypes,
  userUpcomingReservations,
}: CalendarReservationsSectionProps) {
  const [editedReservation, setEditedReservation] =
    useState<Reservation | null>(null);
  return (
    <div className="flex w-[25vw] flex-col items-center justify-start px-2">
      <h1 className="text-center text-2xl">Your Upcoming Reservations</h1>
      {isReservationModalOpen && (
        <CalendarReservationForm
          setOpen={openCloseReservationModal}
          room="Room 1"
          date={new Date()}
          classrooms={classrooms}
          reservationTypes={reservationTypes}
          editedReservation={editedReservation}
          setEditedReservation={setEditedReservation}
        />
      )}

      <div className="flex w-full flex-col justify-center gap-8 px-2">
        {userUpcomingReservations.map((reservation) => (
          <UserReservationItem
            key={reservation.id}
            reservation={reservation}
            editReservation={() => {
              openCloseReservationModal(true);
              setEditedReservation(reservation);
            }}
          />
        ))}
      </div>
    </div>
  );
}
