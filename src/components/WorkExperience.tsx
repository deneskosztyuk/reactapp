import type { ReactNode } from "react";
import {
  FaBriefcase,
  FaCalendarAlt,
  FaCog,
  FaGlobe,
  FaMapMarkerAlt,
  FaMicrochip,
} from "react-icons/fa";
import TechnologyTags from "./TechnologyTags";
import useInView from "../lib/useInView";
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
  },
];

interface ExperienceIconProps {
  icon: ReactNode;
}

const ExperienceIcon = ({ icon }: ExperienceIconProps) => (
  <span
    aria-hidden="true"
    className="flex h-10 w-10 flex-none items-center justify-center rounded-md border border-white/10 bg-white/[0.04] text-base text-cyan-300"
  >
    {icon}
  </span>
);

interface ExperienceMetaProps {
  period: string;
  location: string;
  type: string;
}

const ExperienceMeta = ({ period, location, type }: ExperienceMetaProps) => (
  <ul className="flex flex-wrap gap-x-4 gap-y-2 font-mono text-[11px] uppercase tracking-[0.12em] text-white/60 md:block md:space-y-3">
    <li className="flex items-center gap-2">
      <FaCalendarAlt aria-hidden="true" className="h-3 w-3 text-cyan-300/70" />
      <span>{period}</span>
    </li>
    <li className="flex items-center gap-2">
      <FaMapMarkerAlt aria-hidden="true" className="h-3 w-3 text-cyan-300/70" />
      <span>{location}</span>
    </li>
    <li className="flex items-center gap-2">
      <FaBriefcase aria-hidden="true" className="h-3 w-3 text-cyan-300/70" />
      <span>{type}</span>
    </li>
  </ul>
);

interface ExperienceEntryProps {
  experience: WorkExperienceType;
}

const ExperienceEntry = ({ experience }: ExperienceEntryProps) => {
  const { elementRef, isVisible } = useInView<HTMLElement>();

  return (
    <article
      ref={elementRef}
      className={`grid gap-6 border-t border-white/10 py-10 transition-all duration-500 first:border-t-0 first:pt-0 motion-reduce:transform-none motion-reduce:transition-none md:grid-cols-[9rem_2rem_minmax(0,1fr)] md:gap-6 md:py-12 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
      }`}
    >
      <div className="md:pt-1">
        <ExperienceMeta
          period={experience.period}
          location={experience.location}
          type={experience.type}
        />
      </div>

      <div aria-hidden="true" className="relative hidden justify-center md:flex">
        <span className="relative z-10 mt-1 h-2.5 w-2.5 border border-cyan-300/70 bg-slate-950" />
        <span className="absolute bottom-0 top-5 w-px bg-gradient-to-b from-cyan-300/45 via-white/15 to-transparent" />
      </div>

      <div className="min-w-0">
        <div className="flex items-start gap-4">
          <ExperienceIcon icon={experience.icon} />
          <div>
            <h3 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
              {experience.title}
            </h3>
            <p className="mt-1 font-mono text-sm text-cyan-300/85">{experience.company}</p>
          </div>
        </div>

        <p className="mt-6 max-w-3xl text-sm leading-7 text-white/60 sm:text-base">
          {experience.description}
        </p>

        <div className="mt-7">
          <h4 className="mb-4 font-mono text-[11px] uppercase tracking-[0.24em] text-white/55">
            Key Achievements
          </h4>
          <ul className="space-y-3 text-sm leading-6 text-white/65">
            {experience.achievements.map((achievement) => (
              <li key={achievement} className="grid grid-cols-[0.75rem_minmax(0,1fr)] gap-3">
                <span aria-hidden="true" className="mt-3 h-px w-2 bg-cyan-300/70" />
                <span>{achievement}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-7 border-t border-white/10 pt-5">
          <h4 className="mb-3 font-mono text-[11px] uppercase tracking-[0.24em] text-white/55">
            Technologies
          </h4>
          <TechnologyTags technologies={experience.technologies} />
        </div>
      </div>
    </article>
  );
};

export default function WorkExperience() {
  return (
    <section id="work-experience" className="py-20 sm:py-28">
      <div className="mx-auto w-full max-w-6xl px-6 sm:px-12">
        <div>
          {WORK_EXPERIENCES.map((experience) => (
            <ExperienceEntry key={experience.id} experience={experience} />
          ))}
        </div>
      </div>
    </section>
  );
}