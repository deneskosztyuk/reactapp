import React, { useState, useEffect } from "react";

const FloatingAstronaut = () => {
  const [showAstronaut, setShowAstronaut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowAstronaut(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <style>{`
        /* Astronaut Floating Animation with 3D Transform */
        .astronaut-container {
          width: 25vh;
          height: 40vh;
          margin: 0 auto;
          perspective: 1000px;
        }

        @media (min-width: 768px) {
          .astronaut-container {
            width: 30vh;
            height: 50vh;
          }
        }

        .astronaut-wrapper {
          position: relative;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          animation: astronaut-float 6s ease-in-out infinite, astronaut-rotate 20s linear infinite;
        }

        .astronaut-image {
          width: 100%;
          height: 100%;
          object-fit: contain;
          filter: drop-shadow(0 10px 30px rgba(0, 229, 255, 0.3));
          position: relative;
          z-index: 2;
        }

        /* Holographic Overlay Effect - Clipped to Image Shape */
        .holographic-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            45deg,
            rgba(255, 0, 110, 0.15) 0%,
            rgba(0, 245, 255, 0.15) 25%,
            rgba(57, 255, 20, 0.15) 50%,
            rgba(157, 78, 221, 0.15) 75%,
            rgba(255, 0, 110, 0.15) 100%
          );
          background-size: 200% 200%;
          animation: holographic-shift 8s ease infinite;
          mix-blend-mode: screen;
          pointer-events: none;
          z-index: 3;
          -webkit-mask-image: url('/astronautimg.png');
          mask-image: url('/astronautimg.png');
          -webkit-mask-size: contain;
          mask-size: contain;
          -webkit-mask-repeat: no-repeat;
          mask-repeat: no-repeat;
          -webkit-mask-position: center;
          mask-position: center;
        }

        @keyframes astronaut-float {
          0%, 100% {
            transform: translateY(0px) translateZ(0px);
          }
          50% {
            transform: translateY(-30px) translateZ(20px);
          }
        }

        @keyframes astronaut-rotate {
          0% {
            transform: rotateY(0deg) rotateX(0deg);
          }
          25% {
            transform: rotateY(5deg) rotateX(2deg);
          }
          50% {
            transform: rotateY(0deg) rotateX(0deg);
          }
          75% {
            transform: rotateY(-5deg) rotateX(-2deg);
          }
          100% {
            transform: rotateY(0deg) rotateX(0deg);
          }
        }

        @keyframes holographic-shift {
          0% {
            background-position: 0% 50%;
            opacity: 0.4;
          }
          50% {
            background-position: 100% 50%;
            opacity: 0.7;
          }
          100% {
            background-position: 0% 50%;
            opacity: 0.4;
          }
        }
      `}</style>

      <div 
        className={`astronaut-container transition-all duration-1000 ${
          showAstronaut 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="astronaut-wrapper">
          <img 
            src="/astronautimg.png" 
            alt="Astronaut" 
            className="astronaut-image"
          />
          <div className="holographic-overlay"></div>
        </div>
      </div>
    </>
  );
};

export default FloatingAstronaut;
