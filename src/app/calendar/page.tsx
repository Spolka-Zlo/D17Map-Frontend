import { CalendarPageContent } from "./_components/CalendarPageContent";
import { z } from "zod";
import { toTimestamp } from "@/utils/DateUtils";
import { fetchGet } from "@/server-endpoints/fetchServer";
import { getEquipmentsSchema } from "@/schemas/equipmentSchemas";
import { getClassroomsSchema } from "@/schemas/classroomSchemas";
import { reservationSchema } from "@/schemas/reservationSchemas";
import { HOST } from "@/server-endpoints/host";

export default async function ReservationPage({
  searchParams,
}: {
  searchParams: { date: string };
}) {
  const lastMonday = new Date(2024, 10, 25, 9, 6, 0, 0);
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
      recurringType: "BIWEEKLY",
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
      recurringType: "BIWEEKLY",
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
      recurringType: "BIWEEKLY",
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

  const equipments = await fetchGet(`${HOST}/equipments`, getEquipmentsSchema);

  const classrooms = await fetchGet(
    `${HOST}/buildings/D17/classrooms`,
    getClassroomsSchema,
  );

  const availableRooms = classrooms.map((classroom) => classroom.name);

  return (
    <main>
      <CalendarPageContent
        weekReservations={weekReservations}
        availableRooms={availableRooms}
        equipments={equipments}
        mondayDate={mondayDate}
        classrooms={classrooms}
        userUpcomingReservations={userUpcomingReservationsMocked.filter(
          (reservation) => {
            console.log(
              new Date(reservation.date).getTime(),
              mondayDate.getTime(),
              mondayDate.getTime() + 7 * 24 * 60 * 60 * 1000,
              queryDate,
              new Date(reservation.date),
            );
            const data = new Date(mondayDate);
            data.setHours(0, 0, 0, 0);
            return (
              new Date(reservation.date).getTime() >= data.getTime() &&
              new Date(reservation.date).getTime() <
                data.getTime() + 7 * 24 * 60 * 60 * 1000
            );
          },
        )}
      />
    </main>
  );
}
