import { fetchGet } from "@/server-endpoints/fetchServer";
import { MapPageContent } from "./_components/MapPageContent";
import { getEquipmentsSchema } from "@/schemas/equipmentSchemas";
import { getClassroomsSchema } from "@/schemas/classroomSchemas";
import { getExtraRoomsSchema } from "@/schemas/extraRoomSchemas";
import { getFloorsSchema } from "@/schemas/floorsSchema";
import { z } from "zod";
import { HOST } from "@/server-endpoints/host";

export default async function Map() {
  const floors = await fetchGet(`${HOST}/floors`, getFloorsSchema);

  const equipments = await fetchGet(`${HOST}/equipments`, getEquipmentsSchema);

  const classrooms = await fetchGet(`${HOST}/classrooms`, getClassroomsSchema);

  const extraRooms = await fetchGet(`${HOST}/extra-rooms`, getExtraRoomsSchema);

  const reservationTypes = await fetchGet(
    `${HOST}/reservations/types`,
    z.array(z.string()),
  );

  return (
    <main>
      <MapPageContent
        equipments={equipments}
        classrooms={classrooms}
        extraRooms={extraRooms}
        floors={floors}
        reservationTypes={reservationTypes}
      />
    </main>
  );
}
