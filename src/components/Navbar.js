import { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { FaGithub, FaLinkedin } from "react-icons/fa";


const Navbar = () => {
  const [isWaving, setIsWaving] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (isWaving) {
      const timer = setTimeout(() => setIsWaving(false), 2000); // stop waving after 2s
      return () => clearTimeout(timer);
    }
  }, [isWaving]);

  return (
    <nav className="fixed top-0 left-1/2 transform -translate-x-1/2 w-full bg-white/10 backdrop-blur-md shadow-md p-4 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center">

        {/* left side welcome text*/}
        <div
          className="text-white text-lg flex items-center space-x-4 font-semibold px-1 py-1 cursor-pointer"
          onMouseEnter={() => setIsWaving(true)}  // pC hover
          onClick={() => setIsWaving(true)}  // mobile tap
        >
          Welcome{" "}
          <span className={`inline-block transition-transform ${isWaving ? "animate-wave" : ""}`}>
            👋
          </span>

          <a
            href="https://github.com/deneskosztyuk"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-purple-600 transition-colors text-2xl"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/deneskosztyuk/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-purple-600 transition-colors text-2xl"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </a>          
        </div>


        {/* hamburger menu mobile */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex space-x-6">
          <NavItem to="hero" label="Home" />
          <NavItem to="projects" label="Projects" />
          {/*<NavItem to="freelance" label="Freelance" />*/}
          <NavItem to="contact" label="Contact Form" />
        </div>

        {/* Mobile Menu - Smooth Open & Close */}
        <div
          className={`md:hidden absolute top-16 right-0 w-full bg-slate-800/90 backdrop-blur-md shadow-lg transform
            transition-all duration-300 ease-in-out overflow-hidden
            ${isMobileMenuOpen ? "opacity-100 scale-y-100 h-auto" : "opacity-0 scale-y-0 h-0"}`}
        >
          <div className="flex flex-col space-y-4 p-4">
            <NavItem to="hero" label="Home" onClick={() => setIsMobileMenuOpen(false)} />
            <NavItem to="projects" label="Projects" onClick={() => setIsMobileMenuOpen(false)} />
            <NavItem to="freelance" label="Freelance Hire" onClick={() => setIsMobileMenuOpen(false)} />
            <NavItem to="contact" label="Contact Me" onClick={() => setIsMobileMenuOpen(false)} />
          </div>
        </div>
      </div>
    </nav>
  );
};

/* Reusable Nav Item Component */
const NavItem = ({ to, label, onClick }) => (
  <Link
    to={to}
    smooth={true}
    duration={600}
    onClick={onClick}
    className="relative cursor-pointer text-white px-4 py-2 bg-slate-800 rounded-lg shadow-lg transition-all
               hover:bg-purple-700 focus:bg-purple-700
               after:content-[''] after:absolute after:left-4 after:right-4 after:bottom-2 after:h-[2px]
               after:bg-purple-400 after:scale-x-0 after:transition-transform after:duration-300 after:origin-left
               hover:after:scale-x-100 focus:after:scale-x-100"
  >
    {label}
  </Link>
);
export default Navbar;
