"use client";
import { useState } from "react";
import { MapScene } from "./MapScene";
import { MapMenu } from "./MapMenu";
import { ClassRoom, Reservation } from "@/app/calendar/page";

type MapSectionProps = {
  reservations: Reservation[];
  rooms: ClassRoom[];
};

export function MapSection({ reservations, rooms }: MapSectionProps) {
  const [floor, setFloor] = useState("Floor 1");
  const [clickedRoom, setClickedRoom] = useState<string | null>(null);
  console.log(clickedRoom);
  return (
    <div className="relative">
      <div className="h-[70vh] w-[60vw]">
        <MapScene
          floor={floor}
          clickedRoom={clickedRoom}
          setClickedRoom={setClickedRoom}
          activeRooms={reservations.map(
            (reservation) => reservation.classroom.name
          )}
        />
      </div>
      {clickedRoom && (
        <div className="absolute right-20 top-0 p-4 bg-white/25">
          <h1 className="text-2xl font-bold">
            Piętro {floor.replace("Floor ", "")}
          </h1>
          <p>Sala {clickedRoom.slice(0, 1) + "." + clickedRoom.slice(1)}</p>
          <p>
            Pojemność:{" "}
            {
              rooms.filter(
                (room) =>
                  room.name ===
                  clickedRoom.slice(0, 1) + "." + clickedRoom.slice(1)
              )[0].capacity
            }
          </p>
          <p>
            Wyposażenie:{" "}
            {rooms
              .filter(
                (room) =>
                  room.name ===
                  clickedRoom.slice(0, 1) + "." + clickedRoom.slice(1)
              )[0]
              .equipment.join(", ")}
          </p>
        </div>
      )}
      <MapMenu floor={floor} setFloor={setFloor} />
    </div>
  );
}
