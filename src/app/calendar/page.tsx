import { CalendarPageContent } from "./_components/CalendarPageContent";
import { z } from "zod";
import { toTimestamp } from "@/utils/DateUtils";
import { fetchGet } from "@/server-endpoints/fetchServer";
import { getClassroomsSchema } from "@/schemas/classroomSchemas";
import { reservationSchema } from "@/schemas/reservationSchemas";
import { HOST } from "@/server-endpoints/host";
import { getRole } from "@/auth/getRole";
import { getBuildingName } from "@/auth/getBuildingName";

export default async function ReservationPage({
  searchParams,
}: {
  searchParams: { date: string };
}) {
  const role = await getRole();
  const buildingName = (await getBuildingName()) || "D17";
  const lastMonday = new Date(2024, 11, 23, 9, 6, 0, 0);
  lastMonday.setDate(lastMonday.getDate());
  const mondayDate = new Date(
    Number(searchParams.date) || lastMonday.getTime(),
  );
  const queryDate = mondayDate.toISOString().split("T")[0];

  const userUpcomingReservations = (
    await fetchGet(
      `${HOST}/buildings/${buildingName}/reservations/user/week?startDay=${queryDate}`,
      z.array(reservationSchema),
      true,
      {
        cache: "force-cache",
        next: {
          tags: ["userReservations", "adminReservations"],
        },
      },
    )
  ).map((reservation) => ({
    ...reservation,
    startTime: toTimestamp(reservation.date + "T" + reservation.startTime),
    endTime: toTimestamp(reservation.date + "T" + reservation.endTime),
  }));

  const weekReservations = (
    await fetchGet(
      `${HOST}/buildings/${buildingName}/reservations/week?startDay=${queryDate}`,
      z.array(reservationSchema),
      true,
      {
        cache: "force-cache",
        next: {
          tags: ["userReservations", "adminReservations"],
        },
      },
    )
  ).map((reservation) => ({
    ...reservation,
    startTime: toTimestamp(reservation.date + "T" + reservation.startTime),
    endTime: toTimestamp(reservation.date + "T" + reservation.endTime),
  }));

  const classrooms = await fetchGet(
    `${HOST}/buildings/${buildingName}/classrooms`,
    getClassroomsSchema,
  );

  const availableRooms = classrooms.map((classroom) => classroom.name);

  const events = (
    await fetchGet(
      `${HOST}/buildings/${buildingName}/reservations/events`,
      z.array(reservationSchema),
      false,
      {
        cache: "force-cache",
        next: {
          revalidate: 3600,
        },
      },
    )
  ).map((event) => ({
    ...event,
    startTime: toTimestamp(event.date + "T" + event.startTime),
    endTime: toTimestamp(event.date + "T" + event.endTime),
  }));

  return (
    <main>
      <CalendarPageContent
        weekReservations={weekReservations}
        availableRooms={availableRooms}
        mondayDate={mondayDate}
        classrooms={classrooms}
        userUpcomingReservations={userUpcomingReservations}
        events={events}
        role={role}
      />
    </main>
  );
}
