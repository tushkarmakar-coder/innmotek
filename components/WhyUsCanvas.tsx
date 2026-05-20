"use client";

import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { AdaptiveDpr, AdaptiveEvents, useTexture, Stars } from "@react-three/drei";
import * as THREE from "three";

// ────────────────────────────────────────────────────────
// INTERACTIVE EXPLODING FIREPLACE MODEL FOR WHY US SECTION
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
    const baseRotationY = Math.sin(time * 0.3) * 0.15;
    if (groupRef.current) {
      const targetRotY = baseRotationY + mouse.current.x * 0.55;
      const targetRotX = mouse.current.y * 0.35;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.05);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.05);
      groupRef.current.position.y = Math.sin(time * 1.0) * 0.04;
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
    <group ref={groupRef} position={[0, -0.05, 0]} scale={1.15}>
      {/* Invisible hover detector box */}
      <mesh
        onPointerOver={(e) => {
          if (e.pointerType === "mouse") {
            hoveredRef.current = true;
          }
        }}
        onPointerOut={(e) => {
          if (e.pointerType === "mouse") {
            hoveredRef.current = false;
          }
        }}
        onPointerDown={(e) => {
          if (e.pointerType === "touch") {
            e.stopPropagation();
            hoveredRef.current = !hoveredRef.current;
          }
        }}
      >
        <boxGeometry args={[2.0, 2.0, 2.0]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>

      {/* Exploded View */}
      <mesh ref={explodedRef} position={[0, 0, -0.06]}>
        <planeGeometry args={[1.6, 1.6]} />
        <shaderMaterial ref={explodedShaderRef} args={[chromaKeyShaderArgs(textureExploded, 0.0)]} />
      </mesh>

      {/* Closed View */}
      <mesh ref={normalRef} position={[0, 0, 0]}>
        <planeGeometry args={[1.6, 1.6]} />
        <shaderMaterial ref={normalShaderRef} args={[chromaKeyShaderArgs(textureNormal, 1.0)]} />
      </mesh>
    </group>
  );
}

// Orbiting Rings
function ThermodynamicOrbits() {
  const wireframeRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (wireframeRef.current) {
      wireframeRef.current.rotation.y = state.clock.elapsedTime * 0.25;
      wireframeRef.current.rotation.x = state.clock.elapsedTime * 0.08;
    }
  });

  return (
    <mesh ref={wireframeRef}>
      <torusGeometry args={[1.4, 0.005, 8, 120]} />
      <meshBasicMaterial color="#eab308" transparent opacity={0.3} />
    </mesh>
  );
}

export default function WhyUsCanvas() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div className="absolute inset-0 bg-[#0a0f1d]" />;
  }

  return (
    <div className="absolute inset-0 bg-[#0a0f1d] overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 2.8], fov: 48 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={["#0a0f1d"]} />
        <ambientLight intensity={1.5} />
        <directionalLight position={[0, 0, 5]} intensity={2.5} />

        <React.Suspense fallback={null}>
          <ExplodingFireplace />
        </React.Suspense>

        <ThermodynamicOrbits />

        <Stars
          radius={60}
          depth={25}
          count={250}
          factor={2.0}
          saturation={0.3}
          fade
          speed={0.4}
        />

        <AdaptiveDpr pixelated />
        <AdaptiveEvents />
      </Canvas>
    </div>
  );
}
