import { fetchGet } from "@/server-endpoints/fetchServer";
import { MapPageContent } from "./_components/MapPageContent";
import { getEquipmentsSchema } from "@/schemas/equipmentSchemas";
import { getClassroomsSchema } from "@/schemas/classroomSchemas";
import { ExtraRoom } from "@/schemas/extraRoomsSchema";

export default async function Map() {
  const equipments = await fetchGet(
    "http://localhost:8080/equipments",
    getEquipmentsSchema,
  );

  const classrooms = await fetchGet(
    "http://localhost:8080/classrooms",
    getClassroomsSchema,
  );

  const extraRooms = [
    {
      id: "133E",
      name: "1.33",
      description: "A nice students' cafeteria",
      modelKey: "133",
      type: "CAFETERIA",
    },
    {
      id: "2",
      name: "E.9",
      description: "A woman toilet",
      modelKey: "E9",
      type: "TOILET",
    },
    {
      id: "3",
      name: "E.7",
      description: "A man toilet",
      modelKey: "E7",
      type: "TOILET",
    },
    {
      id: "4",
      name: "1.1",
      description: "Stairs",
      modelKey: "11",
      type: "STAIRS",
    },
    {
      id: "14",
      name: "1.4",
      description: "Elevators",
      modelKey: "14",
      type: "ELEVATOR",
    },
  ] satisfies ExtraRoom[];

  // TODO: fetch extra rooms when implemented in the backend
  // const extraRooms = await fetchGet(
  //   "http://localhost:8080/extra-rooms",
  //   extraRoomsSchema,
  // )

  return (
    <main>
      <MapPageContent
        equipments={equipments}
        classrooms={classrooms}
        extraRooms={extraRooms}
      />
    </main>
  );
}
