import React from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { staggerContainer } from "../utils/motion";

const STAGGER_CHILDREN = 0.06;
const DELAY_CHILDREN = 0.08;
const SECTION_VARIANTS = staggerContainer(STAGGER_CHILDREN, DELAY_CHILDREN);
const SECTION_TRANSITION = { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] };
const VIEWPORT = { once: true, amount: 0.2 };

const SectionWrapper = (Component, idName) => {
  const WrappedSection = React.memo(function WrappedSection() {
    return (
      <motion.section
        variants={SECTION_VARIANTS}
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        transition={SECTION_TRANSITION}
        className={`${styles.padding} max-w-7xl mx-auto relative z-0`}
      >
        <span className="hash-span" id={idName} aria-hidden="true">
          &nbsp;
        </span>
        <Component />
      </motion.section>
    );
  });
  WrappedSection.displayName = `SectionWrapper(${idName})`;
  return WrappedSection;
};

export default SectionWrapper;
