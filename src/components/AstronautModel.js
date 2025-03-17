import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

function AnimatedAstronaut() {
  const { scene } = useGLTF("/Astronaut.glb");
  const astronautRef = useRef();

  useFrame(({ clock }) => {
    if (astronautRef.current) {
      // Adjust vertical position dynamically based on screen width
      const screenWidth = window.innerWidth;
      let baseYPosition = -2; // Default PC position

      if (screenWidth < 769) baseYPosition = -1.5; // Small tablets
      if (screenWidth < 481) baseYPosition = -1; // Mobile phones
      if (screenWidth < 376) baseYPosition = -0.4; // Smallest screens

      astronautRef.current.position.y = baseYPosition + Math.sin(clock.elapsedTime) * 0.2; // Floating effect
      astronautRef.current.rotation.y += 0.002; // Smooth rotation
    }
  });

  return (
    <primitive
      ref={astronautRef}
      object={scene}
      scale={[1.1, 1.1, 1.1]} // Slightly larger for better visibility
      position={[0, 0, 0]} // Keep centered
    />
  );
}

// ✅ Main Astronaut Model Component
export default function AstronautModel() {
  return (
    <div className="translate-x-12 w-[30vh] md:w-[30vh] h-[60vh] md:h-[60vh] flex items-center justify-center">
      <Canvas camera={{ position: [-2, 3, 7], fov: 70 }} className="w-full h-full">
        {/* Lighting */}
        <ambientLight intensity={1.6} />
        <directionalLight position={[5, 5, 5]} intensity={2} />
        <spotLight position={[15, 10, 15]} angle={0.4} intensity={2} />

        {/* ✅ Floating & Rotating Model */}
        <AnimatedAstronaut />

        {/* Camera Controls */}
        <OrbitControls
          enableZoom={false}
          autoRotate
          autoRotateSpeed={0.1}
          minPolarAngle={Math.PI / 2} // Prevent up/down rotation
          maxPolarAngle={Math.PI / 2} // Prevent up/down rotation
        />
      </Canvas>
    </div>
  );
}
