import React, { useEffect, useRef, useState } from "react";
import {
  FaBriefcase,
  FaCalendarAlt,
  FaCog,
  FaGlobe,
  FaMapMarkerAlt,
  FaMicrochip,
} from "react-icons/fa";
import type { WorkExperience as WorkExperienceType } from "../types";

const WORK_EXPERIENCES: WorkExperienceType[] = [
  {
    id: "invig",
    title: "IoT Software Engineer",
    company: "Invig AS",
    period: "2025 – Present",
    location: "Norway",
    type: "Full-time",
    icon: <FaMicrochip />,
    description:
      "Developing features and solutions for an Industrial IoT platform enabling large-scale device management and product operations.",
    achievements: [
      "Engineered batch upload functionality supporting 100K+ products in a single operation",
      "Set up and connected production IoT devices to the platform infrastructure",
      "Built responsive frontend features using Vue.js for improved user workflows",
      "Implemented backend services in Rust for high-performance data processing",
    ],
    technologies: ["Vue.js", "Rust", "Git", "Lua", "AWS", "GitHub Actions", "CI/CD"],
    gradient: "from-slate-900/40 via-slate-900/60 to-slate-900/80",
  },
  {
    id: "freelance-projects",
    title: "Software Freelance Contractor",
    company: "Freelance Contractor",
    period: "2023 – 2024",
    location: "Remote",
    type: "Contractor",
    icon: <FaGlobe />,
    description:
      "Delivered custom web apps and software solutions for various clients.",
    achievements: [
      "Built web applications using Next.js, TypeScript, React, and PostgreSQL",
      "Provided services as a Python Backend Engineer to troubleshoot and refactor 12 API endpoints for HMRC (UK Tax Authority) client request validation for a SaaS startup",
      "Consulted on projects to identify and resolve performance bottlenecks",
      "Designed custom Discord bots for gaming and tech communities using discord.js",
    ],
    technologies: ["React", "Node.js", "Java", "Spring Boot", "Git", "TypeScript", "discord.js"],
    gradient: "from-slate-900/40 via-slate-900/60 to-slate-900/80",
  },
  {
    id: "jabil",
    title: "Line Maintenance Engineer",
    company: "Jabil Ltd.",
    period: "2014 – 2016",
    location: "Ukraine",
    type: "Full-time",
    icon: <FaCog />,
    description:
      "Performed hardware maintenance and calibration at a PCB manufacturing plant.",
    achievements: [
      "Increased production line efficiency by 15% through optimized schedules",
      "Installed and calibrated >15 autonomous robotic machines",
      "Trained 8 new technicians on RoHS & safety compliance",
    ],
    technologies: ["PCB", "Circuit Production", "IoT", "Embedded Systems", "Robotics"],
    gradient: "from-slate-900/40 via-slate-900/60 to-slate-900/80",
  },
];

const SectionHeader = () => (
  <div className="space-y-6 mb-0 pb-16 text-center">
    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[11px] uppercase tracking-[0.3em] text-white/50">
      Work Experience
    </div>

    <h1 className="text-[clamp(2.6rem,7vw,4.6rem)] font-semibold text-white tracking-[-0.02em] leading-[1.02]">
      Building products with
      <span className="inline-block bg-gradient-to-r from-cyan-300 via-sky-300 to-emerald-300 text-transparent bg-clip-text">
        {" "}precision
      </span>
    </h1>

    <p className="text-sm sm:text-base text-white/55 leading-relaxed max-w-2xl mx-auto font-light">
      Focused on pragmatic engineering, scalable platforms, and measurable impact.
    </p>
  </div>
);

interface ExperienceIconProps {
  icon: React.ReactNode;
  isVisible: boolean;
}

const ExperienceIcon = ({ icon, isVisible }: ExperienceIconProps) => (
  <div
    className={`flex-shrink-0 w-11 h-11 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center transition-all duration-700 group-hover:border-cyan-400/40 group-hover:bg-white/10 ${
      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
    }`}
  >
    <span className="text-cyan-300/90 text-lg transition-transform duration-500 group-hover:scale-110">
      {icon}
    </span>
  </div>
);

interface MetaInfoProps {
  period: string;
  location: string;
  type: string;
  isVisible: boolean;
}

const MetaInfo = ({ period, location, type, isVisible }: MetaInfoProps) => {
  const [showItems, setShowItems] = useState<number[]>([]);

  useEffect(() => {
    if (isVisible) {
      [0, 1, 2].forEach((index) => {
        setTimeout(() => {
          setShowItems((prev) => [...prev, index]);
        }, 500 + index * 200);
      });
    }
  }, [isVisible]);

  const items = [
    { icon: <FaCalendarAlt className="w-3 h-3" />, text: period },
    { icon: <FaMapMarkerAlt className="w-3 h-3" />, text: location },
    { icon: <FaBriefcase className="w-3 h-3" />, text: type },
  ];

  return (
    <div className="flex flex-wrap items-center gap-3 text-[11px] text-white/45 mt-3 font-mono tracking-[0.12em]">
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && (
            <span
              className={`text-white/15 transition-opacity duration-400 ${
                showItems.includes(index) ? "opacity-100" : "opacity-0"
              }`}
            >
              •
            </span>
          )}
          <span
            className={`flex items-center gap-1.5 transition-all duration-500 ${
              showItems.includes(index) ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-3"
            }`}
          >
            {item.icon}
            <span className="uppercase">{item.text}</span>
          </span>
        </React.Fragment>
      ))}
    </div>
  );
};

interface AchievementsListProps {
  achievements: string[];
  isVisible: boolean;
}

const AchievementsList = ({ achievements, isVisible }: AchievementsListProps) => {
  const [visibleAchievements, setVisibleAchievements] = useState<number[]>([]);

  useEffect(() => {
    if (isVisible) {
      achievements.forEach((_, index) => {
        setTimeout(() => {
          setVisibleAchievements((prev) => [...prev, index]);
        }, 900 + index * 250);
      });
    }
  }, [isVisible, achievements]);

  return (
    <div className="mt-6">
      <h4
        className={`text-white/40 font-semibold text-[11px] mb-3 tracking-[0.28em] uppercase transition-all duration-600 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
        }`}
      >
        Key Achievements
      </h4>
      <ul className="space-y-2.5 text-white/65 text-sm leading-relaxed">
        {achievements.map((achievement, index) => (
          <li
            key={index}
            className={`flex items-start gap-3 pl-3 border-l-2 border-white/10 transition-all duration-600 hover:border-cyan-300/40 ${
              visibleAchievements.includes(index)
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-6"
            }`}
          >
            <span className="text-cyan-300/70 text-xs mt-0.5">▸</span>
            <span>{achievement}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

interface TechnologiesListProps {
  technologies: string[];
  isVisible: boolean;
}

const TechnologiesList = ({ technologies, isVisible }: TechnologiesListProps) => {
  const [visibleTech, setVisibleTech] = useState<number[]>([]);

  useEffect(() => {
    if (isVisible) {
      technologies.forEach((_, index) => {
        setTimeout(() => {
          setVisibleTech((prev) => [...prev, index]);
        }, 1600 + index * 120);
      });
    }
  }, [isVisible, technologies]);

  return (
    <div className="mt-6 pt-5 border-t border-white/10">
      <h4
        className={`text-white/40 font-semibold text-[11px] mb-3 tracking-[0.28em] uppercase transition-all duration-600 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
        }`}
      >
        Technologies
      </h4>
      <div className="flex flex-wrap gap-2">
        {technologies.map((tech, index) => (
          <span
            key={index}
            className={`px-3 py-1.5 bg-white/5 border border-white/10 text-white/65 text-[11px] font-medium hover:bg-white/10 hover:border-cyan-300/40 hover:text-white/90 transition-all duration-300 cursor-default ${
              visibleTech.includes(index) ? "opacity-100 scale-100" : "opacity-0 scale-90"
            }`}
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
};

interface ExperienceCardProps {
  experience: WorkExperienceType;
  index: number;
}

const ExperienceCard = ({ experience, index }: ExperienceCardProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [descriptionVisible, setDescriptionVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setTimeout(() => setHeaderVisible(true), 300);
          setTimeout(() => setDescriptionVisible(true), 550);
          observer.disconnect();
        }
      },
      {
        threshold: 0.15,
        rootMargin: "30px",
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={`group relative rounded-2xl border border-white/10 bg-white/[0.03] transition-all duration-500 hover:border-cyan-300/40 hover:bg-white/[0.06] ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute inset-y-4 left-0 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent" />

      <div className="relative z-10 p-7 sm:p-8 md:p-10">
        <div className="flex items-start gap-5 mb-6">
          <ExperienceIcon icon={experience.icon} isVisible={headerVisible} />
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <h3
                className={`text-xl md:text-2xl font-semibold text-white tracking-tight transition-all duration-500 ${
                  headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                }`}
              >
                {experience.title}
              </h3>
              <span className="text-white/20">—</span>
              <p
                className={`text-sm md:text-base text-cyan-300/85 font-semibold tracking-wide transition-all duration-500 delay-75 ${
                  headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                }`}
              >
                {experience.company}
              </p>
            </div>
            <MetaInfo
              period={experience.period}
              location={experience.location}
              type={experience.type}
              isVisible={headerVisible}
            />
          </div>
        </div>

        <p
          className={`text-white/60 text-sm md:text-base leading-relaxed mb-6 transition-all duration-500 ${
            descriptionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          }`}
        >
          {experience.description}
        </p>

        <AchievementsList achievements={experience.achievements} isVisible={descriptionVisible} />

        <TechnologiesList technologies={experience.technologies} isVisible={descriptionVisible} />
      </div>
    </div>
  );
};

interface ExperiencesMosaicProps {
  experiences: WorkExperienceType[];
}

const ExperiencesMosaic = ({ experiences }: ExperiencesMosaicProps) => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {experiences.map((experience, index) => (
        <ExperienceCard key={experience.id} experience={experience} index={index} />
      ))}
    </div>
  </div>
);

const TimelineIndicator = () => (
  <div className="flex justify-center mt-14">
    <div className="flex flex-col items-center gap-3">
      <div className="w-1.5 h-1.5 bg-cyan-300/70"></div>
      <div className="w-px h-12 bg-gradient-to-b from-cyan-300/50 via-white/10 to-transparent"></div>
      <div className="w-10 h-px bg-gradient-to-r from-transparent via-cyan-300/40 to-transparent"></div>
    </div>
  </div>
);

export default function WorkExperience() {
  return (
    <section id="work-experience" className="min-h-screen py-20 sm:py-28">
      <div className="w-full max-w-6xl mx-auto px-6 sm:px-12 text-center mb-10">
        <SectionHeader />
      </div>

      <div className="w-full max-w-6xl mx-auto px-6 sm:px-12">
        <ExperiencesMosaic experiences={WORK_EXPERIENCES} />
      </div>

      <div className="w-full max-w-6xl mx-auto px-6 sm:px-12">
        <TimelineIndicator />
      </div>
    </section>
  );
}