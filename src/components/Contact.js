import { useState, useEffect } from "react";
import { FaLinkedin, FaGithub } from "react-icons/fa";

// Configuration constants
const FORM_CONFIG = {
  ACCESS_KEY: "722cd945-9473-4c48-a538-7502a3ceaf27",
  API_ENDPOINT: "https://api.web3forms.com/submit"
};

const STAR_CONFIG = {
  COUNT: 100,
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

// Utility functions
const generateRandomInRange = (min, max) => Math.random() * (max - min) + min;

const createStar = (index) => ({
  id: `star-${index}`,
  size: generateRandomInRange(STAR_CONFIG.MIN_SIZE, STAR_CONFIG.MAX_SIZE),
  left: Math.random() * 100,
  top: Math.random() * 100,
  opacity: generateRandomInRange(STAR_CONFIG.MIN_OPACITY, STAR_CONFIG.MAX_OPACITY),
  animationDelay: `${Math.random() * STAR_CONFIG.MAX_ANIMATION_DELAY}s`,
});

const generateStars = () => {
  return Array.from({ length: STAR_CONFIG.COUNT }, (_, index) => createStar(index));
};

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

// Custom hooks
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

// Components
const StarryBackground = ({ stars }) => (
  <div className="absolute inset-0">
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
  <div className="text-center mb-12 relative z-10">
    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-mono font-bold mb-4 text-white">
      🤝 Let's Connect
    </h1>
    <p className="text-base sm:text-lg text-white max-w-2xl mx-auto font-mono">
      Interested in reaching out? Fill out the form or reach out directly.
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
      className="p-3 bg-gray-900 border-2 border-green-400 text-green-100 placeholder-green-300 
                 font-mono text-sm focus:outline-none focus:border-green-300 focus:bg-green-900/20 
                 transition-all duration-300"
      required={required}
    />
  );
};

const SubmitButton = ({ isSubmitting }) => (
  <div className="flex justify-center">
    <button
      type="submit"
      disabled={isSubmitting}
      className={`bg-gray-900 border-2 border-green-400 text-green-400 font-mono font-bold 
                  py-3 px-8 transition-all duration-300 hover:bg-green-900 hover:scale-105 
                  ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      {isSubmitting ? "SENDING..." : "SEND_MESSAGE"}
    </button>
  </div>
);

const StatusMessages = ({ success, errorMessage }) => (
  <>
    {success === true && (
      <div className="mt-6 p-4 bg-green-900/30 border-2 border-green-400 text-green-300 
                      text-center relative z-10 font-mono">
        <div className="text-green-400 font-bold">MESSAGE_SENT</div>
        <div className="text-sm mt-1">Thank you! Your message has been transmitted successfully. 🚀</div>
      </div>
    )}
    {success === false && (
      <div className="mt-6 p-4 bg-red-900/30 border-2 border-red-400 text-red-300 
                      text-center relative z-10 font-mono max-w-lg mx-auto">
        <div className="text-red-400 font-bold mb-2">TRANSMISSION_FAILED</div>
        {errorMessage && (
          <p className="text-sm mb-2">{errorMessage}</p>
        )}
        <p className="text-sm">Please use direct contact links below:</p>
      </div>
    )}
  </>
);

const ContactLink = ({ icon, label, href }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center space-x-3 text-green-300 hover:text-green-400 
               transition-all duration-300 hover:scale-110 font-mono"
  >
    <div className="text-xl border-2 border-green-400 p-2 bg-gray-900 hover:bg-green-900 transition-all duration-300">
      {icon}
    </div>
    <span>{label}</span>
  </a>
);

const SocialLinks = () => (
  <div className="mt-8 flex space-x-6 relative z-10">
    <ContactLink
      icon={<FaLinkedin />}
      label="LINKEDIN"
      href="https://www.linkedin.com/in/deneskosztyuk/"
    />
    <ContactLink
      icon={<FaGithub />}
      label="GITHUB"
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
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 border-2 border-green-400 p-6 sm:p-8 max-w-md w-full mx-4 relative z-50">
        <div className="text-center mb-6">
          <h3 className="text-lg sm:text-xl font-bold text-green-400 mb-2 font-mono">
            SECURITY_VERIFICATION
          </h3>
          <p className="text-sm sm:text-base text-green-200 font-mono">
            Solve this equation to verify human identity
          </p>
        </div>
        
        <div className="text-center mb-6">
          <div className="text-2xl sm:text-3xl font-bold text-green-300 mb-4 font-mono">
            {mathChallenge.question} = ?
          </div>
          
          <input
            type="number"
            inputMode="numeric"
            pattern="[0-9]*"
            value={userAnswer}
            onChange={(e) => onAnswerChange(e.target.value)}
            placeholder="Enter answer"
            className={`w-full p-3 bg-gray-900 border-2 text-green-100 placeholder-green-300 
                       font-mono text-center text-lg focus:outline-none transition-all duration-300 ${
              mathError ? 'border-red-400' : 'border-green-400 focus:border-green-300'
            }`}
            autoFocus
          />
          
          {mathError && (
            <p className="text-red-400 text-sm mt-2 font-mono">
              ❌ INCORRECT_ANSWER. Please try again.
            </p>
          )}
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={onVerify}
            className="px-6 py-2 bg-gray-900 border-2 border-green-400 text-green-400 
                       font-mono font-bold hover:bg-green-900 transition-all duration-300 
                       disabled:opacity-50"
            disabled={!userAnswer || isSubmitting}
          >
            {isSubmitting ? "SENDING..." : "VERIFY_&_SEND"}
          </button>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-900 border-2 border-red-400 text-red-400 
                       font-mono hover:bg-red-900 transition-all duration-300"
            disabled={isSubmitting}
          >
            CANCEL
          </button>
        </div>
        
        <div className="text-center mt-4">
          <button
            onClick={onGenerateNew}
            className="text-sm text-green-400 hover:text-green-300 transition-colors font-mono"
            disabled={isSubmitting}
          >
            🔄 NEW_EQUATION
          </button>
        </div>
      </div>
    </div>
  );
};

// Main component
export default function Contact() {
  const [stars, setStars] = useState([]);
  const formState = useFormState();
  const mathChallenge = useMathChallenge();
  const formSubmission = useFormSubmission();
  const [showMathPopup, setShowMathPopup] = useState(false);

  useEffect(() => {
    setStars(generateStars());
  }, []);

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
    <section 
      id="contact" 
      className="min-h-screen py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 
                 bg-slate-950 text-white relative overflow-hidden flex flex-col justify-center items-center"
    >
      <StarryBackground stars={stars} />
      <ContactHeader />
      
      <form 
        className="w-full max-w-lg bg-gray-900/60 border-2 border-green-400 p-8 
                   flex flex-col gap-6 relative z-10" 
        onSubmit={handleFormSubmit}
      >
        <HoneypotField 
          value={formState.honeypot} 
          onChange={(e) => formState.setHoneypot(e.target.value)} 
        />
        
        <FormField
          name="name"
          placeholder="FULL_NAME"
          value={formState.form.name}
          onChange={formState.handleInputChange}
          required
        />
        
        <FormField
          type="email"
          name="email"
          placeholder="EMAIL_ADDRESS"
          value={formState.form.email}
          onChange={formState.handleInputChange}
          required
        />
        
        <FormField
          type="textarea"
          name="message"
          placeholder="MESSAGE_CONTENT"
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

      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { 
            opacity: 0.3; 
            transform: scale(1);
          }
          50% { 
            opacity: 1; 
            transform: scale(1.1);
          }
        }

        .animate-twinkle {
          animation: twinkle 3s infinite ease-in-out;
        }
      `}</style>
    </section>
  );
}
