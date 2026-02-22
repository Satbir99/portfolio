import { useState, useEffect } from "react";

/**
 * Respects prefers-reduced-motion for accessibility and mobile-friendly 3D.
 * Use to disable heavy effects (post-processing, particles count, etc.) when true.
 * @returns {boolean}
 */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return reduced;
}
