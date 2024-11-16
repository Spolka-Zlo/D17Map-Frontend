import { CalendarPageContent } from "./_components/CalendarPageContent";
import { z } from "zod";
import { toTimestamp } from "@/utils/DateUtils";
import { fetchGet } from "@/server-endpoints/fetchServer";

const reservationTypeSchema = z.string();

export type ReservationType =
  | "CLASS"
  | "EXAM"
  | "TEST"
  | "LECTURE"
  | "CONSULTATIONS"
  | "CONFERENCE"
  | "STUDENTS_CLUB_MEETING"
  | "EVENT";

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
  type: string;
  numberOfParticipants: number;
};
export type Classroom = z.infer<typeof classroomSchema>;
export type Equipment = z.infer<typeof equipmentSchema>;

export default async function ReservationPage({
  searchParams,
}: {
  searchParams: { date: string };
}) {
  const lastMonday = new Date(2024, 9, 30);
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

  const reservationTypes = (
    await fetchGet(
      "http://localhost:8080/reservations/types",
      z.array(reservationTypeSchema),
    )
  ).map((type: string) => type as ReservationType);

  const equipments = await fetchGet(
    "http://localhost:8080/equipments",
    z.array(equipmentSchema),
  );

  const classrooms = await fetchGet(
    "http://localhost:8080/classrooms",
    z.array(classroomSchema),
  );

  const availableRooms = classrooms.map((classroom) => classroom.name);

  return (
    <main>
      <CalendarPageContent
        {...{
          weekReservations,
          availableRooms,
          equipments,
          mondayDate,
          classrooms,
          reservationTypes,
        }}
      />
    </main>
  );
}
