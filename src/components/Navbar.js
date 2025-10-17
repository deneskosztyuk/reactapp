import { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const SCROLL_THRESHOLD = 20;
const SECTION_OFFSET = 200;
const SCROLL_DURATION = 600;
const CLICK_OUTSIDE_DELAY = 100;

const NAVIGATION_ITEMS = [
  { id: 1, to: "hero", label: "home" },
  { id: 2, to: "work-experience", label: "experience" },
  { id: 3, to: "projects", label: "projects" },
  { id: 4, to: "contact", label: "contact" }
];

const SOCIAL_LINKS = [
  {
    href: "https://github.com/deneskosztyuk",
    icon: <FaGithub />,
    label: "GitHub"
  },
  {
    href: "https://www.linkedin.com/in/deneskosztyuk/",
    icon: <FaLinkedin />,
    label: "LinkedIn"
  }
];

const NAVBAR_STYLES = {
  scrolled: "bg-slate-900/80 backdrop-blur-lg py-3 border-b border-slate-800 shadow-xl",
  transparent: "bg-transparent py-4 sm:py-6"
};

const useScrollDetection = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return isScrolled;
};

const useActiveSection = () => {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + SECTION_OFFSET;
      
      for (const section of NAVIGATION_ITEMS) {
        const element = document.getElementById(section.to);
        if (element && 
            element.offsetTop <= scrollPosition && 
            element.offsetTop + element.offsetHeight > scrollPosition) {
          setActiveSection(section.to);
          break;
        }
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return activeSection;
};

const useMobileMenu = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e) => {
      const mobileMenuButton = document.getElementById('mobile-menu-button');
      const mobileMenu = document.getElementById('mobile-menu');
      
      if (isMobileMenuOpen && 
          !mobileMenu?.contains(e.target) && 
          !mobileMenuButton?.contains(e.target)) {
        setIsMobileMenuOpen(false);
      }
    };
    
    if (isMobileMenuOpen) {
      setTimeout(() => {
        document.addEventListener("click", handleClickOutside);
      }, CLICK_OUTSIDE_DELAY);
    }
    
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = (e) => {
    e.stopPropagation();
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return { isMobileMenuOpen, toggleMobileMenu, closeMobileMenu };
};

const Logo = () => (
  <div className="flex-shrink-0">
    <Link
      to="hero"
      smooth={true}
      duration={SCROLL_DURATION}
      className="cursor-pointer"
    >
      <h1 className="text-xl font-bold tracking-widest text-white hover:text-cyan-400 transition-colors duration-300">
        Velkommen<span className="text-cyan-400"></span>
      </h1>
    </Link>
  </div>
);

const NavigationItem = ({ item, activeSection }) => (
  <li key={item.to}>
    <Link
      to={item.to}
      spy={true}
      smooth={true}
      duration={SCROLL_DURATION}
      className={`group relative font-mono text-sm transition-all duration-300 cursor-pointer ${
        activeSection === item.to
          ? "text-white"
          : "text-gray-400 hover:text-white"
      }`}
    >
      <span className={`mr-1 transition-colors ${activeSection === item.to ? "text-cyan-400" : "text-gray-600"}`}>
        0{item.id}
      </span>
      // {item.label}
      {activeSection === item.to && (
        <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"></span>
      )}
      {activeSection !== item.to && (
        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300 group-hover:w-full"></span>
      )}
    </Link>
  </li>
);

const SocialLink = ({ link }) => (
  <a
    key={link.label}
    href={link.href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-gray-500 hover:text-cyan-400 transition-colors duration-300 transform hover:scale-110"
    aria-label={link.label}
  >
    <div className="w-5 h-5">{link.icon}</div>
  </a>
);

const DesktopNavigation = ({ activeSection }) => (
  <div className="hidden md:flex items-center space-x-8 lg:space-x-12">
    <ul className="flex space-x-8 lg:space-x-10">
      {NAVIGATION_ITEMS.map((item) => (
        <NavigationItem key={item.to} item={item} activeSection={activeSection} />
      ))}
    </ul>
    
    <div className="flex items-center space-x-4 border-l border-slate-700/50 pl-6 ml-4">
      {SOCIAL_LINKS.map((link) => (
        <SocialLink key={link.label} link={link} />
      ))}
    </div>
  </div>
);

const HamburgerButton = ({ isMobileMenuOpen, toggleMobileMenu }) => (
  <div className="md:hidden pr-4">
    <button
      id="mobile-menu-button"
      onClick={toggleMobileMenu}
      className="relative p-2 text-gray-300 hover:text-cyan-400 focus:outline-none transition-all duration-300 transform hover:scale-110 hamburger-button"
      aria-label="Toggle menu"
      type="button"
    >
      <div className="hamburger-container">
        <span className={`hamburger-line ${isMobileMenuOpen ? 'active' : ''}`}></span>
        <span className={`hamburger-line ${isMobileMenuOpen ? 'active' : ''}`}></span>
        <span className={`hamburger-line ${isMobileMenuOpen ? 'active' : ''}`}></span>
      </div>
    </button>
  </div>
);

const MobileMenuItem = ({ item, index, activeSection, closeMobileMenu }) => (
  <li key={item.to} className={`animate-slide-in-${index}`}>
    <Link
      to={item.to}
      spy={true}
      smooth={true}
      duration={SCROLL_DURATION}
      onClick={closeMobileMenu}
      className={`block py-4 px-4 text-lg font-mono transition-all duration-300 cursor-pointer rounded-lg ${
        activeSection === item.to
          ? "text-cyan-400 bg-cyan-400/10 border-l-4 border-cyan-400 shadow-lg shadow-cyan-400/20"
          : "text-gray-300 hover:text-cyan-300 hover:bg-slate-800/50 hover:pl-6"
      }`}
    >
      <span className={activeSection === item.to ? "text-cyan-400" : "text-gray-600"}>0{item.id}</span> // {item.label}
    </Link>
  </li>
);

const MobileSocialLink = ({ link, index }) => (
  <a
    key={link.label}
    href={link.href}
    target="_blank"
    rel="noopener noreferrer"
    className={`text-gray-400 hover:text-cyan-400 transition-all duration-300 transform hover:scale-125 hover:rotate-12 animate-bounce-in-${index}`}
    aria-label={link.label}
  >
    <div className="w-8 h-8 p-1 rounded-full hover:bg-cyan-400/10">{link.icon}</div>
  </a>
);

const MobileMenu = ({ isMobileMenuOpen, activeSection, closeMobileMenu }) => {
  if (!isMobileMenuOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 animate-fade-in" onClick={closeMobileMenu}></div>
      
      <div 
        id="mobile-menu"
        className="md:hidden relative z-50 bg-slate-900/98 backdrop-blur-lg border-t border-slate-800/50 shadow-2xl animate-slide-down"
      >
        <div className="px-4 py-6 space-y-6">
          <ul className="space-y-2">
            {NAVIGATION_ITEMS.map((item, index) => (
              <MobileMenuItem 
                key={item.to}
                item={item} 
                index={index} 
                activeSection={activeSection} 
                closeMobileMenu={closeMobileMenu} 
              />
            ))}
          </ul>
          
          <div className="pt-6 border-t border-slate-800/50 animate-slide-in-social">
            <div className="flex space-x-8 justify-center">
              {SOCIAL_LINKS.map((link, index) => (
                <MobileSocialLink key={link.label} link={link} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const Navbar = () => {
  const isScrolled = useScrollDetection();
  const activeSection = useActiveSection();
  const { isMobileMenuOpen, toggleMobileMenu, closeMobileMenu } = useMobileMenu();

  const navbarClass = `fixed w-full z-50 transition-all duration-300 ${
    isScrolled ? NAVBAR_STYLES.scrolled : NAVBAR_STYLES.transparent
  }`;

  return (
    <>
      <style>{`
        .hamburger-container {
          width: 24px;
          height: 18px;
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .hamburger-line {
          width: 100%;
          height: 2px;
          background: currentColor;
          border-radius: 2px;
          transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
          transform-origin: center;
        }

        .hamburger-line:first-child.active {
          transform: translateY(8px) rotate(45deg);
        }

        .hamburger-line:nth-child(2).active {
          opacity: 0;
          transform: scaleX(0);
        }

        .hamburger-line:last-child.active {
          transform: translateY(-8px) rotate(-45deg);
        }

        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slide-down {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slide-in-0 {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes slide-in-1 {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes slide-in-2 {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes slide-in-3 {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes slide-in-social {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes bounce-in-0 {
          from { opacity: 0; transform: scale(0) rotate(-180deg); }
          to { opacity: 1; transform: scale(1) rotate(0deg); }
        }

        @keyframes bounce-in-1 {
          from { opacity: 0; transform: scale(0) rotate(-180deg); }
          to { opacity: 1; transform: scale(1) rotate(0deg); }
        }

        .animate-fade-in { animation: fade-in 0.3s ease-out; }
        .animate-slide-down { animation: slide-down 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55); }
        .animate-slide-in-0 { animation: slide-in-0 0.5s ease-out 0.1s both; }
        .animate-slide-in-1 { animation: slide-in-1 0.5s ease-out 0.2s both; }
        .animate-slide-in-2 { animation: slide-in-2 0.5s ease-out 0.3s both; }
        .animate-slide-in-3 { animation: slide-in-3 0.5s ease-out 0.4s both; }
        .animate-slide-in-social { animation: slide-in-social 0.6s ease-out 0.5s both; }
        .animate-bounce-in-0 { animation: bounce-in-0 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) 0.6s both; }
        .animate-bounce-in-1 { animation: bounce-in-1 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) 0.7s both; }
      `}</style>

      <nav className={navbarClass}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center">
            <Logo />
            <DesktopNavigation activeSection={activeSection} />
            <HamburgerButton 
              isMobileMenuOpen={isMobileMenuOpen} 
              toggleMobileMenu={toggleMobileMenu} 
            />
          </div>
        </div>
        
        <MobileMenu 
          isMobileMenuOpen={isMobileMenuOpen} 
          activeSection={activeSection} 
          closeMobileMenu={closeMobileMenu} 
        />
      </nav>
    </>
  );
};

export default Navbar;
