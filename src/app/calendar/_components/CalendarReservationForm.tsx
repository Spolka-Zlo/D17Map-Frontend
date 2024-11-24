"use client";
import { Dispatch, SetStateAction, useState } from "react";
import { OrangeButton } from "@/components/OrangeButton";
import { addReservation } from "../../../shared-endpoints/addReservation";
import { RadioDropdown } from "@/components/RadioDropdown";
import { Classroom } from "@/schemas/classroomSchemas";
import { Reservation } from "@/schemas/reservationSchemas";
import { modifyReservation } from "@/shared-endpoints/modifyReservation";
import { revalidateTag } from "next/cache";
import { toast } from "sonner";

type CalendarReservationFormProps = {
  room: string;
  date: Date;
  setOpen: Dispatch<SetStateAction<boolean>>;
  classrooms: Classroom[];
  reservationTypes: string[];
  editedReservation?: Reservation | null;
  setEditedReservation: Dispatch<SetStateAction<Reservation | null>>;
};

export function CalendarReservationForm({
  room,
  date,
  setOpen,
  classrooms,
  reservationTypes,
  editedReservation,
  setEditedReservation,
}: CalendarReservationFormProps) {
  const [participants, setParticipants] = useState(0);

  const submitAction = async (formData: FormData) => {
    if (editedReservation) {
      formData.append("id", editedReservation.id);
      await modifyReservation(formData)
        .then(() => toast.success("Rezerwacja zmodyfikowana pomyślnie"))
        .catch((error) => toast.error("Nie udało się zmodyfikować rezerwacji"));
    } else {
      await addReservation(formData)
        .then(() => toast.success("Rezerwacja dodana pomyślnie"))
        .catch((error) => toast.error("Nie udało się dodać rezerwacji"));
    }
    setOpen(false);
    setEditedReservation(null);
  };

  return (
    <div className={`fixed inset-0 z-50 bg-black bg-opacity-50`}>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform rounded-md bg-white p-8">
        <button
          onClick={() => {
            setEditedReservation(null);
            setOpen(false);
          }}
          className="absolute right-2 top-2"
        >
          X
        </button>

        <h3 className="pb-5 text-xl text-primary">
          Rezerwacja sali {room} na dzień {date.toDateString()}
        </h3>
        <form
          action={submitAction}
          className="flex flex-col content-center items-center justify-center gap-6 pt-6"
        >
          <input
            className="rounded-md border-b-2 border-l-2 border-primary p-1 text-center"
            name="title"
            type="text"
            placeholder="Tytuł rezerwacji"
            required
            defaultValue={editedReservation?.title}
          />
          <input
            className="rounded-md border-b-2 border-l-2 border-primary p-1 text-center"
            name="description"
            type="text"
            placeholder="Opis rezerwacji"
            required
            defaultValue={editedReservation?.description}
          />
          <input
            className="rounded-md border-b-2 border-l-2 border-primary p-1 text-center"
            name="date"
            type="date"
            placeholder="Data"
            required
            defaultValue={date.toISOString().slice(0, 10)}
          />
          <div className="flex justify-center gap-3">
            <input
              name="startTime"
              className="rounded-md border-b-2 border-l-2 border-primary p-1"
              type="time"
              list="time"
              required
              defaultValue={
                editedReservation
                  ? new Date(editedReservation.startTime)
                      .toTimeString()
                      .slice(0, 5)
                  : undefined
              }
            />
            <input
              className="rounded-md border-b-2 border-l-2 border-primary p-1"
              name="endTime"
              type="time"
              list="time"
              required
              defaultValue={
                editedReservation
                  ? new Date(editedReservation.endTime)
                      .toTimeString()
                      .slice(0, 5)
                  : undefined
              }
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
            onChange={(e) => setParticipants(parseInt(e.target.value))}
            defaultValue={editedReservation?.numberOfParticipants}
          />
          <RadioDropdown
            options={classrooms
              .filter((room) => room.capacity >= participants)
              .map((room) => ({ id: room.id, name: room.name }))}
            className="z-20"
            htmlName="classroomId"
            defaultValue={editedReservation?.classroom.name}
          />
          <RadioDropdown
            options={reservationTypes.map((type) => ({ id: type, name: type }))}
            className="z-20"
            htmlName="type"
            defaultValue={editedReservation?.type}
          />
          <OrangeButton type="submit" text="Zarezerwuj" />
        </form>
      </div>
    </div>
  );
}
