import robotSprite from "../assets/sprites/robot.png";
import satelliteSprite from "../assets/sprites/satellite.png";
import armSprite from "../assets/sprites/arm.png";
import forkliftSprite from "../assets/sprites/forklift.png";
import usePixelScale from "../lib/usePixelScale";
import type { Project } from "../types";

const PROJECT_DATA: Project[] = [
  {
    id: "autonomous-robot",
    title: "Self-navigating robot",
    description:
      "Autonomous robot on an ATmega328P with custom firmware, sensors, and PID control for obstacle avoidance and terrain navigation.",
    technologies: ["Embedded C", "Arduino", "KiCad", "PID control"],
    githubUrl: "https://github.com/deneskosztyuk/Self-Navigating-Robotic-Device/blob/main/README.md",
    sprite: robotSprite,
  },
  {
    id: "satellite-simulator",
    title: "Satellite probe simulator",
    description:
      "Hardware and software system that simulates a satellite: environmental data collection, RF telemetry, and a desktop monitoring app.",
    technologies: ["C/C++", "ESP32", "RF", "Python", "Flask"],
    githubUrl:
      "https://github.com/deneskosztyuk/DSPS_Guide-Deep-Space-Probe-Simulator/blob/main/README.md",
    sprite: satelliteSprite,
  },
  {
    id: "robotic-arm",
    title: "Three-link robotic arm",
    description:
      "Simulated three-link arm in CoppeliaSim with forward and inverse kinematics for precise end-effector control.",
    technologies: ["Python", "NumPy", "CoppeliaSim"],
    githubUrl: "https://github.com/deneskosztyuk/3-Link-Robotic-Arm---CoppeliaSim/blob/master/readme.md",
    sprite: armSprite,
  },
  {
    id: "warehouse-agent",
    title: "Warehouse navigation agent",
    description:
      "Neural network trained with reinforcement learning in Unity to navigate a 3D warehouse.",
    technologies: ["C#", "Unity", "TensorFlow"],
    githubUrl: "https://github.com/deneskosztyuk/Warehouse-Navigation-Agent/blob/main/README.md",
    sprite: forkliftSprite,
  },
];

export default function Projects() {
  const px = usePixelScale();

  return (
    <section id="projects">
      <h2>Projects</h2>
      <div className="mt-8 grid gap-x-10 gap-y-12 md:grid-cols-2">
        {PROJECT_DATA.map((project) => (
          <article key={project.id} className="flex items-start gap-6">
            <img
              src={project.sprite}
              alt=""
              className="flex-none"
              style={{ width: 16 * px, height: 16 * px, imageRendering: "pixelated" }}
            />
            <div className="min-w-0 max-w-[40rem]">
              <h3 className="font-medium">{project.title}</h3>
              <p className="mt-1">{project.description}</p>
              <p className="mt-2 text-[15px] text-dim">{project.technologies.join(", ")}</p>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block"
              >
                Code
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
