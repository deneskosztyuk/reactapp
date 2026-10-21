const SECTION_LINKS = [
  { href: "#work", label: "Work" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  return (
    <header className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 py-6">
      <a href="#top" className="text-[17px] font-bold text-silk no-underline">
        Denes Kosztyuk
      </a>
      <nav aria-label="Sections">
        <ul className="flex gap-x-4 text-[16px] sm:gap-x-6">
          {SECTION_LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="text-silk">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
