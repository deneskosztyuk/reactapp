import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

function AnimatedAstronaut() {
  const { scene } = useGLTF("/Astronaut.glb");
  const astro = useRef();

  // astronaut model tilt
  const tiltX = Math.PI / 23;   
  const tiltZ = Math.PI / 8;   

  useFrame(({ clock }) => {
    if (!astro.current) return;

    /* floating */
    const w = window.innerWidth;
    let baseY = -2;
    if (w < 769) baseY = -1.5;
    if (w < 481) baseY = -1;
    if (w < 376) baseY = -0.4;
    astro.current.position.y = baseY + Math.sin(clock.elapsedTime) * 0.3;

    /* rotation */
    astro.current.rotation.set(tiltX, astro.current.rotation.y + 0.006, tiltZ);
  });

  return (
    <group ref={astro} rotation={[tiltX, 0, tiltZ]}>
      <primitive object={scene} scale={[1.1, 1.1, 1.1]} />
    </group>
  );
}

export default function AstronautModel() {
  return (
    <div className="translate-x-12 w-[30vh] md:w-[30vh] h-[60vh] md:h-[60vh] flex items-center justify-center">
      <Canvas camera={{ position: [-2, 3, 7], fov: 77 }}>
        <ambientLight intensity={1.6} />
        <directionalLight position={[5, 5, 5]} intensity={2} />
        <spotLight position={[15, 10, 15]} angle={0.4} intensity={2} />

        <AnimatedAstronaut />

        
      </Canvas>
    </div>
  );
}
