import React, { createContext, useContext, useEffect, useMemo, useState, useRef } from "react";

const LenisContext = createContext({
  scrollY: 0,
  scrollProgress: 0,
  velocity: 0,
  lenis: null,
  scrollRef: { current: { scrollProgress: 0, velocity: 0 } },
});

export function useLenisScroll() {
  const ctx = useContext(LenisContext);
  return ctx;
}

const DEFAULT_OPTIONS = {
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
};

/**
 * Provides Lenis smooth scroll, progress, and velocity.
 * Context value is memoized to avoid unnecessary consumer re-renders.
 */
export function LenisProvider({ children, options = {} }) {
  const [scrollY, setScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [velocity, setVelocity] = useState(0);
  const lenisRef = useRef(null);
  const scrollRef = useRef({ scrollProgress: 0, velocity: 0 });

  useEffect(() => {
    let lenis;
    let rafId;
    const init = async () => {
      const Lenis = (await import("lenis")).default;
      lenis = new Lenis({ ...DEFAULT_OPTIONS, ...options });
      lenis.on("scroll", () => {
        const scroll = lenis.scroll;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const progress = max > 0 ? scroll / max : 0;
        setScrollY(scroll);
        setScrollProgress(progress);
        setVelocity(lenis.velocity ?? 0);
        scrollRef.current = { scrollProgress: progress, velocity: lenis.velocity ?? 0 };
      });
      lenisRef.current = lenis;

      function raf(time) {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      }
      rafId = requestAnimationFrame(raf);
    };
    const isMobile = typeof window !== "undefined" && window.matchMedia("(max-width: 768px)").matches;
    const timeout = isMobile ? 4500 : 2000;
    const id = typeof requestIdleCallback !== "undefined"
      ? requestIdleCallback(() => init(), { timeout })
      : setTimeout(() => init(), isMobile ? 2500 : 0);
    return () => {
      if (typeof requestIdleCallback !== "undefined") cancelIdleCallback(id);
      else clearTimeout(id);
      if (rafId) cancelAnimationFrame(rafId);
      if (lenisRef.current) lenisRef.current.destroy();
    };
  }, []);

  const value = useMemo(
    () => ({
      scrollY,
      scrollProgress,
      velocity,
      lenis: lenisRef.current,
      scrollRef,
    }),
    [scrollY, scrollProgress, velocity]
  );

  return (
    <LenisContext.Provider value={value}>
      {children}
    </LenisContext.Provider>
  );
}
