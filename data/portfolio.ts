export type Scene =
  | "room"
  | "projects"
  | "skills"
  | "experience"
  | "services"
  | "contact"
  | "about";

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
  width: number;
  zIndex?: number;
  zoom?: RoomZoom;
  baseVisible?: boolean;
};

export const roomBackgroundImage = "/WB/Background.png";

const layer = (filename: string) => `/WB/layers/${filename}`;

export const decorativeObjects: RoomObjectConfig[] = [
  {
    id: "chair-back",
    label: "Chair back",
    image: layer("Koltuk1.png"),
    position: { left: 39.42, top: 67.29 },
    width: 16.12,
    zIndex: 4,
    baseVisible: true
  },
  {
    id: "chair-base",
    label: "Chair base",
    image: layer("Koltuk2.png"),
    position: { left: 38.62, top: 91.11 },
    width: 13.46,
    zIndex: 8,
    baseVisible: true
  }
];

export const roomObjects: RoomObjectConfig[] = [
  {
    id: "portfolio-screen",
    label: "Projects",
    image: layer("PC.png"),
    position: { left: 14.65, top: 52.64 },
    targetScene: "projects",
    width: 22.41,
    zIndex: 10,
    zoom: { scale: 1.22, x: "11%", y: "4%" }
  },
  {
    id: "projects-note",
    label: "Projects",
    image: layer("Projects.png"),
    position: { left: 9.57, top: 26.5 },
    targetScene: "projects",
    width: 4.23,
    zIndex: 10,
    zoom: { scale: 1.28, x: "18%", y: "12%" }
  },
  {
    id: "store",
    label: "Services",
    image: layer("Store.png"),
    position: { left: 53.68, top: 79.49 },
    targetScene: "services",
    width: 15.16,
    zIndex: 12,
    zoom: { scale: 1.18, x: "-2%", y: "-7%" }
  },
  {
    id: "code-sign",
    label: "Skills",
    image: layer("Tablo.png"),
    position: { left: 93.55, top: 12.37 },
    targetScene: "skills",
    width: 10.33,
    zIndex: 11,
    zoom: { scale: 1.25, x: "-15%", y: "15%" }
  },
  {
    id: "youtube-plaque",
    label: "Experience",
    image: layer("youtube2.png"),
    position: { left: 96.24, top: 31.77 },
    targetScene: "experience",
    width: 3.48,
    zIndex: 10,
    zoom: { scale: 1.22, x: "-15%", y: "7%" }
  },
  {
    id: "contact-note",
    label: "Contact",
    image: layer("contact2.png"),
    position: { left: 6.05, top: 34.15 },
    targetScene: "contact",
    width: 3.44,
    zIndex: 10,
    zoom: { scale: 1.3, x: "19%", y: "9%" }
  },
  {
    id: "about-note",
    label: "About",
    image: layer("about.png"),
    position: { left: 13.55, top: 33.14 },
    targetScene: "about",
    width: 3.3,
    zIndex: 10,
    zoom: { scale: 1.3, x: "16%", y: "9%" }
  }
];

export const projects = [
  {
    title: "Business Website",
    description:
      "A fast, responsive web presence for a service business with clear conversion paths."
  },
  {
    title: "Dashboard Web App",
    description:
      "An admin-focused product interface with data views, user flows and API integration."
  },
  {
    title: "Mobile App Concept",
    description:
      "A polished mobile application concept designed for modern iOS and cross-platform delivery."
  }
];

export const skills = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "React Native",
  "SwiftUI",
  "Firebase",
  "MongoDB",
  "Tailwind CSS"
];

export const experience = [
  "Freelance full-stack developer",
  "Web & mobile application development",
  "Frontend-focused product development",
  "API integration and admin dashboards"
];

export const services = [
  "Business websites",
  "Web applications",
  "Mobile applications",
  "Admin panels",
  "Backend APIs",
  "Landing pages"
];
