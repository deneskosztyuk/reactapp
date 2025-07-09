import React, { useState, useEffect } from "react";
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
    <span className="bg-gradient-to-r from-blue-600 via-purple-400 to-pink-600 text-transparent bg-clip-text">
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
  const [loading, setLoading] = useState(true);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
  // configuration constants for easy adjustment
  const STAR_CREATION_INTERVAL = 700; // increased from 250ms to reduce freq
  const STAR_CREATION_PROBABILITY = 0.7; // 40% chance to create a star
  const STAR_DURATION_MIN = 5; // minimum star lifetime in seconds
  const STAR_DURATION_MAX = 15; // maximum star lifetime in seconds
  const STAR_SIZE_MIN = 1;
  const STAR_SIZE_MAX = 4;

  // function to generate random numbers within a range
  const getRandomInRange = (min, max) => Math.random() * (max - min) + min;

  // function to generate unique star ID
  const generateStarId = () => Math.random().toString(36).substr(2, 9);

  // function to create a new star object
  const createStar = () => ({
    id: generateStarId(),
    size: getRandomInRange(STAR_SIZE_MIN, STAR_SIZE_MAX),
    left: Math.random() * 100, // Random position 0-100%
    top: Math.random() * 100,  // Random position 0-100%
    duration: getRandomInRange(STAR_DURATION_MIN, STAR_DURATION_MAX),
  });

  // function to remove star after its lifetime
  const scheduleStarRemoval = (starId, duration) => {
    setTimeout(() => {
      setStars((prevStars) => prevStars.filter((star) => star.id !== starId));
    }, duration * 1000);
  };

  // main star creation logic
  const handleStarCreation = () => {
    // only create star based on probability (reduces total count)
    if (Math.random() < STAR_CREATION_PROBABILITY) {
      const newStar = createStar();
      
      // add star to state
      setStars((prevStars) => [...prevStars, newStar]);
      
      // schedule its removal
      scheduleStarRemoval(newStar.id, newStar.duration);
    }
  };

  // Set up interval for star creation
  const interval = setInterval(handleStarCreation, STAR_CREATION_INTERVAL);

  // Cleanup function
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

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setFadeIn(true);
    }, 3000); 

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative h-screen flex flex-col md:flex-row items-center justify-center px-4 md:px-20 overflow-hidden">
      {loading ? (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-900">
          <div className="starfield-loader">
            {Array.from({ length: 50 }, (_, index) => (
              <div
                key={index}
                className="star"
                style={{
                  width: `${Math.random() * 2 + 1}px`,
                  height: `${Math.random() * 2 + 1}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${Math.random() * 3 + 2}s`,
                }}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className={`fade-in ${fadeIn ? "visible" : ""}`}>
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

          <div className="flex flex-col md:flex-row mt-80 sm:mt-24 items-center justify-between w-full max-w-7xl mx-auto px-4 md:px-8">
            {/* Hero Text */}
            <div className="w-full md:w-1/2 text-center md:text-left fade-in-stage-1">
              <h1 className="text-2xl sm:text-3xl md:text-3xl font-bold text-white mb-4 fade-in-stage-2">
                Hi, I'm <TypewriterTextGrad100 text="Denes Kosztyuk" />
              </h1>
              <h2 className="text-lg sm:text-xl md:text-xl text-gray-300 mb-4 fade-in-stage-3">
                <TypewriterText100 text="Backend & API | IoT | Embedded"></TypewriterText100>
              </h2>
              <h3 className="text-xs sm:text-sm md:text-base text-gray-300 mb-4 fade-in-stage-3">
                📍Stavanger, Norway / Remote 👨‍💻
              </h3>

              <p className="text-sm sm:text-md md:text-sm text-white mb-6 leading-6 sm:leading-7 md:leading-8 fade-in-stage-4">
                Computer Systems & Robotics Engineering graduate with hands-on experience in backend, full-stack, and embedded development gained through academic projects and a 4-month internship. 
                Proficient in embedded C, Python, KiCad, Docker, Git/GitHub CI/CD, and Supabase, complemented by 2 years of freelance development experience. 
              </p>
              <p className="text-sm sm:text-md md:text-sm text-white fade-in-stage-5">
                Got a project in mind? Connect with me! ✅
              </p>
            </div>

            {/* 3D Model */}
            <div className="w-full md:w-1/2 flex items-center justify-center mt-8 md:mt-0 fade-in-stage-6">
              <div className="w-[300px] sm:w-[400px] md:w-[500px] lg:w-[600px] xl:w-[700px] h-auto">
                <AstronautModel />
              </div>
            </div>
          </div>
        </div>
      )}

      <style>
        {`
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }

          .fade-in {
            opacity: 3;
            transition: opacity 1.5s ease-in-out;
          }

          .fade-in.visible {
            opacity: 1;
          }

        `}
      </style>
    </section>
  );
}
