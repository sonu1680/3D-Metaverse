"use client";
import { Experience } from "@/components/Experience";
import { keyboardMap } from "@/utils/keyboardMap";
import { KeyboardControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React from "react";

const Page = () => {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        position: "absolute",
        top: 0,
        left: 0,
      }}
    >
      <KeyboardControls map={keyboardMap}>

      <Canvas shadows camera={{ position: [3, 3, 3], near: 0.1, fov: 40 }}>
        <Experience />
      </Canvas>
      </KeyboardControls>
    </div>
  );
};

export default Page;
