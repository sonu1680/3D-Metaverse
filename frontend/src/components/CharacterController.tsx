import { useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { CapsuleCollider, RapierRigidBody, RigidBody } from "@react-three/rapier";
import { useEffect, useRef, useState } from "react";
import { MathUtils, Vector3, Group } from "three";
import { useRecoilValue } from "recoil";
import { degToRad } from "three/src/math/MathUtils.js";
import { Character } from "./Character";
import { userAtom } from "../recoil/char";
import { lerpAngle } from "../utils/LerpAngle";
import { CharacterControllerProps } from "@/types/characterController";
import { socket } from "./SocketManager";

export const CharacterController: React.FC<CharacterControllerProps> = ({
  host,
  position,
  id,
  color,
  remoteAnimation,
}) => {
  const WALK_SPEED = 4;
  const RUN_SPEED = 8;
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

  const emitInterval = useRef<NodeJS.Timeout | null>(null);

  const round2 = (num: number): number => parseFloat(num.toFixed(2));

  const emitPosition = () => {
    if (rb.current) {
      const pos = rb.current.translation();
      const fixedPos: [number, number, number] = [
        round2(pos.x),
        round2(pos.y),
        round2(pos.z),
      ];
      socket.emit("move", {
        position: fixedPos,
        animation: remoteAnimation,
      });
    }
  };

  const startEmittingPosition = () => {
    if (!emitInterval.current) {
      emitPosition();
      emitInterval.current = setInterval(emitPosition, 1000);
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
      } else {
        targetPosition.current.set(
          round2(position[0]),
          round2(position[1] ),
          round2(position[2])
        );

        const currentTranslation = rb.current.translation();
        currentPosition.current.set(
          round2(currentTranslation.x),
          round2(currentTranslation.y),
          round2(currentTranslation.z)
        );

        currentPosition.current.lerp(targetPosition.current, 0.001);
        currentPosition.current.set(
          round2(currentPosition.current.x),
          round2(currentPosition.current.y),
          round2(currentPosition.current.z)
        );
        rb.current.setTranslation(currentPosition.current, true);

        const distance = round2(
          currentPosition.current.distanceTo(targetPosition.current)
        );

        setAnimation(distance > 1 ? "walk" : "idle");
      }
    }

    if (user === id) {
      if (container.current) {
        container.current.rotation.y = MathUtils.lerp(
          container.current.rotation.y,
          rotationTarget.current,
          0.1
        );
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
      }
    }
  });

  useEffect(() => {
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
      position={position}
    >
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
