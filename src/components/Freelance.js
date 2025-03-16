import { useState, useEffect } from "react";
import { FaReact, FaNodeJs, FaJava, FaPython, FaDatabase, FaGlobe, FaMobileAlt } from "react-icons/fa";
import { SiTailwindcss, SiMongodb, SiPostgresql, SiSpring } from "react-icons/si";
import { GrMysql } from "react-icons/gr";

export default function Freelance() {
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

  return (
    <section id="freelance" className="h-screen flex flex-col justify-center items-center px-3 sm:px-6 md:px-8 lg:px-10 bg-slate-950 text-white relative overflow-hidden">
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

      {/* 🔥 Intro Section */}
      <div className="max-w-4xl text-center relative z-10">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">👨‍💻 Hire Me for Freelance Projects</h1>
        <p className="mt-4 text-sm sm:text-base text-gray-400">
          Need a full-stack web application or a custom-built software solution? Let's bring your idea to life.
        </p>
      </div>

      {/* 🛠️ Services Offered */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 max-w-5xl text-center relative z-10">
        <ServiceCard icon={<FaGlobe />} title="Web Development" description="Building fast, scalable & responsive web applications." />
        <ServiceCard icon={<FaMobileAlt />} title="Mobile App Development" description="React Native solutions for cross-platform apps." />
        <ServiceCard icon={<FaDatabase />} title="Backend Development" description="Scalable APIs & database-driven applications." />
      </div>

      {/* 💻 Tech Stack Display */}
      <div className="mt-10 flex flex-wrap justify-center gap-3 sm:gap-4 relative z-10">
        <TechIcon icon={<FaJava />} label="Java" />
        <TechIcon icon={<SiSpring />} label="Spring Boot" />
        <TechIcon icon={<FaReact />} label="React.js" />
        <TechIcon icon={<FaNodeJs />} label="Node.js" />
        <TechIcon icon={<SiPostgresql />} label="PostgreSQL" />
        <TechIcon icon={<GrMysql />} label="MySQL" />
        <TechIcon icon={<SiTailwindcss />} label="Tailwind CSS" />
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

/* Service Card Component */
const ServiceCard = ({ icon, title, description }) => (
  <div className="p-3 sm:p-4 bg-gray-800/50 rounded-lg shadow-lg flex flex-col items-center">
    <div className="text-3xl sm:text-4xl">{icon}</div>
    <h3 className="mt-3 text-lg sm:text-xl font-bold">{title}</h3>
    <p className="text-gray-300 mt-2 text-sm sm:text-base">{description}</p>
  </div>
);

/* Tech Icon Component */
const TechIcon = ({ icon, label }) => (
  <div className="group flex flex-col items-center">
    <div className="p-2 sm:p-3 bg-gray-600/40 rounded-lg transition-all duration-200 group-hover:bg-gray-800">
      <div className="text-3xl sm:text-4xl text-white">{icon}</div>
    </div>
    <span className="text-xs mt-1 sm:mt-2 opacity-80">{label}</span>
  </div>
);
