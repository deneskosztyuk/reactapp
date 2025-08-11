import { useState } from "react";
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
    label: "LinkedIn",
    color: "blue"
  },
  {
    href: "https://github.com/deneskosztyuk",
    icon: <FaGithub />,
    label: "GitHub", 
    color: "blue"
  }
];

const GRADIENT_TEXT_CLASS = "bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-transparent bg-clip-text";
const BUTTON_BASE_CLASS = "w-full flex items-center justify-center space-x-3 px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-700 text-white font-medium rounded-xl hover:from-cyan-700 hover:to-blue-800 transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg shadow-cyan-500/25";

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
    <h1 className="text-3xl sm:text-4xl font-light text-white leading-tight">
      Let's{" "}
      <span className={GRADIENT_TEXT_CLASS}>
        Connect
      </span>
    </h1>
    
    <p className="text-lg text-gray-300 font-light leading-relaxed max-w-3xl mx-auto">
      Ready to collaborate or have a question? I'd love to hear from you. Send me a message or connect through social media.
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

const FormField = ({ type = "text", name, placeholder, value, onChange, rows, required = false, icon }) => {
  const Component = type === "textarea" ? "textarea" : "input";
  
  return (
    <div className="relative">
      {icon && (
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
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
        className={`w-full ${icon ? 'pl-12' : 'pl-4'} pr-4 py-4 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500/50 transition-all duration-300 resize-none`}
        required={required}
      />
    </div>
  );
};

const SubmitButton = ({ isSubmitting }) => (
  <button
    type="submit"
    disabled={isSubmitting}
    className={`${BUTTON_BASE_CLASS} ${isSubmitting ? 'opacity-50 transform-none' : ''}`}
  >
    <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
    <FaPaperPlane className="w-4 h-4" />
  </button>
);

const StatusMessage = ({ success, errorMessage }) => {
  if (success === true) {
    return (
      <div className="mt-6 p-4 bg-green-900/20 border border-green-500/50 rounded-xl text-center text-green-400">
        <div className="font-medium mb-1">Message Sent Successfully!</div>
        <div className="text-sm">Thank you for reaching out. I'll get back to you soon.</div>
      </div>
    );
  }

  if (success === false) {
    return (
      <div className="mt-6 p-4 bg-red-900/20 border border-red-500/50 rounded-xl text-center text-red-400">
        <div className="font-medium mb-2">Message Failed to Send</div>
        {errorMessage && (
          <p className="text-sm mb-2">{errorMessage}</p>
        )}
        <p className="text-sm">Please try using the direct contact links instead.</p>
      </div>
    );
  }

  return null;
};

const SocialLinks = () => (
  <div className="mt-8 flex justify-center space-x-6">
    {SOCIAL_LINKS.map((link, index) => (
      <a
        key={index}
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className={`text-${link.color}-500 hover:text-${link.color}-400 transition-colors text-3xl`}
        aria-label={link.label}
      >
        {link.icon}
      </a>
    ))}
  </div>
);

const ContactForm = ({ formState, formSubmission, onSubmit }) => (
  <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 max-w-2xl mx-auto">
    <h2 className="text-2xl font-medium text-white mb-6">Send Message</h2>
    
    <form className="space-y-6" onSubmit={onSubmit}>
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
      />
      
      <FormField
        type="email"
        name="email"
        placeholder="Your Email"
        value={formState.form.email}
        onChange={formState.handleInputChange}
        icon={<FaEnvelope />}
        required
      />
      
      <FormField
        type="textarea"
        name="message"
        placeholder="Your Message"
        rows="6"
        value={formState.form.message}
        onChange={formState.handleInputChange}
        required
      />
      
      <SubmitButton isSubmitting={formSubmission.isSubmitting} />
    </form>

    <StatusMessage 
      success={formSubmission.success} 
      errorMessage={formSubmission.errorMessage} 
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
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800/95 border border-slate-700/50 rounded-xl p-6 max-w-md w-full shadow-2xl">
        <div className="text-center mb-6">
          <h3 className="text-xl font-medium text-white mb-2">
            BEEP...BOOP 🤖
          </h3>
          <p className="text-gray-300">
            Please solve this simple math problem to prove you're not a robot or spam!
          </p>
        </div>
        
        <div className="text-center mb-6">
          <div className="text-3xl font-light text-cyan-400 mb-4">
            {mathChallenge.question} = ?
          </div>
          
          <input
            type="number"
            inputMode="numeric"
            pattern="[0-9]*"
            value={userAnswer}
            onChange={(e) => onAnswerChange(e.target.value)}
            placeholder="Your answer"
            className={`w-full p-4 bg-slate-700/50 border rounded-xl text-white placeholder-gray-400 text-center text-lg focus:outline-none transition-all duration-300 ${
              mathError ? 'border-red-500/50 bg-red-900/20' : 'border-slate-600/50 focus:border-cyan-500/50'
            }`}
            autoFocus
          />
          
          {mathError && (
            <p className="text-red-400 text-sm mt-2">
              Incorrect answer. Please try again.
            </p>
          )}
        </div>
        
        <div className="flex flex-col gap-3">
          <button
            onClick={onVerify}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-700 text-white rounded-xl hover:from-cyan-700 hover:to-blue-800 transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg shadow-cyan-500/25 disabled:opacity-50 disabled:transform-none"
            disabled={!userAnswer || isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Verify & Send"}
          </button>
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 bg-slate-700/50 text-gray-300 rounded-xl hover:bg-slate-700/70 transition-all duration-300 disabled:opacity-50"
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
            Generate new problem (Come on, this looks simple enough already!)
          </button>
        </div>
      </div>
    </div>
  );
};

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
    <section 
      id="contact" 
      className="min-h-screen py-20 px-4"
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
    </section>
  );
}
