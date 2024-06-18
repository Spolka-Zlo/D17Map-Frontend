"use client";
import { Dropdown } from "@/components/Dropdown";
import { ClassRoom, Reservation } from "../page";
import { useState } from "react";
import { OrangeButton } from "@/components/OrangeButton";

type CalendarReservationFormProps = {
  room: string;
  setRoom: React.Dispatch<React.SetStateAction<string>>;
  availableRooms?: ClassRoom[];
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
    <div className={`fixed inset-0 bg-black bg-opacity-50 z-50`}>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg">
        <h3 className="text-primary text-xl pb-5">
          Rezerwacja sali {room} na dzień {date.toDateString()}
        </h3>
        <form className="flex flex-col gap-4 justify-center items-center content-center">
          <input
            className="text-center border-primary/50 border-4 rounded-lg p-1"
            type="text"
            placeholder="Tytuł rezerwacji"
          />
          <div className="flex gap-3 justify-center">
            <input
              className="border-primary/50 border-4 rounded-lg p-1"
              type="time"
              value={startTime}
              onChange={(e) => console.log(e.target.value)}
            />
            <input
              className="border-primary/50 border-4 rounded-lg p-1"
              type="time"
              value={endTime}
              onChange={(e) => console.log(e.target.value)}
            />
          </div>
          <Dropdown
            options={["Lecture", "Consultation", "Exam"]}
            selected={selectedType}
            setSelected={setSelectedType}
          />
          <Dropdown
            options={availableRooms?.map((room) => room.name) ?? []}
            selected={room}
            setSelected={setRoom}
          />
          <OrangeButton onClick={handleSubmit} text="Zarezerwuj" />
        </form>
      </div>
    </div>
  );
}
