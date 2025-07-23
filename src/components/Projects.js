import { useState, useEffect } from "react";
import { 
  FaReact, 
  FaNodeJs, 
  FaJava, 
  FaPython, 
  FaGit, 
  FaAws, 
  FaGithub, 
  FaChevronLeft, 
  FaChevronRight,
  FaExternalLinkAlt
} from "react-icons/fa";
import { BiLogoPostgresql } from "react-icons/bi";
import { SiTailwindcss, SiJavascript, SiSpring, SiTensorflow } from "react-icons/si";
import { GrMysql } from "react-icons/gr"; 

const BREAKPOINTS = {
  MOBILE: 640,
  TABLET: 1024
};

const PROJECTS_PER_VIEW = {
  MOBILE: 1,
  TABLET: 2,
  DESKTOP: 3
};

const BUTTON_WIDTH = 28;
const TRANSITION_DURATION = 300;
const GRADIENT_TEXT_CLASS = "bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-transparent bg-clip-text";

const TECH_STACK = [
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
  { icon: <FaAws />, label: "AWS" },
];

const PROJECT_DATA = [
  {
    id: 'portfolio',
    title: 'Portfolio Website',
    subtitle: 'Full-Stack React Application',
    description: 'A modern personal portfolio built with React, Tailwind CSS. Features responsive design, smooth animations, and optimized performance across all devices.',
    technologies: ['React', 'JavaScript', 'Tailwind CSS', 'Node'],
    githubUrl: 'https://github.com/deneskosztyuk/reactapp',
    featured: false,
  },
  {
    id: 'neural-network',
    title: 'ML Neural Network',
    subtitle: 'AI & Machine Learning',
    description: 'Custom-trained neural network using reinforcement learning in Unity. Features 3D environment interaction and intelligent decision-making for warehouse navigation.',
    technologies: ['TensorFlow', 'C#', 'Unity', 'Machine Learning', 'AI'],
    githubUrl: 'https://github.com/deneskosztyuk/Warehouse-Navigation-Agent',
    featured: true,
  },
  {
    id: 'satellite-simulator',
    title: 'Satellite Probe Simulator',
    subtitle: 'IoT & Embedded Systems',
    description: 'Hardware/software system simulating satellite behavior with environmental data collection, RF telemetry, and desktop monitoring interface.',
    technologies: ['Python', 'Flask', 'C/C++', 'ESP32', 'RF Communication'],
    githubUrl: 'https://github.com/deneskosztyuk/DSPS_Guide-Deep-Space-Probe-Simulator',
    featured: false,
  },
  {
    id: 'robotic-arm',
    title: '3-Link Robotic Arm',
    subtitle: 'Robotics & Simulation',
    description: 'Robotic arm simulation with 3 degrees of freedom, performing inverse and forward kinematics calculations with precise end-effector control.',
    technologies: ['Python', 'NumPy', 'CoppeliaSim', 'Robotics', 'Kinematics'],
    githubUrl: 'https://github.com/deneskosztyuk/3-Link-Robotic-Arm---CoppeliaSim',
    featured: true,
  },
  {
    id: 'autonomous-robot',
    title: 'Self-Navigating Robot',
    subtitle: 'Embedded Systems & Robotics',
    description: 'Autonomous robot using ATmega328p MCU with custom firmware, sensors, and PID control for obstacle avoidance and terrain navigation.',
    technologies: ['Embedded C', 'Arduino', 'KiCad', 'Electronics', 'Robotics'],
    githubUrl: 'https://github.com/deneskosztyuk/Self-Navigating-Robotic-Device',
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
    window.addEventListener('resize', updateProjectsPerView);
    return () => window.removeEventListener('resize', updateProjectsPerView);
  }, []);

  return projectsPerView;
};

const useCarousel = (totalItems, itemsPerView) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const maxIndex = Math.max(0, totalItems - itemsPerView);

  const goToNext = () => {
    setCurrentIndex(prevIndex => 
      prevIndex >= maxIndex ? 0 : prevIndex + 1
    );
  };

  const goToPrevious = () => {
    setCurrentIndex(prevIndex => 
      prevIndex <= 0 ? maxIndex : prevIndex - 1
    );
  };

  const navigation = {
    canGoNext: currentIndex < maxIndex,
    canGoPrevious: currentIndex > 0,
    showNavigation: totalItems > itemsPerView
  };

  return {
    currentIndex,
    goToNext,
    goToPrevious,
    ...navigation
  };
};

const useHover = () => {
  const [isHovered, setIsHovered] = useState(false);
  
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);
  
  return { isHovered, handleMouseEnter, handleMouseLeave };
};

const SectionHeader = () => (
  <div className="space-y-6 sm:space-y-8 mb-16 sm:mb-20">
    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white leading-tight">
      My{" "}
      <span className={GRADIENT_TEXT_CLASS}>
        Projects
      </span>
    </h1>
    
    <p className="text-lg sm:text-xl text-gray-300 font-light leading-relaxed max-w-3xl mx-auto">
      A collection of projects showcasing software development skills and practical engineering experience
    </p>
  </div>
);

const TechIconTooltip = ({ label }) => (
  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-20">
    <div className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 shadow-xl">
      <div className="text-cyan-400 text-sm font-medium whitespace-nowrap">
        {label}
      </div>
    </div>
  </div>
);

const TechIcon = ({ icon, label }) => {
  const { isHovered, handleMouseEnter, handleMouseLeave } = useHover();

  return (
    <div className="relative group">
      <div 
        className="w-12 h-12 sm:w-14 sm:h-14 bg-slate-800/50 border border-slate-700/50 rounded-xl flex items-center justify-center transition-all duration-300 hover:border-cyan-500/50 hover:bg-slate-800/70 hover:scale-110 cursor-pointer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <span className={`text-xl transition-colors duration-300 ${
          isHovered ? 'text-cyan-400' : 'text-gray-400'
        }`}>
          {icon}
        </span>
      </div>
      {isHovered && <TechIconTooltip label={label} />}
    </div>
  );
};

const TechStackSection = () => (
  <div className="mb-16 sm:mb-20">
    <h2 className="text-xl sm:text-2xl font-light text-white mb-8">
      Technologies & Tools
    </h2>
    <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 max-w-4xl mx-auto">
      {TECH_STACK.map((tech, index) => (
        <TechIcon 
          key={index} 
          icon={tech.icon} 
          label={tech.label}
        />
      ))}
    </div>
  </div>
);

const FeaturedBadge = () => (
  <div className="absolute -top-3 -right-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg">
    Featured
  </div>
);

const ProjectCardHeader = ({ title, subtitle, description }) => (
  <div className="mb-4">
    <h3 className="text-xl sm:text-2xl font-medium text-white mb-2">
      {title}
    </h3>
    <p className="text-cyan-400 font-medium mb-3">
      {subtitle}
    </p>
    <p className="text-gray-300 leading-relaxed">
      {description}
    </p>
  </div>
);

const TechnologyTag = ({ technology }) => (
  <span className="px-3 py-1 bg-slate-700/50 text-cyan-300 text-sm rounded-full border border-slate-600/50 hover:border-cyan-500/50 transition-colors duration-300">
    {technology}
  </span>
);

const TechnologiesSection = ({ technologies }) => (
  <div className="flex-1 mb-6">
    <h4 className="text-white font-medium mb-3">Technologies:</h4>
    <div className="flex flex-wrap gap-2">
      {technologies.map((tech, idx) => (
        <TechnologyTag key={idx} technology={tech} />
      ))}
    </div>
  </div>
);

const ProjectLinks = ({ githubUrl, liveUrl }) => (
  <div className="flex items-center justify-between pt-4 border-t border-slate-700/50">
    <a
      href={githubUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center space-x-2 text-gray-400 hover:text-cyan-400 transition-colors duration-300"
    >
      <FaGithub className="w-5 h-5" />
      <span>Code</span>
    </a>
    
    {liveUrl && (
      <a
        href={liveUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-700 text-white rounded-lg hover:from-cyan-700 hover:to-blue-800 transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg shadow-cyan-500/25"
      >
        <span>Live Demo</span>
        <FaExternalLinkAlt className="w-4 h-4" />
      </a>
    )}
  </div>
);

const ProjectCard = ({ project }) => (
  <div className="group bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 sm:p-8 h-full flex flex-col transition-all duration-500 hover:border-cyan-500/30 hover:bg-slate-800/70">
    {project.featured && <FeaturedBadge />}
    <ProjectCardHeader 
      title={project.title}
      subtitle={project.subtitle}
      description={project.description}
    />
    <TechnologiesSection technologies={project.technologies} />
    <ProjectLinks githubUrl={project.githubUrl} liveUrl={project.liveUrl} />
  </div>
);

const NavigationButton = ({ direction, onClick, disabled, children }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`flex items-center justify-center space-x-2 w-${BUTTON_WIDTH} py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl transition-all duration-${TRANSITION_DURATION} ${
      !disabled 
        ? 'hover:border-cyan-500/50 hover:bg-slate-800/70 text-gray-300 hover:text-cyan-400' 
        : 'opacity-50 cursor-not-allowed text-gray-600'
    }`}
  >
    {children}
  </button>
);

const CarouselNavigation = ({ onPrevious, onNext, canGoPrevious, canGoNext }) => (
  <div className="flex items-center justify-center space-x-6">
    <NavigationButton
      direction="previous"
      onClick={onPrevious}
      disabled={!canGoPrevious}
    >
      <FaChevronLeft className="w-4 h-4" />
      <span>Previous</span>
    </NavigationButton>

    <NavigationButton
      direction="next"
      onClick={onNext}
      disabled={!canGoNext}
    >
      <span>Next</span>
      <FaChevronRight className="w-4 h-4" />
    </NavigationButton>
  </div>
);

const ProjectsGrid = ({ projects, projectsPerView }) => {
  const gridClass = `grid gap-6 sm:gap-8 mb-8 ${
    projectsPerView === 1 ? 'grid-cols-1' :
    projectsPerView === 2 ? 'grid-cols-2' : 'grid-cols-3'
  }`;

  return (
    <div className={gridClass}>
      {projects.map(project => (
        <div key={project.id} className="relative">
          <ProjectCard project={project} />
        </div>
      ))}
    </div>
  );
};

const ProjectsCarousel = () => {
  const projectsPerView = useResponsiveProjectsPerView();
  const { 
    currentIndex, 
    goToNext, 
    goToPrevious, 
    canGoNext, 
    canGoPrevious, 
    showNavigation 
  } = useCarousel(PROJECT_DATA.length, projectsPerView);

  const visibleProjects = PROJECT_DATA.slice(
    currentIndex,
    currentIndex + projectsPerView
  );

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
  <div className="flex justify-center mt-16 sm:mt-20">
    <div className="w-1 h-16 bg-gradient-to-b from-cyan-400 to-transparent rounded-full"></div>
  </div>
);

export default function Projects() {
  return (
    <section 
      id="projects" 
      className="min-h-screen py-20 sm:py-24 md:py-28 px-4 sm:px-6 md:px-12 lg:px-20"
    >
      <div className="w-full max-w-6xl mx-auto text-center">
        <SectionHeader />
        <TechStackSection />
        <ProjectsCarousel />
        <TimelineIndicator />
      </div>
    </section>
  );
}
