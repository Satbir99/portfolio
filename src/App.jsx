import { lazy, Suspense, memo } from "react";
import { BrowserRouter } from "react-router-dom";

import { LenisProvider } from "./context/LenisContext";
import { ThemeProvider } from "./context/ThemeContext";
import { About, Blogs, Contact, Experience, Hero, Navbar, Tech, Works } from "./components";
import { CustomCursor, SectionDivider } from "./components/ui";

const StarsCanvas = lazy(() => import("./components/canvas/Stars"));

function AppContent() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to main content
      </a>
      <CustomCursor />
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
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <LenisProvider>
          <AppContent />
        </LenisProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default memo(App);
