"use client";
import { useGLTF } from "@react-three/drei";
import { useRef } from "react";
import { Mesh } from "three";

export function MapFloor({ url }: { url: string }) {
  const { nodes } = useGLTF(url);
  const meshRefs = useRef<{ [key: string]: Mesh }>({});

  return (
    <group>
      {Object.entries(nodes).map(([key, node]) => (
        <mesh
          key={key}
          ref={(el) => {
            meshRefs.current[key] = el!;
          }}
          geometry={(node as Mesh).geometry}
          material={(node as Mesh).material}
          position={node.position}
          rotation={node.rotation}
          scale={node.scale}
        />
      ))}
    </group>
  );
}
