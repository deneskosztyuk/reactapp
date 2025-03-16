import { FaReact, FaNodeJs, FaJava, FaPython, FaGit, FaAws, FaGithub } from "react-icons/fa"; // Added FaGithub here
import { BiLogoPostgresql } from "react-icons/bi";
import { SiTailwindcss, SiJavascript, SiSpring } from "react-icons/si";
import { GrMysql } from "react-icons/gr";

export default function Projects() {
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
      description: "A project that encapsulates both hardware and software desktop application for data transfer and processing over long distances.",
      technologies: ["Python", "Flask", "C", "C++", "ESP32", "RF Communication"],
      link: "https://www.example.com",
      github: "https://github.com/example",
    },
    {
      title: "AI Warehouse Worker",
      description: "Neural Network that I have trained and placed inside an AI Agent, created a simulated warehouse environment for it to perform monotone tasks, avoid obstacles and people.",
      technologies: ["C#", "TensorFlow", "Unity", "ML Agents", "Neural Network"],
      link: "https://www.example.com",
      github: "https://github.com/example",
    },
  ];

  return (
    <section id="projects" className="min-h-screen flex flex-col justify-center items-center px-8 md:px-20 bg-slate-950 text-white">
      
      {/* Section Title */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold">🚀 My Projects</h1>
        <p className="mt-4 text-lg text-gray-300">
          A collection of projects showcasing my skills & experience.
        </p>
      </div>

      {/* 🔥 Tech Stack Icons Row */}
      <div className="flex flex-wrap justify-center gap-6 mb-10">
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
        {projectList.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </section>
  );
}


const TechIcon = ({ icon, label }) => (
  <div className="group flex flex-col items-center">
    <div className="p-2 bg-gray-500/40 rounded-lg transition-all duration-100 
                    group-hover:rounded-3xl group-hover:bg-slate-800 shadow-lg">
      <div className="text-3xl text-white transition-all duration-300 animate-float 
                      group-hover:text-slate-100">
        {icon}
      </div>
    </div>
    <span className="text-sm mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      {label}
    </span>
  </div>
);


const ProjectCard = ({ project }) => (
  <div className="relative bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-all transform hover:scale-105 hover:shadow-xl">
    
    {/* Project Content */}
    <div className="p-6">
      <h3 className="text-2xl font-bold text-white">{project.title}</h3>
      <p className="text-gray-400 mt-2">{project.description}</p>
      
      {/* 🛠️ Technologies Used */}
      <div className="mt-3 flex flex-wrap gap-2">
        {project.technologies.map((tech, i) => (
          <span key={i} className="px-2 py-1 bg-gray-700 text-sm rounded-md">{tech}</span>
        ))}
      </div>

      {/* 🔗 Buttons */}
      <div className="mt-4 flex gap-3">
        <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 flex items-center gap-1">
          Live Demo <FaReact />
        </a>
        <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white flex items-center gap-1">
          GitHub <FaGithub />
        </a>
      </div>
    </div>
  </div>
);