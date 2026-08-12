interface TechnologyTagsProps {
  technologies: string[];
}

export default function TechnologyTags({ technologies }: TechnologyTagsProps) {
  return (
    <ul className="flex flex-wrap gap-2" aria-label="Technologies">
      {technologies.map((technology) => (
        <li
          key={technology}
          className="rounded-md border border-white/10 bg-slate-950/55 px-2.5 py-1 font-mono text-[11px] text-white/65"
        >
          {technology}
        </li>
      ))}
    </ul>
  );
}