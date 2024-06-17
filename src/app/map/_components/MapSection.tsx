"use client";
import { useState } from "react";
import { MapScene } from "./MapScene";
import { MapMenu } from "./MapMenu";

export function MapSection() {
  const [floor, setFloor] = useState("Floor 1");
  const [clickedRoom, setClickedRoom] = useState<string | null>(null);
  return (
    <div className="relative">
      <div className="h-[70vh] w-[60vw]">
        <MapScene
          floor={floor}
          clickedRoom={clickedRoom}
          setClickedRoom={setClickedRoom}
        />
      </div>
      {clickedRoom && (
        <div className="absolute right-20 top-0 p-4 bg-white/25">
          <h1 className="text-2xl font-bold">
            Piętro {floor.replace("Floor ", "")}
          </h1>
          <p>Sala {clickedRoom.slice(0, 1) + "." + clickedRoom.slice(1)}</p>
        </div>
      )}
      <MapMenu floor={floor} setFloor={setFloor} />
    </div>
  );
}
