"use client";
import { Dispatch, SetStateAction, useState } from "react";
import { MapScene } from "./MapScene";
import { MapMenu } from "./MapMenu";
import { Classroom } from "@/schemas/classroomSchemas";
import { Equipment } from "@/schemas/equipmentSchemas";
import { ExtraRoom } from "@/schemas/extraRoomsSchema";
import { MapRoomInformation } from "./MapRoomInformation";

type MapSectionProps = {
  clickedRoom: string | null;
  setClickedRoom: Dispatch<SetStateAction<string | null>>;
  classrooms: Classroom[];
  equipments: Equipment[];
  extraRooms: ExtraRoom[];
};

export function MapSection({
  clickedRoom,
  setClickedRoom,
  classrooms,
  equipments,
  extraRooms,
}: MapSectionProps) {
  const [floor, setFloor] = useState("Floor 1");
  return (
    <div className="relative">
      <div className="h-[70vh] w-[60vw]">
        <MapScene
          floor={floor}
          clickedRoom={clickedRoom}
          setClickedRoom={setClickedRoom}
          extraRooms={extraRooms}
        />
      </div>
      {clickedRoom &&
      !extraRooms.map((e) => e.modelKey).includes(clickedRoom) ? (
        <MapRoomInformation
          classroom={classrooms.find(
            (c) => c.name.replace(".", "") === clickedRoom,
          )}
          floor={floor}
          equipments={equipments}
        />
      ) : (
        clickedRoom && (
          <MapRoomInformation
            extraRoom={extraRooms.find(
              (c) => c.name.replace(".", "") === clickedRoom,
            )}
            floor={floor}
            equipments={equipments}
          />
        )
      )}
      <MapMenu floor={floor} setFloor={setFloor} />
    </div>
  );
}
