import React, { useState, useEffect } from "react";
import { Link } from "react-scroll";

const FADE_IN_DELAY = 100;
const SCROLL_DURATION = 600;

const PERSONAL_INFO = {
  firstName: "DENES",
  lastName: "KOSZTYUK",
  title: "SOFTWARE ENGINEER, ROBOTICS & FULLSTACK DEVELOPER.",
  location: "Stavanger, Norway / Remote",
  skills: ["Java", "Python", "TypeScript", "React", "Next.js", "Robotics", "IoT"],
};

const HeroHeading = () => {
  const [showFirstName, setShowFirstName] = useState(false);
  const [showLastName, setShowLastName] = useState(false);

  useEffect(() => {
    // First name appears after 200ms
    const firstNameTimer = setTimeout(() => setShowFirstName(true), 200);
    // Last name appears 400ms after first name
    const lastNameTimer = setTimeout(() => setShowLastName(true), 600);

    return () => {
      clearTimeout(firstNameTimer);
      clearTimeout(lastNameTimer);
    };
  }, []);

  return (
    <div className="relative space-y-6 pt-20">
      {/* Massive name typography */}
      <div className="relative">
        <h1 className="text-[clamp(2rem,10vw,8rem)] font-black leading-[0.9] tracking-tight">
          {/* First Name - Slides in from left */}
          <span 
            className={`block text-white opacity-90 transition-all duration-700 ${
              showFirstName 
                ? 'opacity-90 translate-x-0' 
                : 'opacity-0 -translate-x-12'
            }`}
          >
            {PERSONAL_INFO.firstName}
          </span>
          
          {/* Last Name - Slides in from right */}
          <span 
            className={`block bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-transparent bg-clip-text transition-all duration-700 ${
              showLastName 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 translate-x-12'
            }`}
          >
            {PERSONAL_INFO.lastName}
          </span>
        </h1>
        
        {/* Floating orb decoration - space vibe */}
        <div className="absolute top-1/2 right-0 w-32 h-32 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-full blur-3xl opacity-30 animate-pulse"></div>
      </div>

      {/* Professional title */}
      <h2 className="text-sm sm:text-base md:text-lg lg:text-xl font-light text-gray-300 tracking-[0.2em] uppercase max-w-3xl mx-auto leading-relaxed">
        {PERSONAL_INFO.title}
      </h2>
    </div>
  );
};

const SkillsBadges = () => (
  <div className="flex flex-wrap justify-center gap-4 mt-12 max-w-2xl mx-auto">
    {PERSONAL_INFO.skills.map((skill, index) => (
      <span
        key={index}
        className="px-4 py-2 text-xs sm:text-sm font-medium text-cyan-300 border border-cyan-500/30 rounded-md bg-cyan-500/5 hover:bg-cyan-500/10 hover:border-cyan-500/50 transition-all duration-300 cursor-default select-none shadow-sm hover:shadow-md hover:shadow-cyan-500/10"
      >
        {skill}
      </span>
    ))}
  </div>
);

const LocationBadge = () => (
  <div className="group inline-flex items-center gap-3 px-6 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg shadow-md transition-all duration-300 cursor-pointer hover:-translate-y-1 hover:shadow-cyan-500/20">
    <span className="group-hover:animate-pulse">📍</span>
    <span className="text-sm text-gray-300">{PERSONAL_INFO.location}</span>
  </div>
);

const ScrollIndicator = () => (
  <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
    <div className="w-6 h-10 border-2 border-cyan-500/30 rounded-full flex justify-center p-2 cursor-pointer hover:border-cyan-400 transition-colors">
      <div className="w-1 h-3 bg-cyan-400 rounded-full animate-bounce"></div>
    </div>
  </div>
);

const CTAButton = () => (
  <Link
    to="contact"
    smooth={true}
    duration={SCROLL_DURATION}
    className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-700 text-white font-medium text-base rounded-full hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 cursor-pointer transform hover:scale-105"
  >
    <span>Let's collaborate</span>
    <svg 
      className="w-5 h-5 group-hover:translate-x-1 transition-transform" 
      fill="none" 
      viewBox="0 0 24 24" 
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  </Link>
);

const FloatingShapes = () => (
  <>
    {/* Geometric shapes for space aesthetic */}
    <div className="absolute top-1/4 left-10 w-20 h-20 border border-cyan-500/20 rounded-lg rotate-45 animate-float"></div>
    <div className="absolute bottom-1/3 right-20 w-16 h-16 bg-purple-600/10 rounded-full blur-xl animate-float-delayed"></div>
    <div className="absolute top-1/2 right-1/4 w-12 h-12 border-2 border-blue-500/20 rotate-12 animate-spin-slow"></div>
  </>
);

const HeroStyles = () => (
  <style jsx>{`
    @keyframes float {
      0%, 100% { transform: translateY(0px) rotate(45deg); }
      50% { transform: translateY(-20px) rotate(45deg); }
    }

    @keyframes float-delayed {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-30px); }
    }

    @keyframes spin-slow {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }

    .animate-float {
      animation: float 6s ease-in-out infinite;
    }

    .animate-float-delayed {
      animation: float-delayed 8s ease-in-out infinite;
    }

    .animate-spin-slow {
      animation: spin-slow 20s linear infinite;
    }
  `}</style>
);

export default function Hero() {
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setFadeIn(true), FADE_IN_DELAY);
    return () => clearTimeout(timer);
  }, []);

  const containerClass = `relative w-full max-w-7xl mx-auto text-center transition-all duration-1000 ${
    fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
  }`;

  return (
    <section 
      id="hero"
      className="relative min-h-screen flex items-center justify-center px-6 sm:px-12 pb-32 overflow-hidden"
    >
      <FloatingShapes />
      
      <div className={containerClass}>
        <div className="space-y-16">
          <HeroHeading />
          <LocationBadge />
          <SkillsBadges />
          <div className="pt-8">
            <CTAButton />
          </div>
        </div>
      </div>

      <ScrollIndicator />
      <HeroStyles />
    </section>
  );
}
