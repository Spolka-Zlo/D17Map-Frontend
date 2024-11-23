import { CalendarPageContent } from "./_components/CalendarPageContent";
import { z } from "zod";
import { toTimestamp } from "@/utils/DateUtils";
import { fetchGet } from "@/server-endpoints/fetchServer";
import { getEquipmentsSchema } from "@/schemas/equipmentSchemas";
import { getClassroomsSchema } from "@/schemas/classroomSchemas";
import { reservationSchema } from "@/schemas/reservationSchemas";

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

  const reservationTypes = await fetchGet(
    "http://localhost:8080/reservations/types",
    z.array(z.string()),
  );

  const equipments = await fetchGet(
    "http://localhost:8080/equipments",
    getEquipmentsSchema,
  );

  const classrooms = await fetchGet(
    "http://localhost:8080/classrooms",
    getClassroomsSchema,
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
