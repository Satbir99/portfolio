import React from "react";
import { motion } from "framer-motion";

/**
 * Reusable glassmorphism card. Use with useGlowFollow(ref) for glow-follow effect.
 * @param {React.ReactNode} children
 * @param {string} [className] - extra Tailwind classes
 * @param {object} [motionProps] - variants, initial, whileInView, etc.
 */
export function GlassCard({ children, className = "", motionProps = {}, ...rest }) {
  return (
    <motion.div
      className={`glass rounded-2xl border backdrop-blur-md ${className}`}
      {...motionProps}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
