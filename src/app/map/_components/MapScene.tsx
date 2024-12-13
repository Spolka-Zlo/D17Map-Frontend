"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, Html } from "@react-three/drei";
import { Dispatch, SetStateAction, Suspense, useState } from "react";
import { MapFloor } from "./MapFloor";
import { ExtraRoom } from "@/schemas/extraRoomsSchema";
import { CameraHelper, Vector3, OrthographicCamera } from "three";

type MapSceneProps = {
  floor: string;
  clickedRoom: string | null;
  setClickedRoom: Dispatch<SetStateAction<string | null>>;
  extraRooms: ExtraRoom[];
};
export function MapScene({
  floor,
  clickedRoom,
  setClickedRoom,
  extraRooms,
}: MapSceneProps) {
  const [clickedRoomZoom, setClickedRoomZoom] = useState<number[]>([0, 0, 0]);
  return (
    <Canvas
      camera={{
        position: new Vector3(-0.5, 0, 5),
        fov: 100,
      }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 5, 10]} />
      <Suspense fallback={<Html>Loading...</Html>}>
        <MapFloor
          url={`/gltf/floor${floor}.glb`}
          activeRooms={["TOILET", "CAFETERIA", "STAIRS", "ELEVATOR"]}
          clickedRoom={clickedRoom}
          setClickedRoom={setClickedRoom}
          extraRooms={extraRooms}
          clickedRoomZoom={clickedRoomZoom}
          setClickedRoomZoom={setClickedRoomZoom}
        />
        <Environment preset="forest" />
      </Suspense>
      <OrbitControls
        minDistance={3}
        maxDistance={8}
        // minAzimuthAngle={-Math.PI / 4}
        // maxAzimuthAngle={Math.PI / 4}
        // minPolarAngle={Math.PI / 2}
        // maxPolarAngle={Math.PI / 2}
        // zoomSpeed={0.3}
        // enablePan={true}
        // enableRotate={false}
        // panSpeed={0.1}
        // enableDamping={true}
      />
      <primitive object={new CameraHelper(new OrthographicCamera())} />
    </Canvas>
  );
}
