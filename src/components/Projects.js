import { useState, useEffect } from "react";
import { FaReact, FaNodeJs, FaJava, FaPython, FaGit, FaAws, FaGithub, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { BiLogoPostgresql } from "react-icons/bi";
import { SiTailwindcss, SiJavascript, SiSpring, SiTensorflow } from "react-icons/si";
import { GrMysql } from "react-icons/gr";

// Constants for configuration
const STAR_CONFIG = {
  COUNT: 100, // 
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
  AUTO_PLAY_INTERVAL: 30000, // 30 sec
};

const TOOLTIP_CONFIG = {
  DISPLAY_DURATION: 1000,
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

// Project data
const PROJECT_DATA = [
  {
    title: "Current Portfolio Website",
    description: "A modern personal Fullstack portfolio built with Next.js, Node, React, Tailwind, and Three.js. Optimized for mobile, tablet and PC viewing with a responsive development approach.",
    technologies: ["React", "TailwindCSS", "Three.js", "Java", "Spring"],
    link: "https://www.denesk.co.uk",
    github: "https://github.com/deneskosztyuk/reactapp",
  },
  {
    title: "Custom Trained ML Neural Network",
    description: "A custom-trained neural network model, programmed in C# using reinforcement learning techniques within Unity for 3D visual representation and environment interaction.",
    technologies: ["TensorFlow", "TensorBoard", "C#", "Unity", "Artificial Intelligence", "Neural Network"],
    github: "https://github.com/deneskosztyuk/Warehouse-Navigation-Agent/blob/main/README.md",
  },
  {
    title: "Satellite Probe Simulator",
    description: "Hardware and software project, where a device was built to simulate the behavour of a satellite probe with data telemetry, environmental data collection and transmition to a custom desktop software for observation.",
    technologies: ["Python", "Flask", "C", "C++", "ESP32", "RF Communication"],
    github: "https://github.com/deneskosztyuk/DSPS_Guide-Deep-Space-Probe-Simulator",
  },
  {
    title: "3-link Robotic Arm",
    description: "A robotic arm simulation made of 3 links, that perform inverse and forward kinematics with an attached end-effector.",
    technologies: ["Python 3", "Numpy", "CoppeliaSim", "Electronics Engineering", "IoT", "Robotics"],
    github: "https://github.com/deneskosztyuk/3-Link-Robotic-Arm---CoppeliaSim",
  },
  {
    title: "Self-Navigating Robotic Device",
    description: "A self-navigating robot that utilised the ATmega328p MCU, on-board sensors and modules (infrared, memory, motor driver, PID controller), custom written firmware to avoid hitting obstacles and navigate through challenging unkown terrain.",
    technologies: ["Embedded C", "Electronics Engineering", "Robotics", "KiCad", "Arduino"],
    github: "https://github.com/deneskosztyuk/Self-Navigating-Robotic-Device/blob/main/README.md",
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

// Custom hook for responsive projects per view
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

// Custom hook for carousel functionality
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

  // Auto-play functionality
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

// Custom hook for touch/swipe functionality
const useSwipeGesture = (onSwipeLeft, onSwipeRight) => {
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const minSwipeDistance = 50; // Minimum distance for a swipe

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

// Custom hook for tooltip functionality
const useTooltip = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleTooltipDisplay = () => setShowTooltip(true);

  useEffect(() => {
    if (!showTooltip) return;

    const timer = setTimeout(() => {
      setShowTooltip(false);
    }, TOOLTIP_CONFIG.DISPLAY_DURATION);

    return () => clearTimeout(timer);
  }, [showTooltip]);

  return { showTooltip, handleTooltipDisplay };
};

// Components
const TechIcon = ({ icon, label }) => {
  const { showTooltip, handleTooltipDisplay } = useTooltip();

  const buttonClasses = `
    p-2 sm:p-4 bg-gray-500/40 rounded-lg transition-all duration-100 
    hover:rounded-3xl hover:bg-slate-800 shadow-lg
  `;

  const tooltipClasses = `
    absolute bottom-[-35px] sm:bottom-[-30px] bg-gray-800 text-white 
    text-xs sm:text-sm px-2 py-1 rounded-md shadow-lg transition-opacity 
    duration-300 z-50 ${showTooltip ? "opacity-100" : "opacity-0 pointer-events-none"}
  `;

  return (
    <div className="relative flex flex-col items-center">
      <button className={buttonClasses} onClick={handleTooltipDisplay}>
        <div className="text-xl sm:text-xl text-white transition-all duration-300">
          {icon}
        </div>
      </button>
      <div className={tooltipClasses}>
        {label}
      </div>
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
  <div className="text-center mb-6 sm:mb-8 relative z-10">
    <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold">
      🚀 My Projects
    </h1>
    <p className="mt-2 sm:mt-3 text-xs sm:text-sm md:text-base text-gray-300">
      A collection of projects showcasing my software skills & practical experience.
    </p>
  </div>
);

const TechStackGrid = () => (
  <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8 relative z-10">
    {TECH_STACK.map((tech, index) => (
      <TechIcon key={index} icon={tech.icon} label={tech.label} />
    ))}
  </div>
);

const ProjectCard = ({ project }) => {
  const cardClasses = `
    relative bg-gray-800 rounded-lg overflow-hidden shadow-lg 
    transition-all duration-300 transform hover:scale-102 hover:shadow-2xl 
    p-4 sm:p-5 flex-shrink-0 w-full min-h-[300px] sm:min-h-[340px]
    flex flex-col justify-between
  `;

  return (
    <div className={cardClasses}>
      <div>
        <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
          {project.title}
        </h3>
        <p className="text-gray-400 text-xs sm:text-sm mb-3 flex-grow">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1 sm:gap-2 mb-4">
          {project.technologies.map((tech, index) => (
            <span key={index} className="px-2 py-1 bg-gray-700 text-xs rounded-md">
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mt-auto">
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-purple-400 flex items-center gap-1 text-xs sm:text-sm transition-colors"
        >
          GitHub <FaGithub />
        </a>
      </div>
    </div>
  );
};

// Carousel Components
const CarouselButton = ({ onClick, disabled, children, direction, className = "" }) => {
  const buttonClasses = `
    absolute top-1/2 transform -translate-y-1/2 z-20
    bg-gray-800/80 hover:bg-gray-700 text-white p-2 rounded-full
    transition-all duration-200 shadow-lg
    ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'}
    ${direction === 'left' ? '-left-7' : '-right-7'}
    ${className}
  `;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={buttonClasses}
    >
      {children}
    </button>
  );
};

const EnhancedCarouselIndicators = ({ totalSlides, currentSlide, onSlideClick }) => (
  <div className="flex justify-center space-x-3 mt-6">
    {Array.from({ length: totalSlides }, (_, index) => (
      <button
        key={index}
        onClick={() => onSlideClick(index)}
        className={`
          transition-all duration-200 rounded-full
          ${index === currentSlide 
            ? 'bg-white w-4 h-4 sm:w-3 sm:h-3' 
            : 'bg-gray-500 w-3 h-3 sm:w-2 sm:h-2 hover:bg-gray-400'
          }
        `}
        aria-label={`Go to slide ${index + 1}`}
      />
    ))}
  </div>
);

const ProjectsCarousel = () => {
  const projectsPerView = useResponsiveProjectsPerView();
  const [swipeDirection, setSwipeDirection] = useState(null);
  
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

  // Add swipe gesture support
  const { onTouchStart, onTouchMove, onTouchEnd } = useSwipeGesture(
    () => {
      if (canGoNext) {
        setSwipeDirection('left');
        goToNext();
        setTimeout(() => setSwipeDirection(null), 300);
      }
    },
    () => {
      if (canGoPrevious) {
        setSwipeDirection('right');
        goToPrevious();
        setTimeout(() => setSwipeDirection(null), 300);
      }
    }
  );

  const totalSlides = Math.ceil(PROJECT_DATA.length / projectsPerView);
  const currentSlide = Math.floor(currentIndex / projectsPerView);

  const visibleProjects = PROJECT_DATA.slice(
    currentIndex,
    currentIndex + projectsPerView
  );

  return (
    <div 
      className="relative w-full max-w-6xl mx-auto px-4"
      onMouseEnter={pauseAutoPlay}
      onMouseLeave={resumeAutoPlay}
    >
      {/* Carousel Container with Touch Events */}
      <div 
        className={`
          relative overflow-hidden select-none transition-all duration-300
          ${swipeDirection === 'left' ? 'transform translate-x-2' : ''}
          ${swipeDirection === 'right' ? 'transform -translate-x-2' : ''}
        `}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div className="flex transition-transform duration-500 ease-in-out">
          <div className={`grid gap-6 sm:gap-8 w-full ${
            projectsPerView === 1 ? 'grid-cols-1' :
            projectsPerView === 2 ? 'grid-cols-2' : 'grid-cols-3'
          }`}>
            {visibleProjects.map((project, index) => (
              <ProjectCard key={`${currentIndex}-${index}`} project={project} />
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Buttons - Hidden on Mobile */}
      {PROJECT_DATA.length > projectsPerView && (
        <>
          <CarouselButton
            onClick={goToPrevious}
            disabled={!canGoPrevious}
            direction="left"
            className="hidden sm:block"
          >
            <FaChevronLeft />
          </CarouselButton>
          <CarouselButton
            onClick={goToNext}
            disabled={!canGoNext}
            direction="right"
            className="hidden sm:block"
          >
            <FaChevronRight />
          </CarouselButton>
        </>
      )}

      {totalSlides > 1 && (
        <div className="lg:hidden">
          <EnhancedCarouselIndicators
          totalSlides={totalSlides}
          currentSlide={currentSlide}
          onSlideClick={(slideIndex) => goToSlide(slideIndex * projectsPerView)}
          />
        </div>
      )
      }

      
    </div>
  );
};

const AnimationStyles = () => (
  <style>
    {`
      @keyframes twinkle {
        0%, 100% { opacity: 0.5; }
        50% { opacity: 1; }
      }

      .animate-twinkle {
        animation: twinkle 2s infinite ease-in-out;
      }
    `}
  </style>
);

// Main component
export default function Projects() {
  const [staticStars, setStaticStars] = useState([]);

  useEffect(() => {
    setStaticStars(generateStars());
  }, []);

  const sectionClasses = `
    min-h-screen flex flex-col justify-center items-center px-2 sm:px-6 
    md:px-8 lg:px-10 bg-slate-950 text-white relative overflow-hidden
  `;

  return (
    <section id="projects" className={sectionClasses}>
      <StarryBackground stars={staticStars} />
      <SectionHeader />
      <TechStackGrid />
      <div className="relative z-10 mt-3 sm:mt-12 md:mt-1 w-full">
        <ProjectsCarousel />
      </div>
      <AnimationStyles />
    </section>
  );
}
