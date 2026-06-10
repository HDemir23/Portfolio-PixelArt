"use client";

import { motion, type Variants } from "framer-motion";
import { roomBackgroundImage } from "@/data/portfolio";

type WelcomeScreenProps = {
  onEnter: () => void;
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

export default function WelcomeScreen({ onEnter }: WelcomeScreenProps) {
  return (
    <motion.section
      variants={welcomeVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6"
    >
      <img
        src={roomBackgroundImage}
        alt=""
        draggable={false}
        className="pixel-art absolute inset-0 h-full w-full select-none object-cover opacity-45"
      />
      <div className="absolute inset-0 bg-[#120d0b]/58" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/70 to-transparent" />

      <motion.div
        initial={{ y: 18, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.55, ease: "easeOut" }}
        className="relative mx-auto max-w-4xl text-center"
      >
        <p className="mb-5 font-mono text-sm uppercase tracking-[0.28em] text-ember/85">
          Interactive studio
        </p>
        <h1 className="text-balance text-5xl font-black leading-tight text-stone-50 sm:text-7xl">
          A.Hakan Demir
        </h1>
        <h2 className="mt-5 font-mono text-xl font-semibold text-terminal sm:text-2xl">
          Full-Stack Web & Mobile Developer
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-8 text-stone-200 sm:text-lg">
          I build modern websites, web applications and mobile apps for
          businesses.
        </p>
        <motion.button
          type="button"
          onClick={onEnter}
          whileHover={{ scale: 1.04, y: -2 }}
          whileTap={{ scale: 0.97 }}
          className="mt-10 border-2 border-ember bg-ember px-7 py-4 font-mono text-sm font-black uppercase tracking-[0.18em] text-ink shadow-[0_0_0_4px_rgba(32,22,18,0.8),0_18px_40px_rgba(0,0,0,0.35)] transition-colors hover:bg-[#ffd18a] focus:outline-none focus:ring-4 focus:ring-ember/45"
        >
          Enter Studio
        </motion.button>
      </motion.div>
    </motion.section>
  );
}
