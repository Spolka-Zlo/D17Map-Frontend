"use client";
import { useState } from "react";
import { CalendarReservationsSection } from "./CalendarReservationsSection";
import { CalendarSection } from "./CalendarSection";
import { Reservation } from "@/schemas/reservationSchemas";
import { Classroom } from "@/schemas/classroomSchemas";

type CalendarPageContentProps = {
  weekReservations: Reservation[];
  availableRooms: string[];
  mondayDate: Date;
  classrooms: Classroom[];
  userUpcomingReservations: Reservation[];
  events: Reservation[];
  role: string | null;
};

export function CalendarPageContent({
  weekReservations,
  availableRooms,
  mondayDate,
  classrooms,
  userUpcomingReservations,
  events,
  role,
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
        events={events}
        role={role}
      />
      <div className="border-l-4 border-black"></div>
      <CalendarReservationsSection
        isReservationModalOpen={isReservationModalOpen}
        openCloseReservationModal={openCloseReservationModal}
        classrooms={classrooms}
        userUpcomingReservations={userUpcomingReservations}
        events={events}
        role={role}
      />
    </section>
  );
}
