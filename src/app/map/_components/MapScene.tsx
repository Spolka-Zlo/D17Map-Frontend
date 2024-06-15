"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, Html } from "@react-three/drei";
import { Dispatch, SetStateAction, Suspense, useState } from "react";
import { MapFloor } from "./MapFloor";
import { Camera } from "three";

type MapSceneProps = {
  floor: string;
};

export function MapScene({ floor }: MapSceneProps) {
  return (
    <Canvas camera={{ position: [0, -2, 5], fov: 100 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 5, 10]} />
      <Suspense fallback={<Html>Loading...</Html>}>
        <MapFloor
          url={`/gltf/${floor.replace("Floor ", "")}floor.glb`}
          activeRooms={["138"]}
        />
        <Environment preset="forest" />
      </Suspense>
      <OrbitControls />
    </Canvas>
  );
}
