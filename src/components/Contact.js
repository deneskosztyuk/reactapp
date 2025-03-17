import { useState, useEffect } from "react";
import { FaEnvelope, FaLinkedin, FaGithub, FaPaperclip } from "react-icons/fa";

export default function Contact() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [staticStars, setStaticStars] = useState([]);

  // Generate static stars for the background
  useEffect(() => {
    const starsArray = Array.from({ length: 200 }, (_, index) => ({
      id: `star-${index}`,
      size: Math.random() * 3 + 1, // Small stars
      left: Math.random() * 100, // Random horizontal position
      top: Math.random() * 100, // Random vertical position
      opacity: Math.random() * 0.5 + 0.5, // Random opacity
      animationDelay: `${Math.random() * 10}s`, // Random twinkle delay
    }));
    setStaticStars(starsArray);
  }, []);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  return (
    <section id="contact" className="h-screen flex flex-col justify-center items-center px-6 md:px-20 bg-slate-950 text-white relative overflow-hidden">
      {/* Static Starry Background */}
      <div className="absolute inset-0">
        {staticStars.map((star) => (
          <div
            key={star.id}
            className="absolute bg-white rounded-full animate-twinkle"
            style={{
              width: `${star.size}px`,
              height: `${star.size}px`,
              top: `${star.top}%`,
              left: `${star.left}%`,
              opacity: star.opacity,
              animationDelay: star.animationDelay,
            }}
          />
        ))}
      </div>

      {/* Contact Heading */}
      <div className="text-center relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold">Let's Connect! 🤝</h1>
        <p className="mt-4 text-lg text-gray-300">
          Interested in working together? Fill out the form or reach out directly.
        </p>
      </div>

      {/* Contact Form */}
      <form className="mt-10 w-full max-w-lg bg-gray-800/60 p-6 rounded-lg shadow-lg flex flex-col gap-4 relative z-10">
        <input type="text" placeholder="Your Name" className="p-3 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500" />
        <input type="email" placeholder="Your Email" className="p-3 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500" />
        <textarea placeholder="Your Message" rows="4" className="p-3 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"></textarea>
        
        {/* Buttons Row */}
        <div className="flex justify-end gap-4">
          {/* Upload File Button */}
          <label className="relative cursor-pointer bg-slate-800 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-md flex items-center space-x-2 transition-all">
            <FaPaperclip />
            <span>{selectedFile ? selectedFile.name : "Upload File"}</span>
            <input type="file" className="hidden" onChange={handleFileChange} />
          </label>

          {/* Send Button */}
          <button type="submit" className="bg-slate-800 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-md transition-all">
            Send
          </button>
        </div>
      </form>

      {/* Direct Contact Links */}
      <div className="mt-8 flex space-x-6 relative z-10">
        <ContactLink icon={<FaLinkedin />} label="LinkedIn" href="https://www.linkedin.com/in/denes-kosztyuk-766889198/" />
        <ContactLink icon={<FaGithub />} label="GitHub" href="https://github.com/deneskosztyuk" />
      </div>

      {/* CSS Animations */}
      <style>
        {`
          @keyframes twinkle {
            0%, 60% { opacity: 0.5; }
            30% { opacity: 1; }
          }

          .animate-twinkle {
            animation: twinkle 2s infinite ease-in-out;
          }
        `}
      </style>
    </section>
  );
}

/* Reusable Contact Link Component */
const ContactLink = ({ icon, label, href }) => (
  <a href={href} target="_blank" rel="noopener noreferrer"
    className="flex items-center space-x-2 text-gray-300 hover:text-white transition-all">
    <span className="text-xl">{icon}</span>
    <span>{label}</span>
  </a>
);