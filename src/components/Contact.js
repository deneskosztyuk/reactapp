import { useState, useEffect, useRef } from "react";
import { FaLinkedin, FaGithub, FaEnvelope, FaUser, FaPaperPlane } from "react-icons/fa";

const FORM_CONFIG = {
  ACCESS_KEY: process.env.REACT_APP_WEB3FORMS_ACCESS_KEY,
  API_ENDPOINT: "https://api.web3forms.com/submit"
};

const MATH_CONFIG = {
  MAX_NUMBER: 15,
  MAX_SMALL_NUMBER: 8,
  OPERATIONS: ['+', '-', '×']
};

const SOCIAL_LINKS = [
  {
    href: "https://www.linkedin.com/in/deneskosztyuk/",
    icon: <FaLinkedin />,
    label: "LinkedIn"
  },
  {
    href: "https://github.com/deneskosztyuk",
    icon: <FaGithub />,
    label: "GitHub"
  }
];

const BUTTON_BASE_CLASS = "w-full flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-700 text-white font-medium rounded-lg hover:from-cyan-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-[1.02] shadow-lg shadow-cyan-500/25";

const createFormData = (formValues, selectedFile = null) => {
  const formData = new FormData();
  const trimmedName = formValues.name.trim();
  
  formData.append("access_key", FORM_CONFIG.ACCESS_KEY);
  formData.append("name", trimmedName);
  formData.append("email", formValues.email.trim());
  formData.append("message", formValues.message.trim());
  formData.append("subject", `New Contact Form Submission from ${trimmedName}`);
  formData.append("botcheck", "");
  formData.append("replyto", formValues.email.trim());
  formData.append("from_name", trimmedName);
  
  if (selectedFile) {
    formData.append("attachment", selectedFile);
  }
  
  return formData;
};

const createJsonPayload = (formValues) => ({
  access_key: FORM_CONFIG.ACCESS_KEY,
  name: formValues.name.trim(),
  email: formValues.email.trim(),
  message: formValues.message.trim(),
  subject: `New Contact Form Submission from ${formValues.name.trim()}`,
  replyto: formValues.email.trim(),
  from_name: formValues.name.trim(),
  botcheck: ""
});

const useFormState = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [selectedFile, setSelectedFile] = useState(null);
  const [honeypot, setHoneypot] = useState("");

  const handleInputChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const resetForm = () => {
    setForm({ name: "", email: "", message: "" });
    setSelectedFile(null);
    setHoneypot("");
  };

  const isFormValid = () => {
    return form.name.trim() && form.email.trim() && form.message.trim();
  };

  return {
    form,
    selectedFile,
    honeypot,
    handleInputChange,
    setHoneypot,
    resetForm,
    isFormValid
  };
};

const useMathChallenge = () => {
  const [mathChallenge, setMathChallenge] = useState({ question: "", answer: 0 });
  const [userAnswer, setUserAnswer] = useState("");
  const [mathError, setMathError] = useState(false);

  const operations = {
    '+': (a, b) => ({ answer: a + b, question: `${a} + ${b}` }),
    '-': (a, b) => {
      const larger = Math.max(a, b);
      const smaller = Math.min(a, b);
      return { answer: larger - smaller, question: `${larger} - ${smaller}` };
    },
    '×': (a, b) => ({ answer: a * b, question: `${a} × ${b}` })
  };

  const generateMathChallenge = () => {
    const operation = MATH_CONFIG.OPERATIONS[Math.floor(Math.random() * MATH_CONFIG.OPERATIONS.length)];
    
    let num1, num2;
    if (operation === '×') {
      num1 = Math.floor(Math.random() * MATH_CONFIG.MAX_SMALL_NUMBER) + 1;
      num2 = Math.floor(Math.random() * MATH_CONFIG.MAX_SMALL_NUMBER) + 1;
    } else {
      num1 = Math.floor(Math.random() * MATH_CONFIG.MAX_NUMBER) + 1;
      num2 = Math.floor(Math.random() * MATH_CONFIG.MAX_NUMBER) + 1;
    }

    const { answer, question } = operations[operation](num1, num2);
    
    setMathChallenge({ question, answer });
    setUserAnswer("");
    setMathError(false);
  };

  const validateAnswer = () => parseInt(userAnswer) === mathChallenge.answer;

  const handleAnswerChange = (value) => {
    setUserAnswer(value);
    setMathError(false);
  };

  const resetChallenge = () => {
    setUserAnswer("");
    setMathError(false);
  };

  return {
    mathChallenge,
    userAnswer,
    mathError,
    generateMathChallenge,
    validateAnswer,
    handleAnswerChange,
    setMathError,
    resetChallenge
  };
};

const useFormSubmission = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const submitWithFormData = async (formValues, selectedFile) => {
    const formData = createFormData(formValues, selectedFile);
    const response = await fetch(FORM_CONFIG.API_ENDPOINT, {
      method: "POST",
      body: formData
    });
    return { response, result: await response.json() };
  };

  const submitWithJson = async (formValues) => {
    const response = await fetch(FORM_CONFIG.API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(createJsonPayload(formValues))
    });
    return { response, result: await response.json() };
  };

  const submitForm = async (formValues, selectedFile) => {
    setIsSubmitting(true);
    setSuccess(null);
    setErrorMessage("");

    try {
      let response, result;

      try {
        ({ response, result } = await submitWithFormData(formValues, selectedFile));
        
        if (response.ok && result.success) {
          setSuccess(true);
          return { success: true };
        }
        
        if (response.status === 400) {
          ({ response, result } = await submitWithJson(formValues));
        }
      } catch (error) {
        ({ response, result } = await submitWithJson(formValues));
      }

      if (response.ok && result.success) {
        setSuccess(true);
        return { success: true };
      } else {
        throw new Error(result.message || `HTTP ${response.status}: ${response.statusText}`);
      }

    } catch (error) {
      console.error("Form submission error:", error);
      setSuccess(false);
      setErrorMessage(error.message || "Failed to send message. Please try the direct contact links below.");
      return { success: false, error: error.message };
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    success,
    errorMessage,
    submitForm,
    setSuccess,
    setErrorMessage
  };
};

const SectionHeader = () => (
  <div className="space-y-6 mb-16">
    {/* Section number indicator */}
    <div className="flex items-center justify-center gap-3 text-sm text-gray-400 tracking-widest">
      <span className="w-8 h-px bg-gray-600"></span>
      <span>04</span>
      <span className="font-light font-mono">// contact</span>
      <span className="w-8 h-px bg-gray-600"></span>
    </div>

    <h1 className="text-[clamp(2rem,8vw,4rem)] font-bold text-white tracking-tight">
      LET'S{" "}
      <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-transparent bg-clip-text">
        CONNECT
      </span>
    </h1>
    
    <p className="text-base sm:text-lg text-gray-400 leading-relaxed max-w-2xl mx-auto font-light">
      Have a project in mind or want to collaborate? Drop me a message below or connect via social media.
    </p>
  </div>
);

const HoneypotField = ({ value, onChange }) => (
  <input
    type="text"
    name="botcheck"
    value={value}
    onChange={onChange}
    style={{ 
      position: 'absolute', 
      left: '-9999px', 
      opacity: 0, 
      pointerEvents: 'none' 
    }}
    tabIndex="-1"
    autoComplete="off"
  />
);

const FormField = ({ type = "text", name, placeholder, value, onChange, rows, required = false, icon, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const Component = type === "textarea" ? "textarea" : "input";

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);
  
  return (
    <div className={`relative group transition-all duration-700 ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
    }`}>
      {icon && (
        <div className="absolute left-4 top-4 text-white/50 group-focus-within:text-cyan-400 transition-all duration-300 group-focus-within:scale-110">
          {icon}
        </div>
      )}
      <Component
        type={type === "textarea" ? undefined : type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        rows={type === "textarea" ? rows : undefined}
        className={`w-full ${icon ? 'pl-12' : 'pl-4'} pr-4 py-4 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:bg-white/[0.07] focus:shadow-lg focus:shadow-cyan-500/10 transition-all duration-300 resize-none`}
        required={required}
      />
    </div>
  );
};

const SubmitButton = ({ isSubmitting, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <button
      type="submit"
      disabled={isSubmitting}
      className={`${BUTTON_BASE_CLASS} ${isSubmitting ? 'opacity-50 transform-none' : ''} transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
      <FaPaperPlane className="w-4 h-4" />
    </button>
  );
};

const StatusMessage = ({ success, errorMessage }) => {
  if (success === true) {
    return (
      <div className="mt-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-center text-green-400 animate-fade-in-up">
        <div className="font-semibold mb-1">Message Sent Successfully!</div>
        <div className="text-sm text-green-300">Thank you for reaching out. I'll get back to you soon.</div>
      </div>
    );
  }

  if (success === false) {
    return (
      <div className="mt-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-center text-red-400 animate-fade-in-up">
        <div className="font-semibold mb-2">Message Failed to Send</div>
        {errorMessage && (
          <p className="text-sm mb-2 text-red-300">{errorMessage}</p>
        )}
        <p className="text-sm text-red-300">Please try using the direct contact links instead.</p>
      </div>
    );
  }

  return null;
};

const SocialLinks = () => {
  const [visibleLinks, setVisibleLinks] = useState([]);

  useEffect(() => {
    SOCIAL_LINKS.forEach((_, index) => {
      setTimeout(() => {
        setVisibleLinks(prev => [...prev, index]);
      }, 800 + (index * 150));
    });
  }, []);

  return (
    <div className="mt-12 flex justify-center gap-6">
      {SOCIAL_LINKS.map((link, index) => (
        <a
          key={index}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`w-12 h-12 flex items-center justify-center bg-white/5 border border-white/10 rounded-lg text-gray-400 hover:text-cyan-400 hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-all duration-300 hover:scale-110 hover:-translate-y-1 text-xl ${
            visibleLinks.includes(index)
              ? 'opacity-100 scale-100'
              : 'opacity-0 scale-50'
          }`}
          aria-label={link.label}
          style={{ transition: 'all 0.5s ease-out' }}
        >
          {link.icon}
        </a>
      ))}
    </div>
  );
};

const ContactForm = ({ formState, formSubmission, onSubmit }) => {
  const [isVisible, setIsVisible] = useState(false);
  const formRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    if (formRef.current) {
      observer.observe(formRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={formRef}
      className={`max-w-2xl mx-auto transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
    >
      <h2 
        className={`text-xl font-semibold text-white mb-6 tracking-wide uppercase text-sm transition-all duration-700 delay-200 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        Send a Message
      </h2>
      
      <form className="space-y-5" onSubmit={onSubmit}>
        <HoneypotField 
          value={formState.honeypot} 
          onChange={(e) => formState.setHoneypot(e.target.value)} 
        />
        
        <FormField
          name="name"
          placeholder="Your Name"
          value={formState.form.name}
          onChange={formState.handleInputChange}
          icon={<FaUser />}
          required
          delay={isVisible ? 300 : 0}
        />
        
        <FormField
          type="email"
          name="email"
          placeholder="Your Email"
          value={formState.form.email}
          onChange={formState.handleInputChange}
          icon={<FaEnvelope />}
          required
          delay={isVisible ? 400 : 0}
        />
        
        <FormField
          type="textarea"
          name="message"
          placeholder="Your Message"
          rows="6"
          value={formState.form.message}
          onChange={formState.handleInputChange}
          required
          delay={isVisible ? 500 : 0}
        />
        
        <SubmitButton isSubmitting={formSubmission.isSubmitting} delay={isVisible ? 600 : 0} />
      </form>

      <StatusMessage 
        success={formSubmission.success} 
        errorMessage={formSubmission.errorMessage} 
      />
    </div>
  );
};

const MathVerificationPopup = ({ 
  isVisible, 
  mathChallenge, 
  userAnswer, 
  mathError, 
  isSubmitting,
  onAnswerChange, 
  onVerify, 
  onClose, 
  onGenerateNew 
}) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-slate-900/95 border border-cyan-500/30 rounded-xl p-8 max-w-md w-full shadow-2xl shadow-cyan-500/20 animate-scale-in">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-white mb-3 animate-bounce-gentle">
            BEEP...BOOP 🤖
          </h3>
          <p className="text-gray-400 text-sm">
            Solve this simple math problem to prove you're human!
          </p>
        </div>
        
        <div className="text-center mb-6">
          <div className="text-4xl font-bold text-cyan-400 mb-6 font-mono">
            {mathChallenge.question} = ?
          </div>
          
          <input
            type="number"
            inputMode="numeric"
            pattern="[0-9]*"
            value={userAnswer}
            onChange={(e) => onAnswerChange(e.target.value)}
            placeholder="Your answer"
            className={`w-full p-4 bg-white/5 border rounded-lg text-white placeholder-gray-500 text-center text-xl focus:outline-none transition-all duration-300 ${
              mathError ? 'border-red-500/50 bg-red-500/10 animate-shake' : 'border-white/10 focus:border-cyan-500/50 focus:shadow-lg focus:shadow-cyan-500/20'
            }`}
            autoFocus
          />
          
          {mathError && (
            <p className="text-red-400 text-sm mt-3 animate-fade-in-up">
              Incorrect answer. Please try again.
            </p>
          )}
        </div>
        
        <div className="flex flex-col gap-3">
          <button
            onClick={onVerify}
            className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-700 text-white rounded-lg hover:from-cyan-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-[1.02] shadow-lg shadow-cyan-500/25 disabled:opacity-50 disabled:transform-none font-medium"
            disabled={!userAnswer || isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Verify & Send"}
          </button>
          <button
            onClick={onClose}
            className="px-6 py-3 bg-white/5 border border-white/10 text-gray-300 rounded-lg hover:bg-white/10 transition-all duration-300 disabled:opacity-50"
            disabled={isSubmitting}
          >
            Cancel
          </button>
        </div>
        
        <div className="text-center mt-4">
          <button
            onClick={onGenerateNew}
            className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
            disabled={isSubmitting}
          >
            Generate new problem
          </button>
        </div>
      </div>
    </div>
  );
};

const AnimationStyles = () => (
  <style jsx>{`
    @keyframes fade-in {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes fade-in-up {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes scale-in {
      from {
        opacity: 0;
        transform: scale(0.9);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }

    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      25% { transform: translateX(-10px); }
      75% { transform: translateX(10px); }
    }

    @keyframes bounce-gentle {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-5px); }
    }

    .animate-fade-in {
      animation: fade-in 0.3s ease-out;
    }

    .animate-fade-in-up {
      animation: fade-in-up 0.5s ease-out;
    }

    .animate-scale-in {
      animation: scale-in 0.3s ease-out;
    }

    .animate-shake {
      animation: shake 0.5s ease-out;
    }

    .animate-bounce-gentle {
      animation: bounce-gentle 1s ease-in-out infinite;
    }
  `}</style>
);

export default function Contact() {
  const formState = useFormState();
  const mathChallenge = useMathChallenge();
  const formSubmission = useFormSubmission();
  const [showMathPopup, setShowMathPopup] = useState(false);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    
    if (formState.honeypot) {
      console.log("Bot detected via honeypot");
      return;
    }
    
    if (!formState.isFormValid()) {
      formSubmission.setSuccess(false);
      formSubmission.setErrorMessage("Please fill in all required fields.");
      return;
    }
    
    mathChallenge.generateMathChallenge();
    setShowMathPopup(true);
    formSubmission.setErrorMessage("");
  };

  const handleMathVerification = async () => {
    if (mathChallenge.validateAnswer()) {
      setShowMathPopup(false);
      
      const result = await formSubmission.submitForm(formState.form, formState.selectedFile);
      
      if (result.success) {
        formState.resetForm();
        mathChallenge.resetChallenge();
      }
    } else {
      mathChallenge.setMathError(true);
    }
  };

  const handlePopupClose = () => {
    setShowMathPopup(false);
    mathChallenge.resetChallenge();
  };

  return (
    <>
      <section 
        id="contact" 
        className="min-h-screen py-20 sm:py-24 px-6 sm:px-12"
      >
        <div className="w-full max-w-4xl mx-auto text-center">
          <SectionHeader />
          
          <ContactForm 
            formState={formState}
            formSubmission={formSubmission}
            onSubmit={handleFormSubmit}
          />

          <SocialLinks />
        </div>
      </section>

      <MathVerificationPopup
        isVisible={showMathPopup}
        mathChallenge={mathChallenge.mathChallenge}
        userAnswer={mathChallenge.userAnswer}
        mathError={mathChallenge.mathError}
        isSubmitting={formSubmission.isSubmitting}
        onAnswerChange={mathChallenge.handleAnswerChange}
        onVerify={handleMathVerification}
        onClose={handlePopupClose}
        onGenerateNew={mathChallenge.generateMathChallenge}
      />

      <AnimationStyles />
    </>
  );
}
