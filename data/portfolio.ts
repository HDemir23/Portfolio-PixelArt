export type Scene =
  | "room"
  | "projects"
  | "skills"
  | "experience"
  | "services"
  | "contact"
  | "about"
  | "menu"
  | "comingSoon";

export type RoomPosition = {
  left: number;
  top: number;
};

export type RoomZoom = {
  scale: number;
  x: string;
  y: string;
};

export type RoomObjectConfig = {
  id: string;
  label: string;
  image?: string;
  missingAssetName?: string;
  position: RoomPosition;
  targetScene?: Exclude<Scene, "room">;
  externalUrl?: string;
  action?: "home" | "music";
  width: number;
  height?: number;
  zIndex?: number;
  zoom?: RoomZoom;
  baseVisible?: boolean;
  hotspotOnly?: boolean;
  cue?: "top" | "right" | "bottom" | "left";
  shortcutGroup?: string;
  mobileLabel?: string;
};

export const roomBackgroundImage = "/WB/Background.png";

const layer = (filename: string) => `/WB/layers/${filename}`;
const asset2Layer = (filename: string) => `/Assets2/layers/${filename}`;

export const decorativeObjects: RoomObjectConfig[] = [];

export const roomObjects: RoomObjectConfig[] = [
  {
    id: "contact-top-note",
    label: "Contact",
    position: { left: 5.82, top: 22.15 },
    width: 5.1,
    height: 8.7,
    zIndex: 12,
    hotspotOnly: true,
  },
  {
    id: "contact-bottom-note",
    label: "Contact",
    image: layer("contact2.png"),
    position: { left: 6.05, top: 34.15 },
    targetScene: "contact",
    width: 3.44,
    zIndex: 12,
    zoom: { scale: 1.3, x: "19%", y: "9%" },
    cue: "left",
    shortcutGroup: "contact",
  },
  {
    id: "about-note",
    label: "About",
    image: layer("about.png"),
    position: { left: 13.55, top: 33.14 },
    targetScene: "about",
    width: 3.3,
    zIndex: 12,
    zoom: { scale: 1.3, x: "16%", y: "9%" },
    cue: "right",
  },
  {
    id: "folder",
    label: "Experience",
    image: asset2Layer("Folder.png"),
    position: { left: 14.24, top: 22.33 },
    targetScene: "experience",
    width: 2.84,
    zIndex: 13,
    zoom: { scale: 1.3, x: "17%", y: "14%" },
    cue: "right",
    shortcutGroup: "experience",
  },
  {
    id: "portfolio-screen",
    label: "Work",
    image: layer("PC.png"),
    position: { left: 14.65, top: 52.64 },
    targetScene: "projects",
    width: 22.41,
    zIndex: 10,
    zoom: { scale: 1.22, x: "11%", y: "4%" },
    cue: "bottom",
    shortcutGroup: "portfolio",
  },
  {
    id: "ferrari",
    label: "Ferrari model",
    image: asset2Layer("Ferrari.png"),
    position: { left: 69.37, top: 11.95 },
    width: 10.97,
    zIndex: 13,
  },
  {
    id: "mercedes",
    label: "Mercedes model",
    image: asset2Layer("Mercedes.png"),
    position: { left: 80.4, top: 11.91 },
    width: 10.44,
    zIndex: 13,
  },
  {
    id: "aston-martin",
    label: "Aston Martin model",
    image: asset2Layer("AstonMartin.png"),
    position: { left: 69.16, top: 24.19 },
    width: 10.9,
    zIndex: 13,
  },
  {
    id: "redbull",
    label: "Red Bull model",
    image: asset2Layer("Redbull.png"),
    position: { left: 80.45, top: 24.12 },
    width: 10.76,
    zIndex: 13,
  },
  {
    id: "printer",
    label: "3D printer",
    image: asset2Layer("Printer.png"),
    position: { left: 69.58, top: 36.13 },
    width: 9.48,
    zIndex: 13,
  },
  {
    id: "projects-note",
    label: "Work",
    image: layer("Projects.png"),
    position: { left: 9.57, top: 26.5 },
    targetScene: "projects",
    width: 4.23,
    zIndex: 12,
    zoom: { scale: 1.28, x: "18%", y: "12%" },
    cue: "bottom",
    shortcutGroup: "portfolio",
  },
  {
    id: "store",
    label: "Services",
    image: layer("Store.png"),
    position: { left: 53.68, top: 79.49 },
    targetScene: "services",
    width: 15.16,
    zIndex: 12,
    zoom: { scale: 1.18, x: "-2%", y: "-7%" },
    cue: "top",
    shortcutGroup: "services",
  },
  {
    id: "green-moto",
    label: "Ev Ankara",
    image: layer("GreenMoto.png"),
    position: { left: 69, top: 53.91 },
    externalUrl: "https://evankara.org",
    width: 10.23,
    zIndex: 12,
  },
  {
    id: "red-motor",
    label: "X-Claw",
    image: asset2Layer("RedMotor.png"),
    position: { left: 80.36, top: 48.18 },
    externalUrl: "https://x-claw-v1.vercel.app/",
    width: 9.3,
    zIndex: 13,
  },
  {
    id: "red-moto-bottom",
    label: "Red bike model",
    image: asset2Layer("RedMotoBottom.png"),
    position: { left: 68.71, top: 66.8 },
    externalUrl: "https://github.com/buildermare/Sui-Workshop",
    width: 8.88,
    zIndex: 13,
  },
  {
    id: "box",
    label: "Storage box",
    image: asset2Layer("Box.png"),
    position: { left: 66.32, top: 77.02 },
    width: 4.37,
    zIndex: 13,
  },
  {
    id: "motor",
    label: "Motorcycle",
    image: layer("Motor.png"),
    position: { left: 82.6, top: 78.45 },
    width: 31.96,
    zIndex: 12,
  },
  {
    id: "books-shelf",
    label: "Skills",
    image: asset2Layer("Books.png"),
    position: { left: 93.54, top: 48.89 },
    targetScene: "skills",
    width: 11.51,
    zIndex: 13,
    zoom: { scale: 1.2, x: "-15%", y: "0%" },
    cue: "left",
    shortcutGroup: "skills",
    mobileLabel: "Skills",
  },
  {
    id: "code-sign",
    label: "GitHub",
    image: layer("Tablo.png"),
    position: { left: 93.55, top: 12.37 },
    externalUrl: "https://github.com/HDemir23",
    width: 10.33,
    zIndex: 12,
  },
  {
    id: "chair",
    label: "YouTube",
    image: layer("Koltuk.png"),
    position: { left: 39.42, top: 73.24 },
    externalUrl: "https://www.youtube.com/watch?v=X4VbdwhkE10",
    width: 16.12,
    zIndex: 12,
    shortcutGroup: "youtube",
  },
  {
    id: "youtube-plaque-top",
    label: "YouTube plaque",
    image: layer("youtube2.png"),
    position: { left: 96.24, top: 31.77 },
    width: 3.48,
    zIndex: 12,
  },
  {
    id: "youtube-plaque-side",
    label: "YouTube plaque",
    image: layer("Youtube1.png"),
    position: { left: 98.01, top: 44.04 },
    width: 3.98,
    zIndex: 12,
  },
  {
    id: "home-icon",
    label: "Home",
    image: asset2Layer("Home.png"),
    position: { left: 47.48, top: 97.88 },
    action: "home",
    width: 1.35,
    zIndex: 13,
    shortcutGroup: "home",
    mobileLabel: "Home",
  },
  {
    id: "menu-icon",
    label: "Menu",
    image: asset2Layer("Menu.png"),
    position: { left: 49.98, top: 97.88 },
    targetScene: "menu",
    width: 1.38,
    zIndex: 13,
    shortcutGroup: "menu",
    mobileLabel: "Menu",
  },
  {
    id: "mic-icon",
    label: "Music",
    image: asset2Layer("Mic.png"),
    position: { left: 52.52, top: 97.85 },
    action: "music",
    width: 1.35,
    zIndex: 13,
    shortcutGroup: "music",
    mobileLabel: "Music",
  },
  {
    id: "mac",
    label: "Laptop",
    image: layer("mac.png"),
    position: { left: 30.95, top: 53.42 },
    width: 7.56,
    zIndex: 12,
  },
  {
    id: "coffee",
    label: "Coffee",
    image: layer("Coffe.png"),
    position: { left: 13.37, top: 69.73 },
    width: 2.88,
    zIndex: 12,
  },
  {
    id: "desk-figure",
    label: "Desk figure",
    image: layer("Biblo1.png"),
    position: { left: 17.29, top: 61.2 },
    width: 2.13,
    zIndex: 12,
  },
  {
    id: "desk-toy",
    label: "Desk toy",
    image: layer("Biblo2.png"),
    position: { left: 10.44, top: 67.09 },
    width: 2.2,
    zIndex: 12,
  },
  {
    id: "plant",
    label: "Plant",
    image: layer("Cicek.png"),
    position: { left: 91.69, top: 43.39 },
    width: 7.03,
    zIndex: 12,
  },
];

export const profile = {
  name: "Ahmet Hakan Demir",
  shortName: "A.Hakan Demir",
  title: "Software Engineer",
  location: "Ankara, Turkey",
  phone: "+90 507 586 56 81",
  email: "a.hakandemir23@gmail.com",
  github: "https://github.com/HDemir23",
  linkedin: "https://linkedin.com/in/realhdemir",
  portfolio: "https://hakandemir.com.tr",
  summary: [
    "Frontend and mobile developer with 3+ years of experience across React Native and Next.js, building web apps, mobile apps and blockchain products.",
    "My strongest work so far is SuiGit, a fully decentralized version control platform built on Sui with Walrus decentralized storage and a Node.js CLI.",
    "I also run AI-assisted multi-model workflows that route Claude, GPT, Gemini and Z-Ai to different tasks with custom MCP integrations.",
  ],
  highlights: [
    "Taught Move programming and smart-contract workshops at 20+ universities across Turkey.",
    "Comfortable with remote teams, async communication and cross-timezone delivery.",
    "Prefer creating products with full ownership and control, with architecture and learning potential first.",
    "Comfortable working solo, and still believe strongly in collaboration.",
    "Outside work, skiing, walking, swimming, LEGO and coffee rituals help me stay mentally balanced.",
    "Computer Programming, Hacettepe University, Ankara, 2020 - 2022.",
    "Languages: Turkish native, English advanced.",
  ],
};

export const contactLinks = [
  {
    label: "Email",
    href: `mailto:${profile.email}`,
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/905075865681",
  },
  {
    label: "LinkedIn",
    href: profile.linkedin,
  },
  {
    label: "GitHub",
    href: profile.github,
  },
  {
    label: "Portfolio",
    href: profile.portfolio,
  },
  {
    label: "Start a project",
    href: `mailto:${profile.email}?subject=New%20project%20inquiry`,
  },
];

export const primaryRoomShortcuts: Array<{
  label: string;
  scene: Exclude<Scene, "room" | "menu" | "comingSoon">;
}> = [
  { label: "Work", scene: "projects" },
  { label: "Services", scene: "services" },
  { label: "Experience", scene: "experience" },
  { label: "Skills", scene: "skills" },
  { label: "About", scene: "about" },
  { label: "Contact", scene: "contact" },
];

export const projects = [
  {
    title: "SuiGit",
    description:
      "First working fully decentralized version control system built on Sui. Repositories, commits, branches and pull requests live on-chain with Walrus decentralized blob storage, wallet-based access control, incremental commits and a TypeScript CLI.",
    meta: "Flagship project | Move (Sui), TypeScript, Walrus, Node.js CLI",
    links: [
      { label: "GitHub", href: "https://github.com/HDemir23/SuigitVol2" },
    ],
  },
  {
    title: "AION",
    description:
      "Multi-LLM consensus platform where Claude, GPT, Gemini and DeepSeek-style models analyze tasks, debate with weighted voting and record verified decisions on-chain with real-time WebSocket updates.",
    meta: "AI + blockchain | Next.js, Fastify, Solidity, PostgreSQL, Monad",
    links: [{ label: "GitHub", href: "https://github.com/HDemir23/AION-_" }],
  },
  {
    title: "XEngine",
    description:
      "Rust-powered DeFi copilot API server with x402 micropayment-gated endpoints, DEX arbitrage scanning across Monad sources and on-chain payment verification.",
    meta: "Real-time API | Rust, axum, tokio, Monad, x402",
    links: [{ label: "GitHub", href: "https://github.com/HDemir23/XEngine" }],
  },
  {
    title: "xSwap V2",
    description:
      "Full-stack DEX aggregator on Monad with Kuru DEX token swapping, wallet connect, portfolio views, transaction history, AI-assisted price optimization and a Sakura-themed UI.",
    meta: "Exchange aggregator | Next.js, Express, Prisma, PostgreSQL, Monad",
    links: [
      { label: "Live", href: "https://x-swap-v2-one.vercel.app" },
      { label: "GitHub", href: "https://github.com/HDemir23/xSwapV2" },
    ],
  },
  {
    title: "XClaw",
    description:
      "Full-stack exchange aggregator with wallet connect, portfolio view, transaction history and AI-powered swap routing.",
    meta: "Exchange aggregator | Next.js, Express, Prisma, PostgreSQL, Tailwind",
    links: [{ label: "Live", href: "https://x-claw-v1.vercel.app/" }],
  },
  {
    title: "Clawaifu",
    description:
      "Retro-futuristic 3D web experience with character rendering, bone-level animation control, morph targets, x402 micropayment-gated poses and an eDEX-style terminal intro.",
    meta: "3D interactive web | Next.js, React Three Fiber, Three.js, x402",
    links: [
      { label: "Live", href: "https://clawaifu.vercel.app" },
      { label: "GitHub", href: "https://github.com/HDemir23/Clawaifu" },
    ],
  },
  {
    title: "Trade Analyzer",
    description:
      "Telegram AI trading bot with GPT-4 and Claude analysis, RSI/MACD/ATR indicators, position tracking, backtesting, price alerts and multi-provider market data.",
    meta: "AI trading bot | TypeScript, grammY, PostgreSQL, Redis, Docker",
    links: [
      {
        label: "GitHub",
        href: "https://github.com/HDemir23/Telegram-Trade-Analyzer-Advicer",
      },
    ],
  },
  {
    title: "Slip.Io",
    description:
      "Kitchen display system for a local coffee shop with real-time order tracking and management workflows for baristas.",
    meta: "Operations app | Next.js, SQL",
    links: [{ label: "Live", href: "https://slip-io.vercel.app/" }],
  },
  {
    title: "Port6",
    description:
      "On-chain lottery protocol on Monad blockchain with verifiable randomness, prize pools and refund logic.",
    meta: "On-chain lottery | Solidity, React, Monad Testnet",
    links: [
      { label: "Live", href: "https://monad-hackhathon2-frontend.vercel.app/" },
    ],
  },
  {
    title: "Arbitrage",
    description:
      "Move smart-contract module for detecting triangular arbitrage opportunities across Cetus CLMM pools with real-time pool data, fee-aware calculations and configurable thresholds.",
    meta: "Smart contract | Move, Sui",
    links: [{ label: "GitHub", href: "https://github.com/HDemir23/Arbitrage" }],
  },
  {
    title: "Sui Move Workshop",
    description:
      "Teaching materials, exercises and code examples used for Move and Sui smart-contract workshops at 20+ Turkish universities including Hacettepe, ITU, IYTE and Dokuz Eylul.",
    meta: "Education | Move, Sui, TypeScript",
    links: [
      { label: "GitHub", href: "https://github.com/HDemir23/Sui-Workshop" },
    ],
  },
  {
    title: "Ev Ankara",
    description:
      "A live real-estate focused website with clean property discovery, fast navigation and a business-ready public presence.",
    meta: "Live website",
    links: [{ label: "Live", href: "https://evankara.org" }],
  },
];

export const skills = [
  "React",
  "Next.js",
  "TypeScript",
  "JavaScript",
  "HTML",
  "CSS",
  "Tailwind CSS",
  "Three.js",
  "React Three Fiber",
  "Framer Motion",
  "React Native",
  "Expo",
  "Reanimated",
  "EAS Build",
  "Swift",
  "SwiftUI",
  "Node.js",
  "Express",
  "Fastify",
  "WebSocket",
  "MongoDB",
  "Firebase",
  "PostgreSQL",
  "Redis",
  "Prisma",
  "Docker",
  "Rust",
  "axum",
  "tokio",
  "grammY",
  "Zod",
  "Move (Sui)",
  "Solidity",
  "Smart Contracts",
  "Ethers.js",
  "Foundry",
  "Wagmi",
  "RainbowKit",
  "Monad",
  "x402",
  "OpenAI APIs",
  "Claude APIs",
  "Gemini APIs",
  "OpenRouter",
  "MCP",
  "Data Pipelines",
  "Turborepo",
  "Xcode",
  "Vercel",
  "Railway",
  "Postman",
  "Git",
  "CI/CD",
];

export const experience = [
  "Frontend & Mobile Developer, Chick Studio - Remote, 01/2023 - 01/2026. Shipped cross-platform apps and responsive dashboards, built REST API and WebSocket integrations, and implemented JWT + Firebase auth and payment pipelines.",
  "Freelance Mobile Developer, Contract - Remote, 01/2024 - 01/2026. Delivered pre-release mobile apps under NDA with React Native, Expo, Swift, SwiftUI, Firebase, Railway and REST APIs in agile sprint teams.",
  "Technical Instructor - Move Language, Turkey, 08/2024 - 01/2026. Ran hands-on Move, Sui and smart-contract workshops at 20+ universities including Hacettepe, ITU, IYTE and Dokuz Eylul.",
  "AI-Augmented Development - Production multi-model workflows that route Claude, GPT, Gemini and Z-Ai by task with custom MCP integrations and local development tooling.",
];

export const services = [
  "Web applications",
  "Mobile applications",
  "Blockchain products",
  "AI-integrated products",
  "Admin panels",
  "Backend APIs",
  "Business websites",
  "Technical workshops",
];

export const serviceDetails = [
  {
    title: "Web Apps",
    description:
      "React and Next.js applications, dashboards, admin panels and internal tools with reusable components and clean API integration.",
  },
  {
    title: "Mobile Apps",
    description:
      "React Native, Expo, Swift and SwiftUI product flows with custom animation, offline-first storage and production-oriented build setup.",
  },
  {
    title: "AI Systems",
    description:
      "LLM-powered workflows using OpenAI, Claude and Gemini APIs, multi-model routing, MCP integrations and data pipelines.",
  },
  {
    title: "Blockchain",
    description:
      "Sui Move and Solidity products with smart contracts, wallet-connected frontends, on-chain verification and decentralized storage.",
  },
  {
    title: "Backend APIs",
    description:
      "Node.js, Fastify, Express, Rust and database-backed services with PostgreSQL, MongoDB, Redis, Prisma, Docker and Railway/Vercel deployments.",
  },
  {
    title: "Business Websites",
    description:
      "Fast public websites and landing pages with responsive layouts, clear contact paths and business-ready presentation.",
  },
];
