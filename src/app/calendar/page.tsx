import { CalendarReservationsSection } from "./_components/CalendarReservationsSection";
import { CalendarSection } from "./_components/CalendarSection";
import { z } from "zod";

export type ReservationType = "Lecture" | "Consultation" | "Exam";

const toTimestamp = (date: string) => new Date(date).getTime();
const reservationSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  date: z.string(),
  startTime: z.string().transform(toTimestamp),
  endTime: z.string().transform(toTimestamp),
  classRoom: z.object({
    id: z.string(),
    name: z.string(),
    capacity: z.number(),
  }),
  type: z.enum(["Lecture", "Consultation", "Exam"]),
  numberOfParticipants: z.number(),
});

const reservationTypeSchema = z.enum(["Lecture", "Consultation", "Exam"]);

export type Reservation = z.infer<typeof reservationSchema>;

export default function Reservation({
  searchParams,
}: {
  searchParams: { date: string };
}) {
  console.log(searchParams.date);
  const lastMonday = new Date();
  lastMonday.setDate(lastMonday.getDate() - ((lastMonday.getDay() + 6) % 7));
  const mondayDate = new Date(
    Number(searchParams.date) ?? lastMonday.getTime(),
  );

  console.log(mondayDate);

  const weekReservations = [
    {
      id: "1",
      title: "Lecture",
      description: "Lecture about React",
      date: "2024-11-01",
      startTime: new Date(2024, 11, 1, 12, 45).getTime(),
      endTime: new Date(2024, 11, 1, 14, 30).getTime(),
      classRoom: {
        id: "1",
        name: "2.41",
        capacity: 150,
      },
      type: "Lecture",
      numberOfParticipants: 100,
    },
    {
      id: "2",
      title: "Exam",
      description: "Exam about React",
      date: "2024-10-28",
      startTime: new Date(2024, 10, 28, 10, 15).getTime(),
      endTime: new Date(2024, 10, 28, 12, 30).getTime(),
      classRoom: {
        id: "2",
        name: "1.38",
        capacity: 250,
      },
      type: "Exam",
      numberOfParticipants: 180,
    },
    {
      id: "3",
      title: "Consultation",
      description: "Consultation about React",
      date: "2024-10-30",
      startTime: new Date(2024, 10, 30, 14, 45).getTime(),
      endTime: new Date(2024, 10, 30, 16, 30).getTime(),
      classRoom: {
        id: "3",
        name: "3.33",
        capacity: 20,
      },
      type: "Consultation",
      numberOfParticipants: 15,
    },
  ] satisfies Reservation[];
  const availableRooms = ["2.41", "1.38", "3.33", "4.22", "3.11", "2.22"];
  const equipment = ["Computers", "Routers", "Terminals"];

  return (
    <main>
      <div className="flex justify-stretch gap-10">
        <CalendarSection
          reservations={weekReservations}
          availableRooms={availableRooms}
          equipment={equipment}
          mondayDate={mondayDate.getTime()}
        />
        <div className="border-l-4 border-black"></div>
        <CalendarReservationsSection
          weekUserReservations={weekReservations}
          mondayDate={mondayDate.getTime()}
        />
      </div>
    </main>
  );
}
