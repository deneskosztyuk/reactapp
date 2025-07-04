import { useState, useEffect } from "react";

import { FaReact,
  FaNodeJs,
  FaJava, 
  FaPython, 
  FaDatabase, 
  FaGlobe, 
  FaMobileAlt, 
  FaRobot } from "react-icons/fa";

import { SiTailwindcss, SiMongodb, SiPostgresql, SiSpring, SiTensorflow } from "react-icons/si";

import { GrMysql } from "react-icons/gr";




export default function Freelance() {
  const [staticStars, setStaticStars] = useState([]);

  // stars effect
  useEffect(() => {
    const starsArray = Array.from({ length: 200 }, (_, index) => ({
      id: `star-${index}`,
      size: Math.random() * 3 + 1,
      left: Math.random() * 100,
      top: Math.random() * 100,
      opacity: Math.random() * 0.3 + 0.3,
      animationDelay: `${Math.random() * 10}s`,
    }));
    setStaticStars(starsArray);
  }, []);

  return (
    <section id="freelance" className="h-screen flex flex-col justify-center items-center px-3 sm:px-5 md:px-6 lg:px-8 bg-slate-950 text-white relative overflow-hidden">
      {/* static starry background */}
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

      {/* intro section */}
      <div className="max-w-2xl sm:max-w-3xl text-center relative z-10">
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">👨‍💻 Hire Me for Freelance Projects</h1>
        <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-gray-400">
          Need a full-stack web application or a custom-built software solution? Let's bring your idea to life.
        </p>
      </div>

      {/* services offered */}
      <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 max-w-4xl text-center relative z-10">
        <ServiceCard icon={<FaGlobe />} title="Web Development" description="Fast, scalable & responsive web applications." />
        <ServiceCard icon={<FaRobot />} title="ML/AI Integration" description="Machine learning and modern AI integration into your existing or new projects." />
        <ServiceCard icon={<FaDatabase />} title="Backend Development" description="Scalable APIs & database-driven applications." />
      </div>

      {/* tech stack display */}
      <div className="mt-6 sm:mt-8 flex flex-wrap justify-center gap-3 sm:gap-4 relative z-10">
        <TechIcon icon={<FaJava />} label="Java" />
        <TechIcon icon={<SiSpring />} label="Spring Boot" />
        <TechIcon icon={<FaPython />} label="Python" />
        <TechIcon icon={<SiTensorflow />} label="TensorFlow" />
        <TechIcon icon={<FaReact />} label="React.js" />
        <TechIcon icon={<FaNodeJs />} label="Node.js" />
        <TechIcon icon={<SiPostgresql />} label="PostgreSQL" />
        <TechIcon icon={<GrMysql />} label="MySQL" />
        <TechIcon icon={<SiTailwindcss />} label="Tailwind CSS" />
      </div>

      {/* css anim */}
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

/* service card component */
const ServiceCard = ({ icon, title, description }) => (
  <div className="p-3 sm:p-4 bg-gray-800/50 rounded-lg shadow-lg flex flex-col items-center">
    <div className="text-2xl sm:text-3xl">{icon}</div>
    <h3 className="mt-2 sm:mt-3 text-base sm:text-lg font-bold">{title}</h3>
    <p className="text-gray-300 mt-1 sm:mt-2 text-xs sm:text-sm">{description}</p>
  </div>
);

/* tech icon component */
const TechIcon = ({ icon, label }) => (
  <div className="group flex flex-col items-center">
    <div className="p-1.5 sm:p-2 bg-gray-600/40 rounded-lg transition-all duration-200 group-hover:bg-gray-800">
      <div className="text-2xl sm:text-3xl text-white">{icon}</div>
    </div>
    <span className="text-xs mt-1 sm:mt-2 opacity-80">{label}</span>
  </div>
);
