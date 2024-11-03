"use client";
import { useState } from "react";
import { Reservation } from "../page";
import { CalendarReservationsSection } from "./CalendarReservationsSection";
import { CalendarSection } from "./CalendarSection";

type CalendarPageContentProps = {
  weekReservations: Reservation[];
  availableRooms: string[];
  equipment: string[];
  mondayDate: Date;
};

export function CalendarPageContent({
  weekReservations,
  availableRooms,
  equipment,
  mondayDate,
}: CalendarPageContentProps) {
  const [isReservationModalOpen, openCloseReservationModal] = useState(false);
  return (
    <section className="flex justify-stretch gap-10">
      <CalendarSection
        reservations={weekReservations}
        availableRooms={availableRooms}
        equipment={equipment}
        mondayDate={mondayDate.getTime()}
        openCloseReservationModal={openCloseReservationModal}
      />
      <div className="border-l-4 border-black"></div>
      <CalendarReservationsSection
        weekUserReservations={weekReservations}
        mondayDate={mondayDate.getTime()}
        isReservationModalOpen={isReservationModalOpen}
        openCloseReservationModal={openCloseReservationModal}
      />
    </section>
  );
}
