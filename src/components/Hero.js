import { useState, useEffect } from "react";
import AstronautModel from "./AstronautModel";

export default function Hero() {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newStar = {
        id: Math.random().toString(36).substr(2, 9), // Unique ID
        size: Math.random() * 4 + 2, // Start small
        left: Math.random() * 100, // Random horizontal position
        top: Math.random() * 100, // Random vertical position
        duration: Math.random() * 8 + 4, // Speed varies (2s to 6s)
      };

      setStars((prevStars) => [...prevStars, newStar]);

      // Remove stars after they "pass" the viewer
      setTimeout(() => {
        setStars((prevStars) => prevStars.filter((star) => star.id !== newStar.id));
      }, newStar.duration * 1000);
    }, 300); // 

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen flex flex-col md:flex-row items-center justify-between px-10 md:px-20 overflow-hidden">
      {/* Animated Stars - Moving Toward Viewer */}
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

      {/* Left Side - Hero Text */}
      <div className="text-left max-w-2xl">
        <h1 className="text-4xl text-center md:text-4xl font-bold text-white">
          Hi, I'm{" "}
          <span className="bg-gradient-to-r from-blue-600 via-purple-400 to-pink-600 text-transparent bg-clip-text">
            Denes Kosztyuk
          </span>
        </h1>

        <h2 className="text-xl text-center md:text-1xl text-gray-300 mt-2">
          Software & Fullstack Developer
        </h2>
        <p className="text-md md:text-lg text-center text-gray-400 mt-4">
          With hands-on software development experience, including 1 year of commercial work with Java Spring, React, Node.js, and Python, I am excited to bring my technical skills and passion for innovation to a new team. Let’s build something amazing together!
        </p>
        <p className="text-md md:text-sm text-center text-gray-100 mt-3">
          Got a web project in mind? Hire me! ✅
        </p>
      </div>

      {/* Right Side - 3D Model */}
      <div className="w-1/2 h-full flex items-center justify-center">
        <div className="w-[500px] h-[500px]">
          <AstronautModel />
        </div>
      </div>

      {/* CSS Animation for Stars */}
      <style>
        {`
          @keyframes fly-towards {
            from { transform: scale(0.3) translateZ(0); opacity: 1; }
            to { transform: scale(4) translateY(50vh) translateX(50vw); opacity: 0; }
          }
        `}
      </style>
    </section>
  );
}
