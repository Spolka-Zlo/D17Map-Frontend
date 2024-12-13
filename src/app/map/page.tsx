import { fetchGet } from "@/server-endpoints/fetchServer";
import { MapPageContent } from "./_components/MapPageContent";
import { getEquipmentsSchema } from "@/schemas/equipmentSchemas";
import { getClassroomsSchema } from "@/schemas/classroomSchemas";
import { getExtraRoomsSchema } from "@/schemas/extraRoomsSchema";
import { getFloorsSchema } from "@/schemas/floorsSchema";

export default async function Map() {
  const floors = await fetchGet(
    "http://localhost:8080/floors",
    getFloorsSchema,
  );

  const equipments = await fetchGet(
    "http://localhost:8080/equipments",
    getEquipmentsSchema,
  );

  const classrooms = await fetchGet(
    "http://localhost:8080/classrooms",
    getClassroomsSchema,
  );

  const extraRooms = await fetchGet(
    "http://localhost:8080/extra-rooms",
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
