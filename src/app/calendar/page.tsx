import { CalendarPageContent } from "./_components/CalendarPageContent";
import { z } from "zod";
import { toTimestamp } from "@/utils/DateUtils";
import { fetchGet } from "@/server-endpoints/fetchServer";
import { getClassroomsSchema } from "@/schemas/classroomSchemas";
import { reservationSchema } from "@/schemas/reservationSchemas";
import { HOST } from "@/server-endpoints/host";
import { getRole } from "@/auth/getRole";

export default async function ReservationPage({
  searchParams,
}: {
  searchParams: { date: string };
}) {
  const role = await getRole();
  const lastMonday = new Date(2024, 11, 23, 9, 6, 0, 0);
  lastMonday.setDate(lastMonday.getDate());
  const mondayDate = new Date(
    Number(searchParams.date) || lastMonday.getTime(),
  );
  const queryDate = mondayDate.toISOString().split("T")[0];

  const userUpcomingReservations = (
    await fetchGet(
      `${HOST}/buildings/D17/reservations/user/week?startDay=${queryDate}`,
      z.array(reservationSchema),
      true,
    )
  ).map((reservation) => ({
    ...reservation,
    startTime: toTimestamp(reservation.date + "T" + reservation.startTime),
    endTime: toTimestamp(reservation.date + "T" + reservation.endTime),
  }));

  const userUpcomingReservationsMocked = [
    {
      id: "1",
      title: "Zajęcia z wdi",
      description: "Zajecia z wdi dla grupy 1",
      date: "2024-11-25",
      startTime: "09:00",
      endTime: "10:00",
      type: "Zajęcia",
      classroom: {
        id: "7f000101-93df-1bc5-8193-df8bd984000f",
        name: "1.38",
        modelKey: "138",
        capacity: 120,
      },
      numberOfParticipants: 10,
      recurringId: "1",
      recurringStartDate: "2024-11-25",
      recurringEndDate: "2024-12-30",
      recurringType: "EVERY_TWO_WEEKS",
    },
    {
      id: "2",
      title: "Zajęcia z wdi",
      description: "Zajecia z wdi dla grupy 1",
      date: "2024-12-09",
      startTime: "09:00",
      endTime: "10:00",
      type: "CLASS",
      classroom: {
        id: "7f000101-93df-1bc5-8193-df8bd984000f",
        name: "1.38",
        modelKey: "138",
        capacity: 120,
      },
      numberOfParticipants: 10,
      recurringId: "1",
      recurringStartDate: "2024-11-25",
      recurringEndDate: "2024-12-30",
      recurringType: "EVERY_TWO_WEEKS",
    },
    {
      id: "3",
      title: "Zajęcia z wdi",
      description: "Zajecia z wdi dla grupy 1",
      date: "2024-12-23",
      startTime: "09:00",
      endTime: "10:00",
      type: "CLASS",
      classroom: {
        id: "7f000101-93df-1bc5-8193-df8bd984000f",
        name: "1.38",
        modelKey: "138",
        capacity: 120,
      },
      numberOfParticipants: 10,
      recurringId: "1",
      recurringStartDate: "2024-11-25",
      recurringEndDate: "2024-12-30",
      recurringType: "EVERY_TWO_WEEKS",
    },
    {
      id: "4",
      title: "Kolokwium z wdi",
      description: "Kolokwium z wdi dla grupy 1",
      date: "2024-12-30",
      startTime: "09:00",
      endTime: "10:00",
      type: "TEST",
      classroom: {
        id: "7f000101-93df-1bc5-8193-df8bd984000f",
        name: "1.38",
        modelKey: "138",
        capacity: 120,
      },
      numberOfParticipants: 10,
    },
  ].map((reservation) => ({
    ...reservation,
    startTime: toTimestamp(reservation.date + "T" + reservation.startTime),
    endTime: toTimestamp(reservation.date + "T" + reservation.endTime),
  }));

  const weekReservations = (
    await fetchGet(
      `${HOST}/buildings/D17/reservations/week?startDay=${queryDate}`,
      z.array(reservationSchema),
      true,
    )
  ).map((reservation) => ({
    ...reservation,
    startTime: toTimestamp(reservation.date + "T" + reservation.startTime),
    endTime: toTimestamp(reservation.date + "T" + reservation.endTime),
  }));

  const classrooms = await fetchGet(
    `${HOST}/buildings/D17/classrooms`,
    getClassroomsSchema,
  );

  const availableRooms = classrooms.map((classroom) => classroom.name);

  const events = (
    await fetchGet(
      `${HOST}/buildings/D17/reservations/events`,
      z.array(reservationSchema),
    )
  ).map((event) => ({
    ...event,
    startTime: toTimestamp(event.date + "T" + event.startTime),
    endTime: toTimestamp(event.date + "T" + event.endTime),
  }));

  return (
    <main>
      <CalendarPageContent
        weekReservations={weekReservations.concat(
          userUpcomingReservationsMocked.filter((reservation) => {
            const mondayMidnight = new Date(mondayDate);
            mondayMidnight.setHours(0, 0, 0, 0);
            return (
              role &&
              new Date(reservation.date).getTime() >=
                mondayMidnight.getTime() &&
              new Date(reservation.date).getTime() <
                mondayMidnight.getTime() + 7 * 24 * 60 * 60 * 1000
            );
          }),
        )}
        availableRooms={availableRooms}
        mondayDate={mondayDate}
        classrooms={classrooms}
        userUpcomingReservations={userUpcomingReservations.concat(
          userUpcomingReservationsMocked.filter((reservation) => {
            const mondayMidnight = new Date(mondayDate);
            mondayMidnight.setHours(0, 0, 0, 0);
            return (
              role &&
              new Date(reservation.date).getTime() >=
                mondayMidnight.getTime() &&
              new Date(reservation.date).getTime() <
                mondayMidnight.getTime() + 7 * 24 * 60 * 60 * 1000
            );
          }),
        )}
        events={events}
        role={role}
      />
    </main>
  );
}
