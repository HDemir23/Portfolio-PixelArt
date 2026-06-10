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
  onSceneChange: (scene: Scene) => void;
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
  onSceneChange
}: InteractiveRoomProps) {
  const focusedObject = roomObjects.find((object) => object.targetScene === scene);
  const mobileObjects = roomObjects.filter(
    (object, index) =>
      object.targetScene &&
      roomObjects.findIndex((item) => item.targetScene === object.targetScene) === index
  );

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#0b080d] px-0 py-0">

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
          />
        ))}

        {roomObjects.map((object) => (
          <RoomObject
            key={object.id}
            object={object}
            isFocused={focusedObject?.id === object.id}
            onSelect={(selected) => {
              if (selected.targetScene) {
                onSceneChange(selected.targetScene);
              }
            }}
          />
        ))}
      </motion.div>

      <div className="mt-3 flex max-w-3xl flex-wrap justify-center gap-2 px-3 sm:hidden">
        {mobileObjects.map((object) => (
          <button
            type="button"
            key={object.id}
            onClick={() => {
              if (object.targetScene) {
                onSceneChange(object.targetScene);
              }
            }}
            className="border border-ember/35 bg-black/35 px-2.5 py-1 font-mono text-[0.64rem] font-bold uppercase tracking-[0.12em] text-stone-200 shadow-[0_8px_20px_rgba(0,0,0,0.22)] transition hover:border-terminal/50 hover:text-terminal focus:outline-none focus:ring-2 focus:ring-terminal/35"
          >
            {object.label}
          </button>
        ))}
      </div>
    </section>
  );
}
