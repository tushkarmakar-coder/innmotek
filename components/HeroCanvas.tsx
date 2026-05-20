"use client";

import React, { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Stars, AdaptiveDpr, AdaptiveEvents } from "@react-three/drei";
import * as THREE from "three";

// ────────────────────────────────────────────────────────
// CINEMATIC EXPLODING HEAT PUMP MODEL
// ────────────────────────────────────────────────────────
function CinematicHeatPump() {
  const groupRef = useRef<THREE.Group>(null);
  const fanRef = useRef<THREE.Group>(null);
  const innerRingsRef = useRef<THREE.Group>(null);
  
  // Panel Refs for Exploded View
  const frontPanelRef = useRef<THREE.Group>(null);
  const backPanelRef = useRef<THREE.Mesh>(null);
  const leftPanelRef = useRef<THREE.Group>(null);
  const rightPanelRef = useRef<THREE.Group>(null);
  const topPanelRef = useRef<THREE.Group>(null);
  const bottomPanelRef = useRef<THREE.Mesh>(null);
  const centralLightRef = useRef<THREE.PointLight>(null);

  // Mouse coordinate refs for interactive parallax tilt
  const mouse = useRef({ x: 0, y: 0 });
  const hoveredRef = useRef(false);
  const explodeFactorRef = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) - 0.5;
      mouse.current.y = (e.clientY / window.innerHeight) - 0.5;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    // 1. ANIMATE EXPLOSION (LERPING)
    // Idle state: gentle breathing open/close cycle (sine wave between 0.10 and 0.22)
    const breathe = 0.14 + Math.sin(time * 1.5) * 0.08;
    const targetExplode = hoveredRef.current ? 1.0 : breathe;
    explodeFactorRef.current = THREE.MathUtils.lerp(explodeFactorRef.current, targetExplode, 0.065);
    const explode = explodeFactorRef.current;

    // 2. PARALLAX TILT + SLOW ROTATION
    const baseRotationY = time * 0.20;
    if (groupRef.current) {
      const targetRotY = baseRotationY + mouse.current.x * 0.50;
      const targetRotX = mouse.current.y * 0.30;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.05);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.05);
    }

    // 3. SPIN MECHANICAL PARTS
    // Fan blades inside front panel spin continuously (accelerating when exploded)
    if (fanRef.current) {
      fanRef.current.rotation.z += 0.06 + explode * 0.14;
    }
    // Orbiting internal thermodynamic refrigerant gas rings
    if (innerRingsRef.current) {
      const rings = innerRingsRef.current.children as THREE.Mesh[];
      if (rings[0]) rings[0].rotation.y = time * 1.1;
      if (rings[1]) rings[1].rotation.y = -time * 0.8;
    }

    // 4. SHIFT CASING PANELS OUTWARD (EXPLODED VIEW)
    // Front Panel moves forward (+Z)
    if (frontPanelRef.current) {
      frontPanelRef.current.position.z = 0.32 + explode * 0.52;
    }
    // Back Panel moves backward (-Z)
    if (backPanelRef.current) {
      backPanelRef.current.position.z = -0.32 - explode * 0.52;
    }
    // Left venting Panel moves left (-X)
    if (leftPanelRef.current) {
      leftPanelRef.current.position.x = -0.62 - explode * 0.48;
    }
    // Right panel (with screen) moves right (+X)
    if (rightPanelRef.current) {
      rightPanelRef.current.position.x = 0.62 + explode * 0.48;
    }
    // Top Lid Panel moves up (+Y)
    if (topPanelRef.current) {
      topPanelRef.current.position.y = 0.62 + explode * 0.45;
    }
    // Bottom Base moves slightly down (-Y)
    if (bottomPanelRef.current) {
      bottomPanelRef.current.position.y = -0.62 - explode * 0.12;
    }

    // 5. PULSE INTERNAL GOLDEN GLOW LIGHT
    if (centralLightRef.current) {
      centralLightRef.current.intensity = (4.0 + Math.sin(time * 8) * 1.2) * (1 + explode * 1.5);
    }
  });

  // Premium Material Configurations - Slate Blue Brushed Steel
  const titaniumMetalMaterial = (
    <meshStandardMaterial color="#5e6680" metalness={0.45} roughness={0.2} />
  );
  const goldAccentMaterial = (
    <meshStandardMaterial color="#dfba73" metalness={0.45} roughness={0.15} />
  );

  return (
    <group ref={groupRef} position={[0, -0.1, 0]} scale={1.15}>
      {/* Invisible hover detector box */}
      <mesh
        onPointerOver={() => {
          hoveredRef.current = true;
        }}
        onPointerOut={() => {
          hoveredRef.current = false;
        }}
      >
        <boxGeometry args={[2.2, 2.2, 2.2]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>

      {/* Internal parts */}
      <group position={[0, 0, 0]}>
        {/* Core Cylinder / Compressor */}
        <group position={[-0.14, -0.12, 0.05]}>
          <mesh>
            <cylinderGeometry args={[0.16, 0.16, 0.48, 24]} />
            <meshStandardMaterial color="#B08F52" metalness={0.4} roughness={0.3} />
          </mesh>
          <mesh position={[0, 0.24, 0]}>
            <sphereGeometry args={[0.16, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshStandardMaterial color="#dfba73" metalness={0.5} roughness={0.25} />
          </mesh>
          <mesh position={[0, 0.08, 0]}>
            <torusGeometry args={[0.165, 0.015, 8, 32]} />
            <meshStandardMaterial color="#1f1f26" metalness={0.4} roughness={0.4} />
          </mesh>
          <mesh position={[0, -0.08, 0]}>
            <torusGeometry args={[0.165, 0.015, 8, 32]} />
            <meshStandardMaterial color="#1f1f26" metalness={0.4} roughness={0.4} />
          </mesh>
          <mesh position={[0.14, -0.04, 0.06]}>
            <cylinderGeometry args={[0.07, 0.07, 0.36, 16]} />
            <meshStandardMaterial color="#8C6F3D" metalness={0.4} roughness={0.3} />
          </mesh>
        </group>

        {/* Heat Exchanger Coils (horizontal copper tubes) */}
        <group position={[0.15, -0.08, -0.08]}>
          {[...Array(6)].map((_, i) => (
            <mesh key={i} position={[0, -0.2 + i * 0.1, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[0.22, 0.024, 12, 48]} />
              <meshStandardMaterial color="#bf7d43" metalness={0.5} roughness={0.2} />
            </mesh>
          ))}
        </group>

        {/* Copper Piping Connections */}
        <mesh position={[-0.04, -0.3, 0.05]} rotation={[0, 0, Math.PI / 4]}>
          <cylinderGeometry args={[0.02, 0.02, 0.22, 12]} />
          <meshStandardMaterial color="#bf7d43" metalness={0.5} roughness={0.2} />
        </mesh>
        <mesh position={[0.08, -0.22, -0.02]} rotation={[0, Math.PI / 3, Math.PI / 2]}>
          <cylinderGeometry args={[0.018, 0.018, 0.16, 12]} />
          <meshStandardMaterial color="#bf7d43" metalness={0.5} roughness={0.2} />
        </mesh>

        {/* Internal Thermodynamic Rings */}
        <group ref={innerRingsRef}>
          <mesh rotation={[Math.PI / 2.2, Math.PI / 12, 0]}>
            <torusGeometry args={[0.34, 0.012, 16, 64]} />
            <meshBasicMaterial color="#eab308" transparent opacity={0.95} />
          </mesh>
          <mesh rotation={[Math.PI / 1.8, -Math.PI / 8, Math.PI / 4]}>
            <torusGeometry args={[0.38, 0.008, 16, 64]} />
            <meshBasicMaterial color="#f97316" transparent opacity={0.8} />
          </mesh>
        </group>

        {/* Central Golden Glow Light */}
        <pointLight ref={centralLightRef} position={[0, 0, 0]} color="#facc15" intensity={4.0} distance={4.0} />
      </group>

      {/* Front Panel (Grille & Fan) */}
      <group ref={frontPanelRef} position={[0, 0, 0.32]}>
        <mesh>
          <boxGeometry args={[1.2, 1.2, 0.03]} />
          {titaniumMetalMaterial}
        </mesh>
        {/* Fan circular cutout border */}
        <mesh position={[0, 0.1, -0.01]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.34, 0.34, 0.02, 32]} />
          <meshStandardMaterial color="#08070b" metalness={0.3} roughness={0.8} />
        </mesh>
        {/* Gold Border Trim */}
        <mesh position={[0, 0.605, 0.016]}>
          <boxGeometry args={[1.22, 0.015, 0.01]} />
          {goldAccentMaterial}
        </mesh>
        <mesh position={[0, -0.605, 0.016]}>
          <boxGeometry args={[1.22, 0.015, 0.01]} />
          {goldAccentMaterial}
        </mesh>
        <mesh position={[-0.605, 0, 0.016]}>
          <boxGeometry args={[0.015, 1.22, 0.01]} />
          {goldAccentMaterial}
        </mesh>
        <mesh position={[0.605, 0, 0.016]}>
          <boxGeometry args={[0.015, 1.22, 0.01]} />
          {goldAccentMaterial}
        </mesh>
        {/* Decorative Grille Rings */}
        {[0.08, 0.16, 0.24, 0.32].map((radius, idx) => (
          <mesh key={`ring-${idx}`} position={[0, 0.1, 0.016]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[radius, 0.005, 8, 48]} />
            {goldAccentMaterial}
          </mesh>
        ))}
        {/* Grille Spokes */}
        {[...Array(12)].map((_, i) => {
          const angle = (i * Math.PI) / 6;
          return (
            <mesh key={`spoke-${i}`} position={[0, 0.1, 0.012]} rotation={[0, 0, angle]}>
              <boxGeometry args={[0.006, 0.64, 0.004]} />
              <meshStandardMaterial color="#0c0d12" metalness={0.9} roughness={0.2} />
            </mesh>
          );
        })}
        {/* Fan blades */}
        <group ref={fanRef} position={[0, 0.1, -0.02]}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.07, 0.07, 0.03, 16]} />
            {goldAccentMaterial}
          </mesh>
          <mesh position={[0, 0.17, 0]}>
            <boxGeometry args={[0.04, 0.28, 0.01]} />
            <meshStandardMaterial color="#2d3040" metalness={0.3} roughness={0.4} />
          </mesh>
          <mesh position={[0.147, -0.085, 0]} rotation={[0, 0, (2 * Math.PI) / 3]}>
            <boxGeometry args={[0.04, 0.28, 0.01]} />
            <meshStandardMaterial color="#2d3040" metalness={0.3} roughness={0.4} />
          </mesh>
          <mesh position={[-0.147, -0.085, 0]} rotation={[0, 0, (-2 * Math.PI) / 3]}>
            <boxGeometry args={[0.04, 0.28, 0.01]} />
            <meshStandardMaterial color="#2d3040" metalness={0.3} roughness={0.4} />
          </mesh>
        </group>
      </group>

      {/* Back Panel */}
      <mesh ref={backPanelRef} position={[0, 0, -0.32]}>
        <boxGeometry args={[1.2, 1.2, 0.03]} />
        {titaniumMetalMaterial}
      </mesh>

      {/* Left Venting Panel */}
      <group ref={leftPanelRef} position={[-0.62, 0, 0]}>
        <mesh>
          <boxGeometry args={[0.03, 1.2, 0.6]} />
          {titaniumMetalMaterial}
        </mesh>
        {/* Gold Border Trim */}
        <mesh position={[0, 0.605, 0]}>
          <boxGeometry args={[0.032, 0.015, 0.61]} />
          {goldAccentMaterial}
        </mesh>
        <mesh position={[0, -0.605, 0]}>
          <boxGeometry args={[0.032, 0.015, 0.61]} />
          {goldAccentMaterial}
        </mesh>
        {/* Venting slots */}
        {[-0.4, -0.2, 0, 0.2, 0.4].map((y, idx) => (
          <group key={idx} position={[0.002, y, 0]}>
            <mesh>
              <boxGeometry args={[0.032, 0.05, 0.46]} />
              <meshStandardMaterial color="#08070c" metalness={0.2} roughness={0.8} />
            </mesh>
            <mesh position={[0, 0.026, 0]}>
              <boxGeometry args={[0.034, 0.006, 0.46]} />
              {goldAccentMaterial}
            </mesh>
            <mesh position={[0, -0.026, 0]}>
              <boxGeometry args={[0.034, 0.006, 0.46]} />
              {goldAccentMaterial}
            </mesh>
          </group>
        ))}
      </group>

      {/* Right Panel (Interface / Screen) */}
      <group ref={rightPanelRef} position={[0.62, 0, 0]}>
        <mesh>
          <boxGeometry args={[0.03, 1.2, 0.6]} />
          {titaniumMetalMaterial}
        </mesh>
        {/* Gold Border Trim */}
        <mesh position={[0, 0.605, 0]}>
          <boxGeometry args={[0.032, 0.015, 0.61]} />
          {goldAccentMaterial}
        </mesh>
        <mesh position={[0, -0.605, 0]}>
          <boxGeometry args={[0.032, 0.015, 0.61]} />
          {goldAccentMaterial}
        </mesh>
        {/* Digital Screen Display */}
        <group position={[0.016, 0.25, 0]}>
          <mesh>
            <boxGeometry args={[0.01, 0.22, 0.32]} />
            {goldAccentMaterial}
          </mesh>
          <mesh position={[0.006, 0, 0]}>
            <boxGeometry args={[0.005, 0.18, 0.28]} />
            <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={2.5} />
          </mesh>
        </group>
        {/* Lower Logo / Status Panel badge */}
        <group position={[0.016, -0.15, 0]}>
          <mesh>
            <boxGeometry args={[0.008, 0.06, 0.2]} />
            {goldAccentMaterial}
          </mesh>
        </group>
      </group>

      {/* Top Lid Panel */}
      <group ref={topPanelRef} position={[0, 0.62, 0]}>
        <mesh>
          <boxGeometry args={[1.22, 0.04, 0.62]} />
          {titaniumMetalMaterial}
        </mesh>
        <mesh position={[0, -0.018, 0]}>
          <boxGeometry args={[1.24, 0.01, 0.64]} />
          {goldAccentMaterial}
        </mesh>
      </group>

      {/* Bottom Base */}
      <mesh ref={bottomPanelRef} position={[0, -0.62, 0]}>
        <boxGeometry args={[1.24, 0.06, 0.64]} />
        <meshStandardMaterial color="#08070b" metalness={0.9} roughness={0.3} />
      </mesh>
    </group>
  );
}

// ────────────────────────────────────────────────────────
// SUB-COMPONENT FOR ORBITING WIREFRAMES (Within Canvas)
// ────────────────────────────────────────────────────────
function ThermodynamicOrbits() {
  const wireframe1Ref = useRef<THREE.Mesh>(null);
  const wireframe2Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    if (wireframe1Ref.current) {
      wireframe1Ref.current.rotation.y = time * 0.35;
      wireframe1Ref.current.rotation.x = time * 0.1;
    }
    if (wireframe2Ref.current) {
      wireframe2Ref.current.rotation.y = -time * 0.25;
      wireframe2Ref.current.rotation.z = time * 0.15;
    }
  });

  return (
    <>
      <mesh ref={wireframe1Ref} rotation={[Math.PI / 3.2, 0, Math.PI / 6]}>
        <torusGeometry args={[1.35, 0.006, 8, 120]} />
        <meshBasicMaterial color="#eab308" transparent opacity={0.7} />
      </mesh>
      <mesh ref={wireframe2Ref} rotation={[-Math.PI / 4, 0, -Math.PI / 3]}>
        <torusGeometry args={[1.55, 0.004, 8, 120]} />
        <meshBasicMaterial color="#e8d5b0" transparent opacity={0.4} />
      </mesh>
    </>
  );
}

// ────────────────────────────────────────────────────────
// MAIN CANVAS COMPONENT
// ────────────────────────────────────────────────────────
export default function HeroCanvas() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div className="w-full h-full bg-[#08070C] relative" />;
  }

  return (
    <div className="w-full h-full relative bg-[#08070C] overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 2.6], fov: 48 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={["#08070C"]} />
        <ambientLight intensity={1.3} />
        <directionalLight position={[5, 6, 4]} intensity={4.0} color="#FDFDFE" />
        <directionalLight position={[0, 0, 6]} intensity={3.5} color="#ffffff" />
        <directionalLight position={[-4, 3, 2]} intensity={2.0} color="#e8d5b0" />
        <pointLight position={[0, 0, -2.5]} intensity={2.5} color="#C9A96E" />
        <pointLight position={[0, -0.6, 0.4]} intensity={2.0} color="#f97316" distance={3.0} />

        {/* Master Group shifted to the left to leave space for the card on the right */}
        <group position={[-0.38, 0.05, 0]}>
          {/* 1. CINEMATIC EXPLODING HEAT PUMP */}
          <CinematicHeatPump />

          {/* 2. ORBITING THERMODYNAMIC ENVELOPE WIREFRAMES */}
          <ThermodynamicOrbits />

          {/* 3. FLOATING MECHANICAL ORBITAL SPHERES (Chrome & Gold details) */}
          <Float speed={1.6} floatIntensity={0.7} rotationIntensity={0.2}>
            <mesh position={[-1.2, 0.7, 0.4]}>
              <sphereGeometry args={[0.11, 32, 32]} />
              <meshStandardMaterial color="#e8d5b0" metalness={0.95} roughness={0.05} />
            </mesh>
          </Float>
          
          <Float speed={1.3} floatIntensity={0.5} rotationIntensity={0.2}>
            <mesh position={[1.3, -0.5, -0.3]}>
              <sphereGeometry args={[0.15, 32, 32]} />
              <meshStandardMaterial color="#C9A96E" metalness={0.98} roughness={0.06} />
            </mesh>
          </Float>

          <Float speed={1.9} floatIntensity={0.9} rotationIntensity={0.3}>
            <mesh position={[0.9, 0.9, -0.4]}>
              <sphereGeometry args={[0.07, 32, 32]} />
              <meshStandardMaterial color="#ffffff" metalness={0.95} roughness={0.05} />
            </mesh>
          </Float>
        </group>
        
        {/* Subtle background star dust */}
        <Stars
          radius={70}
          depth={30}
          count={500}
          factor={2.5}
          saturation={0.3}
          fade
          speed={0.5}
        />
        
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />
      </Canvas>
    </div>
  );
}