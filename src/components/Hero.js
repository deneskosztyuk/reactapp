import React, { useState, useEffect } from "react";
import { Link } from "react-scroll";
import AstronautModel from "./AstronautModel";

const TypewriterTextGrad100 = ({ text }) => {
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
    }, 100);

    return () => clearInterval(interval);
  }, [text]);

  return (
    <span className="bg-gradient-to-r from-green-600 via-green-300 to-green-800 text-transparent bg-clip-text">
      {displayText}
      {showCursor && <span className="blinking-cursor">|</span>}
    </span>
  );
};

const TypewriterText100 = ({ text }) => {
  const [displayText, setDisplayText] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let currentIndex = 0;
    let text_speed = 100;

    const interval = setInterval(() => {
      if (currentIndex <= text.length) {
        setDisplayText(text.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
        setShowCursor(false);
      }
    }, text_speed);

    return () => clearInterval(interval);
  }, [text]);

  return (
    <span className="bg-white text-transparent bg-clip-text">
      {displayText}
      {showCursor && <span className="blinking-cursor">|</span>}
    </span>
  );
};

export default function Hero() {
  const [stars, setStars] = useState([]);
  const [staticStars, setStaticStars] = useState([]);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    const STAR_CREATION_INTERVAL = 700;
    const STAR_CREATION_PROBABILITY = 0.7;
    const STAR_DURATION_MIN = 5;
    const STAR_DURATION_MAX = 15;
    const STAR_SIZE_MIN = 1;
    const STAR_SIZE_MAX = 4;

    const getRandomInRange = (min, max) => Math.random() * (max - min) + min;
    const generateStarId = () => Math.random().toString(36).substr(2, 9);

    const createStar = () => ({
      id: generateStarId(),
      size: getRandomInRange(STAR_SIZE_MIN, STAR_SIZE_MAX),
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: getRandomInRange(STAR_DURATION_MIN, STAR_DURATION_MAX),
    });

    const scheduleStarRemoval = (starId, duration) => {
      setTimeout(() => {
        setStars((prevStars) => prevStars.filter((star) => star.id !== starId));
      }, duration * 1000);
    };

    const handleStarCreation = () => {
      if (Math.random() < STAR_CREATION_PROBABILITY) {
        const newStar = createStar();
        setStars((prevStars) => [...prevStars, newStar]);
        scheduleStarRemoval(newStar.id, newStar.duration);
      }
    };

    const interval = setInterval(handleStarCreation, STAR_CREATION_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const starsArray = Array.from({ length: 75 }, (_, index) => ({
      id: `star-${index}`,
      size: Math.random() * 2 + 1,
      left: Math.random() * 100,
      top: Math.random() * 100,
      opacity: Math.random() * 0.1 + 0.1,
      animationDelay: `${Math.random() * 10}s`,
    }));
    setStaticStars(starsArray);
  }, []);

  // Trigger fade-in effect immediately on component mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeIn(true);
    }, 100); 

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative h-screen flex flex-col md:flex-row items-center justify-center px-4 md:px-20 overflow-hidden bg-slate-950">
      <div className={`fade-in ${fadeIn ? "visible" : ""}`} style={{ pointerEvents: 'auto', userSelect: 'text' }}>
        {/* Stars Background - Lower z-index */}
        <div className="absolute inset-0" style={{ pointerEvents: 'none', zIndex: 1 }}>
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
                pointerEvents: 'none'
              }}
            />
          ))}
        </div>

        {/* Content - Higher z-index */}
        <div className="flex flex-col md:flex-row mt-80 sm:mt-24 items-center justify-between w-full max-w-7xl mx-auto px-4 md:px-8 relative" style={{ zIndex: 10 }}>
          {/* Hero Text */}
          <div className="w-full md:w-1/2 text-center md:text-left fade-in-stage-1" style={{ pointerEvents: 'auto', userSelect: 'text' }}>
            <h1 className="text-2xl sm:text-3xl md:text-3xl font-bold text-white mb-4 fade-in-stage-2" style={{ userSelect: 'text' }}>
              Hi, I'm <TypewriterTextGrad100 text="Denes Kosztyuk" />
            </h1>
            <h2 className="text-lg sm:text-xl md:text-xl text-gray-300 mb-4 fade-in-stage-3" style={{ userSelect: 'text' }}>
              <TypewriterText100 text="Backend & API | Robotics | IoT | Embedded Systems"></TypewriterText100>
            </h2>
            <h3 className="text-xs sm:text-sm md:text-base text-gray-300 mb-4 fade-in-stage-3" style={{ userSelect: 'text' }}>
              📍Stavanger, Norway / Remote 👨‍💻
            </h3>

            <p className="text-sm sm:text-md md:text-sm text-white mb-6 leading-6 sm:leading-7 md:leading-8 fade-in-stage-4" style={{ userSelect: 'text' }}>
              Computer Systems & Robotics Engineering graduate specializing in backend development and embedded systems. 
              Professional experience through internship and in-depth experience with academic and personal projects.
              Skilled in embedded C, Python, Java, JavaScript, KiCad, EasyEDA, Docker, Git/GitHub CI/CD, PostgreSQL. Two years freelance development experience. 
            </p>
            <p className="text-sm sm:text-md md:text-sm text-white fade-in-stage-5" style={{ userSelect: 'text' }}>
              Something caught your eye?{" "}
              <Link
                to="contact"
                smooth={true}
                duration={600}
                className="cursor-pointer text-blue-300 hover:text-purple-800 transition-all duration-200 inline-flex items-center gap-1 relative"
                style={{ 
                  pointerEvents: 'auto',
                  userSelect: 'none',
                  zIndex: 20
                }}
              >
                <span className="underline underline-offset-2 text-green-400 hover:underline-offset-4 transition-all duration-200">
                  Let's have a chat
                </span>
                <span className="ml-1">✅</span>
              </Link>
            </p>
          </div>

          {/* 3D Model */}
          <div className="w-full md:w-1/2 flex items-center justify-center mt-8 md:mt-0 fade-in-stage-6" style={{ zIndex: 5 }}>
            <div className="w-[300px] sm:w-[400px] md:w-[500px] lg:w-[600px] xl:w-[700px] h-auto">
              <AstronautModel />
            </div>
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }

          .fade-in {
            opacity: 0;
            transition: opacity 1.5s ease-in-out;
            pointer-events: auto !important;
            user-select: text !important;
          }

          .fade-in.visible {
            opacity: 1;
          }

          @keyframes twinkle {
            0%, 100% { 
              opacity: 0.3; 
              transform: scale(1);
            }
            50% { 
              opacity: 1; 
              transform: scale(1.1);
            }
          }

          .animate-twinkle {
            animation: twinkle 3s infinite ease-in-out;
          }

          /* Ensure text is selectable */
          * {
            user-select: text !important;
          }

          /* Ensure buttons are clickable */
          button {
            pointer-events: auto !important;
            user-select: none !important;
          }

          /* Ensure star background doesn't interfere */
          .star, .animate-twinkle {
            pointer-events: none !important;
          }
        `}
      </style>
    </section>
  );
}
