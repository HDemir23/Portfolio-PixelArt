"use client";

import { memo, useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "portfolio-cookie-notice:v1";
const DISMISSED_VALUE = "dismissed";

function CookieNotice() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      setIsVisible(localStorage.getItem(STORAGE_KEY) !== DISMISSED_VALUE);
    } catch {
      setIsVisible(true);
    }
  }, []);

  const dismissNotice = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEY, DISMISSED_VALUE);
    } catch {
      // Ignore storage failures; the notice can still close for this session.
    }

    setIsVisible(false);
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <aside
      role="status"
      aria-live="polite"
      className="fixed inset-x-3 bottom-3 z-[80] border border-ember/45 bg-[#0b080d]/92 p-3 text-stone-100 shadow-[0_18px_48px_rgba(0,0,0,0.38)] backdrop-blur-sm sm:left-auto sm:right-4 sm:max-w-md sm:p-4"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <p className="retro-copy flex-1 text-sm leading-6 text-stone-200">
          This site uses analytics cookies to measure portfolio interactions
          and improve advertising performance.
        </p>
        <button
          type="button"
          onClick={dismissNotice}
          className="retro-action shrink-0 border border-ember bg-ember px-4 py-2 font-mono text-xs font-black uppercase text-ink transition hover:bg-[#ffd18a] focus:outline-none focus:ring-4 focus:ring-ember/35"
        >
          OK
        </button>
      </div>
    </aside>
  );
}

export default memo(CookieNotice);
