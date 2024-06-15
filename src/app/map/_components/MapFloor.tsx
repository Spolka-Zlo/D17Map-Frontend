"use client";
import { useGLTF } from "@react-three/drei";
import { Vector3 } from "@react-three/fiber";
import { use, useEffect, useRef, useState } from "react";
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
      if (activeRooms.includes(key)) {
        const newMaterial = (
          mesh.material as THREE.MeshStandardMaterial
        ).clone();
        newMaterial.color.set(0xf6a200);
        mesh.material = newMaterial;
      }
    });
    // if (clickedRoom) {
    //   const newPosition = new THREE.Vector3().copy(
    //     meshRefs.current[clickedRoom].position
    //   );
    //   newPosition.y += 0.1;
    //   meshRefs.current[clickedRoom].position.copy(newPosition);
    // }
  }, [activeRooms, nodes]);

  return (
    <group position={[0, 1, 0]}>
      {Object.entries(nodes).map(([key, node]) => {
        // console.log("Node", node, key);
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
              e.stopPropagation(); // Prevent event from bubbling up to parent elements
              const clickedMesh = e.object as Mesh;
              console.log("clicked", clickedMesh);

              // Clone the material and set a new color
              const newMaterial = (
                clickedMesh.material as THREE.MeshStandardMaterial
              ).clone();
              newMaterial.color.set(0xf6a200);

              // Apply the new material to the clicked mesh
              clickedMesh.material = newMaterial;
              setClickedRoom(key);
            }}
          />
        );
      })}
    </group>
  );
}
