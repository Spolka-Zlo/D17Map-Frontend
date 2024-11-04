import { CalendarPageContent } from "./_components/CalendarPageContent";
import { z } from "zod";
import { toTimestamp } from "@/utils/DateUtils";
import { fetchGet } from "@/server-endpoints/fetchServer";

const reservationTypeSchema = z.enum([
  "CLASS",
  "EXAM",
  "TEST",
  "LECTURE",
  "CONSULTATIONS",
  "CONFERENCE",
  "STUDENTS_CLUB_MEETING",
  "EVENT",
]);

export type ReservationType = z.infer<typeof reservationTypeSchema>;

const reservationSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  date: z.string(),
  startTime: z.string(),
  endTime: z.string(),
  classroom: z.object({
    id: z.string(),
    name: z.string(),
    capacity: z.number(),
  }),
  type: reservationTypeSchema,
  numberOfParticipants: z.number(),
});

const classroomSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  capacity: z.number(),
  equipmentIds: z.array(z.string()),
});

const equipmentSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export type Reservation = {
  id: string;
  title: string;
  description: string;
  date: string;
  startTime: number;
  endTime: number;
  classroom: {
    id: string;
    name: string;
    capacity: number;
  };
  type: ReservationType;
  numberOfParticipants: number;
};
export type Classroom = z.infer<typeof classroomSchema>;
export type Equipment = z.infer<typeof equipmentSchema>;

//searchParams prepared for the future
export default async function ReservationPage({
  searchParams,
}: {
  searchParams: { date: string };
}) {
  const lastMonday = new Date(2024, 10, 30);
  lastMonday.setDate(lastMonday.getDate() - 1);
  const mondayDate = new Date(
    Number(searchParams.date) || lastMonday.getTime(),
  );
  console.log(searchParams.date, new Date(searchParams.date));
  const queryDate = mondayDate.toISOString().split("T")[0];

  const weekReservations = (
    await fetchGet(
      `http://localhost:8080/reservations/week?startDay=${queryDate}`,
      z.array(reservationSchema),
    )
  ).map((reservation) => ({
    ...reservation,
    startTime: toTimestamp(reservation.date + "T" + reservation.startTime),
    endTime: toTimestamp(reservation.date + "T" + reservation.endTime),
  }));

  const availableRooms = ["2.41", "1.38", "3.33", "4.22", "3.11", "2.22"];
  const equipment = ["Computers", "Routers", "Terminals"];
  const classrooms = [
    {
      id: "1",
      name: "2.41",
      description: "Big classroom",
      capacity: 150,
      equipmentIds: ["1", "2"],
    },
    {
      id: "2",
      name: "1.38",
      description: "Small classroom",
      capacity: 50,
      equipmentIds: ["1", "3"],
    },
    {
      id: "3",
      name: "3.33",
      description: "Medium classroom",
      capacity: 100,
      equipmentIds: ["2", "3"],
    },
  ] satisfies Classroom[];
  const equipments = [
    { id: "1", name: "Computers" },
    { id: "2", name: "Routers" },
    { id: "3", name: "Terminals" },
  ] satisfies Equipment[];

  return (
    <main>
      <CalendarPageContent
        {...{
          weekReservations,
          availableRooms,
          equipment,
          mondayDate,
          classrooms,
        }}
      />
    </main>
  );
}
