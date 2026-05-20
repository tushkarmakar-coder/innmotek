"use client";

import React, { useRef, useEffect, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Stars, AdaptiveDpr, AdaptiveEvents, useTexture } from "@react-three/drei";
import * as THREE from "three";

// ────────────────────────────────────────────────────────
// HIGH-FIDELITY INTERACTIVE IMAGE-BASED HEAT PUMP
// ────────────────────────────────────────────────────────
function CinematicHeatPump() {
  const groupRef = useRef<THREE.Group>(null);
  
  // Refs for the 4 quarters of the normal casing
  const tlRef = useRef<THREE.Mesh>(null);
  const trRef = useRef<THREE.Mesh>(null);
  const blRef = useRef<THREE.Mesh>(null);
  const brRef = useRef<THREE.Mesh>(null);
  const explodedRef = useRef<THREE.Mesh>(null);

  // Mouse coordinate refs for interactive parallax tilt
  const mouse = useRef({ x: 0, y: 0 });
  const hoveredRef = useRef(false);
  const explodeFactorRef = useRef(0);

  // Load High-Fidelity Pre-Rendered Images
  const textureNormal = useTexture("/images/heat_pump.png");
  const textureExploded = useTexture("/images/cinematic_heat_pump_exploded.png");

  // Create clean clones of the texture for the 4 quarters to split them
  const quarters = useMemo(() => {
    if (!textureNormal) return null;

    // Top-Left Quarter
    const tl = textureNormal.clone();
    tl.repeat.set(0.5, 0.5);
    tl.offset.set(0, 0.5);
    tl.needsUpdate = true;

    // Top-Right Quarter
    const tr = textureNormal.clone();
    tr.repeat.set(0.5, 0.5);
    tr.offset.set(0.5, 0.5);
    tr.needsUpdate = true;

    // Bottom-Left Quarter
    const bl = textureNormal.clone();
    bl.repeat.set(0.5, 0.5);
    bl.offset.set(0, 0);
    bl.needsUpdate = true;

    // Bottom-Right Quarter
    const br = textureNormal.clone();
    br.repeat.set(0.5, 0.5);
    br.offset.set(0.5, 0);
    br.needsUpdate = true;

    return { tl, tr, bl, br };
  }, [textureNormal]);

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
    // Gentle idle breathing cycle (between 0.0 and 0.06)
    const breathe = 0.03 + Math.sin(time * 1.5) * 0.03;
    const targetExplode = hoveredRef.current ? 1.0 : breathe;
    explodeFactorRef.current = THREE.MathUtils.lerp(explodeFactorRef.current, targetExplode, 0.08);
    const explode = explodeFactorRef.current;

    // 2. PARALLAX TILT + OSCILLATION (Continuous floating rotation)
    // Gentle back-and-forth oscillation so it never turns flat
    const baseRotationY = Math.sin(time * 0.3) * 0.15;
    if (groupRef.current) {
      const targetRotY = baseRotationY + mouse.current.x * 0.55;
      const targetRotX = mouse.current.y * 0.35;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.05);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.05);
      // Subtle float up and down
      groupRef.current.position.y = -0.1 + Math.sin(time * 1.0) * 0.04;
    }

    // 3. UPDATE QUARTER PANELS (SPLITTING OUTWARD & FADING)
    const splitDist = 0.65 * explode;
    const opacity = 1.0 - explode * 1.0;

    if (tlRef.current) {
      tlRef.current.position.x = -0.4 - splitDist;
      tlRef.current.position.y = 0.4 + splitDist;
      tlRef.current.position.z = explode * 0.15;
      (tlRef.current.material as THREE.MeshBasicMaterial).opacity = opacity;
    }
    if (trRef.current) {
      trRef.current.position.x = 0.4 + splitDist;
      trRef.current.position.y = 0.4 + splitDist;
      trRef.current.position.z = explode * 0.15;
      (trRef.current.material as THREE.MeshBasicMaterial).opacity = opacity;
    }
    if (blRef.current) {
      blRef.current.position.x = -0.4 - splitDist;
      blRef.current.position.y = -0.4 - splitDist;
      blRef.current.position.z = explode * 0.15;
      (blRef.current.material as THREE.MeshBasicMaterial).opacity = opacity;
    }
    if (brRef.current) {
      brRef.current.position.x = 0.4 + splitDist;
      brRef.current.position.y = -0.4 - splitDist;
      brRef.current.position.z = explode * 0.15;
      (brRef.current.material as THREE.MeshBasicMaterial).opacity = opacity;
    }

    // 4. UPDATE BACKGROUND EXPLODED VIEW (ZOOM IN & FADE IN)
    if (explodedRef.current) {
      explodedRef.current.position.z = -0.05 + explode * 0.05;
      const scale = 1.45 + explode * 0.15; // grows from 1.45 to 1.6
      explodedRef.current.scale.set(scale, scale, 1);
      (explodedRef.current.material as THREE.MeshBasicMaterial).opacity = explode;
    }
  });

  if (!quarters) return null;

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
        <boxGeometry args={[2.0, 2.0, 2.0]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>

      {/* Background Exploded View */}
      <mesh ref={explodedRef} position={[0, 0, -0.05]}>
        <planeGeometry args={[1.6, 1.6]} />
        <meshBasicMaterial map={textureExploded} transparent={true} opacity={0} depthWrite={false} />
      </mesh>

      {/* Top-Left Quarter */}
      <mesh ref={tlRef} position={[-0.4, 0.4, 0]}>
        <planeGeometry args={[0.8, 0.8]} />
        <meshBasicMaterial map={quarters.tl} transparent={true} opacity={1} depthWrite={false} />
      </mesh>

      {/* Top-Right Quarter */}
      <mesh ref={trRef} position={[0.4, 0.4, 0]}>
        <planeGeometry args={[0.8, 0.8]} />
        <meshBasicMaterial map={quarters.tr} transparent={true} opacity={1} depthWrite={false} />
      </mesh>

      {/* Bottom-Left Quarter */}
      <mesh ref={blRef} position={[-0.4, -0.4, 0]}>
        <planeGeometry args={[0.8, 0.8]} />
        <meshBasicMaterial map={quarters.bl} transparent={true} opacity={1} depthWrite={false} />
      </mesh>

      {/* Bottom-Right Quarter */}
      <mesh ref={brRef} position={[0.4, -0.4, 0]}>
        <planeGeometry args={[0.8, 0.8]} />
        <meshBasicMaterial map={quarters.br} transparent={true} opacity={1} depthWrite={false} />
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
          <React.Suspense fallback={null}>
            {/* 1. CINEMATIC EXPLODING HEAT PUMP */}
            <CinematicHeatPump />
          </React.Suspense>

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