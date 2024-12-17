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
import { Dropdown } from "@/components/Dropdown";
import { UpArrow } from "../UpArrow";
import Image from "next/image";
import { twMerge } from "tailwind-merge";

type MoveFloor = "UP" | "DOWN" | "NONE";

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
  setShowMoveFloor: Dispatch<SetStateAction<MoveFloor>>,
  setDestinationFloor: Dispatch<SetStateAction<string>>,
) {
  const handleRoomChange = (room: Classroom | ExtraRoom) => {
    if (room.floorName !== currentFloor) {
      const movingDevice = extraRooms.find(
        (r) => r.type === "Klatki schodowe" && r.floorName === currentFloor,
      );
      const finishFloorMovingDevice = extraRooms.find(
        (r) => r.type === "Klatki schodowe" && r.floorName === room.floorName,
      );
      setLightRoom(movingDevice?.modelKey || "");
      setShowMoveFloor(room.floorName > currentFloor ? "UP" : "DOWN");
      setDestinationFloor(room.floorName);
      setTimeout(() => {
        setLightRoom(finishFloorMovingDevice?.modelKey || "");
        setShowMoveFloor("NONE");
        setFloor(room.floorName);
        setClickedRoom(room.modelKey);
        setTimeout(() => {
          setLightRoom("");
        }, 4000);
      }, 6000);
    }
    setClickedRoom(room.modelKey);
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
  const [activeRooms, setActiveRooms] = useState<string[]>(extraRoomsTypes);
  const [lightRoom, setLightRoom] = useState<string>("");
  const [showMoveFloor, setShowMoveFloor] = useState<MoveFloor>("NONE");
  const [destinationFloor, setDestinationFloor] = useState<string>("");

  const isExtraRoom = (room: string) =>
    extraRooms.some((e) => e.modelKey === room);

  const getRoomInformation = () => {
    if (!clickedRoom) return null;

    const roomData: Classroom | ExtraRoom | undefined = isExtraRoom(clickedRoom)
      ? extraRooms.find((room) => room.modelKey === clickedRoom)
      : classrooms.find((room) => room.modelKey === clickedRoom);

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
    <div className="relative p-5">
      <div className="z-50 flex w-full items-center justify-start gap-5 p-2">
        <Dropdown
          selected={floor}
          setSelected={setFloor}
          options={floors.map((f) => f.floorName)}
        />
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
              setShowMoveFloor,
              setDestinationFloor,
            )
          }
        />
      </div>
      <div className="h-[70vh] w-[60vw]">
        {showMoveFloor !== "NONE" && (
          <div className="absolute left-1/2 top-40 -translate-x-1/2 -translate-y-1/2 transform animate-pulse text-center text-3xl duration-[3000]">
            {destinationFloor}
          </div>
        )}
        <Image
          className={twMerge(
            "absolute left-0 right-0 top-60 mx-auto animate-pulse transition-transform duration-[3000] ease-in-out",
            showMoveFloor === "UP"
              ? "translate-y-full"
              : showMoveFloor === "DOWN"
                ? "-translate-y-full rotate-180"
                : "hidden",
          )}
          src="/svg/up.svg"
          alt="down"
          width={44}
          height={44}
        />
        <MapScene
          floor={floor}
          clickedRoom={clickedRoom}
          setClickedRoom={setClickedRoom}
          extraRooms={extraRooms}
          lightRoom={lightRoom}
          activeRooms={activeRooms}
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
