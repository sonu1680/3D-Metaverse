import { Html, useAnimations, useGLTF } from "@react-three/drei";
import { useGraph } from "@react-three/fiber";
import React, { useEffect, useMemo, useRef } from "react";
import { SkeletonUtils } from "three-stdlib";


export function Character({ animation, color,id ,...props }:any) {
  const group = useRef();
  //@ts-ignore
  const { scene, materials, animations } = useGLTF("/models/character.glb");
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes } = useGraph(clone);

  const { actions } = useAnimations(animations, group);
  //@ts-ignore

  useEffect(() => {
    actions[animation]?.reset().fadeIn(0.24).play();
    return () => actions?.[animation]?.fadeOut(0.24);
  }, [animation]);
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="fall_guys">
          <primitive object={nodes._rootJoint} />
          <skinnedMesh
            name="body"
            //@ts-ignore

            geometry={nodes.body.geometry}
            material={materials.Material}
            //@ts-ignore

            skeleton={nodes.body.skeleton}
            castShadow
            receiveShadow
          >
            <meshStandardMaterial color={color}></meshStandardMaterial>
          </skinnedMesh>
          <skinnedMesh
            name="eye"
            //@ts-ignore

            geometry={nodes.eye.geometry}
            material={materials.Material}
            //@ts-ignore

            skeleton={nodes.eye.skeleton}
            castShadow
            receiveShadow
          />
          <skinnedMesh
            name="hand-"
            //@ts-ignore

            geometry={nodes["hand-"].geometry}
            material={materials.Material}
            //@ts-ignore

            skeleton={nodes["hand-"].skeleton}
            castShadow
            receiveShadow
          />
          <skinnedMesh
            name="leg"
            //@ts-ignore

            geometry={nodes.leg.geometry}
            material={materials.Material}
            //@ts-ignore

            skeleton={nodes.leg.skeleton}
            castShadow
            receiveShadow
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/models/character.glb");
