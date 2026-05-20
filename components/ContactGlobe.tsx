"use client";

import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { AdaptiveDpr, AdaptiveEvents } from "@react-three/drei";
import * as THREE from "three";

// Spherical coordinates conversion for plotting on globe
// Radius of globe is 1.5
function getCoords(lat: number, lon: number, radius = 1.5): [number, number, number] {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);

  const x = -(radius * Math.sin(phi) * Math.sin(theta));
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.cos(theta);

  return [x, y, z];
}

const INDIAN_CITIES = [
  { name: "Gorakhpur (HQ)", lat: 26.76, lon: 83.37, color: "#C45B2A" }, // Rust color for HQ
  { name: "New Delhi", lat: 28.61, lon: 77.21, color: "#C9A96E" }, // Gold
  { name: "Mumbai", lat: 19.07, lon: 72.87, color: "#C9A96E" }, // Gold
  { name: "Bengaluru", lat: 12.97, lon: 77.59, color: "#C9A96E" }, // Gold
  { name: "Kolkata", lat: 22.57, lon: 88.36, color: "#C9A96E" }, // Gold
];

function Globe() {
  const globeRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.0025;
      globeRef.current.rotation.x = 0.15; // tilt the globe slightly
    }
  });

  return (
    <group ref={globeRef}>
      {/* Globe Wireframe Sphere */}
      <mesh>
        <sphereGeometry args={[1.5, 24, 24]} />
        <meshBasicMaterial color="#C9A96E" wireframe opacity={0.25} transparent />
      </mesh>

      {/* Lat/Long Grid Rings */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.5, 0.005, 8, 64]} />
        <meshBasicMaterial color="#C9A96E" opacity={0.15} transparent />
      </mesh>
      
      {/* Glowing Cities Coordinates */}
      {INDIAN_CITIES.map((city, idx) => {
        const coords = getCoords(city.lat, city.lon);
        return (
          <group key={idx} position={coords}>
            {/* The Dot */}
            <mesh>
              <sphereGeometry args={[0.04, 8, 8]} />
              <meshBasicMaterial color={city.color} />
            </mesh>
            {/* The Pulsing Glow Ring */}
            <mesh>
              <sphereGeometry args={[0.08, 8, 8]} />
              <meshBasicMaterial color={city.color} opacity={0.3} transparent />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

export default function ContactGlobe() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div className="w-full h-[250px] bg-charcoal/5 rounded-2xl flex items-center justify-center text-xs tracking-wider uppercase text-warm-gray">Loading 3D Globe...</div>;
  }

  return (
    <div className="w-full h-[250px] relative overflow-hidden rounded-2xl border border-gold-light/10 bg-gradient-to-br from-charcoal/90 to-navy/95 shadow-luxury">
      <Canvas
        camera={{ position: [0, 0, 3], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={["rgba(13, 27, 42, 0.0)"]} />
        <Globe />
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />
      </Canvas>
      <div className="absolute bottom-4 left-4 z-10 flex flex-col gap-1">
        <span className="text-[10px] tracking-[3px] uppercase font-bold text-gold">Serving all of India</span>
        <span className="text-[10px] text-white/50">Gorakhpur HQ • 12+ States Connected</span>
      </div>
    </div>
  );
}
