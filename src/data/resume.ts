export const personalInfo = {
  name: "Jaiivant Arvind",
  role: "Full-Stack Developer",
  tagline: "Building web apps, blockchain systems and AI-powered tools.",
  location: "Bangalore",
  phone: "+91 9611717229",
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
    title: "Mentora",
    subtitle: "Full-Stack Mentorship Platform",
    description:
      "A full-stack mentorship platform connecting students and mentors with real-time database updates, secure authentication, and a CI/CD-deployed production environment.",
    bullets: [
      "Architected a responsive SPA using React, Vite, and Tailwind CSS with Supabase BaaS handling authentication and real-time database updates, ensuring scalable and secure data management.",
      "Deployed via Vercel with a full CI/CD pipeline, implementing dynamic routing and state management for seamless multi-role user flows in a live production environment.",
    ],
    tech: ["React", "Vite", "Tailwind CSS", "Supabase", "Vercel"],
    github: "https://github.com/JaiivantArvind/Mentora",
    featured: true,
  },
  {
    title: "SupplyTrace",
    subtitle: "Decentralized Supply Chain Provenance",
    description:
      "A blockchain-based provenance system on Ethereum Sepolia using UUPS-upgradeable smart contracts and a role-gated state machine for tamper-proof product tracking across a 3-tier supply chain.",
    bullets: [
      "Architected a UUPS-upgradeable ERC-1155 smart contract ecosystem with a Manufacturer → Distributor → Retailer state machine, enforcing tamper-proof on-chain provenance with multi-sig governance via Gnosis Safe and OpenZeppelin AccessControl.",
      "Engineered a high-performance indexing layer using The Graph subgraph for real-time custody transfers, validated through 60+ unit tests ensuring stable state transitions across all role transitions.",
    ],
    tech: ["Solidity", "React", "Hardhat", "The Graph", "IPFS", "ERC-1155 Smart Contracts"],
    github: "https://github.com/JaiivantArvind/SupplyTrace",
    featured: true,
  },
  {
    title: "TalentFit",
    subtitle: "Intelligent Screening Engine",
    description:
      "An intelligent resume screening engine combining keyword matching and Gemini semantic embeddings to evaluate resume-to-JD alignment with contextual nuance.",
    bullets: [
      "Architected a dual-scoring engine (40% keyword / 60% semantic) with a multi-format parsing pipeline (PDF, DOCX, TXT) auto-identifying 35+ technical skills.",
      "Optimized inference to sub-3-second processing per document with a React 18 dashboard featuring color-coded skill gap visualizations.",
    ],
    tech: ["Python", "Flask", "Gemini Embeddings", "React", "Tailwind CSS"],
    github: "https://github.com/JaiivantArvind/TalentFit",
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
    ],
    tech: ["8086 Assembly", "Python", "Flask", "Gemini AI", "React", "TypeScript", "Supabase"],
    github: "https://github.com/JaiivantArvind/TradeGate",
    featured: true,
  },
  {
    title: "TamilVision",
    subtitle: "Real-Time OCR & Computer Vision",
    description:
      "High-performance OCR engine for 156 Unicode Tamil characters using a modified MobileNetV3 with sub-50ms inference latency.",
    bullets: [
      "Architected OCR engine using modified MobileNetV3-Small to classify 156 Unicode Tamil characters at sub-50ms latency.",
      "Engineered a 12-step OpenCV preprocessing pipeline using Otsu's Thresholding, Smart Inversion, and Lanczos Resampling.",
      "Developed a custom Grayscale Input Adapter, summing pretrained ImageNet RGB weights to reduce model VRAM footprint.",
      "Implemented Glassmorphism UI with Next.js and Tailwind v4, featuring a GPU-accelerated Three.js / GLSL Perlin-noise background.",
    ],
    tech: ["PyTorch", "FastAPI", "OpenCV", "Next.js", "Three.js", "Tailwind CSS"],
    github: "https://github.com/JaiivantArvind/TamilVision",
    featured: true,
  },
];

export interface ExperienceItem {
  role: string;
  org: string;
  period: string;
  location?: string;
  bullets: string[];
}

export const experience: ExperienceItem[] = [
  {
    role: "Software Development Intern",
    org: "Stayright Consultancy Private Limited (AceHours)",
    period: "Jun 2026 – Sep 2026",
    location: "Bangalore, India",
    bullets: [
      "Developed and integrated machine learning components into a live production application, contributing to backend logic and database query optimization.",
      "Designed and maintained structured database schemas and backend APIs, ensuring data integrity and operational reliability in a professional development environment.",
      "Engineered a new feature end-to-end for a live production application, from requirement analysis through backend implementation and deployment, collaborating with senior engineers through code reviews, sprint planning and production deployment practices.",
    ],
  },
  {
    role: "Robotics & Electronics Intern",
    org: "Robomations, Bangalore",
    period: "Apr 2022 – May 2022",
    location: "Bangalore, India",
    bullets: [
      "Engineered hardware systems including an Edge Detector, Line Follower robot, and Battle Bot using Arduino Uno, L293D/L298N motor drivers, and NRF24L01 wireless RF modules.",
      "Designed and rendered a 3D architectural model in SketchUp with a VR-viewable video walkthrough, leveraging tools like Blender, Gravity Sketch, and AutoCAD.",
      "Applied core electronics fundamentals — 555 IC circuits, logic gates, LDR/ultrasonic sensors, and breadboard prototyping in a hands-on production environment.",
    ],
  },
];

export const education = {
  institution: "Vellore Institute of Technology",
  location: "Vellore, India",
  degree: "Integrated M.Tech in Computer Science and Engineering",
  period: "2023 – 2028 (Expected)",
  cgpa: "8.36/10",
};

export interface Certification {
  title: string;
  issuer: string;
  year: string;
  credentialId?: string;
}

export const certifications: Certification[] = [
  {
    title: "Oracle Cloud Infrastructure 2026 Generative AI Professional",
    issuer: "Oracle",
    year: "2026",
  },
];

export const technicalSkills = {
  languages: [
    "Java",
    "JavaScript",
    "TypeScript",
    "C",
    "C++",
    "Python",
    "SQL",
    "Solidity",
    "8086 Assembly",
  ],
  backendWeb: [
    "React",
    "Next.js",
    "Node.js",
    "Flask",
    "FastAPI",
    "Vite",
    "Tailwind CSS",
    "Three.js",
    "ERC-1155 Smart Contracts",
  ],
  databasesTools: [
    "PostgreSQL",
    "Supabase",
    "DBeaver",
    "Docker",
    "Git",
    "Apache",
    "Hardhat",
    "Vercel",
    "AWS",
    "Azure",
    "Figma",
    "Excel",
  ],
  mlData: [
    "PyTorch",
    "OpenCV",
    "Pandas",
    "LLM Integration",
    "Computer Vision",
    "NLP",
    "Semantic Embeddings",
  ],
};

