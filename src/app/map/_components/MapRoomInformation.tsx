import { Classroom } from "@/schemas/classroomSchemas";
import { ExtraRoom } from "@/schemas/extraRoomSchemas";

type MapRoomInformationProps = {
  classroom?: Classroom;
  extraRoom?: ExtraRoom;
  floor: string;
};

export function MapRoomInformation({
  classroom,
  extraRoom,
  floor,
}: MapRoomInformationProps) {
  if (classroom)
    return (
      <div className="absolute right-20 top-0 rounded-md bg-white/25 p-4 maxMD:hidden">
        <h1 className="text-2xl font-bold">
          Piętro {floor.replace("Floor ", "")}
        </h1>
        <p>Sala {classroom.name.slice(0, 1) + classroom.name.slice(1)}</p>
      </div>
    );
  else if (extraRoom)
    return (
      <div className="absolute right-20 top-0 rounded-md bg-white/25 p-4 maxMD:hidden">
        <h1 className="text-2xl font-bold">
          Piętro {floor.replace("Floor ", "")}
        </h1>
        <p>Sala {extraRoom.name.slice(0, 1) + extraRoom.name.slice(1)}</p>
      </div>
    );

  return null;
}
