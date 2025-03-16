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
      size: Math.random() * 3 + 1, // Small stars
      left: Math.random() * 100, // Random horizontal position
      top: Math.random() * 100, // Random vertical position
      opacity: Math.random() * 0.5 + 0.5, // Random opacity
      animationDelay: `${Math.random() * 10}s`, // Random twinkle delay
    }));
    setStaticStars(starsArray);
  }, []);

  // Project Data
  const projectList = [
    {
      title: "Portfolio Website",
      description: "A modern personal portfolio built with React, Tailwind, and Three.js.",
      technologies: ["React", "TailwindCSS", "Three.js", "Java", "Spring"],
      link: "https://www.example.com",
      github: "https://github.com/example",
    },
    {
      title: "Satellite Probe Simulator",
      description: "Encapsulates both hardware & software for data transfer over long distances.",
      technologies: ["Python", "Flask", "C", "C++", "ESP32", "RF Communication"],
      link: "https://www.example.com",
      github: "https://github.com/example",
    },
    {
      title: "AI Warehouse Worker",
      description: "Trained a Neural Network for an AI Agent in a simulated warehouse environment.",
      technologies: ["C#", "TensorFlow", "Unity", "ML Agents", "Neural Network"],
      link: "https://www.example.com",
      github: "https://github.com/example",
    },
  ];

  return (
    <section id="projects" className="min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 md:px-8 lg:px-10 bg-slate-950 text-white relative overflow-hidden">

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
      <div className="text-center mb-8 relative z-10">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">🚀 My Projects</h1>
        <p className="mt-4 text-sm sm:text-base text-gray-300">
          A collection of projects showcasing my skills & experience.
        </p>
      </div>

      {/* 🔥 Tech Stack Icons Row */}
      <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-8 relative z-10">
        <TechIcon icon={<FaJava />} label="Java" />
        <TechIcon icon={<FaPython />} label="Python" />
        <TechIcon icon={<SiJavascript />} label="JavaScript" />
        <TechIcon icon={<FaReact />} label="React" />
        <TechIcon icon={<SiSpring />} label="Spring" />
        <TechIcon icon={<FaNodeJs />} label="Node.js" />
        <TechIcon icon={<BiLogoPostgresql />} label="PostgreSQL" />
        <TechIcon icon={<GrMysql />} label="MySQL" />
        <TechIcon icon={<SiTailwindcss />} label="TailwindCSS" />
        <TechIcon icon={<FaGit />} label="Git/GitHub" />
        <TechIcon icon={<FaAws />} label="AWS" />
      </div>

      {/* 🏗️ Projects Grid */}
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

          .tooltip {
            position: absolute;
            bottom: -30px;
            left: 50%;
            transform: translateX(-50%);
            background-color: #333;
            color: #fff;
            padding: 5px 10px;
            border-radius: 5px;
            opacity: 0;
            transition: opacity 0.3s;
            pointer-events: none;
          }

          .tooltip.visible {
            opacity: 1;
          }
        `}
      </style>
    </section>
  );
}

/* ✅ Responsive Tech Icon Component */
const TechIcon = ({ icon, label }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleClick = () => {
    setShowTooltip(!showTooltip);
  };

  return (
    <div className="relative group flex flex-col items-center">
      <div
        className="p-2 sm:p-3 bg-gray-500/40 rounded-lg transition-all duration-100
                    group-hover:rounded-3xl group-hover:bg-slate-800 shadow-lg cursor-pointer"
        onClick={handleClick}
      >
        <div className="text-2xl sm:text-3xl md:text-4xl text-white transition-all duration-300 animate-float">
          {icon}
        </div>
      </div>
      {showTooltip && (
        <div className="tooltip visible">
          {label}
        </div>
      )}
    </div>
  );
};

/* ✅ Responsive Project Card */
const ProjectCard = ({ project }) => (
  <div className="relative bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-all transform hover:scale-105 hover:shadow-xl p-3 sm:p-4">
    {/* Project Title & Description */}
    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white">{project.title}</h3>
    <p className="text-gray-400 mt-2 text-xs sm:text-sm md:text-base">{project.description}</p>

    {/* 🛠️ Technologies Used */}
    <div className="mt-3 flex flex-wrap gap-2">
      {project.technologies.map((tech, i) => (
        <span key={i} className="px-2 py-1 bg-gray-700 text-xs rounded-md">{tech}</span>
      ))}
    </div>

    {/* 🔗 Buttons */}
    <div className="mt-4 flex flex-wrap gap-3">
      <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 flex items-center gap-1 text-xs sm:text-sm">
        Live Demo <FaReact />
      </a>
      <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white flex items-center gap-1 text-xs sm:text-sm">
        GitHub <FaGithub />
      </a>
    </div>
  </div>
);
