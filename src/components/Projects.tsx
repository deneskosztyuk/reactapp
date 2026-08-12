import {
  FaExternalLinkAlt,
  FaGithub,
  FaMicrochip,
} from "react-icons/fa";
import { GiProcessor } from "react-icons/gi";
import { IoMdCellular } from "react-icons/io";
import { MdDeveloperBoard } from "react-icons/md";
import { PiCircuitry, PiWaveform } from "react-icons/pi";
import { SiC, SiCplusplus, SiKicad, SiRust } from "react-icons/si";
import { TbClockCog, TbDeviceDesktopCode } from "react-icons/tb";
import TechnologyTags from "./TechnologyTags";
import useInView from "../lib/useInView";
import type { Project, TechStackItem } from "../types";

const TECH_STACK: TechStackItem[] = [
  { icon: <SiRust />, label: "Rust" },
  { icon: <SiC />, label: "C" },
  { icon: <SiCplusplus />, label: "C++" },
  { icon: <MdDeveloperBoard />, label: "Embedded Systems" },
  { icon: <TbDeviceDesktopCode />, label: "Firmware Development" },
  { icon: <PiCircuitry />, label: "Hardware Design" },
  { icon: <FaMicrochip />, label: "Microcontrollers" },
  { icon: <IoMdCellular />, label: "IoT" },
  { icon: <GiProcessor />, label: "FPGA" },
  { icon: <SiKicad />, label: "PCB Design" },
  { icon: <PiWaveform />, label: "Signal Processing" },
  { icon: <TbClockCog />, label: "Real-Time Systems" },
];

const PROJECT_DATA: Project[] = [
  {
    id: "portfolio",
    title: "Portfolio Website",
    subtitle: "Full-Stack React Application",
    description:
      "A modern personal portfolio built with React, Tailwind CSS. Features responsive design, smooth animations, and optimized performance across all devices.",
    technologies: ["React", "JavaScript", "Tailwind CSS", "Node"],
    githubUrl: "https://github.com/deneskosztyuk/reactapp",
    featured: false,
  },
  {
    id: "neural-network",
    title: "ML Neural Network",
    subtitle: "AI & Machine Learning",
    description:
      "Custom-trained neural network using reinforcement learning in Unity. Features 3D environment interaction and intelligent decision-making for warehouse navigation.",
    technologies: ["TensorFlow", "C#", "Unity", "Machine Learning", "AI"],
    githubUrl: "https://github.com/deneskosztyuk/Warehouse-Navigation-Agent/blob/main/README.md",
    featured: true,
  },
  {
    id: "satellite-simulator",
    title: "Satellite Probe Simulator",
    subtitle: "IoT & Embedded Systems",
    description:
      "Hardware/software system simulating satellite behavior with environmental data collection, RF telemetry, and desktop monitoring interface.",
    technologies: ["Python", "Flask", "C/C++", "ESP32", "RF Communication"],
    githubUrl:
      "https://github.com/deneskosztyuk/DSPS_Guide-Deep-Space-Probe-Simulator/blob/main/README.md",
    featured: false,
  },
  {
    id: "robotic-arm",
    title: "3-Link Robotic Arm",
    subtitle: "Robotics & Simulation",
    description:
      "Robotic arm simulation with 360 degrees of freedom movement, performing inverse and forward kinematics calculations with precise end-effector control.",
    technologies: ["Python", "NumPy", "CoppeliaSim", "Robotics", "Kinematics"],
    githubUrl: "https://github.com/deneskosztyuk/3-Link-Robotic-Arm---CoppeliaSim/blob/master/readme.md",
    featured: true,
  },
  {
    id: "autonomous-robot",
    title: "Self-Navigating Robot",
    subtitle: "Embedded Systems & Robotics",
    description:
      "Autonomous robot using ATmega328p MCU with custom firmware, sensors, and PID control for obstacle avoidance and terrain navigation.",
    technologies: ["Embedded C", "Arduino", "KiCad", "Electronics", "Robotics"],
    githubUrl: "https://github.com/deneskosztyuk/Self-Navigating-Robotic-Device/blob/main/README.md",
    featured: true,
  },
];

const TechStackSection = () => (
  <section
    aria-labelledby="technology-tools-heading"
    className="mb-16 border-y border-white/10 py-7 sm:py-8"
  >
    <div className="grid gap-6 md:grid-cols-[13rem_minmax(0,1fr)] md:items-start md:text-left">
      <h3
        id="technology-tools-heading"
        className="font-mono text-sm uppercase tracking-[0.18em] text-white/70"
      >
        Technologies & Tools
      </h3>
      <ul className="grid grid-cols-2 gap-x-5 gap-y-4 sm:grid-cols-3 lg:grid-cols-4">
      {TECH_STACK.map((tech, index) => (
          <li key={index} className="flex items-center gap-2.5 text-sm text-white/65">
            <span aria-hidden="true" className="text-base text-cyan-300/75">
              {tech.icon}
            </span>
            <span>{tech.label}</span>
          </li>
      ))}
      </ul>
    </div>
  </section>
);

interface ProjectLinksProps {
  githubUrl: string;
  liveUrl?: string;
}

const ProjectLinks = ({ githubUrl, liveUrl }: ProjectLinksProps) => (
  <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-5">
    <a
      href={githubUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 text-sm text-gray-400 transition-colors duration-300 hover:text-cyan-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60"
    >
      <FaGithub aria-hidden="true" className="h-4 w-4" />
      <span>View Code</span>
    </a>

    {liveUrl && (
      <a
        href={liveUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 rounded-md border border-cyan-300/30 px-3 py-2 text-sm text-cyan-200 transition-colors duration-300 hover:border-cyan-300/60 hover:bg-cyan-300/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60"
      >
        <span>Live Demo</span>
        <FaExternalLinkAlt aria-hidden="true" className="h-3 w-3" />
      </a>
    )}
  </div>
);

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const { elementRef, isVisible } = useInView<HTMLElement>();
  const titleId = `project-${project.id}-title`;

  return (
    <article
      ref={elementRef}
      aria-labelledby={titleId}
      className={`flex min-h-full flex-col border-b border-r border-white/10 bg-slate-950/45 p-6 text-left shadow-[0_18px_50px_rgba(0,0,0,0.16)] transition-all duration-500 hover:bg-slate-950/60 motion-reduce:transform-none motion-reduce:transition-none sm:p-8 md:last:col-span-2 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
      }`}
    >
      <div className="mb-5 flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em]">
        <span className="text-cyan-300/75">{String(index + 1).padStart(2, "0")}</span>
        <span aria-hidden="true" className="h-px w-6 bg-white/20" />
        <p className="text-white/60">{project.subtitle}</p>
        {project.featured && <span className="ml-auto text-cyan-300/75">Featured</span>}
      </div>

      <h3 id={titleId} className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
        {project.title}
      </h3>
      <p className="mt-4 flex-1 text-sm leading-7 text-gray-400">{project.description}</p>

      <div className="my-7">
        <h4 className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-white/55">
          Technologies
        </h4>
        <TechnologyTags technologies={project.technologies} />
      </div>

      <ProjectLinks githubUrl={project.githubUrl} liveUrl={project.liveUrl} />
    </article>
  );
};

const ProjectsGrid = () => (
  <div className="grid grid-cols-1 border-l border-t border-white/10 md:grid-cols-2">
    {PROJECT_DATA.map((project, index) => (
      <ProjectCard key={project.id} project={project} index={index} />
    ))}
  </div>
);

export default function Projects() {
  return (
    <section id="projects" className="px-6 py-20 sm:px-12 sm:py-24">
      <div className="mx-auto w-full max-w-6xl">
        <TechStackSection />
        <ProjectsGrid />
      </div>
    </section>
  );
}