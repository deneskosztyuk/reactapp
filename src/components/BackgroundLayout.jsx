import React, { useState, useEffect, useRef } from 'react';


const BackgroundLayout = ({ children }) => {
  const [stars, setStars] = useState([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [parallaxOffset, setParallaxOffset] = useState({ x: 0, y: 0 });
  const [innerPos, setInnerPos] = useState({ x: 0, y: 0 });
  const [outerPos, setOuterPos] = useState({ x: 0, y: 0 });
  const [cursorVisible, setCursorVisible] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  
  const innerRef = useRef({ x: 0, y: 0 });
  const outerRef = useRef({ x: 0, y: 0 });
  const parallaxRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const checkIfDesktop = () => {
      const hasHover = window.matchMedia('(hover: hover)').matches;
      const hasPointer = window.matchMedia('(pointer: fine)').matches;
      const isLargeScreen = window.matchMedia('(min-width: 1024px)').matches;
      
      setIsDesktop(hasHover && hasPointer && isLargeScreen);
    };

    checkIfDesktop();

    const hoverQuery = window.matchMedia('(hover: hover)');
    const pointerQuery = window.matchMedia('(pointer: fine)');
    const screenQuery = window.matchMedia('(min-width: 1024px)');

    const handleChange = () => checkIfDesktop();

    hoverQuery.addEventListener('change', handleChange);
    pointerQuery.addEventListener('change', handleChange);
    screenQuery.addEventListener('change', handleChange);

    return () => {
      hoverQuery.removeEventListener('change', handleChange);
      pointerQuery.removeEventListener('change', handleChange);
      screenQuery.removeEventListener('change', handleChange);
    };
  }, []);

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
          depth: Math.random() * 0.5 + 0.5,
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

  useEffect(() => {
    if (!isDesktop) return;

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
  }, [isDesktop]);

  useEffect(() => {
    if (!isDesktop) return;

    let animationFrameId;
    
    const animate = () => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      
      const offsetX = (mousePos.x - centerX) / centerX;
      const offsetY = (mousePos.y - centerY) / centerY;
      
      const parallaxSpeed = 0.05;
      const maxOffset = 20.0;
      
      const targetX = -offsetX * maxOffset;
      const targetY = -offsetY * maxOffset;
      
      parallaxRef.current.x += (targetX - parallaxRef.current.x) * parallaxSpeed;
      parallaxRef.current.y += (targetY - parallaxRef.current.y) * parallaxSpeed;
      
      setParallaxOffset({
        x: parallaxRef.current.x,
        y: parallaxRef.current.y
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => cancelAnimationFrame(animationFrameId);
  }, [mousePos, isDesktop]);

  useEffect(() => {
    if (!isDesktop) return;

    let animationFrameId;
    
    const animate = () => {
      const innerSpeed = 0.2;
      
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
  }, [mousePos, isDesktop]);

  useEffect(() => {
    if (!isDesktop) return;

    let animationFrameId;
    
    const animate = () => {
      const outerSpeed = 0.08;
      
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
  }, [mousePos, isDesktop]);

  return (
    <>
      <style>{`
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

      <div 
        className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black relative"
        style={{ 
          overflowX: 'hidden', 
          maxWidth: '100vw', 
          width: '100%',
          overflow: 'hidden'
        }}
      >
        <div 
          className="absolute inset-0 pointer-events-none z-0 transition-transform duration-100 ease-out"
          style={{
            transform: isDesktop ? `translate(${parallaxOffset.x}px, ${parallaxOffset.y}px)` : 'none',
            overflow: 'hidden'
          }}
        >
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
                transform: isDesktop ? `translate(${parallaxOffset.x * star.depth}px, ${parallaxOffset.y * star.depth}px)` : 'none'
              }}
            />
          ))}
        </div>

        {isDesktop && cursorVisible && (
          <>
            <div
              className="custom-cursor-outer"
              style={{
                left: `${outerPos.x}px`,
                top: `${outerPos.y}px`,
              }}
            />
            
            <div
              className="custom-cursor-inner"
              style={{
                left: `${innerPos.x}px`,
                top: `${innerPos.y}px`,
              }}
            />
          </>
        )}

        <div className="relative z-10" style={{ maxWidth: '100%', overflowX: 'hidden' }}>
          {children}
        </div>
      </div>
    </>
  );
};


export default BackgroundLayout;
