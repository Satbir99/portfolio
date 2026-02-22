import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";

/** @type {Record<string, { width: number; height: number; borderRadius: string; scale: number }>} */
const CURSOR_VARIANTS = {
  default: { width: 24, height: 24, borderRadius: "50%", scale: 1 },
  view: { width: 48, height: 32, borderRadius: "8px", scale: 1 },
  link: { width: 40, height: 24, borderRadius: "12px", scale: 1.1 },
  pointer: { width: 32, height: 32, borderRadius: "50%", scale: 1.4 },
};

/**
 * Custom cursor that morphs shape/size when hovering elements with data-cursor="view" | "link" | "pointer".
 * Renders only on non-touch devices. All event listeners are cleaned up on unmount.
 */
export function CustomCursor() {
  const [state, setState] = useState({
    x: 0,
    y: 0,
    variant: "default",
    label: "",
    visible: false,
  });

  const variantStyle = useMemo(
    () => CURSOR_VARIANTS[state.variant] ?? CURSOR_VARIANTS.default,
    [state.variant]
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouch) return;

    const handleMove = (e) => {
      setState((s) => ({ ...s, x: e.clientX, y: e.clientY, visible: true }));
    };

    const handleLeave = () => {
      setState((s) => ({ ...s, visible: false }));
    };

    const handleOver = (e) => {
      const cursor = e.target?.closest?.("[data-cursor]");
      if (cursor) {
        const value = (cursor.getAttribute("data-cursor") || "default").toLowerCase();
        const variant = ["view", "link", "pointer"].includes(value) ? value : "default";
        setState((s) => ({
          ...s,
          variant,
          label: variant === "default" ? (cursor.getAttribute("data-cursor") || "") : "",
        }));
      } else {
        setState((s) => ({ ...s, variant: "default", label: "" }));
      }
    };

    document.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseleave", handleLeave);
    document.addEventListener("mouseover", handleOver);

    return () => {
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseleave", handleLeave);
      document.removeEventListener("mouseover", handleOver);
    };
  }, []);

  useEffect(() => {
    if (state.visible) document.documentElement.classList.add("custom-cursor-active");
    else document.documentElement.classList.remove("custom-cursor-active");
    return () => document.documentElement.classList.remove("custom-cursor-active");
  }, [state.visible]);

  if (!state.visible) return null;

  const halfW = variantStyle.width / 2;
  const halfH = variantStyle.height / 2;

  return (
    <div
      className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
      style={{
        transform: `translate(${state.x - halfW}px, ${state.y - halfH}px)`,
      }}
    >
      <motion.div
        className="absolute border-2 border-white bg-white/10"
        initial={false}
        animate={{
          width: variantStyle.width,
          height: variantStyle.height,
          borderRadius: variantStyle.borderRadius,
          scale: variantStyle.scale,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        style={{ left: 0, top: 0 }}
      />
      {state.label && state.variant === "default" && (
        <span
          className="absolute left-full ml-2 top-1/2 -translate-y-1/2 text-xs text-brand-text whitespace-nowrap"
          style={{ pointerEvents: "none" }}
        >
          {state.label}
        </span>
      )}
    </div>
  );
}
