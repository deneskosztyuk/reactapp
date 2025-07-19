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
    description: 'Completed extensive projects in IoT, embedded systems, and robotics during degree studies.',
    achievements: [
      'Built self-navigating robots, satellite simulation devices',
      'Designed and developed custom Neural Network for a robotic AI warehouse worker',
      'Designed, programmed and simulated a 3 link robotic arm to perform inverse and forward kinematics'
    ],
    technologies: ['C/C++', 'Unity', 'Java', 'Assembly','Python', 'OpenCV', 'FPGA', 'IoT', 'Embedded Systems', 'Robotics']
  }
];

const TECH_STACK = [
  { icon: <FaJava />, label: 'Java', category: 'backend' },
  { icon: <SiSpring />, label: 'Spring Boot', category: 'backend' },
  { icon: <FaPython />, label: 'Python', category: 'backend' },
  { icon: <SiFastapi />, label: 'FastAPI', category: 'backend' },
  { icon: <FaReact />, label: 'React.js', category: 'frontend' },
  { icon: <FaNodeJs />, label: 'Node.js', category: 'backend' },
  { icon: <SiPostgresql />, label: 'PostgreSQL', category: 'database' },
  { icon: <GrMysql />, label: 'MySQL', category: 'database' },
  { icon: <SiRedis />, label: 'Redis', category: 'database' },
  { icon: <SiTailwindcss />, label: 'Tailwind CSS', category: 'frontend' }
];

export default function WorkExperience() {
  const [staticStars, setStaticStars] = useState([]);

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
      {/* Animated starry background */}
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

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <header className="text-center mb-12 sm:mb-16">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
            💼 Work Experience
          </h1>
          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto">
            A journey through professional development, academic achievements, and hands-on project experience
          </p>
        </header>

        {/* Work Experience Cards */}
        <div className="mb-12 sm:mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
            {WORK_EXPERIENCES.map((experience) => (
              <WorkExperienceCard key={experience.id} experience={experience} />
            ))}
          </div>
        </div>
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
          animation: fadeInUp 0.6s ease-out;
        }

        @keyframes gradientGlow {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes smoothScale {
          0% {
            transform: scale(1);
          }
          100% {
            transform: scale(1.05);
          }
        }

        .work-experience-card {
          position: relative;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .work-experience-card::before {
          content: '';
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          border-radius: inherit;
          padding: 2px;
          background: linear-gradient(
            45deg,
            rgba(59, 130, 246, 0.8),
            rgba(147, 51, 234, 0.8),
            rgba(236, 72, 153, 0.8),
            rgba(59, 130, 246, 0.8)
          );
          background-size: 300% 300%;
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: exclude;
          -webkit-mask-composite: xor;
          opacity: 0;
          transition: opacity 0.4s ease-in-out;
          z-index: -1;
        }

        .work-experience-card:hover::before {
          opacity: 1;
          animation: gradientGlow 3s ease-in-out infinite;
        }

        .work-experience-card:hover {
          animation: smoothScale 0.4s ease-out forwards;
        }

        .work-experience-card:not(:hover) {
          animation: smoothScale 0.4s ease-out reverse;
        }
      `}</style>
    </section>
  );
}

// Enhanced Work Experience Card Component
const WorkExperienceCard = ({ experience }) => {
  const {
    title,
    company,
    period,
    location,
    type,
    icon,
    description,
    achievements,
    technologies
  } = experience;

  return (
    <article className="work-experience-card bg-gray-800/40 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-700/50 hover:bg-gray-800/60 animate-fade-in-up">
      {/* Card Header */}
      <header className="flex items-start gap-4 mb-4">
        <div className="flex-shrink-0 p-3 bg-blue-600/20 rounded-lg text-blue-400">
          <div className="text-2xl">{icon}</div>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg sm:text-xl font-bold text-white mb-1 line-clamp-2">
            {title}
          </h3>
          <p className="text-blue-300 font-medium mb-1">{company}</p>
          <div className="flex flex-wrap gap-2 text-sm text-gray-400">
            <span className="flex items-center gap-1">
              <FaCalendarAlt className="text-xs" />
              {period}
            </span>
            <span className="flex items-center gap-1">
              <FaMapMarkerAlt className="text-xs" />
              {location}
            </span>
            <span className="flex items-center gap-1">
              <FaBriefcase className="text-xs" />
              {type}
            </span>
          </div>
        </div>
      </header>

      {/* Description */}
      <p className="text-gray-300 text-sm mb-4 leading-relaxed">
        {description}
      </p>

      {/* Achievements */}
      <div className="mb-4">
        <h4 className="text-sm font-semibold text-white mb-2">Key Achievements:</h4>
        <ul className="space-y-1">
          {achievements.map((achievement, index) => (
            <li key={index} className="text-xs text-gray-300 flex items-start gap-2">
              <span className="text-green-400 mt-1 flex-shrink-0">•</span>
              <span>{achievement}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Technologies */}
      <div>
        <h4 className="text-sm font-semibold text-white mb-2">Technologies:</h4>
        <div className="flex flex-wrap gap-1">
          {technologies.map((tech, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-gray-700/50 rounded-md text-xs text-gray-300 border border-gray-600/50 transition-colors duration-200 hover:bg-gray-600/60"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
};

// Tech Icon Component
const TechIcon = ({ icon, label, category }) => (
  <div className="group flex flex-col items-center">
    <div className="p-3 bg-gray-700/40 rounded-xl transition-all duration-200 group-hover:bg-gray-600/60 group-hover:transform group-hover:scale-110">
      <div className="text-2xl sm:text-3xl text-white group-hover:text-blue-300 transition-colors">
        {icon}
      </div>
    </div>
    <span className="text-xs mt-2 opacity-80 text-center font-medium">
      {label}
    </span>
    <span className="text-xs opacity-60 capitalize text-gray-400">
      {category}
    </span>
  </div>
);
