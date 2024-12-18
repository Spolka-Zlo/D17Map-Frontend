import { fetchGet } from "@/server-endpoints/fetchServer";
import { getEquipmentsSchema } from "@/schemas/equipmentSchemas";
import { getClassroomsSchema } from "@/schemas/classroomSchemas";
import AdminPanelList from "./_components/AdminPanelList";
import { getReservationsSchema } from "@/schemas/reservationSchemas";
import { toTimestamp } from "@/utils/DateUtils";
import { getExtraRoomsSchema } from "@/schemas/extraRoomSchemas";
import { HOST } from "@/server-endpoints/host";

export default async function AdminPanel() {
  const classroomsPromise = fetchGet(
    `${HOST}/buildings/D17/classrooms`,
    getClassroomsSchema,
  );
  const extraRoomsPromise = fetchGet(
    `${HOST}/buildings/D17/extra-rooms`,
    getExtraRoomsSchema,
  );
  const reservationsPromise = fetchGet(
    `${HOST}/buildings/D17/reservations?day=2024-07-07`,
    getReservationsSchema,
    true,
  ).then((reservations) =>
    reservations.map((reservation) => ({
      ...reservation,
      startTime: toTimestamp(reservation.date + "T" + reservation.startTime),
      endTime: toTimestamp(reservation.date + "T" + reservation.endTime),
    })),
  );
  const [classrooms, extraRooms, reservations] = await Promise.all([
    classroomsPromise,
    extraRoomsPromise,
    reservationsPromise,
  ]);

  const equipments = await fetchGet(`${HOST}/equipments`, getEquipmentsSchema);

  return (
    <main className="flex flex-row items-start justify-start gap-4">
      <AdminPanelList
        equipments={equipments}
        classrooms={classrooms}
        extraRooms={extraRooms}
        reservations={reservations}
      />
    </main>
  );
}
