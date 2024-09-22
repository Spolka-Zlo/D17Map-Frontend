"use client";
import * as THREE from "three";
import React, { useEffect, useRef, useState, ReactNode } from "react";
import { Canvas, extend, useFrame, useThree } from "@react-three/fiber";
import {
  useCursor,
  MeshPortalMaterial,
  CameraControls,
  Gltf,
  Text,
  Preload,
} from "@react-three/drei";
import { useRoute, useLocation } from "wouter";
import { easing, geometry } from "maath";
import { suspend } from "suspend-react";

extend(geometry);

interface FrameProps {
  id: string;
  name: string;
  author: string;
  bg: string;
  width?: number;
  height?: number;
  children: ReactNode;
}

const Frame: React.FC<FrameProps> = ({
  id,
  width = 1,
  height = 1.61803398875,
  children,
  ...props
}) => {
  const portal = useRef<any>(null);
  const [, setLocation] = useLocation();
  const [, params] = useRoute("/item/:id");
  const [hovered, hover] = useState(false);
  useCursor(hovered);
  useFrame((state, dt) =>
    easing.damp(portal.current, "blend", params?.id === id ? 1 : 0, 0.2, dt)
  );

  return (
    <mesh
      name={id}
      onDoubleClick={(e) => {
        e.stopPropagation();
        setLocation("/item/" + e.object.name);
      }}
      onPointerOver={(e) => hover(true)}
      onPointerOut={() => hover(false)}
    >
      <MeshPortalMaterial
        ref={portal}
        events={params?.id === id}
        side={THREE.DoubleSide}
      >
        <color attach="background" args={["white"]} />
        {children}
      </MeshPortalMaterial>
    </mesh>
  );
};

export default Frame;
