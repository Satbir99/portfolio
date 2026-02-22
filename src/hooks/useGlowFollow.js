import { useCallback, useEffect } from "react";

/**
 * Sets CSS variables --glow-x and --glow-y on the element based on mouse position
 * (relative to the element). Use with .glow-follow in CSS for a glow-follow effect on cards.
 * @param {React.RefObject<HTMLElement | null>} ref
 */
export function useGlowFollow(ref) {
  const handleMove = useCallback(
    (e) => {
      const el = ref?.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      el.style.setProperty("--glow-x", `${x}`);
      el.style.setProperty("--glow-y", `${y}`);
    },
    [ref]
  );

  const handleLeave = useCallback(() => {
    const el = ref?.current;
    if (!el) return;
    el.style.setProperty("--glow-x", "0.5");
    el.style.setProperty("--glow-y", "0.5");
  }, [ref]);

  useEffect(() => {
    const el = ref?.current;
    if (!el) return;
    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);
    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, [ref, handleMove, handleLeave]);
}
