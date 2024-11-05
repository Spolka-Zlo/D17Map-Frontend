"use client";
import { Dispatch, SetStateAction, useState } from "react";
import { MapScene } from "./MapScene";
import { MapMenu } from "./MapMenu";

type MapSectionProps = {
  clickedRoom: string | null;
  setClickedRoom: Dispatch<SetStateAction<string | null>>;
};

export function MapSection({ clickedRoom, setClickedRoom }: MapSectionProps) {
  const [floor, setFloor] = useState("Floor 1");
  const equipments = ["ROUTERS", "COMPUTERS"];
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
        <div className="absolute right-20 top-0 rounded-md bg-white/25 p-4">
          <h1 className="text-2xl font-bold">
            Piętro {floor.replace("Floor ", "")}
          </h1>
          <p>Sala {clickedRoom.slice(0, 1) + "." + clickedRoom.slice(1)}</p>
          <ul className="flex gap-1">
            {equipments.map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
      <MapMenu floor={floor} setFloor={setFloor} />
    </div>
  );
}
