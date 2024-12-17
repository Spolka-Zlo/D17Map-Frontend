"use client";
import React, { Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { getToken } from "@/auth/getToken";

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
  // const texture = new THREE.TextureLoader().load("/sphere/photo.jpg");
  // const photoUrl = `http://localhost:8080/classrooms/${classroomId}/photo`;
  // console.log(photoUrl);
  const [texture, setTexture] = React.useState<THREE.Texture | null>(null);

  async function fetchPhoto() {
    const image = new Image();
    const response = await fetch("/photo?classroomId=" + classroomId, {
      method: "GET",
    });
    const blob = await response.blob();
    // console.log("blob", blob);
    const url = URL.createObjectURL(blob);
    console.log("url", url);
    // image.crossOrigin = "anonymous";
    image.src = url;
    console.log("image", image);
    // setPhotoUrl(url);
    // console.log(blob);
    try {
      image.onload = () => {
        console.log("Image loaded");
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
    // <img src={photoUrl ?? ""} />
    <mesh>
      <sphereGeometry args={[500, 60, 40]} />
      <meshBasicMaterial map={texture} side={THREE.BackSide} />
    </mesh>
  );
}
