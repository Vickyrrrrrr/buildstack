"use client";

import type { MutableRefObject } from "react";
import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

type PointerState = {
  x: number;
  y: number;
};

function pseudoRandom(seed: number) {
  const value = Math.sin(seed * 12.9898) * 43758.5453;
  return value - Math.floor(value);
}

function CoreMesh({
  pointerRef,
  accentColor,
}: {
  pointerRef: MutableRefObject<PointerState>;
  accentColor: string;
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const group = groupRef.current;
    if (!group) return;

    group.rotation.y = THREE.MathUtils.lerp(group.rotation.y, pointerRef.current.x * 0.15, 0.05);
    group.rotation.x = THREE.MathUtils.lerp(group.rotation.x, -pointerRef.current.y * 0.15, 0.05);
    group.rotation.z = state.clock.elapsedTime * 0.08;
    
    // Gentle floating
    group.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2 - 0.5;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.2}>
      <group ref={groupRef} position={[0, -0.5, -3]}>
        {/* Outer subtle geometric wireframe */}
        <mesh>
          <icosahedronGeometry args={[2.2, 1]} />
          <meshStandardMaterial
            color={accentColor}
            wireframe
            transparent
            opacity={0.12}
          />
        </mesh>
        
        {/* Inner solid geometry - solid but sleek */}
        <mesh>
          <icosahedronGeometry args={[1.5, 0]} />
          <meshStandardMaterial
            color={accentColor}
            emissive={accentColor}
            emissiveIntensity={0.2}
            roughness={0.4}
            metalness={0.8}
            transparent
            opacity={0.85}
          />
        </mesh>
        
        {/* Floating Ring */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[3.2, 0.02, 16, 64]} />
          <meshBasicMaterial color={accentColor} transparent opacity={0.3} />
        </mesh>
      </group>
    </Float>
  );
}

function ParticleField({ accentColor }: { accentColor: string }) {
  const points = useMemo(() => {
    const vertices = new Float32Array(260 * 3);

    for (let index = 0; index < 260; index += 1) {
      vertices[index * 3] = (pseudoRandom(index + 1) - 0.5) * 12;
      vertices[index * 3 + 1] = (pseudoRandom(index + 2) - 0.5) * 7;
      vertices[index * 3 + 2] = (pseudoRandom(index + 3) - 0.5) * 8;
    }

    return vertices;
  }, []);

  const pointsRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    const pointsGroup = pointsRef.current;
    if (!pointsGroup) return;

    pointsGroup.rotation.y = state.clock.elapsedTime * 0.02;
    pointsGroup.position.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.15;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={points.length / 3}
          array={points}
          itemSize={3}
          args={[points, 3]}
        />
      </bufferGeometry>
      <pointsMaterial color={accentColor} size={0.018} transparent opacity={0.45} />
    </points>
  );
}

export function HeroScene() {
  const pointerRef = useRef<PointerState>({ x: 0, y: 0 });
  const accentColor = useMemo(() => {
    if (typeof window === "undefined") return "cyan";
    return getComputedStyle(document.documentElement).getPropertyValue("--accent-primary").trim() || "cyan";
  }, []);

  return (
    <Canvas
      className="absolute inset-0"
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      onPointerMove={(event) => {
        const x = (event.clientX / window.innerWidth) * 2 - 1;
        const y = (event.clientY / window.innerHeight) * 2 - 1;
        pointerRef.current = {
          x: Math.max(-1, Math.min(1, x)),
          y: Math.max(-1, Math.min(1, y)),
        };
      }}
    >
      <ambientLight intensity={0.45} />
      <directionalLight position={[4, 4, 4]} intensity={1.2} color={accentColor} />
      <PerspectiveCamera makeDefault position={[0, 0.8, 6.5]} />
      <CoreMesh pointerRef={pointerRef} accentColor={accentColor} />
      <ParticleField accentColor={accentColor} />
      <OrbitControls enabled={false} />
    </Canvas>
  );
}

export default HeroScene;
