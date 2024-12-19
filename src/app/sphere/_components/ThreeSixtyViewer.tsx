"use client";
import React, { Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

export function ThreeSixtyViewer({ classroomId }: { classroomId: string }) {
  if (!classroomId) {
    return null;
  }
  return (
    <div
      style={{ width: "100%", height: "50vh" }}
      className="border-4 border-primary"
    >
      <Canvas>
        <Suspense fallback={null}>
          <Sphere classroomId={classroomId} />
          <OrbitControls enableZoom={false} />
        </Suspense>
      </Canvas>
    </div>
  );
}

function Sphere({ classroomId }: { classroomId: string }) {
  const [texture, setTexture] = React.useState<THREE.Texture | null>(null);

  async function fetchPhoto() {
    const image = new Image();
    const response = await fetch("/photo?classroomId=" + classroomId, {
      method: "GET",
    });
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    image.src = url;
    try {
      image.onload = () => {
        const loadedTexture = new THREE.Texture();
        loadedTexture.image = image;
        loadedTexture.needsUpdate = true;
        setTexture(loadedTexture);
      };
    } catch (error) {
      console.error("Image load error:", error);
    }
    image.onerror = (error) => {
      console.error("Image load error onerror:", error);
    };
  }

  useEffect(() => {
    fetchPhoto();
  }, []);
  if (!texture) {
    return null;
  }
  return (
    <mesh>
      <sphereGeometry args={[500, 60, 40]} />
      <meshBasicMaterial map={texture} side={THREE.BackSide} />
    </mesh>
  );
}
