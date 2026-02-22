import React, { useMemo } from "react";
import { motion, useInView } from "framer-motion";

/**
 * Kinetic typography: split text into words or characters and animate with stagger on enter.
 * @param {string} text - Text to reveal
 * @param {"word" | "char"} [splitBy="word"] - Split by word or character
 * @param {object} [variants] - Custom motion variants
 * @param {string} [className] - Wrapper class
 */
export function TextReveal({
  text,
  splitBy = "word",
  className = "",
  as: Component = "p",
  ...rest
}) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const items = useMemo(() => {
    if (splitBy === "char") {
      return text.split("");
    }
    return text.split(/\s+/);
  }, [text, splitBy]);

  const Wrapper = motion[Component] ?? motion.p;
  const isInline = Component === "span";

  return (
    <Wrapper
      ref={ref}
      className={`overflow-hidden ${className}`}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        visible: { transition: { staggerChildren: splitBy === "char" ? 0.02 : 0.06, delayChildren: 0.1 } },
        hidden: {},
      }}
      style={isInline ? { display: "inline-flex", flexWrap: "wrap", gap: splitBy === "word" ? "0.25em" : "0" } : { display: "flex", flexWrap: "wrap", gap: splitBy === "word" ? "0.3em" : "0" }}
      {...rest}
    >
      {items.map((item, i) => (
        <motion.span
          key={`${item}-${i}`}
          variants={{
            hidden: { y: "120%", opacity: 0 },
            visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 120, damping: 20 } },
          }}
          style={{ display: "inline-block", overflow: "hidden" }}
        >
          <span style={{ display: "inline-block" }}>{item}</span>
          {splitBy === "word" && i < items.length - 1 ? "\u00A0" : null}
        </motion.span>
      ))}
    </Wrapper>
  );
}
