"use client";

import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { AdaptiveDpr, AdaptiveEvents } from "@react-three/drei";

function CompressorTurbine() {
  const turbineRef = useRef<THREE.Group>(null);
  const shellRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    if (turbineRef.current) {
      // Rotate compressor wheel
      turbineRef.current.rotation.z = time * 0.22;
      // Subtle float
      turbineRef.current.position.y = Math.sin(time * 1.2) * 0.05;
    }
    
    if (shellRef.current) {
      shellRef.current.rotation.y = time * 0.08;
      shellRef.current.rotation.x = time * 0.04;
    }

    if (ringRef.current) {
      ringRef.current.rotation.y = -time * 0.15;
      ringRef.current.rotation.z = time * 0.07;
    }
  });

  return (
    <group scale={1.1} rotation={[0.4, 0.5, 0]}>
      {/* Outer Wireframe Energy Sphere */}
      <mesh ref={shellRef}>
        <sphereGeometry args={[1.5, 16, 16]} />
        <meshBasicMaterial color="#E8D5B0" wireframe opacity={0.1} transparent />
      </mesh>

      {/* Orbiting Ring */}
      <mesh ref={ringRef}>
        <torusGeometry args={[1.3, 0.012, 12, 64]} />
        <meshStandardMaterial color="#C9A96E" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Central Compressor Assembly */}
      <group ref={turbineRef}>
        {/* Hub Shaft */}
        <mesh>
          <cylinderGeometry args={[0.2, 0.2, 0.55, 24]} />
          <meshStandardMaterial color="#C9A96E" metalness={0.9} roughness={0.1} />
        </mesh>
        
        {/* Compressor Blades (12 fins) */}
        {[...Array(12)].map((_, i) => {
          const angle = (i * Math.PI * 2) / 12;
          return (
            <group key={i} rotation={[0, 0, angle]}>
              <mesh position={[0, 0.44, 0]}>
                <boxGeometry args={[0.07, 0.48, 0.12]} />
                <meshStandardMaterial color="#334155" metalness={0.8} roughness={0.2} />
              </mesh>
              {/* Outer Golden Accents on Fins */}
              <mesh position={[0, 0.7, 0]}>
                <sphereGeometry args={[0.045, 8, 8]} />
                <meshStandardMaterial color="#E8D5B0" metalness={0.95} roughness={0.1} />
              </mesh>
            </group>
          );
        })}

        {/* Inner Hub Stabilizer Ring */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.42, 0.025, 8, 48]} />
          <meshStandardMaterial color="#E8D5B0" metalness={0.9} roughness={0.1} />
        </mesh>
      </group>
    </group>
  );
}

export default function WhyUsCanvas() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div className="absolute inset-0 bg-navy" />;
  }

  return (
    <div className="absolute inset-0 bg-navy overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 3.2], fov: 55 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={["#0a0f1d"]} />
        <ambientLight intensity={0.7} />
        <pointLight position={[3, 3, 3]} intensity={1.5} color="#e8d5b0" />
        <directionalLight position={[-3, 3, 2]} intensity={0.9} color="#ffffff" />
        
        <CompressorTurbine />
        
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />
      </Canvas>
    </div>
  );
}
