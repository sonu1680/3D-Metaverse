"use client";
import Chat from "@/components/Chat";
import { Experience } from "@/components/Experience";
import useSocket from "@/hooks/useSocket";
import { characterAtom } from "@/recoil/char";
import { roomAtom } from "@/recoil/roomId";
import { keyboardMap } from "@/utils/keyboardMap";
import { KeyboardControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { memo, Suspense, useEffect, useMemo, useState } from "react";
import { useSetRecoilState } from "recoil";

const Page = memo(({ params }: any) => {
  const roomId = params.slug;
  const setRoomId = useSetRecoilState(roomAtom);
  setRoomId(roomId);
  const setCharacter = useSetRecoilState(characterAtom);
  const { characters } = useSocket(roomId);
  useEffect(() => {
    if (characters.length > 0) {
      //@ts-ignore
      setCharacter(characters);
    }
  }, [characters, setCharacter]);

  return (
    <>
      <div
        style={{
          width: "80vw",
          height: "100vh",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      >
        <Suspense fallback={null}>
          <KeyboardControls map={keyboardMap}>
            <Canvas
              shadows
              camera={{ position: [3, 3, 3], near: 0.1, fov: 40 }}
            >
              <Experience />
            </Canvas>
          </KeyboardControls>
        </Suspense>
      </div>

      <div
        style={{
          width: "20vw",
          height: "100vh",
          position: "absolute",
          left: "80vw",
        }}
      >
      
        <Chat />
      </div>
    </>
  );
});

export default Page;
