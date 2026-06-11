"use client";

import { motion } from "framer-motion";
import { memo, useCallback, useMemo, type CSSProperties } from "react";
import type { RoomObjectConfig } from "@/data/portfolio/types";

type RoomObjectProps = {
  object: RoomObjectConfig;
  onSelect?: (object: RoomObjectConfig) => void;
  isFocused?: boolean;
  showCue?: boolean;
  controlState?: "active" | "on" | "off";
};

const objectVariants = {
  hover: {
    scale: 1.015
  },
  tap: { scale: 0.985 }
};

function RoomObject({
  object,
  onSelect,
  isFocused = false,
  showCue = false,
  controlState
}: RoomObjectProps) {
  const isInteractive = Boolean(
    (object.targetScene || object.externalUrl || object.action || object.modal) &&
      onSelect
  );
  const Tag = isInteractive ? motion.button : motion.div;
  const hasFixedHeight = Boolean(object.height || object.hotspotOnly);
  const containerStyle = useMemo<CSSProperties>(
    () => ({
      left: `${object.position.left}%`,
      top: `${object.position.top}%`,
      width: `${object.width}%`,
      height: object.height ? `${object.height}%` : undefined,
      transform: "translate(-50%, -50%)",
      zIndex: object.zIndex ?? 1
    }),
    [
      object.height,
      object.position.left,
      object.position.top,
      object.width,
      object.zIndex
    ]
  );
  const imageClasses = useMemo(
    () =>
      [
        "pixel-art room-object-image block w-full select-none",
        object.baseVisible ? "is-visible" : ""
      ]
        .filter(Boolean)
        .join(" "),
    [object.baseVisible]
  );
  const objectClasses = useMemo(
    () =>
      [
        "room-object group relative block w-full focus:outline-none",
        hasFixedHeight ? "h-full" : "",
        isInteractive ? "cursor-pointer" : "pointer-events-none",
        object.baseVisible ? "room-object-static" : ""
      ].join(" "),
    [hasFixedHeight, isInteractive, object.baseVisible]
  );
  const handleSelect = useCallback(() => {
    onSelect?.(object);
  }, [object, onSelect]);

  return (
    <div
      className="absolute"
      style={containerStyle}
    >
      <Tag
        type={isInteractive ? "button" : undefined}
        aria-label={isInteractive ? `Open ${object.label}` : object.label}
        onClick={isInteractive ? handleSelect : undefined}
        className={objectClasses}
        data-focused={isFocused ? "true" : undefined}
        data-static={object.baseVisible ? "true" : undefined}
        data-cue={object.cue ?? "top"}
        data-control-state={controlState}
        whileHover={isInteractive ? objectVariants.hover : undefined}
        whileTap={isInteractive ? objectVariants.tap : undefined}
      >
        {showCue && isInteractive && object.cue ? (
          <span className="click-cue" aria-hidden="true" />
        ) : null}

        {object.hotspotOnly ? (
          <span className="room-hotspot block h-full w-full" />
        ) : object.image ? (
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

export default memo(RoomObject);
