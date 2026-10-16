import { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Projects } from "./components/Projects";
import { Experience } from "./components/Experience";
import { Education } from "./components/Education";
import { TechStack } from "./components/TechStack";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { ParallaxBackground } from "./components/ParallaxBackground";
import { CommandPalette } from "./components/CommandPalette";
import { ToastContainer } from "./components/Toast";
import "./index.css";

function App() {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [asciiLensEnabled, setAsciiLensEnabled] = useState(true);
  const [asciiCharset, setAsciiCharset] = useState<"ascii" | "binary" | "blocks">("ascii");
  const [asciiRadius, setAsciiRadius] = useState<number>(0.14);

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
    <>
      <div className="grain" />
      <ParallaxBackground />
      <div style={{ position: "relative", zIndex: 1 }}>
        <Navbar
          onOpenCommandPalette={() => setCommandPaletteOpen(true)}
          onNavigate={handleNavigate}
        />
        <main>
          <Hero
            asciiLensEnabled={asciiLensEnabled}
            asciiCharset={asciiCharset}
            asciiRadius={asciiRadius}
            onToggleAsciiLens={() => setAsciiLensEnabled((prev) => !prev)}
            onCycleCharset={() => {
              setAsciiCharset((prev) =>
                prev === "ascii" ? "binary" : prev === "binary" ? "blocks" : "ascii"
              );
            }}
          />
          <TechStack />
          <Projects />
          <Experience />
          <Education />
          <Contact />
        </main>
        <Footer />
      </div>

      {/* Global Interactive Command Palette */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onNavigate={handleNavigate}
        asciiLensEnabled={asciiLensEnabled}
        onToggleAsciiLens={() => setAsciiLensEnabled((prev) => !prev)}
        asciiCharset={asciiCharset}
        onSetAsciiCharset={setAsciiCharset}
        asciiRadius={asciiRadius}
        onSetAsciiRadius={setAsciiRadius}
      />

      {/* Global Toast Notification System */}
      <ToastContainer />
    </>
  );
}

export default App;

