import React, { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { FaJava, FaPython, FaReact } from "react-icons/fa";
import { SiTypescript, SiNextdotjs } from "react-icons/si";
import { GiRobotAntennas } from "react-icons/gi";
import { IoMdCellular } from "react-icons/io";

const FADE_IN_DELAY = 100;
const SCROLL_DURATION = 600;

const PERSONAL_INFO = {
  firstName: "DENES",
  lastName: "KOSZTYUK",
  title: "QA, ROBOTICS & SOFTWARE ENGINEER.",
  location: "Stavanger, Norway / Remote",
  skills: [
    { name: "Java", icon: <FaJava /> },
    { name: "Python", icon: <FaPython /> },
    { name: "TypeScript", icon: <SiTypescript /> },
    { name: "React", icon: <FaReact /> },
    { name: "Next.js", icon: <SiNextdotjs /> },
    { name: "Robotics", icon: <GiRobotAntennas /> },
    { name: "IoT", icon: <IoMdCellular /> },
  ],
};

const HeroHeading = () => {
  const [showFirstName, setShowFirstName] = useState(false);
  const [showLastName, setShowLastName] = useState(false);
  const [showTitle, setShowTitle] = useState(false);

  useEffect(() => {
    const firstNameTimer = setTimeout(() => setShowFirstName(true), 200);
    const lastNameTimer = setTimeout(() => setShowLastName(true), 600);
    const titleTimer = setTimeout(() => setShowTitle(true), 1000);

    return () => {
      clearTimeout(firstNameTimer);
      clearTimeout(lastNameTimer);
      clearTimeout(titleTimer);
    };
  }, []);

  return (
    <div className="relative space-y-6 pt-20">
      <div className="relative">
        <h1 className="text-[clamp(2rem,10vw,8rem)] font-black leading-[0.9] tracking-tight">
          <span 
            className={`block text-white opacity-90 transition-all duration-700 ${
              showFirstName 
                ? 'opacity-90 translate-x-0 blur-0' 
                : 'opacity-0 -translate-x-12 blur-sm'
            }`}
          >
            {PERSONAL_INFO.firstName}
          </span>
          
          <span 
            className={`block bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-transparent bg-clip-text transition-all duration-700 ${
              showLastName 
                ? 'opacity-100 translate-x-0 blur-0' 
                : 'opacity-0 translate-x-12 blur-sm'
            }`}
          >
            {PERSONAL_INFO.lastName}
          </span>
        </h1>
        
        <div className="absolute top-1/2 right-0 w-32 h-32 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-full blur-3xl opacity-30 animate-pulse-glow"></div>
      </div>

      <h2 
        className={`text-sm sm:text-base md:text-lg lg:text-xl font-light text-gray-300 tracking-[0.2em] uppercase max-w-3xl mx-auto leading-relaxed transition-all duration-1000 ${
          showTitle 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-4'
        }`}
      >
        {PERSONAL_INFO.title}
      </h2>
    </div>
  );
};

const SkillsMarquee = () => {
  const [showMarquee, setShowMarquee] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowMarquee(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  const duplicatedSkills = [...PERSONAL_INFO.skills, ...PERSONAL_INFO.skills];

  return (
    <div 
      className={`w-full max-w-4xl mx-auto mt-12 transition-all duration-1000 ${
        showMarquee ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ overflow: 'hidden', maxWidth: '100%' }}
    >
      <div className="relative w-full" style={{ overflow: 'hidden' }}>
        {/* Gradient fade on edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-gray-900 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-gray-900 to-transparent z-10 pointer-events-none" />
        
        {/* Scrolling text with icons - contained properly */}
        <div className="flex" style={{ overflow: 'hidden' }}>
          <div className="flex animate-infinite-scroll" style={{ minWidth: 'max-content' }}>
            {duplicatedSkills.map((skill, index) => (
              <span
                key={`first-${index}`}
                className="inline-flex items-center gap-3 px-8 text-xl sm:text-2xl font-black text-white opacity-10 tracking-wide flex-shrink-0"
              >
                <span className="text-2xl sm:text-3xl">{skill.icon}</span>
                <span className="whitespace-nowrap">{skill.name}</span>
              </span>
            ))}
          </div>
          <div className="flex animate-infinite-scroll" aria-hidden="true" style={{ minWidth: 'max-content' }}>
            {duplicatedSkills.map((skill, index) => (
              <span
                key={`second-${index}`}
                className="inline-flex items-center gap-3 px-8 text-xl sm:text-2xl font-black text-white opacity-10 tracking-wide flex-shrink-0"
              >
                <span className="text-2xl sm:text-3xl">{skill.icon}</span>
                <span className="whitespace-nowrap">{skill.name}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const LocationBadge = () => {
  const [showLocation, setShowLocation] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowLocation(true), 1100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      className={`group inline-flex items-center gap-3 px-6 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg shadow-md transition-all duration-700 cursor-pointer hover:-translate-y-1 hover:shadow-cyan-500/20 hover:scale-105 ${
        showLocation 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-8'
      }`}
    >
      <span className="group-hover:animate-pulse text-xl">📍</span>
      <span className="text-sm text-gray-300">{PERSONAL_INFO.location}</span>
    </div>
  );
};

const ScrollIndicator = () => {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowScroll(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      className={`absolute bottom-8 left-1/2 -translate-x-1/2 transition-all duration-700 ${
        showScroll ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="w-6 h-10 border-2 border-cyan-500/30 rounded-full flex justify-center p-2 cursor-pointer hover:border-cyan-400 transition-colors animate-float-vertical">
        <div className="w-1 h-3 bg-cyan-400 rounded-full animate-bounce"></div>
      </div>
    </div>
  );
};

const CTAButton = () => {
  const [showCTA, setShowCTA] = useState(false);
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowCTA(true), 1800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 400);
    }, 3000);

    return () => clearInterval(glitchInterval);
  }, []);

  return (
    <Link
      to="contact"
      smooth={true}
      duration={SCROLL_DURATION}
      className={`group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-700 text-white font-medium text-base rounded-full hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-700 cursor-pointer transform hover:scale-105 relative overflow-hidden ${
        showCTA 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-8'
      } ${isGlitching ? 'animate-glitch' : ''}`}
    >
      <span className={isGlitching ? 'animate-glitch-text' : ''}>Let's collaborate</span>
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
};

const FloatingShapes = () => {
  const [showShapes, setShowShapes] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowShapes(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div 
        className={`absolute top-1/4 left-10 w-20 h-20 border border-cyan-500/20 rounded-lg rotate-45 animate-float transition-opacity duration-1000 ${
          showShapes ? 'opacity-100' : 'opacity-0'
        }`}
      />
      <div 
        className={`absolute bottom-1/3 right-20 w-16 h-16 bg-purple-600/10 rounded-full blur-xl animate-float-delayed transition-opacity duration-1000 delay-200 ${
          showShapes ? 'opacity-100' : 'opacity-0'
        }`}
      />
      <div 
        className={`absolute top-1/2 right-1/4 w-12 h-12 border-2 border-blue-500/20 rotate-12 animate-spin-slow transition-opacity duration-1000 delay-400 ${
          showShapes ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </>
  );
};

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
    <>
      <style>{`
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

        @keyframes pulse-glow {
          0%, 100% { 
            opacity: 0.3;
            transform: scale(1);
          }
          50% { 
            opacity: 0.5;
            transform: scale(1.1);
          }
        }

        @keyframes float-vertical {
          0%, 100% { transform: translate(-50%, 0); }
          50% { transform: translate(-50%, -10px); }
        }

        @keyframes infinite-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        @keyframes glitch {
          0% {
            transform: translate(0);
            filter: hue-rotate(0deg) brightness(1);
          }
          20% {
            transform: translate(-2px, 2px);
            filter: hue-rotate(0deg) brightness(1.2);
          }
          40% {
            transform: translate(2px, -2px);
            filter: hue-rotate(0deg) brightness(1.1);
          }
          60% {
            transform: translate(-1px, 1px);
            filter: hue-rotate(0deg) brightness(1.3);
          }
          80% {
            transform: translate(1px, -1px);
            filter: hue-rotate(0deg) brightness(1.1);
          }
          100% {
            transform: translate(0);
            filter: hue-rotate(0deg) brightness(1);
          }
        }

        @keyframes glitch-text {
          0%, 100% {
            text-shadow: 
              -2px 0 #ff006e,
              2px 0 #00f5ff,
              0 2px #39ff14,
              0 -2px #9d4edd;
            transform: translate(0);
          }
          20% {
            text-shadow: 
              2px 0 #ff006e,
              -2px 0 #00f5ff,
              -1px 2px #39ff14,
              1px -2px #9d4edd;
            transform: translate(-2px, 0);
          }
          40% {
            text-shadow: 
              -2px 0 #00f5ff,
              2px 0 #39ff14,
              1px -2px #ff006e,
              -1px 2px #9d4edd;
            transform: translate(2px, 0);
          }
          60% {
            text-shadow: 
              2px 0 #9d4edd,
              -2px 0 #ff006e,
              0 2px #00f5ff,
              0 -2px #39ff14;
            transform: translate(-1px, 0);
          }
          80% {
            text-shadow: 
              -1px 0 #39ff14,
              1px 0 #9d4edd,
              2px 1px #ff006e,
              -2px -1px #00f5ff;
            transform: translate(1px, 0);
          }
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

        .animate-pulse-glow {
          animation: pulse-glow 4s ease-in-out infinite;
        }

        .animate-float-vertical {
          animation: float-vertical 3s ease-in-out infinite;
        }

        .animate-infinite-scroll {
          animation: infinite-scroll 40s linear infinite;
        }

        .animate-infinite-scroll:hover {
          animation-play-state: paused;
        }

        .animate-glitch {
          animation: glitch 0.4s ease-in-out;
        }

        .animate-glitch-text {
          animation: glitch-text 0.4s ease-in-out;
        }

        /* CRITICAL: Prevent horizontal overflow */
        body {
          overflow-x: hidden;
        }

        #hero {
          overflow-x: hidden;
          max-width: 100vw;
        }
      `}</style>

      <section 
        id="hero"
        className="relative min-h-screen flex items-center justify-center px-6 sm:px-12 pb-32 overflow-x-hidden max-w-full"
      >
        <FloatingShapes />
        
        <div className={containerClass}>
          <div className="space-y-16">
            <HeroHeading />
            <LocationBadge />
            <SkillsMarquee />
            <div className="pt-8">
              <CTAButton />
            </div>
          </div>
        </div>

        <ScrollIndicator />
      </section>
    </>
  );
}
