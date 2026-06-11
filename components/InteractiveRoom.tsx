"use client";

import { motion, type Variants } from "framer-motion";
import { memo, useCallback, useMemo } from "react";
import RoomObject from "@/components/RoomObject";
import {
  decorativeObjects,
  primaryRoomShortcuts,
  roomBackgroundImage,
  roomObjects,
  type RoomObjectConfig,
  type Scene
} from "@/data/portfolio";

type InteractiveRoomProps = {
  scene: Scene;
  focusedObjectId: string | null;
  isMusicOn: boolean;
  onObjectSelect: (object: RoomObjectConfig) => void;
};

type ControlState = "active" | "on" | "off";

const roomVariants: Variants = {
  room: {
    scale: 1,
    x: "0%",
    y: "0%",
    filter: "brightness(1)",
    transition: { duration: 0.45, ease: "easeOut" }
  },
  focus: (object?: RoomObjectConfig) => ({
    scale: object?.zoom?.scale ?? 1.12,
    x: object?.zoom?.x ?? "0%",
    y: object?.zoom?.y ?? "0%",
    filter: "brightness(0.72)",
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
  })
};

function InteractiveRoom({
  scene,
  focusedObjectId,
  isMusicOn,
  onObjectSelect
}: InteractiveRoomProps) {
  const focusedObject = useMemo(
    () =>
      roomObjects.find((object) => object.id === focusedObjectId) ??
      roomObjects.find((object) => object.targetScene === scene),
    [focusedObjectId, scene]
  );

  const getControlState = useCallback((object: RoomObjectConfig): ControlState | undefined => {
    if (object.action === "music") {
      return isMusicOn ? "on" : "off";
    }

    if (object.action === "home" && scene === "room") {
      return "active";
    }

    if (object.targetScene === scene) {
      return "active";
    }

    return undefined;
  }, [isMusicOn, scene]);

  const showCue = scene === "room";
  const focusedRenderId = focusedObject?.id;
  const roomStyle = useMemo(
    () => ({
      transformOrigin: focusedObject
        ? `${focusedObject.position.left}% ${focusedObject.position.top}%`
        : "50% 55%"
    }),
    [focusedObject]
  );

  const decorativeObjectNodes = useMemo(
    () =>
      decorativeObjects.map((object) => (
        <RoomObject
          key={object.id}
          object={object}
          isFocused={focusedRenderId === object.id}
          showCue={showCue}
          controlState={getControlState(object)}
        />
      )),
    [focusedRenderId, getControlState, showCue]
  );

  const roomObjectNodes = useMemo(
    () =>
      roomObjects.map((object) => (
        <RoomObject
          key={object.id}
          object={object}
          isFocused={focusedRenderId === object.id}
          showCue={showCue}
          controlState={getControlState(object)}
          onSelect={onObjectSelect}
        />
      )),
    [focusedRenderId, getControlState, onObjectSelect, showCue]
  );

  const primaryShortcutNodes = useMemo(
    () =>
      primaryRoomShortcuts.map((shortcut) => {
        const targetObject = roomObjects.find(
          (object) => object.targetScene === shortcut.scene
        );
        const isActive = scene === shortcut.scene;

        return (
          <button
            type="button"
            key={shortcut.scene}
            onClick={() => {
              if (targetObject) {
                onObjectSelect(targetObject);
              }
            }}
            aria-current={isActive ? "page" : undefined}
            className={[
              "shrink-0 border px-3 py-2 font-mono text-[0.68rem] font-black uppercase tracking-[0.12em] shadow-[0_10px_26px_rgba(0,0,0,0.28)] backdrop-blur-sm transition focus:outline-none focus:ring-2 focus:ring-terminal/35 sm:px-4 sm:text-[0.72rem]",
              isActive
                ? "border-terminal bg-terminal text-ink"
                : "border-ember/35 bg-black/58 text-stone-200 hover:border-terminal/55 hover:text-terminal"
            ].join(" ")}
          >
            {shortcut.label}
          </button>
        );
      }),
    [onObjectSelect, scene]
  );

  const mobileShortcutNodes = useMemo(
    () =>
      primaryRoomShortcuts.map((shortcut) => {
        const targetObject = roomObjects.find(
          (object) => object.targetScene === shortcut.scene
        );
        const isActive = scene === shortcut.scene;

        return (
          <button
            type="button"
            key={shortcut.scene}
            onClick={() => {
              if (targetObject) {
                onObjectSelect(targetObject);
              }
            }}
            aria-current={isActive ? "page" : undefined}
            className={[
              "shrink-0 border px-2.5 py-1 font-mono text-[0.64rem] font-bold uppercase tracking-[0.12em] shadow-[0_8px_20px_rgba(0,0,0,0.22)] backdrop-blur-sm transition focus:outline-none focus:ring-2 focus:ring-terminal/35",
              isActive
                ? "border-terminal bg-terminal text-ink"
                : "border-ember/35 bg-black/55 text-stone-200 hover:border-terminal/50 hover:text-terminal"
            ].join(" ")}
          >
            {shortcut.label}
          </button>
        );
      }),
    [onObjectSelect, scene]
  );

  const utilityShortcutNodes = useMemo(
    () =>
      roomObjects
        .filter((object) => object.action === "music" || object.targetScene === "menu")
        .map((object) => (
          <button
            type="button"
            key={object.id}
            onClick={() => onObjectSelect(object)}
            className="shrink-0 border border-stone-500/35 bg-black/45 px-2.5 py-1 font-mono text-[0.64rem] font-bold uppercase tracking-[0.12em] text-stone-300 shadow-[0_8px_20px_rgba(0,0,0,0.22)] backdrop-blur-sm transition hover:border-terminal/50 hover:text-terminal focus:outline-none focus:ring-2 focus:ring-terminal/35"
          >
            {object.action === "music"
              ? isMusicOn
                ? "Mute"
                : "Unmute"
              : object.mobileLabel ?? object.label}
          </button>
        )),
    [isMusicOn, onObjectSelect]
  );

  return (
    <section className="interactive-room relative flex flex-col items-center justify-center overflow-hidden bg-[#0b080d] px-0 py-0">

      <motion.div
        className="studio-frame relative shrink-0 overflow-visible"
        variants={roomVariants}
        initial={false}
        animate={scene === "room" ? "room" : "focus"}
        custom={focusedObject}
        style={roomStyle}
      >
        <img
          src={roomBackgroundImage}
          alt="Pixel-art retro technology studio room"
          draggable={false}
          className="pixel-art absolute inset-0 h-full w-full select-none object-contain"
        />

        {decorativeObjectNodes}

        {roomObjectNodes}
      </motion.div>

      <div className="fixed inset-x-0 top-4 z-40 hidden justify-center px-4 sm:flex">
        <div className="flex max-w-full gap-2 overflow-x-auto border border-ember/20 bg-black/42 p-2 shadow-[0_14px_36px_rgba(0,0,0,0.28)] backdrop-blur-md">
          {primaryShortcutNodes}
        </div>
      </div>

      <div
        className="mobile-shortcuts fixed inset-x-0 flex gap-2 overflow-x-auto px-3 pb-1 sm:hidden"
        style={{ top: "calc(env(safe-area-inset-top) + 0.75rem)" }}
      >
        {mobileShortcutNodes}
        {utilityShortcutNodes}
      </div>
    </section>
  );
}

export default memo(InteractiveRoom);
