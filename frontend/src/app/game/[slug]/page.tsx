"use client";
import { Experience } from "@/components/Experience";
import useSocket from "@/hooks/useSocket";
import { characterAtom } from "@/recoil/char";
import { roomAtom } from "@/recoil/roomId";
import { keyboardMap } from "@/utils/keyboardMap";
import { KeyboardControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { Suspense, useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";

const Page = ({params}:any) => {
  const roomId = params.slug;
  const setRoomId = useSetRecoilState(roomAtom);
  setRoomId(roomId);
  const setCharacter = useSetRecoilState(characterAtom);

  const { chat, setChat, characters, sendChat, isConnected, disconnectSocket } =
    useSocket(roomId);

  useEffect(() => {
    if (characters.length > 0) {
      //@ts-ignore
      setCharacter(characters);
    }
  }, [characters, setCharacter]);
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
      <Suspense fallback={null}>
        <KeyboardControls map={keyboardMap}>
          <Canvas shadows camera={{ position: [3, 3, 3], near: 0.1, fov: 40 }}>
            <Experience />
          </Canvas>
        </KeyboardControls>
      </Suspense>
    </div>
  );
};

export default Page;
