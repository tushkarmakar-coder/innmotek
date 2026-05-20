"use client";

import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { AdaptiveDpr, AdaptiveEvents } from "@react-three/drei";
import * as THREE from "three";

interface ProductCanvasProps {
  category: string;
  isHovered: boolean;
}

// 1. HEAT PUMP MODEL
function HeatPumpModel({ isHovered }: { isHovered: boolean }) {
  const fanRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (fanRef.current) {
      fanRef.current.rotation.z += isHovered ? 0.22 : 0.07;
    }
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.15;
    }
  });

  return (
    <group ref={meshRef} scale={0.9} position={[0, -0.1, 0]}>
      {/* Main Cabinet Body */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.2, 1.4, 0.6]} />
        <meshStandardMaterial color="#1e293b" metalness={0.85} roughness={0.2} />
      </mesh>
      {/* Side Trim Accent */}
      <mesh position={[0.61, 0, 0]}>
        <boxGeometry args={[0.025, 1.42, 0.625]} />
        <meshStandardMaterial color="#C9A96E" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Fan Grill Ring (Front Outer) */}
      <mesh position={[0, 0.1, 0.305]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.38, 0.02, 16, 100]} />
        <meshStandardMaterial color="#0f172a" metalness={0.9} roughness={0.15} />
      </mesh>
      {/* Inner Fan Blades Group */}
      <group ref={fanRef} position={[0, 0.1, 0.25]}>
        {/* Fan Hub */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 0.04, 16]} />
          <meshStandardMaterial color="#C9A96E" metalness={0.9} roughness={0.1} />
        </mesh>
        {/* Fan Blade 1 */}
        <mesh position={[0, 0.18, 0]}>
          <boxGeometry args={[0.05, 0.28, 0.01]} />
          <meshStandardMaterial color="#0f172a" metalness={0.7} roughness={0.4} />
        </mesh>
        {/* Fan Blade 2 */}
        <mesh position={[0.15, -0.09, 0]} rotation={[0, 0, (2 * Math.PI) / 3]}>
          <boxGeometry args={[0.05, 0.28, 0.01]} />
          <meshStandardMaterial color="#0f172a" metalness={0.7} roughness={0.4} />
        </mesh>
        {/* Fan Blade 3 */}
        <mesh position={[-0.15, -0.09, 0]} rotation={[0, 0, (-2 * Math.PI) / 3]}>
          <boxGeometry args={[0.05, 0.28, 0.01]} />
          <meshStandardMaterial color="#0f172a" metalness={0.7} roughness={0.4} />
        </mesh>
      </group>
      {/* LCD Control Panel Screen */}
      <mesh position={[0.35, 0.52, 0.305]}>
        <boxGeometry args={[0.3, 0.15, 0.02]} />
        <meshStandardMaterial color="#020617" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[0.35, 0.52, 0.315]}>
        <planeGeometry args={[0.26, 0.11]} />
        <meshStandardMaterial
          color="#38bdf8"
          emissive="#38bdf8"
          emissiveIntensity={1.8}
        />
      </mesh>
      {/* Inlet/Outlet Copper Pipes */}
      <mesh position={[-0.45, -0.4, -0.31]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.06, 0.06, 0.2, 16]} />
        <meshStandardMaterial color="#d97706" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[-0.45, -0.1, -0.31]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.06, 0.06, 0.2, 16]} />
        <meshStandardMaterial color="#d97706" metalness={0.9} roughness={0.1} />
      </mesh>
    </group>
  );
}

// 2. POOL PUMP / HEATER MODEL
function PoolPumpModel({ isHovered }: { isHovered: boolean }) {
  const meshRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      const speed = isHovered ? 1.2 : 0.4;
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * speed) * 0.15;
    }
  });

  return (
    <group ref={meshRef} scale={0.8} position={[0, -0.1, 0]}>
      {/* Main Motor Cylindrical Body */}
      <mesh position={[-0.2, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.38, 0.38, 0.8, 24]} />
        <meshStandardMaterial color="#1e293b" metalness={0.85} roughness={0.2} />
      </mesh>
      {/* Motor cooling fins */}
      {[...Array(6)].map((_, i) => (
        <mesh key={i} position={[-0.2 - 0.3 + i * 0.12, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.41, 0.41, 0.02, 24]} />
          <meshStandardMaterial color="#C9A96E" metalness={0.9} roughness={0.15} />
        </mesh>
      ))}
      {/* Pump Impeller Housing (Front) */}
      <mesh position={[0.35, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.44, 0.44, 0.4, 24]} />
        <meshStandardMaterial color="#0284c7" metalness={0.7} roughness={0.2} />
      </mesh>
      {/* Transparent Filter Basket Lid */}
      <mesh position={[0.35, 0.38, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 0.3, 16]} />
        <meshStandardMaterial color="#38bdf8" transparent opacity={0.65} roughness={0.1} />
      </mesh>
      {/* Pipe connections */}
      <mesh position={[0.68, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.11, 0.11, 0.3, 16]} />
        <meshStandardMaterial color="#e2e8f0" metalness={0.1} roughness={0.8} />
      </mesh>
      <mesh position={[0.35, 0.58, 0]}>
        <cylinderGeometry args={[0.11, 0.11, 0.3, 16]} />
        <meshStandardMaterial color="#e2e8f0" metalness={0.1} roughness={0.8} />
      </mesh>
      {/* Metallic Status Plate */}
      <mesh position={[-0.2, 0.39, 0]}>
        <boxGeometry args={[0.3, 0.02, 0.18]} />
        <meshStandardMaterial color="#C9A96E" metalness={0.9} roughness={0.1} />
      </mesh>
    </group>
  );
}

// 3. FIREPLACE MODEL
function FireplaceModel({ isHovered }: { isHovered: boolean }) {
  const particlesRef = useRef<THREE.Group>(null);
  const lightRef = useRef<THREE.PointLight>(null);
  const meshRef = useRef<THREE.Group>(null);
  
  const [particles] = useState(() => {
    return Array.from({ length: 14 }).map(() => ({
      x: (Math.random() - 0.5) * 0.32,
      y: Math.random() * 0.6 - 0.2,
      z: (Math.random() - 0.5) * 0.2,
      speed: 0.012 + Math.random() * 0.015,
      size: 0.04 + Math.random() * 0.07,
      wobbleSpeed: 3 + Math.random() * 6,
      wobbleRange: 0.04 + Math.random() * 0.08,
    }));
  });

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.12;
    }
    if (particlesRef.current) {
      particlesRef.current.children.forEach((child, i) => {
        const p = particles[i];
        child.position.y += p.speed * (isHovered ? 1.4 : 1);
        child.position.x = p.x + Math.sin(state.clock.elapsedTime * p.wobbleSpeed) * p.wobbleRange;
        
        if (child.position.y > 0.5) {
          child.position.y = -0.22;
          child.scale.setScalar(1);
        } else {
          const factor = (0.5 - child.position.y) / 0.72;
          child.scale.setScalar(factor);
        }
      });
    }
    if (lightRef.current) {
      lightRef.current.intensity = 2.2 + Math.sin(state.clock.elapsedTime * 18) * 0.7;
    }
  });

  return (
    <group ref={meshRef} scale={0.9} position={[0, -0.1, 0]}>
      {/* Heavy Fireplace Iron Body */}
      <mesh>
        <boxGeometry args={[1.2, 1.3, 0.65]} />
        <meshStandardMaterial color="#0f172a" metalness={0.9} roughness={0.3} />
      </mesh>
      {/* Outer Golden Glass Trim */}
      <mesh position={[0, 0, 0.33]}>
        <boxGeometry args={[1.0, 0.8, 0.025]} />
        <meshStandardMaterial color="#C9A96E" metalness={0.95} roughness={0.1} />
      </mesh>
      {/* Glass Panel */}
      <mesh position={[0, 0, 0.32]}>
        <planeGeometry args={[0.96, 0.76]} />
        <meshStandardMaterial color="#ffffff" transparent opacity={0.2} roughness={0.05} />
      </mesh>
      {/* Inner Chamber Backing */}
      <mesh position={[0, 0, 0.04]}>
        <boxGeometry args={[1.04, 0.84, 0.52]} />
        <meshStandardMaterial color="#1a0c02" roughness={0.95} />
      </mesh>

      {/* Wood Logs inside chamber */}
      <mesh position={[0.18, -0.25, 0.18]} rotation={[0, 0.35, 0.15]}>
        <cylinderGeometry args={[0.05, 0.05, 0.44, 8]} />
        <meshStandardMaterial color="#451a03" roughness={0.9} />
      </mesh>
      <mesh position={[-0.18, -0.25, 0.18]} rotation={[0, -0.35, -0.15]}>
        <cylinderGeometry args={[0.05, 0.05, 0.44, 8]} />
        <meshStandardMaterial color="#3f1601" roughness={0.9} />
      </mesh>
      <mesh position={[0, -0.18, 0.14]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.045, 0.045, 0.52, 8]} />
        <meshStandardMaterial color="#4c1d01" roughness={0.9} />
      </mesh>

      {/* Fire Particles */}
      <group ref={particlesRef}>
        {particles.map((p, idx) => (
          <mesh key={idx} position={[p.x, p.y, p.z]}>
            <sphereGeometry args={[p.size, 8, 8]} />
            <meshBasicMaterial
              color={idx % 3 === 0 ? "#ea580c" : idx % 3 === 1 ? "#f97316" : "#facc15"}
              transparent
              opacity={0.8}
            />
          </mesh>
        ))}
      </group>

      <pointLight
        ref={lightRef}
        position={[0, -0.1, 0.2]}
        color="#f97316"
        intensity={2.8}
        distance={2.0}
      />
    </group>
  );
}

// 4. BBQ GRILL MODEL
function BBQGrillModel({ isHovered }: { isHovered: boolean }) {
  const hoodRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.1;
    }
    if (hoodRef.current) {
      const targetRotation = isHovered ? -Math.PI / 2.8 : 0;
      hoodRef.current.rotation.x = THREE.MathUtils.lerp(hoodRef.current.rotation.x, targetRotation, 0.1);
    }
  });

  return (
    <group ref={meshRef} scale={0.8} position={[0, -0.15, 0]}>
      {/* Base Cabinet Body */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.4, 0.9, 0.8]} />
        <meshStandardMaterial color="#1e293b" metalness={0.9} roughness={0.15} />
      </mesh>
      {/* Front Control Panel Trim */}
      <mesh position={[0, 0.35, 0.41]}>
        <boxGeometry args={[1.36, 0.15, 0.03]} />
        <meshStandardMaterial color="#C9A96E" metalness={0.95} roughness={0.1} />
      </mesh>
      {/* Control Knobs */}
      {[-0.45, -0.22, 0, 0.22, 0.45].map((x, i) => (
        <mesh key={i} position={[x, 0.35, 0.435]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.035, 0.035, 0.03, 12]} />
          <meshStandardMaterial color="#0f172a" metalness={0.8} roughness={0.2} />
        </mesh>
      ))}
      {/* Glowing Embers under grate */}
      <mesh position={[0, 0.46, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.25, 0.65]} />
        <meshStandardMaterial
          color="#ef4444"
          emissive="#ef4444"
          emissiveIntensity={isHovered ? 2.6 : 1.2}
        />
      </mesh>
      {/* Grill Grate */}
      <mesh position={[0, 0.47, 0]}>
        <boxGeometry args={[1.28, 0.01, 0.7]} />
        <meshStandardMaterial color="#0f172a" metalness={0.9} roughness={0.7} />
      </mesh>

      {/* BBQ Lid / Hood (Rotating Assembly) */}
      <group ref={hoodRef} position={[0, 0.47, -0.35]}>
        <mesh position={[0, 0.22, 0.35]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry
            args={[0.38, 0.38, 1.34, 16, 1, false, 0, Math.PI]}
          />
          <meshStandardMaterial color="#334155" metalness={0.9} roughness={0.1} />
        </mesh>
        {/* Handle */}
        <mesh position={[0, 0.42, 0.68]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.018, 0.018, 0.9, 12]} />
          <meshStandardMaterial color="#C9A96E" metalness={0.95} roughness={0.15} />
        </mesh>
      </group>
    </group>
  );
}

// 5. ACCESSORIES MODEL (Solar Cover Roller)
function AccessoriesModel({ isHovered }: { isHovered: boolean }) {
  const rollRef = useRef<THREE.Mesh>(null);
  const meshRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.15;
    }
    if (rollRef.current) {
      rollRef.current.rotation.x += isHovered ? 0.08 : 0.015;
    }
  });

  return (
    <group ref={meshRef} scale={0.9} position={[0, 0, 0]}>
      {/* Central winding cylinder (roll of cover) */}
      <mesh ref={rollRef} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.26, 0.26, 1.2, 24]} />
        <meshStandardMaterial color="#2563eb" metalness={0.4} roughness={0.5} />
      </mesh>
      {/* Golden trim stripes */}
      {[...Array(5)].map((_, i) => (
        <mesh key={i} position={[-0.45 + i * 0.22, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.27, 0.27, 0.025, 24]} />
          <meshStandardMaterial color="#C9A96E" metalness={0.9} roughness={0.1} />
        </mesh>
      ))}
      {/* Side supports */}
      <mesh position={[-0.65, -0.38, 0]}>
        <boxGeometry args={[0.08, 0.76, 0.26]} />
        <meshStandardMaterial color="#475569" metalness={0.9} roughness={0.2} />
      </mesh>
      <mesh position={[0.65, -0.38, 0]}>
        <boxGeometry args={[0.08, 0.76, 0.26]} />
        <meshStandardMaterial color="#475569" metalness={0.9} roughness={0.2} />
      </mesh>
      {/* Stands base */}
      <mesh position={[-0.65, -0.76, 0]}>
        <boxGeometry args={[0.22, 0.04, 0.36]} />
        <meshStandardMaterial color="#0f172a" metalness={0.9} roughness={0.15} />
      </mesh>
      <mesh position={[0.65, -0.76, 0]}>
        <boxGeometry args={[0.22, 0.04, 0.36]} />
        <meshStandardMaterial color="#0f172a" metalness={0.9} roughness={0.15} />
      </mesh>
      {/* Roll Wheel Handle */}
      <mesh position={[0.72, -0.05, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.16, 0.16, 0.03, 16]} />
        <meshStandardMaterial color="#C9A96E" metalness={0.9} roughness={0.1} />
      </mesh>
    </group>
  );
}

export default function ProductCanvas({ category, isHovered }: ProductCanvasProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div className="w-full h-full bg-slate-900/5" />;
  }

  const renderModel = () => {
    switch (category) {
      case "heat-pumps":
        return <HeatPumpModel isHovered={isHovered} />;
      case "pool-pumps":
        return <PoolPumpModel isHovered={isHovered} />;
      case "fireplaces":
        return <FireplaceModel isHovered={isHovered} />;
      case "bbq-grills":
        return <BBQGrillModel isHovered={isHovered} />;
      case "accessories":
      default:
        return <AccessoriesModel isHovered={isHovered} />;
    }
  };

  return (
    <div className="w-full h-full relative overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 2.3], fov: 48 }}
        gl={{ antialias: true, alpha: true }}
        style={{ pointerEvents: "none" }}
      >
        <ambientLight intensity={0.65} />
        <pointLight position={[3, 3, 3]} intensity={1.5} color="#e8d5b0" />
        <directionalLight position={[-3, 3, 2]} intensity={0.95} color="#ffffff" />
        
        {renderModel()}
        
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />
      </Canvas>
    </div>
  );
}
