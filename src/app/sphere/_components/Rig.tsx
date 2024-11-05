"use client";
import * as THREE from "three";
import { useEffect, useRef, useState } from "react";
import { Canvas, extend, useFrame, useThree } from "@react-three/fiber";
import { useRoute, useLocation } from "wouter";
import { CameraControls } from "@react-three/drei";

export function Rig({
  position = new THREE.Vector3(0, 0, 2),
  focus = new THREE.Vector3(0, 0, 0),
}) {
  const { controls, scene } = useThree();
  const controlsRef = useRef<THREE.Camera & { setLookAt: Function }>();
  const [, params] = useRoute("/item/:id");
  useEffect(() => {
    const active = scene.getObjectByName(params?.id ?? "");
    if (active?.parent) {
      active.parent.localToWorld(position.set(0, 0.5, 0.25));
      active.parent.localToWorld(focus.set(0, 0, -2));
    }
    controlsRef.current?.setLookAt(
      ...position.toArray(),
      ...focus.toArray(),
      true
    );
  }, [params, position, focus, scene]);
  return (
    <CameraControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 2} />
  );
}
