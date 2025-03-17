import { useState, useEffect } from "react";
import { FaReact, FaNodeJs, FaJava, FaPython, FaGit, FaAws, FaGithub } from "react-icons/fa";
import { BiLogoPostgresql } from "react-icons/bi";
import { SiTailwindcss, SiJavascript, SiSpring } from "react-icons/si";
import { GrMysql } from "react-icons/gr";

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
      description: "A modern personal portfolio built with React, Tailwind, and Three.js.",
      technologies: ["React", "TailwindCSS", "Three.js", "Java", "Spring"],
      link: "https://www.denesk.co.uk",
      github: "https://github.com/deneskosztyuk/reactapp",
    },
    {
      title: "Satellite Probe Simulator",
      description: "Encapsulates both hardware & software for data transfer over long distances.",
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
      className="min-h-screen flex flex-col justify-center items-center px-3 sm:px-6 md:px-8 lg:px-10 bg-slate-950 text-white relative overflow-hidden"
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

      {/* Tech Stack Icons Row */}
      <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8 relative z-10">
        <TechIcon icon={<FaJava />} label="Java" />
        <TechIcon icon={<FaPython />} label="Python" />
        <TechIcon icon={<SiJavascript />} label="JS" />
        <TechIcon icon={<FaReact />} label="React" />
        <TechIcon icon={<SiSpring />} label="Spring" />
        <TechIcon icon={<FaNodeJs />} label="Node.js" />
        <TechIcon icon={<BiLogoPostgresql />} label="PostgreSQL" />
        <TechIcon icon={<GrMysql />} label="MySQL" />
        <TechIcon icon={<SiTailwindcss />} label="Tailwind" />
        <TechIcon icon={<FaGit />} label="Git" />
        <TechIcon icon={<FaAws />} label="AWS" />
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full max-w-6xl relative z-10">
        {projectList.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>

      {/* CSS Animations */}
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

/* Responsive Tech Icon Component */
const TechIcon = ({ icon, label }) => (
  <div className="group flex flex-col items-center">
    <div
      className="p-1.5 sm:p-2 md:p-3 bg-gray-500/40 rounded-lg transition-all duration-100 
                    group-hover:rounded-3xl group-hover:bg-slate-800 shadow-lg"
    >
      <div className="text-xl sm:text-2xl md:text-3xl text-white transition-all duration-300 animate-float">
        {icon}
      </div>
    </div>
    <span className="text-xs sm:text-sm mt-1 sm:mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      {label}
    </span>
  </div>
);

/* Responsive Project Card */
const ProjectCard = ({ project }) => (
  <div className="relative bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-all transform hover:scale-105 hover:shadow-xl p-3 sm:p-4">
    {/* Project Title & Description */}
    <h3 className="text-lg sm:text-xl font-bold text-white">{project.title}</h3>
    <p className="text-gray-400 mt-1 sm:mt-2 text-xs sm:text-sm">{project.description}</p>

    {/* 🛠️ Technologies Used */}
    <div className="mt-2 sm:mt-3 flex flex-wrap gap-1 sm:gap-2">
      {project.technologies.map((tech, i) => (
        <span key={i} className="px-2 py-1 bg-gray-700 text-xs rounded-md">
          {tech}
        </span>
      ))}
    </div>

    {/* Buttons */}
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
