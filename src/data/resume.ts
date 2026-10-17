export const personalInfo = {
  name: "Jaiivant Arvind",
  role: "Full-Stack Developer",
  tagline: "Building web apps, blockchain systems and AI-powered tools.",
  location: "Bangalore",
  email: "jaiivant@gmail.com",
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
      'Engineered a "Byte-Signature Binary Patcher" in Python — identifies data structures in compiled .EXE via byte-signature matching.',
      "Integrated Google Gemini AI (Gemini 2.5 Flash and 2.5 Flash Lite) to dynamically fetch MFN rates with graceful fallback to hardcoded assembly tables.",
      "Developed a 32-bit math library in Assembly to bypass 16-bit DIV overflow, handling shipment values exceeding 65,535 USD.",
      "Built a React + TypeScript frontend with a custom Fibonacci sphere (Canvas 2D) and Supabase Google OAuth.",
    ],
    tech: ["8086 Assembly", "Python", "Flask", "Gemini 2.5 Flash and 2.5 Flash Lite", "React", "TypeScript", "Supabase"],
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
      "Implemented Glassmorphism UI with Next.js and Tailwind v4, featuring a GPU-accelerated Three.js / GLSL Perlin-noise background.",
      "Optimized with Mixed-Precision (AMP) and AdamW + Cosine Annealing scheduler, with heavy data augmentation.",
    ],
    tech: ["PyTorch", "FastAPI", "OpenCV", "Next.js", "Three.js", "Tailwind CSS"],
    featured: true,
  },
  {
    title: "TalentFit",
    subtitle: "Dual-Scoring Semantic Screening Engine",
    description:
      "Dual-scoring screening engine pairing keyword matching with Gemini semantic embeddings for nuanced contextual candidate evaluation.",
    bullets: [
      "Architected a dual-scoring engine combining keyword frequency matching with Google Gemini semantic embeddings for contextual JD alignment.",
      "Engineered a Flask backend with Google Gemini embeddings (text-embedding-004) and generative summary extraction.",
      "Built a robust data extraction pipeline supporting PDF, DOCX, TXT with automated identification of technical skill clusters.",
      "Developed a React analytics dashboard with color-coded skill gap visualizations.",
      "Optimized inference to sub-3-second processing per document via streamlined vectorization.",
    ],
    tech: ["Python", "Flask", "Gemini AI", "React", "Tailwind CSS", "NLP"],
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
      "Deployed on Vercel for a live environment.",
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
      "Assisted fellow students in mastering core programming concepts and problem-solving through informal tutoring sessions.",
      "Helped peers understand data structures, algorithms, and object-oriented programming fundamentals.",
    ],
  },
  {
    role: "Robotics & Electronics Intern",
    org: "Robomations, India",
    period: "Apr 2022 – May 2022",
    bullets: [
      "Engineered hardware systems including an edge detector, a line-follower robot and a battle bot using Arduino Uno, L293D/L298N motor drivers and NRF24L01 wireless RF modules.",
      "Designed and rendered a 3D architectural model in SketchUp with a VR-viewable walkthrough, using Blender, Gravity Sketch and AutoCAD.",
      "Applied electronics fundamentals (555 timer circuits, logic gates, LDR and ultrasonic sensors) through breadboard prototyping.",
    ],
  },
];

export const education = {
  institution: "Vellore Institute of Technology",
  location: "Vellore, India",
  degree: "Integrated MTech in Computer Science",
  period: "2023 – 2028",
};
