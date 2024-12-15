"use client";

import { Classroom } from "@/schemas/classroomSchemas";
import { Equipment } from "@/schemas/equipmentSchemas";
import { ExtraRoom } from "@/schemas/extraRoomSchemas";
import { useState } from "react";
import { MapSection } from "./MapSection";
import { Floor } from "@/schemas/floorsSchema";

type MapPageContentProps = {
  classrooms: Classroom[];
  equipments: Equipment[];
  extraRooms: ExtraRoom[];
  floors: Floor[];
};

export function MapPageContent({
  classrooms,
  equipments,
  extraRooms,
  floors,
}: MapPageContentProps) {
  const [clickedRoom, setClickedRoom] = useState<string | null>(null);
  const extraRoomsTypes = extraRooms
    .map((e) => e.type)
    .reduce((acc: string[], curr) => {
      if (!acc.includes(curr)) {
        acc.push(curr);
      }
      return acc;
    }, []);

  return (
    <div className="flex h-[81vh] w-full flex-row justify-stretch">
      <MapSection
        clickedRoom={clickedRoom}
        setClickedRoom={setClickedRoom}
        classrooms={classrooms}
        equipments={equipments}
        extraRooms={extraRooms}
        extraRoomsTypes={extraRoomsTypes}
        floors={floors}
      />
      <div className="border-l-4 border-black"></div>
      <div className="w-full p-10">
        <h1 className="text-2xl font-bold">{clickedRoom}</h1>

        {/* <ThreeSixtyViewer /> */}
      </div>
    </div>
  );
}
