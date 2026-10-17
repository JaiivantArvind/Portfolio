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
  Phone,
} from "lucide-react";
import { personalInfo, projects, experience, education } from "../data/resume";
import { showToast } from "../utils/toast";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const markdownResumeText = `# Jaiivant Arvind
${personalInfo.role} | ${personalInfo.location}
Phone: ${personalInfo.phone} | Email: ${personalInfo.email}
GitHub: ${personalInfo.github} | LinkedIn: ${personalInfo.linkedin}

## EDUCATION
${education.institution}, Vellore
${education.degree} (${education.period})
CGPA: ${education.cgpa}

## TECHNICAL SKILLS
- Languages: Java, JavaScript, TypeScript, C, C++, Python, SQL, Solidity, 8086 Assembly
- Backend & Web: React, Next.js, Node.js, Flask, FastAPI, Vite, Tailwind CSS, Three.js, ERC-1155 Smart Contracts
- Databases & Tools: PostgreSQL, Supabase, DBeaver, Docker, Git, Apache, Hardhat, Vercel, AWS, Azure, Figma, Excel
- ML & Data: PyTorch, OpenCV, Pandas, LLM Integration, Computer Vision, NLP, Semantic Embeddings

## EXPERIENCE
### Software Development Intern | Stayright Consultancy Private Limited (AceHours) (Jun 2026 – Sep 2026)
- Developed and integrated machine learning components into a live production application, contributing to backend logic and database query optimization.
- Designed and maintained structured database schemas and backend APIs, ensuring data integrity and operational reliability in a professional development environment.
- Engineered a new feature end-to-end for a live production application, from requirement analysis through backend implementation and deployment, collaborating with senior engineers through code reviews, sprint planning and production deployment practices.

### Robotics & Electronics Intern | Robomations, Bangalore (Apr 2022 – May 2022)
- Engineered hardware systems including an Edge Detector, Line Follower robot, and Battle Bot using Arduino Uno, L293D/L298N motor drivers, and NRF24L01 wireless RF modules.
- Designed and rendered a 3D architectural model in SketchUp with a VR-viewable video walkthrough, leveraging tools like Blender, Gravity Sketch, and AutoCAD.
- Applied core electronics fundamentals — 555 IC circuits, logic gates, LDR/ultrasonic sensors, and breadboard prototyping in a hands-on production environment.

## PROJECTS
### Mentora — Full-Stack Mentorship Platform (React, Vite, Tailwind CSS, Supabase, Vercel)
- A full-stack mentorship platform connecting students and mentors with real-time database updates, secure authentication, and a CI/CD-deployed production environment.
- Architected a responsive SPA using React, Vite, and Tailwind CSS with Supabase BaaS handling authentication and real-time database updates, ensuring scalable and secure data management.
- Deployed via Vercel with a full CI/CD pipeline, implementing dynamic routing and state management for seamless multi-role user flows in a live production environment.

### SupplyTrace — Decentralized Supply Chain Provenance (Solidity, React, Hardhat, The Graph, IPFS)
- A blockchain-based provenance system on Ethereum Sepolia using UUPS-upgradeable smart contracts and a role-gated state machine for tamper-proof product tracking across a 3-tier supply chain.
- Architected a UUPS-upgradeable ERC-1155 smart contract ecosystem with a Manufacturer → Distributor → Retailer state machine, enforcing tamper-proof on-chain provenance with multi-sig governance via Gnosis Safe and OpenZeppelin AccessControl.
- Engineered a high-performance indexing layer using The Graph subgraph for real-time custody transfers, validated through 60+ unit tests ensuring stable state transitions across all role transitions.

### TalentFit — Intelligent Screening Engine (Python, Flask, Gemini Embeddings, React, Tailwind CSS)
- An intelligent resume screening engine combining keyword matching and Gemini semantic embeddings to evaluate resume-to-JD alignment with contextual nuance.
- Architected a dual-scoring engine (40% keyword / 60% semantic) with a multi-format parsing pipeline (PDF, DOCX, TXT) auto-identifying 35+ technical skills.
- Optimized inference to sub-3-second processing per document with a React 18 dashboard featuring color-coded skill gap visualizations.

## AWARDS AND CERTIFICATES
- Certifications: Oracle Cloud Infrastructure 2026 Generative AI Professional
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
                    href={`tel:${personalInfo.phone}`}
                    className="hover:text-accent transition-colors flex items-center gap-1"
                  >
                    <Phone size={12} className="text-accent" />
                    <span>{personalInfo.phone}</span>
                  </a>
                  <span>•</span>
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
                    <span>linkedin.com/in/jaiivant-arvind-570bab3a5</span>
                  </a>
                </div>
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
                  <div className="flex flex-col sm:items-end gap-1">
                    <span className="text-xs font-mono text-muted-2">
                      {education.period}
                    </span>
                    <span className="text-xs font-mono text-accent font-semibold">
                      CGPA: {education.cgpa}
                    </span>
                  </div>
                </div>
              </div>

              {/* Section: Certifications */}
              <div className="space-y-2">
                <h3 className="text-xs uppercase font-mono tracking-[0.2em] text-accent font-semibold flex items-center gap-2">
                  <Sparkles size={14} className="text-accent" />
                  Certifications
                </h3>
                <div className="p-3 rounded-lg bg-surface border border-border/80 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                  <span className="font-semibold text-text">Oracle Cloud Infrastructure 2026 Generative AI Professional</span>
                  <span className="font-mono text-muted-2 text-[11px]">Oracle • 2026</span>
                </div>
              </div>

              {/* Section: Core Technical Competencies */}
              <div className="space-y-3">
                <h3 className="text-xs uppercase font-mono tracking-[0.2em] text-accent font-semibold flex items-center gap-2">
                  <Sparkles size={14} className="text-accent" />
                  Technical Skills
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
                  <div className="p-3 rounded-lg bg-surface border border-border/80 space-y-1">
                    <span className="text-accent font-semibold uppercase text-[10px] block">
                      Languages:
                    </span>
                    <span className="text-muted leading-relaxed text-[11px]">
                      Java, JavaScript, TypeScript, C, C++, Python, SQL, Solidity, 8086 Assembly
                    </span>
                  </div>

                  <div className="p-3 rounded-lg bg-surface border border-border/80 space-y-1">
                    <span className="text-accent font-semibold uppercase text-[10px] block">
                      Backend & Web:
                    </span>
                    <span className="text-muted leading-relaxed text-[11px]">
                      React, Next.js, Node.js, Flask, FastAPI, Vite, Tailwind CSS, Three.js, ERC-1155 Smart Contracts
                    </span>
                  </div>

                  <div className="p-3 rounded-lg bg-surface border border-border/80 space-y-1">
                    <span className="text-accent font-semibold uppercase text-[10px] block">
                      Databases & Tools:
                    </span>
                    <span className="text-muted leading-relaxed text-[11px]">
                      PostgreSQL, Supabase, DBeaver, Docker, Git, Apache, Hardhat, Vercel, AWS, Azure, Figma, Excel
                    </span>
                  </div>

                  <div className="p-3 rounded-lg bg-surface border border-border/80 space-y-1">
                    <span className="text-accent font-semibold uppercase text-[10px] block">
                      ML & Data:
                    </span>
                    <span className="text-muted leading-relaxed text-[11px]">
                      PyTorch, OpenCV, Pandas, LLM Integration, Computer Vision, NLP, Semantic Embeddings
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
