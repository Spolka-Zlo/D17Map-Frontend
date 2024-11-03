"use client";
import { Dropdown } from "@/components/Dropdown";
import { Reservation } from "../page";
import { useState } from "react";
import { OrangeButton } from "@/components/OrangeButton";
import { twMerge } from "tailwind-merge";

type CalendarReservationFormProps = {
  room: string;
  setRoom: React.Dispatch<React.SetStateAction<string>>;
  availableRooms?: string[];
  date: Date;
  startTime?: string;
  setStartTime?: React.Dispatch<React.SetStateAction<string>>;
  endTime?: string;
  setEndTime?: React.Dispatch<React.SetStateAction<string>>;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function CalendarReservationForm({
  room,
  setRoom,
  availableRooms,
  date,
  startTime,
  setStartTime,
  endTime,
  setEndTime,
  open,
  setOpen,
}: CalendarReservationFormProps) {
  const [selectedType, setSelectedType] = useState("Lecture");
  function handleSubmit() {
    setOpen(false);
    console.log("Submit");
  }

  return (
    <div className={`fixed inset-0 z-50 bg-black bg-opacity-50`}>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform rounded-md bg-white p-8">
        <h3 className="pb-5 text-xl text-primary">
          Rezerwacja sali {room} na dzień {date.toDateString()}
        </h3>
        <form className="flex flex-col content-center items-center justify-center gap-6 pt-6">
          <input
            className="rounded-md border-b-2 border-l-2 border-primary p-1 text-center"
            type="text"
            placeholder="Tytuł rezerwacji"
          />
          <div className="flex justify-center gap-3">
            <input
              className="rounded-md border-b-2 border-l-2 border-primary p-1"
              type="time"
              value={startTime}
              onChange={(e) => console.log(e.target.value)}
            />
            <input
              className="rounded-md border-b-2 border-l-2 border-primary p-1"
              type="time"
              value={endTime}
              onChange={(e) => console.log(e.target.value)}
            />
          </div>
          <input
            className="rounded-md border-b-2 border-l-2 border-primary p-1 text-center"
            type="number"
            placeholder="Uczestnicy"
          />
          <Dropdown
            options={["Lecture", "Consultation", "Exam"]}
            selected={selectedType}
            setSelected={setSelectedType}
            className="z-10"
          />
          <Dropdown
            options={availableRooms ?? []}
            selected={room}
            setSelected={setRoom}
          />
          <OrangeButton onClick={handleSubmit} text="Zarezerwuj" />
        </form>
      </div>
    </div>
  );
}
