import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { FiSend, FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import SpiderSense from "./SpiderSense";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const { theme } = useTheme();

  const getThemeColor = () => {
    switch (theme) {
      case "spider-blue":
        return "#0055ff";
      case "cyber-neon":
        return "#bc00dd";
      case "spider-red":
      default:
        return "#ff003c";
    }
  };

  const color = getThemeColor();

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name field is required";
    
    if (!formData.email.trim()) {
      newErrors.email = "Email field is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please input a valid email address";
    }

    if (!formData.message.trim()) newErrors.message = "Message field is required";
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear validation error when editing field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    // Simulate database dispatch (e.g. Firebase or API call)
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: "", email: "", message: "" });

      // Reset success banner after 4 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 4000);
    }, 1500);
  };

  return (
    <section 
      id="contact" 
      className="relative min-h-screen w-full py-28 px-4 flex flex-col items-center justify-center select-none"
    >
      <div className="absolute inset-0 grid-overlay opacity-15 pointer-events-none" />

      {/* Section Header */}
      <div className="text-center mb-16">
        <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase">
          Transmission Node
        </span>
        <h2 
          className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white mt-1 text-glow"
          style={{ "--color-glow": `${color}33` }}
        >
          Contact Me
        </h2>
      </div>

      {/* Form Container */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
        className="w-full max-w-lg rounded-[32px] glass-card glass-card-glow border border-white/5 p-6 md:p-8 shadow-2xl relative"
      >
        {/* Glow point behind card */}
        <div 
          className="absolute -right-10 -bottom-10 w-36 h-36 rounded-full filter blur-3xl opacity-10 pointer-events-none"
          style={{ backgroundColor: color }}
        />

        {/* Apple Status Indicator block */}
        <div className="absolute top-4 left-6 right-6 flex items-center justify-between font-mono text-[9px] text-slate-500 uppercase tracking-widest pointer-events-none pb-2 border-b border-white/5">
          <span>COMMS_LINK: SECURE</span>
          <span>SYSTEM_SEND</span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 mt-4 select-text">
          {/* Name Field */}
          <div className="flex flex-col">
            <label htmlFor="name" className="text-[10px] font-mono tracking-widest text-slate-500 uppercase mb-2">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-xl bg-black/40 border text-sm text-slate-200 placeholder-slate-600 focus:outline-none transition-all duration-300 ${
                errors.name 
                  ? "border-red-500/50 focus:border-red-500" 
                  : "border-white/5 focus:border-opacity-100"
              }`}
              style={{
                "--tw-border-opacity": "0.1",
                borderColor: !errors.name ? "rgba(255, 255, 255, 0.05)" : "",
              }}
              onFocus={(e) => {
                if (!errors.name) e.target.style.borderColor = color;
                e.target.style.boxShadow = `0 0 10px ${color}33`;
              }}
              onBlur={(e) => {
                if (!errors.name) e.target.style.borderColor = "rgba(255,255,255,0.05)";
                e.target.style.boxShadow = "none";
              }}
              placeholder="Peter Parker"
              required
            />
            {errors.name && (
              <span className="text-[10px] text-red-500 font-mono mt-1 flex items-center gap-1">
                <FiAlertCircle /> {errors.name}
              </span>
            )}
          </div>

          {/* Email Field */}
          <div className="flex flex-col">
            <label htmlFor="email" className="text-[10px] font-mono tracking-widest text-slate-500 uppercase mb-2">
              Your Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-xl bg-black/40 border text-sm text-slate-200 placeholder-slate-600 focus:outline-none transition-all duration-300 ${
                errors.email 
                  ? "border-red-500/50 focus:border-red-500" 
                  : "border-white/5 focus:border-opacity-100"
              }`}
              onFocus={(e) => {
                if (!errors.email) e.target.style.borderColor = color;
                e.target.style.boxShadow = `0 0 10px ${color}33`;
              }}
              onBlur={(e) => {
                if (!errors.email) e.target.style.borderColor = "rgba(255,255,255,0.05)";
                e.target.style.boxShadow = "none";
              }}
              placeholder="spidey@oscorp.org"
              required
            />
            {errors.email && (
              <span className="text-[10px] text-red-500 font-mono mt-1 flex items-center gap-1">
                <FiAlertCircle /> {errors.email}
              </span>
            )}
          </div>

          {/* Message Field */}
          <div className="flex flex-col">
            <label htmlFor="message" className="text-[10px] font-mono tracking-widest text-slate-500 uppercase mb-2">
              Your Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-xl bg-black/40 border text-sm text-slate-200 placeholder-slate-600 focus:outline-none transition-all duration-300 resize-none ${
                errors.message 
                  ? "border-red-500/50 focus:border-red-500" 
                  : "border-white/5 focus:border-opacity-100"
              }`}
              onFocus={(e) => {
                if (!errors.message) e.target.style.borderColor = color;
                e.target.style.boxShadow = `0 0 10px ${color}33`;
              }}
              onBlur={(e) => {
                if (!errors.message) e.target.style.borderColor = "rgba(255,255,255,0.05)";
                e.target.style.boxShadow = "none";
              }}
              placeholder="With great power comes great responsibility..."
              required
            />
            {errors.message && (
              <span className="text-[10px] text-red-500 font-mono mt-1 flex items-center gap-1">
                <FiAlertCircle /> {errors.message}
              </span>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <SpiderSense className="w-full">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 rounded-2xl text-xs font-mono font-bold tracking-widest text-white border transition-all duration-300 flex items-center justify-center gap-2 focus-neon"
                style={{
                  backgroundColor: `${color}15`,
                  borderColor: color,
                  boxShadow: `0 0 15px ${color}22`,
                }}
              >
                {isSubmitting ? (
                  <>
                    <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    DISPATCHING...
                  </>
                ) : (
                  <>
                    <FiSend className="text-sm" />
                    SEND_MESSAGE
                  </>
                )}
              </button>
            </SpiderSense>
          </div>
        </form>

        {/* Success toast notification */}
        <AnimatePresence>
          {submitSuccess && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="absolute inset-x-0 bottom-4 mx-6 p-3 rounded-xl bg-green-500/10 border border-green-500/30 flex items-center gap-2.5 z-20 pointer-events-none select-none"
            >
              <FiCheckCircle className="text-green-500 text-lg shrink-0" />
              <div className="flex-1">
                <div className="text-[10px] font-mono font-bold text-green-400">TRANSMISSION_SUCCESS</div>
                <div className="text-[9px] text-slate-400">Message successfully logged into spider network.</div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

export default Contact;
