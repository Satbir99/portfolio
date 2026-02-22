import React, { useRef, memo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * Scroll-reactive divider between sections. The line "draws" in as you scroll into view (Lenis + useScroll).
 */
export const SectionDivider = memo(function SectionDivider() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scaleX = useTransform(scrollYProgress, [0.1, 0.35, 0.65, 0.9], [0, 1, 1, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0.3, 1, 1, 0.3]);

  return (
    <div ref={ref} className="relative w-full py-12 sm:py-16 flex justify-center items-center overflow-hidden">
      <motion.div
        style={{ opacity }}
        className="absolute inset-0 flex justify-center items-center"
      >
        <motion.div
          style={{ scaleX, transformOrigin: "center" }}
          className="section-divider-line h-px w-full max-w-2xl mx-auto rounded-full"
        />
      </motion.div>
      <motion.div
        style={{ opacity }}
        className="absolute w-2 h-2 rounded-full bg-accent-blue section-divider-dot"
      />
    </div>
  );
});
