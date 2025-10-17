// components/BackgroundLayout.jsx
import React, { useState, useEffect, useRef } from 'react';

const BackgroundLayout = ({ children }) => {
  const [stars, setStars] = useState([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [innerPos, setInnerPos] = useState({ x: 0, y: 0 });
  const [outerPos, setOuterPos] = useState({ x: 0, y: 0 });
  const [cursorVisible, setCursorVisible] = useState(false);
  
  const innerRef = useRef({ x: 0, y: 0 });
  const outerRef = useRef({ x: 0, y: 0 });

  // Generate static stars with gentle twinkling
  useEffect(() => {
    const generateStars = () => {
      const newStars = [];
      const numStars = 200;
      
      for (let i = 0; i < numStars; i++) {
        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.6 + 0.2,
          twinkleDelay: Math.random() * 5,
          twinkleDuration: Math.random() * 6 + 4,
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

  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      setCursorVisible(true);
    };

    const handleMouseLeave = () => {
      setCursorVisible(false);
    };

    const handleMouseEnter = () => {
      setCursorVisible(true);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  // Animate inner dot with lerp (fast)
  useEffect(() => {
    let animationFrameId;
    
    const animate = () => {
      const innerSpeed = 0.2; // Fast response (higher = faster)
      
      innerRef.current.x += (mousePos.x - innerRef.current.x) * innerSpeed;
      innerRef.current.y += (mousePos.y - innerRef.current.y) * innerSpeed;
      
      setInnerPos({
        x: innerRef.current.x,
        y: innerRef.current.y
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => cancelAnimationFrame(animationFrameId);
  }, [mousePos]);

  // Animate outer circle with lerp (slow)
  useEffect(() => {
    let animationFrameId;
    
    const animate = () => {
      const outerSpeed = 0.08; // Slow response (lower = slower)
      
      outerRef.current.x += (mousePos.x - outerRef.current.x) * outerSpeed;
      outerRef.current.y += (mousePos.y - outerRef.current.y) * outerSpeed;
      
      setOuterPos({
        x: outerRef.current.x,
        y: outerRef.current.y
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => cancelAnimationFrame(animationFrameId);
  }, [mousePos]);

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

      {/* Custom cursor followers */}
      {cursorVisible && (
        <>
          {/* Larger outer circle - slower */}
          <div
            className="custom-cursor-outer"
            style={{
              left: `${outerPos.x}px`,
              top: `${outerPos.y}px`,
            }}
          />
          
          {/* Smaller inner dot - faster */}
          <div
            className="custom-cursor-inner"
            style={{
              left: `${innerPos.x}px`,
              top: `${innerPos.y}px`,
            }}
          />
        </>
      )}

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

        /* Custom cursor followers */
        .custom-cursor-outer {
          position: fixed;
          width: 40px;
          height: 40px;
          border: 2px solid rgba(255, 255, 255, 0.4);
          border-radius: 50%;
          pointer-events: none;
          transform: translate(-50%, -50%);
          z-index: 9998;
          mix-blend-mode: difference;
        }

        .custom-cursor-inner {
          position: fixed;
          width: 8px;
          height: 8px;
          background: rgba(255, 255, 255, 0.9);
          border-radius: 50%;
          pointer-events: none;
          transform: translate(-50%, -50%);
          z-index: 9999;
          box-shadow: 0 0 8px rgba(255, 255, 255, 0.5);
        }
      `}</style>
    </div>
  );
};

export default BackgroundLayout;
