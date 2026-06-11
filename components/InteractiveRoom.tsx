"use client";

import { motion, type Variants } from "framer-motion";
import { memo, useCallback, useMemo } from "react";
import RoomObject from "@/components/RoomObject";
import {
  decorativeObjects,
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

  const mobileObjects = useMemo(() => {
    const shortcutGroups = new Set<string>();

    return roomObjects.filter((object) => {
      if (!object.targetScene && !object.externalUrl && !object.action) {
        return false;
      }

      const shortcutKey =
        object.shortcutGroup ?? object.externalUrl ?? object.targetScene ?? object.id;

      if (shortcutGroups.has(shortcutKey)) {
        return false;
      }

      shortcutGroups.add(shortcutKey);
      return true;
    });
  }, []);

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

  const mobileShortcutNodes = useMemo(
    () =>
      mobileObjects.map((object) => (
        <button
          type="button"
          key={object.id}
          onClick={() => onObjectSelect(object)}
          className="shrink-0 border border-ember/35 bg-black/55 px-2.5 py-1 font-mono text-[0.64rem] font-bold uppercase tracking-[0.12em] text-stone-200 shadow-[0_8px_20px_rgba(0,0,0,0.22)] backdrop-blur-sm transition hover:border-terminal/50 hover:text-terminal focus:outline-none focus:ring-2 focus:ring-terminal/35"
        >
          {object.action === "music"
            ? isMusicOn
              ? "Mute"
              : "Unmute"
            : object.mobileLabel ?? object.label}
        </button>
      )),
    [isMusicOn, mobileObjects, onObjectSelect]
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

      <div className="mobile-shortcuts fixed inset-x-0 bottom-3 flex gap-2 overflow-x-auto px-3 pb-1 sm:hidden">
        {mobileShortcutNodes}
      </div>
    </section>
  );
}

export default memo(InteractiveRoom);
