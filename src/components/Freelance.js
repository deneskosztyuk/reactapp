import { FaReact, FaNodeJs, FaJava, FaPython, FaDatabase, FaGlobe, FaMobileAlt } from "react-icons/fa";
import { SiTailwindcss, SiMongodb, SiPostgresql, SiSpring } from "react-icons/si";
import { GrMysql } from "react-icons/gr";

export default function Freelance() {
  return (
    <section id="freelance" className="h-screen flex flex-col justify-center items-center px-10 md:px-20 bg-slate-950 text-white">
      
      
      {/* 🔥 Intro Section */}
      <div className="max-w-4xl text-center">
        <h1 className="text-4xl md:text-5xl font-bold">👨‍💻 Hire Me for Freelance Projects</h1>
        <p className="mt-4 text-lg text-gray-400">
          Need a full-stack web application or a custom-built software solution? Let's bring your idea to life.
        </p>
      </div>

      {/* 🛠️ Services Offered */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl text-center">
        <ServiceCard icon={<FaGlobe />} title="Web Development" description="Building fast, scalable & responsive web applications." />
        <ServiceCard icon={<FaMobileAlt />} title="Mobile App Development" description="React Native solutions for cross-platform apps." />
        <ServiceCard icon={<FaDatabase />} title="Backend Development" description="Scalable APIs & database-driven applications." />
      </div>

      {/* 💻 Tech Stack Display */}
      <div className="mt-12 flex flex-wrap justify-center gap-6">
        <TechIcon icon={<FaJava />} label="Java" />
        <TechIcon icon={<SiSpring />} label="Spring Boot" />
        <TechIcon icon={<FaReact />} label="React.js" />
        <TechIcon icon={<FaNodeJs />} label="Node.js" />
        <TechIcon icon={<SiPostgresql />} label="PostgreSQL" />
        <TechIcon icon={<GrMysql />} label="MySQL" />
        <TechIcon icon={<SiTailwindcss />} label="Tailwind CSS" />
      </div>

      {/* 📩 Call to Action */}
      <div className="mt-10">
        <a href="#contact" className="px-6 py-3 bg-pink-500 hover:bg-pink-600 transition-all text-lg rounded-lg shadow-md">
          Contact Me 💬
        </a>
      </div>
    </section>
  );
}

/* Service Card Component */
const ServiceCard = ({ icon, title, description }) => (
  <div className="p-6 bg-gray-800/50 rounded-lg shadow-lg flex flex-col items-center">
    <div className="text-4xl">{icon}</div>
    <h3 className="mt-4 text-xl font-bold">{title}</h3>
    <p className="text-gray-300 mt-2">{description}</p>
  </div>
);

/* Tech Icon Component */
const TechIcon = ({ icon, label }) => (
  <div className="group flex flex-col items-center">
    <div className="p-3 bg-gray-600/40 rounded-lg transition-all duration-200 group-hover:bg-gray-800">
      <div className="text-4xl text-white">{icon}</div>
    </div>
    <span className="text-sm mt-2 opacity-80">{label}</span>
  </div>
);
