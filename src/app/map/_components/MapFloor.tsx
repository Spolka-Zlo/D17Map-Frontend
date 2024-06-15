"use client";
import { useGLTF } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import { Mesh } from "three";
import * as THREE from "three";

type MapFloorProps = {
  url: string;
  activeRooms: string[];
};

export function MapFloor({ url, activeRooms }: MapFloorProps) {
  const { nodes } = useGLTF(url);
  const meshRefs = useRef<{ [key: string]: Mesh }>({});
  const [clickedRoom, setClickedRoom] = useState<string | null>(null);

  useEffect(() => {
    console.log("Active rooms", activeRooms);
    Object.entries(nodes).forEach(([key, node]) => {
      const mesh = meshRefs.current[key];
      const newPosition = new THREE.Vector3().copy(mesh.position);
      const newMaterial = (mesh.material as THREE.MeshStandardMaterial).clone();
      if (clickedRoom === key) {
        newPosition.z -= 0.3;
        newMaterial.color.set(0xf6a200);
      } else if (activeRooms.includes(key)) {
        newMaterial.color.set(0x6fd8ed);
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
      position={[-2, 1.5, 0]}
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