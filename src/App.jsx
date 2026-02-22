import { lazy, Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import { LenisProvider } from "./context/LenisContext";
import { ThemeProvider } from "./context/ThemeContext";
import { About, Blogs, Contact, Experience, Hero, Navbar, Tech, Works } from "./components";
import { CustomCursor, SectionDivider } from "./components/ui";

// Lazy load heavy Three.js canvases to improve LCP and initial bundle
const StarsCanvas = lazy(() =>
  import("./components/canvas/Stars").then((m) => ({ default: m.default }))
);

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <LenisProvider>
        <a href="#main" className="skip-link">
          Skip to main content
        </a>
        <CustomCursor />
        <AnimatePresence mode="wait">
          <main id="main" className="relative z-0 bg-brand-bg text-brand-text min-h-screen transition-colors duration-[400ms]">
            <div className="hero-section relative bg-hero-pattern bg-cover bg-no-repeat bg-center">
              <div className="hero-overlay absolute inset-0 pointer-events-none" aria-hidden="true" />
              <Navbar />
              <Hero />
            </div>
            <SectionDivider />
            <About />
            <SectionDivider />
            <Experience />
            <SectionDivider />
            <div className="relative z-0">
              <Tech />
              <Suspense fallback={null}>
                <StarsCanvas />
              </Suspense>
            </div>
            <SectionDivider />
            <Works />
            <SectionDivider />
            <Blogs />
            <SectionDivider />
            <div className="relative z-0">
              <Contact />
              <Suspense fallback={null}>
                <StarsCanvas />
              </Suspense>
            </div>
          </main>
        </AnimatePresence>
        </LenisProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
