import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Line, Sparkles } from "@react-three/drei";
import { AdditiveBlending, Color, type Group, type Mesh } from "three";

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
  varying vec2 vUv;

  void main() {
    vec2 centeredUv = (vUv - 0.5) * 2.0;
    float radius = length(centeredUv);
    float core = exp(-radius * 14.0);
    float halo = pow(max(0.0, 1.0 - radius), 2.4);
    float alpha = min(1.0, core * 1.6 + halo * 0.55);

    if (alpha < 0.01) discard;
    gl_FragColor = vec4(uColor * (1.1 + core * 2.0), alpha);
  }
`;

const SIGNAL_TAIL_FRAGMENT_SHADER = `
  precision highp float;

  uniform vec3 uColor;
  varying vec2 vUv;

  void main() {
    float centeredY = (vUv.y - 0.5) * 2.0;
    float narrowCore = exp(-pow(centeredY * 4.5, 2.0));
    float softGlow = exp(-pow(centeredY * 2.1, 2.0));
    float longitudinalFade = pow(vUv.x, 2.6);
    float alpha = longitudinalFade * (narrowCore * 0.88 + softGlow * 0.3);

    if (alpha < 0.01) discard;
    gl_FragColor = vec4(uColor * (0.8 + vUv.x * 1.8), alpha);
  }
`;

interface SignalRoute {
  start: Point;
  end: Point;
  startsAt: number;
  duration: number;
}

const randomBetween = (minimum: number, maximum: number) =>
  minimum + Math.random() * (maximum - minimum);

const createSignalRoute = (elapsedTime: number): SignalRoute => {
  const [firstNode, secondNode] = CONNECTIONS[Math.floor(Math.random() * CONNECTIONS.length)];
  const reverseDirection = Math.random() > 0.5;

  return {
    start: NODES[reverseDirection ? secondNode : firstNode],
    end: NODES[reverseDirection ? firstNode : secondNode],
    startsAt: elapsedTime + randomBetween(0.6, 3.8),
    duration: randomBetween(0.8, 2.4),
  };
};

interface ConstellationNodeProps {
  index: number;
  position: Point;
  active: boolean;
  beacon: boolean;
  reducedMotion: boolean;
}

const ConstellationNode = ({
  index,
  position,
  active,
  beacon,
  reducedMotion,
}: ConstellationNodeProps) => {
  const nodeRef = useRef<Mesh | null>(null);
  const baseScale = beacon ? 1.35 : 1;

  useFrame(({ clock }) => {
    if (!nodeRef.current) return;

    const pulse = reducedMotion ? 0 : Math.sin(clock.elapsedTime * 1.8 + index) * 0.08;
    const activeScale = active ? 1.55 : 1;
    nodeRef.current.scale.setScalar((baseScale + pulse) * activeScale);
  });

  return (
    <mesh ref={nodeRef} position={position} scale={baseScale}>
      <sphereGeometry args={[beacon ? 0.09 : 0.045, 16, 16]} />
      <meshStandardMaterial
        color={beacon ? "#67e8f9" : "#dbeafe"}
        emissive={beacon ? "#22d3ee" : "#93c5fd"}
        emissiveIntensity={active ? 3.2 : beacon ? 1.8 : 0.65}
        toneMapped={false}
      />
    </mesh>
  );
};

const SignalPulse = ({ reducedMotion }: { reducedMotion: boolean }) => {
  const headRef = useRef<Mesh | null>(null);
  const tailRef = useRef<Mesh | null>(null);
  const routeRef = useRef<SignalRoute | null>(null);
  const headUniforms = useMemo(() => ({ uColor: { value: new Color("#ecfeff") } }), []);
  const tailUniforms = useMemo(() => ({ uColor: { value: new Color("#22d3ee") } }), []);

  useFrame(({ clock }) => {
    const elapsedTime = clock.elapsedTime;
    const head = headRef.current;
    const tail = tailRef.current;

    if (!head || !tail) return;

    if (reducedMotion) {
      head.visible = false;
      tail.visible = false;
      return;
    }

    if (!routeRef.current) {
      const initialRoute = createSignalRoute(elapsedTime);
      routeRef.current = { ...initialRoute, startsAt: elapsedTime + 0.25 };
    }

    const route = routeRef.current;
    const progress = (elapsedTime - route.startsAt) / route.duration;

    if (progress >= 1) {
      routeRef.current = createSignalRoute(elapsedTime);
      head.visible = false;
      tail.visible = false;
      return;
    }

    if (progress < 0) {
      head.visible = false;
      tail.visible = false;
      return;
    }

    const deltaX = route.end[0] - route.start[0];
    const deltaY = route.end[1] - route.start[1];
    const deltaZ = route.end[2] - route.start[2];
    const segmentLength = Math.hypot(deltaX, deltaY, deltaZ);
    const tailProgressOffset = Math.min(0.58, 0.95 / segmentLength);
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
    head.scale.setScalar(0.34);

    tail.visible = tailLength > 0.01;
    tail.position.set(
      (headPosition[0] + tailStartPosition[0]) / 2,
      (headPosition[1] + tailStartPosition[1]) / 2,
      (headPosition[2] + tailStartPosition[2]) / 2
    );
    tail.rotation.z = Math.atan2(deltaY, deltaX);
    tail.scale.set(tailLength, 0.3, 1);
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
        <pointLight color="#67e8f9" intensity={1.8} distance={1.5} decay={2} />
      </mesh>
    </group>
  );
};

const Constellation = ({ activeChannel, reducedMotion }: ContactConstellationSceneProps) => {
  const groupRef = useRef<Group | null>(null);
  const viewportWidth = useThree((state) => state.viewport.width);
  const canvasWidth = useThree((state) => state.size.width);
  const constellationScale =
    canvasWidth < 640
      ? Math.min(1.05, Math.max(0.88, viewportWidth / 6.2))
      : Math.min(1.75, Math.max(1.2, viewportWidth / 7.2));
  const activeNode = activeChannel ? CHANNEL_NODE[activeChannel] : null;
  const lineSegments = useMemo(
    () => CONNECTIONS.map(([start, end]) => [NODES[start], NODES[end]] as [Point, Point]),
    []
  );

  useFrame(({ clock }) => {
    if (!groupRef.current || reducedMotion) return;

    groupRef.current.rotation.y = Math.sin(clock.elapsedTime * 0.18) * 0.035;
    groupRef.current.rotation.z = Math.sin(clock.elapsedTime * 0.12) * 0.012;
  });

  return (
    <group ref={groupRef} scale={constellationScale}>
      {lineSegments.map(([start, end], index) => {
        const connection = CONNECTIONS[index];
        const highlighted = activeNode !== null && connection.includes(activeNode);

        return (
          <Line
            key={`${connection[0]}-${connection[1]}`}
            points={[start, end]}
            color={highlighted ? "#67e8f9" : "#94a3b8"}
            lineWidth={highlighted ? 1.6 : 0.7}
            transparent
            opacity={highlighted ? 0.8 : 0.28}
          />
        );
      })}

      {NODES.map((position, index) => (
        <ConstellationNode
          key={index}
          index={index}
          position={position}
          active={activeNode === index}
          beacon={index === CHANNEL_NODE.linkedin || index === CHANNEL_NODE.github}
          reducedMotion={reducedMotion}
        />
      ))}

      <Sparkles
        count={canvasWidth < 640 ? 20 : 42}
        scale={[8.5, 4.2, 1.6]}
        size={1.2}
        speed={reducedMotion ? 0 : 0.18}
        opacity={0.35}
        color="#bae6fd"
      />

      <SignalPulse reducedMotion={reducedMotion} />
    </group>
  );
};

export default function ContactConstellationScene({
  activeChannel,
  reducedMotion,
}: ContactConstellationSceneProps) {
  return (
    <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 8.5], fov: 46 }}
        dpr={[1, 1.5]}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
        }}
        style={{ width: "100%", height: "100%", pointerEvents: "none" }}
      >
        <ambientLight intensity={0.9} />
        <directionalLight position={[4, 5, 5]} intensity={1.8} color="#e0f2fe" />
        <pointLight position={[0, -1, 3]} intensity={1.2} color="#22d3ee" />
        <Constellation activeChannel={activeChannel} reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  );
}