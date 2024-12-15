"use client";
import { ExtraRoom } from "@/schemas/extraRoomSchemas";
import { useGLTF } from "@react-three/drei";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { Mesh } from "three";
import * as THREE from "three";

const ROOM_COLORS = {
  WC: new THREE.Color(0xffde21),
  CAFETERIA: new THREE.Color(0xadebb3),
  "Klatki schodowe": new THREE.Color(0xed80e9),
  Windy: new THREE.Color(0x8e4585),
  DEFAULT: new THREE.Color(0xffffff),
  ACTIVE: new THREE.Color(0x6fd8ed),
  CLICKED: new THREE.Color(0xf6a200),
  LIGHT: new THREE.Color(0x00ff00),
} as const;

type ROOM_COLORS_TYPE = typeof ROOM_COLORS;

function getRoomTypeColor(
  roomKey: string,
  extraRooms: ExtraRoom[],
  activeRooms: string[],
  isClicked: boolean,
  isLight: boolean,
): ROOM_COLORS_TYPE[keyof ROOM_COLORS_TYPE] {
  if (isLight) return ROOM_COLORS.LIGHT;

  if (isClicked) return ROOM_COLORS.CLICKED;

  if (activeRooms.includes(roomKey)) return ROOM_COLORS.ACTIVE;

  const room = extraRooms.find((e) => e.modelKey === roomKey);
  if (!room) return ROOM_COLORS.DEFAULT;

  return (
    ROOM_COLORS[room.type as keyof ROOM_COLORS_TYPE] || ROOM_COLORS.DEFAULT
  );
}

type MapFloorProps = {
  url: string;
  activeRooms: string[];
  extraRooms: ExtraRoom[];
  clickedRoom: string | null;
  setClickedRoom: Dispatch<SetStateAction<string | null>>;
  clickedRoomZoom: number[];
  setClickedRoomZoom?: Dispatch<SetStateAction<number[]>>;
  lightRoom?: string;
};

export function MapFloor({
  url,
  activeRooms,
  extraRooms,
  clickedRoom,
  setClickedRoom,
  clickedRoomZoom,
  setClickedRoomZoom,
  lightRoom,
}: MapFloorProps) {
  const { nodes } = useGLTF(url);
  const meshRefs = useRef<{ [key: string]: Mesh }>({});

  useEffect(() => {
    Object.entries(nodes).forEach(([key, node]) => {
      const mesh = meshRefs.current[key];
      if (!mesh) return;

      const isClicked = clickedRoom === key;
      const isLight = lightRoom === key;
      const newPosition = new THREE.Vector3().copy(mesh.position);
      const newMaterial = (mesh.material as THREE.MeshStandardMaterial).clone();

      newMaterial.color = getRoomTypeColor(
        key,
        extraRooms,
        activeRooms,
        isClicked,
        isLight,
      );
      newPosition.z = isClicked ? node.position.z - 0.3 : node.position.z;

      mesh.material = newMaterial;
      mesh.position.copy(newPosition);
    });
  }, [activeRooms, nodes, clickedRoom, extraRooms]);

  return (
    <group
      position={[
        -clickedRoomZoom[0],
        -clickedRoomZoom[1],
        clickedRoomZoom[2] / 2,
      ]}
      rotation={new THREE.Euler(-Math.PI / 20, -Math.PI, -Math.PI / 20)}
    >
      {Object.entries(nodes).map(([key, node]) => (
        <mesh
          key={key}
          ref={(el) => {
            if (el) meshRefs.current[key] = el;
          }}
          geometry={(node as Mesh).geometry}
          material={(node as Mesh).material}
          position={node.position}
          rotation={node.rotation}
          scale={node.scale}
          onClick={(e) => {
            e.stopPropagation();
            const isAlreadyClicked = clickedRoom === key;
            setClickedRoomZoom?.(
              isAlreadyClicked
                ? [0, 0, 0]
                : [-node.position.x, node.position.y / 2, 3.5],
            );
            setClickedRoom(isAlreadyClicked ? null : key);
          }}
        />
      ))}
    </group>
  );
}
