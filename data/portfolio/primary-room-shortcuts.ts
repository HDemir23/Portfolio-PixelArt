import type { Scene } from "./types";

export const primaryRoomShortcuts: Array<{
  label: string;
  scene: Exclude<Scene, "room" | "menu">;
}> = [
  { label: "Work", scene: "projects" },
  { label: "Services", scene: "services" },
  { label: "Experience", scene: "experience" },
  { label: "Skills", scene: "skills" },
  { label: "About", scene: "about" },
  { label: "Contact", scene: "contact" },
];
