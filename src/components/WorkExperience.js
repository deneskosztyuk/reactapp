import React, { useEffect, useRef, useState } from "react";
import { 
  FaGlobe, 
  FaCog, 
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaBriefcase
} from "react-icons/fa";

const WORK_EXPERIENCES = [
  {
    id: 'freelance-projects',
    title: 'Software Freelance Contractor',
    company: 'Freelance Contractor',
    period: '2023 – Present',
    location: 'Remote',
    type: 'Contractor',
    icon: <FaGlobe />,
    description: 'Delivered custom web apps and software solutions for various clients.',
    achievements: [
      'Built web applications using Next.js, TypeScript, React, and PostgreSQL',
      'Provided services as a Python Backend Engineer to troubleshoot and refactor 12 API endpoints for HMRC (UK Tax Authority) client request validation for a SaaS startup',
      'Consulted on projects to identify and resolve performance bottlenecks',
      'Designed custom Discord bots for gaming and tech communities using discord.js'
    ],
    technologies: ['React', 'Node.js', 'Java', 'Spring Boot', 'Git', 'TypeScript', 'discord.js'],
    gradient: 'from-cyan-800 to-blue-950'
  },
  {
    id: 'jabil',
    title: 'Line Maintenance Engineer',
    company: 'Jabil Ltd.',
    period: '2014 – 2016',
    location: 'Ukraine',
    type: 'Full-time',
    icon: <FaCog />,
    description: 'Performed hardware maintenance and calibration at a PCB manufacturing plant.',
    achievements: [
      'Increased production line efficiency by 15% through optimized schedules',
      'Installed and calibrated >15 autonomous robotic machines',
      'Trained 8 new technicians on RoHS & safety compliance'
    ],
    technologies: ['PCB', 'Circuit Production', 'IoT', 'Embedded Systems', 'Robotics'],
    gradient: 'from-purple-800 to-pink-950'
  }
];

const SectionHeader = () => (
  <div className="space-y-6 mb-0 pb-12">
    {/* Section number indicator */}
    <div className="flex items-center justify-center gap-3 text-sm text-gray-400 tracking-widest">
      <span className="w-8 h-px bg-gray-600"></span>
      <span>02</span>
      <span className="font-light font-mono">// experience</span>
      <span className="w-8 h-px bg-gray-600"></span>
    </div>

    <h1 className="text-[clamp(2rem,8vw,4rem)] font-bold text-white tracking-tight">
      WORK{" "}
      <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-transparent bg-clip-text">
        EXPERIENCE
      </span>
    </h1>
    
    <p className="text-base sm:text-lg text-gray-400 leading-relaxed max-w-2xl mx-auto font-light">
      Professional roles and real-world achievements in software development and engineering.
    </p>
  </div>
);

const ExperienceIcon = ({ icon, isVisible }) => (
  <div 
    className={`flex-shrink-0 w-14 h-14 bg-white/10 flex items-center justify-center transition-all duration-700 ${
      isVisible 
        ? 'opacity-100 scale-100 rotate-0' 
        : 'opacity-0 scale-50 rotate-45'
    }`}
  >
    <span className="text-white text-2xl">
      {icon}
    </span>
  </div>
);

const MetaInfo = ({ period, location, type, isVisible }) => {
  const [showItems, setShowItems] = useState([]);

  useEffect(() => {
    if (isVisible) {
      [0, 1, 2].forEach((index) => {
        setTimeout(() => {
          setShowItems(prev => [...prev, index]);
        }, 300 + (index * 100));
      });
    }
  }, [isVisible]);

  const items = [
    { icon: <FaCalendarAlt className="w-3 h-3" />, text: period },
    { icon: <FaMapMarkerAlt className="w-3 h-3" />, text: location },
    { icon: <FaBriefcase className="w-3 h-3" />, text: type }
  ];

  return (
    <div className="flex flex-wrap items-center gap-3 text-sm text-white/70 mt-3 font-mono">
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && (
            <span 
              className={`text-white/40 transition-opacity duration-300 ${
                showItems.includes(index) ? 'opacity-100' : 'opacity-0'
              }`}
            >
              •
            </span>
          )}
          <span 
            className={`flex items-center gap-2 transition-all duration-500 ${
              showItems.includes(index) 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 -translate-x-4'
            }`}
          >
            {item.icon}
            <span>{item.text}</span>
          </span>
        </React.Fragment>
      ))}
    </div>
  );
};

const AchievementsList = ({ achievements, isVisible }) => {
  const [visibleAchievements, setVisibleAchievements] = useState([]);

  useEffect(() => {
    if (isVisible) {
      achievements.forEach((_, index) => {
        setTimeout(() => {
          setVisibleAchievements(prev => [...prev, index]);
        }, 600 + (index * 150));
      });
    }
  }, [isVisible, achievements]);

  return (
    <div className="mt-6">
      <h4 
        className={`text-white font-bold text-sm mb-3 tracking-wide uppercase transition-all duration-500 ${
          isVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-4'
        }`}
      >
        Key Achievements
      </h4>
      <ul className="space-y-3 text-white/80 text-sm leading-relaxed">
        {achievements.map((achievement, index) => (
          <li 
            key={index} 
            className={`flex items-start gap-3 transition-all duration-500 ${
              visibleAchievements.includes(index)
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 -translate-x-8'
            }`}
          >
            <span className="w-1.5 h-1.5 bg-white rounded-full mt-2 flex-shrink-0" />
            <span>{achievement}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const TechnologiesList = ({ technologies, isVisible }) => {
  const [visibleTech, setVisibleTech] = useState([]);

  useEffect(() => {
    if (isVisible) {
      technologies.forEach((_, index) => {
        setTimeout(() => {
          setVisibleTech(prev => [...prev, index]);
        }, 1200 + (index * 80));
      });
    }
  }, [isVisible, technologies]);

  return (
    <div className="mt-6">
      <h4 
        className={`text-white font-bold text-sm mb-3 tracking-wide uppercase transition-all duration-500 ${
          isVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-4'
        }`}
      >
        Technologies
      </h4>
      <div className="flex flex-wrap gap-2">
        {technologies.map((tech, index) => (
          <span
            key={index}
            className={`px-3 py-1.5 bg-white/10 text-white text-xs font-medium hover:bg-white/20 transition-all duration-300 cursor-default hover:scale-110 ${
              visibleTech.includes(index)
                ? 'opacity-100 scale-100'
                : 'opacity-0 scale-75'
            }`}
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
};

const ExperienceCard = ({ experience, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [descriptionVisible, setDescriptionVisible] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setTimeout(() => setHeaderVisible(true), 200);
          setTimeout(() => setDescriptionVisible(true), 400);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Alternate animation direction - left card slides from left, right card slides from right
  const animationClass = index % 2 === 0
    ? isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
    : isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12';

  return (
    <div 
      ref={cardRef}
      className={`bg-gradient-to-br ${experience.gradient} p-8 md:p-12 transition-all duration-700 hover:brightness-110 ${animationClass}`}
    >
      {/* Header */}
      <div className="flex items-start gap-6 mb-6">
        <ExperienceIcon icon={experience.icon} isVisible={headerVisible} />
        <div className="flex-1">
          <h3 
            className={`text-2xl md:text-3xl font-bold text-white mb-2 transition-all duration-700 ${
              headerVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-4'
            }`}
          >
            {experience.title}
          </h3>
          <p 
            className={`text-lg text-white/90 font-semibold transition-all duration-700 delay-100 ${
              headerVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-4'
            }`}
          >
            {experience.company}
          </p>
          <MetaInfo 
            period={experience.period} 
            location={experience.location} 
            type={experience.type}
            isVisible={headerVisible}
          />
        </div>
      </div>

      {/* Description */}
      <p 
        className={`text-white/90 text-base leading-relaxed mb-6 transition-all duration-700 ${
          descriptionVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-4'
        }`}
      >
        {experience.description}
      </p>

      {/* Achievements */}
      <AchievementsList achievements={experience.achievements} isVisible={descriptionVisible} />

      {/* Technologies */}
      <TechnologiesList technologies={experience.technologies} isVisible={descriptionVisible} />
    </div>
  );
};

const ExperiencesMosaic = ({ experiences }) => (
  <div className="grid grid-cols-1 lg:grid-cols-2">
    {experiences.map((experience, index) => (
      <ExperienceCard key={experience.id} experience={experience} index={index} />
    ))}
  </div>
);

const TimelineIndicator = () => (
  <div className="flex justify-center mt-16">
    <div className="w-px h-16 bg-gradient-to-b from-cyan-400/50 to-transparent"></div>
  </div>
);

export default function WorkExperience() {
  return (
    <section
      id="work-experience"
      className="min-h-screen py-20 sm:py-24"
    >
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 text-center mb-12">
        <SectionHeader />
      </div>
      
      {/* Full-width mosaic - no container padding */}
      <div className="w-full">
        <ExperiencesMosaic experiences={WORK_EXPERIENCES} />
      </div>
      
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-12">
        <TimelineIndicator />
      </div>
    </section>
  );
}
