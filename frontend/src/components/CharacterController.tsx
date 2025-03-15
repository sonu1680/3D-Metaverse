import {
  Billboard,
  Box,
  Plane,
  Text,
  useKeyboardControls,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import {
  CapsuleCollider,
  RapierRigidBody,
  RigidBody,
} from "@react-three/rapier";
import { Suspense, useEffect, useRef, useState } from "react";
import { MathUtils, Vector3, Group } from "three";
import { useRecoilState, useRecoilValue } from "recoil";
import { degToRad } from "three/src/math/MathUtils.js";
import { Character } from "./Character";
import { lerpAngle } from "../utils/LerpAngle";
import { CharacterControllerProps } from "@/types/characterController";
import { userAtom } from "@/recoil/char";
import { roomAtom } from "@/recoil/roomId";
import { isPlayerCloseAtom, myPostiotionAtom } from "@/recoil/myPositon";
import { isPlayerClose } from "@/utils/isPlayerClose";
import useUserVideoList from "@/hooks/useUserVideoList";
import { socket } from "@/lib/socket";
import { VideoMaterial } from "./videoMaterial";
import { myVideoState, remoteVideoState } from "@/recoil/videoStore";
import { MemoizedVideoBillboard } from "./Billboard";
export const CharacterController: React.FC<CharacterControllerProps> = ({
  position,
  id,
  color,
  remoteAnimation,
  rotation,
  // myVideo,
  // remoteVideo,
}) => {
  const myVideo = useRecoilValue(myVideoState);
  const remoteVideo = useRecoilValue(remoteVideoState);

  const roomId = useRecoilValue(roomAtom);
  const WALK_SPEED = 6;
  const RUN_SPEED = 6;
  const ROTATION_SPEED = degToRad(1);
  const rb = useRef<RapierRigidBody>(null);
  const container = useRef<Group>(null);
  const character = useRef<Group>(null);

  const [animation, setAnimation] = useState<string>("idle");
  const user = useRecoilValue(userAtom);
  const characterRotationTarget = useRef<number>(0);
  const rotationTarget = useRef<number>(0);
  const cameraTarget = useRef<Group>(null);
  const cameraPosition = useRef<Group>(null);
  const cameraWorldPosition = useRef<Vector3>(new Vector3());
  const cameraLookAtWorldPosition = useRef<Vector3>(new Vector3());
  const cameraLookAt = useRef<Vector3>(new Vector3());
  const [, get] = useKeyboardControls();
  const targetPosition = useRef<Vector3>(new Vector3());
  const currentPosition = useRef<Vector3>(new Vector3());
  const [myPosition, setMyPosition] = useRecoilState(myPostiotionAtom);
  const { videoUser, addUserToVideoList, removeUserFromVideoList } =
    useUserVideoList();
  const textRef = useRef<any>();
  const emitInterval = useRef<NodeJS.Timeout | null>(null);
  const [playerClose, setPlayerClose] = useRecoilState(isPlayerCloseAtom);
  const emitPosition = () => {
    if (rb.current) {
      const pos = rb.current.translation();
      const fixedPos: [number, number, number] = [pos.x, pos.y, pos.z];
      socket.emit(
        "gameData",
        JSON.stringify({
          position: fixedPos,
          animation: remoteAnimation,
          roomId: roomId,
          rotation: [container.current?.rotation.y, rotationTarget.current],
          type: "CharacterMove",
        })
      );
    }
  };

  const startEmittingPosition = () => {
    if (!emitInterval.current) {
      emitPosition();
      emitInterval.current = setInterval(emitPosition, 150);
    }
  };

  const stopEmittingPosition = () => {
    if (emitInterval.current) {
      clearInterval(emitInterval.current);
      emitInterval.current = null;
    }
  };
  useFrame(({ camera }) => {
    if (rb.current) {
      const controls = get();
      const vel = rb.current.linvel();
      const movement = { x: 0, y: 0, z: 0 };

      if (user === id) {
        // --- Local player logic remains unchanged ---
        setMyPosition(position);

        if (controls.forward) movement.z = 1;
        if (controls.backward) movement.z = -1;
        if (controls.left) movement.x = 1;
        if (controls.right) movement.x = -1;

        let speed = controls.run ? RUN_SPEED : WALK_SPEED;
        if (controls.jump) {
          movement.y = 1;
          vel.y = 10;
        }
        startEmittingPosition();

        if (movement.x !== 0)
          rotationTarget.current += ROTATION_SPEED * movement.x;

        if (movement.x !== 0 || movement.z !== 0) {
          characterRotationTarget.current = Math.atan2(movement.x, movement.z);
          vel.x =
            Math.sin(rotationTarget.current + characterRotationTarget.current) *
            speed;
          vel.z =
            Math.cos(rotationTarget.current + characterRotationTarget.current) *
            speed;
          setAnimation(speed === RUN_SPEED ? "run" : "walk");
        } else {
          setAnimation(movement.y !== 0 ? "jump_air" : "idle");
        }

        if (character.current) {
          character.current.rotation.y = lerpAngle(
            character.current.rotation.y,
            characterRotationTarget.current,
            0.1
          );
        }

        rb.current.setLinvel(vel, true);

        // --- Camera and container logic ---
        if (container.current) {
          const a = (container.current.rotation.y = MathUtils.lerp(
            container.current.rotation.y,
            rotationTarget.current,
            0.1
          ));
        }

        if (cameraPosition.current) {
          cameraPosition.current.getWorldPosition(cameraWorldPosition.current);
          camera.position.lerp(cameraWorldPosition.current, 0.1);
        }

        if (cameraTarget.current) {
          cameraTarget.current.getWorldPosition(
            cameraLookAtWorldPosition.current
          );
          cameraLookAt.current.lerp(cameraLookAtWorldPosition.current, 0.1);
          camera.lookAt(cameraLookAt.current);
          if (textRef.current) {
            textRef.current.lookAt(camera.position);
          }
        }
      } else {
        // --- Remote player logic ---
        //logic for video find diffrence of myPosition and other player

        if (myPosition && position) {
          const playerIsClose: Boolean = isPlayerClose(myPosition, position);
          if (playerIsClose) {
            if (!videoUser.includes(id)) {
              setPlayerClose(true);
              addUserToVideoList(id);
            }
          } else {
            if (videoUser.includes(id)) {
              removeUserFromVideoList(id);
              setPlayerClose(false);
            }
          }
        }

        // Update target position from remote data
        targetPosition.current.set(position[0], position[1], position[2]);
        // Get current position from the rigid body
        const currentTranslation = rb.current.translation();
        currentPosition.current.set(
          currentTranslation.x,
          currentTranslation.y,
          currentTranslation.z
        );

        // Compute the distance between current and target positions
        const distance = currentPosition.current.distanceTo(
          targetPosition.current
        );
        if (distance > 0.1) {

          const direction = currentPosition.current
            .clone()
            .sub(targetPosition.current)
            .normalize()
            .multiplyScalar(0.036);
             rb.current.setTranslation(
            currentPosition.current.sub(direction),
            false
          );
          //  rotation for remote player
          characterRotationTarget.current = Math.atan2(
            targetPosition.current.x - currentTranslation.x,
            targetPosition.current.z - currentTranslation.z
          );

          if (character.current) {
            character.current.rotation.y = lerpAngle(
              character.current.rotation.y,
              characterRotationTarget.current,
              0.1
            );
          }
                  setAnimation("run");

        } else {
          setAnimation("idle");
        }
      }
    }
  });

  useEffect(() => {
    rb.current?.setTranslation(
      new Vector3(position[0], position[1], position[2]),
      false
    );
    return () => {
      stopEmittingPosition();
    };
  }, []);

  return (
    <RigidBody
      ref={rb}
      colliders={false}
      lockRotations
      type={user === id ? "dynamic" : "kinematicPosition"}
    >
      <Billboard ref={textRef}>
        <Text
          position={[0, 1.5, 0]}
          fontSize={0.25}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {id}
        </Text>
      </Billboard>
      {videoUser.includes(id) && (
        // <Billboard ref={textRef}>
        //   <Plane position-y={6} args={[4, 3, 3]}>
        //     <Suspense fallback={<meshStandardMaterial wireframe />}>
        //       <VideoMaterial src={remoteVideo} />
        //     </Suspense>
        //   </Plane>
        // </Billboard>
        <MemoizedVideoBillboard
          videoSrc={remoteVideo}
          ref={textRef}
          args={[4, 3, 3]}
        />
      )}
      {/* activate video call for me*/}
      {user === id && playerClose && (
        // <Billboard ref={textRef}>
        //   <Plane position-y={3} args={[4, 3, 3]}>
        //     <Suspense fallback={<meshStandardMaterial wireframe />}>
        //       <VideoMaterial src={myVideo} />
        //     </Suspense>
        //   </Plane>
        // </Billboard>
        <MemoizedVideoBillboard
          videoSrc={myVideo}
          ref={textRef}
          args={[4, 3, 3]}
        />
      )}

      <group ref={container}>
        <group ref={cameraTarget} position-z={12} />
        <group ref={cameraPosition} position-y={10} position-z={-17} />
        <group ref={character}>
          <Character
            scale={1}
            position-y={-1.3}
            animation={animation}
            color={color}
          />
        </group>
      </group>
      <CapsuleCollider args={[0.3, 1]} />
    </RigidBody>
  );
};
