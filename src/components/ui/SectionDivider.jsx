import React, { memo } from "react";

/**
 * Static section divider with reserved height to prevent CLS (was main Lighthouse culprit).
 * Scroll-based animation removed so layout is stable and main-thread work is lower on mobile.
 */
export const SectionDivider = memo(function SectionDivider() {
  return (
    <div
      className="relative w-full py-8 sm:py-16 flex justify-center items-center overflow-hidden min-h-[4rem] sm:min-h-[8rem]"
      style={{ contain: "layout" }}
    >
      <div className="absolute inset-0 flex justify-center items-center">
        <div className="section-divider-line h-px w-full max-w-2xl mx-auto rounded-full" />
      </div>
      <div className="absolute w-2 h-2 rounded-full bg-accent-blue section-divider-dot" />
    </div>
  );
});
