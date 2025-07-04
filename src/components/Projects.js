import { useState, useEffect } from "react";
import { FaReact, FaNodeJs, FaJava, FaPython, FaGit, FaAws, FaGithub } from "react-icons/fa";
import { BiLogoPostgresql } from "react-icons/bi";
import { SiTailwindcss, SiJavascript, SiSpring, SiTensorflow } from "react-icons/si";
import { GrMysql } from "react-icons/gr";

/* ✅ Responsive Tech Icon Component (Fixed) */
const TechIcon = ({ icon, label }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    if (showTooltip) {
      const timer = setTimeout(() => setShowTooltip(false), 1000); 
      return () => clearTimeout(timer); 
    }
  }, [showTooltip]);

  return (
    <div className="relative flex flex-col items-center">
      {/* Tech Icon */}
      <button
        className="p-2 sm:p-4 bg-gray-500/40 rounded-lg transition-all duration-100 
                    hover:rounded-3xl hover:bg-slate-800 shadow-lg"
        onClick={() => setShowTooltip(true)}
      >
        <div className="text-xl sm:text-xl text-white transition-all duration-300">
          {icon}
        </div>
      </button>

      {/* Tooltip Popup with Fade-out */}
      <div
        className={`absolute bottom-[-35px] sm:bottom-[-30px] bg-gray-800 text-white text-xs sm:text-sm px-2 py-1 rounded-md shadow-lg transition-opacity duration-300 z-50 ${
          showTooltip ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {label}
      </div>
    </div>
  );
};

export default function Projects() {
  const [staticStars, setStaticStars] = useState([]);

  // Generate static stars for the background
  useEffect(() => {
    const starsArray = Array.from({ length: 200 }, (_, index) => ({
      id: `star-${index}`,
      size: Math.random() * 3 + 1,
      left: Math.random() * 100,
      top: Math.random() * 100,
      opacity: Math.random() * 0.5 + 0.5,
      animationDelay: `${Math.random() * 10}s`,
    }));
    setStaticStars(starsArray);
  }, []);

  // Project Data
  const projectList = [
    {
      title: "Current Portfolio Website",
      description: "A modern personal portfolio built with Next.js, React, Tailwind, and Three.js. Optimized for mobile, tablet and PC viewing with a responsive development approach.",
      technologies: ["React", "TailwindCSS", "Three.js", "Java", "Spring"],
      link: "https://www.denesk.co.uk",
      github: "https://github.com/deneskosztyuk/reactapp",
    },
    {
      title: "Custom Trained ML Neural Network",
      description: "A custom-trained neural network model, programmed in C# using reinforcement learning techniques within Unity for 3D visual representation and environment interaction.",
      technologies: ["TensorFlow", "TensorBoard", "C#", "Unity", "Artificial Intelligence", "Neural Network"],
      github: "https://github.com/deneskosztyuk/Warehouse-Navigation-Agent/tree/main",
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
      technologies: ["Python 3", "Numpy", "CoppeliaSim", "Electrical Engineering", "IoT"],
      github: "https://github.com/deneskosztyuk/3-Link-Robotic-Arm---CoppeliaSim",
    },
  ];

  return (
    <section
      id="projects"
      className="min-h-screen flex flex-col justify-center items-center px-2 sm:px-6 md:px-8 lg:px-10 bg-slate-950 text-white relative overflow-hidden"
    >
      {/* Static Starry Background */}
      <div className="absolute inset-0">
        {staticStars.map((star) => (
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

      {/* Section Title */}
      <div className="text-center mb-6 sm:mb-8 relative z-10">
        <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold">🚀 My Projects</h1>
        <p className="mt-2 sm:mt-3 text-xs sm:text-sm md:text-base text-gray-300">
          A collection of projects showcasing my skills & experience.
        </p>
      </div>

      {/* stack icons */}
      <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8 relative z-10">
        <TechIcon icon={<FaPython />} label="Python" />
        <TechIcon icon={<SiTensorflow />} label="TensorFlow" />
        <TechIcon icon={<SiJavascript />} label="JavaScript" />
        <TechIcon icon={<FaReact />} label="React" />
        <TechIcon icon={<FaNodeJs />} label="Node.js" />
        <TechIcon icon={<SiTailwindcss />} label="Tailwind" />
        <TechIcon icon={<FaJava />} label="Java" />        
        <TechIcon icon={<SiSpring />} label="Spring" />
        <TechIcon icon={<BiLogoPostgresql />} label="PostgreSQL" />
        <TechIcon icon={<GrMysql />} label="MySQL" />
        <TechIcon icon={<FaGit />} label="Git" />
        <TechIcon icon={<FaAws />} label="AWS" />
      </div>

      {/* projects grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-6 w-full max-w-6xl relative z-10 mt-3 sm:mt-12 md:mt-1">
        {projectList.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>

      {/* CSS animations */}
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
    </section>
  );
}

/* responsive project card */
const ProjectCard = ({ project }) => (
  <div className="relative bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-all transform hover:scale-105 hover:shadow-xl p-3 sm:p-4">
    {/* project title description */}
    <h3 className="text-lg sm:text-xl font-bold text-white">{project.title}</h3>
    <p className="text-gray-400 mt-1 sm:mt-2 text-xs sm:text-sm">{project.description}</p>

    {/* technologies used */}
    <div className="mt-2 sm:mt-3 flex flex-wrap gap-1 sm:gap-2">
      {project.technologies.map((tech, i) => (
        <span key={i} className="px-2 py-1 bg-gray-700 text-xs rounded-md">
          {tech}
        </span>
      ))}
    </div>

    {/* buttons */}
    <div className="mt-3 sm:mt-4 flex flex-wrap gap-2">
      <a
        href={project.github}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-400 hover:text-white flex items-center gap-1 text-xs sm:text-sm"
      >
        GitHub <FaGithub />
      </a>
    </div>
  </div>
);
