import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const SPRING = { stiffness: 100, damping: 30 };

/**
 * Horizontal "Gallery" section: vertical scroll is hijacked to drive horizontal movement.
 * Container is 300vh; 0–100% scroll progress maps to x: 0% → -100%.
 * Use for scrollytelling project rows (Lenis + Framer Motion).
 */
export function HorizontalSection({
  children,
  className = "",
  /** Height of the scroll "track" in viewport units. Default 300vh. */
  scrollHeight = "300vh",
  /** Sticky top offset (e.g. "20vh"). */
  stickyTop = "20vh",
  /** Sticky inner height (e.g. "60vh"). */
  stickyHeight = "60vh",
  /** Horizontal padding at start (e.g. "50vw" for full-bleed). */
  paddingStart = "50vw",
  /** Optional: custom scroll range [start, end] for x (0–1). Default [0, 1]. */
  progressRange = [0, 1],
  /** Optional: custom x output range. Default ["0%", "-100%"]. */
  xRange = ["0%", "-100%"],
}) {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const xRaw = useTransform(
    scrollYProgress,
    progressRange,
    xRange
  );
  const x = useSpring(xRaw, SPRING);

  return (
    <div
      ref={sectionRef}
      className={`relative ${className}`}
      style={{
        height: scrollHeight,
        marginLeft: "-50vw",
        marginRight: "-50vw",
        left: "50%",
        right: "50%",
        width: "100vw",
      }}
    >
      <div
        className="sticky flex items-center overflow-hidden"
        style={{
          top: stickyTop,
          height: stickyHeight,
        }}
      >
        <motion.div
          style={{
            x,
            willChange: "transform",
            paddingLeft: paddingStart,
          }}
          className="flex gap-8 pr-8"
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}
