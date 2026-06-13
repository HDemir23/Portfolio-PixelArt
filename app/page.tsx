"use client";

import { AnimatePresence, motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
type StudioHistoryState = {
  studioModalId?: string;
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
  const selectedObjectIdRef = useRef<string | null>(null);
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

  useEffect(() => {
    selectedObjectIdRef.current = selectedObjectId;
  }, [selectedObjectId]);

  const closeObjectDetail = useCallback(() => {
    selectedObjectIdRef.current = null;
    setSelectedObjectId(null);
    setFocusedObjectId(null);
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      if (!selectedObjectIdRef.current) {
        return;
      }

      closeObjectDetail();
      setScene("room");
    };

    window.addEventListener("popstate", handlePopState);

    return () => window.removeEventListener("popstate", handlePopState);
  }, [closeObjectDetail]);

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
    closeObjectDetail();
    setFocusedObjectId(null);
    setScene("room");
  }, [closeObjectDetail]);

  const handleObjectDetailClose = useCallback(() => {
    const historyState = window.history.state as StudioHistoryState | null;

    if (
      selectedObjectIdRef.current &&
      historyState?.studioModalId === selectedObjectIdRef.current
    ) {
      window.history.back();
      return;
    }

    closeObjectDetail();
  }, [closeObjectDetail]);

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
      const historyState = (window.history.state ?? {}) as StudioHistoryState;

      window.history.pushState(
        {
          ...historyState,
          studioModalId: object.id,
        },
        "",
        window.location.href
      );

      selectedObjectIdRef.current = object.id;
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
    const historyState = window.history.state as StudioHistoryState | null;

    if (selectedObjectIdRef.current && historyState?.studioModalId) {
      window.history.replaceState(
        {
          ...historyState,
          studioModalId: undefined,
        },
        "",
        window.location.href
      );
    }

    closeObjectDetail();
    const nextObject = roomObjectByScene.get(nextScene);
    setFocusedObjectId(nextObject?.id ?? null);
    setScene(nextScene);
  }, [closeObjectDetail]);

  return (
    <main className="app-shell bg-[#120d0b] text-stone-100">
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
            className="studio-shell relative overflow-hidden"
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
