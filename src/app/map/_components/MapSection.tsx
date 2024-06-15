"use client";
import { useState } from "react";
import { MapScene } from "./MapScene";
import { MapMenu } from "./MapMenu";

export function MapSection() {
  const [floor, setFloor] = useState("Floor 1");
  return (
    <div className="relative">
      <div className="h-[70vh] w-[80vw]">
        <MapScene floor={floor} />
      </div>
      <div className="absolute right-20 top-0 p-4 bg-white/25">
        <h1 className="text-2xl font-bold">Floor 1</h1>
        <p>Floor description</p>
      </div>
      <MapMenu floor={floor} setFloor={setFloor} />
    </div>
  );
}
