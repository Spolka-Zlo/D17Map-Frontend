"use client";
import { Dropdown } from "@/components/Dropdown";
import { Classroom, Reservation } from "../page";
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
  equipment: string[];
  classrooms: Classroom[];
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
  equipment,
  classrooms,
}: CalendarReservationFormProps) {
  const [selectedType, setSelectedType] = useState("Lecture");
  const [selectedEquipment, setSelectedEquipment] = useState("None");
  function handleSubmit() {
    setOpen(false);
    console.log("Submit");
  }

  function roomsWithEquipment(equipment: string, rooms: string[]) {
    return rooms.filter(
      (room) => room.includes(equipment) || equipment === "None",
    );
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
              list="time"
            />
            <input
              className="rounded-md border-b-2 border-l-2 border-primary p-1"
              type="time"
              list="time"
            />
            <datalist id="time">
              {new Array(15 * 4).fill(0).map((_, i) => {
                const time = new Date(
                  0,
                  0,
                  0,
                  6 + Math.floor(i / 4),
                  (i % 4) * 15,
                );
                return (
                  <option key={i} value={time.toTimeString().slice(0, 5)} />
                );
              })}
            </datalist>
          </div>
          <input
            className="rounded-md border-b-2 border-l-2 border-primary p-1 text-center"
            type="number"
            min={1}
            placeholder="Uczestnicy"
          />
          <Dropdown
            options={["Lecture", "Consultation", "Exam"]}
            selected={selectedType}
            setSelected={setSelectedType}
            className="z-20"
          />
          <Dropdown
            options={equipment}
            selected={selectedEquipment}
            setSelected={setSelectedEquipment}
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
