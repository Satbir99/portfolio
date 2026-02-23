import React from "react";

import { SectionWrapper } from "../hoc";
import { ProgressiveImageIcon } from "./ui";
import { technologies } from "../constants";

const ICON_SIZE = 112; /* 28 * 4 = 112px (w-28 h-28) for stable layout */

const Tech = () => {
  return (
    <div className='flex flex-row flex-wrap justify-center gap-6 sm:gap-8 md:gap-10'>
      {technologies.map((technology) => (
        <div
          className='skill-icon-wrap w-28 h-28 flex items-center justify-center rounded-xl bg-brand-surface dark:bg-tertiary/50 border border-brand-border/50 dark:border-transparent shadow-premium dark:shadow-none transition-composited'
          key={technology.name}
        >
          <ProgressiveImageIcon
            src={technology.icon}
            alt={technology.name}
            width={ICON_SIZE}
            height={ICON_SIZE}
            loading="lazy"
            decoding="async"
            fetchpriority="low"
            className="w-full h-full object-contain p-1"
          />
        </div>
      ))}
    </div>
  );
};

export default SectionWrapper(Tech, "skills");
