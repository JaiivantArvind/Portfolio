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
    tech: ["8086 Assembly", "Python", "Flask", "Gemini 2.5 Flash and 2.5 Flash Lite", "React", "TypeScript", "Supabase"],
    metrics: [
      { label: "Execution Engine", value: "8086 MASM", detail: "Executed in headless DOSBox sandbox" },
      { label: "Max Calculation", value: ">$65,535", detail: "32-bit math library bypassing 16-bit DIV overflow" },
      { label: "Rate Injection", value: "Per run", detail: "Byte-signature patch written before headless DOSBox executes" },
      { label: "AI Integration", value: "Gemini 2.5 Flash and 2.5 Flash Lite", detail: "WTO MFN dynamic rate extraction with fallback" },
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
        tech: "Gemini 2.5 Flash and 2.5 Flash Lite",
        role: "Real-time MFN tariff schedule lookup with deterministic fallback",
        type: "ai",
        details: "Queries live trade schedules. If rate fetch exceeds timeout or fails, falls back instantly to compiled in-binary trade duty lookup tables.",
        codeSnippet: `def get_live_tariff(exporter, importer, category):
    try:
        client = genai.Client(api_key=os.environ["GEMINI_API_KEY"])
        response = client.models.generate_content(
            model="gemini-2.5-flash-lite",
            contents=f"MFN rate for {category} from {exporter} to {importer}",
        )
        return float(response.text.strip())
    except Exception:
        return None  # Fall back to hardcoded binary table`,
      },
      {
        id: "tg-patcher",
        step: 3,
        title: "Binary Patcher",
        tech: "Python Patcher Engine",
        role: "Byte-signature injection into compiled DOSBox .EXE",
        type: "compute",
        details: "Scans the compiled 16-bit executable image for unique byte markers and patches in the resolved rate prior to execution.",
        codeSnippet: `def patch_tariff_exe(src_exe, dest_exe, offset_index, tariff_value):
    signature = bytes([0xC4, 0x09, 0x60, 0x09, 0xFC, 0x08])
    data = src_exe.read_bytes()
    idx = data.find(signature)
    if idx == -1:
        return False
    byte_offset = idx + offset_index * 2
    patched = data[:byte_offset] + struct.pack("<H", tariff_value) + data[byte_offset + 2:]
    dest_exe.write_bytes(patched)
    return True`,
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
          "Authored a custom multi-precision division routine in MASM. Decomposed the dividend into high and low word operations, performing partial division on the high word first and chaining remainders into the low word.",
        language: "x86asm",
        codeSnippet: `; Divide SI:CX by 10000 (two-step chained division avoiding overflow)
mov bx, 10000
mov ax, si          ; step 1: high word / 10000
xor dx, dx
div bx              ; AX = duty_hi quotient, DX = remainder
mov di, ax          ; save duty_hi in DI
mov ax, cx          ; step 2: remainder:CX / 10000
div bx              ; DX fed automatically from step 1; AX = duty_lo
mov dx, di          ; DX:AX contains 32-bit quotient`,
      },
      {
        title: "Byte-Signature Binary Patcher",
        problem:
          "Modifying tariff tables in legacy MASM code traditionally required full recompilation, which introduces ~2-second latency and requires a 16-bit assembler toolchain in production.",
        solution:
          "Engineered a Python binary patcher that locates a fixed 6-byte sentinel pattern in the precompiled DOS executable and overwrites the matching bytes before headless DOSBox runs it.",
        language: "python",
      },
    ],
    keyOutcomes: [
      "End-to-end pipeline combining a modern web frontend with 8086 assembly arithmetic.",
      "Removes the 16-bit quotient limit: the 32-bit dividend supports values up to 4,294,967,295 base units.",
      "Dual-layer rates: live Gemini lookup (Gemini 2.5 Flash and 2.5 Flash Lite) with fallback to compiled tables when it fails or times out.",
    ],
  },

  // ── 2. SupplyTrace ──
  {
    id: "supplytrace",
    title: "SupplyTrace",
    subtitle: "Decentralized Supply Chain Provenance on Ethereum Sepolia",
    category: "Blockchain & Web3",
    description:
      "A decentralized product provenance protocol featuring UUPS-upgradeable ERC-1155 smart contracts, The Graph subgraph indexing, and multi-sig threshold governance.",
    tech: ["Solidity", "React", "Hardhat", "The Graph", "IPFS", "Tailwind CSS"],
    metrics: [
      { label: "Token Standard", value: "ERC-1155", detail: "Semi-fungible batch tracking (Items & Batches)" },
      { label: "Upgradeability", value: "UUPS Proxy", detail: "ERC1967 storage slots with authorization guards" },
      { label: "Event Indexing", value: "The Graph", detail: "GraphQL subgraph; in the project breakdown, >4.5 s RPC queries became sub-200 ms" },
      { label: "Safety Controls", value: "60+ Tests", detail: "Hardhat tests covering state transitions and the Circuit Breaker" },
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
        details: "Listens to contract event logs (BatchCreated, BatchTransferred, ProductRecalled), indexing relationships in an optimized GraphQL database.",
        codeSnippet: `export function handleBatchTransferred(event: BatchTransferredEvent): void {
  let transferId = event.transaction.hash.toHex() + "-" + event.logIndex.toString();
  let transfer = new CustodyTransfer(transferId);
  transfer.tokenId = event.params.tokenId;
  transfer.from = event.params.from;
  transfer.to = event.params.to;
  transfer.timestamp = event.block.timestamp;
  transfer.save();
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
          "Adopted the Universal Upgradeable Proxy Standard (UUPS / ERC1967). Enforced strict AccessControl requiring ADMIN_ROLE for upgrades, preventing unauthorized logic mutation while preserving token storage state.",
        language: "solidity",
        codeSnippet: `function _authorizeUpgrade(address newImplementation) internal override onlyRole(ADMIN_ROLE) {}

function transferBatch(uint256 tokenId, address to, uint256 quantity) external whenNotPaused {
    require(to != address(0), "Zero address");
    safeTransferFrom(msg.sender, to, tokenId, quantity, "");
    emit BatchTransferred(tokenId, msg.sender, to, quantity, block.timestamp);
}`,
      },
      {
        title: "The Graph Subgraph Indexing vs Direct JSON-RPC",
        problem:
          "Querying batch history, custody chains, and recall statuses across hundreds of batches via raw ethers.js RPC calls took >4.5 seconds and triggered RPC rate-limits.",
        solution:
          "Engineered a dedicated subgraph deployed on The Graph Studio that listens to BatchTransferred and BatchCreated logs, providing sub-200ms GraphQL queries.",
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
        tech: "Next.js + Three.js",
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
          "Engineered a Grayscale Weight Adapter that computes the sum across RGB channels for the first Conv2d layer's weights, collapsing 3 channels into 1 while preserving pretrained low-level edge detection filters.",
        language: "python",
        codeSnippet: `def adapt_first_conv_to_grayscale(orig_conv):
    new_conv = nn.Conv2d(1, orig_conv.out_channels, kernel_size=orig_conv.kernel_size, stride=orig_conv.stride, padding=orig_conv.padding, bias=False)
    with torch.no_grad():
        new_conv.weight.copy_(orig_conv.weight.sum(dim=1, keepdim=True))
    return new_conv`,
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
      "Designed for sub-50 ms inference with a MobileNetV3-Small backbone.",
      "High accuracy across 156 Unicode Tamil characters including compound vowels and consonants.",
      "Minimal memory footprint through 1-channel weight adaptation.",
    ],
  },

  // ── 4. TalentFit ──
  {
    id: "ai-resume-analyzer",
    title: "TalentFit",
    subtitle: "Dual-Scoring Semantic Screening Engine",
    category: "Machine Learning & NLP",
    description:
      "An intelligent resume-to-job-description evaluation engine pairing TF-IDF keyword extraction with Gemini semantic embeddings for nuanced contextual alignment.",
    tech: ["Python", "Flask", "Gemini AI", "React", "Tailwind CSS", "NLP"],
    metrics: [
      { label: "Scoring Weight", value: "Keyword + Semantic", detail: "TF-IDF keyword matching + Gemini dense vector embeddings" },
      { label: "Memory Footprint", value: "~300MB", detail: "On-demand Gemini API embeddings and lightweight Flask microservice" },
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
        tech: "pypdf / python-docx",
        role: "Multi-format document parsing and text normalization",
        type: "pipeline",
        details: "Extracts raw text streams across PDF, DOCX, and TXT files, stripping formatting noise and tokenizing sections.",
      },
      {
        id: "ra-heuristic",
        step: 3,
        title: "TF-IDF Engine",
        tech: "Scikit-Learn NLP",
        role: "Exact and n-gram keyword frequency scoring",
        type: "compute",
        details: "Measures domain terminology density and presence of must-have toolchains against the job requirement.",
      },
      {
        id: "ra-gemini",
        step: 4,
        title: "Gemini Semantic Embeddings",
        tech: "Google Gemini",
        role: "Contextual semantic embedding alignment",
        type: "ai",
        details: "Projects resume and job description text into dense vector space using Gemini text-embedding-004, computing cosine similarity for conceptual match.",
        codeSnippet: `def calculate_semantic_score(resume_text, job_desc):
    res_embed = genai.embed_content(
        model="models/text-embedding-004", content=resume_text[:3000], task_type="clustering"
    )["embedding"]
    jd_embed = genai.embed_content(
        model="models/text-embedding-004", content=job_desc[:3000], task_type="clustering"
    )["embedding"]
    similarity = cosine_similarity([res_embed], [jd_embed])[0][0]
    return round(float(similarity) * 100, 1)`,
      },
    ],
    breakthroughs: [
      {
        title: "Dual-Scoring Heuristic: TF-IDF + Gemini Vector Embeddings",
        problem:
          "Keyword-only screening misses strong candidates who describe equivalent skills in different terms. Semantic-only screening can be fooled by buzzwords that lack specific hard skill mentions.",
        solution:
          "Formulated a balanced dual-scoring algorithm combining keyword frequency matching with Google Gemini dense vector embeddings (text-embedding-004).",
        language: "python",
      },
    ],
    keyOutcomes: [
      "Designed for sub-3-second document evaluation.",
      "Compact memory footprint via cloud-based Gemini embedding inference.",
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
      "A responsive, full-stack mentorship platform connecting students with mentors, featuring real-time chat and Supabase Row-Level Security.",
    tech: ["React", "Vite", "Tailwind CSS", "Supabase", "Vercel"],
    metrics: [
      { label: "Frontend Speed", value: "Vite SPA", detail: "Client-side routing with no full page reloads" },
      { label: "Data Layer", value: "Supabase BaaS", detail: "PostgreSQL with strict Row-Level Security policies" },
      { label: "Communication", value: "Real-time", detail: "WebSocket event listeners for instant mentorship messaging" },
      { label: "Deployment", value: "Vercel", detail: "Continuous deployment from Git to Vercel" },
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

CREATE POLICY "Users can read own session messages"
ON messages FOR SELECT
USING (
    auth.uid() = sender_id OR auth.uid() = receiver_id OR
    EXISTS (
        SELECT 1 FROM sessions WHERE sessions.id = messages.session_id
        AND (sessions.mentor_id = auth.uid() OR sessions.student_id = auth.uid())
    )
);`,
      },
    ],
    keyOutcomes: [
      "Real-time chat with optimistic client updates.",
      "Data isolation enforced by database-level Row-Level Security policies.",
      "Single-page navigation without full page reloads.",
    ],
  },
];
