import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Download,
  Copy,
  Check,
  Printer,
  ExternalLink,
  Mail,
  MapPin,
  Github,
  Linkedin,
  FileText,
  Briefcase,
  GraduationCap,
  Sparkles,
} from "lucide-react";
import { personalInfo, projects, experience, education } from "../data/resume";
import { showToast } from "../utils/toast";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const markdownResumeText = `# Jaiivant Arvind
${personalInfo.role} | ${personalInfo.location}
Email: ${personalInfo.email}
GitHub: ${personalInfo.github} | LinkedIn: ${personalInfo.linkedin}

## PROFESSIONAL SUMMARY
Full-Stack Developer specializing in low-level systems (8086 Assembly, Headless DOSBox), decentralized Web3 protocols (Solidity, UUPS ERC-1155, The Graph), and computer vision pipelines (PyTorch, OpenCV). Experience building high-performance hybrid systems, upgradeable smart contracts, and real-time deep learning classifiers.

## EDUCATION
${education.degree} (${education.period})
${education.institution}, ${education.location}

## CORE TECHNICAL COMPETENCIES
- Systems & Low-Level: 8086 Assembly (MASM), Headless DOSBox, Byte-Signature Binary Patching, Multi-precision Math
- Blockchain & Web3: Solidity, UUPS Upgradeable Smart Contracts, ERC-1155, The Graph (Subgraphs), Hardhat, IPFS, Gnosis Safe
- AI & Computer Vision: PyTorch, MobileNetV3, OpenCV (Otsu & Lanczos), Gemini 2.5 Flash and 2.5 Flash Lite, TF-IDF, NLP
- Full Stack & Cloud: React 19, Next.js, TypeScript, Vite, Tailwind CSS, FastAPI, Flask, Supabase (PostgreSQL & RLS), Git, Vercel

## SELECTED ENGINEERING PROJECTS
### SupplyTrace — Decentralized Supply Chain Provenance (Solidity, React, Hardhat, The Graph, IPFS)
- Architected a UUPS-upgradeable ERC-1155 smart contract with role-gated state machine (Manufacturer → Distributor → Retailer).
- Engineered a high-performance indexing layer using The Graph (subgraph), reducing frontend data retrieval latency versus direct RPC calls (>4.5 s to sub-200 ms, per the project breakdown).
- Implemented multi-sig governance via Gnosis Safe, OpenZeppelin AccessControl, and a Circuit Breaker (Pausable) for emergency recalls.
- Validated logic through 60+ unit tests on Ethereum Sepolia testnet.

### TradeGate — AI-Powered International Tariff Engine (8086 Assembly, Python, Flask, Gemini 2.5 Flash and 2.5 Flash Lite, React, TypeScript)
- Executes legacy 8086 MASM assembly engine inside headless DOSBox environment for trade duty arithmetic.
- Engineered a byte-signature binary patcher in Python that scans byte signatures in compiled .EXE binaries to inject rates before execution.
- Developed custom 32-bit math library in Assembly to bypass 16-bit DIV overflow, handling cargo valuations over $65,535.
- Integrated Google Gemini AI (Gemini 2.5 Flash and 2.5 Flash Lite) with graceful fallback to compiled assembly lookup tables.

### TamilVision — Real-time 156-Class Unicode Tamil OCR & Vision (PyTorch, FastAPI, OpenCV, Next.js, Three.js)
- Architected OCR engine using modified MobileNetV3-Small classifying 156 Unicode Tamil characters at sub-50ms latency.
- Engineered a 12-step OpenCV preprocessing pipeline (Otsu adaptive thresholding, Smart Inversion, Lanczos bicubic resampling).
- Developed custom Grayscale Input Adapter, collapsing RGB ImageNet weights to reduce convolutional layer VRAM footprint by 66%.

### TalentFit — Dual-Scoring Semantic Screening Engine (Python, Flask, Gemini AI, React, Tailwind CSS)
- Formulated dual-scoring algorithm: TF-IDF keyword extraction + Gemini dense vector embeddings.
- Streamlined document extraction across PDF, DOCX, TXT with automated identification of technical skill clusters in <3s.

### Mentora — Full-Stack Collaborative Mentorship Platform (React, Vite, Tailwind CSS, Supabase, Vercel)
- Architected SPA with Supabase PostgreSQL and Row-Level Security (RLS) policies for multi-tenant data isolation.
- Implemented real-time WebSocket messaging and session booking calendar.

## EXPERIENCE
${experience.map((e) => `- ${e.role} — ${e.org} (${e.period})\n${e.bullets.map((b) => `  ${b}`).join("\n")}`).join("\n")}
`;

export function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(markdownResumeText);
    setCopied(true);
    showToast("Copied ATS-ready plain text / markdown resume to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[999] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Dialog */}
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="resume-modal-title"
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl bg-surface border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col z-10 max-h-[92vh]"
          style={{
            boxShadow:
              "0 25px 60px -15px rgba(0, 0, 0, 0.9), 0 0 1px 1px rgba(197, 163, 93, 0.25)",
          }}
        >
          {/* Header Action Toolbar */}
          <div className="px-6 py-4 border-b border-border bg-surface-2/70 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-surface border border-border flex items-center justify-center text-accent">
                <FileText size={16} />
              </div>
              <div>
                <h3 id="resume-modal-title" className="text-base font-heading font-semibold text-text">
                  Curriculum Vitae • Jaiivant Arvind
                </h3>
                <p className="text-[11px] font-mono text-muted-2">
                  One-page résumé • PDF, plain text and print
                </p>
              </div>
            </div>

            {/* Actions: Download, Copy Markdown, Print, Tab, Close */}
            <div className="flex items-center gap-2 flex-wrap">
              {/* Copy Plaintext / ATS */}
              <button
                type="button"
                onClick={handleCopyMarkdown}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-muted hover:text-text bg-surface border border-border hover:border-accent rounded-lg transition-colors cursor-pointer"
                title="Copy ATS-friendly Plaintext / Markdown"
              >
                {copied ? (
                  <>
                    <Check size={13} className="text-accent" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy size={13} />
                    <span>Copy ATS / Markdown</span>
                  </>
                )}
              </button>

              {/* Print Document */}
              <button
                type="button"
                onClick={handlePrint}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-muted hover:text-text bg-surface border border-border hover:border-accent rounded-lg transition-colors cursor-pointer"
                title="Print or Save as PDF"
              >
                <Printer size={13} />
                <span>Print</span>
              </button>

              {/* Direct Download PDF */}
              <a
                href="/resume.pdf"
                download="Jaiivant_Arvind_Resume.pdf"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-mono text-[var(--color-base)] bg-accent hover:bg-accent-hover font-semibold rounded-lg transition-colors cursor-pointer shadow-sm"
                title="Download Official PDF Resume"
              >
                <Download size={13} />
                <span>Download PDF</span>
              </a>

              {/* Open in New Tab */}
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 text-muted hover:text-text bg-surface border border-border hover:border-accent/40 rounded-lg transition-colors cursor-pointer"
                title="Open PDF in new tab"
                aria-label="Open PDF in new tab"
              >
                <ExternalLink size={15} />
              </a>

              {/* Close Modal */}
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 text-muted hover:text-text bg-surface border border-border hover:border-accent/40 rounded-lg transition-colors cursor-pointer ml-1"
                aria-label="Close modal"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* In-Browser Document Preview Container */}
          <div className="p-6 sm:p-10 overflow-y-auto space-y-8 flex-1 scrollbar-thin bg-surface">
            {/* Document Sheet */}
            <div
              id="printable-resume"
              className="bg-surface-2/40 border border-border/70 rounded-xl p-6 sm:p-10 space-y-8 shadow-inner"
            >
              {/* Document Header */}
              <div className="border-b border-border/80 pb-6 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                  <div>
                    <h2 className="text-3xl sm:text-4xl font-heading font-bold text-text">
                      {personalInfo.name}
                    </h2>
                    <p className="text-sm font-mono text-accent font-medium mt-1">
                      {personalInfo.role} • Systems, Blockchain & Machine Learning
                    </p>
                  </div>

                  {/* Location Badge */}
                  <div className="flex items-center gap-1.5 text-xs font-mono text-muted-2">
                    <MapPin size={13} className="text-accent" />
                    <span>{personalInfo.location}</span>
                  </div>
                </div>

                {/* Contact Pills */}
                <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-mono text-muted">
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="hover:text-accent transition-colors flex items-center gap-1"
                  >
                    <Mail size={12} className="text-accent" />
                    <span>{personalInfo.email}</span>
                  </a>
                  <span>•</span>
                  <a
                    href={personalInfo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-accent transition-colors flex items-center gap-1"
                  >
                    <Github size={12} className="text-accent" />
                    <span>github.com/JaiivantArvind</span>
                  </a>
                  <span>•</span>
                  <a
                    href={personalInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-accent transition-colors flex items-center gap-1"
                  >
                    <Linkedin size={12} className="text-accent" />
                    <span>linkedin.com/in/jaiivant-arvind</span>
                  </a>
                </div>
              </div>

              {/* Section: Professional Summary */}
              <div className="space-y-2">
                <h3 className="text-xs uppercase font-mono tracking-[0.2em] text-accent font-semibold flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                  Professional Summary
                </h3>
                <p className="text-xs sm:text-sm text-text/90 font-light leading-relaxed">
                  Full-Stack Developer specializing in low-level systems (8086
                  Assembly, Headless DOSBox), decentralized Web3 protocols (Solidity, UUPS ERC-1155,
                  The Graph), and computer vision pipelines (PyTorch, OpenCV). Experience building high-performance hybrid systems, upgradeable smart contracts,
                  and real-time deep learning classifiers.
                </p>
              </div>

              {/* Section: Education */}
              <div className="space-y-3">
                <h3 className="text-xs uppercase font-mono tracking-[0.2em] text-accent font-semibold flex items-center gap-2">
                  <GraduationCap size={14} className="text-accent" />
                  Education
                </h3>
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 text-xs">
                  <div>
                    <span className="text-sm font-semibold text-text">
                      {education.institution}
                    </span>
                    <p className="text-muted font-light mt-0.5">
                      {education.degree}
                    </p>
                  </div>
                  <span className="text-xs font-mono text-muted-2">
                    {education.period} • {education.location}
                  </span>
                </div>
              </div>

              {/* Section: Core Technical Competencies */}
              <div className="space-y-3">
                <h3 className="text-xs uppercase font-mono tracking-[0.2em] text-accent font-semibold flex items-center gap-2">
                  <Sparkles size={14} className="text-accent" />
                  Core Technical Competencies
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
                  <div className="p-3 rounded-lg bg-surface border border-border/80 space-y-1">
                    <span className="text-accent font-semibold uppercase text-[10px] block">
                      Systems & Low-Level:
                    </span>
                    <span className="text-muted leading-relaxed text-[11px]">
                      8086 Assembly (MASM), Headless DOSBox, Byte-Signature Binary Patching, Multi-precision Math
                    </span>
                  </div>

                  <div className="p-3 rounded-lg bg-surface border border-border/80 space-y-1">
                    <span className="text-accent font-semibold uppercase text-[10px] block">
                      Blockchain & Web3:
                    </span>
                    <span className="text-muted leading-relaxed text-[11px]">
                      Solidity, UUPS Upgradeable ERC-1155, The Graph (Subgraphs), Hardhat, IPFS, Gnosis Safe
                    </span>
                  </div>

                  <div className="p-3 rounded-lg bg-surface border border-border/80 space-y-1">
                    <span className="text-accent font-semibold uppercase text-[10px] block">
                      AI & Computer Vision:
                    </span>
                    <span className="text-muted leading-relaxed text-[11px]">
                      PyTorch, MobileNetV3, OpenCV (Otsu & Lanczos), Gemini 2.5 Flash and 2.5 Flash Lite, TF-IDF, NLP
                    </span>
                  </div>

                  <div className="p-3 rounded-lg bg-surface border border-border/80 space-y-1">
                    <span className="text-accent font-semibold uppercase text-[10px] block">
                      Full Stack & Cloud:
                    </span>
                    <span className="text-muted leading-relaxed text-[11px]">
                      React 19, Next.js, TypeScript, Vite, Tailwind CSS, FastAPI, Flask, Supabase, Git
                    </span>
                  </div>
                </div>
              </div>

              {/* Section: Selected Engineering Projects */}
              <div className="space-y-6">
                <h3 className="text-xs uppercase font-mono tracking-[0.2em] text-accent font-semibold flex items-center gap-2">
                  <Briefcase size={14} className="text-accent" />
                  Selected Engineering Projects
                </h3>

                <div className="space-y-6">
                  {projects.map((proj) => (
                    <div key={proj.title} className="space-y-2">
                      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="text-sm font-semibold text-text">
                            {proj.title}
                          </h4>
                          <span className="text-xs text-muted font-light">
                            — {proj.subtitle}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {proj.tech.slice(0, 4).map((t) => (
                            <span
                              key={t}
                              className="text-[9px] font-mono px-1.5 py-[2px] rounded bg-surface border border-border text-muted-2"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      <ul className="space-y-1.5 text-xs text-text/80 leading-relaxed font-light pl-2">
                        {proj.bullets.slice(0, 3).map((bullet, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-accent font-bold shrink-0 mt-0.5">•</span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section: Experience & Leadership */}
              <div className="space-y-4 pt-2 border-t border-border/70">
                <h3 className="text-xs uppercase font-mono tracking-[0.2em] text-accent font-semibold flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                  Experience & Leadership
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {experience.map((exp) => (
                    <div
                      key={exp.role}
                      className="p-3.5 rounded-lg bg-surface border border-border/80 space-y-1.5"
                    >
                      <div className="flex items-baseline justify-between gap-2">
                        <h5 className="text-xs font-semibold text-text">
                          {exp.role}
                        </h5>
                        <span className="text-[10px] font-mono text-muted-2">
                          {exp.period}
                        </span>
                      </div>
                      <p className="text-[11px] font-mono text-accent">
                        {exp.org}
                      </p>
                      <ul className="space-y-1 text-xs text-muted leading-relaxed font-light">{exp.bullets.map((b) => (<li key={b} className="flex gap-2"><span className="text-accent" aria-hidden="true">•</span><span>{b}</span></li>))}</ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
