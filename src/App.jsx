import { lazy, Suspense, memo } from "react";

import { LenisProvider } from "./context/LenisContext";
import { ThemeProvider } from "./context/ThemeContext";
import { usePerformanceTier } from "./hooks/useDPR";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import LazyStarsInView from "./components/LazyStarsInView";
import { SectionDivider } from "./components/ui";

const StarsCanvas = lazy(() => import("./components/canvas/Stars"));
const About = lazy(() => import("./components/About"));
const Experience = lazy(() => import("./components/Experience"));
const Tech = lazy(() => import("./components/Tech"));
const Works = lazy(() => import("./components/Works"));
const Blogs = lazy(() => import("./components/Blogs"));
const Contact = lazy(() => import("./components/Contact"));

const SectionFallback = () => <div className="min-h-[40vh]" aria-hidden="true" />;

function AppContent() {
  const perf = usePerformanceTier();
  const lineSegments = perf.isMobile ? 16 : 32;

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to main content
      </a>
      <main id="main" className="relative z-0 bg-brand-bg text-brand-text min-h-screen">
        <div className="hero-section relative bg-hero-pattern bg-cover bg-no-repeat bg-center">
          <div className="hero-overlay absolute inset-0 pointer-events-none" aria-hidden="true" />
          <Navbar />
          <Hero isMobile={perf.isMobile} />
        </div>
        <SectionDivider />
        <Suspense fallback={<SectionFallback />}>
          <About />
        </Suspense>
        <SectionDivider />
        <Suspense fallback={<SectionFallback />}>
          <Experience />
        </Suspense>
        <SectionDivider />
        <div className="relative z-0">
          <Suspense fallback={<SectionFallback />}>
            <Tech />
          </Suspense>
          {!perf.isMobile && (
            <Suspense fallback={null}>
              <StarsCanvas
                pointCount={perf.pointCount}
                lineSegments={lineSegments}
                dprMax={perf.dpr}
              />
            </Suspense>
          )}
        </div>
        <SectionDivider />
        <Suspense fallback={<SectionFallback />}>
          <Works />
        </Suspense>
        <SectionDivider />
        <Suspense fallback={<SectionFallback />}>
          <Blogs />
        </Suspense>
        <SectionDivider />
        <LazyStarsInView
          pointCount={perf.pointCount}
          lineSegments={lineSegments}
          dprMax={perf.dpr}
          isMobile={perf.isMobile}
        >
          <Suspense fallback={<SectionFallback />}>
            <Contact />
          </Suspense>
        </LazyStarsInView>
      </main>
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <LenisProvider>
        <AppContent />
      </LenisProvider>
    </ThemeProvider>
  );
}

export default memo(App);
