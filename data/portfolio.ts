export type Scene =
  | "room"
  | "projects"
  | "skills"
  | "experience"
  | "services"
  | "contact"
  | "about"
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
  width: number;
  height?: number;
  zIndex?: number;
  zoom?: RoomZoom;
  baseVisible?: boolean;
  hotspotOnly?: boolean;
  cue?: "top" | "right" | "bottom" | "left";
  shortcutGroup?: string;
};

export const roomBackgroundImage = "/WB/Background.png";

const layer = (filename: string) => `/WB/layers/${filename}`;

export const decorativeObjects: RoomObjectConfig[] = [];

export const roomObjects: RoomObjectConfig[] = [
  {
    id: "contact-top-note",
    label: "Contact",
    position: { left: 5.82, top: 22.15 },
    targetScene: "contact",
    width: 5.1,
    height: 8.7,
    zIndex: 12,
    hotspotOnly: true,
    cue: "right",
    shortcutGroup: "contact"
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
    shortcutGroup: "contact"
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
    cue: "right"
  },
  {
    id: "portfolio-screen",
    label: "Portfolio & Services",
    image: layer("PC.png"),
    position: { left: 14.65, top: 52.64 },
    targetScene: "projects",
    width: 22.41,
    zIndex: 10,
    zoom: { scale: 1.22, x: "11%", y: "4%" },
    cue: "bottom",
    shortcutGroup: "portfolio"
  },
  {
    id: "projects-note",
    label: "Coming Soon",
    image: layer("Projects.png"),
    position: { left: 9.57, top: 26.5 },
    targetScene: "comingSoon",
    width: 4.23,
    zIndex: 12,
    zoom: { scale: 1.28, x: "18%", y: "12%" },
    cue: "bottom",
    shortcutGroup: "soon"
  },
  {
    id: "store",
    label: "Coming Soon",
    image: layer("Store.png"),
    position: { left: 53.68, top: 79.49 },
    targetScene: "comingSoon",
    width: 15.16,
    zIndex: 12,
    zoom: { scale: 1.18, x: "-2%", y: "-7%" },
    cue: "top",
    shortcutGroup: "soon"
  },
  {
    id: "green-moto",
    label: "Ev Ankara",
    image: layer("GreenMoto.png"),
    position: { left: 69, top: 53.91 },
    externalUrl: "https://evankara.org",
    width: 10.23,
    zIndex: 12,
    cue: "left"
  },
  {
    id: "motor",
    label: "Coming Soon",
    image: layer("Motor.png"),
    position: { left: 82.6, top: 78.45 },
    targetScene: "comingSoon",
    width: 31.96,
    zIndex: 12,
    cue: "top",
    shortcutGroup: "soon"
  },
  {
    id: "code-sign",
    label: "GitHub",
    image: layer("Tablo.png"),
    position: { left: 93.55, top: 12.37 },
    externalUrl: "https://github.com/HDemir23",
    width: 10.33,
    zIndex: 12,
    cue: "bottom"
  },
  {
    id: "chair-back",
    label: "YouTube",
    image: layer("Koltuk1.png"),
    position: { left: 39.42, top: 67.29 },
    externalUrl: "https://www.youtube.com/watch?v=X4VbdwhkE10",
    width: 16.12,
    zIndex: 9,
    cue: "right",
    shortcutGroup: "youtube"
  },
  {
    id: "chair-base",
    label: "YouTube",
    image: layer("Koltuk2.png"),
    position: { left: 38.62, top: 91.11 },
    externalUrl: "https://www.youtube.com/watch?v=X4VbdwhkE10",
    width: 13.46,
    zIndex: 12,
    cue: "top",
    shortcutGroup: "youtube"
  },
  {
    id: "youtube-plaque-top",
    label: "Coming Soon",
    image: layer("youtube2.png"),
    position: { left: 96.24, top: 31.77 },
    targetScene: "comingSoon",
    width: 3.48,
    zIndex: 12,
    zoom: { scale: 1.22, x: "-15%", y: "7%" },
    cue: "left",
    shortcutGroup: "soon"
  },
  {
    id: "youtube-plaque-side",
    label: "Coming Soon",
    image: layer("Youtube1.png"),
    position: { left: 98.01, top: 44.04 },
    targetScene: "comingSoon",
    width: 3.98,
    zIndex: 12,
    cue: "left",
    shortcutGroup: "soon"
  },
  {
    id: "mac",
    label: "Coming Soon",
    image: layer("mac.png"),
    position: { left: 30.95, top: 53.42 },
    targetScene: "comingSoon",
    width: 7.56,
    zIndex: 12,
    cue: "bottom",
    shortcutGroup: "soon"
  },
  {
    id: "coffee",
    label: "Coming Soon",
    image: layer("Coffe.png"),
    position: { left: 13.37, top: 69.73 },
    targetScene: "comingSoon",
    width: 2.88,
    zIndex: 12,
    cue: "right",
    shortcutGroup: "soon"
  },
  {
    id: "desk-figure",
    label: "Coming Soon",
    image: layer("Biblo1.png"),
    position: { left: 17.29, top: 61.2 },
    targetScene: "comingSoon",
    width: 2.13,
    zIndex: 12,
    cue: "top",
    shortcutGroup: "soon"
  },
  {
    id: "desk-toy",
    label: "Coming Soon",
    image: layer("Biblo2.png"),
    position: { left: 10.44, top: 67.09 },
    targetScene: "comingSoon",
    width: 2.2,
    zIndex: 12,
    cue: "left",
    shortcutGroup: "soon"
  },
  {
    id: "plant",
    label: "Coming Soon",
    image: layer("Cicek.png"),
    position: { left: 91.69, top: 43.39 },
    targetScene: "comingSoon",
    width: 7.03,
    zIndex: 12,
    cue: "left",
    shortcutGroup: "soon"
  }
];

export const projects = [
  {
    title: "Ev Ankara",
    description:
      "A live real-estate focused website with clean property discovery, fast navigation and a business-ready public presence.",
    href: "https://evankara.org",
    meta: "Live website"
  },
  {
    title: "Business Website Systems",
    description:
      "Responsive company websites with conversion-focused sections, contact flows, SEO-ready structure and maintainable content areas.",
    meta: "Web design + frontend"
  },
  {
    title: "Product Interfaces",
    description:
      "Admin panels, dashboards and app screens built with reusable components, API integration and practical user flows.",
    meta: "Web apps + mobile"
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

export const serviceDetails = [
  {
    title: "Websites",
    description:
      "Fast landing pages and multi-page business sites with responsive layouts, clear contact paths and polished visuals."
  },
  {
    title: "Web Apps",
    description:
      "Dashboards, admin panels, data views and internal tools with clean React/Next.js component architecture."
  },
  {
    title: "Mobile Apps",
    description:
      "React Native and SwiftUI product screens, prototypes and production-ready app flows."
  },
  {
    title: "Backend & APIs",
    description:
      "Practical backend endpoints, integrations, database flows and service wiring for complete products."
  }
];
