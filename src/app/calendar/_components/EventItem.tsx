import { Reservation } from "@/schemas/reservationSchemas";

export function EventItem({ event }: { event: Reservation }) {
  return (
    <div className="relative flex w-full flex-col items-center justify-between gap-2 rounded-md border-2 border-black p-2 text-center text-primary">
      <div className="text-lg font-bold">{event.title}</div>
      <p className="text-sm">{event.description}</p>
      <div className="flex items-center justify-between gap-5">
        <div className="text-center">
          {new Intl.DateTimeFormat("pl", {
            hour: "numeric",
            minute: "numeric",
          }).format(event.startTime)}
          -
          {new Intl.DateTimeFormat("pl", {
            hour: "numeric",
            minute: "numeric",
          }).format(event.endTime)}
        </div>
        <div className="text-center">{event.date}</div>
      </div>
    </div>
  );
}
