import { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { FaGithub, FaLinkedin } from "react-icons/fa";

// Constants
const NAVIGATION_ITEMS = [
  { to: "hero", label: "Home" },
  { to: "work-experience", label: "Work Experience" },
  { to: "projects", label: "Projects" },
  { to: "contact", label: "Contact Form" }
];

const SOCIAL_LINKS = [
  {
    href: "https://github.com/deneskosztyuk",
    icon: FaGithub,
    label: "GitHub"
  },
  {
    href: "https://www.linkedin.com/in/deneskosztyuk/",
    icon: FaLinkedin,
    label: "LinkedIn"
  }
];

const ANIMATION_DURATION = {
  WAVE: 2000,
  SCROLL: 600,
  MENU_TRANSITION: 300,
  HAMBURGER: 400
};

const STYLES = {
  navbar: "fixed top-0 left-1/2 transform -translate-x-1/2 w-full bg-white/10 backdrop-blur-md shadow-md p-4 z-50",
  container: "max-w-6xl mx-auto flex justify-between items-center",
  welcomeSection: "text-white text-lg flex items-center space-x-4 font-semibold px-1 py-1 cursor-pointer",
  waveEmoji: "inline-block transition-transform",
  socialLink: "text-white hover:text-purple-600 transition-colors text-2xl",
  hamburgerButton: "md:hidden relative w-12 h-12 flex flex-col justify-center items-center cursor-pointer group rounded-lg hover:bg-white/10 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-transparent",
  desktopMenu: "hidden md:flex space-x-6",
  mobileMenuContainer: "md:hidden absolute top-16 right-0 w-full bg-slate-800/95 backdrop-blur-lg shadow-2xl transform transition-all duration-500 ease-out overflow-hidden border-t border-purple-500/20",
  mobileMenuContent: "flex flex-col space-y-3 p-6"
};

// Custom Hook for Wave Animation
const useWaveAnimation = () => {
  const [isWaving, setIsWaving] = useState(false);

  const triggerWave = () => setIsWaving(true);

  useEffect(() => {
    if (isWaving) {
      const timer = setTimeout(() => setIsWaving(false), ANIMATION_DURATION.WAVE);
      return () => clearTimeout(timer);
    }
  }, [isWaving]);

  return { isWaving, triggerWave };
};

// Custom Hook for Mobile Menu
const useMobileMenu = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(prev => !prev);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return { isMobileMenuOpen, toggleMobileMenu, closeMobileMenu };
};

// Welcome Section Component
const WelcomeSection = ({ isWaving, onWaveInteraction }) => (
  <div
    className={STYLES.welcomeSection}
    onMouseEnter={onWaveInteraction}
    onClick={onWaveInteraction}
  >
    <WelcomeText isWaving={isWaving} />
    <SocialLinks />
  </div>
);

// Welcome Text Component
const WelcomeText = ({ isWaving }) => (
  <>
    Welcome{" "}
    <span className={`${STYLES.waveEmoji} ${isWaving ? "animate-wave" : ""}`}>
      👋
    </span>
  </>
);

// Social Links Component
const SocialLinks = () => (
  <>
    {SOCIAL_LINKS.map(({ href, icon: Icon, label }) => (
      <SocialLink
        key={label}
        href={href}
        icon={<Icon />}
        label={label}
      />
    ))}
  </>
);

// Individual Social Link Component
const SocialLink = ({ href, icon, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={STYLES.socialLink}
    aria-label={label}
  >
    {icon}
  </a>
);

// Modern Animated Hamburger Menu Button Component
const HamburgerButton = ({ isOpen, onClick }) => {
  return (
    <button
      className={STYLES.hamburgerButton}
      onClick={onClick}
      aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
      aria-expanded={isOpen}
      aria-controls="mobile-navigation"
      type="button"
    >
      <div className="relative w-6 h-6 flex flex-col justify-center items-center">
        {/* Top bar */}
        <span
          className={`absolute h-0.5 w-6 bg-white rounded-full transform transition-all duration-300 ease-in-out ${
            isOpen
              ? "rotate-45 translate-y-0"
              : "-translate-y-2 group-hover:w-5"
          }`}
        />
        
        {/* Middle bar */}
        <span
          className={`absolute h-0.5 w-6 bg-white rounded-full transform transition-all duration-300 ease-in-out ${
            isOpen
              ? "opacity-0 scale-0"
              : "opacity-100 scale-100 group-hover:w-4"
          }`}
        />
        
        {/* Bottom bar */}
        <span
          className={`absolute h-0.5 w-6 bg-white rounded-full transform transition-all duration-300 ease-in-out ${
            isOpen
              ? "-rotate-45 translate-y-0"
              : "translate-y-2 group-hover:w-5"
          }`}
        />
      </div>
      
      {/* Ripple effect on click */}
      <div
        className={`absolute inset-0 rounded-lg bg-purple-500/20 transform scale-0 transition-transform duration-150 ${
          isOpen ? "scale-100" : ""
        }`}
      />
    </button>
  );
};

// Desktop Navigation Component
const DesktopNavigation = () => (
  <nav className={STYLES.desktopMenu}>
    {NAVIGATION_ITEMS.map(({ to, label }) => (
      <NavItem key={to} to={to} label={label} />
    ))}
  </nav>
);

// Enhanced Mobile Navigation Component
const MobileNavigation = ({ isOpen, onClose }) => {
  return (
    <div
      id="mobile-navigation"
      className={`${STYLES.mobileMenuContainer} ${
        isOpen 
          ? "opacity-100 translate-y-4 max-h-96" 
          : "opacity-0 -translate-y-4 max-h-0"
      }`}
      aria-hidden={!isOpen}
    >
      <nav className={STYLES.mobileMenuContent}>
        {NAVIGATION_ITEMS.map(({ to, label }, index) => (
          <div
            key={to}
            className={`transform transition-all duration-300 ease-out ${
              isOpen 
                ? "translate-x-0 opacity-100" 
                : "translate-x-8 opacity-0"
            }`}
            style={{ 
              transitionDelay: isOpen ? `${index * 50}ms` : "0ms" 
            }}
          >
            <NavItem to={to} label={label} onClick={onClose} isMobile />
          </div>
        ))}
        
        {/* Mobile Social Links */}
        <div
          className={`flex justify-center space-x-6 mt-6 pt-4 border-t border-purple-500/20 transform transition-all duration-300 ease-out ${
            isOpen 
              ? "translate-x-0 opacity-100" 
              : "translate-x-8 opacity-0"
          }`}
          style={{ 
            transitionDelay: isOpen ? `${NAVIGATION_ITEMS.length * 50}ms` : "0ms" 
          }}
        >
          
        </div>
      </nav>
    </div>
  );
};

// Enhanced Navigation Item Component
const NavItem = ({ to, label, onClick, isMobile = false }) => {
  const baseClasses = "relative cursor-pointer transition-all duration-300";
  const desktopClasses = `
    text-white px-4 py-2 bg-slate-800 rounded-lg shadow-lg
    hover:bg-purple-700 focus:bg-purple-700
    after:content-[''] after:absolute after:left-4 after:right-4 after:bottom-2 after:h-[2px]
    after:bg-purple-400 after:scale-x-0 after:transition-transform after:duration-300 after:origin-left
    hover:after:scale-x-100 focus:after:scale-x-100
  `;
  const mobileClasses = `
    text-white/90 hover:text-white px-4 py-3 rounded-xl hover:bg-purple-600/20
    border border-transparent hover:border-purple-500/30
    transform hover:scale-105 focus:scale-105 focus:outline-none
    focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-800
  `;

  const navItemClasses = `${baseClasses} ${isMobile ? mobileClasses : desktopClasses}`;

  return (
    <Link
      to={to}
      smooth={true}
      duration={ANIMATION_DURATION.SCROLL}
      onClick={onClick}
      className={navItemClasses}
    >
      {label}
    </Link>
  );
};

// Main Navbar Component
const Navbar = () => {
  const { isWaving, triggerWave } = useWaveAnimation();
  const { isMobileMenuOpen, toggleMobileMenu, closeMobileMenu } = useMobileMenu();

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && !event.target.closest('nav')) {
        closeMobileMenu();
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMobileMenuOpen, closeMobileMenu]);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape' && isMobileMenuOpen) {
        closeMobileMenu();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMobileMenuOpen, closeMobileMenu]);

  return (
    <nav className={STYLES.navbar}>
      <div className={STYLES.container}>
        <WelcomeSection 
          isWaving={isWaving} 
          onWaveInteraction={triggerWave} 
        />
        
        <HamburgerButton 
          isOpen={isMobileMenuOpen} 
          onClick={toggleMobileMenu} 
        />
        
        <DesktopNavigation />
        
        <MobileNavigation 
          isOpen={isMobileMenuOpen} 
          onClose={closeMobileMenu} 
        />
      </div>
    </nav>
  );
};  

export default Navbar;
