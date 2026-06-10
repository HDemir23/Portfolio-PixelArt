"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import InteractiveRoom from "@/components/InteractiveRoom";
import PortfolioOverlay from "@/components/PortfolioOverlay";
import WelcomeScreen from "@/components/WelcomeScreen";
import { roomObjects, type RoomObjectConfig, type Scene } from "@/data/portfolio";
import { useBackgroundMusic } from "@/components/useBackgroundMusic";

export default function Home() {
  const [hasEntered, setHasEntered] = useState(false);
  const [scene, setScene] = useState<Scene>("room");
  const [focusedObjectId, setFocusedObjectId] = useState<string | null>(null);
  const { isMusicOn, startMusic, toggleMusic } = useBackgroundMusic();

  const handleObjectSelect = (object: RoomObjectConfig) => {
    if (object.action === "home") {
      handleBack();
      return;
    }

    if (object.action === "music") {
      toggleMusic();
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
  };

  const handleBack = () => {
    setFocusedObjectId(null);
    setScene("room");
  };

  const handleSceneNavigate = (nextScene: Exclude<Scene, "room">) => {
    const nextObject = roomObjects.find((object) => object.targetScene === nextScene);
    setFocusedObjectId(nextObject?.id ?? null);
    setScene(nextScene);
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#120d0b] text-stone-100">
      <AnimatePresence mode="wait">
        {!hasEntered ? (
          <WelcomeScreen
            key="welcome"
            onEnter={() => {
              setHasEntered(true);
              void startMusic();
            }}
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
          </motion.section>
        )}
      </AnimatePresence>
    </main>
  );
}
