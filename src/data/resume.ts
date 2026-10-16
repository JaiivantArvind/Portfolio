export const personalInfo = {
  name: "Jaiivant Arvind",
  role: "Full Stack Engineer",
  tagline: "Building scalable web apps, blockchain systems & AI-powered tools.",
  location: "Bengaluru, Karnataka, India",
  email: "jaiivant@gmail.com",
  phone: "+91 9611717229",
  github: "https://github.com/JaiivantArvind",
  linkedin: "https://linkedin.com/in/jaiivant-arvind-570bab3a5",
  status: "Open to Opportunities",
};

export interface Project {
  title: string;
  subtitle: string;
  description: string;
  bullets: string[];
  tech: string[];
  github?: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    title: "SupplyTrace",
    subtitle: "Decentralized Supply Chain Provenance",
    description:
      "Tamper-proof product provenance system using upgradeable smart contracts and a real-time indexing layer on Ethereum Sepolia.",
    bullets: [
      "Architected a UUPS-upgradeable ERC-1155 smart contract with role-gated state machine (Manufacturer → Distributor → Retailer).",
      "Engineered a high-performance indexing layer using The Graph (subgraph), reducing frontend data retrieval latency vs. direct RPC calls.",
      "Implemented multi-sig governance via Gnosis Safe, OpenZeppelin AccessControl, and a Circuit Breaker (Pausable) for emergency recalls.",
      "Built a full-stack dashboard with an automated IPFS metadata pipeline via Pinata and QR verification pages for consumers.",
      "Validated logic through 60+ unit tests, achieving stable sub-second state transitions.",
    ],
    tech: ["Solidity", "React", "Hardhat", "The Graph", "IPFS", "Tailwind CSS"],
    featured: true,
  },
  {
    title: "TradeGate",
    subtitle: "AI-Powered International Tariff Engine",
    description:
      "Hybrid pipeline executing a legacy 8086 MASM assembly engine inside DOSBox with AI-sourced live tariff rates injected at the binary level.",
    bullets: [
      "Executes a legacy 8086 MASM assembly engine inside a headless DOSBox environment for real-time trade duty arithmetic.",
      'Engineered an "In-Memory Binary Patcher" in Python — identifies data structures in compiled .EXE via byte-signature matching.',
      "Integrated Google Gemini AI (2.5 Flash Lite) to dynamically fetch MFN rates with graceful fallback to hardcoded assembly tables.",
      "Developed a 32-bit math library in Assembly to bypass 16-bit DIV overflow, handling shipment values exceeding 65,535 USD.",
      "Built a React + TypeScript frontend with a custom Fibonacci sphere (Canvas 2D) and Supabase Google OAuth.",
    ],
    tech: ["8086 Assembly", "Python", "Flask", "Gemini AI", "React", "TypeScript", "Supabase"],
    featured: true,
  },
  {
    title: "TamilVision",
    subtitle: "Real-time OCR & Computer Vision",
    description:
      "High-performance OCR engine for 156 Unicode Tamil characters using a modified MobileNetV3 with sub-50ms inference latency.",
    bullets: [
      "Architected OCR engine using modified MobileNetV3-Small to classify 156 Unicode Tamil characters at sub-50ms latency.",
      "Engineered a 12-step OpenCV preprocessing pipeline using Otsu's Thresholding, Smart Inversion, and Lanczos Resampling.",
      "Developed a custom Grayscale Input Adapter, summing pretrained ImageNet RGB weights to reduce model VRAM footprint.",
      "Implemented Glassmorphism UI with Next.js 16 and Tailwind v4, featuring a GPU-accelerated Three.js / GLSL Perlin-noise background.",
      "Optimized with Mixed-Precision (AMP) and AdamW + Cosine Annealing scheduler, with heavy data augmentation.",
    ],
    tech: ["PyTorch", "FastAPI", "OpenCV", "Next.js", "Three.js", "Tailwind CSS"],
    featured: true,
  },
  {
    title: "AI Resume Analyzer",
    subtitle: "Intelligent Screening Engine",
    description:
      "Dual-scoring heuristic (TF-IDF + SBERT semantic embeddings) to evaluate resume-to-JD alignment with contextual nuance.",
    bullets: [
      "Architected a dual-scoring engine: 40% TF-IDF Keyword Match + 60% SBERT Semantic Embedding for contextual JD alignment.",
      "Engineered a Flask backend with Sentence-Transformers (all-MiniLM-L6-v2) and lazy model loading for ~300MB memory footprint.",
      "Built a robust data extraction pipeline supporting PDF, DOCX, TXT with automated identification of 35+ technical skill clusters.",
      "Developed a React 18 analytics dashboard with color-coded skill gap visualizations.",
      "Optimized inference to sub-3-second processing per document via streamlined vectorization and Axios HTTP communication.",
    ],
    tech: ["Python", "Flask", "SBERT", "React 18", "Tailwind CSS", "NLP"],
  },
  {
    title: "Mentora",
    subtitle: "Full-Stack Mentorship Platform",
    description:
      "Responsive mentorship platform connecting students and mentors with real-time data management and SPA experience.",
    bullets: [
      "Architected a full-stack mentorship platform using React and Vite with Tailwind CSS for cross-device compatibility.",
      "Integrated Supabase BaaS for user authentication and real-time database updates.",
      "Implemented dynamic routing and state management for a smooth SPA experience.",
      "Deployed via Vercel with a CI/CD pipeline for a live production environment.",
    ],
    tech: ["React", "Vite", "Tailwind CSS", "Supabase", "Vercel"],
  },
];

export interface ExperienceItem {
  role: string;
  org: string;
  period: string;
  bullets: string[];
}

export const experience: ExperienceItem[] = [
  {
    role: "Technical Club Member",
    org: "VIT Vellore — Technical Club",
    period: "2023 – Present",
    bullets: [
      "Participated in technical workshops and coding hackathons, collaborating with peers to solve complex algorithmic challenges.",
      "Contributed to team projects focusing on software development and system design best practices.",
    ],
  },
  {
    role: "Academic Peer Mentor",
    org: "VIT Vellore",
    period: "2023 – Present",
    bullets: [
      "Assisted fellow students in mastering core programming concepts in C and Java through informal tutoring sessions.",
      "Helped peers understand data structures, algorithms, and object-oriented programming fundamentals.",
    ],
  },
];

export const education = {
  institution: "Vellore Institute of Technology",
  location: "Vellore, India",
  degree: "Integrated MTech in Computer Science",
  period: "2023 – 2028",
};

export interface SkillCategory {
  category: string;
  skills: string[];
}

export const skills: SkillCategory[] = [
  {
    category: "Languages",
    skills: ["Java", "JavaScript", "TypeScript", "Python", "C", "C++", "SQL", "Solidity", "Assembly"],
  },
  {
    category: "Frontend",
    skills: ["React", "Next.js", "Tailwind CSS", "Three.js", "Framer Motion", "Vite"],
  },
  {
    category: "Backend",
    skills: ["Node.js", "Flask", "FastAPI", "Hardhat", "Pandas"],
  },
  {
    category: "Tools",
    skills: ["Git", "Docker", "Figma", "Excel", "OpenCV", "IPFS"],
  },
  {
    category: "Platforms",
    skills: ["AWS", "Azure", "Supabase", "Vercel", "Ethereum"],
  },
];
