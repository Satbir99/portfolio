import React, { useMemo } from "react";
import { motion, useInView } from "framer-motion";

const SPRING = { type: "spring", stiffness: 100, damping: 30 };

/**
 * High-end text masking: each line (or word) rises from an invisible mask.
 * Uses overflow-hidden + y: "100%" → 0 with spring for a tactile feel.
 * @param {string} text - Text to reveal
 * @param {"line" | "word"} [splitBy="line"] - "line" = split by newlines; "word" = by words
 * @param {string} [className] - Wrapper class
 * @param {React.ElementType} [as] - Wrapper element (e.g. "h1", "h2", "p")
 */
export function SplitText({
  text,
  splitBy = "line",
  className = "",
  as: Component = "p",
  ...rest
}) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const items = useMemo(() => {
    if (splitBy === "line") {
      return text.split(/\n/).filter(Boolean);
    }
    return text.split(/\s+/);
  }, [text, splitBy]);

  const Wrapper = motion[Component] ?? motion.p;

  const isLine = splitBy === "line";

  return (
    <Wrapper
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        visible: {
          transition: {
            staggerChildren: isLine ? 0.08 : 0.04,
            delayChildren: 0.05,
          },
        },
        hidden: {},
      }}
      style={{
        overflow: "hidden",
        display: isLine ? "block" : "flex",
        flexWrap: "wrap",
      }}
      {...rest}
    >
      {items.map((line, i) => (
        <motion.span
          key={`${splitBy}-${i}-${line.slice(0, 8)}`}
          variants={{
            hidden: { y: "100%" },
            visible: {
              y: 0,
              transition: SPRING,
            },
          }}
          style={{
            display: isLine ? "block" : "inline-block",
            overflow: "hidden",
            willChange: "transform",
          }}
        >
          <span style={{ display: "inline-block" }}>
            {line}
            {splitBy === "word" && i < items.length - 1 ? "\u00A0" : null}
          </span>
        </motion.span>
      ))}
    </Wrapper>
  );
}
