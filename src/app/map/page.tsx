import { fetchGet } from "@/server-endpoints/fetchServer";
import { MapPageContent } from "./_components/MapPageContent";
import { getEquipmentsSchema } from "@/schemas/equipmentSchemas";
import { getClassroomsSchema } from "@/schemas/classroomSchemas";
import { getExtraRoomsSchema } from "@/schemas/extraRoomSchemas";
import { getFloorsSchema } from "@/schemas/floorsSchema";
import { HOST } from "@/server-endpoints/host";
import { getBuildingName } from "@/auth/getBuildingName";

export default async function Map() {
  const buildingName = (await getBuildingName()) || "D17";
  const floors = await fetchGet(
    `${HOST}/buildings/${buildingName}/floors`,
    getFloorsSchema,
  );

  const equipments = await fetchGet(`${HOST}/equipments`, getEquipmentsSchema);

  const classrooms = await fetchGet(
    `${HOST}/buildings/${buildingName}/classrooms`,
    getClassroomsSchema,
  );

  const extraRooms = await fetchGet(
    `${HOST}/buildings/${buildingName}/extra-rooms`,
    getExtraRoomsSchema,
  );

  return (
    <main>
      <MapPageContent
        equipments={equipments}
        classrooms={classrooms}
        extraRooms={extraRooms}
        floors={floors}
      />
    </main>
  );
}
