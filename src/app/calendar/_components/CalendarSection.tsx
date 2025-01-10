"use client";

import { CalendarWeekSchedule } from "./CalendarWeekSchedule";
import Link from "next/link";
import { FilterSection } from "./FilterSection";
import { Dispatch, SetStateAction, useState } from "react";
import { Reservation, reservationTypes } from "@/schemas/reservationSchemas";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type CalendarSectionProps = {
  reservations: Reservation[];
  availableRooms: string[];
  mondayDate: number;
  openCloseReservationModal: Dispatch<SetStateAction<boolean>>;
  events: Reservation[];
  role: string | null;
};

export function CalendarSection({
  reservations,
  availableRooms,
  mondayDate,
  openCloseReservationModal,
  events,
  role,
}: CalendarSectionProps) {
  const [filters, setFilters] = useState(["Zajęcia"]);
  const [selectedRoom, setSelectedRoom] = useState(availableRooms[0]);
  const [showPicker, setShowPicker] = useState(false);
  const allFilters = Object.keys(reservationTypes);
  return (
    <section className="flex w-[62vw] flex-col gap-5">
      {role && (
        <FilterSection
          allFilters={allFilters}
          filters={filters}
          setFilters={setFilters}
          openCloseReservationModal={openCloseReservationModal}
          selectedRoom={selectedRoom}
          setSelectedRoom={setSelectedRoom}
          availableRooms={availableRooms}
        />
      )}
      <div className="flex w-full flex-col justify-between gap-5 rounded-md bg-white/25 p-5">
        <div className="flex w-full justify-center gap-8 px-2">
          <Link href={`?date=${mondayDate - 1000 * 60 * 60 * 24 * 7}`}>
            &#x2B9C;
          </Link>
          <div
            className="w-56 cursor-pointer text-center"
            onClick={() => setShowPicker(true)}
          >
            {new Date(mondayDate).toLocaleDateString()} -{" "}
            {new Date(
              mondayDate + 1000 * 60 * 60 * 24 * 6,
            ).toLocaleDateString()}
            <input id="calendarInput" type="date" style={{ display: "none" }} />
          </div>

          <Link href={`?date=${mondayDate + 1000 * 60 * 60 * 24 * 7}`}>
            &#x2B9E;
          </Link>
        </div>
        {showPicker && (
          <div className={`fixed inset-0 z-50 bg-black bg-opacity-50`}>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform rounded-md bg-white p-8">
              <DatePicker
                onChange={(date) => {
                  if (!date) return;
                  const dayOfWeek = date.getDay();
                  const offset = (dayOfWeek + 6) % 7;
                  const newMondayDateTimestamp =
                    date.getTime() - offset * 1000 * 60 * 60 * 24;
                  window.location.href = `?date=${newMondayDateTimestamp}`;

                  setShowPicker(false);
                }}
                inline
              />
            </div>
          </div>
        )}
        <CalendarWeekSchedule
          weekReservations={reservations}
          typeFilters={filters}
          selectedRoom={selectedRoom}
          events={events}
          role={role}
        />
      </div>
    </section>
  );
}
