import { OrangeButton } from "@/components/OrangeButton";
import { Reservation } from "@/schemas/reservationSchemas";
import { Dispatch, SetStateAction, useState } from "react";

type RecurringInformationModalProps = {
  reservation: Reservation;
  isRecurrenceInfoModalOpen: boolean;
  setIsRecurrenceInfoModalOpen: Dispatch<SetStateAction<boolean>>;
  allReservationsInCycle: Reservation[];
};

export function RecurringInformationModal({
  reservation,
  isRecurrenceInfoModalOpen,
  setIsRecurrenceInfoModalOpen,
  allReservationsInCycle,
}: RecurringInformationModalProps) {
  const [showAllReservations, setShowAllReservations] = useState(false);
  const [reservationsFromCycle] = useState<Reservation[]>([]);

  const recurringTypeMap: { [key: string]: string } = {
    DAILY: "Codziennie",
    WEEKLY: "Co tydzień",
    EVERY_TWO_WEEKS: "Co dwa tygodnie",
    MONTHLY: "Co miesiąc",
  } as const;

  if (!("recurringId" in reservation)) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 z-50 bg-black bg-opacity-50 ${
        isRecurrenceInfoModalOpen ? "" : "hidden"
      }`}
    >
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform rounded-md bg-white p-8">
        <button
          onClick={() => {
            setShowAllReservations(false);
            setIsRecurrenceInfoModalOpen(false);
          }}
          className="absolute right-2 top-2"
        >
          X
        </button>
        <div className="flex flex-col gap-4 text-center">
          <h1 className="text-xl font-bold">{reservation.title}</h1>

          <div className="flex flex-col gap-1">
            <span>{reservation.description}</span>
            <div className="text-center">
              {new Intl.DateTimeFormat("pl", {
                hour: "numeric",
                minute: "numeric",
              }).format(reservation.startTime)}
              -
              {new Intl.DateTimeFormat("pl", {
                hour: "numeric",
                minute: "numeric",
              }).format(reservation.endTime)}
            </div>
            <div className="flex justify-center">
              <span>
                {new Intl.DateTimeFormat("pl", {
                  day: "numeric",
                  month: "numeric",
                  year: "numeric",
                }).format(new Date(reservation.date))}{" "}
                -{" "}
                {reservation.recurringEndDate &&
                  new Intl.DateTimeFormat("pl", {
                    day: "numeric",
                    month: "numeric",
                    year: "numeric",
                  }).format(new Date(reservation.recurringEndDate))}
              </span>
            </div>
            <span>Sala {reservation.classroom.name}</span>
            <span>{reservation.numberOfParticipants} uczestników</span>
            <span>
              {reservation.recurringType
                ? recurringTypeMap[reservation.recurringType]
                : ""}
            </span>
          </div>
          <OrangeButton
            text={
              showAllReservations
                ? "Ukryj wszystkie rezerwacje"
                : "Zobacz wszystkie rezerwacje"
            }
            onClick={() => setShowAllReservations(!showAllReservations)}
          />
          {showAllReservations && (
            <div className="scrollbar flex flex-col gap-2 overflow-auto">
              {allReservationsInCycle.map((reservation) => (
                <div key={reservation.id} className="flex justify-center gap-2">
                  <div className="flex justify-center gap-2">
                    <span>
                      {new Intl.DateTimeFormat("pl", {
                        hour: "numeric",
                        minute: "numeric",
                      }).format(reservation.startTime)}
                      -
                      {new Intl.DateTimeFormat("pl", {
                        hour: "numeric",
                        minute: "numeric",
                      }).format(reservation.endTime)}
                    </span>

                    <span>{reservation.date}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
