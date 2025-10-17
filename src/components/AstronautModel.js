import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

function AnimatedAstronaut() {
  const { scene } = useGLTF("/Astronaut.glb");
  const astro = useRef();
  
  const clonedScene = useMemo(() => scene.clone(), [scene]);

  const tiltX = Math.PI / 23;   
  const tiltZ = Math.PI / 8;   

  useFrame(({ clock }) => {
    if (!astro.current) return;

    const w = window.innerWidth;
    let baseY = -2;
    if (w < 769) baseY = -1.5;
    if (w < 481) baseY = -1;
    if (w < 376) baseY = -0.4;
    astro.current.position.y = baseY + Math.sin(clock.elapsedTime) * 0.3;

    astro.current.rotation.set(tiltX, astro.current.rotation.y + 0.006, tiltZ);
  });

  return (
    <group ref={astro} rotation={[tiltX, 0, tiltZ]} dispose={null}>
      <primitive object={clonedScene} scale={[1.1, 1.1, 1.1]} dispose={null} />
    </group>
  );
}

export default function AstronautModel() {
  return (
    <div 
      className="w-full h-full"
      style={{ pointerEvents: 'none' }}
    >
      <Canvas 
        camera={{ position: [-2, 3, 7], fov: 77 }}
        style={{ pointerEvents: 'none', width: '100%', height: '100%' }}
        gl={{ 
          alpha: true, 
          antialias: true,
          powerPreference: "high-performance"
        }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={1.6} />
        <directionalLight position={[5, 5, 5]} intensity={2} />
        <spotLight position={[15, 10, 15]} angle={0.4} intensity={2} />

        <AnimatedAstronaut />
      </Canvas>
    </div>
  );
}
