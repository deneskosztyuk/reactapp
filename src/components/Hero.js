import React, { useState, useEffect } from "react";
import { Link } from "react-scroll";

const TYPEWRITER_SPEED = 80;
const FADE_IN_DELAY = 100;
const SCROLL_DURATION = 600;

const GRADIENT_TEXT_CLASS = "bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-transparent bg-clip-text";
const DEFAULT_TEXT_CLASS = "text-gray-300";

const PERSONAL_INFO = {
  name: "Denes Kosztyuk",
  title: "Robotics | IoT | Embedded Systems | Backend & API",
  location: "Stavanger, Norway / Remote",
  description: "Computer Systems & Robotics Engineering graduate specializing in robotics and embedded systems. Professional experience through internship and in-depth experience with academic and personal projects.",
  skills: "Embedded C, Python, Java, JavaScript, KiCad, EasyEDA, Docker, Git/GitHub CI/CD, PostgreSQL. Two years freelance development experience."
};

const TypewriterText = ({ text, gradient = false }) => {
  const [displayText, setDisplayText] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= text.length) {
        setDisplayText(text.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
        setShowCursor(false);
      }
    }, TYPEWRITER_SPEED);

    return () => clearInterval(interval);
  }, [text]);

  const textClass = gradient ? GRADIENT_TEXT_CLASS : DEFAULT_TEXT_CLASS;

  return (
    <span className={textClass}>
      {displayText}
      {showCursor && <span className="blinking-cursor text-cyan-400">|</span>}
    </span>
  );
};

const HeroHeading = () => (
  <div className="space-y-6 sm:space-y-8">
    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-white leading-tight">
      Hei, I'm{" "}
      <span className="block mt-4 sm:mt-6">
        <TypewriterText text={PERSONAL_INFO.name} gradient={true} />
      </span>
    </h1>
    
    <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white font-light leading-relaxed max-w-3xl mx-auto">
      <TypewriterText text={PERSONAL_INFO.title} />
    </h2>
    
    <div className="flex items-center justify-center text-white text-base sm:text-lg mt-8">
      <span className="mr-2">📍</span>
      <span>{PERSONAL_INFO.location}</span>
      <span className="ml-4">👨‍💻</span>
    </div>
  </div>
);

const HeroDescription = () => (
  <div className="space-y-8 text-white leading-relaxed max-w-3xl mx-auto">
    <p className="text-lg sm:text-xl md:text-2xl leading-loose">
      {PERSONAL_INFO.description}
    </p>
    
    <p className="text-base sm:text-lg md:text-xl leading-loose">
      <span className="font-bold text-blue-500">Core Skills:</span> {PERSONAL_INFO.skills}
    </p>
  </div>
);

const HeroCTA = () => (
  <div className="pt-8 sm:pt-12">
    <p className="text-lg sm:text-xl text-gray-200 mb-8">
      Something caught your eye?
    </p>
    <Link
      to="contact"
      smooth={true}
      duration={SCROLL_DURATION}
      className="inline-flex items-center px-8 py-4 sm:px-10 sm:py-5 bg-gradient-to-r from-cyan-600 to-blue-700 text-white font-medium text-lg rounded-lg hover:from-cyan-700 hover:to-blue-800 transition-all duration-300 cursor-pointer shadow-lg shadow-cyan-500/25 hover:shadow-xl hover:shadow-cyan-500/30 transform hover:-translate-y-1"
    >
      <span>Let's have a chat</span>
    </Link>
  </div>
);

const ScrollIndicator = () => (
  <div className="flex justify-center mt-20 sm:mt-24 md:mt-28">
    <div className="animate-bounce">
      <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center">
        <div className="w-1 h-3 bg-cyan-400 rounded-full mt-2 animate-pulse"></div>
      </div>
    </div>
  </div>
);

const HeroStyles = () => (
  <style jsx>{`
    @keyframes blinking-cursor {
      0%, 50% { opacity: 1; }
      51%, 100% { opacity: 0; }
    }

    .blinking-cursor {
      animation: blinking-cursor 1s infinite;
    }

    html {
      scroll-behavior: smooth;
    }
  `}</style>
);

export default function Hero() {
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setFadeIn(true), FADE_IN_DELAY);
    return () => clearTimeout(timer);
  }, []);

  const containerClass = `w-full max-w-4xl mx-auto text-center transition-all duration-1000 ${
    fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
  }`;

  return (
    <section 
      id="hero"
      className="min-h-screen flex items-center justify-center pt-20 sm:pt-24 md:pt-28 px-4 sm:px-6 md:px-12 lg:px-20"
    >
      <div className={containerClass}>
        <div className="space-y-12 sm:space-y-16 md:space-y-20">
          <HeroHeading />
          <HeroDescription />
          <HeroCTA />
        </div>
        <ScrollIndicator />
      </div>
      <HeroStyles />
    </section>
  );
}
