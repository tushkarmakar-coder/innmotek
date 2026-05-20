"use client";

import React, { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Stars, AdaptiveDpr, AdaptiveEvents, useTexture } from "@react-three/drei";
import * as THREE from "three";

// ────────────────────────────────────────────────────────
// HIGH-FIDELITY INTERACTIVE IMAGE-BASED HEAT PUMP
// ────────────────────────────────────────────────────────
function CinematicHeatPump() {
  const groupRef = useRef<THREE.Group>(null);
  
  // Refs for the normal and exploded meshes
  const normalRef = useRef<THREE.Mesh>(null);
  const explodedRef = useRef<THREE.Mesh>(null);

  // Refs for the shader materials to update uniforms
  const normalShaderRef = useRef<THREE.ShaderMaterial>(null);
  const explodedShaderRef = useRef<THREE.ShaderMaterial>(null);

  // Mouse coordinate refs for interactive parallax tilt
  const mouse = useRef({ x: 0, y: 0 });
  const hoveredRef = useRef(false);
  const explodeFactorRef = useRef(0);

  // Load High-Fidelity Pre-Rendered Images
  const textureNormal = useTexture("/images/heat_pump_closed.png");
  const textureExploded = useTexture("/images/cinematic_heat_pump_exploded.png");

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
    // Gentle idle breathing cycle (between 0.0 and 0.04)
    const breathe = 0.02 + Math.sin(time * 1.5) * 0.02;
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

    // 3. UPDATE SOLID NORMAL PLANE (SLIDE FORWARD & FADE OUT)
    if (normalRef.current) {
      // Slides forward slightly as it dissolves to create depth
      normalRef.current.position.z = explode * 0.12;
      normalRef.current.scale.set(1.0, 1.0, 1);
    }
    if (normalShaderRef.current) {
      normalShaderRef.current.uniforms.opacity.value = 1.0 - explode;
    }

    // 4. UPDATE BACKGROUND EXPLODED VIEW (SLIDE IN & FADE IN)
    if (explodedRef.current) {
      // Moves from slightly behind to the base position
      explodedRef.current.position.z = -0.06 + explode * 0.06;
      explodedRef.current.scale.set(1.0, 1.0, 1);
    }
    if (explodedShaderRef.current) {
      explodedShaderRef.current.uniforms.opacity.value = explode;
    }
  });

  // Custom shader definition to remove dark backgrounds and make them transparent
  const chromaKeyShaderArgs = (tex: THREE.Texture, initialOpacity: number) => ({
    uniforms: {
      tDiffuse: { value: tex },
      opacity: { value: initialOpacity }
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform sampler2D tDiffuse;
      uniform float opacity;
      varying vec2 vUv;
      void main() {
        vec4 texColor = texture2D(tDiffuse, vUv);
        // Calculate brightness
        float brightness = max(texColor.r, max(texColor.g, texColor.b));
        // Smoothly fade out dark pixels to remove the black/smoke background
        float alpha = smoothstep(0.04, 0.18, brightness);
        gl_FragColor = vec4(texColor.rgb, alpha * opacity);
      }
    `,
    transparent: true,
    depthWrite: false
  });

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
      <mesh ref={explodedRef} position={[0, 0, -0.06]}>
        <planeGeometry args={[1.6, 1.6]} />
        <shaderMaterial ref={explodedShaderRef} args={[chromaKeyShaderArgs(textureExploded, 0.0)]} />
      </mesh>

      {/* Normal View Casing */}
      <mesh ref={normalRef} position={[0, 0, 0]}>
        <planeGeometry args={[1.6, 1.6]} />
        <shaderMaterial ref={normalShaderRef} args={[chromaKeyShaderArgs(textureNormal, 1.0)]} />
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

        {/* Master Group shifted to the right to position the model centered in the dark column */}
        <group position={[0.12, 0.05, 0]}>
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