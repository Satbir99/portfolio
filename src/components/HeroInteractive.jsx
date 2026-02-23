import { lazy, Suspense, useRef, useEffect, useMemo, memo } from "react";
import { motion, useScroll } from "framer-motion";

import { HeroScrollProvider } from "../context/HeroScrollContext";
import { SuspenseFallback } from "./ui";

const ComputersCanvas = lazy(() => import("./canvas/Computers"));

const HERO_SCROLL_OFFSET = ["start start", "end start"];
const MOUSE_SCROLL_TRANSITION = { duration: 1.5, repeat: Infinity, repeatType: "loop" };

/**
 * Lazy-loaded hero interactivity: scroll sync, 3D canvas, animated scroll indicator.
 * Keeps framer-motion and useScroll out of the initial bundle for faster FCP/LCP.
 */
function HeroInteractive({ sectionRef }) {
  const progressRef = useRef(0);
  const scrollOptions = useMemo(() => ({ target: sectionRef, offset: HERO_SCROLL_OFFSET }), [sectionRef]);
  const { scrollYProgress } = useScroll(scrollOptions);

  useEffect(() => {
    return scrollYProgress.on("change", (v) => { progressRef.current = v; });
  }, [scrollYProgress]);

  return (
    <HeroScrollProvider progressRef={progressRef}>
      <Suspense fallback={<SuspenseFallback minHeight="40vh" />}>
        <ComputersCanvas />
      </Suspense>
      <div className="absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center">
        <a href="#about" aria-label="Scroll to about section">
          <div className="w-[35px] h-[64px] rounded-3xl border-4 border-brand-text-muted/60 flex justify-center items-start p-2">
            <motion.div
              animate={{ y: [0, 24, 0] }}
              transition={MOUSE_SCROLL_TRANSITION}
              className="w-3 h-3 rounded-full bg-brand-text-muted mb-1"
            />
          </div>
        </a>
      </div>
    </HeroScrollProvider>
  );
}

export default memo(HeroInteractive);
