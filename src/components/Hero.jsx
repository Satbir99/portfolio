import { lazy, Suspense, useRef, useEffect } from "react";
import { motion, useScroll } from "framer-motion";

import { styles } from "../styles";
import { TextReveal, SuspenseFallback } from "./ui";
import { HeroScrollProvider } from "../context/HeroScrollContext";

const ComputersCanvas = lazy(() =>
  import("./canvas/Computers").then((m) => ({ default: m.default }))
);

const HERO_SCROLL_OFFSET = ["start start", "end start"];

const Hero = () => {
  const sectionRef = useRef(null);
  const progressRef = useRef(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: HERO_SCROLL_OFFSET,
  });

  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      progressRef.current = v;
    });
  }, [scrollYProgress]);

  return (
    <HeroScrollProvider progressRef={progressRef}>
      <section
        ref={sectionRef}
        className={`relative w-full h-screen mx-auto`}
      >
      <div
        className={`absolute inset-0 top-[120px]  max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5`}
      >
        <div className='flex flex-col justify-center items-center mt-5'>
          <div className='w-5 h-5 rounded-full bg-[#915EFF]' />
          <div className='w-1 sm:h-80 h-40 violet-gradient' />
        </div>

        <div>
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

      <div className='absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center'>
        <a href='#about'>
          <div className='w-[35px] h-[64px] rounded-3xl border-4 border-brand-text-muted/60 flex justify-center items-start p-2'>
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className='w-3 h-3 rounded-full bg-brand-text-muted mb-1'
            />
          </div>
        </a>
      </div>
    </section>
    </HeroScrollProvider>
  );
};

export default Hero;
