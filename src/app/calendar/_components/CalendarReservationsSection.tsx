"use client";
import { Dispatch, SetStateAction, useState } from "react";
import { UserReservationItem } from "./UserReservationItem";
import {
  CalendarReservationForm,
  RecurringData,
} from "./CalendarReservationForm";
import { Reservation } from "@/schemas/reservationSchemas";
import { Classroom } from "@/schemas/classroomSchemas";
import { EventItem } from "./EventItem";
import { ConfirmationModal } from "@/components/ConfirmationModal";
import { acceptCycleReservation } from "../_actions/acceptCycleReservation";
import { toast } from "sonner";
import { rejectCycleReservation } from "../_actions/rejectCycleReservation";

type CalendarReservationsSectionProps = {
  isReservationModalOpen: boolean;
  openCloseReservationModal: Dispatch<SetStateAction<boolean>>;
  classrooms: Classroom[];
  userUpcomingReservations: Reservation[];
  events: Reservation[];
  role: string | null;
};

export function CalendarReservationsSection({
  isReservationModalOpen,
  openCloseReservationModal,
  classrooms,
  userUpcomingReservations,
  events,
  role,
}: CalendarReservationsSectionProps) {
  const [editedReservation, setEditedReservation] =
    useState<Reservation | null>(null);
  const [recurringData, setRecurringData] = useState<RecurringData | null>(
    null,
  );

  async function onConfirm() {
    if (!recurringData) throw new Error("No recurring data");
    await acceptCycleReservation(recurringData)
      .then(() => toast.success("Rezerwacja dodana pomyślnie"))
      .catch(() => toast.error("Nie udało się dodać rezerwacji"));
    setRecurringData(null);
  }

  async function onReject() {
    if (!recurringData) throw new Error("No recurring data");
    await rejectCycleReservation(recurringData.request.recurringId)
      .then(() => toast.success("Rezerwacja odrzucona pomyślnie"))
      .catch(() => toast.error("Nie udało się odrzucić rezerwacji"));
    setRecurringData(null);
  }

  return (
    <div className="flex w-[25vw] flex-col items-center justify-start px-2">
      <h1 className="text-center text-2xl">
        {role ? "Nadchodzące rezerwacje" : "Nadchodzące wydarzenia"}
      </h1>
      {isReservationModalOpen && (
        <CalendarReservationForm
          setOpen={openCloseReservationModal}
          room="Room 1"
          date={new Date()}
          classrooms={classrooms}
          editedReservation={editedReservation}
          setEditedReservation={setEditedReservation}
          onCollision={setRecurringData}
        />
      )}
      <ConfirmationModal
        isOpen={!!recurringData}
        onClose={onReject}
        onConfirm={onConfirm}
        message={`W wybranym cyklu występują już inne rezerwacje w datach: ${recurringData?.collisions}. Czy na pewno chcesz dodać cykl z pominięciem kolicji?`}
        title="Potwierdzenie"
        time={120}
        cancelText="Nie"
      />
      <div className="flex w-full flex-col justify-center gap-8 px-2">
        {userUpcomingReservations.map((reservation) => (
          <UserReservationItem
            key={reservation.id}
            reservation={reservation}
            editReservation={() => {
              openCloseReservationModal(true);
              setEditedReservation(reservation);
            }}
          />
        ))}
        {!role &&
          events.map((event) => <EventItem key={event.id} event={event} />)}
      </div>
    </div>
  );
}
