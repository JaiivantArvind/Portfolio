import { Github, Linkedin, ArrowUp, Terminal, FileText } from "lucide-react";
import { personalInfo } from "../data/resume";

interface FooterProps {
  onOpenCommandPalette?: () => void;
  onOpenResume?: () => void;
  onNavigate?: (id: string) => void;
}

export function Footer({ onOpenCommandPalette, onOpenResume, onNavigate }: FooterProps) {
  const handleScrollTop = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate("top");
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="py-14 px-6 border-t border-border/80 bg-surface/40 backdrop-blur-md">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Left Column: Brand & Copyright */}
        <div className="flex flex-col items-center md:items-start gap-2 text-center md:text-left">
          <div className="flex items-center gap-2">
            <span className="font-heading font-semibold tracking-tight text-text text-sm">
              {personalInfo.name}
            </span>
            <span className="text-muted-2 text-xs">•</span>
            <span className="text-xs font-mono text-accent">Full Stack & Systems</span>
          </div>
          <p className="text-muted-2 text-xs font-light tracking-wider">
            © {new Date().getFullYear()} Jaiivant Arvind · Engineered in Bengaluru, India
          </p>
        </div>

        {/* Center: Command Palette Shortcut Pill */}
        {onOpenCommandPalette && (
          <button
            type="button"
            onClick={onOpenCommandPalette}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-border bg-surface-2/80 hover:border-accent/50 text-xs font-mono text-muted hover:text-text transition-all duration-200 shadow-sm"
          >
            <Terminal size={12} className="text-accent" />
            <span>Navigation Palette</span>
            <kbd className="px-1.5 py-0.5 rounded bg-surface border border-border text-[10px] text-accent">
              ⌘K
            </kbd>
          </button>
        )}

        {/* Right: Quick Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs uppercase tracking-widest text-muted">
          {onOpenResume && (
            <button
              type="button"
              onClick={onOpenResume}
              className="inline-flex items-center gap-1.5 hover:text-accent transition-colors cursor-pointer"
            >
              <FileText size={13} />
              <span>Resume</span>
            </button>
          )}

          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 hover:text-accent transition-colors"
          >
            <Github size={13} />
            <span>GitHub</span>
          </a>

          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 hover:text-accent transition-colors"
          >
            <Linkedin size={13} />
            <span>LinkedIn</span>
          </a>

          <button
            type="button"
            onClick={handleScrollTop}
            className="inline-flex items-center gap-1.5 hover:text-accent transition-colors cursor-pointer"
          >
            <span>Top</span>
            <ArrowUp size={13} />
          </button>
        </div>
      </div>
    </footer>
  );
}
