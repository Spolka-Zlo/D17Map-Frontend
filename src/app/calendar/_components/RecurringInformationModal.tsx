import { OrangeButton } from "@/components/OrangeButton";
import { Reservation } from "@/schemas/reservationSchemas";
import { toTimestamp } from "@/utils/DateUtils";
import { Dispatch, SetStateAction, useState } from "react";

type RecurringInformationModalProps = {
  reservation: Reservation;
  isRecurrenceInfoModalOpen: boolean;
  setIsRecurrenceInfoModalOpen: Dispatch<SetStateAction<boolean>>;
};

export function RecurringInformationModal({
  reservation,
  isRecurrenceInfoModalOpen,
  setIsRecurrenceInfoModalOpen,
}: RecurringInformationModalProps) {
  const [showAllReservations, setShowAllReservations] = useState(false);
  const [reservationsFromCycle] = useState<Reservation[]>(
    [
      {
        id: "1",
        title: "Zajęcia z wdi",
        description: "Zajecia z wdi dla grupy 1",
        date: "2024-11-25",
        startTime: "09:00",
        endTime: "10:00",
        type: "CLASS",
        classroom: {
          id: "7f000101-93df-1bc5-8193-df8bd984000f",
          name: "1.38",
          modelKey: "138",
          capacity: 120,
        },
        numberOfParticipants: 10,
        recurringId: "1",
        recurringStartDate: "2024-11-25",
        recurringEndDate: "2024-12-30",
        recurringType: "BIWEEKLY",
      },
      {
        id: "2",
        title: "Zajęcia z wdi",
        description: "Zajecia z wdi dla grupy 1",
        date: "2024-12-09",
        startTime: "09:00",
        endTime: "10:00",
        type: "CLASS",
        classroom: {
          id: "7f000101-93df-1bc5-8193-df8bd984000f",
          name: "1.38",
          modelKey: "138",
          capacity: 120,
        },
        numberOfParticipants: 10,
        recurringId: "1",
        recurringStartDate: "2024-11-25",
        recurringEndDate: "2024-12-30",
        recurringType: "BIWEEKLY",
      },
      {
        id: "3",
        title: "Zajęcia z wdi",
        description: "Zajecia z wdi dla grupy 1",
        date: "2024-12-23",
        startTime: "09:00",
        endTime: "10:00",
        type: "CLASS",
        classroom: {
          id: "7f000101-93df-1bc5-8193-df8bd984000f",
          name: "1.38",
          modelKey: "138",
          capacity: 120,
        },
        numberOfParticipants: 10,
        recurringId: "1",
        recurringStartDate: "2024-11-25",
        recurringEndDate: "2024-12-30",
        recurringType: "BIWEEKLY",
      },
    ].map((reservation) => ({
      ...reservation,
      startTime: toTimestamp(reservation.date + "T" + reservation.startTime),
      endTime: toTimestamp(reservation.date + "T" + reservation.endTime),
    })),
  );

  const recurringTypeMap: { [key: string]: string } = {
    DAILY: "Codziennie",
    WEEKLY: "Co tydzień",
    BIWEEKLY: "Co dwa tygodnie",
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
              {reservation.recurringStartDate} - {reservation.recurringEndDate}
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
            <div className="flex flex-col gap-2">
              {reservationsFromCycle.map((reservation) => (
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
