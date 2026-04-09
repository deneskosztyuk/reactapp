import React, { useEffect, useRef, useState } from "react";
import type { Position, Star } from "../types";

interface BackgroundLayoutProps {
  children: React.ReactNode;
}

const STAR_COUNT = 200;
const PARALLAX_MAX_OFFSET = 20;
const PARALLAX_SPEED = 0.05;
const INNER_CURSOR_SPEED = 0.2;
const OUTER_CURSOR_SPEED = 0.08;

const createStars = (): Star[] => {
  return Array.from({ length: STAR_COUNT }, (_, index) => ({
    id: index,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    opacity: Math.random() * 0.6 + 0.2,
    twinkleDelay: Math.random() * 5,
    twinkleDuration: Math.random() * 6 + 4,
    depth: Math.random() * 0.5 + 0.5,
  }));
};

const BackgroundLayout = ({ children }: BackgroundLayoutProps) => {
  const [stars, setStars] = useState<Star[]>(() => createStars());
  const [cursorVisible, setCursorVisible] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  const parallaxLayerRef = useRef<HTMLDivElement | null>(null);
  const innerCursorElementRef = useRef<HTMLDivElement | null>(null);
  const outerCursorElementRef = useRef<HTMLDivElement | null>(null);
  const mouseTargetRef = useRef<Position>({ x: 0, y: 0 });
  const innerCursorPositionRef = useRef<Position>({ x: 0, y: 0 });
  const outerCursorPositionRef = useRef<Position>({ x: 0, y: 0 });
  const parallaxOffsetRef = useRef<Position>({ x: 0, y: 0 });

  useEffect(() => {
    const checkIfDesktop = () => {
      const hasHover = window.matchMedia("(hover: hover)").matches;
      const hasPointer = window.matchMedia("(pointer: fine)").matches;
      const isLargeScreen = window.matchMedia("(min-width: 1024px)").matches;

      setIsDesktop(hasHover && hasPointer && isLargeScreen);
    };

    checkIfDesktop();

    const hoverQuery = window.matchMedia("(hover: hover)");
    const pointerQuery = window.matchMedia("(pointer: fine)");
    const screenQuery = window.matchMedia("(min-width: 1024px)");

    const handleChange = () => checkIfDesktop();

    hoverQuery.addEventListener("change", handleChange);
    pointerQuery.addEventListener("change", handleChange);
    screenQuery.addEventListener("change", handleChange);

    return () => {
      hoverQuery.removeEventListener("change", handleChange);
      pointerQuery.removeEventListener("change", handleChange);
      screenQuery.removeEventListener("change", handleChange);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => setStars(createStars());

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isDesktop) {
      setCursorVisible(false);
      mouseTargetRef.current = { x: 0, y: 0 };
      innerCursorPositionRef.current = { x: 0, y: 0 };
      outerCursorPositionRef.current = { x: 0, y: 0 };
      parallaxOffsetRef.current = { x: 0, y: 0 };

      if (parallaxLayerRef.current) {
        parallaxLayerRef.current.style.transform = "translate3d(0px, 0px, 0px)";
      }

      return;
    }

    const centerPosition = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    };

    mouseTargetRef.current = centerPosition;
    innerCursorPositionRef.current = centerPosition;
    outerCursorPositionRef.current = centerPosition;
  }, [isDesktop]);

  useEffect(() => {
    if (!isDesktop) return;

    const handleMouseMove = (event: MouseEvent) => {
      mouseTargetRef.current = { x: event.clientX, y: event.clientY };
      setCursorVisible(true);
    };

    const handleMouseLeave = () => {
      setCursorVisible(false);
    };

    const handleMouseEnter = (event: MouseEvent) => {
      mouseTargetRef.current = { x: event.clientX, y: event.clientY };
      setCursorVisible(true);
    };

    document.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isDesktop]);

  useEffect(() => {
    if (!isDesktop) return;

    let animationFrameId = 0;

    const animateScene = () => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      const offsetX = centerX === 0 ? 0 : (mouseTargetRef.current.x - centerX) / centerX;
      const offsetY = centerY === 0 ? 0 : (mouseTargetRef.current.y - centerY) / centerY;
      const targetX = -offsetX * PARALLAX_MAX_OFFSET;
      const targetY = -offsetY * PARALLAX_MAX_OFFSET;

      parallaxOffsetRef.current.x += (targetX - parallaxOffsetRef.current.x) * PARALLAX_SPEED;
      parallaxOffsetRef.current.y += (targetY - parallaxOffsetRef.current.y) * PARALLAX_SPEED;

      if (parallaxLayerRef.current) {
        parallaxLayerRef.current.style.transform = `translate3d(${parallaxOffsetRef.current.x}px, ${parallaxOffsetRef.current.y}px, 0)`;
      }

      innerCursorPositionRef.current.x +=
        (mouseTargetRef.current.x - innerCursorPositionRef.current.x) * INNER_CURSOR_SPEED;
      innerCursorPositionRef.current.y +=
        (mouseTargetRef.current.y - innerCursorPositionRef.current.y) * INNER_CURSOR_SPEED;

      if (innerCursorElementRef.current) {
        innerCursorElementRef.current.style.transform = `translate3d(${innerCursorPositionRef.current.x}px, ${innerCursorPositionRef.current.y}px, 0) translate(-50%, -50%)`;
      }

      outerCursorPositionRef.current.x +=
        (mouseTargetRef.current.x - outerCursorPositionRef.current.x) * OUTER_CURSOR_SPEED;
      outerCursorPositionRef.current.y +=
        (mouseTargetRef.current.y - outerCursorPositionRef.current.y) * OUTER_CURSOR_SPEED;

      if (outerCursorElementRef.current) {
        outerCursorElementRef.current.style.transform = `translate3d(${outerCursorPositionRef.current.x}px, ${outerCursorPositionRef.current.y}px, 0) translate(-50%, -50%)`;
      }

      animationFrameId = requestAnimationFrame(animateScene);
    };

    animationFrameId = requestAnimationFrame(animateScene);

    return () => {
      if (animationFrameId !== 0) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isDesktop]);

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
          z-index: 9998;
          mix-blend-mode: difference;
          will-change: transform, opacity;
        }

        .custom-cursor-inner {
          position: fixed;
          width: 8px;
          height: 8px;
          background: rgba(255, 255, 255, 0.9);
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
          box-shadow: 0 0 8px rgba(255, 255, 255, 0.5);
          will-change: transform, opacity;
        }
      `}</style>

      <div
        className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black relative"
        style={{
          overflowX: "hidden",
          maxWidth: "100vw",
          width: "100%",
          overflow: "hidden",
        }}
      >
        <div
          ref={parallaxLayerRef}
          className="absolute inset-0 pointer-events-none z-0 transition-transform duration-100 ease-out"
          style={{
            overflow: "hidden",
            willChange: isDesktop ? "transform" : undefined,
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
              }}
            />
          ))}
        </div>

        {isDesktop && (
          <>
            <div
              ref={outerCursorElementRef}
              className="custom-cursor-outer"
              style={{ opacity: cursorVisible ? 1 : 0 }}
            />

            <div
              ref={innerCursorElementRef}
              className="custom-cursor-inner"
              style={{ opacity: cursorVisible ? 1 : 0 }}
            />
          </>
        )}

        <div className="relative z-10" style={{ maxWidth: "100%", overflowX: "hidden" }}>
          {children}
        </div>
      </div>
    </>
  );
};

export default BackgroundLayout;