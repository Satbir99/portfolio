import { lazy, Suspense, useRef, memo } from "react";

import { styles } from "../styles";

const HeroInteractive = lazy(() => import("./HeroInteractive"));

/**
 * Hero with static LCP content (no framer-motion in initial bundle).
 * Heading and tagline render immediately; scroll sync and 3D load after.
 */
const Hero = memo(function Hero() {
  const sectionRef = useRef(null);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen mx-auto"
    >
      <div
        className={`absolute inset-0 top-[100px] sm:top-[120px] max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-3 sm:gap-5`}
      >
        <div className="flex flex-col justify-center items-center mt-2 sm:mt-5 shrink-0">
          <div className="w-3 h-3 sm:w-5 sm:h-5 rounded-full bg-[#915EFF]" />
          <div className="w-0.5 sm:w-1 sm:h-80 h-32 xs:h-40 violet-gradient" />
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

      <Suspense fallback={null}>
        <HeroInteractive sectionRef={sectionRef} />
      </Suspense>
    </section>
  );
});

export default Hero;
