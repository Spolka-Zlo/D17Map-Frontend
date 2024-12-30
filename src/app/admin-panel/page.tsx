import { fetchGet } from "@/server-endpoints/fetchServer";
import { getEquipmentsSchema } from "@/schemas/equipmentSchemas";
import { getClassroomsSchema } from "@/schemas/classroomSchemas";
import AdminPanelList from "./_components/AdminPanelList";
import { getReservationsSchema } from "@/schemas/reservationSchemas";
import { toTimestamp } from "@/utils/DateUtils";
import { getExtraRoomsSchema } from "@/schemas/extraRoomSchemas";
import { HOST } from "@/server-endpoints/host";
import { getFloorsSchema } from "@/schemas/floorsSchema";

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

  const floors = await fetchGet(
    `${HOST}/buildings/D17/floors`,
    getFloorsSchema,
  );
  const equipments = await fetchGet(`${HOST}/equipments`, getEquipmentsSchema);
  // const roles = await fetchGet(`${HOST}/roles`, getRolesSchema);
  const roles = [
    {
      id: "1",
      name: "ADMIN",
      included: {
        all: true,
      },
    },
    {
      id: "2",
      name: "STUDENT",
      excluded: {
        all: true,
      },
    },
    {
      id: "3",
      name: "TEACHER_1",
      included: {
        all: false,
        floors: ["1", "2"],
        classrooms: ["3.33", "4.31"],
      },
    },
  ];

  const users = [
    {
      id: "1",
      username: "j.doe@gmail.ccc",
      roles: ["ADMIN"],
    },
    {
      id: "2",
      username: "jane.doe@gmail.ccc",
      roles: ["STUDENT"],
    },
    {
      id: "3",
      username: "john.smith@gmail.ccc",
      roles: ["TEACHER_1"],
    },
  ];

  return (
    <main className="flex flex-row items-start justify-start gap-4">
      <AdminPanelList
        equipments={equipments}
        classrooms={classrooms}
        extraRooms={extraRooms}
        reservations={reservations}
        roles={roles}
        floors={floors}
        users={users}
      />
    </main>
  );
}
