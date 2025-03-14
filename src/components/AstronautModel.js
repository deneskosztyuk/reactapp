import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

// ✅ Floating & Rotating Astronaut Component (Inside Canvas)
function AnimatedAstronaut() {
  const { scene } = useGLTF("/Astronaut.glb"); // Ensure the file is inside "public/"
  const astronautRef = useRef();

  // Frame-based animation (Floating & Rotating)
  useFrame(({ clock }) => {
    if (astronautRef.current) {
      astronautRef.current.position.y = Math.sin(clock.elapsedTime) * 0.7 - 3; // Floating
      astronautRef.current.rotation.y += 0.005; // Rotating
    }
  });

  return <primitive ref={astronautRef} object={scene} scale={1.2} position={[0, -3, -1]} />;
}

// ✅ Main Astronaut Model Component
export default function AstronautModel() {
  return (
    <Canvas camera={{ position: [0, 2, 7], fov: 65 }} className="w-full h-full">
      {/* Lighting */}
      <ambientLight intensity={1.0} />
      <directionalLight position={[5, 5, 5]} intensity={2} />
      <spotLight position={[10, 10, 10]} angle={0.15} intensity={2} />

      {/* ✅ Floating & Rotating Model (Inside Canvas) */}
      <AnimatedAstronaut />

      {/* Controls to move the model */}
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.3} />
    </Canvas>
  );
}
