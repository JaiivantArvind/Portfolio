import { personalInfo } from "../data/resume";

export function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-border bg-base text-center">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-muted text-xs tracking-widest uppercase font-light">
          © {new Date().getFullYear()} {personalInfo.name}
        </p>
        <div className="flex gap-8">
          <a href="#home" className="text-muted text-xs uppercase tracking-widest hover:text-accent transition-colors">Back to Top</a>
          <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="text-muted text-xs uppercase tracking-widest hover:text-accent transition-colors">GitHub</a>
        </div>
      </div>
    </footer>
  );
}
