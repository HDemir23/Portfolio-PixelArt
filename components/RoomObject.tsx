"use client";

import { motion } from "framer-motion";
import type { RoomObjectConfig } from "@/data/portfolio";

type RoomObjectProps = {
  object: RoomObjectConfig;
  onSelect?: (object: RoomObjectConfig) => void;
  isFocused?: boolean;
};

const objectVariants = {
  hover: {
    scale: 1.015
  },
  tap: { scale: 0.985 }
};

export default function RoomObject({
  object,
  onSelect,
  isFocused = false
}: RoomObjectProps) {
  const isInteractive = Boolean(object.targetScene && onSelect);
  const Tag = isInteractive ? motion.button : motion.div;
  const imageClasses = [
    "pixel-art room-object-image block w-full select-none",
    object.baseVisible ? "is-visible" : ""
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className="absolute"
      style={{
        left: `${object.position.left}%`,
        top: `${object.position.top}%`,
        width: `${object.width}%`,
        transform: "translate(-50%, -50%)",
        zIndex: object.zIndex ?? 1
      }}
    >
      <Tag
        type={isInteractive ? "button" : undefined}
        aria-label={isInteractive ? `Open ${object.label}` : object.label}
        onClick={isInteractive ? () => onSelect?.(object) : undefined}
        className={[
          "room-object group relative block w-full focus:outline-none",
          isInteractive ? "cursor-pointer" : "pointer-events-none",
          object.baseVisible ? "room-object-static" : ""
        ].join(" ")}
        data-focused={isFocused ? "true" : undefined}
        data-static={object.baseVisible ? "true" : undefined}
        whileHover={isInteractive ? objectVariants.hover : undefined}
        whileTap={isInteractive ? objectVariants.tap : undefined}
      >
        {object.image ? (
          <img
            src={object.image}
            alt=""
            draggable={false}
            className={imageClasses}
          />
        ) : (
          <div className="flex aspect-[3/4] w-full items-center justify-center border-2 border-dashed border-ember/80 bg-black/45 p-2 text-center font-mono text-[clamp(0.48rem,1.1vw,0.8rem)] font-black uppercase tracking-[0.14em] text-ember shadow-[0_0_18px_rgba(233,167,95,0.18)]">
            {object.missingAssetName}
          </div>
        )}

        {isInteractive ? (
          <span className="object-label pointer-events-none absolute left-1/2 top-full mt-2 whitespace-nowrap border border-ember/70 bg-panel/95 px-3 py-1.5 font-mono text-[clamp(0.55rem,0.9vw,0.78rem)] font-bold uppercase tracking-[0.12em] text-stone-100 shadow-lg transition duration-200">
            {object.label}
          </span>
        ) : null}
      </Tag>
    </div>
  );
}
