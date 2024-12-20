"use client";
import { Dispatch, SetStateAction, useState } from "react";
import { UserReservationItem } from "./UserReservationItem";
import { CalendarReservationForm } from "./CalendarReservationForm";
import { Reservation } from "@/schemas/reservationSchemas";
import { Classroom } from "@/schemas/classroomSchemas";
import { EventItem } from "./EventItem";

type CalendarReservationsSectionProps = {
  isReservationModalOpen: boolean;
  openCloseReservationModal: Dispatch<SetStateAction<boolean>>;
  classrooms: Classroom[];
  userUpcomingReservations: Reservation[];
  events: Reservation[];
  role: string | null;
};

export function CalendarReservationsSection({
  isReservationModalOpen,
  openCloseReservationModal,
  classrooms,
  userUpcomingReservations,
  events,
  role,
}: CalendarReservationsSectionProps) {
  const [editedReservation, setEditedReservation] =
    useState<Reservation | null>(null);

  return (
    <div className="flex w-[25vw] flex-col items-center justify-start px-2">
      <h1 className="text-center text-2xl">
        {role ? "Nadchodzące rezerwacje" : "Nadchodzące wydarzenia"}
      </h1>
      {isReservationModalOpen && (
        <CalendarReservationForm
          setOpen={openCloseReservationModal}
          room="Room 1"
          date={new Date()}
          classrooms={classrooms}
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
        {!role &&
          events.map((event) => <EventItem key={event.id} event={event} />)}
      </div>
    </div>
  );
}
