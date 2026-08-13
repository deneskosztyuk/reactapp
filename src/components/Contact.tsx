import { lazy, Suspense, useState } from "react";
import { FaExternalLinkAlt, FaGithub, FaLinkedin } from "react-icons/fa";
import type { ContactChannel } from "./ContactConstellationScene";
import useReducedMotion from "../lib/useReducedMotion";

const ContactConstellationScene = lazy(() => import("./ContactConstellationScene"));

const CONTACT_LINKS = [
  {
    channel: "linkedin" as const,
    href: "https://www.linkedin.com/in/deneskosztyuk/",
    icon: <FaLinkedin />,
    label: "LinkedIn",
    position:
      "left-[4%] top-[21%] sm:left-[10%] sm:top-[34%] lg:left-[16%] lg:top-[24%]",
    alignment: "flex-row",
  },
  {
    channel: "github" as const,
    href: "https://github.com/deneskosztyuk",
    icon: <FaGithub />,
    label: "GitHub",
    position:
      "right-[4%] top-[68%] sm:right-[10%] sm:top-[56%] lg:right-[16%] lg:top-[56%]",
    alignment: "flex-row-reverse text-right",
  },
];

export default function Contact() {
  const [activeChannel, setActiveChannel] = useState<ContactChannel | null>(null);
  const reducedMotion = useReducedMotion();

  return (
    <section id="contact" className="px-4 py-20 sm:px-8 sm:py-24">
      <div className="mx-auto w-full max-w-7xl">
        <div className="relative h-[31rem] border-y border-white/5 sm:h-[36rem] lg:h-[40rem]">
          <Suspense fallback={null}>
            <ContactConstellationScene
              activeChannel={activeChannel}
              reducedMotion={reducedMotion}
            />
          </Suspense>

          <nav aria-label="Contact channels" className="absolute inset-0 z-20">
            {CONTACT_LINKS.map((link) => {
              return (
                <a
                  key={link.channel}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open ${link.label} profile in a new tab`}
                  onMouseEnter={() => setActiveChannel(link.channel)}
                  onMouseLeave={() => setActiveChannel(null)}
                  onFocus={() => setActiveChannel(link.channel)}
                  onBlur={() => setActiveChannel(null)}
                  className={`group absolute inline-flex min-h-11 items-center gap-3 py-2 font-mono text-xs uppercase tracking-[0.14em] text-white/75 transition-colors duration-300 hover:text-cyan-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70 motion-reduce:transition-none ${link.position} ${link.alignment}`}
                >
                  <span className="flex items-center gap-2 border-b border-white/20 pb-1 transition-colors duration-300 group-hover:border-cyan-300/65 group-focus-visible:border-cyan-300/65 motion-reduce:transition-none">
                    <span aria-hidden="true" className="text-base text-cyan-300/85">
                      {link.icon}
                    </span>
                    <span>{link.label}</span>
                    <FaExternalLinkAlt aria-hidden="true" className="h-2.5 w-2.5 text-white/45" />
                  </span>
                </a>
              );
            })}
          </nav>
        </div>
      </div>
    </section>
  );
}