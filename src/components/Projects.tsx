import React, { useEffect, useRef, useState } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaExternalLinkAlt,
  FaGithub,
  FaGit,
  FaJava,
  FaNodeJs,
  FaPython,
  FaReact,
} from "react-icons/fa";
import { BiLogoPostgresql } from "react-icons/bi";
import { GrMysql } from "react-icons/gr";
import { SiJavascript, SiSpring, SiTailwindcss, SiTensorflow } from "react-icons/si";
import type { Project, TechStackItem } from "../types";

const BREAKPOINTS = {
  MOBILE: 640,
  TABLET: 1024,
};

const PROJECTS_PER_VIEW = {
  MOBILE: 1,
  TABLET: 2,
  DESKTOP: 3,
};

const TECH_STACK: TechStackItem[] = [
  { icon: <FaPython />, label: "Python" },
  { icon: <SiTensorflow />, label: "TensorFlow" },
  { icon: <SiJavascript />, label: "JavaScript" },
  { icon: <FaReact />, label: "React" },
  { icon: <FaNodeJs />, label: "Node.js" },
  { icon: <SiTailwindcss />, label: "Tailwind" },
  { icon: <FaJava />, label: "Java" },
  { icon: <SiSpring />, label: "Spring" },
  { icon: <BiLogoPostgresql />, label: "PostgreSQL" },
  { icon: <GrMysql />, label: "MySQL" },
  { icon: <FaGit />, label: "Git" },
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

const useResponsiveProjectsPerView = () => {
  const [projectsPerView, setProjectsPerView] = useState(PROJECTS_PER_VIEW.DESKTOP);

  useEffect(() => {
    const updateProjectsPerView = () => {
      const width = window.innerWidth;
      if (width < BREAKPOINTS.MOBILE) {
        setProjectsPerView(PROJECTS_PER_VIEW.MOBILE);
      } else if (width < BREAKPOINTS.TABLET) {
        setProjectsPerView(PROJECTS_PER_VIEW.TABLET);
      } else {
        setProjectsPerView(PROJECTS_PER_VIEW.DESKTOP);
      }
    };

    updateProjectsPerView();
    window.addEventListener("resize", updateProjectsPerView);
    return () => window.removeEventListener("resize", updateProjectsPerView);
  }, []);

  return projectsPerView;
};

const useCarousel = (totalItems: number, itemsPerView: number) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const maxIndex = Math.max(0, totalItems - itemsPerView);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex >= maxIndex ? 0 : prevIndex + 1));
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex <= 0 ? maxIndex : prevIndex - 1));
  };

  const navigation = {
    canGoNext: currentIndex < maxIndex,
    canGoPrevious: currentIndex > 0,
    showNavigation: totalItems > itemsPerView,
  };

  return {
    currentIndex,
    goToNext,
    goToPrevious,
    ...navigation,
  };
};

const SectionHeader = () => (
  <div className="space-y-6 mb-16">
    <div className="flex items-center justify-center gap-3 text-sm text-gray-400 tracking-widest">
      <span className="w-8 h-px bg-gray-600"></span>
      <span>03</span>
      <span className="font-light font-mono">// work</span>
      <span className="w-8 h-px bg-gray-600"></span>
    </div>

    <h1 className="text-[clamp(2rem,8vw,4rem)] font-bold text-white tracking-tight">
      MY{" "}
      <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-transparent bg-clip-text">
        PROJECTS
      </span>
    </h1>

    <p className="text-base sm:text-lg text-gray-400 leading-relaxed max-w-2xl mx-auto font-light">
      Software development projects showcasing practical engineering skills and problem-solving.
    </p>
  </div>
);

interface TechIconTooltipProps {
  label: string;
}

const TechIconTooltip = ({ label }: TechIconTooltipProps) => (
  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-400">
    <div className="bg-slate-900 border border-cyan-500/30 rounded-lg px-3 py-2 shadow-xl">
      <div className="text-cyan-400 text-xs font-medium whitespace-nowrap font-mono">{label}</div>
    </div>
  </div>
);

interface TechIconProps {
  icon: React.ReactNode;
  label: string;
}

const TechIcon = ({ icon, label }: TechIconProps) => {
  return (
    <div className="relative group">
      <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center transition-all duration-500 hover:border-cyan-500/50 hover:bg-cyan-500/5 hover:scale-110 cursor-pointer">
        <span className="text-xl text-gray-400 group-hover:text-cyan-400 transition-colors duration-500">
          {icon}
        </span>
      </div>
      <TechIconTooltip label={label} />
    </div>
  );
};

const TechStackSection = () => (
  <div className="mb-16">
    <h2 className="text-lg sm:text-xl font-semibold text-white mb-8 tracking-wide uppercase">
      Technologies & Tools
    </h2>
    <div className="flex flex-wrap items-center justify-center gap-4 max-w-4xl mx-auto">
      {TECH_STACK.map((tech, index) => (
        <TechIcon key={index} icon={tech.icon} label={tech.label} />
      ))}
    </div>
  </div>
);

const FeaturedBadge = () => (
  <div className="absolute -top-3 -right-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg z-10">
    Featured
  </div>
);

interface ProjectCardHeaderProps {
  title: string;
  subtitle: string;
  description: string;
}

const ProjectCardHeader = ({ title, subtitle, description }: ProjectCardHeaderProps) => (
  <div className="mb-4">
    <h3 className="text-lg sm:text-xl font-semibold text-white mb-1">{title}</h3>
    <p className="text-cyan-400 font-medium text-sm mb-3">{subtitle}</p>
    <p className="text-gray-400 leading-relaxed text-sm">{description}</p>
  </div>
);

interface TechnologyTagProps {
  technology: string;
}

const TechnologyTag = ({ technology }: TechnologyTagProps) => (
  <span className="px-3 py-1.5 bg-cyan-500/5 text-cyan-300 text-xs font-medium rounded-md border border-cyan-500/20 hover:border-cyan-500/40 hover:bg-cyan-500/10 transition-all duration-500 cursor-default">
    {technology}
  </span>
);

interface TechnologiesSectionProps {
  technologies: string[];
}

const TechnologiesSection = ({ technologies }: TechnologiesSectionProps) => (
  <div className="flex-1 mb-6">
    <h4 className="text-white font-semibold text-xs mb-3 tracking-wide uppercase">Technologies</h4>
    <div className="flex flex-wrap gap-2">
      {technologies.map((tech, idx) => (
        <TechnologyTag key={idx} technology={tech} />
      ))}
    </div>
  </div>
);

interface ProjectLinksProps {
  githubUrl: string;
  liveUrl?: string;
}

const ProjectLinks = ({ githubUrl, liveUrl }: ProjectLinksProps) => (
  <div className="flex items-center justify-between pt-4 border-t border-white/5">
    <a
      href={githubUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors duration-500 text-sm"
    >
      <FaGithub className="w-4 h-4" />
      <span>View Code</span>
    </a>

    {liveUrl && (
      <a
        href={liveUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-700 text-white text-sm rounded-lg hover:from-cyan-700 hover:to-blue-800 transition-all duration-500 transform hover:scale-105 shadow-lg shadow-cyan-500/20"
      >
        <span>Live Demo</span>
        <FaExternalLinkAlt className="w-3 h-3" />
      </a>
    )}
  </div>
);

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, index * 250);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [index]);

  return (
    <div
      ref={cardRef}
      className={`group bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 h-full flex flex-col transition-all duration-1000 hover:border-cyan-500/30 hover:bg-white/[0.07] hover:shadow-lg hover:shadow-cyan-500/10 relative ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      {project.featured && <FeaturedBadge />}
      <ProjectCardHeader title={project.title} subtitle={project.subtitle} description={project.description} />
      <TechnologiesSection technologies={project.technologies} />
      <ProjectLinks githubUrl={project.githubUrl} liveUrl={project.liveUrl} />
    </div>
  );
};

interface NavigationButtonProps {
  direction: "previous" | "next";
  onClick: () => void;
  disabled: boolean;
  children: React.ReactNode;
}

const NavigationButton = ({ onClick, disabled, children }: NavigationButtonProps) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`flex items-center justify-center gap-2 px-6 py-3 bg-white/5 border rounded-lg transition-all duration-500 font-mono text-sm ${
      !disabled
        ? "border-white/10 hover:border-cyan-500/50 hover:bg-cyan-500/5 text-gray-400 hover:text-cyan-400"
        : "border-white/5 opacity-30 cursor-not-allowed text-gray-600"
    }`}
  >
    {children}
  </button>
);

interface CarouselNavigationProps {
  onPrevious: () => void;
  onNext: () => void;
  canGoPrevious: boolean;
  canGoNext: boolean;
}

const CarouselNavigation = ({
  onPrevious,
  onNext,
  canGoPrevious,
  canGoNext,
}: CarouselNavigationProps) => (
  <div className="flex items-center justify-center gap-4">
    <NavigationButton direction="previous" onClick={onPrevious} disabled={!canGoPrevious}>
      <FaChevronLeft className="w-4 h-4" />
      <span>Prev</span>
    </NavigationButton>

    <NavigationButton direction="next" onClick={onNext} disabled={!canGoNext}>
      <span>Next</span>
      <FaChevronRight className="w-4 h-4" />
    </NavigationButton>
  </div>
);

interface ProjectsGridProps {
  projects: Project[];
  projectsPerView: number;
}

const ProjectsGrid = ({ projects, projectsPerView }: ProjectsGridProps) => {
  const gridClass = `grid gap-6 mb-8 ${
    projectsPerView === 1 ? "grid-cols-1" : projectsPerView === 2 ? "grid-cols-2" : "grid-cols-3"
  }`;

  return (
    <div className={gridClass}>
      {projects.map((project, idx) => (
        <div key={project.id} className="relative">
          <ProjectCard project={project} index={idx} />
        </div>
      ))}
    </div>
  );
};

const ProjectsCarousel = () => {
  const projectsPerView = useResponsiveProjectsPerView();
  const { currentIndex, goToNext, goToPrevious, canGoNext, canGoPrevious, showNavigation } = useCarousel(
    PROJECT_DATA.length,
    projectsPerView
  );

  const visibleProjects = PROJECT_DATA.slice(currentIndex, currentIndex + projectsPerView);

  return (
    <div className="w-full max-w-6xl mx-auto">
      <ProjectsGrid projects={visibleProjects} projectsPerView={projectsPerView} />
      {showNavigation && (
        <CarouselNavigation
          onPrevious={goToPrevious}
          onNext={goToNext}
          canGoPrevious={canGoPrevious}
          canGoNext={canGoNext}
        />
      )}
    </div>
  );
};

const TimelineIndicator = () => (
  <div className="flex justify-center mt-16">
    <div className="w-px h-16 bg-gradient-to-b from-cyan-400/50 to-transparent rounded-full"></div>
  </div>
);

export default function Projects() {
  return (
    <section id="projects" className="min-h-screen py-20 sm:py-24 px-6 sm:px-12">
      <div className="w-full max-w-6xl mx-auto text-center">
        <SectionHeader />
        <TechStackSection />
        <ProjectsCarousel />
        <TimelineIndicator />
      </div>
    </section>
  );
}