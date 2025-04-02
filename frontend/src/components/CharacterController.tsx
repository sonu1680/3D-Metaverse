import { useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import {
  CapsuleCollider,
  RapierRigidBody,
  RigidBody,
} from "@react-three/rapier";
import { useEffect, useRef, useState } from "react";
import { MathUtils, Vector3, Group } from "three";
import { useRecoilState, useRecoilValue } from "recoil";
import { degToRad } from "three/src/math/MathUtils.js";
import { Character } from "./Character";
import { lerpAngle } from "../utils/LerpAngle";
import { CharacterControllerProps } from "@/types/characterController";
import { userAtom } from "@/recoil/char";
import { roomAtom, videRoomAtom } from "@/recoil/roomId";
import { isPlayerCloseAtom, myPostiotionAtom } from "@/recoil/myPositon";
import { isPlayerClose } from "@/utils/isPlayerClose";
import useUserVideoList from "@/hooks/useUserVideoList";
import { socket } from "@/lib/socket";
import { myVideoState, remoteVideoState } from "@/recoil/videoStore";
import { MemoizedVideoBillboard } from "./Billboard";
import { CharacterNameOnHead } from "./CharacterNameOnHead";
import { OrthographicCamera as OrthographicCameraType } from "three";
import { peerIdAtom } from "@/recoil/videocallAtom";

export const CharacterController: React.FC<CharacterControllerProps> = ({
  position,
  id,
  color,
}) => {
  const myVideo = useRecoilValue(myVideoState);
  const remoteVideo = useRecoilValue(remoteVideoState);
  const roomId = useRecoilValue(roomAtom);
  const videoRoomId = useRecoilValue(videRoomAtom);
  const WALK_SPEED = 7;
  const RUN_SPEED = 7;
  const ROTATION_SPEED = degToRad(0.98);
  const rb = useRef<RapierRigidBody>(null);
  const container = useRef<Group>(null);
  const character = useRef<Group>(null);
  const peerid = useRecoilValue(peerIdAtom);
  const isClicking = useRef(false);

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
  const controls = get();

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

  useEffect(() => {
    const onMouseDown = (e: any) => {
      isClicking.current = true;
    };
    const onMouseUp = (e: any) => {
      isClicking.current = false;
    };
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mouseup", onMouseUp);
    // touch
    document.addEventListener("touchstart", onMouseDown);
    document.addEventListener("touchend", onMouseUp);
    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("touchstart", onMouseDown);
      document.removeEventListener("touchend", onMouseUp);
    };
  }, []);


  useFrame(({ camera, mouse }) => {
    if (rb.current) {
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

        ///mouse control
        if (isClicking.current) {
          if (Math.abs(mouse.x) > 0.1) {
            movement.x = -mouse.x;
          }
          movement.z = mouse.y + 0.4;
          if (Math.abs(movement.x) > 0.5 || Math.abs(movement.z) > 0.5) {
            speed = 7;
          }
        }

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
              console.log(peerid)
              socket.emit(
                "videoCall",
                JSON.stringify({
                  type: "initiator",
                  me: user,
                  remote: id,
                  peerid: peerid,
                })
              );
              addUserToVideoList(id);
              setPlayerClose(true);
            }
          } else {
            if (videoUser.includes(id)) {
              removeUserFromVideoList(id);
              socket.emit(
                "videoCall",
                JSON.stringify({
                  type: "endCall",
                  me: user,
                  remote: id,
                })
              );
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
        if (distance > 0.4) {
          const direction = currentPosition.current
            .clone()
            .sub(targetPosition.current)
            .normalize()
            .multiplyScalar(0.06);
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
      <CharacterNameOnHead id={id} />
      {videoUser.includes(id) && (
        <MemoizedVideoBillboard
          videoSrc={remoteVideo}
          type="remote"
          refs={textRef}
          args={[4, 3, 3]}
        />
      )}
      {/* activate video call for me*/}
      {user === id && playerClose && (
        <MemoizedVideoBillboard
          videoSrc={myVideo}
          refs={textRef}
          type="me"
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
            id={id}
          />
        </group>
      </group>
      <CapsuleCollider args={[0.3, 1]} />
    </RigidBody>
  );
};
