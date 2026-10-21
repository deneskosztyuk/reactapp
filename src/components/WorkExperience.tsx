import { useLayoutEffect, useRef, useState, type KeyboardEvent } from "react";
import useReducedMotion from "../lib/useReducedMotion";
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

const PULSE_SIZE = 6;

export default function WorkExperience() {
  const [selected, setSelected] = useState(LAST);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const pulseRef = useRef<HTMLSpanElement | null>(null);
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const panelRefs = useRef<Array<HTMLDivElement | null>>([]);
  // Role the scroller is animating to after an arrow/marker/key select; scroll sync waits until it arrives.
  const scrollTargetRef = useRef<number | null>(null);
  const reducedMotion = useReducedMotion();

  // Start on the current role without an animated scroll.
  useLayoutEffect(() => {
    const scroller = scrollerRef.current;
    const panel = panelRefs.current[LAST];
    if (scroller && panel) scroller.scrollLeft = panel.offsetLeft;
  }, []);

  // Sends a gold pulse along the line from one marker to another; the panel itself switches instantly.
  const sendPulse = (fromIndex: number, toIndex: number) => {
    const pulse = pulseRef.current;
    const from = tabRefs.current[fromIndex];
    const to = tabRefs.current[toIndex];
    if (!pulse || !from || !to || reducedMotion) return;

    const centre = (tab: HTMLElement) => tab.offsetLeft + tab.offsetWidth / 2 - PULSE_SIZE / 2;
    pulse.style.transition = "none";
    pulse.style.transform = `translateX(${centre(from)}px)`;
    pulse.style.visibility = "visible";
    void pulse.offsetWidth; // commit the start position so the next change transitions
    pulse.style.transition = "transform 300ms steps(10)";
    pulse.style.transform = `translateX(${centre(to)}px)`;
  };

  const select = (index: number, moveFocus = false) => {
    const next = Math.min(LAST, Math.max(0, index));
    if (next !== selected) sendPulse(selected, next);
    setSelected(next);
    if (moveFocus) tabRefs.current[next]?.focus();

    const scroller = scrollerRef.current;
    const panel = panelRefs.current[next];
    if (scroller && panel && scroller.scrollLeft !== panel.offsetLeft) {
      scrollTargetRef.current = next;
      scroller.scrollTo({ left: panel.offsetLeft, behavior: reducedMotion ? "auto" : "smooth" });
    }
  };

  // Swiping the role scroller selects whichever role is nearest its left edge.
  const handleScroll = () => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const distances = panelRefs.current.map((panel) =>
      panel ? Math.abs(panel.offsetLeft - scroller.scrollLeft) : Infinity
    );
    const nearest = distances.indexOf(Math.min(...distances));

    if (scrollTargetRef.current !== null) {
      if (nearest === scrollTargetRef.current && distances[nearest] < 2) scrollTargetRef.current = null;
      return;
    }
    if (nearest !== selected) {
      sendPulse(selected, nearest);
      setSelected(nearest);
    }
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
          <span
            ref={pulseRef}
            aria-hidden="true"
            className="pointer-events-none invisible absolute left-0 top-[19px] bg-gold"
            style={{ width: PULSE_SIZE, height: PULSE_SIZE }}
            onTransitionEnd={(event) => {
              event.currentTarget.style.visibility = "hidden";
            }}
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

      {/* Roles sit side by side in a snapping scroller: swipe on touch, arrows, markers and keys scroll it.
          Panels stretch to the tallest role, so the section height never jumps. */}
      <div
        ref={scrollerRef}
        onScroll={handleScroll}
        onPointerDown={() => {
          scrollTargetRef.current = null;
        }}
        className="no-scrollbar relative mt-10 flex snap-x snap-mandatory gap-x-6 overflow-x-auto overscroll-x-contain"
      >
        {WORK_EXPERIENCES.map((experience, index) => (
          <div
            key={experience.id}
            ref={(element) => {
              panelRefs.current[index] = element;
            }}
            role="tabpanel"
            id={`role-panel-${experience.id}`}
            aria-labelledby={`role-tab-${experience.id}`}
            inert={index !== selected}
            className="w-full flex-none snap-start"
          >
            <ExperienceEntry experience={experience} />
          </div>
        ))}
      </div>
    </section>
  );
}
