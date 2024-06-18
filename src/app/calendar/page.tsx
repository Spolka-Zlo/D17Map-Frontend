import { CalendarSection } from "./_components/CalendarSection";
import { z } from "zod";

const reservationSchema = z.object({
  id: z.string(),
  type: z.union([
    z.literal("Lecture"),
    z.literal("Consultation"),
    z.literal("Exam"),
    z.literal("TEST"),
  ]),
  startTime: z.string(),
  endTime: z.string(),
  classroom: z.object({
    id: z.string(),
    name: z.string(),
  }),
});

export const classRoomSchema = z.object({
  id: z.string(),
  name: z.string(),
  capacity: z.number(),
  equipment: z.array(z.string()),
});

export const reservationsSchema = z.array(reservationSchema);

export type ReservationWithoutEquipment = z.infer<typeof reservationSchema>;
export type ReservationType = ReservationWithoutEquipment["type"];
export type Reservation = ReservationWithoutEquipment & {
  roomE: {
    equipment: string[];
    capacity: number;
  };
};
export type ClassRoom = z.infer<typeof classRoomSchema>;

const roomsSchema = z.array(classRoomSchema);
const equipmentSchema = z.array(z.string());

async function fetchData(url: string) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export default async function Reservation() {
  const availableRooms = await fetchData("http://localhost:8080/classrooms");

  const equipment = await fetchData("http://localhost:8080/equipments");
  return (
    <main>
      <CalendarSection availableRooms={availableRooms} equipment={equipment} />
    </main>
  );
}
