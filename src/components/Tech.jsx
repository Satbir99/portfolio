import React from "react";

import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";

const ICON_SIZE = 112; /* 28 * 4 = 112px (w-28 h-28) for stable layout */

const Tech = () => {
  return (
    <div className='flex flex-row flex-wrap justify-center gap-10'>
      {technologies.map((technology) => (
        <div
          className='skill-icon-wrap w-28 h-28 flex items-center justify-center rounded-xl bg-tertiary/50'
          key={technology.name}
        >
          <img
            src={technology.icon}
            alt={technology.name}
            width={ICON_SIZE}
            height={ICON_SIZE}
            loading='lazy'
            decoding='async'
            fetchPriority='low'
            className='w-full h-full object-contain p-1'
          />
        </div>
      ))}
    </div>
  );
};

export default SectionWrapper(Tech, "skills");
