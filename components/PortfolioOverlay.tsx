"use client";

import { AnimatePresence, motion, type Variants } from "framer-motion";
import {
  experience,
  projects,
  services,
  skills,
  type Scene
} from "@/data/portfolio";

type PortfolioOverlayProps = {
  scene: Scene;
  onBack: () => void;
};

const overlayVariants: Variants = {
  initial: { opacity: 0, scale: 0.94, y: 28 },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { delay: 0.26, duration: 0.32, ease: [0.22, 1, 0.36, 1] }
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    y: 18,
    transition: { duration: 0.2, ease: "easeIn" }
  }
};

const panelTitles: Record<Exclude<Scene, "room">, string> = {
  projects: "Projects",
  skills: "Skills",
  experience: "Experience",
  services: "Services",
  contact: "Contact",
  about: "About"
};

export default function PortfolioOverlay({
  scene,
  onBack
}: PortfolioOverlayProps) {
  const activeScene = scene === "room" ? null : scene;

  return (
    <AnimatePresence>
      {activeScene ? (
        <motion.div
          key={activeScene}
          className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={overlayVariants}
        >
          <div className="absolute inset-0 bg-black/42 backdrop-blur-[2px]" onClick={onBack} />

          <section className="relative max-h-[88vh] w-full max-w-3xl overflow-y-auto border-2 border-[#5a3324] bg-panel/95 p-5 text-stone-100 shadow-pixel sm:p-7">
            <div className="mb-6 flex items-start justify-between gap-4 border-b border-ember/25 pb-4">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.24em] text-terminal">
                  Studio file
                </p>
                <h2 className="mt-2 text-3xl font-black text-stone-50 sm:text-4xl">
                  {panelTitles[activeScene]}
                </h2>
              </div>
              <button
                type="button"
                onClick={onBack}
                className="shrink-0 border border-ember/60 bg-black/30 px-4 py-2 font-mono text-xs font-black uppercase tracking-[0.14em] text-ember transition hover:bg-ember hover:text-ink focus:outline-none focus:ring-4 focus:ring-ember/35"
              >
                Back
              </button>
            </div>

            {renderPanel(activeScene)}
          </section>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function renderPanel(scene: Exclude<Scene, "room">) {
  if (scene === "projects") {
    return (
      <div className="grid gap-4 sm:grid-cols-3">
        {projects.map((project) => (
          <article
            key={project.title}
            className="border border-ember/25 bg-black/24 p-4"
          >
            <h3 className="font-mono text-base font-black text-ember">
              {project.title}
            </h3>
            <p className="mt-3 text-sm leading-6 text-stone-300">
              {project.description}
            </p>
          </article>
        ))}
      </div>
    );
  }

  if (scene === "skills") {
    return (
      <div className="flex flex-wrap gap-3">
        {skills.map((skill) => (
          <span
            key={skill}
            className="border border-terminal/35 bg-terminal/10 px-4 py-2 font-mono text-sm font-bold text-stone-100"
          >
            {skill}
          </span>
        ))}
      </div>
    );
  }

  if (scene === "experience") {
    return <BulletList items={experience} />;
  }

  if (scene === "services") {
    return (
      <div className="grid gap-3 sm:grid-cols-2">
        {services.map((service) => (
          <div
            key={service}
            className="border border-ember/25 bg-black/20 px-4 py-3 font-mono text-sm font-bold text-stone-100"
          >
            {service}
          </div>
        ))}
      </div>
    );
  }

  if (scene === "contact") {
    return (
      <div className="space-y-5">
        <p className="max-w-2xl leading-7 text-stone-300">
          Ready to plan a website, application or mobile product? Use one of the
          quick actions below to start the conversation.
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          <ContactButton href="mailto:hello@example.com">Email</ContactButton>
          <ContactButton href="#">WhatsApp placeholder</ContactButton>
          <ContactButton href="#">LinkedIn placeholder</ContactButton>
          <ContactButton href="mailto:hello@example.com?subject=New%20project%20inquiry">
            Start a project
          </ContactButton>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 leading-7 text-stone-300">
      <p>
        I am A.Hakan Demir, a full-stack web and mobile developer focused on
        practical, polished digital products for businesses.
      </p>
      <p>
        My work covers modern websites, web applications, mobile apps, API
        integrations and admin dashboards with a strong frontend product focus.
      </p>
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li
          key={item}
          className="border-l-2 border-terminal/70 bg-black/18 px-4 py-3 text-sm leading-6 text-stone-200"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

function ContactButton({
  href,
  children
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className="border border-ember/45 bg-ember/12 px-4 py-3 text-center font-mono text-sm font-black uppercase tracking-[0.12em] text-ember transition hover:bg-ember hover:text-ink focus:outline-none focus:ring-4 focus:ring-ember/35"
    >
      {children}
    </a>
  );
}
