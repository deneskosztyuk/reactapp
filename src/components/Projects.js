import { FaReact, FaNodeJs, FaJava, FaPython, FaGit, FaAws } from "react-icons/fa"; 
import { BiLogoPostgresql } from "react-icons/bi";
import { SiTailwindcss, SiMongodb, SiJavascript, SiSpring } from "react-icons/si";
import { GrMysql } from "react-icons/gr";

// ✅ Import Swiper Components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// ✅ Import Swiper Styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Projects() {
  return (
    <section className="h-screen flex flex-col justify-start items-center 
                bg-gradient-to-b from-purple-900 to-purple-700 text-white px-8 pt-20 relative">
      
      {/* 🔥 Tech Stack Icons Row */}
      <div className="flex space-x-8 mb-1">
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

      {/* Floating Animation in Tailwind */}
      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(3px); }
            100% { transform: translateY(0px); }
          }
          
          .animate-float {
            animation: float 3s ease-in-out infinite;
          }
        `}
      </style>

      {/* 🚀 Swiper Carousel for Projects */}
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        className="w-full max-w-3xl h-[350px] mt-30"
      >
        {/* 🛠️ Project Slides */}
        <SwiperSlide>
          <ProjectCard
            title="Placeholder Name"
            description="A modern personal portfolio website built with React, Tailwind, and Three.js."
            link="https://www.example.com"
          />
        </SwiperSlide>
        <SwiperSlide>
          <ProjectCard
            title="Placeholder Name"
            description="A full-stack e-commerce platform with React, Spring Boot, and PostgreSQL."
            link="https://www.example.com"
          />
        </SwiperSlide>
        <SwiperSlide>
          <ProjectCard
            title="Placeholder Name"
            description="A real-time chat application built using WebSockets, Node.js, and MongoDB."
            link="https://www.example.com"
          />
        </SwiperSlide>
      </Swiper>
    </section>
  );
}

/* ✅ Reusable Tech Icon Component */
const TechIcon = ({ icon, label }) => (
  <div className="group flex flex-col items-center">
    <div className="p-4 bg-gray-500/40 rounded-lg transition-all duration-100 
                    group-hover:rounded-3xl group-hover:bg-purple-700 shadow-lg">
      <div className="text-5xl text-white transition-all duration-300 animate-float 
                      group-hover:text-slate-800">
        {icon}
      </div>
    </div>
    <span className="text-sm mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      {label}
    </span>
  </div>
);

const ProjectCard = ({ title, description, link }) => (
  <div className="relative p-12 h-[350px] rounded-lg shadow-lg flex flex-col justify-end items-center text-center overflow-hidden">
    {/* Gradient Background with Blur */}
    <div className="absolute inset-0 bg-gradient-to-r from-slate-900 to-teal-700"></div>

    {/* Content */}
    <div className="relative z-10">
      {/* Text with Custom Text Shadow */}
      <h3 
        className="text-3xl font-bold h-[50px] text-white"
        style={{ textShadow: "3px 3px 8px rgba(0, 0, 0, 0.7)" }}
      >
        {title}
      </h3>
      <p className="text-gray-300 h-[50px] mt-2">{description}</p>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 px-4 py-2 self-end bg-purple-600 text-white rounded-xl transition-all hover:bg-purple-500"
      >
        View Project
      </a>
    </div>
  </div>
);