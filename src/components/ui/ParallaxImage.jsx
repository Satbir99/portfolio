import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ProgressiveImage } from "./ProgressiveImage";

const SPRING = { stiffness: 100, damping: 30 };

/**
 * Image with parallax and scale: container scrolls normally while the image
 * inside scales up slightly and moves at a different speed (parallax).
 */
export function ParallaxImage({
  src,
  alt = "",
  className = "",
  containerClassName = "",
  /** Scale at start (e.g. 1). */
  scaleStart = 1,
  /** Scale at end of scroll range (e.g. 1.15). */
  scaleEnd = 1.15,
  /** Y offset in % at start. */
  yStart = "0%",
  /** Y offset in % at end (e.g. "-10%" for parallax up). */
  yEnd = "-8%",
  /** Scroll offset for the section: [start, end] for progress 0–1. */
  offset = ["start end", "end start"],
}) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset,
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [scaleStart, (scaleStart + scaleEnd) / 2, scaleEnd]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [yStart, "0%", yEnd]);

  const scaleSpring = useSpring(scale, SPRING);
  const ySpring = useSpring(y, SPRING);

  return (
    <div
      ref={ref}
      className={`overflow-hidden ${containerClassName}`}
      style={{ willChange: "transform" }}
    >
      <motion.div
        className={`w-full h-full ${className}`}
        style={{
          scale: scaleSpring,
          y: ySpring,
          willChange: "transform",
        }}
      >
        <ProgressiveImage
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          wrapperClassName="w-full h-full"
          loading="lazy"
          decoding="async"
        />
      </motion.div>
    </div>
  );
}
