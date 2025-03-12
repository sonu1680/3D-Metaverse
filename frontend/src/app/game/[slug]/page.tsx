"use client";
import { Experience } from "@/components/Experience";
import useCall from "@/hooks/useCall";
import useSocket from "@/hooks/useSocket";
import { socket } from "@/lib/socket";
import { characterAtom } from "@/recoil/char";
import { isPlayerCloseAtom } from "@/recoil/myPositon";
import { roomAtom } from "@/recoil/roomId";
import { keyboardMap } from "@/utils/keyboardMap";
import { KeyboardControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { Suspense, useEffect, useMemo, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

const Page = ({params}:any) => {
  const roomId = params.slug;
  const setRoomId = useSetRecoilState(roomAtom);
  setRoomId(roomId);
  const setCharacter = useSetRecoilState(characterAtom);
  const { characters } = useSocket(roomId);
  const { callFun, endCall ,myVideo,remoteVideo} = useCall();
  const player = useRecoilValue(isPlayerCloseAtom);
  useMemo(() => {
    if (player) {
      console.log("close");
        callFun(); 
    } else {
      console.log("not close");
        endCall();
        socket.emit("videoCall",JSON.stringify({type:'endCall',room:'123'}))
    }
  }, [player]); 


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
            <Experience myVideo={myVideo} remoteVideo={remoteVideo} />
          </Canvas>
        </KeyboardControls>
      </Suspense>
    </div>
  );
};

export default Page;
