import { useRef, useCallback, useEffect } from "react";
import { useSpring } from "framer-motion";

const DEFAULT_STRENGTH = 0.3;
const SPRING_STIFFNESS = 150;
const SPRING_DAMPING = 15;

const springConfig = { stiffness: SPRING_STIFFNESS, damping: SPRING_DAMPING };

/**
 * Magnetic pull effect using Framer Motion springs (stiffness: 150, damping: 15).
 * Calculates distance from cursor and pulls the element toward it.
 * @param {number} [strength=0.3] - 0 = no movement, 0.5 = strong pull
 * @param {{ stiffness?: number; damping?: number }} [overrides]
 * @returns {{ ref: React.RefObject<HTMLElement>; x: MotionValue<number>; y: MotionValue<number> }}
 */
export function useMagnetic(strength = DEFAULT_STRENGTH, overrides = {}) {
  const ref = useRef(null);
  const config = {
    stiffness: overrides.stiffness ?? springConfig.stiffness,
    damping: overrides.damping ?? springConfig.damping,
  };

  const x = useSpring(0, config);
  const y = useSpring(0, config);

  const handleMove = useCallback(
    (e) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const maxDist = Math.min(rect.width, rect.height) * 0.5;
      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      const dist = Math.hypot(dx, dy) || 1;
      const pull = Math.min(dist / maxDist, 1) * strength * maxDist * 0.5;
      x.set((dx / dist) * pull);
      y.set((dy / dist) * pull);
    },
    [strength, x, y]
  );

  const handleLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);
    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, [handleMove, handleLeave]);

  return { ref, x, y };
}
