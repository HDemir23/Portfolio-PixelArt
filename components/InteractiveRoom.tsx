"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import { memo, useCallback, useLayoutEffect, useMemo, useRef, useState } from "react";
import RoomObject from "@/components/RoomObject";
import ShortcutNavbar from "@/components/ShortcutNavbar";
import { decorativeObjects } from "@/data/portfolio/decorative-objects";
import { roomBackgroundImage } from "@/data/portfolio/room-background";
import { roomObjects } from "@/data/portfolio/room-objects";
import type { RoomObjectConfig, Scene } from "@/data/portfolio/types";

type InteractiveRoomProps = {
  scene: Scene;
  focusedObjectId: string | null;
  isMusicOn: boolean;
  onObjectSelect: (object: RoomObjectConfig) => void;
};

type ControlState = "active" | "on" | "off";
type PanelScene = Exclude<Scene, "room">;
type RoomMetrics = {
  viewportWidth: number;
  viewportHeight: number;
  frameWidth: number;
  frameHeight: number;
  frameLeft: number;
  frameTop: number;
};
type RoomTransform = {
  scale: number;
  x: string;
  y: string;
};

const roomVariants: Variants = {
  room: {
    scale: 1,
    x: "0%",
    y: "0%",
    transition: { duration: 0.45, ease: "easeOut" }
  },
  focus: (transform?: RoomTransform) => ({
    scale: transform?.scale ?? 1.12,
    x: transform?.x ?? "0%",
    y: transform?.y ?? "0%",
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
  })
};

function parsePercent(value: string | undefined) {
  const parsedValue = Number.parseFloat(value ?? "0");

  return Number.isFinite(parsedValue) ? parsedValue / 100 : 0;
}

function formatPercent(value: number) {
  return `${Number((value * 100).toFixed(3))}%`;
}

function clampValue(value: number, min: number, max: number) {
  if (min > max) {
    return value;
  }

  return Math.min(Math.max(value, min), max);
}

function areRoomMetricsEqual(first: RoomMetrics | null, second: RoomMetrics) {
  return (
    first?.viewportWidth === second.viewportWidth &&
    first.viewportHeight === second.viewportHeight &&
    first.frameWidth === second.frameWidth &&
    first.frameHeight === second.frameHeight &&
    first.frameLeft === second.frameLeft &&
    first.frameTop === second.frameTop
  );
}

function getConstrainedRoomTransform(
  object: RoomObjectConfig | undefined,
  metrics: RoomMetrics | null
): RoomTransform {
  const scale = object?.zoom?.scale ?? 1.12;
  const desiredX = parsePercent(object?.zoom?.x);
  const desiredY = parsePercent(object?.zoom?.y);

  if (!object || !metrics || scale <= 1) {
    return {
      scale,
      x: formatPercent(desiredX),
      y: formatPercent(desiredY),
    };
  }

  const originX = (object.position.left / 100) * metrics.frameWidth;
  const originY = (object.position.top / 100) * metrics.frameHeight;
  const desiredXInPixels = desiredX * metrics.frameWidth;
  const desiredYInPixels = desiredY * metrics.frameHeight;
  const scaleDelta = scale - 1;

  const minX =
    metrics.viewportWidth -
    metrics.frameLeft -
    metrics.frameWidth -
    scaleDelta * (metrics.frameWidth - originX);
  const maxX = -metrics.frameLeft + scaleDelta * originX;
  const minY =
    metrics.viewportHeight -
    metrics.frameTop -
    metrics.frameHeight -
    scaleDelta * (metrics.frameHeight - originY);
  const maxY = -metrics.frameTop + scaleDelta * originY;

  return {
    scale,
    x: formatPercent(clampValue(desiredXInPixels, minX, maxX) / metrics.frameWidth),
    y: formatPercent(clampValue(desiredYInPixels, minY, maxY) / metrics.frameHeight),
  };
}

const roomObjectByScene = new Map<PanelScene, RoomObjectConfig>();
const roomObjectById = new Map<string, RoomObjectConfig>();

for (const object of roomObjects) {
  roomObjectById.set(object.id, object);

  if (object.targetScene) {
    roomObjectByScene.set(object.targetScene, object);
  }
}

function InteractiveRoom({
  scene,
  focusedObjectId,
  isMusicOn,
  onObjectSelect
}: InteractiveRoomProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const frameRef = useRef<HTMLDivElement | null>(null);
  const [roomMetrics, setRoomMetrics] = useState<RoomMetrics | null>(null);

  useLayoutEffect(() => {
    const sectionElement = sectionRef.current;
    const frameElement = frameRef.current;

    if (!sectionElement || !frameElement) {
      return;
    }

    let animationFrameId: number | null = null;

    const readMetrics = () => {
      if (animationFrameId !== null) {
        window.cancelAnimationFrame(animationFrameId);
      }

      animationFrameId = window.requestAnimationFrame(() => {
        const nextMetrics: RoomMetrics = {
          viewportWidth: sectionElement.clientWidth,
          viewportHeight: sectionElement.clientHeight,
          frameWidth: frameElement.offsetWidth,
          frameHeight: frameElement.offsetHeight,
          frameLeft: frameElement.offsetLeft,
          frameTop: frameElement.offsetTop,
        };

        setRoomMetrics((currentMetrics) =>
          areRoomMetricsEqual(currentMetrics, nextMetrics)
            ? currentMetrics
            : nextMetrics
        );
      });
    };

    readMetrics();

    const resizeObserver =
      typeof ResizeObserver === "undefined"
        ? null
        : new ResizeObserver(readMetrics);

    resizeObserver?.observe(sectionElement);
    resizeObserver?.observe(frameElement);
    window.addEventListener("resize", readMetrics);

    return () => {
      if (animationFrameId !== null) {
        window.cancelAnimationFrame(animationFrameId);
      }

      resizeObserver?.disconnect();
      window.removeEventListener("resize", readMetrics);
    };
  }, []);

  const focusedObject = useMemo(
    () =>
      (focusedObjectId ? roomObjectById.get(focusedObjectId) : undefined) ??
      (scene === "room" ? undefined : roomObjectByScene.get(scene)),
    [focusedObjectId, scene]
  );
  const focusedTransform = useMemo(
    () => getConstrainedRoomTransform(focusedObject, roomMetrics),
    [focusedObject, roomMetrics]
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

  const isObjectFocused = Boolean(focusedObjectId);
  const showHighlights = scene === "room" && !isObjectFocused;
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
          showHighlight={showHighlights}
          controlState={getControlState(object)}
        />
      )),
    [focusedRenderId, getControlState, showHighlights]
  );

  const roomObjectNodes = useMemo(
    () =>
      roomObjects.map((object) => (
        <RoomObject
          key={object.id}
          object={object}
          isFocused={focusedRenderId === object.id}
          showHighlight={showHighlights}
          controlState={getControlState(object)}
          onSelect={onObjectSelect}
        />
      )),
    [focusedRenderId, getControlState, onObjectSelect, showHighlights]
  );

  return (
    <section
      ref={sectionRef}
      className="interactive-room relative flex flex-col items-center justify-center overflow-hidden bg-[#0b080d] px-0 py-0"
    >
      <div aria-hidden="true" className="room-ambient-backdrop">
        <Image
          src={roomBackgroundImage}
          alt=""
          fill
          quality={65}
          sizes="100vw"
          className="room-ambient-image select-none object-cover"
        />
      </div>

      <motion.div
        ref={frameRef}
        className="studio-frame relative shrink-0 overflow-visible"
        variants={roomVariants}
        initial={false}
        animate={scene === "room" && !isObjectFocused ? "room" : "focus"}
        custom={focusedTransform}
        style={roomStyle}
      >
        <Image
          src={roomBackgroundImage}
          alt="Pixel-art retro technology studio room"
          fill
          priority
          quality={90}
          sizes="100vw"
          className="pixel-art absolute inset-0 select-none object-contain"
        />

        {decorativeObjectNodes}

        {roomObjectNodes}
      </motion.div>

      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[2] bg-[#050304]"
        initial={false}
        animate={{ opacity: scene === "room" && !isObjectFocused ? 0 : 0.24 }}
        transition={{ duration: 0.24, ease: "easeOut" }}
      />

      <ShortcutNavbar
        scene={scene}
        isMusicOn={isMusicOn}
        onObjectSelect={onObjectSelect}
      />
    </section>
  );
}

export default memo(InteractiveRoom);
