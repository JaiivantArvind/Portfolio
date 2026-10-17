import { useState, useEffect } from "react";
import { Menu, X, Search, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { personalInfo } from "../data/resume";

const links = [
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

interface NavbarProps {
  onOpenCommandPalette?: () => void;
  onNavigate?: (targetId: string, label?: string) => void;
  onOpenResume?: () => void;
}

export function Navbar({ onOpenCommandPalette, onNavigate, onOpenResume }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-surface/80 backdrop-blur-lg border-b border-border" : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo - Architectural Serif */}
        <a
          href="#"
          onClick={(e) => {
            if (onNavigate) {
              e.preventDefault();
              onNavigate("home", "Home");
            }
          }}
          className="font-heading text-lg font-medium transition-all duration-300 hover:text-accent cursor-pointer"
        >
          {personalInfo.name.split(' ')[0]}
          <span className="text-accent font-light italic">.</span>
        </a>

        {/* Desktop Nav Links & Action */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex gap-8 list-none m-0 p-0">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={(e) => {
                    if (onNavigate) {
                      e.preventDefault();
                      onNavigate(l.href.replace("#", ""), l.label);
                    }
                  }}
                  className="text-[11px] uppercase tracking-[0.2em] font-medium text-muted hover:text-text transition-colors duration-300 cursor-pointer"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Resume Hub Trigger Pill */}
          {onOpenResume && (
            <button
              onClick={onOpenResume}
              className="flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider text-accent hover:text-accent-hover bg-accent/10 hover:bg-accent/20 border border-accent/40 rounded-lg transition-all duration-300 cursor-pointer shadow-sm font-semibold"
              title="Open Resume Hub & PDF"
            >
              <FileText size={12} />
              <span>Resume</span>
            </button>
          )}

          {/* Command Palette Trigger Pill */}
          {onOpenCommandPalette && (
            <button
              onClick={onOpenCommandPalette}
              className="group flex items-center gap-2 px-2.5 py-1 text-[11px] text-muted hover:text-text bg-surface-2/60 hover:bg-surface-2 border border-border hover:border-accent/40 rounded-lg transition-all duration-300 cursor-pointer shadow-sm"
              title="Open Command Palette (Ctrl+K or ⌘K)"
              aria-label="Open Command Palette"
            >
              <Search size={12} className="text-accent group-hover:scale-110 transition-transform" />
              <span className="text-[10px] uppercase tracking-wider font-mono text-muted-2 group-hover:text-muted">Search</span>
              <kbd className="text-[9px] font-mono px-1 py-0.5 rounded bg-surface border border-border text-muted">⌘K</kbd>
            </button>
          )}
        </div>

        {/* Mobile Actions */}
        <div className="md:hidden flex items-center gap-3">
          {onOpenCommandPalette && (
            <button
              onClick={onOpenCommandPalette}
              className="p-2 text-muted hover:text-accent transition-colors border border-border/80 rounded-lg bg-surface-2/60"
              aria-label="Search and Commands"
            >
              <Search size={16} />
            </button>
          )}

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 text-muted hover:text-text transition-colors"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu - Curated Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-surface border-b border-border overflow-hidden"
          >
            <div className="px-6 py-8 flex flex-col gap-6">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={(e) => {
                    setMobileOpen(false);
                    if (onNavigate) {
                      e.preventDefault();
                      onNavigate(l.href.replace("#", ""), l.label);
                    }
                  }}
                  className="text-sm uppercase tracking-widest text-muted hover:text-accent transition-colors"
                >
                  {l.label}
                </a>
              ))}
              {onOpenResume && (
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    onOpenResume();
                  }}
                  className="flex items-center gap-2 text-sm uppercase tracking-widest text-accent hover:text-accent-hover transition-colors text-left cursor-pointer font-semibold"
                >
                  <FileText size={16} />
                  <span>Curriculum Vitae / Resume</span>
                </button>
              )}
              {onOpenCommandPalette && (
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    onOpenCommandPalette();
                  }}
                  className="flex items-center justify-between text-sm uppercase tracking-widest text-accent hover:text-accent-hover transition-colors pt-4 border-t border-border/50 text-left cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <Search size={14} />
                    Command Palette
                  </span>
                  <kbd className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-surface-2 border border-border text-muted">⌘K</kbd>
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
