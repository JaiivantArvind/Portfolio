import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Cpu,
  Database,
  Sparkles,
  Blocks,
  Workflow,
  Layout,
  Code2,
  Copy,
  Check,
  ChevronRight,
  Info,
} from "lucide-react";
import type { ArchitectureNode } from "../data/projectDetails";

interface ArchitectureVisualizerProps {
  nodes: ArchitectureNode[];
}

const nodeTypeIcons: Record<string, React.ReactNode> = {
  client: <Layout size={14} className="text-accent" />,
  compute: <Cpu size={14} className="text-accent" />,
  contract: <Blocks size={14} className="text-accent" />,
  pipeline: <Workflow size={14} className="text-accent" />,
  database: <Database size={14} className="text-accent" />,
  ai: <Sparkles size={14} className="text-accent" />,
};

export function ArchitectureVisualizer({ nodes }: ArchitectureVisualizerProps) {
  const [selectedNodeId, setSelectedNodeId] = useState<string>(
    nodes[0]?.id ?? ""
  );
  const [copied, setCopied] = useState(false);

  const activeNode = nodes.find((n) => n.id === selectedNodeId) ?? nodes[0];

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!nodes || nodes.length === 0) return null;

  return (
    <div className="space-y-6">
      {/* Pipeline Flow Diagram Container */}
      <div className="relative p-5 rounded-2xl bg-surface border border-border/80 overflow-x-auto scrollbar-thin">
        <div className="flex items-center gap-2 mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          <span className="text-[10px] uppercase font-mono tracking-widest text-muted-2">
            Interactive System Flow Pipeline • Click Any Subsystem Node
          </span>
        </div>

        {/* Nodes Track */}
        <div className="flex items-stretch gap-3 min-w-[620px] pb-2">
          {nodes.map((node, i) => {
            const isSelected = node.id === activeNode.id;
            return (
              <div key={node.id} className="flex items-center flex-1">
                <button
                  type="button"
                  onClick={() => setSelectedNodeId(node.id)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all duration-300 relative group cursor-pointer ${
                    isSelected
                      ? "bg-surface-2 border-accent shadow-lg shadow-accent/5 ring-1 ring-accent/30"
                      : "bg-surface-2/40 hover:bg-surface-2/80 border-border hover:border-accent/40"
                  }`}
                >
                  {/* Step & Type */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-mono tracking-wider text-muted-2 font-semibold">
                      0{node.step}
                    </span>
                    <div className="w-6 h-6 rounded-md bg-surface flex items-center justify-center border border-border">
                      {nodeTypeIcons[node.type] ?? <Cpu size={13} />}
                    </div>
                  </div>

                  {/* Title & Tech */}
                  <h5 className="text-xs font-semibold text-text group-hover:text-accent transition-colors truncate">
                    {node.title}
                  </h5>
                  <p className="text-[10px] font-mono text-muted truncate mt-0.5">
                    {node.tech}
                  </p>

                  {/* Active Indicator Glow */}
                  {isSelected && (
                    <motion.div
                      layoutId="activeFlowIndicator"
                      className="absolute -bottom-[1px] left-3 right-3 h-[2px] bg-accent"
                    />
                  )}
                </button>

                {/* Arrow connector */}
                {i < nodes.length - 1 && (
                  <div className="px-2 text-muted-2 shrink-0">
                    <ChevronRight size={14} className="text-muted/60" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Node Deep Inspector */}
      <AnimatePresence mode="wait">
        {activeNode && (
          <motion.div
            key={activeNode.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="p-5 rounded-2xl bg-surface-2/80 border border-border space-y-4"
          >
            {/* Inspector Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border/60">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-accent/20 text-accent">
                  NODE 0{activeNode.step}
                </span>
                <h4 className="text-base font-heading font-medium text-text">
                  {activeNode.title}
                </h4>
                <span className="text-[11px] font-mono text-muted bg-surface px-2 py-0.5 rounded border border-border">
                  {activeNode.tech}
                </span>
              </div>

              <div className="flex items-center gap-2 text-[11px] font-mono text-muted-2">
                <Info size={12} className="text-accent" />
                <span className="capitalize">{activeNode.type} Subsystem</span>
              </div>
            </div>

            {/* Role & Mechanics */}
            <div className="space-y-2">
              <p className="text-xs font-mono text-muted leading-relaxed">
                <span className="text-accent uppercase tracking-wider font-semibold mr-2">
                  System Role:
                </span>
                {activeNode.role}
              </p>
              <p className="text-sm text-text/90 font-light leading-relaxed">
                {activeNode.details}
              </p>
            </div>

            {/* Code Snippet if Available */}
            {activeNode.codeSnippet && (
              <div className="mt-4 pt-3 border-t border-border/40">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-muted-2 flex items-center gap-1.5">
                    <Code2 size={12} className="text-accent" />
                    Simplified excerpt
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopy(activeNode.codeSnippet!)}
                    className="flex items-center gap-1 text-[10px] font-mono text-muted hover:text-text px-2 py-0.5 rounded bg-surface border border-border hover:border-accent transition-colors cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check size={11} className="text-accent" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy size={11} />
                        <span>Copy Logic</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="p-3.5 rounded-xl bg-black/60 border border-border/80 font-mono text-xs text-text/90 overflow-x-auto scrollbar-thin">
                  <pre className="leading-relaxed">
                    <code>{activeNode.codeSnippet}</code>
                  </pre>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
