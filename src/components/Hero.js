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

const TypewriterText150 = ({ text }) => {
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
    }, 150);

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
    const interval = setInterval(() => {
      const newStar = {
        id: Math.random().toString(36).substr(2, 9),
        size: Math.random() * 3 + 1,
        left: Math.random() * 100,
        top: Math.random() * 100,
        duration: Math.random() * 8 + 4,
      };

      setStars((prevStars) => [...prevStars, newStar]);

      setTimeout(() => {
        setStars((prevStars) => prevStars.filter((star) => star.id !== newStar.id));
      }, newStar.duration * 1000);
    }, 250);

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

          {stars.map((star) => (
            <div
              key={star.id}
              className="absolute bg-white rounded-full"
              style={{
                width: `${star.size}px`,
                height: `${star.size}px`,
                top: `${star.top}%`,
                left: `${star.left}%`,
                animation: `fly-towards ${star.duration}s linear forwards`,
              }}
            />
          ))}

          <div className="flex flex-col md:flex-row mt-56 sm:mt-24 items-center justify-between w-full max-w-7xl mx-auto px-4 md:px-8">
            {/* Hero Text */}
            <div className="w-full md:w-1/2 text-center md:text-left fade-in-stage-1">
              <h1 className="text-2xl sm:text-3xl md:text-3xl font-bold text-white mb-4 fade-in-stage-2">
                Hi, I'm <TypewriterTextGrad100 text="Denes Kosztyuk" />
              </h1>
              <h2 className="text-lg sm:text-xl md:text-xl text-gray-300 mb-4 fade-in-stage-3">
                <TypewriterText150 text="Machine Learning | Fullstack | Backend"></TypewriterText150>
              </h2>
              <h3 className="text-xs sm:text-sm md:text-base text-gray-300 mb-4 fade-in-stage-3">
                📍Stavanger, Norway / Remote 👨‍💻
              </h3>

              <p className="text-sm sm:text-md md:text-sm text-white mb-6 leading-6 sm:leading-7 md:leading-8 fade-in-stage-4">
                {/* style={{textShadow: "0 2px 8px rgba(0,0,0,0.3)"}} */}
                Holding degrees in BEng Computer Systems and Robotics, and Applied Machine Learning, including 6 months of commercial backend work with Next.js, React, Python, FastAPI, PostgreSQL and AWS, and 2 years of Freelance experience - I am excited to bring my technical skills and passion for innovation to a new team. Let’s build something amazing together!
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
            opacity: 0;
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
