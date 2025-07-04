import { useState, useEffect } from "react";
import { FaLinkedin, FaGithub, FaPaperclip } from "react-icons/fa";

// Reusable ContactLink component
const ContactLink = ({ icon, label, href }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center space-x-2 text-gray-300 hover:text-white transition-all"
  >
    <span className="text-xl">{icon}</span>
    <span>{label}</span>
  </a>
);

export default function Contact() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [staticStars, setStaticStars] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(null);

  // Generate static stars for the background
  useEffect(() => {
    const starsArray = Array.from({ length: 200 }, (_, index) => ({
      id: `star-${index}`,
      size: Math.random() * 3 + 1,
      left: Math.random() * 100,
      top: Math.random() * 100,
      opacity: Math.random() * 0.5 + 0.5,
      animationDelay: `${Math.random() * 10}s`,
    }));
    setStaticStars(starsArray);
  }, []);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSuccess(null);

    const formData = new FormData();
    formData.append("access_key", "722cd945-9473-4c48-a538-7502a3ceaf27"); 
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("message", form.message);
    if (selectedFile) formData.append("file", selectedFile);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setSuccess(true);
        setForm({ name: "", email: "", message: "" });
        setSelectedFile(null);
      } else {
        setSuccess(false);
      }
    } catch (error) {
      setSuccess(false);
    }
    setIsSubmitting(false);
  };

  return (
    <section
      id="contact"
      className="h-screen flex flex-col justify-center items-center px-6 md:px-20 bg-slate-950 text-white relative overflow-hidden"
    >
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
        <h1 className="text-2xl md:text-3xl font-bold">Let's Connect! 🤝</h1>
        <p className="mt-4 text-sm text-gray-300">
          Interested in working together? Fill out the form or reach out directly.
        </p>
      </div>

      {/* Contact Form */}
      <form
        className="mt-10 w-full max-w-lg bg-gray-800/60 p-6 rounded-lg shadow-lg flex flex-col gap-4 relative z-10"
        onSubmit={onSubmit}
      >
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          className="p-3 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={form.email}
          onChange={handleChange}
          className="p-3 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          required
        />
        <textarea
          name="message"
          placeholder="Your Message"
          rows="4"
          value={form.message}
          onChange={handleChange}
          className="p-3 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          required
        />
        <div className=" flex justify-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`bg-slate-800 hover:bg-purple-600 text-white font-bold py-2 px-6 rounded-md transition-all ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Sending..." : "Send"}
          </button>
        </div>
      </form>

      {/* Success/Error Messages */}
      {success === true && (
        <div className="mt-4 text-green-400 text-center">
          Thank you! Your message has been sent. 🚀
        </div>
      )}
      {success === false && (
        <div className="mt-4 text-red-400 text-center">
          Oops! Something went wrong. Please try again.
        </div>
      )}

      {/* Direct Contact Links */}
      <div className="mt-8 flex space-x-6 relative z-10">
        <ContactLink
          icon={<FaLinkedin />}
          label="LinkedIn"
          href="https://www.linkedin.com/in/denes-kosztyuk-766889198/"
        />
        <ContactLink
          icon={<FaGithub />}
          label="GitHub"
          href="https://github.com/deneskosztyuk"
        />
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
