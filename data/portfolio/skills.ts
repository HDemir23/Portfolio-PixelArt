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
  title: "Frontend-focused product engineering across web, mobile and full-stack apps.",
  description:
    "I mainly ship React, Next.js and TypeScript interfaces, then connect them to Node.js APIs, databases, auth flows, real-time updates and practical AI-assisted developer workflows.",
  markers: [
    { label: "Core lane", value: "Frontend" },
    { label: "Delivery", value: "Full-stack web" },
    { label: "Mobile", value: "React Native" },
    { label: "Deploy", value: "Vercel + Railway" },
  ],
} as const;

export const skillGroups = [
  {
    title: "Frontend Product",
    level: "Primary stack",
    focus:
      "Responsive web apps, dashboards, admin panels, landing pages and interactive product interfaces.",
    evidence: "Used across freelance web apps, Ev Ankara, Slip.Io, xSwap V2, AION and Clawaifu.",
    accent: "terminal",
    items: [
      "TypeScript",
      "React",
      "Next.js",
      "Tailwind CSS",
      "Framer Motion",
      "Three.js",
      "React Three Fiber",
    ],
  },
  {
    title: "Mobile Product",
    level: "Pre-release product work",
    focus:
      "Cross-platform mobile screens, custom animation, Firebase-backed features and native iOS surfaces.",
    evidence: "React Native, Expo and Swift work on company products that have not been publicly released yet.",
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
    evidence: "Used for full-stack web apps, dashboards, AION, xSwap V2 and Trade Analyzer.",
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
    ],
  },
  {
    title: "Blockchain Experience",
    level: "Secondary experience",
    focus:
      "Sui Move modules, Solidity contracts, wallet-connected frontends and decentralized storage.",
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
    title: "AI Tooling & Automation",
    level: "Developer workflow",
    focus:
      "Using LLM APIs and AI tools to speed up implementation, prototyping, analysis and automation workflows.",
    evidence: "AION, Trade Analyzer and local AI-assisted development tooling. Not model training or AI research.",
    accent: "violet",
    items: [
      "OpenAI APIs",
      "Claude APIs",
      "Gemini APIs",
      "LLM API Integration",
      "MCP",
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
      "Rust (learning)",
    ],
  },
] satisfies readonly SkillGroup[];

export const skills = skillGroups.flatMap((group) => group.items);
