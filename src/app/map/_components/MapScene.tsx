"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, Html } from "@react-three/drei";
import { Suspense } from "react";
import { MapFloor } from "./MapFloor";

type MapModelProps = {
  fileUrl: string;
};

export function MapScene({ fileUrl }: MapModelProps) {
  return (
    <Canvas camera={{ position: [0, 2, 5], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Suspense fallback={<Html>Loading...</Html>}>
        <MapFloor url={fileUrl} />
        <Environment preset="forest" />
      </Suspense>
      {/* <OrbitControls /> */}
    </Canvas>
  );
}
