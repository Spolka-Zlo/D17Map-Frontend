"use client";
import { useState } from "react";
import ThreeSixtyViewer from "../sphere/_components/ThreeSixtyViewer";
import { MapSection } from "./_components/MapSection";
import { z } from "zod";

const classroomSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  capacity: z.number(),
  equipmentIds: z.array(z.string()),
});

const equipmentSchema = z.object({
  id: z.string(),
  name: z.string(),
});

// let this empty map description be here for now
export default function Map() {
  const [clickedRoom, setClickedRoom] = useState<string | null>(null);

  return (
    <main>
      <div className="flex h-[81vh] w-full flex-row justify-stretch">
        <MapSection clickedRoom={clickedRoom} setClickedRoom={setClickedRoom} />
        <div className="border-l-4 border-black"></div>
        <div className="w-full p-10">
          <h1 className="text-2xl font-bold">{clickedRoom}</h1>

          <ThreeSixtyViewer />
        </div>
      </div>
    </main>
  );
}
