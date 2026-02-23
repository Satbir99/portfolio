import { lazy, Suspense, useRef, memo } from "react";

import { styles } from "../styles";

const HeroInteractive = lazy(() => import("./HeroInteractive"));

/**
 * Hero with static LCP. On mobile we skip 3D and scroll cue for a compact layout.
 */
const Hero = memo(function Hero({ isMobile = false }) {
  const sectionRef = useRef(null);

  return (
    <section
      ref={sectionRef}
      className={`relative w-full mx-auto ${isMobile ? "pt-20 sm:pt-24 pb-6 md:pb-8" : "h-screen"}`}
    >
      <div
        className={`max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-3 sm:gap-5 ${isMobile ? "" : "absolute inset-0 top-[100px] sm:top-[120px]"}`}
      >
        <div className="flex flex-col justify-center items-center mt-2 sm:mt-5 shrink-0">
          <div className="w-3 h-3 sm:w-5 sm:h-5 rounded-full bg-[#915EFF]" />
          <div className={`w-0.5 sm:w-1 violet-gradient ${isMobile ? "h-20 xs:h-24 sm:h-32" : "sm:h-80 h-32 xs:h-40"}`} />
        </div>

        <div className="min-w-0">
          <h1 className={`${styles.heroHeadText} text-brand-text`}>
            Hi, I'm <span className="text-[#915EFF]">Satbir</span>
          </h1>
          <p className={`${styles.heroSubText} mt-2 text-brand-text-muted`}>
            I architect scalable interfaces and seamless user experiences
          </p>
        </div>
      </div>

      {!isMobile && (
        <Suspense fallback={null}>
          <HeroInteractive sectionRef={sectionRef} />
        </Suspense>
      )}
    </section>
  );
});

export default Hero;
