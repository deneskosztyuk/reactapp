import { useRef, useState, type KeyboardEvent } from "react";
import type { WorkExperience as WorkExperienceType } from "../types";

// Oldest first: the timeline reads left to right.
const WORK_EXPERIENCES: WorkExperienceType[] = [
  {
    id: "jabil",
    title: "Line Maintenance Engineer",
    company: "Jabil Ltd.",
    period: "2014 – 2016",
    location: "Ukraine",
    description:
      "Performed hardware maintenance and calibration at a PCB manufacturing plant.",
    achievements: [
      "Increased production line efficiency by 15% through optimized schedules",
      "Installed and calibrated more than 15 autonomous robotic machines",
      "Trained 8 new technicians on RoHS & safety compliance",
    ],
    technologies: ["PCB", "Circuit Production", "IoT", "Embedded Systems", "Robotics"],
  },
  {
    id: "freelance-projects",
    title: "Freelance software engineer",
    company: "Self-employed",
    period: "2023 – 2024",
    location: "Remote",
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
    id: "invig",
    title: "IoT Software Engineer",
    company: "Invig AS",
    period: "2025 – Present",
    location: "Norway",
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
];

const LAST = WORK_EXPERIENCES.length - 1;
// Line runs from the first marker's centre to the last one's.
const LINE_INSET = `${50 / WORK_EXPERIENCES.length}%`;

interface ExperienceEntryProps {
  experience: WorkExperienceType;
}

const ExperienceEntry = ({ experience }: ExperienceEntryProps) => (
  <article className="grid gap-x-8 gap-y-2 md:grid-cols-[10rem_minmax(0,1fr)]">
    <p className="text-[15px] text-dim">
      {experience.period}
      <br />
      {experience.location}
    </p>
    <div className="max-w-[40rem]">
      <h3 className="font-medium">{experience.title}</h3>
      <p>{experience.company}</p>
      <p className="mt-3">{experience.description}</p>
      <ul className="mt-3 list-disc space-y-1 pl-5 marker:text-dim">
        {experience.achievements.map((achievement) => (
          <li key={achievement}>{achievement}</li>
        ))}
      </ul>
      <p className="mt-3 text-[15px] text-dim">{experience.technologies.join(", ")}</p>
    </div>
  </article>
);

const ARROW_CLASS =
  "flex h-11 w-11 flex-none items-center justify-center text-[22px] text-silk disabled:cursor-default disabled:text-trace";

export default function WorkExperience() {
  const [selected, setSelected] = useState(LAST);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const select = (index: number, moveFocus = false) => {
    const next = Math.min(LAST, Math.max(0, index));
    setSelected(next);
    if (moveFocus) tabRefs.current[next]?.focus();
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "ArrowLeft") select(selected - 1, true);
    else if (event.key === "ArrowRight") select(selected + 1, true);
    else return;
    event.preventDefault();
  };

  return (
    <section id="work">
      <h2>Work</h2>

      <div className="mt-8 flex items-start gap-2">
        <button
          type="button"
          aria-label="Previous role"
          disabled={selected === 0}
          onClick={() => select(selected - 1)}
          className={ARROW_CLASS}
        >
          ←
        </button>

        <div role="tablist" aria-label="Roles" className="relative flex flex-1" onKeyDown={handleKeyDown}>
          <span
            aria-hidden="true"
            className="absolute top-[21px] h-px bg-trace"
            style={{ left: LINE_INSET, right: LINE_INSET }}
          />
          {WORK_EXPERIENCES.map((experience, index) => {
            const active = index === selected;
            return (
              <button
                key={experience.id}
                ref={(element) => {
                  tabRefs.current[index] = element;
                }}
                type="button"
                role="tab"
                id={`role-tab-${experience.id}`}
                aria-selected={active}
                aria-controls={`role-panel-${experience.id}`}
                tabIndex={active ? 0 : -1}
                onClick={() => select(index)}
                className="relative flex flex-1 flex-col items-center gap-2 pt-4 text-center"
              >
                <span
                  aria-hidden="true"
                  className={`h-3 w-3 border ${active ? "border-gold bg-gold" : "border-silk bg-board"}`}
                />
                <span className={`text-[15px] ${active ? "text-silk" : "text-dim"}`}>
                  {experience.period}
                </span>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          aria-label="Next role"
          disabled={selected === LAST}
          onClick={() => select(selected + 1)}
          className={ARROW_CLASS}
        >
          →
        </button>
      </div>

      {/* All panels share one grid cell so the section keeps the tallest role's height. */}
      <div className="mt-10 grid">
        {WORK_EXPERIENCES.map((experience, index) => (
          <div
            key={experience.id}
            role="tabpanel"
            id={`role-panel-${experience.id}`}
            aria-labelledby={`role-tab-${experience.id}`}
            inert={index !== selected}
            className={`[grid-area:1/1] ${index === selected ? "" : "invisible"}`}
          >
            <ExperienceEntry experience={experience} />
          </div>
        ))}
      </div>
    </section>
  );
}
