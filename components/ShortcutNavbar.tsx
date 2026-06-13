"use client";

import { memo } from "react";
import { primaryRoomShortcuts } from "@/data/portfolio/primary-room-shortcuts";
import { roomObjects } from "@/data/portfolio/room-objects";
import type { RoomObjectConfig, Scene } from "@/data/portfolio/types";

type ShortcutNavbarProps = {
  scene: Scene;
  isMusicOn: boolean;
  onObjectSelect: (object: RoomObjectConfig) => void;
};

type ShortcutButtonProps = {
  label: string;
  isActive?: boolean;
  isMobileOnly?: boolean;
  isUtility?: boolean;
  isToggleOn?: boolean;
  onClick: () => void;
};

const roomObjectByScene = new Map(
  roomObjects
    .filter((object) => object.targetScene)
    .map((object) => [object.targetScene, object])
);

const utilityShortcutObjects = roomObjects.filter(
  (object) => object.action === "music" || object.targetScene === "menu"
);

function ShortcutButton({
  label,
  isActive = false,
  isMobileOnly = false,
  isUtility = false,
  isToggleOn,
  onClick,
}: ShortcutButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-current={isActive ? "page" : undefined}
      aria-pressed={typeof isToggleOn === "boolean" ? isToggleOn : undefined}
      className={[
        "shortcut-navbar-button retro-action border font-mono font-black uppercase shadow-[0_8px_20px_rgba(0,0,0,0.22)] backdrop-blur-sm transition focus:outline-none focus:ring-2 focus:ring-terminal/35 sm:shadow-[0_10px_26px_rgba(0,0,0,0.28)]",
        isMobileOnly ? "sm:hidden" : "",
        isActive
          ? "border-terminal bg-terminal text-ink"
          : isUtility
            ? "border-stone-500/35 bg-black/45 text-stone-300 hover:border-terminal/50 hover:text-terminal"
            : "border-ember/35 bg-black/58 text-stone-200 hover:border-terminal/55 hover:text-terminal",
      ].join(" ")}
    >
      {label}
    </button>
  );
}

function ShortcutNavbar({
  scene,
  isMusicOn,
  onObjectSelect,
}: ShortcutNavbarProps) {
  return (
    <nav className="shortcut-navbar" aria-label="Studio shortcuts">
      <div className="shortcut-navbar-panel">
        {primaryRoomShortcuts.map((shortcut) => {
          const targetObject = roomObjectByScene.get(shortcut.scene);

          if (!targetObject) {
            return null;
          }

          return (
            <ShortcutButton
              key={shortcut.scene}
              label={shortcut.label}
              isActive={scene === shortcut.scene}
              onClick={() => onObjectSelect(targetObject)}
            />
          );
        })}

        {utilityShortcutObjects.map((object) => {
          const isMusicControl = object.action === "music";
          const label = isMusicControl
            ? isMusicOn
              ? "Mute"
              : "Unmute"
            : object.mobileLabel ?? object.label;

          return (
            <ShortcutButton
              key={object.id}
              label={label}
              isMobileOnly
              isUtility
              isActive={object.targetScene === scene}
              isToggleOn={isMusicControl ? isMusicOn : undefined}
              onClick={() => onObjectSelect(object)}
            />
          );
        })}
      </div>
    </nav>
  );
}

export default memo(ShortcutNavbar);
