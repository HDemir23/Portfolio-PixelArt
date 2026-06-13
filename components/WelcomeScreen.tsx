"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import { profile } from "@/data/portfolio/profile";
import { roomBackgroundImage } from "@/data/portfolio/room-background";

type WelcomeScreenProps = {
  onEnter: () => void;
  onPreload: () => void;
  isEntering: boolean;
};

const welcomeVariants: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" }
  },
  exit: {
    opacity: 0,
    scale: 0.98,
    transition: { duration: 0.45, ease: "easeInOut" }
  }
};

export default function WelcomeScreen({
  onEnter,
  onPreload,
  isEntering
}: WelcomeScreenProps) {
  return (
    <motion.section
      variants={welcomeVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="relative flex h-full min-h-full items-center justify-center overflow-hidden px-6"
    >
      <Image
        src={roomBackgroundImage}
        alt=""
        fill
        priority
        quality={88}
        sizes="100vw"
        className="pixel-art absolute inset-0 select-none object-cover opacity-45"
      />
      <div className="absolute inset-0 bg-[#120d0b]/58" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/70 to-transparent" />

      <motion.div
        initial={{ y: 18, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.55, ease: "easeOut" }}
        className="relative mx-auto max-w-4xl text-center"
      >
        <p className="mb-5 font-mono text-sm font-black uppercase tracking-[0.22em] text-ember/85">
          Interactive studio
        </p>
        <h1 className="text-balance font-display text-4xl font-black leading-tight text-stone-50 sm:text-7xl">
          {profile.shortName}
        </h1>
        <h2 className="mt-5 font-mono text-xl font-black text-terminal sm:text-2xl">
          {profile.title}
        </h2>
        <p className="retro-copy mx-auto mt-6 max-w-2xl text-pretty text-base leading-8 text-stone-200 sm:text-lg">
          I build web apps, mobile products, blockchain systems and AI-assisted
          developer workflows.
        </p>
        <motion.button
          type="button"
          onClick={onEnter}
          onFocus={onPreload}
          onPointerEnter={onPreload}
          disabled={isEntering}
          aria-busy={isEntering}
          whileHover={{ scale: 1.04, y: -2 }}
          whileTap={{ scale: 0.97 }}
          className="retro-action mt-10 border-2 border-ember bg-ember px-7 py-4 font-mono text-sm font-black uppercase text-ink shadow-[0_0_0_4px_rgba(32,22,18,0.8),0_18px_40px_rgba(0,0,0,0.35)] transition-colors hover:bg-[#ffd18a] focus:outline-none focus:ring-4 focus:ring-ember/45 disabled:cursor-wait disabled:opacity-80"
        >
          {isEntering ? "Loading Studio" : "Enter Studio"}
        </motion.button>
      </motion.div>
    </motion.section>
  );
}
