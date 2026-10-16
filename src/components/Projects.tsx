import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "../data/resume";

function TechBadge({ label }: { label: string }) {
  return (
    <span
      className="inline-block px-2 py-1 border border-border text-[10px] uppercase tracking-wider text-muted font-medium"
      style={{
        backgroundColor: "rgba(255,255,255,0.02)",
      }}
    >
      {label}
    </span>
  );
}

function ProjectRow({ project, index }: { project: (typeof projects)[number]; index: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "150px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group relative py-12 border-b border-border hover:border-accent transition-colors duration-500 cursor-pointer"
      onClick={() => setExpanded(!expanded)}
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        {/* Index and Title */}
        <div className="flex items-baseline gap-8">
          <span className="font-heading text-accent text-sm italic opacity-60 tabular-nums">
            0{index + 1}
          </span>
          <h3 className="text-2xl md:text-4xl font-heading group-hover:translate-x-2 transition-transform duration-300">
            {project.title}
          </h3>
        </div>

        {/* Subtitle and Toggle */}
        <div className="flex items-center justify-between md:justify-end gap-4">
          <span className="text-muted text-sm font-light md:block hidden">
            {project.subtitle}
          </span>
          <div className={`w-10 h-10 rounded-full border border-border flex items-center justify-center transition-all duration-300 ${expanded ? 'bg-accent text-base' : 'text-muted group-hover:border-accent'}`}>
            <motion.div animate={{ rotate: expanded ? 180 : 0 }}>
              <ChevronDown size={16} />
            </motion.div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 overflow-hidden"
          >
            <div className="grid md:grid-cols-3 gap-12">
              <div className="md:col-span-1">
                <p className="text-muted leading-relaxed font-light italic">
                  {project.description}
                </p>
              </div>
              <div className="md:col-span-2">
                <ul className="space-y-4">
                  {project.bullets.map((bullet, i) => (
                    <li key={i} className="text-sm text-muted/80 flex gap-3">
                      <span className="text-accent shrink-0">—</span>
                      {bullet}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2 mt-8">
                  {project.tech.map((t) => (
                    <TechBadge key={t} label={t} />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function Projects() {
  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-20 max-w-2xl">
          <p className="text-accent text-xs tracking-[0.3em] uppercase font-medium mb-4">
            Selected Works
          </p>
          <h2 className="text-4xl md:text-6xl mb-6">
            Engineering <br />
            <span className="italic font-light">with Precision.</span>
          </h2>
          <p className="text-muted text-lg font-light leading-relaxed">
            A curated collection of projects focusing on blockchain provenance,
            AI-driven automation, and low-level system architecture.
          </p>
        </div>

        <div className="flex flex-col">
          {projects.map((p, i) => (
            <ProjectRow key={p.title} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
