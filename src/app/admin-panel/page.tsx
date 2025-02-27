import { fetchGet } from "@/server-endpoints/fetchServer";
import { getEquipmentsSchema } from "@/schemas/equipmentSchemas";
import { getClassroomsSchema } from "@/schemas/classroomSchemas";
import AdminPanelList from "./_components/AdminPanelList";
import { getReservationsSchema } from "@/schemas/reservationSchemas";
import { toTimestamp } from "@/utils/DateUtils";
import { getExtraRoomsSchema } from "@/schemas/extraRoomSchemas";
import { HOST } from "@/server-endpoints/host";
import { getFloorsSchema } from "@/schemas/floorsSchema";
import { getBuildingName } from "@/auth/getBuildingName";

export default async function AdminPanel() {
  const buildingName = await getBuildingName();
  if (!buildingName) {
    return null;
  }
  const classroomsPromise = fetchGet(
    `${HOST}/buildings/${buildingName}/classrooms`,
    getClassroomsSchema,
    false,
    {
      cache: "force-cache",
      next: {
        tags: ["adminClassrooms"],
      },
    },
  );
  const extraRoomsPromise = fetchGet(
    `${HOST}/buildings/${buildingName}/extra-rooms`,
    getExtraRoomsSchema,
    false,
    {
      cache: "force-cache",
      next: {
        tags: ["adminExtraRooms"],
      },
    },
  );
  const reservationsPromise = fetchGet(
    `${HOST}/buildings/${buildingName}/reservations?day=2024-07-07`,
    getReservationsSchema,
    true,
    {
      cache: "force-cache",
      next: {
        tags: ["adminReservations"],
      },
    },
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
    `${HOST}/buildings/${buildingName}/floors`,
    getFloorsSchema,
    false,
    {
      cache: "force-cache",
      next: {
        tags: ["adminFloors"],
      },
    },
  );
  const equipments = await fetchGet(
    `${HOST}/equipments`,
    getEquipmentsSchema,
    false,
    {
      cache: "force-cache",
      next: {
        tags: ["adminEquipments"],
      },
    },
  );
  // const roles = await fetchGet(`${HOST}/buildings/${buildingName}/roles`, getRolesSchema);
  // const users = await fetchGet(`${HOST}/buildings/${buildingName}/users`, getUsersSchema);
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
    <main className="flex flex-row items-start justify-start gap-4 maxMD:justify-center">
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
