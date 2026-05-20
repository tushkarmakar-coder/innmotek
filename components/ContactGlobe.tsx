"use client";

import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { AdaptiveDpr, AdaptiveEvents, useTexture, Stars } from "@react-three/drei";
import * as THREE from "three";

// ────────────────────────────────────────────────────────
// INTERACTIVE EXPLODING FIREPLACE MODEL
// ────────────────────────────────────────────────────────
function ExplodingFireplace() {
  const groupRef = useRef<THREE.Group>(null);
  const normalRef = useRef<THREE.Mesh>(null);
  const explodedRef = useRef<THREE.Mesh>(null);
  const normalShaderRef = useRef<THREE.ShaderMaterial>(null);
  const explodedShaderRef = useRef<THREE.ShaderMaterial>(null);

  const mouse = useRef({ x: 0, y: 0 });
  const hoveredRef = useRef(false);
  const explodeFactorRef = useRef(0);

  // Load High-Fidelity Fireplace Textures
  const textureNormal = useTexture("/images/fireplace_closed.png");
  const textureExploded = useTexture("/images/fireplace_exploded.png");

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

    // 1. ANIMATE EXPLOSION
    const breathe = 0.02 + Math.sin(time * 1.5) * 0.02;
    const targetExplode = hoveredRef.current ? 1.0 : breathe;
    explodeFactorRef.current = THREE.MathUtils.lerp(explodeFactorRef.current, targetExplode, 0.08);
    const explode = explodeFactorRef.current;

    // 2. PARALLAX TILT + OSCILLATION
    const baseRotationY = Math.sin(time * 0.35) * 0.12;
    if (groupRef.current) {
      const targetRotY = baseRotationY + mouse.current.x * 0.45;
      const targetRotX = mouse.current.y * 0.3;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.05);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.05);
      groupRef.current.position.y = Math.sin(time * 0.8) * 0.03;
    }

    // 3. UPDATE SOLID NORMAL PLANE
    if (normalRef.current) {
      normalRef.current.position.z = explode * 0.12;
      normalRef.current.scale.set(1.0, 1.0, 1);
    }
    if (normalShaderRef.current) {
      normalShaderRef.current.uniforms.opacity.value = 1.0 - explode;
    }

    // 4. UPDATE EXPLODED PLANE
    if (explodedRef.current) {
      explodedRef.current.position.z = -0.06 + explode * 0.06;
      explodedRef.current.scale.set(1.0, 1.0, 1);
    }
    if (explodedShaderRef.current) {
      explodedShaderRef.current.uniforms.opacity.value = explode;
    }
  });

  // Custom shader to discard dark backgrounds and soft feather borders
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
        
        // 1. CHROMA-KEY BRIGHTNESS FILTER
        float brightness = max(texColor.r, max(texColor.g, texColor.b));
        float brightnessAlpha = smoothstep(0.04, 0.18, brightness);
        
        // 2. RADIAL EDGE FEATHERING
        vec2 centerDist = vUv - vec2(0.5);
        float dist = length(centerDist);
        float radialAlpha = 1.0 - smoothstep(0.38, 0.49, dist);
        
        gl_FragColor = vec4(texColor.rgb, brightnessAlpha * radialAlpha * opacity);
      }
    `,
    transparent: true,
    depthWrite: false
  });

  return (
    <group ref={groupRef} position={[0, -0.05, 0]} scale={0.9}>
      {/* Invisible hover detector box */}
      <mesh
        onPointerOver={() => {
          hoveredRef.current = true;
        }}
        onPointerOut={() => {
          hoveredRef.current = false;
        }}
      >
        <boxGeometry args={[1.8, 1.8, 1.8]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>

      {/* Exploded View */}
      <mesh ref={explodedRef} position={[0, 0, -0.06]}>
        <planeGeometry args={[1.5, 1.5]} />
        <shaderMaterial ref={explodedShaderRef} args={[chromaKeyShaderArgs(textureExploded, 0.0)]} />
      </mesh>

      {/* Closed View */}
      <mesh ref={normalRef} position={[0, 0, 0]}>
        <planeGeometry args={[1.5, 1.5]} />
        <shaderMaterial ref={normalShaderRef} args={[chromaKeyShaderArgs(textureNormal, 1.0)]} />
      </mesh>
    </group>
  );
}

// Orbiting Rings
function DecorativeOrbits() {
  const ringsRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (ringsRef.current) {
      ringsRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });
  return (
    <group ref={ringsRef}>
      <mesh rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[1.1, 0.003, 8, 64]} />
        <meshBasicMaterial color="#eab308" opacity={0.25} transparent />
      </mesh>
      <mesh rotation={[-Math.PI / 4, Math.PI / 4, 0]}>
        <torusGeometry args={[1.2, 0.002, 8, 64]} />
        <meshBasicMaterial color="#ffffff" opacity={0.15} transparent />
      </mesh>
    </group>
  );
}

export default function ContactGlobe() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="w-full h-[250px] bg-charcoal/5 rounded-2xl flex items-center justify-center text-xs tracking-wider uppercase text-warm-gray animate-pulse">
        Loading 3D Fireplace Model...
      </div>
    );
  }

  return (
    <div className="w-full h-[250px] relative overflow-hidden rounded-2xl border border-gold-light/10 bg-gradient-to-br from-charcoal/90 to-navy/95 shadow-luxury">
      <Canvas
        camera={{ position: [0, 0, 2.0], fov: 46 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={["rgba(13, 27, 42, 0.0)"]} />
        <ambientLight intensity={1.5} />
        <directionalLight position={[0, 0, 4]} intensity={2.0} />

        <React.Suspense fallback={null}>
          <ExplodingFireplace />
        </React.Suspense>

        <DecorativeOrbits />

        {/* Subtle background star dust */}
        <Stars
          radius={50}
          depth={20}
          count={150}
          factor={1.8}
          saturation={0.2}
          fade
          speed={0.3}
        />

        <AdaptiveDpr pixelated />
        <AdaptiveEvents />
      </Canvas>
      <div className="absolute bottom-4 left-4 z-10 flex flex-col gap-1 pointer-events-none">
        <span className="text-[10px] tracking-[3px] uppercase font-bold text-gold">Helix Wood Fireplace</span>
        <span className="text-[10px] text-white/50">Clean-Burn Double Combustion • 3D Assembly</span>
      </div>
    </div>
  );
}
