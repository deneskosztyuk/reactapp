import { useState } from "react";
import ContactBoard, { type ContactChannel } from "./ContactBoard";
import useReducedMotion from "../lib/useReducedMotion";

const CONTACT_LINKS: Array<{ channel: ContactChannel; href: string; label: string }> = [
  { channel: "linkedin", href: "https://www.linkedin.com/in/deneskosztyuk/", label: "LinkedIn" },
  { channel: "github", href: "https://github.com/deneskosztyuk", label: "GitHub" },
];

export default function Contact() {
  const [activeChannel, setActiveChannel] = useState<ContactChannel | null>(null);
  const reducedMotion = useReducedMotion();

  return (
    <section id="contact">
      <h2>Contact</h2>
      <p className="mt-3 max-w-[40rem]">The quickest way to reach me is a message on LinkedIn.</p>
      <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-center">
        <ContactBoard activeChannel={activeChannel} reducedMotion={reducedMotion} />
        <ul className="flex gap-x-6 md:flex-col md:gap-y-2">
          {CONTACT_LINKS.map((link) => (
            <li key={link.channel}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setActiveChannel(link.channel)}
                onMouseLeave={() => setActiveChannel(null)}
                onFocus={() => setActiveChannel(link.channel)}
                onBlur={() => setActiveChannel(null)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
