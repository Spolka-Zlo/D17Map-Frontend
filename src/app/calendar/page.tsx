import { CalendarSection } from "./_components/CalendarSection";
import { z } from "zod";

const reservationsSchema = z.object({
  title: z.string(),
  startTime: z.string(),
  endTime: z.string(),
  room: z.string(),
  date: z.date(),
  reservationType: z.union([
    z.literal("Lecture"),
    z.literal("Consultation"),
    z.literal("Exam"),
  ]),
});

export type Reservation = z.infer<typeof reservationsSchema>;
export type ReservationType = Reservation["reservationType"];

const roomsSchema = z.array(z.string());

async function fetchRooms() {
  const response = await fetch("https://api.example.com/rooms");
  const rooms = await response.json();
  return roomsSchema.parse(rooms);
}

export default async function Reservation() {
  const reservations: Reservation[] = [
    {
      title: "Lecture",
      startTime: "12:15",
      endTime: "13:45",
      room: "2.41",
      date: new Date(),
      reservationType: "Lecture",
    },
    {
      title: "Consultation",
      startTime: "14:00",
      endTime: "15:00",
      room: "2.41",
      date: new Date(),
      reservationType: "Consultation",
    },
    {
      title: "Exam",
      startTime: "16:00",
      endTime: "18:00",
      room: "1.38",
      date: new Date(),
      reservationType: "Exam",
    },
  ];
  const availableRooms = await fetchRooms();
  const equipment = ["Computers", "Routers", "Terminals"];
  return (
    <main>
      <CalendarSection
        reservations={reservations}
        availableRooms={["2.41", "1.38", "3.33", "4.22", "3.11", "2.22"]}
        equipment={equipment}
      />
    </main>
  );
}
