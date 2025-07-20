import { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { FaGithub, FaLinkedin, FaPowerOff, FaWifi } from "react-icons/fa";

// Constants
const NAVIGATION_ITEMS = [
  { to: "hero", label: "HOME" },
  { to: "work-experience", label: "WORK_EXP" },
  { to: "projects", label: "PROJECTS"},
  { to: "contact", label: "CONTACT" }
];

const SOCIAL_LINKS = [
  {
    href: "https://github.com/deneskosztyuk",
    icon: FaGithub,
    label: "GITHUB_REPO"
  },
  {
    href: "https://www.linkedin.com/in/deneskosztyuk/",
    icon: FaLinkedin,
    label: "LINKEDIN_NET"
  }
];

// Custom Hook for System Status Animation
const useSystemStatus = () => {
  const [systemStatus, setSystemStatus] = useState("INITIALIZING");
  const [signalStrength, setSignalStrength] = useState(0);

  useEffect(() => {
    // Simulate system boot sequence
    const bootSequence = [
      { status: "INITIALIZING", delay: 0 },
      { status: "LOADING", delay: 500 },
      { status: "CONNECTING", delay: 1000 },
      { status: "OPERATIONAL", delay: 1500 }
    ];

    bootSequence.forEach(({ status, delay }) => {
      setTimeout(() => setSystemStatus(status), delay);
    });

    // Animate signal strength
    const signalInterval = setInterval(() => {
      setSignalStrength(prev => (prev + 1) % 6);
    }, 800);

    return () => clearInterval(signalInterval);
  }, []);

  return { systemStatus, signalStrength };
};

// Custom Hook for Mobile Menu
const useMobileMenu = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(prev => !prev);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return { isMobileMenuOpen, toggleMobileMenu, closeMobileMenu };
};

// System Status Display Component
const SystemStatusDisplay = ({ systemStatus, signalStrength }) => (
  <div className="hidden lg:flex items-center space-x-3 text-xs font-mono">
    <div className="flex items-center space-x-1">
      <FaPowerOff className={`text-xs ${systemStatus === "OPERATIONAL" ? "text-green-400" : "text-yellow-400"}`} />
      <span className="text-green-300">{systemStatus}</span>
    </div>
    
    <div className="h-4 w-px bg-green-600"></div>
    
    <div className="flex items-center space-x-1">
      <FaWifi className="text-green-400 text-xs" />
      <SignalStrengthIndicator strength={signalStrength} size="xs" />
    </div>
    
    <div className="text-green-400">
      {new Date().toLocaleTimeString('en-US', { 
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })}
    </div>
  </div>
);

// Signal Strength Indicator
const SignalStrengthIndicator = ({ strength, size = "sm" }) => {
  const bars = 5;
  const filledBars = Math.min(strength, bars);

  return (
    <div className="flex items-end space-x-0.5">
      {Array.from({ length: bars }, (_, i) => (
        <div
          key={i}
          className={`w-0.5 ${size === "xs" ? "h-2" : "h-3"} ${
            i < filledBars ? 'bg-green-400 animate-pulse' : 'bg-gray-600'
          }`}
          style={{ height: `${(i + 1) * (size === "xs" ? 2 : 3)}px` }}
        />
      ))}
    </div>
  );
};

// Technical Welcome Section Component
const TechnicalWelcomeSection = ({ systemStatus }) => (
  <div className="flex items-center space-x-4">
    {/* System ID Badge */}
    <div className="bg-green-900 border border-green-400 px-3 py-1 rounded">
      <span className="text-green-400 font-mono text-xs font-bold">
        SYS_ID: PORTFOLIO_v2.1
      </span>
    </div>
    
    {/* Social Circuit Connections */}
    <div className="hidden md:flex items-center space-x-2">
      {SOCIAL_LINKS.map(({ href, icon: Icon, label }) => (
        <TechnicalSocialLink
          key={label}
          href={href}
          icon={<Icon />}
          label={label}
        />
      ))}
    </div>
  </div>
);

// Technical Social Link Component
const TechnicalSocialLink = ({ href, icon, label }) => (
  <div className="relative group">
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center w-8 h-8 border border-green-400 bg-gray-900 hover:bg-green-900 transition-all duration-300 group-hover:animate-voltage-glow"
      aria-label={label}
    >
      <div className="text-green-400 text-sm group-hover:text-green-300">
        {icon}
      </div>
    </a>
    
    {/* Connection trace */}
    <div className="absolute -bottom-1 left-1/2 w-0.5 h-2 bg-green-400 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    
    {/* Technical label */}
    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300">
      <div className="bg-gray-900 border border-green-400 px-2 py-1 text-xs font-mono text-green-400 whitespace-nowrap">
        {label}
      </div>
    </div>
  </div>
);

// Technical Hamburger Menu Button
const TechnicalHamburgerButton = ({ isOpen, onClick }) => {
  return (
    <button
      className="md:hidden relative w-10 h-10 border border-green-400 bg-gray-900 hover:bg-green-900 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500"
      onClick={onClick}
      aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
    >
      {/* Circuit pattern background */}
      <div className="absolute inset-1 opacity-20">
        <div className="w-full h-full" style={{
          backgroundImage: 'linear-gradient(45deg, #22c55e 25%, transparent 25%), linear-gradient(-45deg, #22c55e 25%, transparent 25%)',
          backgroundSize: '4px 4px'
        }}></div>
      </div>
      
      {/* Menu bars */}
      <div className="relative z-10 flex flex-col justify-center items-center h-full">
        <span className={`block w-4 h-0.5 bg-green-400 transform transition-all duration-300 ${
          isOpen ? 'rotate-45 translate-y-0.5' : '-translate-y-1'
        }`} />
        <span className={`block w-4 h-0.5 bg-green-400 transform transition-all duration-300 ${
          isOpen ? 'opacity-0' : 'opacity-100'
        }`} />
        <span className={`block w-4 h-0.5 bg-green-400 transform transition-all duration-300 ${
          isOpen ? '-rotate-45 -translate-y-0.5' : 'translate-y-1'
        }`} />
      </div>
      
      {/* Status indicator */}
      <div className={`absolute -top-1 -right-1 w-2 h-2 rounded-full ${
        isOpen ? 'bg-red-400 animate-pulse' : 'bg-green-400'
      }`}></div>
    </button>
  );
};

// Desktop Technical Navigation
const DesktopTechnicalNavigation = () => (
  <nav className="hidden md:flex items-center space-x-1">
    {/* Main circuit trace */}
    <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-green-400/20 via-green-400/60 to-green-400/20 transform -translate-y-1/2 -z-10"></div>
    
    {NAVIGATION_ITEMS.map(({ to, label, voltage }, index) => (
      <TechnicalNavItem 
        key={to} 
        to={to} 
        label={label} 
        voltage={voltage}
        index={index}
      />
    ))}
  </nav>
);

// Mobile Technical Navigation
const MobileTechnicalNavigation = ({ isOpen, onClose }) => {
  return (
    <div className={`md:hidden absolute top-full left-0 right-0 bg-slate-950/95 backdrop-blur-lg border-t border-green-400/30 transform transition-all duration-500 ${
      isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
    }`}>
      {/* PCB Pattern Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: `
            radial-gradient(circle at 25px 25px, #22c55e 2px, transparent 2px),
            linear-gradient(#1f2937 1px, transparent 1px),
            linear-gradient(90deg, #1f2937 1px, transparent 1px)
          `,
          backgroundSize: '25px 25px, 25px 25px, 25px 25px'
        }}></div>
      </div>
      
      <nav className="relative z-10 p-6">
        {/* Mobile circuit trace */}
        <svg className="absolute left-4 top-0 w-full h-full pointer-events-none">
          <line 
            x1="8" y1="0" x2="8" y2="100%" 
            stroke="#22c55e" 
            strokeWidth="2" 
            opacity="0.6"
          />
        </svg>
        
        <div className="space-y-4 ml-8">
          {NAVIGATION_ITEMS.map(({ to, label, voltage }, index) => (
            <div
              key={to}
              className={`transform transition-all duration-300 ${
                isOpen ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
              }`}
              style={{ transitionDelay: isOpen ? `${index * 100}ms` : '0ms' }}
            >
              <MobileTechnicalNavItem 
                to={to} 
                label={label} 
                voltage={voltage}
                onClick={onClose} 
              />
            </div>
          ))}
          
          {/* Mobile Social Links */}
          <div className={`pt-4 border-t border-green-400/30 transform transition-all duration-300 ${
            isOpen ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
          }`} style={{ transitionDelay: isOpen ? `${NAVIGATION_ITEMS.length * 100}ms` : '0ms' }}>
            <div className="text-green-400 font-mono text-xs mb-3">EXTERNAL_LINKS:</div>
            <div className="flex space-x-4">
              {SOCIAL_LINKS.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-green-300 hover:text-green-400 transition-colors"
                >
                  <Icon className="text-sm" />
                  <span className="font-mono text-xs">{label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

// Technical Navigation Item for Desktop
const TechnicalNavItem = ({ to, label, voltage, index }) => {
  return (
    <div className="relative group">
      {/* Component housing */}
      <Link
        to={to}
        smooth={true}
        duration={600}
        className="block relative cursor-pointer"
      >
        <div className="bg-gray-900 border border-green-400 px-4 py-2 hover:bg-green-900 transition-all duration-300 group-hover:animate-voltage-glow">
          <div className="font-mono text-xs text-green-100 group-hover:text-white">
            {label}
          </div>
        </div>
        
        {/* Voltage indicator */}
        <div className="absolute -top-2 -right-1 bg-green-400 text-black px-1 text-xs font-mono font-bold">
          {voltage}
        </div>
        
        {/* Connection point */}
        <div className="absolute top-1/2 -left-1 w-2 h-2 bg-green-400 transform -translate-y-1/2 rotate-45"></div>
      </Link>
    </div>
  );
};

// Mobile Technical Navigation Item
const MobileTechnicalNavItem = ({ to, label, voltage, onClick }) => {
  return (
    <Link
      to={to}
      smooth={true}
      duration={600}
      onClick={onClick}
      className="block relative cursor-pointer group"
    >
      <div className="bg-gray-900 border border-green-400 p-3 hover:bg-green-900 transition-all duration-300 relative">
        {/* Component label */}
        <div className="absolute -top-2 left-2 bg-green-400 text-black px-2 py-0.5 text-xs font-mono font-bold">
          COMPONENT_{label}
        </div>
        
        <div className="flex items-center justify-between mt-2">
          <span className="font-mono text-sm text-green-100 group-hover:text-white">
            {label}
          </span>
          <span className="font-mono text-xs text-green-400">
            {voltage}
          </span>
        </div>
        
        {/* Connection trace */}
        <div className="absolute left-0 top-1/2 w-4 h-0.5 bg-green-400 transform -translate-y-1/2 -translate-x-4"></div>
      </div>
    </Link>
  );
};

// Main Technical Navbar Component
const Navbar = () => {
  const { systemStatus, signalStrength } = useSystemStatus();
  const { isMobileMenuOpen, toggleMobileMenu, closeMobileMenu } = useMobileMenu();
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

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

  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 w-full max-w-7xl mx-auto z-50 px-4">
      {/* Main Navigation Container */}
      <div className="relative bg-slate-950/90 backdrop-blur-lg border-2 border-green-400/50 shadow-lg">
        {/* PCB Background Pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="w-full h-full" style={{
            backgroundImage: `
              radial-gradient(circle at 25px 25px, #22c55e 2px, transparent 2px),
              linear-gradient(#1f2937 1px, transparent 1px),
              linear-gradient(90deg, #1f2937 1px, transparent 1px)
            `,
            backgroundSize: '25px 25px, 25px 25px, 25px 25px'
          }}></div>
        </div>

        <div className="relative z-10 flex justify-between items-center p-4">
          <TechnicalWelcomeSection systemStatus={systemStatus} />
          
          <TechnicalHamburgerButton 
            isOpen={isMobileMenuOpen} 
            onClick={toggleMobileMenu} 
          />
          
          <DesktopTechnicalNavigation />
          
          <SystemStatusDisplay 
            systemStatus={systemStatus} 
            signalStrength={signalStrength}
          />
        </div>

        <MobileTechnicalNavigation 
          isOpen={isMobileMenuOpen} 
          onClose={closeMobileMenu} 
        />
      </div>

      {/* Enhanced CSS Animations */}
      <style jsx>{`
        @keyframes voltage-glow {
          0%, 100% { 
            box-shadow: 0 0 5px rgba(34, 197, 94, 0.4);
          }
          50% { 
            box-shadow: 0 0 20px rgba(34, 197, 94, 0.8), 0 0 30px rgba(34, 197, 94, 0.4);
          }
        }

        .animate-voltage-glow {
          animation: voltage-glow 1.5s ease-in-out infinite;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
