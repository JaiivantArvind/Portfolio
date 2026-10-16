import { useState } from "react";
import { ChevronDown, Filter, X, Sparkles, Workflow } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "../data/resume";
import { showToast } from "../utils/toast";

interface TechBadgeProps {
  label: string;
  isActive?: boolean;
  onClick?: (e: React.MouseEvent) => void;
}

function TechBadge({ label, isActive, onClick }: TechBadgeProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-block px-2.5 py-1 text-[10px] uppercase font-mono tracking-wider transition-all duration-200 cursor-pointer rounded ${
        isActive
          ? "border border-accent text-accent bg-accent/15 font-semibold shadow-sm"
          : "border border-border text-muted hover:text-text hover:border-accent/50 bg-white/[0.02]"
      }`}
      title={`Filter by ${label}`}
    >
      {label}
    </button>
  );
}

interface ProjectRowProps {
  project: (typeof projects)[number];
  index: number;
  activeSkillFilter?: string | null;
  onSelectSkill?: (skill: string | null) => void;
  onOpenDeepDive?: (projectId: string) => void;
}

function ProjectRow({
  project,
  index,
  activeSkillFilter,
  onSelectSkill,
  onOpenDeepDive,
}: ProjectRowProps) {
  const [userExpanded, setUserExpanded] = useState<boolean | null>(null);

  // Automatically expand if matching the active skill filter
  const matchesFilter = activeSkillFilter
    ? project.tech.some(
        (t) => t.toLowerCase() === activeSkillFilter.toLowerCase()
      )
    : false;

  const isExpanded = userExpanded ?? matchesFilter;

  const rowId = `project-${project.title.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <motion.div
      id={rowId}
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "150px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className={`group relative py-10 border-b transition-all duration-500 cursor-pointer ${
        activeSkillFilter && matchesFilter
          ? "border-accent bg-accent/[0.02] px-4 -mx-4 rounded-xl my-2"
          : activeSkillFilter && !matchesFilter
          ? "opacity-40 border-border"
          : "border-border hover:border-accent"
      }`}
      onClick={() => setUserExpanded(!isExpanded)}
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        {/* Index and Title */}
        <div className="flex items-baseline gap-8">
          <span className="font-heading text-accent text-sm italic opacity-60 tabular-nums">
            0{index + 1}
          </span>
          <div>
            <div className="flex items-center gap-3">
              <h3 className="text-2xl md:text-4xl font-heading group-hover:translate-x-2 transition-transform duration-300">
                {project.title}
              </h3>
              {activeSkillFilter && matchesFilter && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[9px] uppercase font-mono tracking-wider bg-accent/20 text-accent rounded-full font-medium">
                  <Sparkles size={10} /> Matches {activeSkillFilter}
                </span>
              )}
            </div>
            <p className="text-muted text-xs font-light mt-1 md:hidden">
              {project.subtitle}
            </p>
          </div>
        </div>

        {/* Subtitle and Toggle */}
        <div className="flex items-center justify-between md:justify-end gap-4">
          <span className="text-muted text-sm font-light md:block hidden">
            {project.subtitle}
          </span>
          <div
            className={`w-10 h-10 rounded-full border border-border flex items-center justify-center transition-all duration-300 ${
              isExpanded ? "bg-accent text-base" : "text-muted group-hover:border-accent"
            }`}
          >
            <motion.div animate={{ rotate: isExpanded ? 180 : 0 }}>
              <ChevronDown size={16} />
            </motion.div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 overflow-hidden"
          >
            <div className="grid md:grid-cols-3 gap-12">
              <div className="md:col-span-1">
                <p className="text-muted leading-relaxed font-light italic text-sm">
                  {project.description}
                </p>
              </div>
              <div className="md:col-span-2">
                <ul className="space-y-4">
                  {project.bullets.map((bullet, i) => (
                    <li key={i} className="text-sm text-muted/90 flex gap-3 leading-relaxed">
                      <span className="text-accent shrink-0 font-bold">—</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2 mt-8 items-center">
                  <span className="text-[10px] uppercase font-mono text-muted-2 mr-1">
                    Tech Stack:
                  </span>
                  {project.tech.map((t) => {
                    const isBadgeActive =
                      activeSkillFilter?.toLowerCase() === t.toLowerCase();
                    return (
                      <TechBadge
                        key={t}
                        label={t}
                        isActive={isBadgeActive}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onSelectSkill) {
                            onSelectSkill(isBadgeActive ? null : t);
                            showToast(
                              isBadgeActive
                                ? "Reset skill filter"
                                : `Focused on ${t} in Tech Matrix & Projects`
                            );
                          }
                        }}
                      />
                    );
                  })}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 mt-8 pt-6 border-t border-border/50">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onOpenDeepDive) {
                        onOpenDeepDive(project.title.toLowerCase().replace(/\s+/g, "-"));
                      }
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2 text-xs font-mono uppercase tracking-wider bg-accent text-base font-semibold hover:bg-accent-hover transition-colors rounded-lg cursor-pointer shadow-sm"
                  >
                    <Workflow size={13} />
                    <span>System Architecture & Deep Dive</span>
                  </button>

                  <span className="text-[11px] font-mono text-muted-2 hidden sm:inline">
                    Interactive pipeline, engineering challenges & code breakdown
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

interface ProjectsProps {
  activeSkillFilter?: string | null;
  onSelectSkill?: (skill: string | null) => void;
  onOpenDeepDive?: (projectId: string) => void;
}

export function Projects({
  activeSkillFilter,
  onSelectSkill,
  onOpenDeepDive,
}: ProjectsProps) {
  const visibleProjects = projects.filter((p) => {
    if (!activeSkillFilter) return true;
    return p.tech.some(
      (t) => t.toLowerCase() === activeSkillFilter.toLowerCase()
    );
  });

  return (
    <section id="projects" className="py-24 px-6 relative">
      <div className="max-w-5xl mx-auto">
        <div className="mb-14 max-w-2xl">
          <p className="text-accent text-xs tracking-[0.3em] uppercase font-medium mb-4">
            Selected Works
          </p>
          <h2 className="text-4xl md:text-6xl mb-6 font-heading">
            Engineering <br />
            <span className="italic font-light">with Precision.</span>
          </h2>
          <p className="text-muted text-lg font-light leading-relaxed">
            A curated collection of production engineering projects spanning
            blockchain provenance, AI automation pipelines, and legacy systems
            arithmetic.
          </p>
        </div>

        {/* Active Skill Filter Banner */}
        <AnimatePresence>
          {activeSkillFilter && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-8 p-3.5 rounded-xl bg-surface-2 border border-accent/40 flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-2.5 text-xs font-mono">
                <Filter size={14} className="text-accent" />
                <span className="text-muted">Filtering projects utilizing:</span>
                <span className="text-accent font-semibold px-2 py-0.5 rounded bg-accent/10 border border-accent/30">
                  {activeSkillFilter}
                </span>
                <span className="text-muted-2 hidden sm:inline">
                  ({visibleProjects.length} of {projects.length} projects)
                </span>
              </div>

              {onSelectSkill && (
                <button
                  type="button"
                  onClick={() => onSelectSkill(null)}
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-muted hover:text-text px-2.5 py-1 rounded bg-surface border border-border hover:border-accent/40 transition-colors cursor-pointer"
                >
                  <X size={12} />
                  <span>Show All ({projects.length})</span>
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex flex-col">
          {projects.map((p, i) => (
            <ProjectRow
              key={p.title}
              project={p}
              index={i}
              activeSkillFilter={activeSkillFilter}
              onSelectSkill={onSelectSkill}
              onOpenDeepDive={onOpenDeepDive}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

