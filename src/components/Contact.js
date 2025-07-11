import { useState, useEffect } from "react";
import { FaLinkedin, FaGithub } from "react-icons/fa";

// ===== CONSTANTS =====
const FORM_CONFIG = {
  ACCESS_KEY: "722cd945-9473-4c48-a538-7502a3ceaf27",
  API_ENDPOINT: "https://api.web3forms.com/submit"
};

const STARS_CONFIG = {
  COUNT: 200,
  MIN_SIZE: 1,
  MAX_SIZE: 4,
  MIN_OPACITY: 0.3,
  MAX_OPACITY: 0.6,
  MAX_ANIMATION_DELAY: 10
};

const MATH_CONFIG = {
  MAX_NUMBER: 15,
  MAX_SMALL_NUMBER: 8,
  OPERATIONS: ['+', '-', '×']
};

const STYLES = {
  section: "h-screen flex flex-col justify-center items-center px-6 md:px-20 bg-slate-950 text-white relative overflow-hidden",
  starBackground: "absolute inset-0",
  heading: "text-center relative z-10",
  form: "mt-10 w-full max-w-lg bg-gray-800/60 p-6 rounded-lg shadow-lg flex flex-col gap-4 relative z-10",
  input: "p-3 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500",
  submitButton: "bg-slate-800 hover:bg-purple-600 text-white font-bold py-2 px-6 rounded-md transition-all",
  socialLinks: "mt-8 flex space-x-6 relative z-10",
  popup: "fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4",
  popupContent: "bg-slate-800 p-6 sm:p-8 rounded-xl border border-slate-600 max-w-md w-full mx-4 relative z-50"
};

// ===== UTILITY FUNCTIONS =====
const generateRandomInRange = (min, max) => Math.random() * (max - min) + min;

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

// ===== CUSTOM HOOKS =====
const useStarField = () => {
  const [staticStars, setStaticStars] = useState([]);

  useEffect(() => {
    const generateStars = () => {
      return Array.from({ length: STARS_CONFIG.COUNT }, (_, index) => ({
        id: `star-${index}`,
        size: generateRandomInRange(STARS_CONFIG.MIN_SIZE, STARS_CONFIG.MAX_SIZE),
        left: Math.random() * 100,
        top: Math.random() * 100,
        opacity: generateRandomInRange(STARS_CONFIG.MIN_OPACITY, STARS_CONFIG.MAX_OPACITY),
        animationDelay: `${Math.random() * STARS_CONFIG.MAX_ANIMATION_DELAY}s`,
      }));
    };

    setStaticStars(generateStars());
  }, []);

  return staticStars;
};

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

  const generateMathChallenge = () => {
    const operations = {
      '+': (a, b) => ({ answer: a + b, question: `${a} + ${b}` }),
      '-': (a, b) => {
        const larger = Math.max(a, b);
        const smaller = Math.min(a, b);
        return { answer: larger - smaller, question: `${larger} - ${smaller}` };
      },
      '×': (a, b) => ({ answer: a * b, question: `${a} × ${b}` })
    };

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

  const validateAnswer = () => {
    return parseInt(userAnswer) === mathChallenge.answer;
  };

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

      // Try FormData first
      try {
        ({ response, result } = await submitWithFormData(formValues, selectedFile));
        
        if (response.ok && result.success) {
          setSuccess(true);
          return { success: true };
        }
        
        // Fallback to JSON if FormData fails with 400
        if (response.status === 400) {
          ({ response, result } = await submitWithJson(formValues));
        }
      } catch (error) {
        // Network error, try JSON fallback
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

const useMathVerificationPopup = () => {
  const [showMathPopup, setShowMathPopup] = useState(false);

  const openPopup = () => setShowMathPopup(true);
  const closePopup = () => setShowMathPopup(false);

  return { showMathPopup, openPopup, closePopup };
};

// ===== COMPONENTS =====
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

const StarField = ({ stars }) => (
  <div className={STYLES.starBackground}>
    {stars.map((star) => (
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
);

const ContactHeader = () => (
  <div className={STYLES.heading}>
    <h1 className="text-2xl md:text-3xl font-bold">Let's Connect! 🤝</h1>
    <p className="mt-4 text-sm text-gray-300">
      Interested in working together? Fill out the form or reach out directly.
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

const FormField = ({ type = "text", name, placeholder, value, onChange, rows, required = false }) => {
  const Component = type === "textarea" ? "textarea" : "input";
  
  return (
    <Component
      type={type === "textarea" ? undefined : type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      rows={type === "textarea" ? rows : undefined}
      className={STYLES.input}
      required={required}
    />
  );
};

const SubmitButton = ({ isSubmitting }) => (
  <div className="flex justify-center">
    <button
      type="submit"
      disabled={isSubmitting}
      className={`${STYLES.submitButton} ${
        isSubmitting ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {isSubmitting ? "Sending..." : "Send"}
    </button>
  </div>
);

const StatusMessages = ({ success, errorMessage }) => (
  <>
    {success === true && (
      <div className="mt-4 text-green-400 text-center relative z-10">
        Thank you! Your message has been sent. 🚀
      </div>
    )}
    {success === false && (
      <div className="mt-4 text-red-400 text-center relative z-10 max-w-lg">
        <p className="font-semibold">Message sending failed</p>
        {errorMessage && (
          <p className="text-sm mt-1 text-red-300">{errorMessage}</p>
        )}
        <p className="text-sm mt-2">Please try the direct contact links below:</p>
      </div>
    )}
  </>
);

const SocialLinks = () => (
  <div className={STYLES.socialLinks}>
    <ContactLink
      icon={<FaLinkedin />}
      label="LinkedIn"
      href="https://www.linkedin.com/in/deneskosztyuk/"
    />
    <ContactLink
      icon={<FaGithub />}
      label="GitHub"
      href="https://github.com/deneskosztyuk"
    />
  </div>
);

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
    <div className={STYLES.popup}>
      <div className={STYLES.popupContent}>
        <div className="text-center mb-6">
          <h3 className="text-lg sm:text-xl font-bold text-white mb-2">Security Verification</h3>
          <p className="text-sm sm:text-base text-gray-300">
            Please solve this simple math problem to verify you're human
          </p>
        </div>
        
        <div className="text-center mb-6">
          <div className="text-2xl sm:text-3xl font-bold text-blue-300 mb-4">
            {mathChallenge.question} = ?
          </div>
          
          <input
            type="number"
            inputMode="numeric"
            pattern="[0-9]*"
            value={userAnswer}
            onChange={(e) => onAnswerChange(e.target.value)}
            placeholder="Enter your answer"
            className={`w-full p-3 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 text-center text-lg ${
              mathError ? 'ring-red-500 border-red-500' : 'focus:ring-blue-500'
            }`}
            autoFocus
          />
          
          {mathError && (
            <p className="text-red-400 text-sm mt-2">
              ❌ That's not correct. Please try again.
            </p>
          )}
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={onVerify}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium disabled:opacity-50"
            disabled={!userAnswer || isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Verify & Send"}
          </button>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
            disabled={isSubmitting}
          >
            Cancel
          </button>
        </div>
        
        <div className="text-center mt-4">
          <button
            onClick={onGenerateNew}
            className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
            disabled={isSubmitting}
          >
            🔄 Generate new problem
          </button>
        </div>
      </div>
    </div>
  );
};

// ===== MAIN COMPONENT =====
export default function Contact() {
  const stars = useStarField();
  const formState = useFormState();
  const mathChallenge = useMathChallenge();
  const formSubmission = useFormSubmission();
  const mathPopup = useMathVerificationPopup();

  const handleFormSubmit = (event) => {
    event.preventDefault();
    
    // Bot detection
    if (formState.honeypot) {
      console.log("Bot detected via honeypot");
      return;
    }
    
    // Form validation
    if (!formState.isFormValid()) {
      formSubmission.setSuccess(false);
      formSubmission.setErrorMessage("Please fill in all required fields.");
      return;
    }
    
    // Show math verification
    mathChallenge.generateMathChallenge();
    mathPopup.openPopup();
    formSubmission.setErrorMessage("");
  };

  const handleMathVerification = async () => {
    if (mathChallenge.validateAnswer()) {
      mathPopup.closePopup();
      
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
    mathPopup.closePopup();
    mathChallenge.resetChallenge();
  };

  return (
    <section id="contact" className={STYLES.section}>
      <StarField stars={stars} />
      <ContactHeader />
      
      <form className={STYLES.form} onSubmit={handleFormSubmit}>
        <HoneypotField 
          value={formState.honeypot} 
          onChange={(e) => formState.setHoneypot(e.target.value)} 
        />
        
        <FormField
          name="name"
          placeholder="Full Name"
          value={formState.form.name}
          onChange={formState.handleInputChange}
          required
        />
        
        <FormField
          type="email"
          name="email"
          placeholder="Your Email"
          value={formState.form.email}
          onChange={formState.handleInputChange}
          required
        />
        
        <FormField
          type="textarea"
          name="message"
          placeholder="Your Message"
          rows="4"
          value={formState.form.message}
          onChange={formState.handleInputChange}
          required
        />
        
        <SubmitButton isSubmitting={formSubmission.isSubmitting} />
      </form>

      <StatusMessages 
        success={formSubmission.success} 
        errorMessage={formSubmission.errorMessage} 
      />
      
      <SocialLinks />

      <MathVerificationPopup
        isVisible={mathPopup.showMathPopup}
        mathChallenge={mathChallenge.mathChallenge}
        userAnswer={mathChallenge.userAnswer}
        mathError={mathChallenge.mathError}
        isSubmitting={formSubmission.isSubmitting}
        onAnswerChange={mathChallenge.handleAnswerChange}
        onVerify={handleMathVerification}
        onClose={handlePopupClose}
        onGenerateNew={mathChallenge.generateMathChallenge}
      />

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
