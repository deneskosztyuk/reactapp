const PROFILE_LINKS = [
  { href: "https://www.linkedin.com/in/deneskosztyuk/", label: "LinkedIn" },
  { href: "https://github.com/deneskosztyuk", label: "GitHub" },
];

export default function Hero() {
  return (
    <section id="top" className="pt-12 md:pt-20">
      <h1 className="max-w-[48rem] text-[clamp(30px,4.5vw,44px)] font-medium leading-[1.15]">
        I'm Denes Kosztyuk. I build firmware and the software around it, from the sensor to the
        cloud.
      </h1>
      <p className="mt-8 max-w-[40rem]">
        IoT software engineer at Invig in Stavanger, working on Rust services, a Vue front end and
        the devices that feed them. Previously freelance web development, and PCB production at
        Jabil. Open to remote work.
      </p>
      <ul className="mt-6 flex gap-x-6">
        {PROFILE_LINKS.map((link) => (
          <li key={link.href}>
            <a href={link.href} target="_blank" rel="noopener noreferrer">
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
