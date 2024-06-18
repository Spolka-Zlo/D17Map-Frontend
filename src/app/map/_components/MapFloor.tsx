"use client";
import { useGLTF } from "@react-three/drei";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { Mesh } from "three";
import * as THREE from "three";

type MapFloorProps = {
  url: string;
  activeRooms: string[];
  clickedRoom: string | null;
  setClickedRoom: Dispatch<SetStateAction<string | null>>;
};

export function MapFloor({
  url,
  activeRooms,
  clickedRoom,
  setClickedRoom,
}: MapFloorProps) {
  const { nodes } = useGLTF(url);
  const meshRefs = useRef<{ [key: string]: Mesh }>({});

  useEffect(() => {
    Object.entries(nodes).forEach(([key, node]) => {
      const mesh = meshRefs.current[key];
      const newPosition = new THREE.Vector3().copy(mesh.position);
      const newMaterial = (mesh.material as THREE.MeshStandardMaterial).clone();
      if (clickedRoom === key) {
        newPosition.z -= 0.3;
        newMaterial.color.set(0xf6a200);
      } else if (activeRooms.includes(key)) {
        newMaterial.color.set(0xf6c462);
        newPosition.z = node.position.z;
      } else {
        newMaterial.color.set(0xffffff);
        newPosition.z = node.position.z;
      }
      mesh.material = newMaterial;
      mesh.position.copy(newPosition);
    });
  }, [activeRooms, nodes, clickedRoom]);

  return (
    <group
      position={[0, 0, 0]}
      rotation={new THREE.Euler(-Math.PI / 20, -Math.PI, -Math.PI / 20)}
    >
      {Object.entries(nodes).map(([key, node]) => {
        return (
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
              if (clickedRoom === key) {
                setClickedRoom(null);
              } else {
                setClickedRoom(key);
              }
            }}
          />
        );
      })}
    </group>
  );
}
