import { useState, useEffect } from "react";
import { Link } from "react-scroll";

const Navbar = () => {
  const [isWaving, setIsWaving] = useState(false);

  useEffect(() => {
    if (isWaving) {
      const timer = setTimeout(() => setIsWaving(false), 2000); // Stop after 3s
      return () => clearTimeout(timer);
    }
  }, [isWaving]);

  return (
    <nav className="fixed top-0 left-1/2 transform -translate-x-1/2 w-full bg-white/10 backdrop-blur-md shadow-md p-4 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Left Side - Welcome Text with Waving Emoji */}
        <div
          className="text-white text-lg font-semibold px-4 py-2 bg-gray-800/40 rounded-lg shadow-lg"
          onMouseEnter={() => setIsWaving(true)}
        >
          Welcome{" "}
          <span className={`inline-block ${isWaving ? "wave-animation" : ""}`}>
            👋
          </span>
        </div>

        {/* Right Side - Nav Links */}
        <div className="flex space-x-6">
          <NavItem to="hero" label="Home" />
          <NavItem to="projects" label="Projects" />
          <NavItem to="contact" label="Contact Me" />
        </div>
      </div>
    </nav>
  );
};

const NavItem = ({ to, label }) => (
  <Link
    to={to}
    smooth={true}
    duration={600}
    className="cursor-pointer text-white px-4 py-2 bg-gray-800/40 rounded-lg shadow-lg transition-all hover:bg-gray-600/60"
  >
    {label}
  </Link>
);

export default Navbar;
