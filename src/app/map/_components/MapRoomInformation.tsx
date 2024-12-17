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
        <p>Sala {classroom.name.slice(0, 1) + classroom.name.slice(1)}</p>
      </div>
    );
  else if (extraRoom)
    return (
      <div className="absolute right-20 top-0 rounded-md bg-white/25 p-4">
        <h1 className="text-2xl font-bold">
          Piętro {floor.replace("Floor ", "")}
        </h1>
        <p>Sala {extraRoom.name.slice(0, 1) + extraRoom.name.slice(1)}</p>
      </div>
    );

  return null;
}
