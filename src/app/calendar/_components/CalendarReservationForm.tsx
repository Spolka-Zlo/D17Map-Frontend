"use client";
import { Dropdown } from "@/components/Dropdown";
import { Classroom } from "../page";
import { useState } from "react";
import { OrangeButton } from "@/components/OrangeButton";
import { addReservation } from "../_actions/addReservation";

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
  const [selectedType, setSelectedType] = useState("CLASS");
  const [selectedEquipment, setSelectedEquipment] = useState("None");
  function handleSubmit() {
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
        <form
          action={async (formData) => {
            await addReservation(formData);
            setOpen(false);
          }}
          className="flex flex-col content-center items-center justify-center gap-6 pt-6"
        >
          <input
            className="rounded-md border-b-2 border-l-2 border-primary p-1 text-center"
            name="title"
            type="text"
            placeholder="Tytuł rezerwacji"
            required
          />
          <input
            className="rounded-md border-b-2 border-l-2 border-primary p-1 text-center"
            name="description"
            type="text"
            placeholder="Opis rezerwacji"
            required
          />
          <input
            className="rounded-md border-b-2 border-l-2 border-primary p-1 text-center"
            name="date"
            type="date"
            placeholder="Data"
            required
          />
          <div className="flex justify-center gap-3">
            <input
              name="startTime"
              className="rounded-md border-b-2 border-l-2 border-primary p-1"
              type="time"
              list="time"
              required
            />
            <input
              className="rounded-md border-b-2 border-l-2 border-primary p-1"
              name="endTime"
              type="time"
              list="time"
              required
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
            name="numberOfParticipants"
            type="number"
            min={0}
            placeholder="Uczestnicy"
            required
          />
          <Dropdown
            options={["CLASS"]}
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
          <input
            type="hidden"
            name="classroomId"
            value={"7f000101-92f8-1911-8192-f8c91dfc0004"}
          />
          <input type="hidden" name="date" value={date.toISOString()} />
          <input type="hidden" name="type" value={selectedType} />
          <OrangeButton type="submit" text="Zarezerwuj" />
        </form>
      </div>
    </div>
  );
}
