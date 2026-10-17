import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Github,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Workflow,
  Lightbulb,
  BarChart3,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
} from "lucide-react";
import { detailedProjects, type DetailedProject } from "../data/projectDetails";
import { projectLinks } from "../data/links";
import { ArchitectureVisualizer } from "./ArchitectureVisualizer";

interface ProjectModalProps {
  projectId: string | null;
  onClose: () => void;
  onSelectProject: (id: string) => void;
}

type ModalTab = "architecture" | "breakthroughs" | "metrics";

export function ProjectModal({
  projectId,
  onClose,
  onSelectProject,
}: ProjectModalProps) {
  const [activeTab, setActiveTab] = useState<ModalTab>("architecture");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const normalizedId = projectId === "ai-resume-analyzer" ? "talentfit" : projectId;
  const currentIndex = detailedProjects.findIndex(
    (p) => p.id === normalizedId || p.title.toLowerCase() === normalizedId?.toLowerCase()
  );
  const currentProject: DetailedProject | undefined =
    currentIndex !== -1 ? detailedProjects[currentIndex] : detailedProjects[0];

  const [prevProjectId, setPrevProjectId] = useState(projectId);
  if (projectId !== prevProjectId) {
    setPrevProjectId(projectId);
    setActiveTab("architecture");
  }

  // Keyboard navigation: Escape to close, arrows to switch
  useEffect(() => {
    if (!projectId) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        const prevIdx =
          (currentIndex - 1 + detailedProjects.length) % detailedProjects.length;
        onSelectProject(detailedProjects[prevIdx].id);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        const nextIdx = (currentIndex + 1) % detailedProjects.length;
        onSelectProject(detailedProjects[nextIdx].id);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [projectId, currentIndex, onClose, onSelectProject]);

  const dialogRef = useRef<HTMLDivElement>(null);

  // Move focus into the dialog on open and return it to the trigger on close
  useEffect(() => {
    if (!projectId) return;
    const previous = document.activeElement as HTMLElement | null;
    dialogRef.current?.focus();
    return () => previous?.focus?.();
  }, [projectId]);

  const handleCopyCode = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  if (!projectId || !currentProject) return null;

  const prevProject =
    detailedProjects[
      (currentIndex - 1 + detailedProjects.length) % detailedProjects.length
    ];
  const nextProject =
    detailedProjects[(currentIndex + 1) % detailedProjects.length];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[998] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Dialog Content */}
        <motion.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
          tabIndex={-1}
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl bg-surface border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col z-10 max-h-[90vh]"
          style={{
            boxShadow:
              "0 25px 60px -15px rgba(0, 0, 0, 0.9), 0 0 1px 1px rgba(197, 163, 93, 0.25)",
          }}
        >
          {/* Header Bar */}
          <div className="px-6 py-5 border-b border-border bg-surface-2/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 rounded bg-accent/20 text-accent font-semibold">
                  {currentProject.category}
                </span>
                <span className="text-muted-2 text-xs font-mono">•</span>
                <span className="text-muted-2 text-xs font-mono">
                  Case Study {String(currentIndex + 1).padStart(2, "0")} of {String(detailedProjects.length).padStart(2, "0")}
                </span>
              </div>
              <h3 id="project-modal-title" className="text-2xl md:text-3xl font-heading text-text font-semibold">
                {currentProject.title}
              </h3>
              <p className="text-xs text-muted font-light">
                {currentProject.subtitle}
              </p>
            </div>

            {/* Quick Actions & Close */}
            <div className="flex items-center gap-2 self-start sm:self-auto">
              {(() => {
                const links = currentProject ? projectLinks[currentProject.id] : undefined;
                const githubUrl = typeof links?.github === "string" && links.github.trim() !== "" ? links.github : undefined;
                const demoUrl = typeof links?.demoUrl === "string" && links.demoUrl.trim() !== "" ? links.demoUrl : undefined;

                return (
                  <>
                    {githubUrl && (
                      <a
                        href={githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-muted hover:text-text bg-surface border border-border hover:border-accent rounded-lg transition-colors cursor-pointer"
                        title="View Source on GitHub"
                      >
                        <Github size={13} />
                        <span>GitHub</span>
                      </a>
                    )}

                    {demoUrl && (
                      <a
                        href={demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-[var(--color-base)] bg-accent hover:bg-accent-hover font-semibold rounded-lg transition-colors cursor-pointer"
                        title="View Live Demonstration"
                      >
                        <ExternalLink size={13} />
                        <span>Demo</span>
                      </a>
                    )}
                  </>
                );
              })()}

              <button
                type="button"
                onClick={onClose}
                className="p-1.5 text-muted hover:text-text bg-surface border border-border hover:border-accent/40 rounded-lg transition-colors cursor-pointer ml-1"
                aria-label="Close modal (Esc)"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="px-6 pt-3 border-b border-border flex items-center gap-2 overflow-x-auto scrollbar-none bg-surface">
            <button
              type="button"
              onClick={() => setActiveTab("architecture")}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs font-mono tracking-wider uppercase border-b-2 transition-all cursor-pointer ${
                activeTab === "architecture"
                  ? "border-accent text-accent font-semibold"
                  : "border-transparent text-muted hover:text-text"
              }`}
            >
              <Workflow size={14} />
              <span>System Architecture</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("breakthroughs")}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs font-mono tracking-wider uppercase border-b-2 transition-all cursor-pointer ${
                activeTab === "breakthroughs"
                  ? "border-accent text-accent font-semibold"
                  : "border-transparent text-muted hover:text-text"
              }`}
            >
              <Lightbulb size={14} />
              <span>Engineering Breakthroughs</span>
              <span className="text-[10px] px-1.5 py-[2px] rounded-full bg-surface-2 text-muted-2">
                {currentProject.breakthroughs.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("metrics")}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs font-mono tracking-wider uppercase border-b-2 transition-all cursor-pointer ${
                activeTab === "metrics"
                  ? "border-accent text-accent font-semibold"
                  : "border-transparent text-muted hover:text-text"
              }`}
            >
              <BarChart3 size={14} />
              <span>Impact & Key Metrics</span>
            </button>
          </div>

          {/* Modal Body / Tab Content */}
          <div className="p-6 overflow-y-auto space-y-6 flex-1 scrollbar-thin">
            {/* Tab 1: System Architecture Pipeline */}
            {activeTab === "architecture" && (
              <div className="space-y-6">
                <p className="text-sm text-text/80 font-light leading-relaxed">
                  {currentProject.description}
                </p>

                {/* Interactive Flow Visualizer */}
                <ArchitectureVisualizer
                  nodes={currentProject.architectureNodes}
                />

                {/* Tech Stack Chips */}
                <div className="pt-4 border-t border-border/60">
                  <span className="text-[10px] uppercase font-mono text-muted-2 block mb-2">
                    Technologies Integrated Across System:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {currentProject.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 text-xs font-mono bg-surface-2 border border-border text-muted rounded-md"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Engineering Breakthroughs */}
            {activeTab === "breakthroughs" && (
              <div className="space-y-6">
                {currentProject.breakthroughs.map((b, i) => (
                  <div
                    key={b.title}
                    className="p-5 rounded-xl bg-surface-2/60 border border-border space-y-4"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-accent font-bold">
                        0{i + 1}.
                      </span>
                      <h4 className="text-base font-heading font-semibold text-text">
                        {b.title}
                      </h4>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Problem Statement */}
                      <div className="p-3.5 rounded-lg bg-surface border border-red-500/20 space-y-1.5">
                        <div className="flex items-center gap-1.5 text-xs font-mono text-red-400 font-medium">
                          <AlertCircle size={13} />
                          <span>The Technical Constraint</span>
                        </div>
                        <p className="text-xs text-text/80 leading-relaxed font-light">
                          {b.problem}
                        </p>
                      </div>

                      {/* Engineered Solution */}
                      <div className="p-3.5 rounded-lg bg-surface border border-accent/30 space-y-1.5">
                        <div className="flex items-center gap-1.5 text-xs font-mono text-accent font-medium">
                          <CheckCircle2 size={13} />
                          <span>Engineered Solution</span>
                        </div>
                        <p className="text-xs text-text/80 leading-relaxed font-light">
                          {b.solution}
                        </p>
                      </div>
                    </div>

                    {/* Code Snippet if present */}
                    {b.codeSnippet && (
                      <div className="mt-3 pt-3 border-t border-border/40">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-mono uppercase text-muted-2">
                            Snippet ({b.language ?? "code"}):
                          </span>
                          <button
                            type="button"
                            onClick={() => handleCopyCode(b.codeSnippet!, i)}
                            className="flex items-center gap-1 text-[10px] font-mono text-muted hover:text-text px-2 py-0.5 rounded bg-surface border border-border hover:border-accent transition-colors cursor-pointer"
                          >
                            {copiedIndex === i ? (
                              <>
                                <Check size={11} className="text-accent" />
                                <span>Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy size={11} />
                                <span>Copy Code</span>
                              </>
                            )}
                          </button>
                        </div>
                        <div className="p-3.5 rounded-xl bg-black/60 border border-border/80 font-mono text-xs text-text/90 overflow-x-auto scrollbar-thin">
                          <pre className="leading-relaxed">
                            <code>{b.codeSnippet}</code>
                          </pre>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Tab 3: Impact & Key Metrics */}
            {activeTab === "metrics" && (
              <div className="space-y-6">
                {/* Metrics Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {currentProject.metrics.map((m) => (
                    <div
                      key={m.label}
                      className="p-5 rounded-xl bg-surface-2/60 border border-border hover:border-accent/40 transition-colors"
                    >
                      <span className="text-[10px] uppercase font-mono tracking-wider text-muted-2 block mb-1">
                        {m.label}
                      </span>
                      <div className="text-2xl font-heading text-accent font-semibold mb-1">
                        {m.value}
                      </div>
                      <p className="text-xs text-muted leading-relaxed font-light">
                        {m.detail}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Key Outcomes Checklist */}
                <div className="p-5 rounded-xl bg-surface-2/40 border border-border space-y-3">
                  <h5 className="text-xs font-mono uppercase tracking-wider text-text font-semibold">
                    Key Architectural Deliverables:
                  </h5>
                  <ul className="space-y-2.5">
                    {currentProject.keyOutcomes.map((ko, i) => (
                      <li
                        key={i}
                        className="text-xs text-text/90 flex items-start gap-2.5 leading-relaxed font-light"
                      >
                        <CheckCircle2 size={13} className="text-accent shrink-0 mt-0.5" />
                        <span>{ko}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Modal Footer: Next / Prev Project Switcher */}
          <div className="px-6 py-3.5 border-t border-border bg-surface-2/80 flex items-center justify-between text-xs font-mono text-muted">
            <button
              type="button"
              onClick={() => onSelectProject(prevProject.id)}
              className="flex items-center gap-1.5 hover:text-accent transition-colors cursor-pointer group"
            >
              <ChevronLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
              <span>Prev: {prevProject.title}</span>
            </button>

            <span className="text-[10px] text-muted-2 hidden sm:inline">
              Use <kbd className="px-1 py-[2px] rounded bg-surface border border-border text-muted">←</kbd> <kbd className="px-1 py-[2px] rounded bg-surface border border-border text-muted">→</kbd> keys to cycle
            </span>

            <button
              type="button"
              onClick={() => onSelectProject(nextProject.id)}
              className="flex items-center gap-1.5 hover:text-accent transition-colors cursor-pointer group"
            >
              <span>Next: {nextProject.title}</span>
              <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
