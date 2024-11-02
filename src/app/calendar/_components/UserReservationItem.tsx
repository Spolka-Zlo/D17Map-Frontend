import { Reservation } from "../page";

export function UserReservationItem({
  reservation,
  onClick,
}: {
  reservation: Reservation;
  onClick: () => void;
}) {
  return (
    <div
      className="flex w-full cursor-pointer flex-col items-center justify-between gap-3 rounded-md border-2 border-black bg-primary p-2 text-center text-white hover:bg-accent/50 hover:text-primary"
      onClick={onClick}
    >
      <div className="">
        <div>{reservation.title}</div>
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
        <span className="h-1 w-1 rounded-full bg-white" />{" "}
        <div>{reservation.classRoom.name}</div>
        <span className="h-1 w-1 rounded-full bg-white" />{" "}
        <div>{reservation.date}</div>
      </div>
      <div>{reservation.description}</div>
    </div>
  );
}
