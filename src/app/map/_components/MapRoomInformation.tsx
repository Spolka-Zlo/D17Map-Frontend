import { Classroom } from "@/schemas/classroomSchemas";
import { Equipment } from "@/schemas/equipmentSchemas";
import { ExtraRoom } from "@/schemas/extraRoomSchemas";
import Link from "next/link";

type MapRoomInformationProps = {
  classroom?: Classroom;
  extraRoom?: ExtraRoom;
  floor: string;
  equipments: Equipment[];
};

export function MapRoomInformation({
  classroom,
  extraRoom,
  floor,
  equipments,
}: MapRoomInformationProps) {
  if (classroom)
    return (
      <div className="absolute right-20 top-0 rounded-md bg-white/25 p-4">
        <h1 className="text-2xl font-bold">
          Piętro {floor.replace("Floor ", "")}
        </h1>
        <p>Sala {classroom.name.slice(0, 1) + "." + classroom.name.slice(1)}</p>
        <ul className="flex gap-1">
          {classroom.equipmentIds.map((equipmentId) => (
            <li key={equipmentId}>
              {equipments.find((e) => e.id === equipmentId)?.name}
            </li>
          ))}
        </ul>
      </div>
    );
  else if (extraRoom)
    return (
      <div className="absolute right-20 top-0 rounded-md bg-white/25 p-4">
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold">
            Piętro {floor.replace("Floor ", "")}
          </h1>
          <p>{extraRoom.name}</p>
          <p>{extraRoom.description}</p>
          <p>Tutaj będzie dłuższy opis, jakieś linki do strony itp</p>
          <Link
            className="text-accent"
            href={"https://www.informatyka.agh.edu.pl/pl/"}
          >
            Więcej informacji na stronie internetowej
          </Link>
        </div>
      </div>
    );

  return null;
}
