"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, Html } from "@react-three/drei";
import { Dispatch, SetStateAction, Suspense } from "react";
import { MapFloor } from "./MapFloor";

type MapSceneProps = {
  floor: string;
  clickedRoom: string | null;
  setClickedRoom: Dispatch<SetStateAction<string | null>>;
};

export function MapScene({
  floor,
  clickedRoom,
  setClickedRoom,
}: MapSceneProps) {
  return (
    <Canvas camera={{ position: [-0.5, 0, 5], fov: 100 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 5, 10]} />
      <Suspense fallback={<Html>Loading...</Html>}>
        <MapFloor
          url={`/gltf/${floor.replace("Floor ", "")}floor.glb`}
          activeRooms={["138", "119", "122", "110"]}
          clickedRoom={clickedRoom}
          setClickedRoom={setClickedRoom}
        />
        <Environment preset="forest" />
      </Suspense>
      <OrbitControls
        minDistance={3}
        maxDistance={8}
        minAzimuthAngle={-Math.PI / 4}
        maxAzimuthAngle={Math.PI / 4}
        minPolarAngle={Math.PI / 2}
        maxPolarAngle={Math.PI / 2}
        rotateSpeed={0.1}
        zoomSpeed={0.3}
      />
    </Canvas>
  );
}
