import { useState, useEffect } from "react";

const MOBILE_BREAKPOINT = 768;

/**
 * Use to optimize 3D (lower DPR, disable post-processing, fewer particles) on small screens.
 * @param {number} [breakpoint=768]
 * @returns {boolean}
 */
export function useIsMobile(breakpoint = MOBILE_BREAKPOINT) {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < breakpoint : false
  );

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < breakpoint);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [breakpoint]);

  return isMobile;
}
