import React, { createContext, useContext } from "react";

/** Ref updated with hero section scroll progress (0 when hero at top, 1 when scrolled past). */
const HeroScrollContext = createContext({ progressRef: { current: 0 } });

export function useHeroScrollProgress() {
  return useContext(HeroScrollContext);
}

/** Pass progressRef from parent (e.g. Hero) so it can be updated from useScroll. */
export function HeroScrollProvider({ children, progressRef }) {
  return (
    <HeroScrollContext.Provider value={{ progressRef: progressRef ?? { current: 0 } }}>
      {children}
    </HeroScrollContext.Provider>
  );
}
