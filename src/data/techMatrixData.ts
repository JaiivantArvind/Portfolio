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
  {
    id: "c-cpp",
    name: "C & C++",
    domain: "systems",
    level: "Core Focus",
    tag: "Systems Programming",
    description: "Low-level memory management, algorithmic pipelines, data structures, and embedded micro-controller logic.",
    projects: ["TradeGate", "Robomations Internship"],
    featured: true,
  },
  {
    id: "robotics-hardware",
    name: "Hardware & Robotics Prototyping",
    domain: "systems",
    level: "Production",
    tag: "Arduino / 555 IC / RF",
    description: "Engineered Edge Detector, Line Follower, and Battle Bot with Arduino Uno, L293D/L298N drivers, 555 timer ICs, and NRF24L01 RF modules.",
    projects: ["Robomations Internship"],
  },

  // ── Blockchain & Web3 ──
  {
    id: "solidity",
    name: "Solidity & Smart Contracts",
    domain: "web3",
    level: "Production",
    tag: "UUPS ERC-1155",
    description: "Architected UUPS-upgradeable ERC-1155 smart contracts with role-gated state machines and Pausable circuit breakers for emergency recalls.",
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
    description: "Authored 60+ unit tests validating deterministic state transitions across Manufacturer, Distributor, and Retailer roles.",
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
    tag: "Deep Learning",
    description: "Classifies 156 Unicode Tamil characters at sub-50ms latency using automatic mixed-precision (AMP) and AdamW with Cosine Annealing.",
    projects: ["TamilVision"],
    featured: true,
  },
  {
    id: "opencv",
    name: "OpenCV & Computer Vision",
    domain: "ai",
    level: "Production",
    tag: "Vision Pipeline",
    description: "12-step image enhancement pipeline featuring Otsu's adaptive binarization, smart inversion, and Lanczos bicubic resampling.",
    projects: ["TamilVision"],
    featured: true,
  },
  {
    id: "semantic-embeddings",
    name: "Semantic Embeddings & LLM Integration",
    domain: "ai",
    level: "Production",
    tag: "Gemini / Dense Vectors",
    description: "Dual-scoring evaluation engine pairing keyword matching with Gemini semantic embeddings (text-embedding-004) for contextual nuance.",
    projects: ["TalentFit", "TradeGate", "Stayright Internship"],
    featured: true,
  },
  {
    id: "nlp",
    name: "NLP & Data Pipelines",
    domain: "ai",
    level: "Core Focus",
    tag: "Pandas / Scikit-Learn",
    description: "Automated multi-format parsing pipeline (PDF, DOCX, TXT) extracting text and auto-identifying 35+ technical skill clusters.",
    projects: ["TalentFit"],
  },

  // ── Full Stack & Cloud ──
  {
    id: "react",
    name: "React & Vite",
    domain: "fullstack",
    level: "Production",
    tag: "SPA Architecture",
    description: "Engineered responsive single-page applications, dynamic multi-role routing, Canvas visualizers, and state management in production.",
    projects: ["Mentora", "SupplyTrace", "TalentFit", "TradeGate"],
    featured: true,
  },
  {
    id: "typescript",
    name: "TypeScript & JavaScript",
    domain: "fullstack",
    level: "Core Focus",
    tag: "Type Systems",
    description: "End-to-end type safety across browser APIs, contract ABI interfaces, WebGL pipelines, and asynchronous state machines.",
    projects: ["TradeGate", "SupplyTrace", "Mentora"],
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
    id: "postgresql-dbs",
    name: "PostgreSQL & Database Optimization",
    domain: "fullstack",
    level: "Production",
    tag: "Schemas & DBeaver",
    description: "Designed structured relational schemas, optimized complex backend queries, and implemented Row-Level Security policies.",
    projects: ["Stayright Internship", "Mentora"],
    featured: true,
  },
  {
    id: "supabase",
    name: "Supabase BaaS",
    domain: "fullstack",
    level: "Production",
    tag: "Auth & Realtime",
    description: "Google OAuth identity providers, row-level security (RLS), and real-time subscription synchronization for multi-role workflows.",
    projects: ["Mentora", "TradeGate"],
  },
  {
    id: "fastapi",
    name: "FastAPI & Python",
    domain: "fullstack",
    level: "Production",
    tag: "Async REST APIs",
    description: "Asynchronous Python server streaming sub-50ms image inference requests to PyTorch GPU tensors.",
    projects: ["TamilVision"],
  },
  {
    id: "flask",
    name: "Flask Microservices",
    domain: "fullstack",
    level: "Core Focus",
    tag: "Backend APIs",
    description: "Lightweight backend APIs connecting parsing pipelines, Gemini embeddings, and DOSBox binary patchers.",
    projects: ["TalentFit", "TradeGate"],
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    domain: "fullstack",
    level: "Production",
    tag: "Design System",
    description: "Curated dark luxury editorial design tokens, responsive layouts, glassmorphism, and accessible UI components.",
    projects: ["Mentora", "SupplyTrace", "TamilVision", "TalentFit"],
  },
  {
    id: "docker-cloud",
    name: "Docker, Git & Vercel CI/CD",
    domain: "fullstack",
    level: "Production",
    tag: "DevOps & Cloud",
    description: "Containerized development environments, automated Git-driven CI/CD pipelines, and multi-cloud deployment across Vercel, AWS, and Azure.",
    projects: ["Mentora", "SupplyTrace", "Stayright Internship"],
  },
  {
    id: "threejs",
    name: "Three.js & WebGL",
    domain: "fullstack",
    level: "Specialized",
    tag: "3D & Shaders",
    description: "Interactive 3D scenes, GLSL Perlin-noise shaders, and WebGL rendering for immersive technical experiences.",
    projects: ["TamilVision"],
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
