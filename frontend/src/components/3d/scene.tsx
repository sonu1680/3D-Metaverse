"use client";

import { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment, Stars } from "@react-three/drei";
import * as THREE from "three";

const CityModel = () => {
const mesh = useRef<THREE.Group>(null);
  
  // In a production app, we would load a real GLTF model
  // For this example, we'll create a simplified cityscape with geometry
  
  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <group position={[0, -2, 0]}>
      {/* Base platform */}
      <mesh position={[0, 0, 0]} receiveShadow>
        <cylinderGeometry args={[8, 8, 0.5, 64]} />
        <meshStandardMaterial 
          color="#111122" 
          emissive="#070720"
          metalness={0.8} 
          roughness={0.2} 
        />
      </mesh>
      
      {/* City center buildings */}

      <group ref={mesh}>
        {/* Central tower */}
        <mesh position={[0, 3, 0]} castShadow>
          <boxGeometry args={[1, 6, 1]} />
          <meshStandardMaterial 
            color="#0ff0fc" 
            emissive="#0ff0fc"
            emissiveIntensity={0.5}
            metalness={1} 
            roughness={0.2} 
          />
        </mesh>
        
        {/* Surrounding buildings */}
        {Array.from({ length: 30 }).map((_, i) => {
          const angle = (i / 30) * Math.PI * 2;
          const radius = 3 + Math.random() * 4;
          const height = 0.5 + Math.random() * 3;
          const posX = Math.sin(angle) * radius;
          const posZ = Math.cos(angle) * radius;
          const color = i % 3 === 0 ? "#ff2a6d" : i % 3 === 1 ? "#0ff0fc" : "#05ffa1";
          
          return (
            <mesh key={i} position={[posX, height/2, posZ]} castShadow>
              <boxGeometry args={[0.4, height, 0.4]} />
              <meshStandardMaterial 
                color="#252538" 
                emissive={color}
                emissiveIntensity={0.6}
                metalness={0.8} 
                roughness={0.2}
              />
            </mesh>
          );
        })}
        
        {/* Roads/grid */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.26, 0]}>
          <ringGeometry args={[1, 7.5, 64, 8]} />
          <meshStandardMaterial 
            color="#1a1a2e" 
            emissive="#b14aed"
            emissiveIntensity={0.2}
            metalness={0.6} 
            roughness={0.7}
            wireframe
          />
        </mesh>
      </group>
    </group>
  );
};

interface Scene3DProps {
  className?: string;
}

export default function Scene3D({ className }: Scene3DProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div className={`${className} bg-black`} />;
  }

  return (
    <div className={className}>
      <Canvas
        shadows
        camera={{ position: [10, 10, 10], fov: 45 }}
        dpr={[1, 2]}
      >
        <fog attach="fog" args={["#070720", 5, 30]} />
        <ambientLight intensity={0.2} />
        <directionalLight
          position={[5, 8, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <spotLight 
          position={[0, 10, 0]} 
          angle={0.4} 
          penumbra={0.5} 
          intensity={1} 
          color="#b14aed" 
          castShadow 
        />
        <CityModel />
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          autoRotate 
          autoRotateSpeed={0.4} 
          maxPolarAngle={Math.PI / 2 - 0.1}
          minPolarAngle={Math.PI / 4}
        />
        <Stars radius={100} depth={50} count={5000} factor={4} />
        <Environment preset="night" />
      </Canvas>
    </div>
  );
}