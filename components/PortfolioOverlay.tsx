"use client";

import { AnimatePresence, motion, type Variants } from "framer-motion";
import { memo, useMemo, type ReactNode } from "react";
import { contactLinks } from "@/data/portfolio/contact-links";
import { experience } from "@/data/portfolio/experience";
import { profile } from "@/data/portfolio/profile";
import { projects } from "@/data/portfolio/projects";
import { serviceDetails } from "@/data/portfolio/service-details";
import { services } from "@/data/portfolio/services";
import {
  skillGroups,
  skillProfile,
  type SkillAccent,
  type SkillGroup,
} from "@/data/portfolio/skills";
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
  "glass-modal-shell retro-modal-shell relative max-h-[92vh] w-full overflow-y-auto border-2 p-4 text-stone-100 sm:max-h-[88vh] sm:p-7";

const panelShellClasses: Record<PanelScene, string> = {
  projects: "max-w-6xl border-terminal/70",
  skills: "max-w-6xl border-terminal/75",
  experience: "max-w-5xl border-[#ff6b5f]/70",
  services: "max-w-5xl border-[#f4b158]/75",
  contact: "max-w-4xl border-[#84c5ff]/72",
  about: "max-w-5xl border-ember/70",
  menu: "max-w-4xl border-stone-400/55",
  comingSoon: "max-w-3xl border-stone-500/60"
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
            <div className="retro-modal-header flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="retro-label text-[0.68rem] font-black text-stone-400 sm:text-[0.72rem]">
                  {panelEyebrows[activeScene]}
                </p>
                <h2
                  id={`portfolio-panel-${activeScene}`}
                  className="retro-modal-title mt-2 font-display text-2xl font-black sm:text-4xl"
                >
                  {panelTitles[activeScene]}
                </h2>
              </div>
              <button
                type="button"
                onClick={onBack}
                className="retro-action shrink-0 border border-ember/60 bg-black/45 px-4 py-2 font-mono text-[0.72rem] font-black uppercase text-ember transition hover:bg-ember hover:text-ink focus:outline-none focus:ring-4 focus:ring-ember/35"
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
      <div className="relative z-10 space-y-4 leading-7 text-stone-300">
        <p className="retro-copy">
          This section is reserved for a later update.
        </p>
      </div>
    );
  }

  return <AboutPanel />;
}

function MenuPanel({ onNavigate }: { onNavigate: (scene: PanelScene) => void }) {
  return (
    <div className="relative z-10 space-y-5">
      <p className="retro-copy max-w-2xl text-sm leading-7 text-stone-300 sm:text-base">
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
    <div className="relative z-10 space-y-5">
      <div className="grid gap-4 lg:grid-cols-[0.92fr_1.08fr]">
        <article className="retro-card-strong border-terminal/35 p-4 sm:p-5">
          <p className="retro-label text-[0.66rem] font-black text-terminal">
            Featured build
          </p>
          <h3 className="mt-3 font-mono text-xl font-black text-stone-50">
            {featuredProject.title}
          </h3>
          <p className="retro-copy mt-3 text-sm leading-7 text-stone-300">
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
        "retro-card flex flex-col border-terminal/20 p-4",
        compact ? "min-h-44" : "min-h-52",
      ].join(" ")}
    >
      <p className="retro-label text-[0.62rem] font-bold text-terminal/90">
        {project.meta}
      </p>
      <h4 className="mt-3 font-mono text-base font-black text-stone-50">
        {project.title}
      </h4>
      <p className="retro-copy mt-3 flex-1 text-sm leading-7 text-stone-300">
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
          className="retro-action inline-flex items-center border border-terminal/35 bg-terminal/10 px-3 py-2 font-mono text-[0.68rem] font-black uppercase text-terminal transition hover:bg-terminal hover:text-ink focus:outline-none focus:ring-4 focus:ring-terminal/25"
        >
          {link.label}
        </a>
      ))}
    </div>
  );
}

const skillAccentClasses: Record<
  SkillAccent,
  {
    border: string;
    panel: string;
    text: string;
    soft: string;
    line: string;
    dot: string;
  }
> = {
  terminal: {
    border: "border-terminal/35",
    panel: "bg-[#03120c]",
    text: "text-terminal",
    soft: "border-terminal/35 bg-black/40",
    line: "border-terminal/70",
    dot: "bg-terminal shadow-[0_0_14px_rgba(98,240,140,0.65)]",
  },
  cyan: {
    border: "border-[#75f4ff]/35",
    panel: "bg-[#041116]",
    text: "text-[#75f4ff]",
    soft: "border-[#75f4ff]/35 bg-black/40",
    line: "border-[#75f4ff]/70",
    dot: "bg-[#75f4ff] shadow-[0_0_14px_rgba(117,244,255,0.62)]",
  },
  amber: {
    border: "border-[#f4b158]/40",
    panel: "bg-[#161006]",
    text: "text-[#f4b158]",
    soft: "border-[#f4b158]/35 bg-black/40",
    line: "border-[#f4b158]/70",
    dot: "bg-[#f4b158] shadow-[0_0_14px_rgba(244,177,88,0.58)]",
  },
  rose: {
    border: "border-[#ff6b8a]/40",
    panel: "bg-[#16070c]",
    text: "text-[#ff8aa3]",
    soft: "border-[#ff6b8a]/35 bg-black/40",
    line: "border-[#ff6b8a]/70",
    dot: "bg-[#ff6b8a] shadow-[0_0_14px_rgba(255,107,138,0.58)]",
  },
  violet: {
    border: "border-[#b59cff]/40",
    panel: "bg-[#100b1a]",
    text: "text-[#c7b7ff]",
    soft: "border-[#b59cff]/35 bg-black/40",
    line: "border-[#b59cff]/70",
    dot: "bg-[#b59cff] shadow-[0_0_14px_rgba(181,156,255,0.56)]",
  },
  steel: {
    border: "border-stone-300/30",
    panel: "bg-[#111111]",
    text: "text-stone-200",
    soft: "border-stone-300/25 bg-black/40",
    line: "border-stone-300/55",
    dot: "bg-stone-200 shadow-[0_0_14px_rgba(231,229,228,0.42)]",
  },
};

function SkillsPanel() {
  return (
    <div className="skills-panel-matte retro-scroll-panel relative isolate overflow-hidden border border-terminal/20 p-3 sm:p-4">
      <div className="relative z-10 space-y-5">
        <section className="grid gap-4 lg:grid-cols-[1.18fr_0.82fr]">
          <div className="retro-card-strong relative overflow-hidden border-terminal/40 p-4 sm:p-5">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-terminal/70 to-transparent" />
            <p className="retro-label text-[0.72rem] font-black text-terminal">
              Core profile
            </p>
            <h3 className="mt-3 max-w-3xl text-xl font-black leading-8 text-stone-50 sm:text-3xl sm:leading-10">
              {skillProfile.title}
            </h3>
            <p className="retro-copy mt-3 max-w-3xl text-base leading-7 text-stone-200 sm:text-lg sm:leading-8">
              {skillProfile.description}
            </p>
          </div>

          <dl className="grid grid-cols-2 gap-3">
            {skillProfile.markers.map((marker) => (
              <div
                key={marker.label}
                className="retro-card px-3 py-3"
              >
                <dt className="retro-label text-[0.68rem] font-black text-stone-400 sm:text-[0.72rem]">
                  {marker.label}
                </dt>
                <dd className="mt-2 text-base font-black leading-6 text-stone-100 sm:text-lg">
                  {marker.value}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <div className="grid gap-3 lg:grid-cols-2">
          {skillGroups.map((group) => (
            <SkillGroupCard key={group.title} group={group} />
          ))}
        </div>
      </div>
    </div>
  );
}

function SkillGroupCard({ group }: { group: SkillGroup }) {
  const accent = skillAccentClasses[group.accent];

  return (
    <article
      className={[
        "retro-card relative flex min-h-72 flex-col overflow-hidden border p-4 shadow-[0_18px_46px_rgba(0,0,0,0.22)] sm:p-5",
        accent.border,
        accent.panel,
      ].join(" ")}
    >
      <div className="pointer-events-none absolute inset-x-4 top-0 h-px bg-white/15" />

      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className={["h-2 w-2 shrink-0", accent.dot].join(" ")} />
            <p
              className={[
                "retro-label text-[0.7rem] font-black",
                accent.text,
              ].join(" ")}
            >
              {group.level}
            </p>
          </div>
          <h4 className="mt-3 font-display text-lg font-black leading-7 text-stone-50 sm:text-xl">
            {group.title}
          </h4>
        </div>

        <span
          className={[
            "retro-label shrink-0 border px-2.5 py-1.5 text-right text-[0.66rem] font-black sm:text-[0.7rem]",
            accent.soft,
            accent.text,
          ].join(" ")}
        >
          {group.items.length} tools
        </span>
      </div>

      <p className="retro-copy mt-3 text-base leading-7 text-stone-200">
        {group.focus}
      </p>

      <p
        className={[
          "retro-copy mt-4 border-l-2 pl-3 text-sm font-semibold leading-6 text-stone-300",
          accent.line,
        ].join(" ")}
      >
        {group.evidence}
      </p>

      <ul className="mt-4 flex flex-wrap gap-2">
        {group.items.map((skill) => (
          <li
            key={skill}
            className="border border-white/15 bg-black/55 px-3 py-2 font-mono text-[0.72rem] font-bold leading-5 text-stone-50"
          >
            {skill}
          </li>
        ))}
      </ul>
    </article>
  );
}

function ExperiencePanel() {
  return (
    <div className="relative z-10">
      <BulletList items={experience} tone="red" />
    </div>
  );
}

function ServicesPanel() {
  return (
    <div className="relative z-10 space-y-5">
      <div className="flex flex-wrap gap-2">
        {services.map((service) => (
          <span
            key={service}
            className="retro-label border border-[#f4b158]/32 bg-[#f4b158]/10 px-3 py-2 text-xs font-bold text-stone-100"
          >
            {service}
          </span>
        ))}
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {serviceDetails.map((service) => (
          <article
            key={service.title}
            className="retro-card border-[#f4b158]/24 px-4 py-3"
          >
            <h4 className="font-mono text-sm font-black text-stone-100">
              {service.title}
            </h4>
            <p className="retro-copy mt-2 text-sm leading-7 text-stone-300">
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
    <div className="relative z-10 grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
      <div className="space-y-3">
        <ContactInfo label="Email">{profile.email}</ContactInfo>
        <ContactInfo label="Phone">{profile.phone}</ContactInfo>
        <ContactInfo label="Location">{profile.location}</ContactInfo>
      </div>

      <div className="space-y-4">
        <p className="retro-card-strong retro-copy border-[#84c5ff]/24 bg-[#84c5ff]/10 p-4 text-sm leading-7 text-stone-300 sm:text-base">
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
    <div className="retro-card border-[#84c5ff]/22 px-4 py-3 text-sm text-stone-300">
      <span className="retro-label text-xs text-[#84c5ff]">
        {label}
      </span>
      <p className="retro-copy mt-1 break-words">{children}</p>
    </div>
  );
}

function AboutPanel() {
  return (
    <div className="relative z-10 grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
      <div className="retro-card space-y-4 border-ember/22 p-4 text-stone-300">
        {profile.summary.map((paragraph) => (
          <p key={paragraph} className="retro-copy leading-7">{paragraph}</p>
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
            "retro-card retro-copy border-l-2 px-4 py-3 text-sm leading-7 text-stone-200",
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
      className="retro-action border border-ember/45 bg-ember/12 px-4 py-3 text-center font-mono text-sm font-black uppercase text-ember transition hover:bg-ember hover:text-ink focus:outline-none focus:ring-4 focus:ring-ember/35"
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
      className="retro-action border border-ember/45 bg-black/35 px-4 py-3 text-left font-mono text-sm font-black uppercase text-ember transition hover:bg-ember hover:text-ink focus:outline-none focus:ring-4 focus:ring-ember/35"
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
      className="retro-action border border-terminal/35 bg-terminal/10 px-4 py-3 font-mono text-sm font-black uppercase text-terminal transition hover:bg-terminal hover:text-ink focus:outline-none focus:ring-4 focus:ring-terminal/25"
    >
      {children}
    </a>
  );
}
