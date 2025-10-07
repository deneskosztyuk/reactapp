import React, { useState } from "react";
import { 
  FaDatabase, 
  FaGlobe, 
  FaCog, 
  FaRobot,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaBriefcase,
  FaChevronDown,
  FaChevronUp
} from "react-icons/fa";

const TRANSITION_DURATION = 500;
const GRADIENT_TEXT_CLASS = "bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-transparent bg-clip-text";

const WORK_EXPERIENCES = [
  {
    id: 'ucall-intern',
    title: 'Backend Developer Intern',
    company: 'Ucall Ltd',
    period: 'Nov 2023 – Feb 2024',
    location: 'Remote',
    type: 'Part-time',
    icon: <FaDatabase />,
    description: 'Developed asynchronous processes and performance optimizations for a location-based B2B marketplace.',
    achievements: [
      'Implemented FastAPI background tasks for image management',
      'Enhanced performance with code reviews and refactoring using clean code practices',
      'Increased productivity by 30% through comprehensive testing'
    ],
    technologies: ['Python', 'FastAPI', 'Redis', 'PostgreSQL', 'pytest']
  },
  {
    id: 'freelance-projects',
    title: 'Software Developer Contractor / Programming Tutor',
    company: 'Freelance Contractor',
    period: '2023 – Present',
    location: 'Remote',
    type: 'Contractor',
    icon: <FaGlobe />,
    description: 'Delivered custom web apps and software solutions for various clients.',
    achievements: [
      'Built dynamic web applications with modern frameworks - Next.js, React',
      'Implemented RESTful APIs and database integrations using Java Spring, FastAPI',
      'Provided 1:1 tutoring in Python, Java, and embedded C programming for students and hobbyists',
      'Consulted on projects to identify improvements and resolve performance bottlenecks'
    ],
    technologies: ['React', 'Node.js', 'Java', 'Spring Boot', 'Docker', 'AWS', 'discord.py']
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
    technologies: ['PCB', 'Circuit Production', 'IoT', 'Embedded Systems', 'Robotics']
  }
];

const useExpansion = () => {
  const [expandedId, setExpandedId] = useState(null);
  
  const toggle = (id) => setExpandedId(expandedId === id ? null : id);
  const isExpanded = (id) => expandedId === id;
  
  return { toggle, isExpanded };
};

const SectionHeader = () => (
  <div className="space-y-6 sm:space-y-8 mb-16">
    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white">
      Work{" "}
      <span className={GRADIENT_TEXT_CLASS}>
        Experience
      </span>
    </h1>
    <p className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
      A journey through professional roles, academic projects, and real-world achievements.
    </p>
  </div>
);

const ExperienceIcon = ({ icon }) => (
  <div className="flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/25 transition-all duration-300">
    <span className="text-white text-xl sm:text-2xl">
      {icon}
    </span>
  </div>
);

const MetaInfo = ({ period, location, type }) => (
  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mt-1">
    <span className="flex items-center space-x-1">
      <FaCalendarAlt className="w-3 h-3" />
      <span>{period}</span>
    </span>
    <span className="flex items-center space-x-1">
      <FaMapMarkerAlt className="w-3 h-3" />
      <span>{location}</span>
    </span>
    <span className="flex items-center space-x-1">
      <FaBriefcase className="w-3 h-3" />
      <span>{type}</span>
    </span>
  </div>
);

const ExpandButton = ({ isExpanded }) => (
  <button className="flex-shrink-0 ml-4 text-gray-400 hover:text-cyan-400 transition-colors duration-300">
    {isExpanded ? (
      <FaChevronUp className="w-5 h-5" />
    ) : (
      <FaChevronDown className="w-5 h-5" />
    )}
  </button>
);

const AchievementsList = ({ achievements }) => (
  <div>
    <h4 className="text-white font-medium mb-2">
      Key Achievements:
    </h4>
    <ul className="space-y-2 text-gray-300">
      {achievements.map((achievement, index) => (
        <li key={index} className="flex items-start space-x-2">
          <span className="w-2 h-2 bg-cyan-400 rounded-full mt-1" />
          <span>{achievement}</span>
        </li>
      ))}
    </ul>
  </div>
);

const TechnologiesList = ({ technologies }) => (
  <div>
    <h4 className="text-white font-medium mb-2">
      Technologies:
    </h4>
    <div className="flex flex-wrap gap-2">
      {technologies.map((tech, index) => (
        <span
          key={index}
          className="px-3 py-1 bg-slate-700/50 text-cyan-300 text-sm rounded-full border border-slate-600/50 hover:border-cyan-500/50 transition-colors duration-300"
        >
          {tech}
        </span>
      ))}
    </div>
  </div>
);

const ExperienceCardHeader = ({ experience, onToggle }) => (
  <div
    className="flex items-start justify-between cursor-pointer"
    onClick={onToggle}
  >
    <div className="flex items-start space-x-4 sm:space-x-6 flex-1">
      <ExperienceIcon icon={experience.icon} />
      <div className="flex-1 text-left min-w-0">
        <h3 className="text-lg sm:text-xl md:text-2xl font-medium text-white">
          {experience.title}
        </h3>
        <p className="text-base sm:text-lg text-cyan-400 font-medium">
          {experience.company}
        </p>
        <MetaInfo 
          period={experience.period} 
          location={experience.location} 
          type={experience.type} 
        />
      </div>
    </div>
    <ExpandButton isExpanded={false} />
  </div>
);

const ExperienceCardContent = ({ experience, isExpanded }) => (
  <div
    className={`overflow-hidden transition-all duration-${TRANSITION_DURATION} ${
      isExpanded
        ? "max-h-96 opacity-100 mt-6"
        : "max-h-0 opacity-0"
    }`}
  >
    <div className="space-y-6 text-left">
      <p className="text-gray-300 leading-relaxed">
        {experience.description}
      </p>
      <AchievementsList achievements={experience.achievements} />
      <TechnologiesList technologies={experience.technologies} />
    </div>
  </div>
);

const ExperienceCard = ({ experience, isExpanded, onToggle }) => {
  const cardClass = `group bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 sm:p-8 transition-all duration-${TRANSITION_DURATION} ${
    isExpanded
      ? "border-cyan-500/50 bg-slate-800/70"
      : "hover:border-cyan-500/30 hover:bg-slate-800/70"
  }`;

  return (
    <div className={cardClass}>
      <ExperienceCardHeader experience={experience} onToggle={onToggle} />
      <ExperienceCardContent experience={experience} isExpanded={isExpanded} />
    </div>
  );
};

const ExperiencesList = ({ experiences, expansion }) => (
  <div className="space-y-6 sm:space-y-8">
    {experiences.map(experience => (
      <ExperienceCard
        key={experience.id}
        experience={experience}
        isExpanded={expansion.isExpanded(experience.id)}
        onToggle={() => expansion.toggle(experience.id)}
      />
    ))}
  </div>
);

const TimelineIndicator = () => (
  <div className="flex justify-center mt-16 sm:mt-20">
    <div className="w-1 h-16 bg-gradient-to-b from-cyan-400 to-transparent rounded-full"></div>
  </div>
);

export default function WorkExperience() {
  const expansion = useExpansion();

  return (
    <section
      id="work-experience"
      className="min-h-screen py-20 sm:py-24 md:py-28 px-4 sm:px-6 md:px-12 lg:px-20"
    >
      <div className="w-full max-w-4xl mx-auto text-center">
        <SectionHeader />
        <ExperiencesList experiences={WORK_EXPERIENCES} expansion={expansion} />
        <TimelineIndicator />
      </div>
    </section>
  );
}
