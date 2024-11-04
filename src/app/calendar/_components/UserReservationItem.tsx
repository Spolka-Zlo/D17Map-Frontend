import { Reservation } from "../page";

export function UserReservationItem({
  reservation,
  cancelReservation,
  editReservation,
}: {
  reservation: Reservation;
  cancelReservation: () => void;
  editReservation: () => void;
}) {
  return (
    <div className="relative flex w-full flex-col items-center justify-between gap-3 rounded-md border-2 border-black p-2 text-center text-primary">
      <div className="">
        <div>{reservation.title}</div>
        <div className="absolute right-2 top-2 z-10 flex justify-between gap-1">
          <button
            className="text-md h-6 w-6 cursor-pointer rounded-md p-0 text-accent"
            onClick={editReservation}
          >
            &#x1F589;
          </button>
          <button
            className="text-md h-6 w-6 cursor-pointer rounded-md p-0 text-red-500"
            onClick={cancelReservation}
          >
            &#x1F5D1;
          </button>
        </div>
      </div>
      <div className="flex items-center justify-between gap-5">
        <div className="text-center">
          {new Date(reservation.startTime)
            .toTimeString()
            .split(" ")[0]
            .slice(0, 5)}
          -
          {new Date(reservation.endTime)
            .toTimeString()
            .split(" ")[0]
            .slice(0, 5)}
        </div>
        <span className="h-1 w-1 rounded-full bg-primary/50" />{" "}
        <div>{reservation.classRoom.name}</div>
        <span className="h-1 w-1 rounded-full bg-primary/50" />{" "}
        <div>{reservation.date}</div>
      </div>
      <div>{reservation.description}</div>
    </div>
  );
}
