import { useState, useEffect } from "react";
import { 
  FaReact, 
  FaNodeJs, 
  FaJava, 
  FaPython, 
  FaDatabase, 
  FaGlobe, 
  FaRobot,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaBriefcase, 
  FaCog
} from "react-icons/fa";
import { 
  SiTailwindcss, 
  SiPostgresql, 
  SiSpring, 
  SiFastapi,
  SiRedis 
} from "react-icons/si";
import { GrMysql } from "react-icons/gr";

const WORK_EXPERIENCES = [
  {
    id: 'ucall-intern',
    title: 'Backend Developer Intern',
    company: 'Ucall Ltd',
    period: 'Nov 2023-Feb 2024',
    location: 'Remote',
    type: 'Part-time',
    icon: <FaDatabase />,
    componentType: 'capacitor',
    signalStrength: 85,
    voltage: '3.3V',
    description: 'Developed asynchronous processes and performance optimizations for a location-based B2B marketplace.',
    achievements: [
      'Implemented FastAPI background tasks for image management',
      'Enhanced performance with Redis caching strategies',
      'Increased productivity by 30% through comprehensive testing'
    ],
    technologies: ['Python', 'FastAPI', 'Redis', 'PostgreSQL', 'pytest']
  },
  {
    id: 'freelance-projects',
    title: 'Software Developer',
    company: 'Freelance Contractor',
    period: '2023 - Present',
    location: 'Remote',
    type: 'Contractor',
    icon: <FaGlobe />,
    componentType: 'microcontroller',
    signalStrength: 92,
    voltage: '5V',
    description: 'Delivered custom web applications and software solutions for various clients.',
    achievements: [
      'Built dynamic web applications with modern frameworks',
      'Implemented RESTful APIs and database integrations',
      'Deployed containerized applications on AWS',
      'Designed and developed custom Discord bots'
    ],
    technologies: ['React', 'Node.js', 'Java', 'Spring Boot', 'Docker', 'AWS', 'discord.py']
  },
  {
    id: 'jabil',
    title: 'Line Maintenance Engineer',
    company: 'Jabil Ltd.',
    period: '2014 - 2016',
    location: 'Ukraine',
    type: 'Fulltime',
    icon: <FaCog />,
    componentType: 'resistor',
    signalStrength: 78,
    voltage: '12V',
    description: 'Performed hardware maintenance and calibration at a PCB manufacturing factory',
    achievements: [
      'Increased production line efficiency by 15% through optimized equipment maintenance schedules',
      'Installed, setup, and calibrated over 15 autonomous robotic machinery, ensuring product quality and adherence to QA requirements',
      'Trained and guided 8 new line technicians in equipment setup, maintenance and compliance with RoHS and health and safety procedures'
    ],
    technologies: ['PCB', 'Circuit Production', 'IoT', 'Embedded Systems', 'Robotics', 'Electronics Engineering']
  },
  {
    id: 'academic-projects',
    title: 'Computer Systems & Robotics Engineer',
    company: 'University Projects',
    period: '2020 - 2024',
    location: 'UK',
    type: 'Academic',
    icon: <FaRobot />,
    componentType: 'inductor',
    signalStrength: 88,
    voltage: '3.3V',
    description: 'Completed extensive projects in IoT, embedded systems, and robotics during degree studies.',
    achievements: [
      'Built self-navigating robots, satellite simulation devices',
      'Designed and developed custom Neural Network for a robotic AI warehouse worker',
      'Designed, programmed and simulated a 3 link robotic arm to perform inverse and forward kinematics'
    ],
    technologies: ['C/C++', 'Unity', 'Java', 'Assembly','Python', 'OpenCV', 'FPGA', 'IoT', 'Embedded Systems', 'Robotics']
  }
];

export default function WorkExperience() {
  const [staticStars, setStaticStars] = useState([]);
  const [hoveredComponent, setHoveredComponent] = useState(null);

  useEffect(() => {
    const generateStars = () => {
      const starsArray = Array.from({ length: 150 }, (_, index) => ({
        id: `star-${index}`,
        size: Math.random() * 3 + 1,
        left: Math.random() * 100,
        top: Math.random() * 100,
        opacity: Math.random() * 0.4 + 0.2,
        animationDelay: `${Math.random() * 8}s`,
      }));
      setStaticStars(starsArray);
    };

    generateStars();
  }, []);

  return (
    <section 
      id="work-experience" 
      className="min-h-screen py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-slate-950 text-white relative overflow-hidden"
    >
      {/* Starry background */}
      <div className="absolute inset-0 z-0">
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

      {/* Circuit Board Container */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <CircuitBoardLayout 
          experiences={WORK_EXPERIENCES}
          hoveredComponent={hoveredComponent}
          setHoveredComponent={setHoveredComponent}
        />
      </div>

      {/* Enhanced CSS Animations */}
      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { 
            opacity: 0.3; 
            transform: scale(1);
          }
          50% { 
            opacity: 1; 
            transform: scale(1.1);
          }
        }

        .animate-twinkle {
          animation: twinkle 3s infinite ease-in-out;
        }

        @keyframes signalFlow {
          0% { 
            background-position: 0% 50%;
            opacity: 0.6;
          }
          100% { 
            background-position: 100% 50%;
            opacity: 1;
          }
        }

        .animate-signal-flow {
          animation: signalFlow 2s linear infinite;
        }

        @keyframes voltageGlow {
          0%, 100% { 
            box-shadow: 0 0 5px rgba(34, 197, 94, 0.4);
          }
          50% { 
            box-shadow: 0 0 20px rgba(34, 197, 94, 0.8), 0 0 30px rgba(34, 197, 94, 0.4);
          }
        }

        .animate-voltage-glow {
          animation: voltageGlow 1.5s ease-in-out infinite;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out;
        }
      `}</style>
    </section>
  );
}

// Main Circuit Board Layout Component
const CircuitBoardLayout = ({ experiences, hoveredComponent, setHoveredComponent }) => {
  return (
    <div className="relative">
      {/* PCB Background Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              radial-gradient(circle at 25px 25px, #22c55e 2px, transparent 2px),
              linear-gradient(#1f2937 2px, transparent 2px),
              linear-gradient(90deg, #1f2937 2px, transparent 2px)
            `,
            backgroundSize: '50px 50px, 50px 50px, 50px 50px'
          }}
        />
      </div>

      {/* Section Header */}
      <header className="text-center mb-12 relative z-10">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-mono font-bold mb-4 pt-2 md:pt-0 text-white">
          💼 Work Experience
        </h1>
        <p className="text-base sm:text-base text-white max-w-2xl mx-auto font-mono">
          A journey through professional development, academic achievements, and hands-on project experience.
        </p>
      </header>

      {/* Desktop Circuit Layout */}
      <div className="hidden xl:block">
        <DesktopCircuitLayout 
          experiences={experiences}
          hoveredComponent={hoveredComponent}
          setHoveredComponent={setHoveredComponent}
        />
      </div>

      {/* Tablet Circuit Layout - Centered */}
      <div className="hidden md:block xl:hidden">
        <TabletCircuitLayout 
          experiences={experiences}
          hoveredComponent={hoveredComponent}
          setHoveredComponent={setHoveredComponent}
        />
      </div>

      {/* Mobile Circuit Layout */}
      <div className="md:hidden">
        <MobileCircuitLayout 
          experiences={experiences}
          hoveredComponent={hoveredComponent}
          setHoveredComponent={setHoveredComponent}
        />
      </div>
    </div>
  );
};

// Desktop Circuit Board Layout
const DesktopCircuitLayout = ({ experiences, hoveredComponent, setHoveredComponent }) => {
  const containerHeight = 160 + (experiences.length - 1) * 180;
  const centerX = 400;

  return (
    <div className="relative w-full" style={{ minHeight: `${containerHeight}px` }}>
      {/* Circuit Traces */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <defs>
          <linearGradient id="signalGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#22c55e" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#16a34a" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#22c55e" stopOpacity="0.2" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Main vertical backbone trace */}
        <line 
          x1={centerX} 
          y1="80" 
          x2={centerX} 
          y2={containerHeight - 80}
          stroke="url(#signalGradient)" 
          strokeWidth="6" 
          filter="url(#glow)"
          className={hoveredComponent ? "animate-signal-flow" : ""}
          strokeDasharray={hoveredComponent ? "15,5" : "none"}
        />

        {/* Branch connections */}
        {experiences.map((_, index) => {
          const position = getComponentPosition(index, experiences.length, 'desktop');
          const isRight = index % 2 === 0;
          const branchLength = 120;
          
          return (
            <g key={index}>
              <line 
                x1={centerX} 
                y1={position.y} 
                x2={isRight ? centerX + branchLength : centerX - branchLength} 
                y2={position.y}
                stroke="url(#signalGradient)" 
                strokeWidth="4" 
                filter="url(#glow)"
                className={hoveredComponent === experiences[index].id ? "animate-signal-flow" : ""}
                strokeDasharray={hoveredComponent === experiences[index].id ? "10,3" : "none"}
              />
              
              <circle 
                cx={centerX} 
                cy={position.y} 
                r="4" 
                fill="#22c55e" 
                filter="url(#glow)"
                className={hoveredComponent === experiences[index].id ? "animate-pulse" : ""}
              />
              
              <circle 
                cx={position.x} 
                cy={position.y} 
                r="3" 
                fill="#16a34a" 
                opacity="0.8"
              />
            </g>
          );
        })}

        {/* Power symbols */}
        <g>
          <circle cx={centerX} cy="60" r="8" fill="none" stroke="#22c55e" strokeWidth="2" />
          <line x1={centerX} y1="52" x2={centerX} y2="68" stroke="#22c55e" strokeWidth="2" />
          <line x1={centerX - 4} y1="56" x2={centerX + 4} y2="56" stroke="#22c55e" strokeWidth="2" />
          
          <g transform={`translate(${centerX}, ${containerHeight - 40})`}>
            <line x1="0" y1="0" x2="0" y2="10" stroke="#22c55e" strokeWidth="2" />
            <line x1="-8" y1="10" x2="8" y2="10" stroke="#22c55e" strokeWidth="2" />
            <line x1="-6" y1="14" x2="6" y2="14" stroke="#22c55e" strokeWidth="2" />
            <line x1="-4" y1="18" x2="4" y2="18" stroke="#22c55e" strokeWidth="2" />
          </g>
        </g>
      </svg>

      {/* Electronic Components */}
      <div className="relative z-10">
        {experiences.map((exp, index) => (
          <ElectronicComponent
            key={exp.id}
            experience={exp}
            index={index}
            position={getComponentPosition(index, experiences.length, 'desktop')}
            isHovered={hoveredComponent === exp.id}
            onHover={() => setHoveredComponent(exp.id)}
            onLeave={() => setHoveredComponent(null)}
          />
        ))}
      </div>
    </div>
  );
};

// New Tablet Circuit Layout
const TabletCircuitLayout = ({ experiences, hoveredComponent, setHoveredComponent }) => {
  const containerHeight = 160 + (experiences.length - 1) * 180;
  
  return (
    <div className="relative w-full flex justify-center" style={{ minHeight: `${containerHeight}px` }}>
      <div className="relative w-full max-w-4xl">
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
          <defs>
            <linearGradient id="signalGradientTablet" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#22c55e" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#16a34a" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#22c55e" stopOpacity="0.2" />
            </linearGradient>
            <filter id="glowTablet">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Main vertical backbone trace - centered */}
          <line 
            x1="50%" 
            y1="80" 
            x2="50%" 
            y2={containerHeight - 80}
            stroke="url(#signalGradientTablet)" 
            strokeWidth="6" 
            filter="url(#glowTablet)"
            className={hoveredComponent ? "animate-signal-flow" : ""}
            strokeDasharray={hoveredComponent ? "15,5" : "none"}
          />

          {/* Branch connections */}
          {experiences.map((_, index) => {
            const position = getComponentPosition(index, experiences.length, 'tablet');
            const isRight = index % 2 === 0;
            const centerXPercent = 50;
            const branchLengthPercent = 15; // Percentage based branch length
            
            return (
              <g key={index}>
                <line 
                  x1="50%" 
                  y1={position.y} 
                  x2={isRight ? `${centerXPercent + branchLengthPercent}%` : `${centerXPercent - branchLengthPercent}%`} 
                  y2={position.y}
                  stroke="url(#signalGradientTablet)" 
                  strokeWidth="4" 
                  filter="url(#glowTablet)"
                  className={hoveredComponent === experiences[index].id ? "animate-signal-flow" : ""}
                  strokeDasharray={hoveredComponent === experiences[index].id ? "10,3" : "none"}
                />
                
                <circle 
                  cx="50%" 
                  cy={position.y} 
                  r="4" 
                  fill="#22c55e" 
                  filter="url(#glowTablet)"
                  className={hoveredComponent === experiences[index].id ? "animate-pulse" : ""}
                />
                
                <circle 
                  cx={`${isRight ? centerXPercent + branchLengthPercent : centerXPercent - branchLengthPercent}%`}
                  cy={position.y} 
                  r="3" 
                  fill="#16a34a" 
                  opacity="0.8"
                />
              </g>
            );
          })}

          {/* Power symbols - centered */}
          <g>
            <circle cx="50%" cy="60" r="8" fill="none" stroke="#22c55e" strokeWidth="2" />
            <line x1="50%" y1="52" x2="50%" y2="68" stroke="#22c55e" strokeWidth="2" />
            <line x1="calc(50% - 4px)" y1="56" x2="calc(50% + 4px)" y2="56" stroke="#22c55e" strokeWidth="2" />
            
            <g transform={`translate(50%, ${containerHeight - 40})`}>
              <line x1="0" y1="0" x2="0" y2="10" stroke="#22c55e" strokeWidth="2" />
              <line x1="-8" y1="10" x2="8" y2="10" stroke="#22c55e" strokeWidth="2" />
              <line x1="-6" y1="14" x2="6" y2="14" stroke="#22c55e" strokeWidth="2" />
              <line x1="-4" y1="18" x2="4" y2="18" stroke="#22c55e" strokeWidth="2" />
            </g>
          </g>
        </svg>

        {/* Electronic Components - Centered positioning */}
        <div className="relative z-10">
          {experiences.map((exp, index) => (
            <ElectronicComponent
              key={exp.id}
              experience={exp}
              index={index}
              position={getComponentPosition(index, experiences.length, 'tablet')}
              isHovered={hoveredComponent === exp.id}
              onHover={() => setHoveredComponent(exp.id)}
              onLeave={() => setHoveredComponent(null)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Mobile Circuit Layout
const MobileCircuitLayout = ({ experiences, hoveredComponent, setHoveredComponent }) => {
  return (
    <div className="space-y-12">
      {experiences.map((exp, index) => (
        <div key={exp.id} className="relative">
          <svg className="absolute -left-2 top-0 w-8 h-full pointer-events-none">
            <line 
              x1="16" 
              y1="0" 
              x2="16" 
              y2="100%" 
              stroke="#22c55e" 
              strokeWidth="3"
              className={hoveredComponent === exp.id ? "animate-signal-flow" : ""}
            />
            {index < experiences.length - 1 && (
              <circle cx="16" cy="90%" r="3" fill="#22c55e" opacity="0.8" />
            )}
          </svg>

          <MobileElectronicComponent
            experience={exp}
            index={index}
            isHovered={hoveredComponent === exp.id}
            onToggle={() => setHoveredComponent(
              hoveredComponent === exp.id ? null : exp.id
            )}
          />
        </div>
      ))}
    </div>
  );
};

// Electronic Component for Desktop/Tablet
const ElectronicComponent = ({ experience, index, position, isHovered, onHover, onLeave }) => {
  const ComponentSymbol = getComponentSymbol(experience.componentType);
  const isRight = index % 2 === 0;
  
  return (
    <div 
      className={`absolute transition-all duration-300 ${
        isHovered ? 'scale-110 z-20' : 'z-10'
      }`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: `translate(-50%, -50%) ${isHovered ? 'scale(1.1)' : ''}`
      }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <div className={`
        relative bg-gray-900 border-2 border-green-400 rounded-lg p-6 w-80
        ${isHovered ? 'animate-voltage-glow bg-gray-800' : ''}
        transition-all duration-300 cursor-pointer
      `}>
        <div className={`absolute -top-8 ${isRight ? 'right-4' : 'left-4'}`}>
          <ComponentSymbol isActive={isHovered} />
        </div>

        <div className={`absolute -top-6 ${isRight ? 'left-0' : 'right-0'} bg-green-400 text-black px-2 py-1 text-xs font-mono font-bold`}>
          {experience.componentType.toUpperCase()}{index + 1}
        </div>

        <div className={`absolute -top-8 ${isRight ? 'right-28' : 'left-24'} flex items-center space-x-2`}>
          <div className="text-xs font-mono text-green-400">{experience.voltage}</div>
          <SignalStrengthIndicator strength={experience.signalStrength} />
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="text-xl text-green-400">{experience.icon}</div>
            <div className="flex-1">
              <h3 className="font-mono font-bold text-green-100 text-sm">{experience.title}</h3>
              <p className="font-mono text-xs text-green-300">{experience.company}</p>
              <p className="font-mono text-xs text-green-400">{experience.period}</p>
            </div>
          </div>

          {isHovered && (
            <div className="animate-fade-in-up space-y-2 text-xs font-mono">
              <div className="text-green-200">{experience.description}</div>
              <div className="border-t border-green-600 pt-2">
                <div className="text-green-400 font-bold mb-1">RESPONSIBILITIES & OUTCOME:</div>
                <ul className="space-y-1">
                  {experience.achievements.slice(0, 2).map((achievement, idx) => (
                    <li key={idx} className="text-green-300 flex">
                      <span className="w-3">→</span>
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        <div className={`absolute -bottom-2 ${isRight ? 'right-8' : 'left-8'} flex space-x-2`}>
          {[1, 2, 3].map(pin => (
            <div 
              key={pin} 
              className={`w-3 h-4 bg-yellow-600 border border-yellow-500 ${
                isHovered ? 'animate-pulse' : ''
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Mobile Electronic Component
const MobileElectronicComponent = ({ experience, index, isHovered, onToggle }) => {
  const ComponentSymbol = getComponentSymbol(experience.componentType);

  return (
    <div 
      className={`ml-4 bg-gray-900 border-2 border-green-400 rounded-lg p-4 
                 ${isHovered ? 'animate-voltage-glow' : ''} transition-all duration-300`}
      onClick={onToggle}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <ComponentSymbol isActive={isHovered} size="sm" />
          <div>
            <div className="bg-green-400 text-black px-2 py-1 text-xs font-mono font-bold inline-block">
              {experience.componentType.toUpperCase()}{index + 1}
            </div>
          </div>
        </div>
        <SignalStrengthIndicator strength={experience.signalStrength} size="sm" />
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <div className="text-lg text-green-400">{experience.icon}</div>
          <div className="flex-1">
            <h3 className="font-mono font-bold text-green-100 text-sm">{experience.title}</h3>
            <p className="font-mono text-xs text-green-300">{experience.company}</p>
            <p className="font-mono text-xs text-green-400">{experience.period}</p>
          </div>
        </div>

        {isHovered && (
          <div className="animate-fade-in-up space-y-2 text-xs font-mono border-t border-green-600 pt-2">
            <div className="text-green-200">{experience.description}</div>
            <div>
              <div className="text-green-400 font-bold mb-1">RESPONSIBILITIES & OUTCOME:</div>
              <ul className="space-y-1">
                {experience.achievements.map((achievement, idx) => (
                  <li key={idx} className="text-green-300 flex">
                    <span className="w-3">→</span>
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="text-green-400 font-bold mb-1">TOOLS:</div>
              <div className="flex flex-wrap gap-1">
                {experience.technologies.map(tech => (
                  <span 
                    key={tech} 
                    className="px-2 py-1 bg-green-900 text-green-200 text-xs border border-green-600"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Signal Strength Indicator Component
const SignalStrengthIndicator = ({ strength, size = "md" }) => {
  const bars = 5;
  const filledBars = Math.ceil((strength / 100) * bars);
  const barHeight = size === "sm" ? "h-2" : "h-3";
  const barWidth = size === "sm" ? "w-1" : "w-1.5";

  return (
    <div className="flex items-end space-x-0.5">
      {Array.from({ length: bars }, (_, i) => (
        <div
          key={i}
          className={`${barWidth} ${barHeight} ${
            i < filledBars ? 'bg-green-400' : 'bg-gray-600'
          } ${i < filledBars ? 'animate-pulse' : ''}`}
          style={{ height: `${(i + 1) * (size === "sm" ? 4 : 6)}px` }}
        />
      ))}
    </div>
  );
};

// Component Symbol Generators
const getComponentSymbol = (type) => {
  const symbols = {
    resistor: ({ isActive, size = "md" }) => (
      <div className={`flex items-center ${size === "sm" ? "w-8 h-4" : "w-12 h-6"}`}>
        <div className={`w-full h-full border-2 ${isActive ? 'border-yellow-400' : 'border-green-400'} 
                        relative flex items-center justify-center bg-gray-800`}>
          <div className={`w-3/4 h-0.5 ${isActive ? 'bg-yellow-400' : 'bg-green-400'}`}></div>
          <div className="absolute left-0 w-full h-full flex justify-between items-center">
            {[...Array(4)].map((_, i) => (
              <div key={i} className={`w-0.5 h-2 ${isActive ? 'bg-yellow-400' : 'bg-green-400'}`}></div>
            ))}
          </div>
        </div>
      </div>
    ),
    capacitor: ({ isActive, size = "md" }) => (
      <div className={`flex items-center ${size === "sm" ? "w-6 h-6" : "w-8 h-8"}`}>
        <div className={`w-1 h-full ${isActive ? 'bg-yellow-400' : 'bg-green-400'} rounded-l`}></div>
        <div className="w-1"></div>
        <div className={`w-1 h-full ${isActive ? 'bg-yellow-400' : 'bg-green-400'} rounded-r`}></div>
      </div>
    ),
    microcontroller: ({ isActive, size = "md" }) => (
      <div className={`${size === "sm" ? "w-8 h-6" : "w-12 h-8"} border-2 ${isActive ? 'border-yellow-400' : 'border-green-400'} 
                      bg-gray-800 relative`}>
        <div className="absolute inset-1 grid grid-cols-3 gap-0.5">
          {[...Array(6)].map((_, i) => (
            <div key={i} className={`w-1 h-1 ${isActive ? 'bg-yellow-400' : 'bg-green-400'} rounded`}></div>
          ))}
        </div>
      </div>
    ),
    inductor: ({ isActive, size = "md" }) => (
      <div className={`flex items-center ${size === "sm" ? "w-8 h-4" : "w-12 h-6"}`}>
        {[...Array(4)].map((_, i) => (
          <div key={i} className={`w-2 h-4 border-t-2 border-l-2 border-r-2 ${
            isActive ? 'border-yellow-400' : 'border-green-400'
          } rounded-t-full -ml-0.5 first:ml-0`}></div>
        ))}
      </div>
    )
  };
  
  return symbols[type] || symbols.resistor;
};

const getComponentPosition = (index, total, viewport = 'desktop') => {
  const spacing = 140;
  const startY = 130;
  const branchDistance = viewport === 'tablet' ? 200 : 200; 
  
  let centerX;
  if (viewport === 'tablet') {
    
    centerX = 430; 
  } else {
    
    centerX = 630;
  }
  
  const isRight = index % 2 === 0;
  
  return {
    x: isRight ? centerX + branchDistance : centerX - branchDistance,
    y: startY + (index * spacing)
  };
};
