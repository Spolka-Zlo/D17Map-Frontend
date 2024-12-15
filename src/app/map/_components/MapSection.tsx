"use client";
import { Dispatch, SetStateAction, useState } from "react";
import { MapScene } from "./MapScene";
import { MapMenu } from "./map-menu/MapMenu";
import { Classroom } from "@/schemas/classroomSchemas";
import { Equipment } from "@/schemas/equipmentSchemas";
import { ExtraRoom } from "@/schemas/extraRoomSchemas";
import { MapRoomInformation } from "./MapRoomInformation";
import { SearchBar } from "@/components/SearchBar";
import { Floor } from "@/schemas/floorsSchema";

type Room = Classroom | ExtraRoom;

type MapSectionProps = {
  clickedRoom: string | null;
  setClickedRoom: Dispatch<SetStateAction<string | null>>;
  classrooms: Classroom[];
  equipments: Equipment[];
  extraRooms: ExtraRoom[];
  extraRoomsTypes: string[];
  floors: Floor[];
};

function searchForRoom(
  input: string,
  classrooms: Classroom[],
  extraRooms: ExtraRoom[],
  currentFloor: string,
  setLightRoom: Dispatch<SetStateAction<string>>,
  setClickedRoom: Dispatch<SetStateAction<string | null>>,
  setFloor: Dispatch<SetStateAction<string>>,
) {
  const handleRoomChange = (room: Classroom | ExtraRoom) => {
    if (room.floorName !== currentFloor) {
      const movingDevice = extraRooms.find(
        (r) => r.type === "Klatki schodowe" && r.floorName === currentFloor,
      );
      console.log(currentFloor, movingDevice);
      setLightRoom(movingDevice?.modelKey || "");
      setTimeout(() => {
        setLightRoom("");
        setClickedRoom(room.modelKey);
        setFloor(room.floorName);
      }, 3000);
    }
  };
  const room = classrooms.find((c) => c.name.replace(".", "") === input);
  const extraRoom = extraRooms.find((e) => e.name.replace(".", "") === input);
  if (room) handleRoomChange(room);

  if (extraRoom) handleRoomChange(extraRoom);
}

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
  const [lightRoom, setLightRoom] = useState<string>("");

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
      <SearchBar
        onChange={(input: string) =>
          searchForRoom(
            input,
            classrooms,
            extraRooms,
            floor,
            setLightRoom,
            setClickedRoom,
            setFloor,
          )
        }
      />
      <div className="h-[70vh] w-[60vw]">
        <MapScene
          floor={floor}
          clickedRoom={clickedRoom}
          setClickedRoom={setClickedRoom}
          extraRooms={extraRooms}
          lightRoom={lightRoom}
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
