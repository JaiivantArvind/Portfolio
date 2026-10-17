// Every skill must list at least one project in `projects`. Add a skill only when a repo supports it.

export type TechDomain = "all" | "systems" | "web3" | "ai" | "fullstack";

export interface TechSkill {
  id: string;
  name: string;
  domain: "systems" | "web3" | "ai" | "fullstack";
  level: "Architectural" | "Production" | "Core Focus" | "Specialized";
  tag: string;
  description: string;
  projects: string[];
  featured?: boolean;
}

export interface DomainMeta {
  id: TechDomain;
  label: string;
  shortLabel: string;
  description: string;
  count: number;
}

export const techSkills: TechSkill[] = [
  // ── Systems & Low-Level ──
  {
    id: "asm-8086",
    name: "8086 Assembly",
    domain: "systems",
    level: "Architectural",
    tag: "MASM / DOSBox",
    description: "Real-time trade duty arithmetic executed inside headless DOSBox; built 32-bit math library to bypass 16-bit division overflow.",
    projects: ["TradeGate"],
    featured: true,
  },
  {
    id: "bin-patch",
    name: "Byte-Signature Binary Patching",
    domain: "systems",
    level: "Specialized",
    tag: "Byte Signature",
    description: "Python runtime injector identifying data structures in compiled .EXE binaries via byte-signature pattern matching.",
    projects: ["TradeGate"],
    featured: true,
  },

  // ── Blockchain & Web3 ──
  {
    id: "solidity",
    name: "Solidity",
    domain: "web3",
    level: "Production",
    tag: "UUPS ERC-1155",
    description: "Architected UUPS-upgradeable smart contracts with role-gated state machines and Pausable circuit breakers for emergency recalls.",
    projects: ["SupplyTrace"],
    featured: true,
  },
  {
    id: "the-graph",
    name: "The Graph (Subgraph)",
    domain: "web3",
    level: "Production",
    tag: "GraphQL Indexer",
    description: "Engineered real-time indexing layer mapping contract emission logs into a queryable GraphQL schema, slashing RPC latency.",
    projects: ["SupplyTrace"],
    featured: true,
  },
  {
    id: "hardhat",
    name: "Hardhat",
    domain: "web3",
    level: "Production",
    tag: "Testing & Deploy",
    description: "Authored 60+ unit tests for deterministic state validation of the contracts.",
    projects: ["SupplyTrace"],
  },
  {
    id: "ipfs",
    name: "IPFS & Pinata",
    domain: "web3",
    level: "Core Focus",
    tag: "Decentralized Storage",
    description: "Automated cryptographic content-addressed pinning for tamper-proof supply chain product credentials and metadata.",
    projects: ["SupplyTrace"],
  },
  {
    id: "gnosis-safe",
    name: "Gnosis Safe Governance",
    domain: "web3",
    level: "Architectural",
    tag: "Multi-Sig",
    description: "Configured multi-signature threshold governance and OpenZeppelin AccessControl for admin parameter migrations.",
    projects: ["SupplyTrace"],
  },

  // ── AI & Machine Learning ──
  {
    id: "pytorch",
    name: "PyTorch",
    domain: "ai",
    level: "Production",
    tag: "MobileNetV3",
    description: "Classifies 156 Unicode Tamil characters at sub-50ms latency using automatic mixed-precision (AMP) and AdamW with Cosine Annealing.",
    projects: ["TamilVision"],
    featured: true,
  },
  {
    id: "opencv",
    name: "OpenCV",
    domain: "ai",
    level: "Production",
    tag: "Vision Pipeline",
    description: "12-step image enhancement pipeline featuring Otsu's adaptive binarization, smart inversion, and Lanczos bicubic resampling.",
    projects: ["TamilVision"],
    featured: true,
  },
  {
    id: "gemini-ai",
    name: "Gemini 2.5 Flash and 2.5 Flash Lite",
    domain: "ai",
    level: "Core Focus",
    tag: "Live Tariff & Embeddings",
    description: "Real-time extraction of WTO MFN tariff schedules with fallback to assembly tables in TradeGate; semantic embeddings in TalentFit.",
    projects: ["TradeGate", "TalentFit"],
    featured: true,
  },
  {
    id: "nlp",
    name: "NLP & TF-IDF",
    domain: "ai",
    level: "Core Focus",
    tag: "Dual-Scoring",
    description: "Dual-scoring heuristic combining TF-IDF keyword frequency scoring with dense vector contextual alignment.",
    projects: ["TalentFit"],
  },

  // ── Full Stack & Cloud ──
  {
    id: "react",
    name: "React 18 / 19",
    domain: "fullstack",
    level: "Production",
    tag: "UI Architecture",
    description: "Engineered luxury editorial interfaces, custom Canvas shaders, Command Palette systems, and resilient reactive SPAs.",
    projects: ["SupplyTrace", "TradeGate", "Mentora", "TalentFit"],
    featured: true,
  },
  {
    id: "typescript",
    name: "TypeScript",
    domain: "fullstack",
    level: "Core Focus",
    tag: "Type Systems",
    description: "End-to-end type safety across browser APIs, contract ABI interfaces, WebGL pipelines, and asynchronous state machines.",
    projects: ["TradeGate", "SupplyTrace"],
    featured: true,
  },
  {
    id: "nextjs",
    name: "Next.js",
    domain: "fullstack",
    level: "Production",
    tag: "Full Stack Framework",
    description: "SSR and App Router architecture with GPU-accelerated Three.js GLSL shaders and responsive editorial layouts.",
    projects: ["TamilVision"],
    featured: true,
  },
  {
    id: "fastapi",
    name: "FastAPI",
    domain: "fullstack",
    level: "Production",
    tag: "Async REST APIs",
    description: "Asynchronous Python server streaming sub-50ms image inference requests to PyTorch GPU tensors.",
    projects: ["TamilVision"],
    featured: true,
  },
  {
    id: "flask",
    name: "Flask",
    domain: "fullstack",
    level: "Core Focus",
    tag: "Microservices",
    description: "Lazy-loaded microservice holding ~300MB memory footprint for on-demand document evaluation and DOSBox bridge.",
    projects: ["TradeGate", "TalentFit"],
  },
  {
    id: "supabase",
    name: "Supabase & PostgreSQL",
    domain: "fullstack",
    level: "Production",
    tag: "BaaS & Auth",
    description: "Google OAuth identity providers, row-level security (RLS), and real-time subscription synchronization.",
    projects: ["TradeGate", "Mentora"],
  },
  {
    id: "tailwind",
    name: "Tailwind CSS v4",
    domain: "fullstack",
    level: "Production",
    tag: "Design System",
    description: "Curated dark luxury editorial design tokens, CSS variables, glassmorphic surfaces, and responsive grids.",
    projects: ["SupplyTrace", "TamilVision", "TradeGate", "Mentora"],
  },
  {
    id: "threejs",
    name: "Three.js & WebGL",
    domain: "fullstack",
    level: "Specialized",
    tag: "3D & Shaders",
    description: "Interactive 3D scenes, GLSL Perlin-noise shaders, and WebGL rendering.",
    projects: ["TamilVision"],
  },
  {
    id: "git",
    name: "Git & CI/CD",
    domain: "fullstack",
    level: "Core Focus",
    tag: "DevOps & Vercel",
    description: "Automated continuous deployment pipelines, multi-branch Git strategies, and Vercel edge deployment.",
    projects: ["SupplyTrace", "Mentora"],
  },
];

export const domainFilters: DomainMeta[] = [
  {
    id: "all",
    label: "All Disciplines",
    shortLabel: "All",
    description: "Full architectural spectrum from low-level assembly to decentralized systems and AI pipelines.",
    count: techSkills.length,
  },
  {
    id: "systems",
    label: "Systems & Low-Level",
    shortLabel: "Systems",
    description: "8086 MASM Assembly, headless DOSBox execution, and byte-signature binary patchers.",
    count: techSkills.filter((s) => s.domain === "systems").length,
  },
  {
    id: "web3",
    label: "Blockchain & Web3",
    shortLabel: "Web3",
    description: "Solidity UUPS smart contracts, The Graph subgraphs, Hardhat suites, and multi-sig Gnosis Safe governance.",
    count: techSkills.filter((s) => s.domain === "web3").length,
  },
  {
    id: "ai",
    label: "AI & Machine Learning",
    shortLabel: "AI & Vision",
    description: "MobileNetV3 PyTorch adaptation, 12-step OpenCV vision pipelines, and Gemini 2.5 Flash and 2.5 Flash Lite.",
    count: techSkills.filter((s) => s.domain === "ai").length,
  },
  {
    id: "fullstack",
    label: "Full Stack & Cloud",
    shortLabel: "Full Stack",
    description: "React 19, TypeScript, Next.js, FastAPI, Flask, Supabase PostgreSQL, and WebGL Three.js shaders.",
    count: techSkills.filter((s) => s.domain === "fullstack").length,
  },
];
