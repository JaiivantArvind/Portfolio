import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Cpu,
  Layers,
  Sparkles,
  ArrowRight,
  Search,
  X,
  Code2,
  Terminal,
  Blocks,
  Binary,
} from "lucide-react";
import { techSkills, domainFilters, type TechDomain } from "../data/techMatrixData";

interface TechMatrixProps {
  selectedSkill: string | null;
  onSelectSkill: (skillName: string | null) => void;
  onJumpToProject?: (projectTitle: string) => void;
}

const domainIcons: Record<string, React.ReactNode> = {
  all: <Layers size={14} />,
  systems: <Binary size={14} />,
  web3: <Blocks size={14} />,
  ai: <Sparkles size={14} />,
  fullstack: <Code2 size={14} />,
};

export function TechMatrix({
  selectedSkill,
  onSelectSkill,
  onJumpToProject,
}: TechMatrixProps) {
  const [activeDomain, setActiveDomain] = useState<TechDomain>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter skills based on domain tab and search query
  const filteredSkills = useMemo(() => {
    return techSkills.filter((skill) => {
      const matchesDomain = activeDomain === "all" || skill.domain === activeDomain;
      if (!matchesDomain) return false;

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        skill.name.toLowerCase().includes(q) ||
        skill.tag.toLowerCase().includes(q) ||
        skill.description.toLowerCase().includes(q) ||
        skill.projects.some((p) => p.toLowerCase().includes(q))
      );
    });
  }, [activeDomain, searchQuery]);

  // Active skill details
  const activeSkillObj = useMemo(() => {
    if (!selectedSkill) return null;
    return techSkills.find(
      (s) => s.name.toLowerCase() === selectedSkill.toLowerCase()
    ) || null;
  }, [selectedSkill]);

  const handleProjectClick = (projectName: string) => {
    if (onJumpToProject) {
      onJumpToProject(projectName);
    } else {
      const el = document.getElementById("projects");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section id="skills" className="py-24 px-6 bg-surface relative overflow-hidden">
      {/* Background Architectural Grid Lines */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #c5a35d 1px, transparent 1px), linear-gradient(to bottom, #c5a35d 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <p className="text-accent text-xs tracking-[0.3em] uppercase font-mono font-medium">
                Engineering Spectrum & Skill Graph
              </p>
            </div>
            <h2 className="text-4xl md:text-6xl mb-4 font-heading">
              The Tech <br />
              <span className="italic font-light">Matrix.</span>
            </h2>
            <p className="text-muted text-base md:text-lg font-light leading-relaxed">
              Explore technologies across low-level assembly, decentralized Web3
              infrastructure, and computer vision models. Click any node to trace its
              direct architectural implementation across delivered projects.
            </p>
          </div>

          {/* Quick Search Input */}
          <div className="w-full md:w-72">
            <div className="relative">
              <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter by skill or project..."
                className="w-full pl-9 pr-8 py-2 text-xs bg-surface-2/90 border border-border focus:border-accent text-text placeholder:text-muted-2 rounded-lg outline-none font-sans transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted hover:text-text p-0.5"
                  aria-label="Clear search"
                >
                  <X size={12} />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Domain Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none border-b border-border/60">
          {domainFilters.map((df) => {
            const isActive = activeDomain === df.id;
            return (
              <button
                key={df.id}
                onClick={() => setActiveDomain(df.id)}
                className={`relative px-4 py-2 text-xs font-mono tracking-wider uppercase rounded-lg transition-all duration-300 flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? "text-accent bg-accent/10 border border-accent/40 font-semibold shadow-sm"
                    : "text-muted hover:text-text bg-surface-2/40 hover:bg-surface-2 border border-border/70"
                }`}
              >
                <span className={isActive ? "text-accent" : "text-muted-2"}>
                  {domainIcons[df.id]}
                </span>
                <span>{df.shortLabel}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isActive ? "bg-accent/20 text-accent" : "bg-surface border border-border text-muted-2"
                  }`}
                >
                  {df.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Skill Architectural Inspector Bar */}
        <AnimatePresence>
          {activeSkillObj && (
            <motion.div
              initial={{ opacity: 0, y: -10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden mb-10"
            >
              <div className="bg-surface-2/90 border border-accent/40 rounded-xl p-5 shadow-2xl relative">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="text-xs uppercase font-mono px-2 py-0.5 bg-accent/20 text-accent rounded font-medium">
                        {activeSkillObj.domain.toUpperCase()}
                      </span>
                      <h4 className="text-lg font-heading text-text font-semibold">
                        {activeSkillObj.name}
                      </h4>
                      <span className="text-[11px] font-mono text-muted bg-surface px-2 py-0.5 rounded border border-border">
                        {activeSkillObj.level}
                      </span>
                    </div>
                    <p className="text-sm text-text/90 font-light leading-relaxed max-w-3xl">
                      {activeSkillObj.description}
                    </p>
                  </div>

                  <button
                    onClick={() => onSelectSkill(null)}
                    className="self-start text-xs font-mono text-muted hover:text-text flex items-center gap-1.5 px-2.5 py-1 rounded bg-surface border border-border hover:border-accent/40 transition-colors shrink-0 cursor-pointer"
                  >
                    <X size={12} />
                    <span>Clear Focus</span>
                  </button>
                </div>

                {/* Direct Project Jump Links */}
                <div className="mt-4 pt-4 border-t border-border/70 flex flex-wrap items-center gap-3">
                  <span className="text-[11px] uppercase tracking-wider font-mono text-muted-2">
                    Direct Implementation:
                  </span>
                  {activeSkillObj.projects.map((proj) => (
                    <button
                      key={proj}
                      onClick={() => handleProjectClick(proj)}
                      className="group/btn inline-flex items-center gap-2 px-3 py-1 bg-surface hover:bg-accent/10 border border-border hover:border-accent text-xs font-medium text-text hover:text-accent rounded-md transition-all duration-200 cursor-pointer"
                    >
                      <span>{proj}</span>
                      <ArrowRight size={12} className="group-hover/btn:translate-x-0.5 transition-transform" />
                    </button>
                  ))}
                  <span className="text-[11px] text-muted-2 italic ml-auto hidden sm:inline">
                    Click a project to scroll directly to its engineering breakdown
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSkills.map((skill, index) => {
            const isSelected =
              selectedSkill?.toLowerCase() === skill.name.toLowerCase();

            return (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "100px" }}
                transition={{ duration: 0.35, delay: index * 0.03 }}
                onClick={() => {
                  onSelectSkill(isSelected ? null : skill.name);
                }}
                className={`group relative p-4 rounded-xl border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? "bg-surface-2 border-accent shadow-lg shadow-accent/5 ring-1 ring-accent/30"
                    : "bg-surface/60 hover:bg-surface-2 border-border/80 hover:border-accent/50"
                }`}
              >
                {/* Card Top: Name & Level */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="font-heading font-medium text-base text-text group-hover:text-accent transition-colors flex items-center gap-2">
                      <span
                        className={`w-1.5 h-1.5 rounded-full transition-colors ${
                          isSelected
                            ? "bg-accent"
                            : skill.featured
                            ? "bg-accent/70"
                            : "bg-border group-hover:bg-accent/50"
                        }`}
                      />
                      {skill.name}
                    </span>
                    <span className="text-[10px] font-mono tracking-wider uppercase px-2 py-0.5 rounded bg-surface border border-border/70 text-muted-2 group-hover:text-muted">
                      {skill.tag}
                    </span>
                  </div>

                  <p className="text-xs text-muted leading-relaxed line-clamp-2 font-light">
                    {skill.description}
                  </p>
                </div>

                {/* Card Bottom: Project linkages */}
                <div className="mt-4 pt-3 border-t border-border/40 flex items-center justify-between text-[11px] font-mono">
                  <div className="flex items-center gap-1.5 text-muted-2 group-hover:text-muted">
                    <Terminal size={11} className={isSelected ? "text-accent" : ""} />
                    <span>{skill.projects.join(" • ")}</span>
                  </div>

                  <div className="flex items-center gap-1 text-[10px] text-muted-2 group-hover:text-accent">
                    <span>{isSelected ? "Active" : "Inspect"}</span>
                    <ArrowRight
                      size={11}
                      className={`transition-transform duration-200 ${
                        isSelected ? "translate-x-0.5 text-accent" : "group-hover:translate-x-0.5"
                      }`}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Empty Search Result Fallback */}
        {filteredSkills.length === 0 && (
          <div className="py-16 text-center text-muted border border-dashed border-border rounded-xl">
            <p className="text-base font-medium mb-1">No technologies match "{searchQuery}"</p>
            <p className="text-xs text-muted-2 mb-4">
              Try searching for "Solidity", "Assembly", "PyTorch", "OpenCV", or "React"
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveDomain("all");
              }}
              className="px-4 py-1.5 text-xs font-mono uppercase bg-surface-2 border border-border hover:border-accent text-accent rounded-lg transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Footer Spectrum Stat Bar */}
        <div className="mt-14 pt-6 border-t border-border/70 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-muted-2">
          <div className="flex items-center gap-4 flex-wrap">
            <span>24 Production Technologies</span>
            <span>•</span>
            <span>5 Full-Stack Case Studies</span>
            <span>•</span>
            <span>Cross-Project Linked</span>
          </div>

          <div className="text-[11px] text-accent/80 flex items-center gap-1.5">
            <Cpu size={12} />
            <span>Interactive Graph Active</span>
          </div>
        </div>
      </div>
    </section>
  );
}
