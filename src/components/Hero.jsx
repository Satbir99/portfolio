import { lazy, Suspense, useRef, useEffect, useMemo, memo } from "react";
import { motion, useScroll } from "framer-motion";

import { styles } from "../styles";
import { TextReveal, SuspenseFallback } from "./ui";
import { HeroScrollProvider } from "../context/HeroScrollContext";

const ComputersCanvas = lazy(() => import("./canvas/Computers"));

const HERO_SCROLL_OFFSET = ["start start", "end start"];
const MOUSE_SCROLL_TRANSITION = { duration: 1.5, repeat: Infinity, repeatType: "loop" };

const Hero = memo(function Hero() {
  const sectionRef = useRef(null);
  const progressRef = useRef(0);
  const scrollOptions = useMemo(() => ({ target: sectionRef, offset: HERO_SCROLL_OFFSET }), []);
  const { scrollYProgress } = useScroll(scrollOptions);

  useEffect(() => {
    return scrollYProgress.on("change", (v) => { progressRef.current = v; });
  }, [scrollYProgress]);

  return (
    <HeroScrollProvider progressRef={progressRef}>
      <section
        ref={sectionRef}
        className={`relative w-full h-screen mx-auto`}
      >
      <div
        className={`absolute inset-0 top-[100px] sm:top-[120px] max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-3 sm:gap-5`}
      >
        <div className='flex flex-col justify-center items-center mt-2 sm:mt-5 shrink-0'>
          <div className='w-3 h-3 sm:w-5 sm:h-5 rounded-full bg-[#915EFF]' />
          <div className='w-0.5 sm:w-1 sm:h-80 h-32 xs:h-40 violet-gradient' />
        </div>

        <div className="min-w-0">
          <h1 className={`${styles.heroHeadText} text-brand-text`}>
            Hi, I'm <span className='text-[#915EFF]'>Satbir</span>
          </h1>
          <p className={`${styles.heroSubText} mt-2 text-brand-text-muted`}>
            <TextReveal text="I architect scalable interfaces and seamless user experiences" splitBy="word" as="span" className="inline-block" />
          </p>
        </div>
      </div>

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
    </section>
    </HeroScrollProvider>
  );
});

export default Hero;
