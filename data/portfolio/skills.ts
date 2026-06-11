export type SkillAccent =
  | "terminal"
  | "cyan"
  | "amber"
  | "rose"
  | "violet"
  | "steel";

export type SkillGroup = {
  title: string;
  level: string;
  focus: string;
  evidence: string;
  accent: SkillAccent;
  items: readonly string[];
};

export const skillProfile = {
  title: "Full-stack product engineering across web, mobile, AI and on-chain systems.",
  description:
    "I mainly ship Next.js and React Native products, then back them with Node/Rust APIs, PostgreSQL, real-time updates, Sui/Monad integrations and multi-model AI tooling.",
  markers: [
    { label: "Core lane", value: "Product apps" },
    { label: "Chain focus", value: "Sui + Monad" },
    { label: "AI stack", value: "Multi-LLM + MCP" },
    { label: "Delivery", value: "Vercel + Railway" },
  ],
} as const;

export const skillGroups = [
  {
    title: "Frontend Product",
    level: "Primary stack",
    focus:
      "Interactive web apps, dashboards, wallet-connected flows and 3D product interfaces.",
    evidence: "Used across xSwap V2, XClaw, AION and Clawaifu.",
    accent: "terminal",
    items: [
      "TypeScript",
      "React",
      "Next.js",
      "Tailwind CSS",
      "Framer Motion",
      "Three.js",
      "React Three Fiber",
      "Zod",
    ],
  },
  {
    title: "Mobile Product",
    level: "Shipped apps",
    focus:
      "Cross-platform mobile flows, custom animation, Firebase-backed features and native iOS surfaces.",
    evidence: "React Native, Expo and Swift work from remote product teams.",
    accent: "cyan",
    items: [
      "React Native",
      "Expo",
      "Reanimated",
      "Swift",
      "SwiftUI",
      "Firebase",
      "EAS Build",
      "Xcode",
    ],
  },
  {
    title: "API Systems & Data",
    level: "Backend layer",
    focus:
      "REST and WebSocket services, database-backed workflows, auth and real-time product infrastructure.",
    evidence: "AION, xSwap V2, Trade Analyzer and XEngine backends.",
    accent: "amber",
    items: [
      "Node.js",
      "Fastify",
      "Express",
      "REST APIs",
      "WebSocket",
      "PostgreSQL",
      "Prisma",
      "Redis",
      "MongoDB",
      "JWT Auth",
      "Rust",
      "axum",
      "tokio",
    ],
  },
  {
    title: "Blockchain Systems",
    level: "Protocol work",
    focus:
      "Sui Move modules, Solidity contracts, wallet UX, on-chain verification and decentralized storage.",
    evidence: "SuiGit, Port6, Arbitrage, xSwap V2 and Move workshops.",
    accent: "rose",
    items: [
      "Sui Move",
      "Walrus Storage",
      "Solidity",
      "Smart Contracts",
      "Monad",
      "x402",
      "Ethers.js",
      "Foundry",
      "Wagmi",
      "RainbowKit",
    ],
  },
  {
    title: "AI & Automation",
    level: "Workflow layer",
    focus:
      "Multi-model routing, LLM-assisted decision flows, market analysis bots and custom MCP integrations.",
    evidence: "AION, Trade Analyzer and local AI-augmented development tooling.",
    accent: "violet",
    items: [
      "OpenAI APIs",
      "Claude APIs",
      "Gemini APIs",
      "Multi-LLM Workflows",
      "MCP",
      "Data Pipelines",
      "Telegram Bots",
      "grammY",
    ],
  },
  {
    title: "Delivery & Tooling",
    level: "Production setup",
    focus:
      "Repo structure, build pipelines, deployment targets and repeatable delivery workflows.",
    evidence: "Production-oriented Vercel, Railway, Docker and monorepo setups.",
    accent: "steel",
    items: [
      "Docker",
      "Turborepo",
      "Railway",
      "Vercel",
      "Git",
      "CI/CD",
    ],
  },
] satisfies readonly SkillGroup[];

export const skills = skillGroups.flatMap((group) => group.items);
