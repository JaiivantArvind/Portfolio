import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ArrowRight,
  Copy,
  FolderGit2,
  Cpu,
  Layers,
  GraduationCap,
  Mail,
  Home,
  Briefcase,
  Github,
  Linkedin,
  Sparkles,
  FileText,
} from "lucide-react";
import { personalInfo, projects } from "../data/resume";
import { techSkills } from "../data/techMatrixData";
import { contactConfig } from "../data/contact";
import { showToast } from "../utils/toast";

interface CommandItem {
  id: string;
  category: "Navigation" | "Projects" | "Tech Matrix" | "Contact & Social" | "Commands";
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  shortcut?: string;
  action: () => void;
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate?: (id: string, label?: string) => void;
  asciiLensEnabled?: boolean;
  onToggleAsciiLens?: () => void;
  onSelectSkill?: (skill: string) => void;
  onOpenProjectModal?: (projectId: string) => void;
  onOpenResume?: () => void;
}

export function CommandPalette({
  isOpen,
  onClose,
  onNavigate,
  asciiLensEnabled = true,
  onToggleAsciiLens,
  onSelectSkill,
  onOpenProjectModal,
  onOpenResume,
}: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Jump helper with smooth scroll and sweep support
  const scrollTo = (id: string, label?: string) => {
    onClose();
    if (onNavigate && label) {
      onNavigate(id === "top" ? "home" : id, label);
      return;
    }
    setTimeout(() => {
      if (id === "top") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  const commandItems: CommandItem[] = [
    // Navigation
    {
      id: "nav-hero",
      category: "Navigation",
      title: "Home / Overview",
      subtitle: "Back to top",
      icon: <Home size={16} className="text-accent" />,
      action: () => scrollTo("top", "Home"),
    },
    {
      id: "nav-tech",
      category: "Navigation",
      title: "Tech Stack & Skills",
      subtitle: "Languages, frameworks, tools",
      icon: <Cpu size={16} className="text-accent" />,
      action: () => scrollTo("skills", "Skills"),
    },
    {
      id: "nav-projects",
      category: "Navigation",
      title: "Projects",
      subtitle: "Featured systems, web3 & AI work",
      icon: <Layers size={16} className="text-accent" />,
      action: () => scrollTo("projects", "Projects"),
    },
    {
      id: "nav-experience",
      category: "Navigation",
      title: "Experience",
      subtitle: "Internship, club and mentoring roles",
      icon: <Briefcase size={16} className="text-accent" />,
      action: () => scrollTo("experience", "Experience"),
    },
    {
      id: "nav-education",
      category: "Navigation",
      title: "Education",
      subtitle: "VIT Vellore — Integrated MTech CSE",
      icon: <GraduationCap size={16} className="text-accent" />,
      action: () => scrollTo("education", "Education"),
    },
    {
      id: "nav-contact",
      category: "Navigation",
      title: "Contact",
      subtitle: "Direct access & collaborations",
      icon: <Mail size={16} className="text-accent" />,
      action: () => scrollTo("contact", "Contact"),
    },

    // Projects Direct Launchers
    ...projects.map((p) => ({
      id: `proj-${p.title.toLowerCase().replace(/\s+/g, "-")}`,
      category: "Projects" as const,
      title: p.title,
      subtitle: `${p.subtitle} • ${p.tech.slice(0, 3).join(", ")}`,
      icon: <FolderGit2 size={16} className="text-muted" />,
      action: () => {
        if (onOpenProjectModal) {
          onClose();
          onOpenProjectModal(p.title.toLowerCase().replace(/\s+/g, "-"));
          showToast(`Opened deep dive: ${p.title}`);
        } else {
          scrollTo("projects");
          showToast(`Navigated to ${p.title}`);
        }
      },
    })),

    // Tech Matrix Skills Quick-Jump & Inspector
    ...techSkills.map((s) => ({
      id: `skill-${s.id}`,
      category: "Tech Matrix" as const,
      title: s.name,
      subtitle: `${s.tag} • ${s.level} [${s.projects.join(", ")}]`,
      icon: <Cpu size={16} className="text-accent" />,
      action: () => {
        scrollTo("skills", "Skills");
        if (onSelectSkill) onSelectSkill(s.name);
        showToast(`Focused on ${s.name} in Tech Matrix & Projects`);
      },
    })),

    // Contact & Social
    ...(contactConfig.showEmail
      ? [
          {
            id: "act-copy-email",
            category: "Contact & Social" as const,
            title: "Copy Email Address",
            subtitle: personalInfo.email,
            icon: <Copy size={16} className="text-accent" />,
            shortcut: "↵",
            action: () => {
              navigator.clipboard.writeText(personalInfo.email);
              showToast(`Copied ${personalInfo.email} to clipboard!`);
              onClose();
            },
          },
        ]
      : []),
    ...(contactConfig.showGithub
      ? [
          {
            id: "act-github",
            category: "Contact & Social" as const,
            title: "Open GitHub Profile",
            subtitle: personalInfo.github,
            icon: <Github size={16} className="text-muted" />,
            action: () => {
              window.open(personalInfo.github, "_blank");
              onClose();
            },
          },
        ]
      : []),
    ...(contactConfig.showLinkedin
      ? [
          {
            id: "act-linkedin",
            category: "Contact & Social" as const,
            title: "Open LinkedIn Profile",
            subtitle: personalInfo.linkedin,
            icon: <Linkedin size={16} className="text-muted" />,
            action: () => {
              window.open(personalInfo.linkedin, "_blank");
              onClose();
            },
          },
        ]
      : []),

    // ASCII Lens Commands
    {
      id: "cmd-toggle-asciify",
      category: "Commands",
      title: asciiLensEnabled ? "Turn off cursor effect" : "Turn on cursor effect",
      subtitle: `Background text effect is ${asciiLensEnabled ? "on" : "off"}`,
      icon: <Sparkles size={16} className="text-accent" />,
      action: () => {
        if (onToggleAsciiLens) onToggleAsciiLens();
        showToast(asciiLensEnabled ? "Cursor effect turned off" : "Cursor effect turned on");
        onClose();
      },
    },

    // Quick Command
    {
      id: "act-resume",
      category: "Commands",
      title: "View Curriculum Vitae / Resume",
      subtitle: "Preview, download the PDF, or copy plain text",
      icon: <FileText size={16} className="text-accent" />,
      action: () => {
        onClose();
        if (onOpenResume) onOpenResume();
      },
    },
  ];

  // Filtering
  const filteredItems = commandItems.filter((item) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      item.title.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      (item.subtitle && item.subtitle.toLowerCase().includes(q))
    );
  });

  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);
  if (isOpen !== prevIsOpen) {
    setPrevIsOpen(isOpen);
    if (isOpen) {
      setQuery("");
      setActiveIndex(0);
    }
  }

  const [prevQuery, setPrevQuery] = useState(query);
  if (query !== prevQuery) {
    setPrevQuery(query);
    setActiveIndex(0);
  }

  // Focus management
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((prev) => (prev + 1) % Math.max(1, filteredItems.length));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((prev) =>
          prev <= 0 ? Math.max(0, filteredItems.length - 1) : prev - 1
        );
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filteredItems[activeIndex]) {
          filteredItems[activeIndex].action();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filteredItems, activeIndex, onClose]);

  // Scroll active item into view
  useEffect(() => {
    if (!listRef.current) return;
    const activeEl = listRef.current.querySelector(`[data-index="${activeIndex}"]`);
    if (activeEl) {
      activeEl.scrollIntoView({ block: "nearest" });
    }
  }, [activeIndex]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[999] flex items-start justify-center pt-20 px-4 sm:px-6">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Palette Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl bg-surface border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col z-10"
            style={{
              boxShadow: "0 25px 60px -15px rgba(0, 0, 0, 0.9), 0 0 1px 1px rgba(197, 163, 93, 0.25)",
            }}
          >
            {/* Search Input Bar */}
            <div className="flex items-center px-4 py-4 border-b border-border gap-3">
              <Search size={18} className="text-accent shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a command, section, or project..."
                className="w-full bg-transparent text-sm text-text placeholder:text-muted focus:outline-none font-sans"
              />
              <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 text-[10px] uppercase font-mono tracking-wider text-muted bg-surface-2 border border-border rounded">
                Esc
              </kbd>
            </div>

            {/* Results List */}
            <div
              ref={listRef}
              className="max-h-[380px] overflow-y-auto p-2 divide-y divide-border/20 scrollbar-thin"
            >
              {filteredItems.length === 0 ? (
                <div className="py-12 text-center text-muted">
                  <p className="text-sm">No commands or sections matching "{query}"</p>
                  <p className="text-xs text-muted-2 mt-1">Try searching for projects, skills, or contact</p>
                </div>
              ) : (
                filteredItems.map((item, index) => {
                  const isActive = index === activeIndex;
                  return (
                    <div
                      key={item.id}
                      data-index={index}
                      onClick={() => item.action()}
                      onMouseEnter={() => setActiveIndex(index)}
                      className={`flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-150 ${
                        isActive
                          ? "bg-surface-2 text-text border border-accent/40 shadow-sm"
                          : "text-muted hover:text-text border border-transparent"
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border transition-colors ${
                            isActive
                              ? "bg-surface border-accent/50 text-accent"
                              : "bg-surface-2/60 border-border text-muted"
                          }`}
                        >
                          {item.icon}
                        </div>
                        <div className="truncate">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-medium text-text truncate">
                              {item.title}
                            </span>
                            <span className="text-[10px] uppercase tracking-wider text-muted-2 font-mono">
                              {item.category}
                            </span>
                          </div>
                          {item.subtitle && (
                            <p className="text-[11px] text-muted truncate mt-0.5">
                              {item.subtitle}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0 ml-3">
                        {item.shortcut && (
                          <kbd className="px-1.5 py-0.5 text-[10px] font-mono text-muted bg-surface border border-border rounded">
                            {item.shortcut}
                          </kbd>
                        )}
                        <ArrowRight
                          size={14}
                          className={`transition-transform duration-200 ${
                            isActive ? "text-accent translate-x-1" : "text-muted/40"
                          }`}
                        />
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer Status Bar */}
            <div className="px-4 py-2.5 bg-surface-2/80 border-t border-border flex items-center justify-between text-[11px] text-muted font-sans">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <kbd className="px-1 py-0.5 text-[9px] font-mono bg-surface border border-border rounded">↑</kbd>
                  <kbd className="px-1 py-0.5 text-[9px] font-mono bg-surface border border-border rounded">↓</kbd>
                  <span className="ml-1">Navigate</span>
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 text-[9px] font-mono bg-surface border border-border rounded">↵</kbd>
                  <span className="ml-1">Select</span>
                </span>
              </div>
              <span className="text-[10px] text-muted-2 font-mono">
                {filteredItems.length} commands
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
