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

export type ObjectModalKind = "printer" | "computer" | "mac" | "motor";

export type ObjectModalAction = {
  label: string;
  href?: string;
  scene?: Exclude<Scene, "room">;
  variant?: "primary" | "secondary";
};

export type ObjectModalConfig = {
  kind: ObjectModalKind;
  eyebrow: string;
  title: string;
  summary: string;
  description: string;
  stats: Array<{
    label: string;
    value: string;
  }>;
  highlights: string[];
  actions?: ObjectModalAction[];
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
  modal?: ObjectModalConfig;
};
