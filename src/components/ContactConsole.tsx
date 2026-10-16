import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  Copy,
  Check,
  Send,
  Sparkles,
  MapPin,
  Clock,
  ArrowUpRight,
  Terminal,
  MessageSquare,
  AlertCircle,
  RotateCcw,
} from "lucide-react";
import { personalInfo } from "../data/resume";
import { showToast } from "../utils/toast";

const QUICK_TOPICS = [
  { label: "💼 Full-Time Role", subject: "Full-Time Engineering Opportunity" },
  { label: "⚡ Systems & Low-Level", subject: "Systems / Low-Level Architecture Collaboration" },
  { label: "🔗 Web3 & Smart Contracts", subject: "Web3 / Smart Contract Project Inquiry" },
  { label: "☕ Technical Chat", subject: "Quick Coffee Chat & Technical Discussion" },
];

export function ContactConsole() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [currentTimeIST, setCurrentTimeIST] = useState("");

  // Live Bengaluru Time (IST / UTC+5:30)
  useEffect(() => {
    const updateTime = () => {
      try {
        const timeStr = new Intl.DateTimeFormat("en-US", {
          timeZone: "Asia/Kolkata",
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
          hour12: true,
        }).format(new Date());
        setCurrentTimeIST(timeStr);
      } catch {
        setCurrentTimeIST("IST (UTC +5:30)");
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personalInfo.email);
      setCopiedEmail(true);
      showToast(`Copied ${personalInfo.email} to clipboard!`, "success");
      setTimeout(() => setCopiedEmail(false), 2500);
    } catch {
      showToast(`Email: ${personalInfo.email}`, "info");
    }
  };

  const handleTopicSelect = (topicSubject: string) => {
    setFormData((prev) => ({ ...prev, subject: topicSubject }));
    if (errors.subject) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next.subject;
        return next;
      });
    }
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = "Please enter your name.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Please write a brief message or project description.";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      showToast("Please fill in the required fields.", "info");
      return;
    }

    setIsSubmitting(true);

    // Simulate reliable dispatch pipeline
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      showToast(`Transmission received! Thank you, ${formData.name.trim()}.`, "success");
    }, 850);
  };

  const handleResetForm = () => {
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
    setErrors({});
    setIsSubmitted(false);
  };

  const mailtoLink = `mailto:${personalInfo.email}?subject=${encodeURIComponent(
    formData.subject || "Portfolio Inquiry — Jaiivant Arvind"
  )}&body=${encodeURIComponent(
    `Hi Jaiivant,\n\n${formData.message || ""}\n\nFrom:\n${formData.name} (${formData.email})`
  )}`;

  return (
    <section id="contact" className="py-28 px-4 sm:px-6 relative overflow-hidden">
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-accent/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-amber-500/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="mb-14 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-surface-2/60 backdrop-blur-md mb-4 text-xs font-mono text-accent">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span>05 // TRANSMISSION CONSOLE</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl mb-5 font-heading tracking-tight leading-[1.15]">
            Let's Build{" "}
            <span className="italic font-light text-transparent bg-clip-text bg-gradient-to-r from-accent via-amber-200 to-accent-hover">
              Something Extraordinary.
            </span>
          </h2>
          <p className="text-muted text-base sm:text-lg font-light leading-relaxed">
            Open to high-impact software engineering roles, systems & low-level architecture,
            smart contract development, and cutting-edge AI/vision projects.
          </p>

          {/* Availability Status Badge */}
          <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-muted font-mono">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="font-sans font-medium">Available for Opportunities</span>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-2 border border-border">
              <Clock size={13} className="text-accent" />
              <span>{currentTimeIST || "IST"} (Bengaluru, IN)</span>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-2 border border-border">
              <MapPin size={13} className="text-accent" />
              <span>Hybrid / Remote / Relocation</span>
            </div>
          </div>
        </div>

        {/* Dual Console Layout */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Access & Channels (5 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            {/* Primary Direct Email Card */}
            <div className="group relative rounded-2xl border border-border/80 bg-surface/90 backdrop-blur-xl p-6 sm:p-7 shadow-xl hover:border-accent/50 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs uppercase tracking-widest text-accent font-mono font-medium">
                  Direct Inquiries
                </span>
                <span className="flex items-center gap-1.5 text-xs text-muted font-mono">
                  <Terminal size={12} className="text-accent" />
                  <span>SLA &lt; 12h</span>
                </span>
              </div>

              <div className="mb-5">
                <p className="text-xs text-muted mb-1">Primary Email Endpoint</p>
                <div className="text-xl sm:text-2xl font-mono text-text font-semibold tracking-tight break-all group-hover:text-accent transition-colors">
                  {personalInfo.email}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-surface-2 hover:border-accent/60 hover:text-accent text-xs font-medium text-text transition-all duration-200 shadow-sm"
                >
                  {copiedEmail ? (
                    <>
                      <Check size={14} className="text-emerald-400" />
                      <span className="text-emerald-400">Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      <span>Copy Address</span>
                    </>
                  )}
                </button>

                <a
                  href={`mailto:${personalInfo.email}?subject=Hello%20Jaiivant`}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-accent/15 border border-accent/40 text-accent hover:bg-accent hover:text-base text-xs font-medium transition-all duration-200"
                >
                  <Mail size={14} />
                  <span>Open Client</span>
                  <ArrowUpRight size={13} />
                </a>
              </div>
            </div>

            {/* Social & Verification Hub */}
            <div className="rounded-2xl border border-border/80 bg-surface/90 backdrop-blur-xl p-6 shadow-xl">
              <h3 className="text-xs font-mono uppercase tracking-widest text-muted mb-4">
                Verified Channels & Profiles
              </h3>

              <div className="grid sm:grid-cols-2 gap-3">
                {/* GitHub */}
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-xl border border-border/70 bg-surface-2/60 hover:border-accent/50 hover:bg-surface-2 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-surface flex items-center justify-center text-muted group-hover:text-accent group-hover:border group-hover:border-accent/40 transition-colors">
                      <Github size={16} />
                    </span>
                    <div>
                      <div className="text-xs font-semibold text-text group-hover:text-accent transition-colors">
                        GitHub
                      </div>
                      <div className="text-[11px] text-muted-2 font-mono">@JaiivantArvind</div>
                    </div>
                  </div>
                  <ArrowUpRight size={14} className="text-muted group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </a>

                {/* LinkedIn */}
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-xl border border-border/70 bg-surface-2/60 hover:border-accent/50 hover:bg-surface-2 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-surface flex items-center justify-center text-muted group-hover:text-accent group-hover:border group-hover:border-accent/40 transition-colors">
                      <Linkedin size={16} />
                    </span>
                    <div>
                      <div className="text-xs font-semibold text-text group-hover:text-accent transition-colors">
                        LinkedIn
                      </div>
                      <div className="text-[11px] text-muted-2 font-mono">Jaiivant Arvind</div>
                    </div>
                  </div>
                  <ArrowUpRight size={14} className="text-muted group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </a>
              </div>

              {/* Location & Timezone Details */}
              <div className="mt-4 pt-4 border-t border-border/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-muted">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin size={13} className="text-accent" />
                  <span>{personalInfo.location}</span>
                </span>
                <span className="font-mono text-accent text-[11px]">UTC+05:30 (IST)</span>
              </div>
            </div>

            {/* Engineering Consultation Callout */}
            <div className="rounded-2xl border border-accent/20 bg-gradient-to-br from-accent/5 via-surface-2 to-surface p-5 text-xs text-muted leading-relaxed">
              <div className="flex items-center gap-2 text-accent font-medium mb-1.5">
                <Sparkles size={14} />
                <span>Technical Interview & Coffee Chat</span>
              </div>
              <p>
                Interested in deep-diving into the 8086 DOSBox patcher, UUPS upgradeable contracts,
                or mobile vision optimization? Feel free to reach out directly.
              </p>
            </div>
          </motion.div>

          {/* Right Column: Glassmorphic Quick Message Console (7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-7"
          >
            <div className="rounded-2xl border border-border/90 bg-[#141414]/90 backdrop-blur-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
              {/* Console Top Bar */}
              <div className="flex items-center justify-between pb-5 mb-6 border-b border-border/80">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="text-xs font-mono text-muted pl-2 border-l border-border/60">
                    DIRECT_MESSAGE_TRANSMISSION.sh
                  </span>
                </div>
                <span className="text-[11px] font-mono text-accent/80 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
                  <span>READY</span>
                </span>
              </div>

              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  /* Success State Animation */
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    className="py-10 text-center flex flex-col items-center justify-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-5 shadow-lg shadow-emerald-500/10">
                      <Check size={32} />
                    </div>

                    <h3 className="text-2xl font-heading mb-2 text-text">
                      Transmission Received!
                    </h3>

                    <p className="text-muted text-sm max-w-md mx-auto mb-6 leading-relaxed">
                      Thank you, <strong className="text-text">{formData.name}</strong>. Your note
                      regarding <span className="text-accent italic font-serif">"{formData.subject || "Collaboration"}"</span> has
                      been dispatched. Jaiivant typically reviews and replies within 12 hours.
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-3">
                      <a
                        href={mailtoLink}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent text-base font-medium text-xs hover:bg-accent-hover transition-all"
                      >
                        <Mail size={14} />
                        <span>Open in Email App as Backup</span>
                        <ArrowUpRight size={13} />
                      </a>

                      <button
                        type="button"
                        onClick={handleResetForm}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border bg-surface-2 text-xs text-text hover:border-accent/60 transition-all"
                      >
                        <RotateCcw size={13} />
                        <span>Send Another Message</span>
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  /* Interactive Form */
                  <form key="form" onSubmit={handleSubmit} noValidate className="space-y-5">
                    {/* Topic Quick Chips */}
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-muted mb-2.5">
                        Select Topic or Objective
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {QUICK_TOPICS.map((topic) => {
                          const isActive = formData.subject === topic.subject;
                          return (
                            <button
                              key={topic.label}
                              type="button"
                              onClick={() => handleTopicSelect(topic.subject)}
                              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 border ${
                                isActive
                                  ? "bg-accent/20 border-accent text-accent shadow-sm"
                                  : "bg-surface-2/60 border-border/80 text-muted hover:text-text hover:border-border"
                              }`}
                            >
                              {topic.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Name & Email Row */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      {/* Name */}
                      <div>
                        <label className="block text-xs font-medium text-text mb-1.5">
                          Your Name <span className="text-accent">*</span>
                        </label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => {
                            setFormData((prev) => ({ ...prev, name: e.target.value }));
                            if (errors.name) {
                              setErrors((prev) => {
                                const next = { ...prev };
                                delete next.name;
                                return next;
                              });
                            }
                          }}
                          placeholder="e.g. Satya Nadella"
                          className={`w-full px-4 py-2.5 rounded-xl bg-surface-2 border text-sm text-text placeholder:text-muted-2 focus:outline-none transition-colors ${
                            errors.name
                              ? "border-red-500/80 focus:border-red-500"
                              : "border-border/80 focus:border-accent focus:ring-1 focus:ring-accent/40"
                          }`}
                        />
                        {errors.name && (
                          <p className="mt-1 text-[11px] text-red-400 flex items-center gap-1 font-mono">
                            <AlertCircle size={11} />
                            {errors.name}
                          </p>
                        )}
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-xs font-medium text-text mb-1.5">
                          Email Address <span className="text-accent">*</span>
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => {
                            setFormData((prev) => ({ ...prev, email: e.target.value }));
                            if (errors.email) {
                              setErrors((prev) => {
                                const next = { ...prev };
                                delete next.email;
                                return next;
                              });
                            }
                          }}
                          placeholder="e.g. satya@microsoft.com"
                          className={`w-full px-4 py-2.5 rounded-xl bg-surface-2 border text-sm text-text placeholder:text-muted-2 focus:outline-none transition-colors ${
                            errors.email
                              ? "border-red-500/80 focus:border-red-500"
                              : "border-border/80 focus:border-accent focus:ring-1 focus:ring-accent/40"
                          }`}
                        />
                        {errors.email && (
                          <p className="mt-1 text-[11px] text-red-400 flex items-center gap-1 font-mono">
                            <AlertCircle size={11} />
                            {errors.email}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Subject */}
                    <div>
                      <label className="block text-xs font-medium text-text mb-1.5">
                        Subject Line
                      </label>
                      <input
                        type="text"
                        value={formData.subject}
                        onChange={(e) => {
                          setFormData((prev) => ({ ...prev, subject: e.target.value }));
                        }}
                        placeholder="e.g. Systems Architecture Discussion / Internship Opening"
                        className="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-border/80 text-sm text-text placeholder:text-muted-2 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/40 transition-colors"
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="block text-xs font-medium text-text">
                          Your Message <span className="text-accent">*</span>
                        </label>
                        <span className="text-[11px] font-mono text-muted-2">
                          {formData.message.length} / 1000
                        </span>
                      </div>
                      <textarea
                        rows={4}
                        maxLength={1000}
                        value={formData.message}
                        onChange={(e) => {
                          setFormData((prev) => ({ ...prev, message: e.target.value }));
                          if (errors.message) {
                            setErrors((prev) => {
                              const next = { ...prev };
                              delete next.message;
                              return next;
                            });
                          }
                        }}
                        placeholder="Tell me about your project, team opportunity, or engineering challenge..."
                        className={`w-full px-4 py-2.5 rounded-xl bg-surface-2 border text-sm text-text placeholder:text-muted-2 focus:outline-none transition-colors resize-y ${
                          errors.message
                            ? "border-red-500/80 focus:border-red-500"
                            : "border-border/80 focus:border-accent focus:ring-1 focus:ring-accent/40"
                        }`}
                      />
                      {errors.message && (
                        <p className="mt-1 text-[11px] text-red-400 flex items-center gap-1 font-mono">
                          <AlertCircle size={11} />
                          {errors.message}
                        </p>
                      )}
                    </div>

                    {/* Bottom Actions */}
                    <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <p className="text-[11px] text-muted-2 font-mono flex items-center gap-1.5">
                        <MessageSquare size={13} className="text-accent" />
                        <span>Direct delivery with instant receipt feedback</span>
                      </p>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-accent text-base font-semibold text-xs tracking-wider uppercase hover:bg-accent-hover active:scale-[0.98] transition-all duration-200 disabled:opacity-60 shadow-lg shadow-accent/10"
                      >
                        {isSubmitting ? (
                          <>
                            <span className="w-3.5 h-3.5 border-2 border-base border-t-transparent rounded-full animate-spin" />
                            <span>Transmitting...</span>
                          </>
                        ) : (
                          <>
                            <Send size={14} />
                            <span>Transmit Message</span>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
