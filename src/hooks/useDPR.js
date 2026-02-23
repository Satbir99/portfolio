import { useState, useEffect, useMemo } from "react";

/**
 * Adaptive device pixel ratio for WebGL. Caps DPR on mobile/low-power devices
 * to maintain 60 FPS. Use with Canvas: dpr={[1, dpr]}.
 * @param {{ max?: number, mobileMax?: number }} [opts] - max desktop DPR, mobile DPR cap
 * @returns {number}
 */
export function useDPR(opts = {}) {
  const { max = 2, mobileMax = 1 } = opts;
  const [dpr, setDpr] = useState(() => getDPR(max, mobileMax));

  useEffect(() => {
    const media = window.matchMedia("(max-width: 768px)");
    const update = () => setDpr(getDPR(max, mobileMax, media.matches));
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [max, mobileMax]);

  return dpr;
}

function getDPR(max, mobileMax, isMobile) {
  if (typeof isMobile === "undefined" && typeof window !== "undefined") {
    isMobile = window.innerWidth <= 768;
  }
  const cap = isMobile ? mobileMax : max;
  const ratio = typeof window !== "undefined" ? window.devicePixelRatio : 1;
  return Math.min(cap, Math.max(1, Math.floor(ratio * 10) / 10));
}

/**
 * Performance tier for 3D: "high" (desktop), "low" (mobile), "minimal" (reduced motion).
 * Use to reduce particles, shadow resolution, post-processing, etc.
 */
export function usePerformanceTier() {
  const [tier, setTier] = useState("high");

  useEffect(() => {
    const mobileMq = window.matchMedia("(max-width: 768px)");
    const reducedMq = window.matchMedia("(prefers-reduced-motion: reduce)");

    const update = () => {
      if (reducedMq.matches) setTier("minimal");
      else if (mobileMq.matches) setTier("low");
      else setTier("high");
    };
    update();
    mobileMq.addEventListener("change", update);
    reducedMq.addEventListener("change", update);
    return () => {
      mobileMq.removeEventListener("change", update);
      reducedMq.removeEventListener("change", update);
    };
  }, []);

  return useMemo(
    () => ({
      tier,
      isMobile: tier === "low" || tier === "minimal",
      isReducedMotion: tier === "minimal",
      dpr: tier === "minimal" ? 1 : tier === "low" ? 1 : 2,
      shadowSize: tier === "high" ? 1024 : 512,
      pointCount: tier === "minimal" ? 800 : tier === "low" ? 2000 : 5000,
    }),
    [tier]
  );
}
