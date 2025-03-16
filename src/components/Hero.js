import { useState, useEffect } from "react";
import AstronautModel from "./AstronautModel";

// ✅ TypewriterText Component (Unchanged)
const TypewriterText = ({ text }) => {
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
    <span className="bg-gradient-to-r from-blue-600 via-purple-400 to-pink-600 text-transparent bg-clip-text">
      {displayText}
      {showCursor && <span className="blinking-cursor">|</span>}
    </span>
  );
};

export default function Hero() {
  const [stars, setStars] = useState([]);
  const [staticStars, setStaticStars] = useState([]);

  // ✅ Generate moving stars
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

  // ✅ Generate static stars
  useEffect(() => {
    const starsArray = Array.from({ length: 150 }, (_, index) => ({
      id: `star-${index}`,
      size: Math.random() * 2 + 1,
      left: Math.random() * 100,
      top: Math.random() * 100,
      opacity: Math.random() * 0.5 + 0.5,
      animationDelay: `${Math.random() * 10}s`,
    }));
    setStaticStars(starsArray);
  }, []);

  return (
    <section className="relative h-screen flex flex-col md:flex-row items-center justify-center px-4 md:px-20 overflow-hidden">
      
      {/* ✅ Static Stars */}
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

      {/* ✅ Moving Stars */}
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

      {/* ✅ Left Side - Hero Text (Auto-Scaling) */}
      <div className="max-w-lg px-4 md:px-0 mt-72 sm:mt-48 md:mt-0 text-center md:text-left">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white relative">
          Hi, I'm{" "}
          <TypewriterText text="Denes Kosztyuk.." />
        </h1>
        <h2 className="text-lg sm:text-xl md:text-2xl text-gray-300 mt-2">
          Software & Fullstack Developer
        </h2>
        <p className="text-sm sm:text-md md:text-lg text-gray-400 mt-4 leading-6 sm:leading-7 md:leading-8">
          With hands-on software development experience, including 1 year of commercial work with Java Spring🍃, React⚛️, Node.js🟩, and Python🐍, I am excited to bring my technical skills and passion for innovation to a new team. Let’s build something amazing together!
        </p>
        <p className="text-sm sm:text-md md:text-lg text-gray-100 mt-3">
          Got a web project in mind? Hire me! ✅
        </p>
      </div>

      {/* ✅ Right Side - 3D Model (Scales Dynamically) */}
      <div className="w-full md:w-2/3 lg:w-1/2 flex items-center justify-center mt-6 md:mt-0">
        <div className="w-[350px] sm:w-[500px] md:w-[700px] lg:w-[1000px] xl:w-[1400px] h-auto">
          <AstronautModel />
        </div>
      </div>


      {/* ✅ CSS Animations */}
      <style>
        {`
          @keyframes fly-towards {
            from { transform: scale(0.3) translateZ(0); opacity: 1; }
            to { transform: scale(4) translateY(50vh) translateX(50vw); opacity: 0; }
          }

          @keyframes twinkle {
            0%, 100% { opacity: 0.5; }
            50% { opacity: 1; }
          }

          .animate-twinkle {
            animation: twinkle 2s infinite ease-in-out;
          }

          @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
          }

          .blinking-cursor {
            animation: blink 1s infinite;
          }
        `}
      </style>
    </section>
  );
}
