"use client";

import { AnimatePresence, motion, type Variants } from "framer-motion";
import { memo, useMemo, type ReactNode } from "react";
import { contactLinks } from "@/data/portfolio/contact-links";
import { experience } from "@/data/portfolio/experience";
import { profile } from "@/data/portfolio/profile";
import { projects } from "@/data/portfolio/projects";
import { serviceDetails } from "@/data/portfolio/service-details";
import { services } from "@/data/portfolio/services";
import { skills } from "@/data/portfolio/skills";
import type { Scene } from "@/data/portfolio/types";

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
  projects: "Selected Work",
  skills: "Skills",
  experience: "Experience",
  services: "Services",
  contact: "Contact",
  about: "About",
  menu: "Menu",
  comingSoon: "Reserved"
};

const panelEyebrows: Record<PanelScene, string> = {
  projects: "Project archive",
  skills: "Toolbox",
  experience: "Timeline",
  services: "Build menu",
  contact: "Signal room",
  about: "Profile file",
  menu: "Quick switch",
  comingSoon: "Reserved slot"
};

const panelBaseShellClass =
  "glass-modal-shell relative max-h-[92vh] w-full overflow-y-auto border-2 p-4 text-stone-100 shadow-pixel sm:max-h-[88vh] sm:p-7";

const panelShellClasses: Record<PanelScene, string> = {
  projects: "max-w-6xl border-terminal/55 bg-[#07110e]/88",
  skills: "max-w-5xl border-terminal/50 bg-[#08130f]/88",
  experience: "max-w-5xl border-[#ff6b5f]/55 bg-[#160b0a]/88",
  services: "max-w-5xl border-[#f4b158]/60 bg-[#17120b]/88",
  contact: "max-w-4xl border-[#84c5ff]/60 bg-[#08101a]/88",
  about: "max-w-5xl border-ember/55 bg-panel/88",
  menu: "max-w-4xl border-stone-400/45 bg-[#111010]/88",
  comingSoon: "max-w-3xl border-stone-500/55 bg-[#111010]/88"
};

function PortfolioOverlay({
  scene,
  onBack,
  onNavigate
}: PortfolioOverlayProps) {
  const activeScene: PanelScene | null = scene === "room" ? null : scene;
  const panelContent = useMemo(
    () => (activeScene ? renderPanel(activeScene, onNavigate) : null),
    [activeScene, onNavigate]
  );

  return (
    <AnimatePresence>
      {activeScene ? (
        <motion.div
          key={activeScene}
          className="fixed inset-0 z-50 flex items-end justify-center px-3 py-3 sm:items-center sm:px-4 sm:py-6"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={overlayVariants}
        >
          <div
            className="glass-modal-backdrop absolute inset-0 bg-[#050304]/50"
            onClick={onBack}
          />

          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby={`portfolio-panel-${activeScene}`}
            className={[panelBaseShellClass, panelShellClasses[activeScene]].join(" ")}
          >
            <div className="mb-5 flex items-start justify-between gap-3 border-b border-white/10 pb-4 sm:mb-6">
              <div className="min-w-0">
                <p className="font-mono text-[0.68rem] font-black uppercase tracking-[0.2em] text-stone-400 sm:text-xs">
                  {panelEyebrows[activeScene]}
                </p>
                <h2
                  id={`portfolio-panel-${activeScene}`}
                  className="mt-2 text-2xl font-black text-stone-50 sm:text-4xl"
                >
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

            {panelContent}
          </section>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export default memo(PortfolioOverlay);

function renderPanel(scene: PanelScene, onNavigate: (scene: PanelScene) => void) {
  if (scene === "menu") {
    return <MenuPanel onNavigate={onNavigate} />;
  }

  if (scene === "projects") {
    return <ProjectsPanel />;
  }

  if (scene === "skills") {
    return <SkillsPanel />;
  }

  if (scene === "experience") {
    return <ExperiencePanel />;
  }

  if (scene === "services") {
    return <ServicesPanel />;
  }

  if (scene === "contact") {
    return <ContactPanel />;
  }

  if (scene === "comingSoon") {
    return (
      <div className="space-y-4 leading-7 text-stone-300">
        <p>
          This section is reserved for a later update.
        </p>
      </div>
    );
  }

  return <AboutPanel />;
}

function MenuPanel({ onNavigate }: { onNavigate: (scene: PanelScene) => void }) {
  return (
    <div className="space-y-5">
      <p className="max-w-2xl text-sm leading-6 text-stone-300 sm:text-base sm:leading-7">
        {profile.shortName} studio index for work, skills, services and contact links.
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        <MenuButton onClick={() => onNavigate("projects")}>Selected Work</MenuButton>
        <MenuButton onClick={() => onNavigate("skills")}>Skills</MenuButton>
        <MenuButton onClick={() => onNavigate("experience")}>Experience</MenuButton>
        <MenuButton onClick={() => onNavigate("about")}>About</MenuButton>
        <MenuButton onClick={() => onNavigate("contact")}>Contact</MenuButton>
        <MenuButton onClick={() => onNavigate("services")}>Services</MenuButton>
        <MenuLink href="https://evankara.org">Ev Ankara</MenuLink>
        <MenuLink href={profile.portfolio}>Portfolio</MenuLink>
        <MenuLink href={profile.github}>GitHub</MenuLink>
        <MenuLink href={profile.linkedin}>LinkedIn</MenuLink>
        <MenuLink href="https://www.youtube.com/watch?v=X4VbdwhkE10">
          YouTube
        </MenuLink>
      </div>
    </div>
  );
}

function ProjectsPanel() {
  const featuredProject = projects[0];
  const secondaryProjects = projects.slice(1);

  return (
    <div className="space-y-5">
      <div className="grid gap-4 lg:grid-cols-[0.92fr_1.08fr]">
        <article className="border border-terminal/30 bg-black/28 p-4 sm:p-5">
          <p className="font-mono text-[0.66rem] font-black uppercase tracking-[0.16em] text-terminal">
            Featured build
          </p>
          <h3 className="mt-3 font-mono text-xl font-black text-stone-50">
            {featuredProject.title}
          </h3>
          <p className="mt-3 text-sm leading-6 text-stone-300">
            {featuredProject.description}
          </p>
          <ProjectLinks project={featuredProject} />
        </article>

        <div className="grid gap-3 sm:grid-cols-2">
          {secondaryProjects.slice(0, 4).map((project) => (
            <ProjectTile key={project.title} project={project} compact />
          ))}
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {secondaryProjects.slice(4).map((project) => (
          <ProjectTile key={project.title} project={project} />
        ))}
      </div>
    </div>
  );
}

function ProjectTile({
  project,
  compact = false
}: {
  project: (typeof projects)[number];
  compact?: boolean;
}) {
  return (
    <article
      className={[
        "flex flex-col border border-terminal/18 bg-black/22 p-4",
        compact ? "min-h-44" : "min-h-52",
      ].join(" ")}
    >
      <p className="font-mono text-[0.62rem] font-bold uppercase tracking-[0.14em] text-terminal/90">
        {project.meta}
      </p>
      <h4 className="mt-3 font-mono text-base font-black text-stone-50">
        {project.title}
      </h4>
      <p className="mt-3 flex-1 text-sm leading-6 text-stone-300">
        {project.description}
      </p>
      <ProjectLinks project={project} />
    </article>
  );
}

function ProjectLinks({ project }: { project: (typeof projects)[number] }) {
  if (!("links" in project) || !project.links?.length) {
    return null;
  }

  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {project.links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          target="_blank"
          rel="noreferrer"
          className="inline-flex min-h-10 items-center border border-terminal/35 bg-terminal/10 px-3 py-2 font-mono text-[0.68rem] font-black uppercase tracking-[0.12em] text-terminal transition hover:bg-terminal hover:text-ink focus:outline-none focus:ring-4 focus:ring-terminal/25"
        >
          {link.label}
        </a>
      ))}
    </div>
  );
}

function SkillsPanel() {
  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((skill) => (
          <span
            key={skill}
            className="border border-terminal/30 bg-terminal/10 px-4 py-3 font-mono text-sm font-bold text-stone-100"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

function ExperiencePanel() {
  return <BulletList items={experience} tone="red" />;
}

function ServicesPanel() {
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2">
        {services.map((service) => (
          <span
            key={service}
            className="border border-[#f4b158]/32 bg-[#f4b158]/10 px-3 py-2 font-mono text-xs font-bold uppercase tracking-[0.12em] text-stone-100"
          >
            {service}
          </span>
        ))}
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {serviceDetails.map((service) => (
          <article
            key={service.title}
            className="border border-[#f4b158]/24 bg-black/22 px-4 py-3"
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
    </div>
  );
}

function ContactPanel() {
  return (
    <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
      <div className="space-y-3">
        <ContactInfo label="Email">{profile.email}</ContactInfo>
        <ContactInfo label="Phone">{profile.phone}</ContactInfo>
        <ContactInfo label="Location">{profile.location}</ContactInfo>
      </div>

      <div className="space-y-4">
        <p className="border border-[#84c5ff]/24 bg-[#84c5ff]/10 p-4 text-sm leading-6 text-stone-300 sm:text-base sm:leading-7">
          Based in {profile.location}. I build web apps, mobile products,
          blockchain systems and AI-integrated workflows for remote and async
          teams.
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          {contactLinks.map((link) => (
            <ContactButton key={link.label} href={link.href}>
              {link.label}
            </ContactButton>
          ))}
        </div>
      </div>
    </div>
  );
}

function ContactInfo({
  label,
  children
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="border border-[#84c5ff]/22 bg-black/24 px-4 py-3 text-sm text-stone-300">
      <span className="font-mono text-xs uppercase tracking-[0.12em] text-[#84c5ff]">
        {label}
      </span>
      <p className="mt-1 break-words">{children}</p>
    </div>
  );
}

function AboutPanel() {
  return (
    <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
      <div className="space-y-4 border border-ember/22 bg-black/22 p-4 leading-7 text-stone-300">
        {profile.summary.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      <BulletList items={profile.highlights} tone="terminal" />
    </div>
  );
}

function BulletList({
  items,
  tone = "terminal"
}: {
  items: string[];
  tone?: "terminal" | "red";
}) {
  const borderClassName =
    tone === "red" ? "border-[#ff6b5f]/75" : "border-terminal/70";

  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li
          key={item}
          className={[
            "border-l-2 bg-black/22 px-4 py-3 text-sm leading-6 text-stone-200",
            borderClassName,
          ].join(" ")}
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
  const opensNewTab = href.startsWith("http");

  return (
    <a
      href={href}
      target={opensNewTab ? "_blank" : undefined}
      rel={opensNewTab ? "noreferrer" : undefined}
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
