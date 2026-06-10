"use client";

import { AnimatePresence, motion, type Variants } from "framer-motion";
import {
  experience,
  projects,
  serviceDetails,
  services,
  skills,
  type Scene
} from "@/data/portfolio";

type PanelScene = Exclude<Scene, "room">;

type PortfolioOverlayProps = {
  scene: Scene;
  onBack: () => void;
  onNavigate: (scene: PanelScene) => void;
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

const panelTitles: Record<PanelScene, string> = {
  projects: "Projects",
  skills: "Skills",
  experience: "Experience",
  services: "Services",
  contact: "Contact",
  about: "About",
  menu: "Menu",
  comingSoon: "Coming Soon"
};

export default function PortfolioOverlay({
  scene,
  onBack,
  onNavigate
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

            {renderPanel(activeScene, onNavigate)}
          </section>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function renderPanel(scene: PanelScene, onNavigate: (scene: PanelScene) => void) {
  if (scene === "menu") {
    return (
      <div className="space-y-6">
        <p className="max-w-2xl leading-7 text-stone-300">
          Quick access to the main detailed views and external profiles.
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          <MenuButton onClick={() => onNavigate("projects")}>
            Portfolio & Services
          </MenuButton>
          <MenuButton onClick={() => onNavigate("skills")}>Skills</MenuButton>
          <MenuButton onClick={() => onNavigate("about")}>About</MenuButton>
          <MenuButton onClick={() => onNavigate("contact")}>Contact</MenuButton>
          <MenuLink href="https://evankara.org">Ev Ankara</MenuLink>
          <MenuLink href="https://github.com/HDemir23">GitHub</MenuLink>
          <MenuLink href="https://www.youtube.com/watch?v=X4VbdwhkE10">
            YouTube
          </MenuLink>
        </div>
      </div>
    );
  }

  if (scene === "projects") {
    return (
      <div className="space-y-7">
        <section>
          <h3 className="font-mono text-lg font-black uppercase tracking-[0.12em] text-ember">
            Portfolio
          </h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {projects.map((project) => (
              <article
                key={project.title}
                className="flex min-h-56 flex-col border border-ember/25 bg-black/24 p-4"
              >
                <p className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.16em] text-terminal">
                  {project.meta}
                </p>
                <h4 className="mt-3 font-mono text-base font-black text-ember">
                  {project.title}
                </h4>
                <p className="mt-3 flex-1 text-sm leading-6 text-stone-300">
                  {project.description}
                </p>
                {"href" in project && project.href ? (
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex w-fit border border-terminal/35 bg-terminal/10 px-3 py-2 font-mono text-[0.68rem] font-black uppercase tracking-[0.12em] text-terminal transition hover:bg-terminal hover:text-ink focus:outline-none focus:ring-4 focus:ring-terminal/25"
                  >
                    Open live
                  </a>
                ) : null}
              </article>
            ))}
          </div>
        </section>

        <section>
          <h3 className="font-mono text-lg font-black uppercase tracking-[0.12em] text-ember">
            Services
          </h3>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {serviceDetails.map((service) => (
              <article
                key={service.title}
                className="border border-ember/25 bg-black/20 px-4 py-3"
              >
                <h4 className="font-mono text-sm font-black text-stone-100">
                  {service.title}
                </h4>
                <p className="mt-2 text-sm leading-6 text-stone-300">
                  {service.description}
                </p>
              </article>
            ))}
          </div>
        </section>
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

  if (scene === "comingSoon") {
    return (
      <div className="space-y-4 leading-7 text-stone-300">
        <p>
          This object is reserved for a future section. The interaction is wired
          and ready, but the content will be added later.
        </p>
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

function MenuButton({
  onClick,
  children
}: {
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="border border-ember/45 bg-black/20 px-4 py-3 text-left font-mono text-sm font-black uppercase tracking-[0.12em] text-ember transition hover:bg-ember hover:text-ink focus:outline-none focus:ring-4 focus:ring-ember/35"
    >
      {children}
    </button>
  );
}

function MenuLink({
  href,
  children
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="border border-terminal/35 bg-terminal/10 px-4 py-3 font-mono text-sm font-black uppercase tracking-[0.12em] text-terminal transition hover:bg-terminal hover:text-ink focus:outline-none focus:ring-4 focus:ring-terminal/25"
    >
      {children}
    </a>
  );
}
