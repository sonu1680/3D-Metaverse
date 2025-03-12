import { useAnimations, useGLTF } from "@react-three/drei";
import { useGraph } from "@react-three/fiber";
import React, { useEffect, useMemo, useRef } from "react";
import { SkeletonUtils } from "three-stdlib";

export function Character({ animation, color, ...props }) {
  const group = useRef();
  const { scene, materials, animations } = useGLTF("/models/character.glb");
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes } = useGraph(clone);

  const { actions } = useAnimations(animations, group);

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
            geometry={nodes.body.geometry}
            material={materials.Material}
            skeleton={nodes.body.skeleton}
            castShadow
            receiveShadow
          >
            <meshStandardMaterial color={color}></meshStandardMaterial>
          </skinnedMesh>
          <skinnedMesh
            name="eye"
            geometry={nodes.eye.geometry}
            material={materials.Material}
            skeleton={nodes.eye.skeleton}
            castShadow
            receiveShadow
          />
          <skinnedMesh
            name="hand-"
            geometry={nodes["hand-"].geometry}
            material={materials.Material}
            skeleton={nodes["hand-"].skeleton}
            castShadow
            receiveShadow
          />
          <skinnedMesh
            name="leg"
            geometry={nodes.leg.geometry}
            material={materials.Material}
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
