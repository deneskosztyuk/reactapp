// components/BackgroundLayout.jsx
import React, { useState, useEffect } from 'react';

const BackgroundLayout = ({ children }) => {
  const [stars, setStars] = useState([]);

  // Generate static stars with gentle twinkling
  useEffect(() => {
    const generateStars = () => {
      const newStars = [];
      const numStars = 200;
      
      for (let i = 0; i < numStars; i++) {
        newStars.push({
          id: i,
          x: Math.random() * 100, // Use percentage for responsiveness
          y: Math.random() * 100,
          size: Math.random() * 2 + 1, // 1-3px
          opacity: Math.random() * 0.6 + 0.2, // 0.2-0.8
          twinkleDelay: Math.random() * 5, // Stagger the twinkling
          twinkleDuration: Math.random() * 6 + 4, // 2-5s duration
        });
      }
      setStars(newStars);
    };

    generateStars();

    const handleResize = () => {
      generateStars();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black relative">
      {/* Subtle starry background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white animate-twinkle"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              animationDelay: `${star.twinkleDelay}s`,
              animationDuration: `${star.twinkleDuration}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>

      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { 
            opacity: 0.2;
            transform: scale(1);
          }
          50% { 
            opacity: 1;
            transform: scale(1.1);
          }
        }

        .animate-twinkle {
          animation: twinkle ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default BackgroundLayout;
