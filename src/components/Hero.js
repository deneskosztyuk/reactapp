import React, { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { FaJava, FaPython, FaReact } from "react-icons/fa";
import { SiTypescript, SiNextdotjs, SiPostgresql, SiPostman, SiJira } from "react-icons/si";
import { TbDatabase, TbTerminal2 } from "react-icons/tb";
import { GiRobotAntennas } from "react-icons/gi";
import { IoMdCellular } from "react-icons/io";

const ANIMATION_TIMINGS = {
  fadeInDelay: 100,
  scrollDuration: 600,
  firstNameDelay: 400,
  lastNameDelay: 900,
  titleContainerDelay: 1400,
  initialAnimationDuration: 800,
  titleRotationInterval: 3500,
  marqueeDelay: 1600,
  locationDelay: 1500,
  scrollIndicatorDelay: 2500,
  ctaDelay: 2200,
  glitchInterval: 5000,
  glitchDuration: 300,
  shapesDelay: 700,
};

const EASING = {
  spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  smooth: 'cubic-bezier(0.16, 1, 0.3, 1)',
};

const PERSONAL_INFO = {
  firstName: "DENES",
  lastName: "KOSZTYUK",
  titles: ["FULLSTACK", "ROBOTICS", "SOFTWARE ENGINEER"],
  location: "Stavanger, Norway / Remote",
  skills: [
    { name: "Java", icon: <FaJava /> },
    { name: "Python", icon: <FaPython /> },
    { name: "TypeScript", icon: <SiTypescript /> },
    { name: "React", icon: <FaReact /> },
    { name: "Next.js", icon: <SiNextdotjs /> },
    { name: "Robotics", icon: <GiRobotAntennas /> },
    { name: "IoT", icon: <IoMdCellular /> },
    { name: "SQL", icon: <TbDatabase /> },
    { name: "PostgreSQL", icon: <SiPostgresql /> },
    { name: "Postman", icon: <SiPostman /> },
    { name: "PowerShell", icon: <TbTerminal2 /> },
    { name: "Jira", icon: <SiJira /> },
  ],
};

const useDelayedVisibility = (delay) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return isVisible;
};

const useTitleRotation = (titlesCount, interval, shouldStart) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!shouldStart) return;

    const rotationInterval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % titlesCount);
    }, interval);

    return () => clearInterval(rotationInterval);
  }, [shouldStart, titlesCount, interval]);

  return currentIndex;
};

const usePeriodicGlitch = (interval, duration) => {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), duration);
    }, interval);

    return () => clearInterval(glitchInterval);
  }, [interval, duration]);

  return isGlitching;
};

const splitTitleIntoCharacters = (title) => {
  return title.split('').map((char, index) => ({
    char: char === ' ' ? '\u00A0' : char,
    index
  }));
};

const AnimatedCharacter = ({ char, index, delay }) => (
  <span
    className="inline-block animate-char-slide-up"
    style={{
      animationDelay: `${index * delay}s`,
      animationFillMode: 'backwards'
    }}
  >
    {char}
  </span>
);

const NameText = ({ text, isVisible, direction = "left" }) => {
  const baseClasses = "block transition-all duration-1000 ease-out";
  const gradientClasses = direction === "right" 
    ? "bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-transparent bg-clip-text"
    : "text-white opacity-90";
  const translateClass = direction === "left" ? "-translate-x-12" : "translate-x-12";
  const visibilityClasses = isVisible
    ? `${direction === "right" ? "opacity-100" : "opacity-90"} translate-x-0 scale-100`
    : `opacity-0 ${translateClass} scale-95`;

  return (
    <span 
      className={`${baseClasses} ${gradientClasses} ${visibilityClasses}`}
      style={{ transitionTimingFunction: EASING.spring }}
    >
      {text}
    </span>
  );
};

const TitleDisplay = ({ title, titleIndex, isActive, isInitialLoad }) => {
  const characters = splitTitleIntoCharacters(title);
  const baseClasses = "absolute inset-x-0 text-xl sm:text-2xl md:text-3xl lg:text-4xl text-gray-300 tracking-[0.2em] uppercase max-w-3xl mx-auto leading-relaxed font-light flex justify-center";
  const visibilityClasses = !isInitialLoad && (isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8');

  return (
    <h2 
      key={titleIndex}
      className={`${baseClasses} ${visibilityClasses}`}
      style={{
        transition: isInitialLoad ? 'none' : 'opacity 0.3s ease-out, transform 0.6s ease-out',
      }}
    >
      {isInitialLoad ? (
        characters.map(({ char, index }) => (
          <AnimatedCharacter key={index} char={char} index={index} delay={0.05} />
        ))
      ) : (
        title
      )}
    </h2>
  );
};

const GlowOrb = () => (
  <div className="absolute top-1/2 right-0 w-28 h-28 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-full blur-3xl opacity-30 animate-pulse-glow" />
);

const HeroHeading = () => {
  const showFirstName = useDelayedVisibility(ANIMATION_TIMINGS.firstNameDelay);
  const showLastName = useDelayedVisibility(ANIMATION_TIMINGS.lastNameDelay);
  const showTitleContainer = useDelayedVisibility(ANIMATION_TIMINGS.titleContainerDelay);
  const hasPlayedInitialAnimation = useDelayedVisibility(ANIMATION_TIMINGS.initialAnimationDuration);
  const currentTitleIndex = useTitleRotation(
    PERSONAL_INFO.titles.length,
    ANIMATION_TIMINGS.titleRotationInterval,
    hasPlayedInitialAnimation
  );

  return (
    <div className="relative space-y-5 pt-16">
      <div className="relative">
        <h1 className="text-[clamp(3.20rem,12.0vw,8.5rem)] font-black leading-[0.9] tracking-tight sm:text-[clamp(1.6rem,8vw,6.5rem)]">
          <NameText text={PERSONAL_INFO.firstName} isVisible={showFirstName} direction="left" />
          <NameText text={PERSONAL_INFO.lastName} isVisible={showLastName} direction="right" />
        </h1>
        <GlowOrb />
      </div>

      <div className={`relative h-20 overflow-hidden mt-12 pt-6 transition-opacity duration-1000 ${
        showTitleContainer ? 'opacity-100' : 'opacity-0'
      }`}>
        {PERSONAL_INFO.titles.map((title, titleIndex) => (
          <TitleDisplay
            key={titleIndex}
            title={title}
            titleIndex={titleIndex}
            isActive={currentTitleIndex === titleIndex}
            isInitialLoad={!hasPlayedInitialAnimation && titleIndex === 0}
          />
        ))}
      </div>
    </div>
  );
};

const SkillBadge = ({ skill, keyPrefix }) => (
  <span className="inline-flex items-center gap-2.5 px-6 text-lg sm:text-xl font-black text-white opacity-10 tracking-wide flex-shrink-0 transition-opacity duration-300 hover:opacity-20">
    <span className="text-xl sm:text-2xl">{skill.icon}</span>
    <span className="whitespace-nowrap">{skill.name}</span>
  </span>
);

const MarqueeTrack = ({ skills, keyPrefix }) => (
  <div className="flex animate-infinite-scroll" style={{ minWidth: 'max-content' }} aria-hidden={keyPrefix === 'second'}>
    {skills.map((skill, index) => (
      <SkillBadge key={`${keyPrefix}-${index}`} skill={skill} keyPrefix={keyPrefix} />
    ))}
  </div>
);

const SkillsMarquee = () => {
  const showMarquee = useDelayedVisibility(ANIMATION_TIMINGS.marqueeDelay);
  const duplicatedSkills = [...PERSONAL_INFO.skills, ...PERSONAL_INFO.skills];

  const containerClasses = `w-full max-w-4xl mx-auto mt-12 transition-all duration-1200 ease-out ${
    showMarquee ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
  }`;

  const maskStyles = {
    overflow: 'hidden',
    maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
    WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)'
  };

  return (
    <div 
      className={containerClasses}
      style={{ 
        overflow: 'hidden', 
        maxWidth: '100%',
        transitionTimingFunction: EASING.smooth
      }}
    >
      <div className="relative w-full" style={{ overflow: 'hidden' }}>
        <div className="flex" style={maskStyles}>
          <MarqueeTrack skills={duplicatedSkills} keyPrefix="first" />
          <MarqueeTrack skills={duplicatedSkills} keyPrefix="second" />
        </div>
      </div>
    </div>
  );
};

const LocationBadge = () => {
  const showLocation = useDelayedVisibility(ANIMATION_TIMINGS.locationDelay);

  const badgeClasses = `group inline-flex items-center gap-2.5 px-5 py-2.5 bg-white/5 backdrop-blur-md border border-white/10 rounded-lg shadow-lg transition-all duration-700 cursor-pointer hover:bg-white/10 hover:border-cyan-500/30 hover:shadow-cyan-500/20 ${
    showLocation ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
  }`;

  return (
    <div className={badgeClasses} style={{ transitionTimingFunction: EASING.smooth }}>
      <span className="group-hover:scale-110 transition-transform duration-300 text-lg">📍</span>
      <span className="text-xs text-gray-300 font-medium">{PERSONAL_INFO.location}</span>
    </div>
  );
};

const ChevronIcon = ({ opacity }) => (
  <svg 
    className={`w-4 h-4 text-gray-400/${opacity} group-hover:text-cyan-400/${opacity + 20} transition-colors duration-300`}
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

const MouseIndicator = () => (
  <div className="relative w-6 h-10 border-2 border-gray-400/40 group-hover:border-cyan-400/60 rounded-full flex justify-center transition-all duration-300">
    <div className="absolute top-2 w-1 h-2 bg-cyan-400 rounded-full animate-scroll-bounce" />
  </div>
);

const ScrollIndicator = () => {
  const showScroll = useDelayedVisibility(ANIMATION_TIMINGS.scrollIndicatorDelay);

  const linkClasses = `absolute bottom-2 left-1/2 -translate-x-1/2 transition-all duration-1000 ease-out group ${
    showScroll ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
  }`;

  return (
    <Link
      to="contact"
      smooth={true}
      duration={ANIMATION_TIMINGS.scrollDuration}
      className={linkClasses}
      style={{ transitionTimingFunction: EASING.smooth }}
    >
      <div className="flex flex-col items-center gap-2 cursor-pointer">
        <MouseIndicator />
        <div className="flex flex-col -space-y-2 animate-chevron-bounce">
          <ChevronIcon opacity={60} />
          <ChevronIcon opacity={40} />
        </div>
      </div>
    </Link>
  );
};

const ArrowIcon = () => (
  <svg 
    className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
);

const CTAButton = () => {
  const showCTA = useDelayedVisibility(ANIMATION_TIMINGS.ctaDelay);
  const isGlitching = usePeriodicGlitch(ANIMATION_TIMINGS.glitchInterval, ANIMATION_TIMINGS.glitchDuration);

  const buttonClasses = `group inline-flex items-center gap-2.5 px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-700 text-white font-semibold text-sm rounded-full transition-all duration-500 cursor-pointer transform hover:scale-105 hover:-translate-y-1 relative overflow-hidden ${
    showCTA ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
  } ${isGlitching ? 'animate-glitch' : ''}`;

  return (
    <Link
      to="contact"
      smooth={true}
      duration={ANIMATION_TIMINGS.scrollDuration}
      className={buttonClasses}
      style={{ transitionTimingFunction: EASING.smooth }}
    >
      <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
      <span className={`relative z-10 ${isGlitching ? 'animate-glitch-text' : ''}`}>
        Send me a message.
      </span>
    </Link>
  );
};

const FloatingShape = ({ position, size, style, delay }) => {
  const showShapes = useDelayedVisibility(ANIMATION_TIMINGS.shapesDelay);

  const positionClasses = {
    'top-left': 'top-1/4 left-10',
    'bottom-right': 'bottom-1/3 right-20',
    'middle-right': 'top-1/2 right-1/4',
  };

  const sizeClasses = {
    large: 'w-16 h-16',
    medium: 'w-12 h-12',
    small: 'w-10 h-10',
  };

  const baseClasses = `absolute ${positionClasses[position]} ${sizeClasses[size]} transition-opacity duration-1200`;
  const visibilityClass = showShapes ? 'opacity-100' : 'opacity-0';
  const delayClass = delay ? `delay-${delay}` : '';

  return (
    <div className={`${baseClasses} ${visibilityClass} ${delayClass} ${style}`} />
  );
};

const FloatingShapes = () => (
  <>
    <FloatingShape 
      position="top-left" 
      size="large" 
      style="border border-cyan-500/20 rounded-lg rotate-45 animate-float" 
    />
    <FloatingShape 
      position="bottom-right" 
      size="medium" 
      style="bg-purple-600/10 rounded-full blur-xl animate-float-delayed" 
      delay="200"
    />
    <FloatingShape 
      position="middle-right" 
      size="small" 
      style="border-2 border-blue-500/20 rotate-12 animate-spin-slow" 
      delay="400"
    />
  </>
);

const AnimationStyles = () => (
  <style>{`
    @keyframes float {
      0%, 100% { transform: translateY(0px) rotate(45deg); }
      50% { transform: translateY(-20px) rotate(45deg); }
    }

    @keyframes float-delayed {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-30px); }
    }

    @keyframes spin-slow {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }

    @keyframes pulse-glow {
      0%, 100% { 
        opacity: 0.3;
        transform: scale(1);
      }
      50% { 
        opacity: 0.5;
        transform: scale(1.1);
      }
    }

    @keyframes infinite-scroll {
      from { transform: translateX(0); }
      to { transform: translateX(-50%); }
    }

    @keyframes glitch {
      0% {
        transform: translate(0) scale(1);
        filter: hue-rotate(0deg) brightness(1);
      }
      20% {
        transform: translate(-2px, 2px) scale(1.01);
        filter: hue-rotate(0deg) brightness(1.2);
      }
      40% {
        transform: translate(2px, -2px) scale(0.99);
        filter: hue-rotate(0deg) brightness(1.1);
      }
      60% {
        transform: translate(-1px, 1px) scale(1.01);
        filter: hue-rotate(0deg) brightness(1.3);
      }
      80% {
        transform: translate(1px, -1px) scale(0.99);
        filter: hue-rotate(0deg) brightness(1.1);
      }
      100% {
        transform: translate(0) scale(1);
        filter: hue-rotate(0deg) brightness(1);
      }
    }

    @keyframes glitch-text {
      0%, 100% {
        text-shadow: 
          -2px 0 rgba(255, 0, 110, 0.5),
          2px 0 rgba(0, 245, 255, 0.5);
        transform: translate(0);
      }
      25% {
        text-shadow: 
          2px 0 rgba(255, 0, 110, 0.5),
          -2px 0 rgba(0, 245, 255, 0.5);
        transform: translate(-2px, 0);
      }
      75% {
        text-shadow: 
          -2px 0 rgba(0, 245, 255, 0.5),
          2px 0 rgba(57, 255, 20, 0.5);
        transform: translate(2px, 0);
      }
    }

    @keyframes char-slide-up {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes scroll-bounce {
      0%, 100% {
        transform: translateY(0);
        opacity: 1;
      }
      50% {
        transform: translateY(12px);
        opacity: 0.3;
      }
    }

    @keyframes chevron-bounce {
      0%, 100% {
        transform: translateY(0);
        opacity: 1;
      }
      50% {
        transform: translateY(4px);
        opacity: 0.6;
      }
    }

    .animate-scroll-bounce {
      animation: scroll-bounce 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
    }

    .animate-chevron-bounce {
      animation: chevron-bounce 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
      animation-delay: 0.3s;
    }

    .animate-char-slide-up {
      animation: char-slide-up 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      display: inline-block;
    }

    .animate-float {
      animation: float 6s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite;
    }

    .animate-float-delayed {
      animation: float-delayed 8s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite;
    }

    .animate-spin-slow {
      animation: spin-slow 20s linear infinite;
    }

    .animate-pulse-glow {
      animation: pulse-glow 4s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite;
    }

    .animate-infinite-scroll {
      animation: infinite-scroll 40s linear infinite;
    }

    .animate-infinite-scroll:hover {
      animation-play-state: paused;
    }

    .animate-glitch {
      animation: glitch 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }

    .animate-glitch-text {
      animation: glitch-text 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }

    body {
      overflow-x: hidden;
    }

    #hero {
      overflow-x: hidden;
      max-width: 100vw;
    }

    * {
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
  `}</style>
);

const Hero = () => {
  const fadeIn = useDelayedVisibility(ANIMATION_TIMINGS.fadeInDelay);

  const containerClass = `relative w-full max-w-7xl mx-auto text-center transition-all duration-1200 ${
    fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
  }`;

  return (
    <>
      <AnimationStyles />
      <section 
        id="hero"
        className="relative min-h-screen flex items-center justify-center px-6 sm:px-12 pb-32 overflow-hidden max-w-full"
      >

        <FloatingShapes />
        <div className={containerClass}>
          <div className="space-y-12">
            <HeroHeading />
            <LocationBadge />
            <SkillsMarquee />
            <div className="pt-6">
              <CTAButton />
            </div>
          </div>
        </div>
        <ScrollIndicator />
      </section>
    </>
  );
};

export default Hero;
