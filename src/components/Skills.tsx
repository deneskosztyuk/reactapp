const SKILL_GROUPS = [
  {
    title: "Device",
    skills: [
      "Rust",
      "C",
      "C++",
      "embedded systems",
      "firmware",
      "microcontrollers",
      "real-time systems",
      "signal processing",
      "FPGA",
      "PCB design (KiCad)",
    ],
  },
  {
    title: "Cloud and web",
    skills: [
      "Vue.js",
      "React",
      "TypeScript",
      "Node.js",
      "Python",
      "Java",
      "Spring Boot",
      "PostgreSQL",
      "Lua",
      "AWS",
      "GitHub Actions",
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills">
      <h2>Skills</h2>
      <div className="mt-6 space-y-5">
        {SKILL_GROUPS.map((group) => (
          <div key={group.title} className="max-w-[40rem]">
            <h3 className="font-medium">{group.title}</h3>
            <p>{group.skills.join(", ")}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
