"use client";

import { AnimatePresence, motion, type Variants } from "framer-motion";
import { memo, useMemo, type ReactNode } from "react";
import type {
  ObjectModalAction,
  ObjectModalConfig,
  ObjectModalKind,
  RoomObjectConfig,
  Scene
} from "@/data/portfolio/types";

type PanelScene = Exclude<Scene, "room">;

type ObjectDetailOverlayProps = {
  object: RoomObjectConfig | null;
  onClose: () => void;
  onNavigate: (scene: PanelScene) => void;
};

type ObjectModalContentProps = {
  modal: ObjectModalConfig;
  objectImage?: string;
  objectLabel: string;
  onNavigate: (scene: PanelScene) => void;
};

const overlayVariants: Variants = {
  initial: { opacity: 0, scale: 0.94, y: 28 },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    y: 18,
    transition: { duration: 0.18, ease: "easeIn" }
  }
};

const baseShellClass =
  "glass-modal-shell retro-modal-shell relative max-h-[92vh] w-full overflow-y-auto border-2 p-4 text-stone-100 sm:max-h-[90vh] sm:p-7";

const modalShellClasses: Record<ObjectModalKind, string> = {
  computer: "max-w-6xl border-terminal/70",
  printer: "max-w-6xl border-[#f4b158]/75",
  mac: "max-w-6xl border-[#84c5ff]/72",
  motor: "max-w-6xl border-[#ff6b5f]/72",
};

const actionClasses = {
  primary:
    "border-terminal bg-terminal px-4 py-3 text-ink hover:bg-stone-100 hover:text-ink focus:ring-terminal/30",
  secondary:
    "border-stone-400/45 bg-black/45 px-4 py-3 text-stone-100 hover:border-stone-100 hover:text-white focus:ring-stone-400/25",
};

const computerRows = [72, 48, 86, 64, 38, 78, 54];
const printerLayers = [38, 56, 72, 66, 84, 48];
const macKeys = Array.from({ length: 28 }, (_, index) => index);
const motorBars = [34, 52, 76, 92, 68, 44];

const assetPanelClasses: Record<ObjectModalKind, string> = {
  computer: "border-terminal/18 bg-[#02100a]",
  printer: "border-[#f4b158]/18 bg-[#201407]",
  mac: "border-[#84c5ff]/18 bg-[#0e1728]",
  motor: "border-[#ff6b5f]/18 bg-[#1f0d0a]",
};

const assetMatteClasses: Record<ObjectModalKind, string> = {
  computer: "border-terminal/24 bg-terminal/8 shadow-[0_0_32px_rgba(98,240,140,0.12)]",
  printer: "border-[#f4b158]/26 bg-[#f4b158]/10 shadow-[0_0_32px_rgba(244,177,88,0.12)]",
  mac: "border-[#84c5ff]/24 bg-[#84c5ff]/10 shadow-[0_0_32px_rgba(132,197,255,0.12)]",
  motor: "border-[#ff6b5f]/24 bg-[#ff6b5f]/10 shadow-[0_0_34px_rgba(255,107,95,0.12)]",
};

const assetBarClasses: Record<ObjectModalKind, string> = {
  computer: "bg-terminal/28",
  printer: "bg-[#f4b158]/30",
  mac: "bg-[#84c5ff]/30",
  motor: "bg-[#ff6b5f]/30",
};

const objectToneClasses: Record<
  ObjectModalKind,
  {
    accentText: string;
    accentBorder: string;
    accentBg: string;
    dot: string;
    tone: "terminal" | "amber" | "blue" | "red";
  }
> = {
  computer: {
    accentText: "text-terminal",
    accentBorder: "border-terminal/35",
    accentBg: "bg-terminal/10",
    dot: "bg-terminal",
    tone: "terminal",
  },
  printer: {
    accentText: "text-[#f4b158]",
    accentBorder: "border-[#f4b158]/35",
    accentBg: "bg-[#f4b158]/10",
    dot: "bg-[#f4b158]",
    tone: "amber",
  },
  mac: {
    accentText: "text-[#84c5ff]",
    accentBorder: "border-[#84c5ff]/35",
    accentBg: "bg-[#84c5ff]/10",
    dot: "bg-[#84c5ff]",
    tone: "blue",
  },
  motor: {
    accentText: "text-[#ff8a80]",
    accentBorder: "border-[#ff6b5f]/35",
    accentBg: "bg-[#ff6b5f]/10",
    dot: "bg-[#ff6b5f]",
    tone: "red",
  },
};

function ObjectDetailOverlay({
  object,
  onClose,
  onNavigate
}: ObjectDetailOverlayProps) {
  const modal = object?.modal ?? null;
  const modalContent = useMemo(
    () => {
      if (!object || !modal) {
        return null;
      }

      return renderObjectModal(modal, object.image, object.label, onNavigate);
    },
    [modal, object, onNavigate]
  );

  return (
    <AnimatePresence>
      {object && modal ? (
        <motion.div
          key={object.id}
          className="fixed inset-0 z-[60] flex items-end justify-center px-3 py-3 sm:items-center sm:px-4 sm:py-6"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={overlayVariants}
        >
          <div
            className="glass-modal-backdrop absolute inset-0 bg-[#050304]/50"
            onClick={onClose}
          />

          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby={`object-modal-${object.id}`}
            className={[baseShellClass, modalShellClasses[modal.kind]].join(" ")}
          >
            <div className="retro-modal-header flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="retro-label text-[0.68rem] font-black text-stone-400 sm:text-[0.72rem]">
                  {modal.eyebrow}
                </p>
                <h2
                  id={`object-modal-${object.id}`}
                  className="retro-modal-title mt-2 font-display text-2xl font-black sm:text-5xl"
                >
                  {modal.title}
                </h2>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="retro-action shrink-0 border border-stone-400/45 bg-black/45 px-4 py-2 font-mono text-[0.72rem] font-black uppercase text-stone-200 transition hover:border-white hover:text-white focus:outline-none focus:ring-4 focus:ring-white/20"
              >
                Close
              </button>
            </div>

            {modalContent}
          </section>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export default memo(ObjectDetailOverlay);

function renderObjectModal(
  modal: ObjectModalConfig,
  objectImage: string | undefined,
  objectLabel: string,
  onNavigate: (scene: PanelScene) => void
) {
  return (
    <ObjectModalLayout
      modal={modal}
      objectImage={objectImage}
      objectLabel={objectLabel}
      onNavigate={onNavigate}
    />
  );
}

function ObjectModalLayout({
  modal,
  objectImage,
  objectLabel,
  onNavigate
}: ObjectModalContentProps) {
  const tone = objectToneClasses[modal.kind];
  const statusLabel = modal.kind === "computer" ? "localhost:3000" : modal.eyebrow;

  return (
    <div className="relative z-10 grid gap-5 lg:grid-cols-[0.94fr_1.06fr]">
      <section className={["retro-card-strong p-4 sm:p-5", tone.accentBorder].join(" ")}>
        <div
          className={[
            "mb-4 flex items-center justify-between gap-3 border-b pb-3 font-mono text-[0.66rem] font-black uppercase tracking-[0.14em]",
            tone.accentText,
            tone.accentBorder,
          ].join(" ")}
        >
          <span>{statusLabel}</span>
          <span>online</span>
        </div>
        <PixelObjectPanel
          kind={modal.kind}
          image={objectImage}
          label={objectLabel}
        />
      </section>

      <section className="grid gap-4">
        <div
          className={[
            "retro-card-strong p-4 sm:p-5",
            tone.accentBorder,
            tone.accentBg,
          ].join(" ")}
        >
          <div className="flex items-start gap-3">
            <span
              aria-hidden="true"
              className={["mt-2 h-2.5 w-2.5 shrink-0", tone.dot].join(" ")}
            />
            <p className="retro-copy text-base font-semibold leading-7 text-stone-100 sm:text-lg sm:leading-8">
              {modal.summary}
            </p>
          </div>
        </div>

        <StatGrid stats={modal.stats} tone={tone.tone} />

        <div className="grid gap-4 xl:grid-cols-[1fr_0.86fr]">
          <HighlightList items={modal.highlights} tone={tone.tone} />
          <div className={["retro-card p-4 sm:p-5", tone.accentBorder].join(" ")}>
            <p className="retro-copy text-sm leading-7 text-stone-300 sm:text-[0.95rem]">
              {modal.description}
            </p>
            <ModalActions actions={modal.actions} onNavigate={onNavigate} />
          </div>
        </div>
      </section>
    </div>
  );
}

const PixelObjectPanel = memo(function PixelObjectPanel({
  kind,
  image,
  label
}: {
  kind: ObjectModalKind;
  image?: string;
  label: string;
}) {
  if (image) {
    return <ImageBackedPixelPanel image={image} kind={kind} label={label} />;
  }

  if (kind === "printer") {
    return (
      <div className="min-h-64 border border-[#f4b158]/18 bg-[#201407] p-4">
        <div className="grid min-h-56 grid-rows-[2.5rem_1fr_2rem] border border-[#f4b158]/24 bg-black/24 p-3">
          <div className="flex items-start justify-center">
            <span className="h-5 w-16 border border-[#f4b158]/35 bg-[#f4b158]/18" />
            <span className="mt-5 h-7 w-5 bg-[#f4b158]" />
          </div>
          <div className="flex flex-col justify-end gap-2 border-x border-[#f4b158]/16 px-6 pb-4">
            {printerLayers.map((width) => (
              <span
                key={width}
                className="h-3 border border-[#f4b158]/35 bg-[#f4b158]/20"
                style={{ width: `${width}%` }}
              />
            ))}
          </div>
          <div className="border border-[#f4b158]/24 bg-[#f4b158]/12" />
        </div>
      </div>
    );
  }

  if (kind === "mac") {
    return (
      <div className="min-h-64 border border-[#84c5ff]/18 bg-[#0e1728] p-4">
        <div className="mx-auto max-w-sm border border-[#84c5ff]/28 bg-black/30 p-3">
          <div className="min-h-36 border border-[#84c5ff]/24 bg-[#07111f] p-4">
            <div className="mb-4 h-3 w-24 bg-[#84c5ff]/40" />
            <div className="space-y-2">
              {computerRows.slice(0, 5).map((width) => (
                <span
                  key={width}
                  className="block h-2 bg-[#84c5ff]/28"
                  style={{ width: `${width}%` }}
                />
              ))}
            </div>
          </div>
          <div className="mx-auto grid max-w-xs grid-cols-7 gap-1.5 border-x border-b border-[#84c5ff]/20 bg-[#84c5ff]/10 p-3">
            {macKeys.map((key) => (
              <span key={key} className="h-2 bg-[#84c5ff]/35" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (kind === "motor") {
    return (
      <div className="min-h-72 border border-[#ff6b5f]/18 bg-[#1f0d0a] p-4">
        <div className="grid min-h-64 gap-4 sm:grid-cols-[1fr_0.7fr]">
          <div className="flex flex-col justify-end gap-3 border border-[#ff6b5f]/24 bg-black/24 p-4">
            {motorBars.map((width) => (
              <span
                key={width}
                className="h-5 border border-[#ff6b5f]/30 bg-[#ff6b5f]/16"
                style={{ width: `${width}%` }}
              />
            ))}
          </div>
          <div className="grid grid-rows-[1fr_1fr] gap-4">
            <div className="border border-[#ff6b5f]/24 bg-[#ff6b5f]/10 p-4">
              <div className="mx-auto h-24 w-24 border-[10px] border-[#ff6b5f]/35 bg-black/20" />
              <div className="mx-auto mt-3 h-3 w-16 bg-[#ff6b5f]/40" />
            </div>
            <div className="grid grid-cols-3 gap-2 border border-[#ff6b5f]/20 bg-black/18 p-3">
              <span className="bg-[#ff6b5f]/20" />
              <span className="bg-[#ff6b5f]/38" />
              <span className="bg-[#ff6b5f]/24" />
              <span className="bg-[#ff6b5f]/38" />
              <span className="bg-[#ff6b5f]/18" />
              <span className="bg-[#ff6b5f]/46" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-64 border border-terminal/18 bg-[#02100a] p-4">
      <div className="border border-terminal/24 bg-black/32 p-4">
        <div className="mb-4 flex items-center gap-2 border-b border-terminal/18 pb-3">
          <span className="h-2.5 w-2.5 bg-terminal" />
          <span className="h-2.5 w-2.5 bg-terminal/50" />
          <span className="h-2.5 w-2.5 bg-terminal/25" />
        </div>
        <div className="grid gap-4 sm:grid-cols-[1fr_0.42fr]">
          <div className="space-y-2">
            {computerRows.map((width) => (
              <span
                key={width}
                className="block h-3 border border-terminal/20 bg-terminal/16"
                style={{ width: `${width}%` }}
              />
            ))}
          </div>
          <div className="grid grid-cols-3 gap-2 border border-terminal/14 bg-terminal/8 p-2">
            <span className="bg-terminal/25" />
            <span className="bg-terminal/40" />
            <span className="bg-terminal/20" />
            <span className="bg-terminal/40" />
            <span className="bg-terminal/16" />
            <span className="bg-terminal/30" />
          </div>
        </div>
      </div>
      <div className="mx-auto mt-4 h-4 w-3/5 border border-terminal/24 bg-terminal/12" />
    </div>
  );
});

function ImageBackedPixelPanel({
  image,
  kind,
  label
}: {
  image: string;
  kind: ObjectModalKind;
  label: string;
}) {
  const imageFrameClass =
    kind === "motor"
      ? "aspect-[16/9] max-w-xl"
      : "aspect-[4/3] max-w-sm";
  const imageClass =
    kind === "motor"
      ? "max-h-[76%] max-w-[90%]"
      : "max-h-[78%] max-w-[84%]";

  return (
    <div
      className={[
        "relative min-h-64 overflow-hidden border p-4 sm:min-h-72",
        assetPanelClasses[kind],
      ].join(" ")}
    >
      <div
        aria-hidden="true"
        className="absolute inset-4 border border-white/10 bg-black/18"
      />
      <div className="relative z-10 flex min-h-52 items-center justify-center p-3 sm:min-h-56 sm:p-5">
        <div
          className={[
            "object-asset-matte relative flex w-full items-center justify-center border p-5",
            imageFrameClass,
            assetMatteClasses[kind],
          ].join(" ")}
        >
          <img
            src={image}
            alt={`${label} preview`}
            loading="lazy"
            decoding="async"
            draggable={false}
            className={[
              "pixel-art object-preview-image relative z-10 object-contain",
              imageClass,
            ].join(" ")}
          />
        </div>
      </div>
      <div className="relative z-10 mt-2 grid grid-cols-4 gap-2">
        {[42, 68, 54, 82].map((width) => (
          <span
            key={width}
            className={["h-2 border border-white/10", assetBarClasses[kind]].join(" ")}
            style={{ width: `${width}%` }}
          />
        ))}
      </div>
    </div>
  );
}

function StatGrid({
  stats,
  tone
}: {
  stats: ObjectModalConfig["stats"];
  tone: "terminal" | "amber" | "blue" | "red";
}) {
  const className = {
    terminal: "border-terminal/28 bg-terminal/10 text-terminal",
    amber: "border-[#f4b158]/28 bg-[#f4b158]/10 text-[#f4b158]",
    blue: "border-[#84c5ff]/28 bg-[#84c5ff]/10 text-[#84c5ff]",
    red: "border-[#ff6b5f]/28 bg-[#ff6b5f]/10 text-[#ff8a80]",
  }[tone];

  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {stats.map((stat) => (
        <div key={stat.label} className={["retro-card border p-4", className].join(" ")}>
          <p className="retro-label text-[0.62rem] font-black text-stone-400">
            {stat.label}
          </p>
          <p className="mt-2 font-mono text-lg font-black leading-6">{stat.value}</p>
        </div>
      ))}
    </div>
  );
}

function HighlightList({
  items,
  tone
}: {
  items: string[];
  tone: "terminal" | "amber" | "blue" | "red";
}) {
  const bulletClassName = {
    terminal: "bg-terminal",
    amber: "bg-[#f4b158]",
    blue: "bg-[#84c5ff]",
    red: "bg-[#ff6b5f]",
  }[tone];

  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li
          key={item}
          className="retro-card flex gap-3 px-4 py-3"
        >
          <span
            aria-hidden="true"
            className={["mt-2 h-2 w-2 shrink-0", bulletClassName].join(" ")}
          />
          <span className="retro-copy text-sm leading-6 text-stone-200 sm:text-[0.95rem]">
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

function ModalActions({
  actions,
  onNavigate
}: {
  actions?: ObjectModalAction[];
  onNavigate: (scene: PanelScene) => void;
}) {
  if (!actions?.length) {
    return null;
  }

  return (
    <div className="mt-4 flex flex-wrap gap-3">
      {actions.map((action) => (
        <ActionControl key={action.label} action={action} onNavigate={onNavigate}>
          {action.label}
        </ActionControl>
      ))}
    </div>
  );
}

function ActionControl({
  action,
  onNavigate,
  children
}: {
  action: ObjectModalAction;
  onNavigate: (scene: PanelScene) => void;
  children: ReactNode;
}) {
  const className = [
    "retro-action inline-flex w-full items-center justify-center font-mono text-xs font-black uppercase transition focus:outline-none focus:ring-4 sm:w-auto",
    actionClasses[action.variant ?? "secondary"],
  ].join(" ");
  const scene = action.scene;

  if (scene) {
    return (
      <button type="button" onClick={() => onNavigate(scene)} className={className}>
        {children}
      </button>
    );
  }

  if (!action.href) {
    return null;
  }

  const opensNewTab = action.href.startsWith("http");

  return (
    <a
      href={action.href}
      target={opensNewTab ? "_blank" : undefined}
      rel={opensNewTab ? "noreferrer" : undefined}
      className={className}
    >
      {children}
    </a>
  );
}
