"use client";
import {
  Environment,
  OrbitControls,
  OrthographicCamera,
} from "@react-three/drei";
import { useRef } from "react";
import { CharacterController } from "./CharacterController";
import { Map } from "./Map";
import { useRecoilValue } from "recoil";
import { RemoteCharacter } from "@/types/remoteCharacterType";
import { OrthographicCamera as OrthographicCameraType } from "three";
import { Physics } from "@react-three/rapier";
import { characterAtom } from "@/recoil/char";


export const Experience = () => {
  const shadowCameraRef = useRef<OrthographicCameraType | null>(null);
  const characters = useRecoilValue<RemoteCharacter[]>(characterAtom);

  return (
    <>
      {/* <OrbitControls /> */}
      <Environment preset="sunset" />
      {/* <directionalLight
        intensity={0.65}
        castShadow
        position={[-15, 10, 15]}
        shadow-mapSize-width={200}
        shadow-mapSize-height={200}
        shadow-bias={-0.0001}
      >
        <OrthographicCamera
          left={-22}
          right={15}
          top={10}
          bottom={-20}
          ref={shadowCameraRef}
          attach={"shadow-camera"}
        />
      </directionalLight> */}
      <color attach="background" args={["#87CEEB"]} />
      <Physics gravity={[0, -9.81, 0]}>
        <Map scale={5} position={[-6, -10, 0]} model={"/models/book.glb"} />
        {characters.map((data) => (
          <CharacterController
            key={data.id}
            position={data.position}
            rotation={data.rotation}
            id={data.id}
            color={data.color}
          />
        ))}
      </Physics>
    </>
  );
}
;
