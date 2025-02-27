"use client";
import { Dispatch, SetStateAction, useState } from "react";
import { OrangeButton } from "@/components/OrangeButton";
import { addReservation } from "../../../shared-endpoints/addReservation";
import { RadioDropdown } from "@/components/RadioDropdown";
import { Classroom } from "@/schemas/classroomSchemas";
import {
  CycleReservationRequest,
  Reservation,
  reservationTypes,
  reverseReservationTypes,
} from "@/schemas/reservationSchemas";
import { modifyReservation } from "@/shared-endpoints/modifyReservation";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

export type RecurringData = {
  collisions: string[];
  request: CycleReservationRequest;
};

type CalendarReservationFormProps = {
  room: string;
  date: Date;
  setOpen: Dispatch<SetStateAction<boolean>>;
  classrooms: Classroom[];
  editedReservation?: Reservation | null;
  setEditedReservation: Dispatch<SetStateAction<Reservation | null>>;
  onCollision: Dispatch<SetStateAction<RecurringData | null>>;
  setReservationStartTime: Dispatch<SetStateAction<number | null | undefined>>;
  setReservationEndTime: Dispatch<SetStateAction<number | null | undefined>>;
  reservationStartTime?: number | null | undefined;
  reservationEndTime?: number | null | undefined;
  selectedRoom?: string;
};

export function CalendarReservationForm({
  room,
  date,
  setOpen,
  classrooms,
  editedReservation,
  setEditedReservation,
  onCollision,
  reservationStartTime,
  reservationEndTime,
  setReservationStartTime,
  setReservationEndTime,
  selectedRoom,
}: CalendarReservationFormProps) {
  const [participants, setParticipants] = useState(0);
  const [isRecurring, setIsRecurring] = useState(false);

  const submitAction = async (formData: FormData) => {
    if (editedReservation) {
      formData.append("id", editedReservation.id);
      await modifyReservation(formData)
        .then(() => toast.success("Rezerwacja zmodyfikowana pomyślnie"))
        .catch(() => toast.error("Nie udało się zmodyfikować rezerwacji"));
    } else {
      const responseWithCollisions = await addReservation(formData);

      if (responseWithCollisions) {
        setOpen(false);
        onCollision(
          createRequestData(
            formData,
            responseWithCollisions.recurringId,
            responseWithCollisions.collisions,
          ),
        );
      }
    }
    setReservationStartTime(null);
    setReservationEndTime(null);
    setOpen(false);
  };

  function setDefaultTime(
    time: number | null | undefined,
    editedTime: number | undefined,
  ) {
    if (editedTime) return new Date(editedTime).toTimeString().slice(0, 5);
    if (time) return new Date(time).toTimeString().slice(0, 5);
    return undefined;
  }

  return (
    <div className={`fixed inset-0 z-50 bg-black bg-opacity-50`}>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform rounded-md bg-white p-14">
        <button
          onClick={() => {
            setReservationStartTime(null);
            setReservationEndTime(null);
            setEditedReservation(null);
            setOpen(false);
          }}
          className="absolute right-2 top-2"
        >
          X
        </button>

        <h3 className="pb-5 text-center text-xl text-primary">
          {editedReservation ? "Edycja rezerwacji" : "Rezerwacja sali"}
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
            className={twMerge(
              "rounded-md border-b-2 border-l-2 border-primary p-1 text-center",
              editedReservation && "text-gray-500",
            )}
            name="date"
            type="date"
            placeholder="Data"
            required
            defaultValue={date.toISOString().slice(0, 10)}
            disabled={
              editedReservation !== null && editedReservation !== undefined
            }
          />
          <div className="flex justify-center gap-3">
            <input
              name="startTime"
              className={twMerge(
                "rounded-md border-b-2 border-l-2 border-primary p-1",
                editedReservation && "text-gray-500",
              )}
              type="time"
              list="time"
              required
              defaultValue={setDefaultTime(
                reservationStartTime,
                editedReservation?.startTime,
              )}
              disabled={
                editedReservation !== null && editedReservation !== undefined
              }
            />
            <input
              className={twMerge(
                "rounded-md border-b-2 border-l-2 border-primary p-1",
                editedReservation && "text-gray-500",
              )}
              name="endTime"
              type="time"
              list="time"
              required
              defaultValue={setDefaultTime(
                reservationEndTime,
                editedReservation?.endTime,
              )}
              disabled={
                editedReservation !== null && editedReservation !== undefined
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
            htmlName="classroomId"
            defaultValue={
              editedReservation?.classroom.name ||
              selectedRoom ||
              classrooms.find((r) => r.name === room)?.name
            }
          />
          <RadioDropdown
            options={Object.keys(reservationTypes).map((key) => ({
              id: reservationTypes[key],
              name: key,
            }))}
            htmlName="type"
            defaultValue={
              editedReservation
                ? reverseReservationTypes[editedReservation?.type]
                : undefined
            }
          />
          <div className="flex flex-col items-center gap-3">
            <div className="flex justify-center gap-3">
              <input
                type="checkbox"
                name="isRecurring"
                onChange={(e) => setIsRecurring(e.target.checked)}
                checked={isRecurring}
              />
              <label onClick={() => setIsRecurring(!isRecurring)}>
                Powtarzająca się rezerwacja
              </label>
            </div>
            <label htmlFor="recurringEndDate" hidden={!isRecurring}>
              Data końca cyklu
            </label>
            <input
              className="rounded-md border-b-2 border-l-2 border-primary p-1 text-center"
              type="date"
              name="recurringEndDate"
              placeholder="Data końcowa"
              hidden={!isRecurring}
            />
            <RadioDropdown
              options={[
                { id: "DAILY", name: "Codziennie" },
                { id: "WEEKLY", name: "Co tydzień" },
                { id: "EVERY_TWO_WEEKS", name: "Co dwa tygodnie" },
                { id: "MONTHLY", name: "Co miesiąc" },
              ]}
              htmlName="recurringType"
              hidden={!isRecurring}
            />
          </div>
          <OrangeButton
            type="submit"
            text={editedReservation ? "Zatwierdź" : "Zarezerwuj"}
          />
        </form>
      </div>
    </div>
  );
}

function createRequestData(
  formData: FormData,
  recurringId: string,
  collisions: string[],
) {
  const request = {
    id: formData.get("id") as string,
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    date: formData.get("date") as string,
    startTime: formData.get("startTime") as string,
    endTime: formData.get("endTime") as string,
    classroomId: formData.get("classroomId") as string,
    type: formData.get("type") as string,
    numberOfParticipants: Number(
      formData.get("numberOfParticipants") as string,
    ),
    recurringId,
    recurringEndDate: formData.get("recurringEndDate") as string,
    recurringType: formData.get("recurringType") as string,
  } satisfies CycleReservationRequest;

  return {
    request,
    collisions,
  };
}
