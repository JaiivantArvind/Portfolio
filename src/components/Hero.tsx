import { useEffect, useState } from "react";
import { Github, Linkedin, Mail, ArrowDown, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { MagneticWrapper } from "./MagneticWrapper";
import { Asciify } from "./canvasui/Asciify";
import { personalInfo, education } from "../data/resume";
import { contactConfig } from "../data/contact";

/* ── Animation Variants ── */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.4,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

/** Subscribes to a CSS media query and updates when it changes. */
function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(
    () => typeof window !== "undefined" && window.matchMedia(query).matches,
  );
  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = () => setMatches(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [query]);
  return matches;
}

/**
 * Types the tagline. The full text stays in the DOM for screen readers and
 * reduced-motion users; the animated copy is hidden from assistive tech.
 */
function TypewriterText({ text, delay = 1.8 }: { text: string; delay?: number }) {
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (reduceMotion) return;
    const t = setTimeout(() => setStarted(true), delay * 1000);
    return () => clearTimeout(t);
  }, [delay, reduceMotion]);

  useEffect(() => {
    if (reduceMotion || !started) return;
    let i = 0;
    const timer = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) clearInterval(timer);
    }, 40);
    return () => clearInterval(timer);
  }, [started, text, reduceMotion]);

  const shown = reduceMotion ? text : displayed;
  const typing = !reduceMotion && shown.length < text.length;

  return (
    <p
      className="text-muted max-w-xl mx-auto leading-relaxed font-light"
      style={{ fontSize: "clamp(1rem, 2vw, 1.125rem)", minHeight: "3em" }}
    >
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">{shown}</span>
      <span
        aria-hidden="true"
        className="inline-block w-px h-4 ml-1 align-bottom"
        style={{
          backgroundColor: "var(--color-accent)",
          animation: typing ? "none" : "cursor-blink 1s step-end infinite",
        }}
      />
    </p>
  );
}

const socialLinks = [
  contactConfig.showGithub ? { icon: <Github size={18} />, href: personalInfo.github, label: "GitHub" } : null,
  contactConfig.showLinkedin ? { icon: <Linkedin size={18} />, href: personalInfo.linkedin, label: "LinkedIn" } : null,
  contactConfig.showEmail ? { icon: <Mail size={18} />, href: `mailto:${personalInfo.email}`, label: "Email" } : null,
].filter(Boolean) as { icon: React.ReactNode; href: string; label: string }[];

interface HeroProps {
  asciiLensEnabled?: boolean;
  onToggleAsciiLens?: () => void;
}

const LENS_QUERY = "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";
const CONTENT_CLASS = "relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center justify-center py-4";

export function Hero({ asciiLensEnabled = true, onToggleAsciiLens }: HeroProps) {
  // The cursor lens needs a mouse and is decorative, so touch and reduced-motion
  // visitors get the plain content (no WebGL context is created for them).
  const lensAvailable = useMediaQuery(LENS_QUERY);

  const content = (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative flex flex-col items-center w-full"
    >
      {lensAvailable && onToggleAsciiLens && (
        <motion.div variants={itemVariants} className="mb-6 flex items-center justify-center">
          <button
            type="button"
            onClick={onToggleAsciiLens}
            aria-pressed={asciiLensEnabled}
            className={`group inline-flex items-center gap-2 px-3 py-1 text-[11px] font-mono rounded-full border transition-all duration-300 cursor-pointer ${
              asciiLensEnabled
                ? "bg-accent/10 border-accent/40 text-accent hover:bg-accent/20"
                : "bg-surface-2/60 border-border text-muted hover:text-text"
            }`}
            title="Turn the cursor-following text effect on or off"
          >
            <Sparkles size={11} className={asciiLensEnabled ? "animate-pulse text-accent" : "text-muted"} />
            <span className="uppercase tracking-widest text-[9px] font-semibold">
              Cursor effect {asciiLensEnabled ? "on" : "off"}
            </span>
          </button>
        </motion.div>
      )}

      {/* The Name */}
      <motion.h1 id="hero-name" variants={itemVariants} className="mb-6">
        <span className="opacity-80 font-light italic serif text-3xl md:text-4xl block mb-2 font-heading">
          Introducing
        </span>
        <span className="relative inline-block">
          {personalInfo.name}
          <motion.span
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 1, delay: 1.2, ease: "easeOut" }}
            className="absolute bottom-0 left-0 h-[2px] bg-accent"
            style={{ backgroundColor: "var(--color-accent)" }}
          />
        </span>
      </motion.h1>

      {/* Role line: what a recruiter scans for first */}
      <motion.p
        variants={itemVariants}
        className="mb-3 font-mono text-[11px] uppercase tracking-[0.25em] text-accent"
      >
        {personalInfo.role} · Systems · Blockchain · AI
      </motion.p>

      {/* The Tagline */}
      <motion.div variants={itemVariants} className="mb-12">
        <TypewriterText text={personalInfo.tagline} />
      </motion.div>

      {/* CTAs */}
      <motion.div variants={itemVariants} className="flex gap-6 mb-16 flex-wrap justify-center">
        <a
          href="#projects"
          className="px-8 py-3 text-sm font-medium transition-all duration-300 border border-border hover:border-accent hover:text-accent"
          style={{ borderRadius: "0px" }}
        >
          View Portfolio
        </a>
        <a
          href="#contact"
          className="px-8 py-3 text-sm font-medium transition-all duration-300 hover:brightness-110"
          style={{
            backgroundColor: "var(--color-accent)",
            color: "var(--color-base)",
            borderRadius: "0px",
          }}
        >
          Get in Touch
        </a>
      </motion.div>

      {/* Socials */}
      <motion.div variants={itemVariants} className="flex gap-4 items-center">
        {socialLinks.map(({ icon, href, label }) => (
          <MagneticWrapper key={label}>
            <a
              href={href}
              target={href.startsWith("mailto:") ? undefined : "_blank"}
              rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
              title={label}
              aria-label={label}
              className="flex items-center justify-center w-12 h-12 transition-all duration-300 border border-border text-muted hover:text-text hover:border-accent"
              style={{ borderRadius: "0px" }}
            >
              {icon}
            </a>
          </MagneticWrapper>
        ))}
      </motion.div>

      <span className="sr-only">
        Education: {education.degree}, {education.institution} ({education.period}).
      </span>
    </motion.div>
  );

  return (
    <section
      id="home"
      aria-labelledby="hero-name"
      className="relative min-h-screen flex items-center justify-center px-6 pt-20 overflow-hidden text-center"
    >
      {/* Atmospheric Lighting */}
      <div
        aria-hidden
        className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(197, 163, 93, 0.05) 0%, transparent 70%)",
          filter: "blur(100px)",
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden
        className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(197, 163, 93, 0.03) 0%, transparent 70%)",
          filter: "blur(100px)",
          pointerEvents: "none",
        }}
      />

      {lensAvailable ? (
        <Asciify
          radius={0.14}
          softness={0.75}
          scale={1.5}
          followSpeed={4.5}
          glow={0.65}
          aberration={0.3}
          charset="ascii"
          background={[0.059, 0.059, 0.059]}
          strength={asciiLensEnabled ? 1 : 0}
          className={CONTENT_CLASS}
          contentStyle={{ overflow: "visible" }}
        >
          {content}
        </Asciify>
      ) : (
        <div className={CONTENT_CLASS}>{content}</div>
      )}

      {/* Scroll Hint */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted text-[10px] tracking-[0.2em] font-medium"
      >
        <span>DISCOVER</span>
        <ArrowDown size={12} className="animate-bounce" />
      </motion.div>
    </section>
  );
}
