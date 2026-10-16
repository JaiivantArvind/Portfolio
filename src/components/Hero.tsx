import { useEffect, useState } from "react";
import { Github, Linkedin, Mail, ArrowDown } from "lucide-react";
import { motion } from "framer-motion";
import { MagneticWrapper } from "./MagneticWrapper";
import { personalInfo } from "../data/resume";

/* ── Animation Variants ── */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.4
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }
  },
};

function TypewriterText({ text, delay = 1.8 }: { text: string; delay?: number }) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), delay * 1000);
    return () => clearTimeout(t);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const timer = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(timer);
    }, 40);
    return () => clearInterval(timer);
  }, [started, text]);

  return (
    <p
      className="text-muted max-w-xl mx-auto leading-relaxed font-light"
      style={{
        fontSize: "clamp(1rem, 2vw, 1.125rem)",
        minHeight: "3em",
      }}
    >
      {displayed}
      <span
        className="inline-block w-px h-4 ml-1 align-bottom"
        style={{
          backgroundColor: "var(--color-accent)",
          animation: displayed.length < text.length ? "none" : "cursor-blink 1s step-end infinite",
        }}
      />
    </p>
  );
}

const socialLinks = [
  { icon: <Github size={18} />, href: personalInfo.github, label: "GitHub" },
  { icon: <Linkedin size={18} />, href: personalInfo.linkedin, label: "LinkedIn" },
  { icon: <Mail size={18} />, href: `mailto:${personalInfo.email}`, label: "Email" },
];

import { Asciify } from "./canvasui/Asciify";
import { Sparkles } from "lucide-react";

interface HeroProps {
  asciiLensEnabled?: boolean;
  asciiCharset?: "ascii" | "binary" | "blocks";
  asciiRadius?: number;
  onToggleAsciiLens?: () => void;
  onCycleCharset?: () => void;
}

export function Hero({
  asciiLensEnabled = true,
  asciiCharset = "ascii",
  asciiRadius = 0.14,
  onToggleAsciiLens,
  onCycleCharset,
}: HeroProps) {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center px-6 pt-20 overflow-hidden text-center"
    >
      {/* Atmospheric Lighting - Subtler than blobs */}
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

      {/* ASCII Spotlight Lens Wrapper */}
      <Asciify
        radius={asciiRadius}
        softness={0.75}
        scale={1.5}
        followSpeed={4.5}
        glow={0.65}
        aberration={0.3}
        charset={asciiCharset}
        background={[0.059, 0.059, 0.059]}
        strength={asciiLensEnabled ? 1 : 0}
        className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center justify-center py-4"
        contentStyle={{ overflow: "visible" }}
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative flex flex-col items-center w-full"
        >
          {/* Subtle ASCII Lens Mode Status Indicator */}
          <motion.div
            variants={itemVariants}
            className="mb-6 flex items-center justify-center gap-2 flex-wrap"
          >
            {onToggleAsciiLens && (
              <button
                type="button"
                onClick={onToggleAsciiLens}
                className={`group inline-flex items-center gap-2 px-3 py-1 text-[11px] font-mono rounded-full border transition-all duration-300 cursor-pointer ${
                  asciiLensEnabled
                    ? "bg-accent/10 border-accent/40 text-accent hover:bg-accent/20"
                    : "bg-surface-2/60 border-border text-muted hover:text-text"
                }`}
                title="Toggle cursor-following ASCII lens (Ctrl+K to configure)"
              >
                <Sparkles size={11} className={asciiLensEnabled ? "animate-pulse text-accent" : "text-muted"} />
                <span className="uppercase tracking-widest text-[9px] font-semibold">
                  ASCII Lens {asciiLensEnabled ? "Active" : "Paused"}
                </span>
                <span className="text-[9px] text-muted-2">
                  [r: {Math.round(asciiRadius * 100)}%]
                </span>
              </button>
            )}

            {asciiLensEnabled && onCycleCharset && (
              <button
                type="button"
                onClick={onCycleCharset}
                className="px-2.5 py-1 text-[9px] uppercase font-mono tracking-wider text-muted hover:text-accent bg-surface-2/60 hover:bg-surface-2 border border-border/80 rounded-full transition-colors cursor-pointer"
                title="Cycle character set (ASCII / Binary / Blocks)"
              >
                Charset: <span className="text-text font-bold">{asciiCharset}</span>
              </button>
            )}
          </motion.div>

          {/* The Name - Editorial Boldness */}
          <motion.h1
            variants={itemVariants}
            className="mb-6"
          >
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

          {/* The Tagline - Curated Typewriter */}
          <motion.div variants={itemVariants} className="mb-12">
            <TypewriterText text={personalInfo.tagline} />
          </motion.div>

          {/* CTAs - Refined & Minimal */}
          <motion.div
            variants={itemVariants}
            className="flex gap-6 mb-16 flex-wrap justify-center"
          >
            <a
              href="#projects"
              className="px-8 py-3 text-sm font-medium transition-all duration-300 border border-border hover:border-accent hover:text-accent"
              style={{ borderRadius: '0px' }} // Brutalist touch in a luxury context
            >
              View Portfolio
            </a>
            <a
              href="#contact"
              className="px-8 py-3 text-sm font-medium transition-all duration-300 bg-accent text-baseC-base hover:brightness-110"
              style={{
                backgroundColor: "var(--color-accent)",
                color: "var(--color-base)",
                borderRadius: '0px'
              }}
            >
              Get in Touch
            </a>
          </motion.div>

          {/* Socials - Magnetic & Muted */}
          <motion.div
            variants={itemVariants}
            className="flex gap-4 items-center"
          >
            {socialLinks.map(({ icon, href, label }) => (
              <MagneticWrapper key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={label}
                  className="flex items-center justify-center w-12 h-12 transition-all duration-300 border border-border text-muted hover:text-text hover:border-accent"
                  style={{ borderRadius: '0px' }}
                >
                  {icon}
                </a>
              </MagneticWrapper>
            ))}
          </motion.div>
        </motion.div>
      </Asciify>

      {/* Scroll Hint - Quietly elegant */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 1, delay: 2.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted text-[10px] tracking-[0.2em] font-medium"
      >
        <span>DISCOVER</span>
        <ArrowDown size={12} className="animate-bounce" />
      </motion.div>
    </section>
  );
}
