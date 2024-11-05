"use client";

import { Reservation } from "@/app/calendar/page";
import { CalendarWeekSchedule } from "./CalendarWeekSchedule";
import Link from "next/link";
import { FilterSection } from "./FilterSection";
import { Dispatch, SetStateAction, useState } from "react";

type CalendarSectionProps = {
  reservations: Reservation[];
  availableRooms: string[];
  mondayDate: number;
  openCloseReservationModal: Dispatch<SetStateAction<boolean>>;
};

export function CalendarSection({
  reservations,
  availableRooms,
  mondayDate,
  openCloseReservationModal,
}: CalendarSectionProps) {
  const [filters, setFilters] = useState(["Events", "Lectures"]);
  const [selectedRoom, setSelectedRoom] = useState(availableRooms[0]);
  const allFilters = ["Events", "Lectures", "Exams", "Consultations"];
  return (
    <section className="flex w-[62vw] flex-col gap-5">
      <FilterSection
        allFilters={allFilters}
        filters={filters}
        setFilters={setFilters}
        openCloseReservationModal={openCloseReservationModal}
        selectedRoom={selectedRoom}
        setSelectedRoom={setSelectedRoom}
        availableRooms={availableRooms}
      />
      <div className="flex w-full flex-col justify-between gap-5 rounded-md bg-white/25 p-5">
        <div className="flex w-full justify-center gap-8 px-2">
          <Link href={`?date=${mondayDate - 1000 * 60 * 60 * 24 * 7}`}>
            &#x2B9C;
          </Link>
          {new Date(mondayDate).toLocaleDateString()} -{" "}
          {new Date(mondayDate + 1000 * 60 * 60 * 24 * 6).toLocaleDateString()}
          <Link href={`?date=${mondayDate + 1000 * 60 * 60 * 24 * 7}`}>
            &#x2B9E;
          </Link>
        </div>
        <CalendarWeekSchedule weekReservations={reservations} />
      </div>
    </section>
  );
}
