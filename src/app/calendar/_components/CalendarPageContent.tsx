"use client";
import { useState } from "react";
import { CalendarReservationsSection } from "./CalendarReservationsSection";
import { CalendarSection } from "./CalendarSection";
import { Reservation } from "@/schemas/reservationSchemas";
import { Classroom } from "@/schemas/classroomSchemas";
import { Equipment } from "@/schemas/equipmentSchemas";

type CalendarPageContentProps = {
  weekReservations: Reservation[];
  availableRooms: string[];
  equipments: Equipment[];
  mondayDate: Date;
  classrooms: Classroom[];
  userUpcomingReservations: Reservation[];
};

export function CalendarPageContent({
  weekReservations,
  availableRooms,
  equipments,
  mondayDate,
  classrooms,
  userUpcomingReservations,
}: CalendarPageContentProps) {
  const [isReservationModalOpen, openCloseReservationModal] = useState(false);
  const mondayDateTimestamp = mondayDate.getTime();
  return (
    <section className="flex justify-stretch gap-10">
      <CalendarSection
        reservations={weekReservations}
        availableRooms={availableRooms}
        mondayDate={mondayDateTimestamp}
        openCloseReservationModal={openCloseReservationModal}
      />
      <div className="border-l-4 border-black"></div>
      <CalendarReservationsSection
        isReservationModalOpen={isReservationModalOpen}
        openCloseReservationModal={openCloseReservationModal}
        classrooms={classrooms}
        userUpcomingReservations={userUpcomingReservations}
      />
    </section>
  );
}
