import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Line, Sparkles, Stars, useGLTF } from "@react-three/drei";
import {
  AdditiveBlending,
  Color,
  type Group,
  type Mesh,
  type MeshStandardMaterial,
} from "three";

export type ContactChannel = "linkedin" | "github";

interface ContactConstellationSceneProps {
  activeChannel: ContactChannel | null;
  reducedMotion: boolean;
}

type Point = [number, number, number];

const NODES: Point[] = [
  [-3.2, 1.05, 0],
  [-2.25, 0.45, 0.1],
  [-1.25, 1.15, 0],
  [-0.25, 0.25, 0.1],
  [0.75, 0.95, 0],
  [1.65, 0.2, 0.1],
  [3.1, -0.4, 0],
  [-1.1, -0.75, 0],
  [0.2, -1.05, 0.1],
  [1.45, -0.85, 0],
];

const CONNECTIONS: Array<[number, number]> = [
  [0, 1],
  [1, 2],
  [1, 3],
  [2, 4],
  [3, 4],
  [3, 7],
  [3, 8],
  [4, 5],
  [5, 6],
  [5, 9],
  [7, 8],
  [8, 9],
  [9, 6],
];

const CHANNEL_NODE: Record<ContactChannel, number> = {
  linkedin: 0,
  github: 6,
};

// ─── 3D logo beacons ───────────────────────────────────────
// GLB models are ~1.0 units across and sit on the floor (min.y = 0), so we
// recenter vertically and scale to roughly the old beacon-sphere diameter.
const LOGO_GLTF_PATHS: Record<ContactChannel, string> = {
  linkedin: "/linkedin+logo+3d+model.glb",
  github: "/octocat+cartoon+3d+model.glb",
};
const LOGO_BASE_SCALE: Record<ContactChannel, number> = {
  github: 0.75,
  linkedin: 0.5,
};
const LOGO_Y_OFFSET: Record<ContactChannel, number> = {
  github: -0.427 * LOGO_BASE_SCALE.github,
  linkedin: -0.499 * LOGO_BASE_SCALE.linkedin,
};
const LOGO_SPIN_SPEED = 0.35;
const LOGO_PULSE_AMPLITUDE = 0.03;
const LOGO_ACTIVE_SCALE = 1.2;
const HALO_EMISSIVE_COLOR = new Color("#22d3ee");

useGLTF.preload(LOGO_GLTF_PATHS.github);
useGLTF.preload(LOGO_GLTF_PATHS.linkedin);

const CONSTELLATION_BOUNDS_X = 6.5;
const MAX_CONCURRENT_SIGNALS = 2;

// ─── Shaders ──────────────────────────────────────────────

const SIGNAL_VERTEX_SHADER = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const SIGNAL_HEAD_FRAGMENT_SHADER = `
  precision highp float;

  uniform vec3 uColor;
  uniform float uTime;
  varying vec2 vUv;

  void main() {
    vec2 centeredUv = (vUv - 0.5) * 2.0;
    float radius = length(centeredUv);
    float core = exp(-radius * 16.0);
    float innerHalo = exp(-radius * 6.0);
    float outerHalo = pow(max(0.0, 1.0 - radius), 2.8);
    float sparkle = sin(uTime * 12.0 + radius * 20.0) * 0.15 + 0.85;
    float alpha = min(1.0, (core * 2.0 + innerHalo * 0.6 + outerHalo * 0.3) * sparkle);

    if (alpha < 0.005) discard;
    vec3 color = uColor * (1.2 + core * 3.0 + innerHalo * 1.0);
    gl_FragColor = vec4(color, alpha);
  }
`;

const SIGNAL_TAIL_FRAGMENT_SHADER = `
  precision highp float;

  uniform vec3 uColor;
  uniform float uOpacity;
  varying vec2 vUv;

  void main() {
    float centeredY = (vUv.y - 0.5) * 2.0;
    float narrowCore = exp(-pow(centeredY * 5.0, 2.0));
    float softGlow = exp(-pow(centeredY * 2.4, 2.0));
    float longitudinalFade = pow(vUv.x, 3.0);
    float alpha = longitudinalFade * (narrowCore * 0.9 + softGlow * 0.28) * uOpacity;

    if (alpha < 0.005) discard;
    vec3 color = uColor * (0.6 + vUv.x * 2.2);
    gl_FragColor = vec4(color, alpha);
  }
`;

// ─── Signal routing ───────────────────────────────────────

interface SignalRoute {
  start: Point;
  end: Point;
  startsAt: number;
  duration: number;
}

const SIGNAL_FADE_DURATION = 0.45;

const randomBetween = (minimum: number, maximum: number) =>
  minimum + Math.random() * (maximum - minimum);

const createSignalRoute = (elapsedTime: number): SignalRoute => {
  const [firstNode, secondNode] = CONNECTIONS[Math.floor(Math.random() * CONNECTIONS.length)];
  const reverseDirection = Math.random() > 0.5;

  return {
    start: NODES[reverseDirection ? secondNode : firstNode],
    end: NODES[reverseDirection ? firstNode : secondNode],
    startsAt: elapsedTime + randomBetween(0.3, 2.2),
    duration: randomBetween(0.5, 2.8),
  };
};

// ─── 3D logo beacon (GitHub / LinkedIn) ─────────────────────

interface BeaconLogoProps {
  channel: ContactChannel;
  position: Point;
  active: boolean;
  reducedMotion: boolean;
}

const BeaconLogo = ({ channel, position, active, reducedMotion }: BeaconLogoProps) => {
  const { scene } = useGLTF(LOGO_GLTF_PATHS[channel]);
  const logoRef = useRef<Group | null>(null);
  const haloRef = useRef<Mesh | null>(null);
  const phaseOffset = (channel === "linkedin" ? 0 : 1) * 0.73;

  const logoMaterials = useMemo(() => {
    const materials: Array<{
      material: MeshStandardMaterial;
      originalEmissive: Color;
      originalIntensity: number;
    }> = [];
    scene.traverse((child) => {
      if ((child as Mesh).isMesh) {
        const material = (child as Mesh).material as MeshStandardMaterial;
        if (material && material.isMaterial) {
          materials.push({
            material,
            originalEmissive: material.emissive.clone(),
            originalIntensity: material.emissiveIntensity,
          });
        }
      }
    });
    return materials;
  }, [scene]);

  useFrame(({ clock }, delta) => {
    if (logoRef.current) {
      if (!reducedMotion) {
        logoRef.current.rotation.y += delta * LOGO_SPIN_SPEED;
      }
      const pulse = reducedMotion
        ? 0
        : Math.sin(clock.elapsedTime * 1.2 + phaseOffset) * LOGO_PULSE_AMPLITUDE;
      const activeScale = active ? LOGO_ACTIVE_SCALE : 1;
      logoRef.current.scale.setScalar(LOGO_BASE_SCALE[channel] * (1 + pulse) * activeScale);
    }

    for (const { material, originalEmissive } of logoMaterials) {
      material.emissive.copy(active ? HALO_EMISSIVE_COLOR : originalEmissive);
    }

    if (haloRef.current) {
      const haloPulse = reducedMotion
        ? 0
        : Math.sin(clock.elapsedTime * 0.8 + phaseOffset) * 0.15;
      haloRef.current.scale.setScalar((1 + haloPulse) * (active ? 2.4 : 2.0));
      const haloMaterial = haloRef.current.material as { opacity?: number };
      if (haloMaterial && typeof haloMaterial.opacity === "number") {
        haloMaterial.opacity = active ? 0.28 : 0.14;
      }
    }
  });

  return (
    <group position={position}>
      <mesh ref={haloRef} visible={false}>
        <sphereGeometry args={[0.09, 16, 16]} />
        <meshBasicMaterial
          color={active ? "#67e8f9" : "#22d3ee"}
          transparent
          opacity={0.14}
          blending={AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
      <group ref={logoRef} position={[0, LOGO_Y_OFFSET[channel], 0]} scale={LOGO_BASE_SCALE[channel]}>
        <primitive object={scene} />
      </group>
    </group>
  );
};

// ─── Constellation nodes (non-beacon spheres) ───────────────

interface ConstellationNodeProps {
  index: number;
  position: Point;
  active: boolean;
  reducedMotion: boolean;
}

const ConstellationNode = ({
  index,
  position,
  active,
  reducedMotion,
}: ConstellationNodeProps) => {
  const nodeRef = useRef<Mesh | null>(null);
  const phaseOffset = index * 0.73;

  useFrame(({ clock }) => {
    if (!nodeRef.current) return;

    const pulse = reducedMotion ? 0 : Math.sin(clock.elapsedTime * 1.2 + phaseOffset) * 0.1;
    const activeScale = active ? 1.55 : 1;
    nodeRef.current.scale.setScalar((1 + pulse) * activeScale);
  });

  return (
    <group position={position}>
      <mesh ref={nodeRef} scale={1}>
        <sphereGeometry args={[0.045, 16, 16]} />
        <meshStandardMaterial
          color="#dbeafe"
          emissive="#93c5fd"
          emissiveIntensity={active ? 3.2 : 0.65}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
};

// ─── Shooting-star signal system ──────────────────────────

interface SignalPulseSlotProps {
  slot: number;
  reducedMotion: boolean;
}

const SignalPulseSlot = ({ slot, reducedMotion }: SignalPulseSlotProps) => {
  const headRef = useRef<Mesh | null>(null);
  const tailRef = useRef<Mesh | null>(null);
  const routeRef = useRef<SignalRoute | null>(null);
  const fadeStartRef = useRef<number | null>(null);
  const isSecondary = slot > 0;
  const headUniforms = useMemo(
    () => ({ uColor: { value: new Color("#ecfeff") }, uTime: { value: 0 } }),
    []
  );
  const tailUniforms = useMemo(
    () => ({ uColor: { value: new Color("#22d3ee") }, uOpacity: { value: 1 } }),
    []
  );

  useFrame(({ clock }) => {
    const elapsedTime = clock.elapsedTime;
    const head = headRef.current;
    const tail = tailRef.current;

    if (!head || !tail) return;

    headUniforms.uTime.value = elapsedTime;

    if (reducedMotion) {
      head.visible = false;
      tail.visible = false;
      tailUniforms.uOpacity.value = 0;
      return;
    }

    if (!routeRef.current) {
      const initialRoute = createSignalRoute(elapsedTime);
      routeRef.current = {
        ...initialRoute,
        startsAt: elapsedTime + (isSecondary ? 1.5 : 0.25),
      };
      fadeStartRef.current = null;
    }

    const route = routeRef.current;
    const progress = (elapsedTime - route.startsAt) / route.duration;

    // ── Fade-out phase: head reached destination, tail shrinks gradually ──
    if (progress >= 1) {
      if (fadeStartRef.current === null) {
        fadeStartRef.current = elapsedTime;
      }

      const fadeElapsed = elapsedTime - fadeStartRef.current;
      const fadeProgress = fadeElapsed / SIGNAL_FADE_DURATION;

      if (fadeProgress >= 1) {
        // Fade complete — pick a new route and start fresh
        routeRef.current = createSignalRoute(elapsedTime);
        fadeStartRef.current = null;
        head.visible = false;
        tail.visible = false;
        tailUniforms.uOpacity.value = 0;
        return;
      }

      // Head is gone; the front stays at the destination while the rear catches up.
      const deltaX = route.end[0] - route.start[0];
      const deltaY = route.end[1] - route.start[1];
      const deltaZ = route.end[2] - route.start[2];
      const segmentLength = Math.hypot(deltaX, deltaY, deltaZ);
      const tailProgressOffset = Math.min(0.55, 0.85 / segmentLength);
      const initialTailStartProgress = Math.max(0, 1 - tailProgressOffset);
      const easedFadeProgress = 1 - Math.pow(1 - fadeProgress, 2);
      const tailStartProgress =
        initialTailStartProgress + (1 - initialTailStartProgress) * easedFadeProgress;
      const tailStartPosition: Point = [
        route.start[0] + deltaX * tailStartProgress,
        route.start[1] + deltaY * tailStartProgress,
        route.start[2] + deltaZ * tailStartProgress + 0.04,
      ];
      const tailEndPosition: Point = [
        route.end[0],
        route.end[1],
        route.end[2] + 0.06,
      ];
      const tailLength = Math.hypot(
        tailEndPosition[0] - tailStartPosition[0],
        tailEndPosition[1] - tailStartPosition[1]
      );

      head.visible = false;
      tail.visible = tailLength > 0.01;
        tailUniforms.uOpacity.value = Math.pow(1 - fadeProgress, 1.5);
      tail.position.set(
        (tailEndPosition[0] + tailStartPosition[0]) / 2,
        (tailEndPosition[1] + tailStartPosition[1]) / 2,
        (tailEndPosition[2] + tailStartPosition[2]) / 2
      );
      tail.rotation.z = Math.atan2(deltaY, deltaX);
      tail.scale.set(tailLength, isSecondary ? 0.22 : 0.3, 1);
      return;
    }

    if (progress < 0) {
      head.visible = false;
      tail.visible = false;
      tailUniforms.uOpacity.value = 0;
      return;
    }

    tailUniforms.uOpacity.value = 1;

    const deltaX = route.end[0] - route.start[0];
    const deltaY = route.end[1] - route.start[1];
    const deltaZ = route.end[2] - route.start[2];
    const segmentLength = Math.hypot(deltaX, deltaY, deltaZ);
    const tailProgressOffset = Math.min(0.55, 0.85 / segmentLength);
    const tailStartProgress = Math.max(0, progress - tailProgressOffset);
    const headPosition: Point = [
      route.start[0] + deltaX * progress,
      route.start[1] + deltaY * progress,
      route.start[2] + deltaZ * progress + 0.06,
    ];
    const tailStartPosition: Point = [
      route.start[0] + deltaX * tailStartProgress,
      route.start[1] + deltaY * tailStartProgress,
      route.start[2] + deltaZ * tailStartProgress + 0.04,
    ];
    const tailLength = Math.hypot(
      headPosition[0] - tailStartPosition[0],
      headPosition[1] - tailStartPosition[1]
    );

    head.visible = true;
    head.position.set(...headPosition);
    head.scale.setScalar(isSecondary ? 0.26 : 0.34);

    tail.visible = tailLength > 0.01;
    tail.position.set(
      (headPosition[0] + tailStartPosition[0]) / 2,
      (headPosition[1] + tailStartPosition[1]) / 2,
      (headPosition[2] + tailStartPosition[2]) / 2
    );
    tail.rotation.z = Math.atan2(deltaY, deltaX);
    tail.scale.set(tailLength, isSecondary ? 0.22 : 0.3, 1);
  });

  return (
    <group>
      <mesh ref={tailRef} visible={false}>
        <planeGeometry args={[1, 1]} />
        <shaderMaterial
          vertexShader={SIGNAL_VERTEX_SHADER}
          fragmentShader={SIGNAL_TAIL_FRAGMENT_SHADER}
          uniforms={tailUniforms}
          transparent
          depthWrite={false}
          blending={AdditiveBlending}
          toneMapped={false}
        />
      </mesh>

      <mesh ref={headRef} visible={false}>
        <planeGeometry args={[1, 1]} />
        <shaderMaterial
          vertexShader={SIGNAL_VERTEX_SHADER}
          fragmentShader={SIGNAL_HEAD_FRAGMENT_SHADER}
          uniforms={headUniforms}
          transparent
          depthWrite={false}
          blending={AdditiveBlending}
          toneMapped={false}
        />
        <pointLight
          color="#67e8f9"
          intensity={isSecondary ? 1.2 : 1.8}
          distance={1.5}
          decay={2}
        />
      </mesh>
    </group>
  );
};

const SignalPulseSystem = ({ reducedMotion }: { reducedMotion: boolean }) => (
  <group>
    {Array.from({ length: MAX_CONCURRENT_SIGNALS }, (_, index) => (
      <SignalPulseSlot key={index} slot={index} reducedMotion={reducedMotion} />
    ))}
  </group>
);

// ─── Main constellation group ─────────────────────────────

const Constellation = ({ activeChannel, reducedMotion }: ContactConstellationSceneProps) => {
  const groupRef = useRef<Group | null>(null);
  const viewportWidth = useThree((state) => state.viewport.width);
  const canvasWidth = useThree((state) => state.size.width);
  const aspect = useThree((state) => state.viewport.aspect);
  const isMobile = canvasWidth < 768;
  const isCompact = aspect < 0.75;

  const constellationScale = Math.min(
    isMobile ? 0.55 : 1.45,
    Math.max(0.32, viewportWidth / (CONSTELLATION_BOUNDS_X * 1.28))
  );

  const activeNode = activeChannel ? CHANNEL_NODE[activeChannel] : null;
  const lineSegments = useMemo(
    () => CONNECTIONS.map(([start, end]) => [NODES[start], NODES[end]] as [Point, Point]),
    []
  );

  useFrame(({ clock }) => {
    if (!groupRef.current) return;

    if (!reducedMotion) {
      groupRef.current.rotation.x = -0.35 + Math.sin(clock.elapsedTime * 0.12) * 0.02;
      groupRef.current.rotation.y = 0.25 + Math.sin(clock.elapsedTime * 0.15) * 0.03;
      groupRef.current.rotation.z = -0.2 + Math.sin(clock.elapsedTime * 0.1) * 0.01;
      const breath = 1 + Math.sin(clock.elapsedTime * 0.35) * 0.012;
      groupRef.current.scale.setScalar(constellationScale * breath);
    } else {
      groupRef.current.rotation.x = -0.35;
      groupRef.current.rotation.y = 0.25;
      groupRef.current.rotation.z = -0.2;
      groupRef.current.scale.setScalar(constellationScale);
    }
  });

  return (
    <group ref={groupRef} scale={constellationScale}>
      <Stars
        radius={12}
        depth={6}
        count={isMobile ? 60 : 140}
        factor={2.5}
        saturation={0}
        fade
        speed={reducedMotion ? 0 : 0.3}
      />

      {lineSegments.map(([start, end], index) => {
        const connection = CONNECTIONS[index];
        const highlighted = activeNode !== null && connection.includes(activeNode);

        return (
          <Line
            key={`${connection[0]}-${connection[1]}`}
            points={[start, end]}
            color={highlighted ? "#67e8f9" : "#94a3b8"}
            lineWidth={highlighted ? 1.6 : 0.6}
            transparent
            opacity={highlighted ? 0.75 : 0.22}
          />
        );
      })}

      {NODES.map((position, index) => {
        const channel =
          index === CHANNEL_NODE.linkedin
            ? "linkedin"
            : index === CHANNEL_NODE.github
              ? "github"
              : null;

        return channel ? (
          <Suspense key={index} fallback={null}>
            <BeaconLogo
              channel={channel}
              position={position}
              active={activeNode === index}
              reducedMotion={reducedMotion}
            />
          </Suspense>
        ) : (
          <ConstellationNode
            key={index}
            index={index}
            position={position}
            active={activeNode === index}
            reducedMotion={reducedMotion}
          />
        );
      })}

      <Sparkles
        count={isMobile ? 24 : 50}
        scale={[7, 3.5, 1.8]}
        size={isMobile ? 1.5 : 2}
        speed={reducedMotion ? 0 : 0.12}
        opacity={0.4}
        color="#bae6fd"
        noise={[1.5, 1, 0.5]}
      />

      <Sparkles
        count={isMobile ? 14 : 28}
        scale={[10, 5, 2.5]}
        size={isMobile ? 0.8 : 1.1}
        speed={reducedMotion ? 0 : 0.06}
        opacity={0.22}
        color="#93c5fd"
        noise={[2.5, 1.5, 1]}
      />

      {!isCompact && (
        <Sparkles
          count={16}
          scale={[5, 2.5, 1]}
          size={1.8}
          speed={reducedMotion ? 0 : 0.2}
          opacity={0.3}
          color="#67e8f9"
          noise={[1, 0.5, 0.3]}
        />
      )}

      <SignalPulseSystem reducedMotion={reducedMotion} />
    </group>
  );
};

// ─── Canvas with post-processing ──────────────────────────

export default function ContactConstellationScene({
  activeChannel,
  reducedMotion,
}: ContactConstellationSceneProps) {
  return (
    <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0.9, 8.5], fov: 46 }}
        dpr={[1, 1.5]}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
        }}
        style={{ width: "100%", height: "100%", pointerEvents: "none" }}
      >
        <ambientLight intensity={0.65} />
        <directionalLight position={[4, 5, 5]} intensity={1.5} color="#e0f2fe" />
        <pointLight position={[0, -1, 3]} intensity={1.0} color="#22d3ee" />
        <pointLight position={[0, 2, 4]} intensity={0.5} color="#bae6fd" />
        <Constellation activeChannel={activeChannel} reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  );
}