"use client";

import { Classroom } from "@/schemas/classroomSchemas";
import { Equipment } from "@/schemas/equipmentSchemas";
import { ExtraRoom } from "@/schemas/extraRoomsSchema";
import { useState } from "react";
import { MapSection } from "./MapSection";

type MapPageContentProps = {
  classrooms: Classroom[];
  equipments: Equipment[];
  extraRooms: ExtraRoom[];
};

export function MapPageContent({
  classrooms,
  equipments,
  extraRooms,
}: MapPageContentProps) {
  const [clickedRoom, setClickedRoom] = useState<string | null>(null);

  console.log(clickedRoom);

  return (
    <div className="flex h-[81vh] w-full flex-row justify-stretch">
      <MapSection
        clickedRoom={clickedRoom}
        setClickedRoom={setClickedRoom}
        classrooms={classrooms}
        equipments={equipments}
        extraRooms={extraRooms}
      />
      <div className="border-l-4 border-black"></div>
      <div className="w-full p-10">
        <h1 className="text-2xl font-bold">{clickedRoom}</h1>

        {/* <ThreeSixtyViewer /> */}
      </div>
    </div>
  );
}
