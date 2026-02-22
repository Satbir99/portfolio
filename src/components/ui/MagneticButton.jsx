import React from "react";
import { motion } from "framer-motion";
import { useMagnetic } from "../../hooks";

/**
 * Button with magnetic hover effect driven by Framer Motion springs (stiffness: 150, damping: 15).
 * Pass strength (0–0.5) and standard button props.
 */
export function MagneticButton({
  children,
  strength = 0.3,
  className = "",
  ...props
}) {
  const { ref, x, y } = useMagnetic(strength);

  return (
    <motion.button
      ref={ref}
      style={{ x, y }}
      className={`inline-block will-change-transform ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}
