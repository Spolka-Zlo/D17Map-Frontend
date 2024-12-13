"use client";
import { Dispatch, SetStateAction, useState } from "react";
import { MapScene } from "./MapScene";
import { MapMenu } from "./map-menu/MapMenu";
import { Classroom } from "@/schemas/classroomSchemas";
import { Equipment } from "@/schemas/equipmentSchemas";
import { ExtraRoom } from "@/schemas/extraRoomsSchema";
import { MapRoomInformation } from "./MapRoomInformation";
import { SearchBar } from "@/components/SearchBar";
import { Floor } from "@/schemas/floorsSchema";

type MapSectionProps = {
  clickedRoom: string | null;
  setClickedRoom: Dispatch<SetStateAction<string | null>>;
  classrooms: Classroom[];
  equipments: Equipment[];
  extraRooms: ExtraRoom[];
  extraRoomsTypes: string[];
  floors: Floor[];
};

export function MapSection({
  clickedRoom,
  setClickedRoom,
  classrooms,
  equipments,
  extraRooms,
  extraRoomsTypes,
  floors,
}: MapSectionProps) {
  const [floor, setFloor] = useState(floors[0].floorName);
  const [activeRooms, setActiveRooms] = useState<string[]>([]);

  const isExtraRoom = (room: string) =>
    extraRooms.some((e) => e.modelKey === room);

  const getRoomInformation = () => {
    if (!clickedRoom) return null;

    const roomData: Classroom | ExtraRoom | undefined = isExtraRoom(clickedRoom)
      ? extraRooms.find((room) => room.name.replace(".", "") === clickedRoom)
      : classrooms.find((room) => room.name.replace(".", "") === clickedRoom);

    return (
      <MapRoomInformation
        classroom={
          !isExtraRoom(clickedRoom) ? (roomData as Classroom) : undefined
        }
        extraRoom={
          isExtraRoom(clickedRoom) ? (roomData as ExtraRoom) : undefined
        }
        floor={floor}
        equipments={equipments}
      />
    );
  };

  return (
    <div className="relative">
      <SearchBar onChange={setClickedRoom} />
      <div className="h-[70vh] w-[60vw]">
        <MapScene
          floor={floor}
          clickedRoom={clickedRoom}
          setClickedRoom={setClickedRoom}
          extraRooms={extraRooms}
        />
      </div>
      {getRoomInformation()}
      <MapMenu
        floor={floor}
        setFloor={setFloor}
        extraRoomsTypes={extraRoomsTypes}
        activeRooms={activeRooms}
        setActiveRooms={setActiveRooms}
        floors={floors}
      />
    </div>
  );
}
