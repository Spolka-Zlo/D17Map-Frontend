"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, Html } from "@react-three/drei";
import { Suspense, useState } from "react";
import { MapFloor } from "./MapFloor";
import { Camera } from "three";

type MapModelProps = {
  fileUrl: string;
};

export function MapScene({ fileUrl }: MapModelProps) {
  const [cameraPosition, setCameraPosition] = useState<
    [number, number, number]
  >([0, -2, 5]);
  return (
    <Canvas camera={{ position: [0, -2, 5], fov: 100 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 5, 10]} />
      <Suspense fallback={<Html>Loading...</Html>}>
        <MapFloor url={fileUrl} activeRooms={["138"]} />
        <Environment preset="forest" />
      </Suspense>
      {/* <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        enableDamping={true}
        dampingFactor={0.2}
        zoomSpeed={0.8}
        panSpeed={0.8}
        minZoom={0.1}
        maxZoom={0.8}
      /> */}
    </Canvas>
  );
}