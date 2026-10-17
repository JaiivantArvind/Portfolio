import { useState, useEffect } from "react";
import { MotionConfig } from "framer-motion";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Projects } from "./components/Projects";
import { Experience } from "./components/Experience";
import { Education } from "./components/Education";
import { TechMatrix } from "./components/TechMatrix";
import { ContactConsole } from "./components/ContactConsole";
import { Footer } from "./components/Footer";
import { ParallaxBackground } from "./components/ParallaxBackground";
import { CommandPalette } from "./components/CommandPalette";
import { ProjectModal } from "./components/ProjectModal";
import { ResumeModal } from "./components/ResumeModal";
import { ToastContainer } from "./components/Toast";

function App() {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const [asciiLensEnabled, setAsciiLensEnabled] = useState(true);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [activeProjectModal, setActiveProjectModal] = useState<string | null>(null);

  const handleNavigate = (targetId: string) => {
    if (targetId === "home" || targetId === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleJumpToProject = (projectTitle: string) => {
    const lower = projectTitle.toLowerCase();
    if (lower.includes("internship") || lower.includes("stayright") || lower.includes("robomations")) {
      handleNavigate("experience");
    } else {
      setActiveProjectModal(lower.replace(/\s+/g, "-"));
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    // reducedMotion="user" makes Framer Motion respect the OS reduce-motion setting
    <MotionConfig reducedMotion="user">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[1000] focus:px-4 focus:py-2 focus:bg-accent focus:text-[var(--color-base)] focus:rounded"
      >
        Skip to content
      </a>
      <div className="grain" />
      <ParallaxBackground />
      <div style={{ position: "relative", zIndex: 1 }}>
        <Navbar
          onOpenCommandPalette={() => setCommandPaletteOpen(true)}
          onNavigate={handleNavigate}
          onOpenResume={() => setResumeModalOpen(true)}
        />
        <main id="main" tabIndex={-1}>
          <Hero
            asciiLensEnabled={asciiLensEnabled}
            onToggleAsciiLens={() => setAsciiLensEnabled((prev) => !prev)}
          />
          <TechMatrix
            selectedSkill={selectedSkill}
            onSelectSkill={setSelectedSkill}
            onJumpToProject={handleJumpToProject}
          />
          <Projects
            activeSkillFilter={selectedSkill}
            onSelectSkill={setSelectedSkill}
            onOpenDeepDive={setActiveProjectModal}
          />
          <Experience />
          <Education />
          <ContactConsole />
        </main>
        <Footer
          onOpenCommandPalette={() => setCommandPaletteOpen(true)}
          onOpenResume={() => setResumeModalOpen(true)}
          onNavigate={handleNavigate}
        />
      </div>

      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onNavigate={handleNavigate}
        asciiLensEnabled={asciiLensEnabled}
        onToggleAsciiLens={() => setAsciiLensEnabled((prev) => !prev)}
        onSelectSkill={(skill) => {
          setSelectedSkill(skill);
          handleNavigate("skills");
        }}
        onOpenProjectModal={setActiveProjectModal}
        onOpenResume={() => setResumeModalOpen(true)}
      />

      <ProjectModal
        projectId={activeProjectModal}
        onClose={() => setActiveProjectModal(null)}
        onSelectProject={setActiveProjectModal}
      />

      <ResumeModal isOpen={resumeModalOpen} onClose={() => setResumeModalOpen(false)} />

      <ToastContainer />
    </MotionConfig>
  );
}

export default App;
