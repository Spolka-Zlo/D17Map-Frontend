"use client";
import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

const ThreeSixtyViewer: React.FC = () => {
  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <Canvas>
        <Suspense fallback={null}>
          <Sphere />
          <OrbitControls enableZoom={false} />
        </Suspense>
      </Canvas>
    </div>
  );
};

const Sphere: React.FC = () => {
  const texture = new THREE.TextureLoader().load("/sphere/120.jpg");
  return (
    <mesh>
      <sphereGeometry args={[500, 60, 40]} />
      <meshBasicMaterial map={texture} side={THREE.BackSide} />
    </mesh>
  );
};

export default ThreeSixtyViewer;
