"use client";

import { AnimatePresence, motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useState } from "react";
import WelcomeScreen from "@/components/WelcomeScreen";
import { roomObjects } from "@/data/portfolio/room-objects";
import type { RoomObjectConfig, Scene } from "@/data/portfolio/types";
import { useBackgroundMusic } from "@/components/useBackgroundMusic";

const InteractiveRoom = dynamic(() => import("@/components/InteractiveRoom"), {
  ssr: false,
  loading: StudioModuleFallback,
});

const ObjectDetailOverlay = dynamic(() => import("@/components/ObjectDetailOverlay"), {
  ssr: false,
  loading: StudioModuleFallback,
});

const PortfolioOverlay = dynamic(() => import("@/components/PortfolioOverlay"), {
  ssr: false,
  loading: StudioModuleFallback,
});

const roomObjectById = new Map(roomObjects.map((object) => [object.id, object]));
const roomObjectByScene = new Map(
  roomObjects
    .filter((object) => object.targetScene)
    .map((object) => [object.targetScene, object])
);

let studioPreloadPromise: Promise<unknown> | null = null;
type IdleWindow = Window &
  typeof globalThis & {
    requestIdleCallback?: (callback: IdleRequestCallback) => number;
    cancelIdleCallback?: (handle: number) => void;
  };

function preloadStudioModules() {
  studioPreloadPromise ??= Promise.all([
    import("@/components/InteractiveRoom"),
    import("@/components/ObjectDetailOverlay"),
    import("@/components/PortfolioOverlay"),
  ]);

  return studioPreloadPromise;
}

function StudioModuleFallback() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-4 z-40 mx-auto w-fit border border-ember/35 bg-black/60 px-4 py-3 font-mono text-[0.72rem] font-black uppercase tracking-[0.12em] text-ember shadow-[0_12px_32px_rgba(0,0,0,0.32)] backdrop-blur-sm"
    >
      Loading Studio
    </div>
  );
}

export default function Home() {
  const [hasEntered, setHasEntered] = useState(false);
  const [isEntering, setIsEntering] = useState(false);
  const [scene, setScene] = useState<Scene>("room");
  const [focusedObjectId, setFocusedObjectId] = useState<string | null>(null);
  const [selectedObjectId, setSelectedObjectId] = useState<string | null>(null);
  const { isMusicOn, startMusic, toggleMusic } = useBackgroundMusic();

  const selectedObject = useMemo(
    () =>
      selectedObjectId
        ? roomObjectById.get(selectedObjectId) ?? null
        : null,
    [selectedObjectId]
  );

  useEffect(() => {
    if (hasEntered) {
      return;
    }

    const idleWindow = window as IdleWindow;

    if (typeof idleWindow.requestIdleCallback === "function") {
      const idleId = idleWindow.requestIdleCallback(() => {
        void preloadStudioModules();
      });

      return () => idleWindow.cancelIdleCallback?.(idleId);
    }

    const timeoutId = globalThis.setTimeout(() => {
      void preloadStudioModules();
    }, 700);

    return () => globalThis.clearTimeout(timeoutId);
  }, [hasEntered]);

  const handlePreloadStudio = useCallback(() => {
    void preloadStudioModules();
  }, []);

  const handleEnter = useCallback(() => {
    if (isEntering) {
      return;
    }

    void startMusic();
    setIsEntering(true);

    void preloadStudioModules()
      .catch(() => undefined)
      .finally(() => {
        setHasEntered(true);
        setIsEntering(false);
      });
  }, [isEntering, startMusic]);

  const handleBack = useCallback(() => {
    setSelectedObjectId(null);
    setFocusedObjectId(null);
    setScene("room");
  }, []);

  const handleObjectDetailClose = useCallback(() => {
    setSelectedObjectId(null);
    setFocusedObjectId(null);
  }, []);

  const handleObjectSelect = useCallback((object: RoomObjectConfig) => {
    if (object.action === "home") {
      handleBack();
      return;
    }

    if (object.action === "music") {
      toggleMusic();
      return;
    }

    if (object.modal) {
      setSelectedObjectId(object.id);
      setFocusedObjectId(object.id);
      setScene("room");
      return;
    }

    if (object.externalUrl) {
      const openedWindow = window.open(object.externalUrl, "_blank", "noopener,noreferrer");
      if (openedWindow) {
        openedWindow.opener = null;
      }
      return;
    }

    if (object.targetScene) {
      setFocusedObjectId(object.id);
      setScene(object.targetScene);
    }
  }, [handleBack, toggleMusic]);

  const handleSceneNavigate = useCallback((nextScene: Exclude<Scene, "room">) => {
    setSelectedObjectId(null);
    const nextObject = roomObjectByScene.get(nextScene);
    setFocusedObjectId(nextObject?.id ?? null);
    setScene(nextScene);
  }, []);

  return (
    <main className="min-h-screen overflow-hidden bg-[#120d0b] text-stone-100">
      <AnimatePresence mode="wait">
        {!hasEntered ? (
          <WelcomeScreen
            key="welcome"
            onEnter={handleEnter}
            onPreload={handlePreloadStudio}
            isEntering={isEntering}
          />
        ) : (
          <motion.section
            key="studio"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="relative min-h-screen overflow-hidden"
          >
            <InteractiveRoom
              scene={scene}
              focusedObjectId={focusedObjectId}
              isMusicOn={isMusicOn}
              onObjectSelect={handleObjectSelect}
            />
            <PortfolioOverlay
              scene={scene}
              onBack={handleBack}
              onNavigate={handleSceneNavigate}
            />
            <ObjectDetailOverlay
              object={selectedObject}
              onClose={handleObjectDetailClose}
              onNavigate={handleSceneNavigate}
            />
          </motion.section>
        )}
      </AnimatePresence>
    </main>
  );
}
