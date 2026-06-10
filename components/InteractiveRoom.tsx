"use client";

import { motion, type Variants } from "framer-motion";
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
  onObjectSelect: (object: RoomObjectConfig) => void;
};

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

export default function InteractiveRoom({
  scene,
  focusedObjectId,
  onObjectSelect
}: InteractiveRoomProps) {
  const focusedObject =
    roomObjects.find((object) => object.id === focusedObjectId) ??
    roomObjects.find((object) => object.targetScene === scene);
  const shortcutGroups = new Set<string>();
  const mobileObjects = roomObjects.filter((object) => {
    if (!object.targetScene && !object.externalUrl) {
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

  return (
    <section className="interactive-room relative flex flex-col items-center justify-center overflow-hidden bg-[#0b080d] px-0 py-0">

      <motion.div
        className="studio-frame relative shrink-0 overflow-visible"
        variants={roomVariants}
        initial={false}
        animate={scene === "room" ? "room" : "focus"}
        custom={focusedObject}
        style={{
          transformOrigin: focusedObject
            ? `${focusedObject.position.left}% ${focusedObject.position.top}%`
            : "50% 55%"
        }}
      >
        <img
          src={roomBackgroundImage}
          alt="Pixel-art retro technology studio room"
          draggable={false}
          className="pixel-art absolute inset-0 h-full w-full select-none object-contain"
        />

        {decorativeObjects.map((object) => (
          <RoomObject
            key={object.id}
            object={object}
            isFocused={focusedObject?.id === object.id}
            showCue={scene === "room"}
          />
        ))}

        {roomObjects.map((object) => (
          <RoomObject
            key={object.id}
            object={object}
            isFocused={focusedObject?.id === object.id}
            showCue={scene === "room"}
            onSelect={onObjectSelect}
          />
        ))}
      </motion.div>

      <div className="mobile-shortcuts fixed inset-x-0 bottom-3 flex gap-2 overflow-x-auto px-3 pb-1 sm:hidden">
        {mobileObjects.map((object) => (
          <button
            type="button"
            key={object.id}
            onClick={() => onObjectSelect(object)}
            className="shrink-0 border border-ember/35 bg-black/55 px-2.5 py-1 font-mono text-[0.64rem] font-bold uppercase tracking-[0.12em] text-stone-200 shadow-[0_8px_20px_rgba(0,0,0,0.22)] backdrop-blur-sm transition hover:border-terminal/50 hover:text-terminal focus:outline-none focus:ring-2 focus:ring-terminal/35"
          >
            {object.label}
          </button>
        ))}
      </div>
    </section>
  );
}
