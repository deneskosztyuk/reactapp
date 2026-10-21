import type { WorkExperience as WorkExperienceType } from "../types";

const WORK_EXPERIENCES: WorkExperienceType[] = [
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
];

interface ExperienceEntryProps {
  experience: WorkExperienceType;
}

const ExperienceEntry = ({ experience }: ExperienceEntryProps) => (
  <article className="grid gap-x-8 gap-y-2 md:grid-cols-[10rem_minmax(0,1fr)]">
    <p className="text-[15px] text-graphite">
      {experience.period}
      <br />
      {experience.location}
    </p>
    <div className="max-w-[40rem]">
      <h3 className="font-medium">{experience.title}</h3>
      <p>{experience.company}</p>
      <p className="mt-3">{experience.description}</p>
      <ul className="mt-3 list-disc space-y-1 pl-5 marker:text-graphite">
        {experience.achievements.map((achievement) => (
          <li key={achievement}>{achievement}</li>
        ))}
      </ul>
      <p className="mt-3 text-[15px] text-graphite">{experience.technologies.join(", ")}</p>
    </div>
  </article>
);

export default function WorkExperience() {
  return (
    <section id="work">
      <h2>Work</h2>
      <div className="mt-8 space-y-12">
        {WORK_EXPERIENCES.map((experience) => (
          <ExperienceEntry key={experience.id} experience={experience} />
        ))}
      </div>
    </section>
  );
}
