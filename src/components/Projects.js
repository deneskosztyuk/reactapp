import { useState, useEffect } from "react";
import { FaReact, FaNodeJs, FaJava, FaPython, FaGit, FaAws, FaGithub, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { BiLogoPostgresql } from "react-icons/bi";
import { SiTailwindcss, SiJavascript, SiSpring, SiTensorflow } from "react-icons/si";
import { GrMysql } from "react-icons/gr";

// Constants for configuration
const STAR_CONFIG = {
  COUNT: 100,
  MIN_SIZE: 1,
  MAX_SIZE: 4,
  MIN_OPACITY: 0.3,
  MAX_OPACITY: 0.6,
  MAX_ANIMATION_DELAY: 10,
};

const CAROUSEL_CONFIG = {
  PROJECTS_PER_VIEW: {
    MOBILE: 1,
    TABLET: 2,
    DESKTOP: 3,
  },
  AUTO_PLAY_INTERVAL: 30000,
};

// Technology stack data
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

// Project data with technical specifications
const PROJECT_DATA = [
  {
    title: "Portfolio Website",
    name: "PORTFOLIO_SYS_v2.1",
    description: "A modern personal Fullstack portfolio built with Next.js, Node, React, Tailwind, and Three.js. Optimized for mobile, tablet and PC viewing with a responsive development approach.",
    technologies: ["React", "TailwindCSS", "Three.js", "Java", "Spring"],
    link: "https://www.denesk.co.uk",
    github: "https://github.com/deneskosztyuk/reactapp",
    status: "",
    signalStrength: 14,
  },
  {
    title: "ML Neural Network",
    name: "NEURAL_NET_AI_v1.0",
    description: "A custom-trained neural network model, programmed in C# using reinforcement learning techniques within Unity for 3D visual representation and environment interaction.",
    technologies: ["TensorFlow", "TensorBoard", "C#", "Unity", "AI", "Neural Network"],
    github: "https://github.com/deneskosztyuk/Warehouse-Navigation-Agent/blob/main/README.md",
    status: "",
    signalStrength: 58,
  },
  {
    title: "Satellite Probe Simulator",
    name: "DEEP_SPACE_PROBE_v1.2",
    description: "Built a hardware/software system simulating satellite probe behavior with environmental data collection, telemetry transmission, and custom desktop monitoring interface",
    technologies: ["Python", "Flask", "C", "C++", "ESP32", "RF Communication"],
    github: "https://github.com/deneskosztyuk/DSPS_Guide-Deep-Space-Probe-Simulator",
    status: "",
    signalStrength: 12,
  },
  {
    title: "3-link Robotic Arm",
    name: "ROBOTIC_ARM_3DOF_v1.0",
    description: "A robotic arm simulation made of 3 links, that perform inverse and forward kinematics with an attached end-effector.",
    technologies: ["Python 3", "Numpy", "CoppeliaSim", "Electronics", "IoT", "Robotics"],
    github: "https://github.com/deneskosztyuk/3-Link-Robotic-Arm---CoppeliaSim",
    status: "",
    signalStrength: 75,
  },
  {
    title: "Self-Navigating Robot",
    name: "AUTONOMOUS_NAV_v2.0",
    description: "A self-navigating robot that utilised the ATmega328p MCU, on-board sensors and modules (infrared, memory, motor driver, PID controller), custom written firmware to avoid hitting obstacles and navigate through challenging unknown terrain.",
    technologies: ["Embedded C", "Electronics", "Robotics", "KiCad", "Arduino"],
    github: "https://github.com/deneskosztyuk/Self-Navigating-Robotic-Device/blob/main/README.md",
    status: "",
    signalStrength: 94,
  },
];

// Utility functions
const generateRandomInRange = (min, max) => Math.random() * (max - min) + min;

const createStar = (index) => ({
  id: `star-${index}`,
  size: generateRandomInRange(STAR_CONFIG.MIN_SIZE, STAR_CONFIG.MAX_SIZE),
  left: Math.random() * 100,
  top: Math.random() * 100,
  opacity: generateRandomInRange(STAR_CONFIG.MIN_OPACITY, STAR_CONFIG.MAX_OPACITY),
  animationDelay: `${Math.random() * STAR_CONFIG.MAX_ANIMATION_DELAY}s`,
});

const generateStars = () => {
  return Array.from({ length: STAR_CONFIG.COUNT }, (_, index) => createStar(index));
};

// Custom hooks
const useResponsiveProjectsPerView = () => {
  const [projectsPerView, setProjectsPerView] = useState(CAROUSEL_CONFIG.PROJECTS_PER_VIEW.DESKTOP);

  useEffect(() => {
    const updateProjectsPerView = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setProjectsPerView(CAROUSEL_CONFIG.PROJECTS_PER_VIEW.MOBILE);
      } else if (width < 1024) {
        setProjectsPerView(CAROUSEL_CONFIG.PROJECTS_PER_VIEW.TABLET);
      } else {
        setProjectsPerView(CAROUSEL_CONFIG.PROJECTS_PER_VIEW.DESKTOP);
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
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const maxIndex = Math.max(0, totalItems - itemsPerView);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex >= maxIndex ? 0 : prevIndex + 1
    );
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex <= 0 ? maxIndex : prevIndex - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(Math.min(index, maxIndex));
  };

  useEffect(() => {
    if (!isAutoPlaying || totalItems <= itemsPerView) return;
    const interval = setInterval(goToNext, CAROUSEL_CONFIG.AUTO_PLAY_INTERVAL);
    return () => clearInterval(interval);
  }, [currentIndex, isAutoPlaying, totalItems, itemsPerView]);

  const pauseAutoPlay = () => setIsAutoPlaying(false);
  const resumeAutoPlay = () => setIsAutoPlaying(true);

  return {
    currentIndex,
    goToNext,
    goToPrevious,
    goToSlide,
    pauseAutoPlay,
    resumeAutoPlay,
    canGoNext: currentIndex < maxIndex,
    canGoPrevious: currentIndex > 0,
  };
};

const useSwipeGesture = (onSwipeLeft, onSwipeRight) => {
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      onSwipeLeft();
    } else if (isRightSwipe) {
      onSwipeRight();
    }
  };

  return {
    onTouchStart,
    onTouchMove,
    onTouchEnd,
  };
};

// Tech Icon Component
const TechIcon = ({ icon, label }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative group">
      <button 
        className="relative border-2 border-green-400 bg-gray-900 p-3 transition-all duration-300 hover:bg-green-900 hover:scale-110"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className={`text-lg ${isHovered ? 'text-yellow-400' : 'text-green-400'} transition-colors duration-300`}>
          {icon}
        </div>
      </button>

      {/* Tooltip */}
      {isHovered && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-20">
          <div className="bg-gray-900 border-2 border-green-400 p-2 font-mono text-xs whitespace-nowrap">
            <div className="text-green-400 font-bold">{label}</div>
          </div>
        </div>
      )}
    </div>
  );
};

const StarryBackground = ({ stars }) => (
  <div className="absolute inset-0">
    {stars.map((star) => (
      <div
        key={star.id}
        className="absolute bg-white rounded-full animate-twinkle"
        style={{
          width: `${star.size}px`,
          height: `${star.size}px`,
          top: `${star.top}%`,
          left: `${star.left}%`,
          opacity: star.opacity,
          animationDelay: star.animationDelay,
        }}
      />
    ))}
  </div>
);

const SectionHeader = () => (
  <div className="text-center mb-12 relative z-10">
    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-mono font-bold mb-4 text-white">
      🚀 My Projects
    </h1>
    <p className="text-base sm:text-lg text-white max-w-2xl mx-auto font-mono">
      A collection of projects showcasing my software skills & practical experience.
    </p>
  </div>
);

const TechStackGrid = () => (
  <div className="relative mb-12">
    <div className="relative z-10 grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-12 gap-4 justify-items-center max-w-6xl mx-auto">
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

const SignalStrengthIndicator = ({ strength, size = "sm" }) => {
  const bars = 5;
  const filledBars = Math.ceil((strength / 100) * bars);

  return (
    <div className="flex items-end space-x-0.5">
      {Array.from({ length: bars }, (_, i) => (
        <div
          key={i}
          className={`w-1 ${size === "sm" ? "h-2" : "h-3"} ${
            i < filledBars ? 'bg-green-400 animate-pulse' : 'bg-gray-600'
          }`}
          style={{ height: `${(i + 1) * (size === "sm" ? 2 : 3)}px` }}
        />
      ))}
    </div>
  );
};

const ProjectCard = ({ project }) => {
  return (
    <div className="relative z-10">
      <div className="relative bg-gray-900 border-2 border-green-400 p-6 min-h-[400px] flex flex-col">
        {/* Status Indicator */}
        <div className="absolute -top-3 right-3 flex items-center space-x-2">
          <div className="bg-green-400 text-black px-2 py-1 text-xs font-mono font-bold">
            {project.status}
          </div>
          <SignalStrengthIndicator strength={project.signalStrength} />
        </div>

        {/* Project Content */}
        <div className="space-y-4 flex-1 flex flex-col">
          <div>
            <h3 className="text-lg font-mono font-bold text-green-100 mb-1">
              {project.title}
            </h3>
            <div className="text-xs font-mono text-green-400 mb-3">
              {project.name}
            </div>
            <p className="text-sm text-green-200 leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Technologies */}
          <div className="flex-1">
            <div className="text-green-400 font-mono text-xs font-bold mb-2">
              TECHNOLOGIES:
            </div>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, idx) => (
                <span 
                  key={idx}
                  className="px-2 py-1 bg-green-900 text-green-200 text-xs border border-green-600 font-mono rounded"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Status Display */}
          <div className="border-t border-green-600 pt-3">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-green-300">
                STATUS: <span className="text-green-400">{project.status}</span>
              </span>
              <span className="text-green-300">SIGNAL: {project.signalStrength}%</span>
            </div>
          </div>

          {/* GitHub Link */}
          <div className="flex justify-end items-center mt-auto">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-green-300 hover:text-green-400 transition-colors text-sm font-mono"
            >
              <span>VIEW CODE</span>
              <FaGithub />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const CarouselControls = ({ onPrevious, onNext, canGoPrevious, canGoNext }) => (
  <>
    <button
      onClick={onPrevious}
      disabled={!canGoPrevious}
      className={`absolute -left-16 top-1/2 transform -translate-y-1/2 z-20 
        bg-gray-900 border-2 border-green-400 p-3 transition-all duration-300
        ${canGoPrevious ? 'hover:bg-green-900 hover:scale-110' : 'opacity-50 cursor-not-allowed'}
        hidden sm:block`}
    >
      <FaChevronLeft className="text-green-400" />
    </button>
    <button
      onClick={onNext}
      disabled={!canGoNext}
      className={`absolute -right-16 top-1/2 transform -translate-y-1/2 z-20
        bg-gray-900 border-2 border-green-400 p-3 transition-all duration-300
        ${canGoNext ? 'hover:bg-green-900 hover:scale-110' : 'opacity-50 cursor-not-allowed'}
        hidden sm:block`}
    >
      <FaChevronRight className="text-green-400" />
    </button>
  </>
);

const CarouselIndicators = ({ totalSlides, currentSlide, onSlideClick }) => (
  <div className="flex justify-center space-x-4 mt-8">
    {Array.from({ length: totalSlides }, (_, index) => (
      <button
        key={index}
        onClick={() => onSlideClick(index)}
        className={`transition-all duration-300 border border-green-400 ${
          index === currentSlide 
            ? 'bg-green-400 w-4 h-4 animate-pulse' 
            : 'bg-gray-900 w-3 h-3 hover:bg-green-900'
        }`}
      />
    ))}
  </div>
);

const ProjectsCarousel = () => {
  const projectsPerView = useResponsiveProjectsPerView();
  
  const {
    currentIndex,
    goToNext,
    goToPrevious,
    goToSlide,
    pauseAutoPlay,
    resumeAutoPlay,
    canGoNext,
    canGoPrevious,
  } = useCarousel(PROJECT_DATA.length, projectsPerView);

  const { onTouchStart, onTouchMove, onTouchEnd } = useSwipeGesture(
    () => {
      if (canGoNext) goToNext();
    },
    () => {
      if (canGoPrevious) goToPrevious();
    }
  );

  const totalSlides = Math.ceil(PROJECT_DATA.length / projectsPerView);
  const currentSlide = Math.floor(currentIndex / projectsPerView);

  const visibleProjects = PROJECT_DATA.slice(
    currentIndex,
    currentIndex + projectsPerView
  );

  return (
    <div className="relative w-full max-w-7xl mx-auto px-0 sm:px-16">
      <div 
        className="relative z-10 p-8"
        onMouseEnter={pauseAutoPlay}
        onMouseLeave={resumeAutoPlay}
      >
        <div 
          className="overflow-hidden"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div className={`grid gap-8 transition-transform duration-500 ease-in-out ${
            projectsPerView === 1 ? 'grid-cols-1' :
            projectsPerView === 2 ? 'grid-cols-2' : 'grid-cols-3'
          }`}>
            {visibleProjects.map((project, index) => (
              <ProjectCard 
                key={`${currentIndex}-${index}`} 
                project={project}
              />
            ))}
          </div>
        </div>

        {/* Navigation Controls */}
        {PROJECT_DATA.length > projectsPerView && (
          <CarouselControls
            onPrevious={goToPrevious}
            onNext={goToNext}
            canGoPrevious={canGoPrevious}
            canGoNext={canGoNext}
          />
        )}
      </div>

      {/* Indicators */}
      {totalSlides > 1 && (
        <div className="lg:hidden">
          <CarouselIndicators
            totalSlides={totalSlides}
            currentSlide={currentSlide}
            onSlideClick={(slideIndex) => goToSlide(slideIndex * projectsPerView)}
          />
        </div>
      )}
    </div>
  );
};

// Main Projects Component
export default function Projects() {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    setStars(generateStars());
  }, []);

  return (
    <section 
      id="projects" 
      className="min-h-screen py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-slate-950 text-white relative overflow-hidden"
    >
      <StarryBackground stars={stars} />
      <SectionHeader />
      <TechStackGrid />
      <ProjectsCarousel />
      
      {/* CSS Animations */}
      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { 
            opacity: 0.3; 
            transform: scale(1);
          }
          50% { 
            opacity: 1; 
            transform: scale(1.1);
          }
        }

        .animate-twinkle {
          animation: twinkle 3s infinite ease-in-out;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out;
        }
      `}</style>
    </section>
  );
}
