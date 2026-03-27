"use client";

import { useEffect, useState } from "react";

export function HeroScrollArrow({ heroId, targetId }) {
  const [delayDone, setDelayDone] = useState(false);
  const [showArrow, setShowArrow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setDelayDone(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const hero = document.getElementById(heroId);
    if (!hero) return;

    function updateArrowVisibility() {
      const rect = hero.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const visiblePx =
        Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);
      const visibleArea = Math.max(0, visiblePx);
      const visibleRatio = visibleArea / Math.min(rect.height, viewportHeight);
      const inHeroRange =
        visibleRatio > 0.35 &&
        rect.top < viewportHeight * 0.55 &&
        rect.bottom > viewportHeight * 0.45;

      setShowArrow(delayDone && inHeroRange);
    }

    updateArrowVisibility();
    window.addEventListener("scroll", updateArrowVisibility, { passive: true });
    window.addEventListener("resize", updateArrowVisibility);

    return () => {
      window.removeEventListener("scroll", updateArrowVisibility);
      window.removeEventListener("resize", updateArrowVisibility);
    };
  }, [heroId, delayDone]);

  function handleScrollToContent() {
    const target = document.getElementById(targetId);
    if (!target) return;

    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <button
      type="button"
      onClick={handleScrollToContent}
      aria-label="Scroll to content"
      className={`fixed bottom-6 left-1/2 z-40 -translate-x-1/2 rounded-full border border-white/20 bg-background px-4 py-2 text-zinc-100 backdrop-blur transition-all duration-500 ease-out hover:border-accent/60 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 ${
        showArrow
          ? "translate-y-0 opacity-100 pointer-events-auto"
          : "translate-y-3 opacity-0 pointer-events-none"
      }`}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className={`h-6 w-6 ${showArrow ? "animate-bounce" : ""}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="12" y1="3" x2="12" y2="17" />
        <path d="M5 12L12 19L19 12" />
      </svg>
    </button>
  );
}

