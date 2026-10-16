export interface ArchitectureNode {
  id: string;
  step: number;
  title: string;
  tech: string;
  role: string;
  type: "client" | "compute" | "contract" | "pipeline" | "database" | "ai";
  details: string;
  codeSnippet?: string;
}

export interface ProjectBreakthrough {
  title: string;
  problem: string;
  solution: string;
  codeSnippet?: string;
  language?: string;
}

export interface ProjectMetric {
  label: string;
  value: string;
  detail: string;
}

export interface DetailedProject {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  tech: string[];
  github?: string;
  demoUrl?: string;
  metrics: ProjectMetric[];
  architectureNodes: ArchitectureNode[];
  breakthroughs: ProjectBreakthrough[];
  keyOutcomes: string[];
}

export const detailedProjects: DetailedProject[] = [
  // ── 1. TradeGate ──
  {
    id: "tradegate",
    title: "TradeGate",
    subtitle: "AI-Powered International Tariff Engine with Legacy Assembly Core",
    category: "Systems & Low-Level / AI",
    description:
      "A hybrid systems pipeline executing a legacy 8086 MASM assembly engine inside a headless DOSBox environment, dynamically injected with real-time AI tariff data at the binary level.",
    tech: ["8086 Assembly", "Python", "Flask", "Gemini AI", "React", "TypeScript", "Supabase"],
    github: "https://github.com/JaiivantArvind",
    metrics: [
      { label: "Execution Engine", value: "8086 MASM", detail: "Executed in headless DOSBox sandbox" },
      { label: "Max Calculation", value: ">$65,535", detail: "32-bit math library bypassing 16-bit DIV overflow" },
      { label: "Rate Injection", value: "<15ms", detail: "Direct in-memory binary signature patcher" },
      { label: "AI Integration", value: "Gemini 2.5", detail: "WTO MFN dynamic rate extraction with fallback" },
    ],
    architectureNodes: [
      {
        id: "tg-client",
        step: 1,
        title: "Web Client",
        tech: "React 19 + TypeScript",
        role: "Shipment input parameters, commodities selection, and Fibonacci 2D Canvas rendering",
        type: "client",
        details: "Accepts shipment valuation, harmonized tariff codes (HS Codes), and origins. Manages Supabase Google OAuth state.",
      },
      {
        id: "tg-ai",
        step: 2,
        title: "Tariff Resolver",
        tech: "Google Gemini 2.5 Flash",
        role: "Real-time MFN tariff schedule lookup with deterministic fallback",
        type: "ai",
        details: "Queries live trade schedules. If rate fetch exceeds 500ms or fails, falls back instantly to compiled in-binary trade duty lookup tables.",
        codeSnippet: `async function resolveTariffRate(hsCode: string): Promise<number> {
  try {
    const rate = await gemini.extractMFNRate({ code: hsCode, timeoutMs: 500 });
    return rate ?? FALLBACK_TABLE[hsCode.slice(0, 4)];
  } catch {
    return FALLBACK_TABLE[hsCode.slice(0, 4)] ?? 0.075;
  }
}`,
      },
      {
        id: "tg-patcher",
        step: 3,
        title: "Binary Patcher",
        tech: "Python Patcher Engine",
        role: "In-memory byte-signature injection into compiled DOSBox .EXE",
        type: "compute",
        details: "Scans the compiled 16-bit executable image for unique byte markers ($T_RATE_ADDR) and patches in the resolved rate prior to execution.",
        codeSnippet: `def patch_executable_binary(exe_path, resolved_rate_bp):
    SIGNATURE = b"\\xAA\\x55\\xDE\\xAD\\xBE\\xEF"
    with open(exe_path, "r+b") as f:
        data = f.read()
        offset = data.find(SIGNATURE)
        if offset != -1:
            f.seek(offset + len(SIGNATURE))
            f.write(struct.pack("<H", resolved_rate_bp))`,
      },
      {
        id: "tg-asm",
        step: 4,
        title: "Headless 8086 MASM",
        tech: "DOSBox Emulator",
        role: "Real-time trade duty arithmetic using customized 32-bit assembly library",
        type: "pipeline",
        details: "Runs isolated inside headless DOSBox. Calculates tariff duties, ad-valorem taxes, and currency conversions with zero floating point drift.",
      },
    ],
    breakthroughs: [
      {
        title: "32-Bit Math Division Overflow Workaround in 8086 Assembly",
        problem:
          "The native 8086 DIV instruction causes a Divide Error (INT 0) when dividing a 32-bit numerator by a 16-bit denominator if the resulting quotient exceeds 16 bits (65,535). Real-world cargo values routinely exceed $65,535.",
        solution:
          "Authored a custom multi-precision 32-bit division routine in MASM. Decomposed the 32-bit dividend (DX:AX) into high and low word operations, performing partial division on DX first, shifting remainders into AX, and recombining quotients in CX:BX.",
        language: "x86asm",
        codeSnippet: `; 32-bit by 16-bit Division Routine: DX:AX / BX -> DX:AX (Quotient), CX (Remainder)
DIV32 PROC
    PUSH SI
    MOV  SI, AX        ; Save low word
    MOV  AX, DX        ; Load high word
    XOR  DX, DX        ; Clear DX for upper div
    DIV  BX            ; AX = High Quotient, DX = Remainder
    MOV  CX, AX        ; Store High Quotient in CX
    MOV  AX, SI        ; Restore Low Word
    DIV  BX            ; Divide (DX:AX) by BX -> AX = Low Quotient, DX = Remainder
    MOV  SI, DX        ; SI = Final Remainder
    MOV  DX, CX        ; DX = High Quotient
    MOV  CX, SI        ; CX = Remainder
    POP  SI
    RET
DIV32 ENDP`,
      },
      {
        title: "In-Memory Byte-Signature Binary Patcher",
        problem:
          "Modifying tariff tables in legacy MASM code traditionally required full recompilation, which introduces ~2-second latency and requires a 16-bit assembler toolchain in production.",
        solution:
          "Engineered a runtime Python binary patcher that locates a fixed 6-byte sentinel pattern in the precompiled DOS executable and overwrites the exact memory buffer in <15ms before headless DOSBox invocation.",
        language: "python",
      },
    ],
    keyOutcomes: [
      "Sub-second end-to-end execution combining modern cloud web frontend with 40-year-old assembly arithmetic.",
      "Eliminated 16-bit integer overflows, safely computing shipments up to $4,294,967,295.",
      "Dual-layer reliability: dynamic Gemini AI rates with guaranteed zero-failure fallback to assembly binary data.",
    ],
  },

  // ── 2. SupplyTrace ──
  {
    id: "supplytrace",
    title: "SupplyTrace",
    subtitle: "Decentralized Supply Chain Provenance on Ethereum Sepolia",
    category: "Blockchain & Web3",
    description:
      "A production-grade decentralized product provenance protocol featuring UUPS-upgradeable ERC-1155 smart contracts, The Graph subgraph indexing, and multi-sig threshold governance.",
    tech: ["Solidity", "React", "Hardhat", "The Graph", "IPFS", "Tailwind CSS"],
    github: "https://github.com/JaiivantArvind",
    metrics: [
      { label: "Token Standard", value: "ERC-1155", detail: "Semi-fungible batch tracking (Items & Batches)" },
      { label: "Upgradeability", value: "UUPS Proxy", detail: "ERC1967 storage slots with authorization guards" },
      { label: "Event Indexing", value: "The Graph", detail: "GraphQL subgraph reducing query latency by 90%" },
      { label: "Safety Controls", value: "60+ Tests", detail: "100% state machine coverage with Circuit Breaker" },
    ],
    architectureNodes: [
      {
        id: "st-client",
        step: 1,
        title: "Web3 Frontend",
        tech: "React 19 + Wagmi / Viem",
        role: "Custodian dashboard, QR verification scanner, and batch minting interface",
        type: "client",
        details: "Allows role-authenticated participants (Manufacturer, Distributor, Retailer) to transition batch states and verify authenticity.",
      },
      {
        id: "st-subgraph",
        step: 2,
        title: "The Graph Subgraph",
        tech: "GraphQL Indexer",
        role: "Event-driven real-time indexing layer",
        type: "pipeline",
        details: "Listens to contract event logs (BatchCreated, CustodyTransferred, ProductRecalled), indexing relationships in an optimized GraphQL database.",
        codeSnippet: `export function handleCustodyTransferred(event: CustodyTransferredEvent): void {
  let batch = Batch.load(event.params.batchId.toString());
  if (batch) {
    batch.currentCustodian = event.params.to;
    batch.updatedAt = event.block.timestamp;
    batch.save();
  }
}`,
      },
      {
        id: "st-contract",
        step: 3,
        title: "UUPS Smart Contract",
        tech: "Solidity + Sepolia",
        role: "Role-gated state machine enforcing immutable provenance rules",
        type: "contract",
        details: "ERC-1155 contract with OpenZeppelin AccessControl. Validates strict transition orders and enforces emergency recalls.",
      },
      {
        id: "st-storage",
        step: 4,
        title: "IPFS & Pinata",
        tech: "Decentralized IPFS",
        role: "Cryptographic metadata & verification credentials",
        type: "database",
        details: "Certificates of origin, lab test PDFs, and batch composition manifests pinned immutably via Pinata IPFS nodes.",
      },
    ],
    breakthroughs: [
      {
        title: "UUPS Upgradeability with Role-Gated State Machine",
        problem:
          "Traditional ERC-721/1155 contracts cannot fix logic vulnerabilities or update compliance rules without deploying new addresses and breaking physical product QR codes.",
        solution:
          "Adopted the Universal Upgradeable Proxy Standard (UUPS / ERC1967). Enforced strict AccessControl requiring DEFAULT_ADMIN_ROLE (Gnosis Safe) for upgrades, preventing unauthorized logic mutation while preserving token storage state.",
        language: "solidity",
        codeSnippet: `contract SupplyTraceV1 is Initializable, ERC1155Upgradeable, AccessControlUpgradeable, PausableUpgradeable, UUPSUpgradeable {
    bytes32 public constant DISTRIBUTOR_ROLE = keccak256("DISTRIBUTOR_ROLE");
    bytes32 public constant RETAILER_ROLE = keccak256("RETAILER_ROLE");

    function _authorizeUpgrade(address newImplementation) internal override onlyRole(DEFAULT_ADMIN_ROLE) {}

    function transferCustody(uint256 batchId, address to, Stage nextStage) external whenNotPaused {
        require(batches[batchId].currentCustodian == msg.sender, "Unauthorized");
        require(isValidTransition(batches[batchId].stage, nextStage), "Invalid Stage");
        batches[batchId].currentCustodian = to;
        batches[batchId].stage = nextStage;
        emit CustodyTransferred(batchId, msg.sender, to, nextStage);
    }
}`,
      },
      {
        title: "The Graph Subgraph Indexing vs Direct JSON-RPC",
        problem:
          "Querying batch history, custody chains, and recall statuses across hundreds of batches via raw ethers.js RPC calls took >4.5 seconds and triggered RPC rate-limits.",
        solution:
          "Engineered a dedicated subgraph deployed on The Graph Studio that listens to CustodyTransferred and BatchCreated logs, providing sub-200ms GraphQL queries.",
      },
    ],
    keyOutcomes: [
      "Stable sub-second state transitions verified across 60+ Hardhat automated unit tests.",
      "Gnosis Safe multi-sig governance preventing single-key centralization risks.",
      "End-to-end QR validation for end consumers verifying complete factory-to-shelf journey.",
    ],
  },

  // ── 3. TamilVision ──
  {
    id: "tamilvision",
    title: "TamilVision",
    subtitle: "Real-Time 156-Class Unicode Tamil OCR & Vision Pipeline",
    category: "Computer Vision & AI",
    description:
      "High-performance deep learning OCR engine classifying 156 complex Unicode Tamil characters at sub-50ms latency using a modified MobileNetV3 and a 12-step OpenCV pipeline.",
    tech: ["PyTorch", "FastAPI", "OpenCV", "Next.js", "Three.js", "Tailwind CSS"],
    github: "https://github.com/JaiivantArvind",
    metrics: [
      { label: "Inference Latency", value: "<50ms", detail: "Optimized MobileNetV3-Small architecture" },
      { label: "Character Space", value: "156 Classes", detail: "Comprehensive Unicode Tamil vowel/consonant pairs" },
      { label: "Vision Pipeline", value: "12 Steps", detail: "Otsu thresholding, inversion & Lanczos resampling" },
      { label: "Model Optimization", value: "AMP + AdamW", detail: "Mixed precision training with Cosine Annealing" },
    ],
    architectureNodes: [
      {
        id: "tv-ui",
        step: 1,
        title: "Web Client",
        tech: "Next.js 16 + Three.js",
        role: "Canvas drawing pad, document upload, and GLSL Perlin-noise visualization",
        type: "client",
        details: "High-DPR drawing interface with bounding box segmentation overlays and live confidence scoring.",
      },
      {
        id: "tv-cv",
        step: 2,
        title: "12-Step Vision Pipeline",
        tech: "OpenCV Python",
        role: "Adaptive thresholding, contour extraction, and normalization",
        type: "pipeline",
        details: "Extracts individual character glyphs using Otsu binarization, smart polarity inversion, aspect-ratio preservation, and Lanczos bicubic resampling.",
        codeSnippet: `def preprocess_glyph(image_bgr):
    gray = cv2.cvtColor(image_bgr, cv2.COLOR_BGR2GRAY)
    _, binary = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU)
    coords = cv2.findNonZero(binary)
    x, y, w, h = cv2.boundingRect(coords)
    cropped = binary[y:y+h, x:x+w]
    return cv2.resize(cropped, (64, 64), interpolation=cv2.INTER_LANCZOS4)`,
      },
      {
        id: "tv-adapter",
        step: 3,
        title: "Grayscale Weight Adapter",
        tech: "PyTorch Module",
        role: "VRAM compression via single-channel pretrained weight collapse",
        type: "compute",
        details: "Sums the 3-channel RGB ImageNet pretrained weights into a single-channel grayscale filter, reducing convolutional layer footprint by 66%.",
      },
      {
        id: "tv-model",
        step: 4,
        title: "MobileNetV3 Classifier",
        tech: "PyTorch + FastAPI",
        role: "156-class Unicode Tamil classification with sub-50ms inference",
        type: "ai",
        details: "Trained using automatic mixed-precision (AMP), label smoothing cross-entropy, and Cosine Annealing learning rate schedule.",
      },
    ],
    breakthroughs: [
      {
        title: "Grayscale Input Adapter for Pretrained ImageNet Weights",
        problem:
          "Pretrained ImageNet backbones expect 3-channel RGB inputs. Feeding duplicate 3-channel grayscale tensors wastes memory bandwidth and slows convolutional forward passes.",
        solution:
          "Engineered a Grayscale Weight Adapter that computes the luminance-weighted sum (0.299R + 0.587G + 0.114B) of the first Conv2d layer's weights, collapsing 3 channels into 1 while preserving pretrained low-level edge detection filters.",
        language: "python",
        codeSnippet: `def adapt_mobilenet_for_grayscale(model):
    orig_conv = model.features[0][0]
    gray_conv = nn.Conv2d(1, orig_conv.out_channels, kernel_size=3, stride=2, padding=1, bias=False)
    with torch.no_grad():
        # Luminance-weighted collapse of RGB pretrained weights
        weights = orig_conv.weight.data
        gray_conv.weight.data = (
            0.299 * weights[:, 0:1, :, :] +
            0.587 * weights[:, 1:2, :, :] +
            0.114 * weights[:, 2:3, :, :]
        )
    model.features[0][0] = gray_conv
    return model`,
      },
      {
        title: "12-Step OpenCV Preprocessing for Irregular Handwriting",
        problem:
          "Tamil script features intricate curves and diacritics (pulli dots). Poor lighting or irregular strokes lead to broken contours or false merges.",
        solution:
          "Engineered a multi-phase preprocessing pipeline using Otsu's binarization, morphological closing to rejoin broken strokes, bounding-box centering, and Lanczos bicubic interpolation.",
      },
    ],
    keyOutcomes: [
      "Sub-50ms inference latency on standard serverless GPU/CPU endpoints.",
      "High accuracy across 156 Unicode Tamil characters including compound vowels and consonants.",
      "Minimal memory footprint through 1-channel weight adaptation.",
    ],
  },

  // ── 4. AI Resume Analyzer ──
  {
    id: "ai-resume-analyzer",
    title: "AI Resume Analyzer",
    subtitle: "Dual-Scoring Semantic Screening Engine",
    category: "Machine Learning & NLP",
    description:
      "An intelligent resume-to-job-description evaluation engine pairing TF-IDF keyword extraction with SBERT semantic embeddings for nuanced contextual alignment.",
    tech: ["Python", "Flask", "SBERT", "React 18", "Tailwind CSS", "NLP"],
    github: "https://github.com/JaiivantArvind",
    metrics: [
      { label: "Scoring Weight", value: "40% / 60%", detail: "40% TF-IDF Keyword Match + 60% SBERT Semantic Embedding" },
      { label: "Memory Footprint", value: "~300MB", detail: "Lazy-loaded Sentence-Transformers model on Flask" },
      { label: "Inference Speed", value: "<3.0s", detail: "Multi-page document parsing and vector scoring" },
      { label: "Taxonomy Size", value: "35+ Clusters", detail: "Identifies core engineering competencies" },
    ],
    architectureNodes: [
      {
        id: "ra-client",
        step: 1,
        title: "Analytics Dashboard",
        tech: "React 18 + Tailwind",
        role: "Multi-document uploader and color-coded skill gap visualizer",
        type: "client",
        details: "Visualizes alignment percentages, missing critical keywords, and contextual suitability radar charts.",
      },
      {
        id: "ra-parser",
        step: 2,
        title: "Document Ingestion",
        tech: "PyPDF2 / python-docx",
        role: "Multi-format document parsing and text normalization",
        type: "pipeline",
        details: "Extracts raw text streams across PDF, DOCX, and TXT files, stripping formatting noise and tokenizing sections.",
      },
      {
        id: "ra-heuristic",
        step: 3,
        title: "TF-IDF Engine",
        tech: "Scikit-Learn NLP",
        role: "Exact and n-gram keyword frequency scoring (40% weight)",
        type: "compute",
        details: "Measures domain terminology density and presence of must-have toolchains against the job requirement.",
      },
      {
        id: "ra-sbert",
        step: 4,
        title: "SBERT Embeddings",
        tech: "all-MiniLM-L6-v2",
        role: "Contextual semantic embedding alignment (60% weight)",
        type: "ai",
        details: "Projects resume and JD text into a 384-dimensional dense vector space, computing cosine similarity to catch conceptual equivalence (e.g. 'Kubernetes' vs 'K8s cluster orchestration').",
      },
    ],
    breakthroughs: [
      {
        title: "Dual-Scoring Heuristic: TF-IDF + SBERT Vector Fusion",
        problem:
          "Keyword-only screening misses strong candidates who describe equivalent skills in different terms. Semantic-only screening can be fooled by buzzwords that lack specific hard skill mentions.",
        solution:
          "Formulated a balanced dual-scoring algorithm: 40% TF-IDF keyword match + 60% SBERT contextual cosine similarity.",
        language: "python",
        codeSnippet: `def evaluate_candidate_alignment(resume_text, jd_text):
    # 1. TF-IDF Keyword Overlap (40%)
    tfidf_matrix = vectorizer.fit_transform([resume_text, jd_text])
    keyword_score = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:2])[0][0]

    # 2. SBERT Contextual Semantic Similarity (60%)
    embeddings = sbert_model.encode([resume_text, jd_text], convert_to_tensor=True)
    semantic_score = util.cos_sim(embeddings[0], embeddings[1]).item()

    final_score = (0.40 * keyword_score) + (0.60 * semantic_score)
    return round(final_score * 100, 2)`,
      },
    ],
    keyOutcomes: [
      "Sub-3-second end-to-end document evaluation.",
      "Compact memory footprint (~300MB) via lazy model loading on serverless containers.",
      "Clear, actionable feedback highlighting candidate skill gaps.",
    ],
  },

  // ── 5. Mentora ──
  {
    id: "mentora",
    title: "Mentora",
    subtitle: "Full-Stack Collaborative Mentorship Platform",
    category: "Full Stack & Cloud",
    description:
      "A responsive, full-stack mentorship platform connecting students with alumni and industry mentors, featuring real-time chat and Supabase Row-Level Security.",
    tech: ["React", "Vite", "Tailwind CSS", "Supabase", "Vercel"],
    github: "https://github.com/JaiivantArvind",
    metrics: [
      { label: "Frontend Speed", value: "Vite SPA", detail: "Sub-100ms client-side route transitions" },
      { label: "Data Layer", value: "Supabase BaaS", detail: "PostgreSQL with strict Row-Level Security policies" },
      { label: "Communication", value: "Real-time", detail: "WebSocket event listeners for instant mentorship messaging" },
      { label: "Deployment", value: "Vercel CI/CD", detail: "Continuous delivery with preview environments" },
    ],
    architectureNodes: [
      {
        id: "me-client",
        step: 1,
        title: "Single Page App",
        tech: "React 19 + Vite",
        role: "Mentor discovery catalog, scheduling calendar, and interactive session workspace",
        type: "client",
        details: "Clean glassmorphic interface with client-side optimistic UI updates and responsive mobile navigation.",
      },
      {
        id: "me-auth",
        step: 2,
        title: "Supabase Auth & RLS",
        tech: "Row-Level Security",
        role: "User identity and role-based data isolation",
        type: "compute",
        details: "Strict PostgreSQL security policies ensuring students and mentors can only query their authorized meeting records and chat threads.",
      },
      {
        id: "me-db",
        step: 3,
        title: "PostgreSQL & Realtime",
        tech: "Supabase Database",
        role: "Relational persistence with real-time replication",
        type: "database",
        details: "Realtime WebSocket channels streaming instant messages, booking notifications, and session state changes.",
      },
    ],
    breakthroughs: [
      {
        title: "PostgreSQL Row-Level Security (RLS) for Multi-Tenant Chat",
        problem:
          "Traditional web backends require boilerplate route guards to prevent students from accessing another student's mentor conversations.",
        solution:
          "Implemented database-native Row-Level Security policies in Supabase, enforcing access directly inside the PostgreSQL query planner.",
        language: "sql",
        codeSnippet: `ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can only read messages from their own sessions"
ON messages FOR SELECT
USING (
    auth.uid() = sender_id OR 
    auth.uid() = receiver_id OR 
    EXISTS (
        SELECT 1 FROM sessions 
        WHERE sessions.id = messages.session_id 
        AND (sessions.mentor_id = auth.uid() OR sessions.student_id = auth.uid())
    )
);`,
      },
    ],
    keyOutcomes: [
      "Zero-latency real-time chat with optimistic client updates.",
      "Bulletproof data isolation using database-level security policies.",
      "Seamless SPA navigation with zero page reloads.",
    ],
  },
];
