import { lazy, Suspense, useState, useEffect, useRef, memo } from "react";

const StarsCanvas = lazy(() => import("./canvas/Stars"));

/**
 * Wraps Contact section; mounts StarsCanvas only when this block is in view.
 * On mobile we skip Stars entirely to avoid loading Three/drei.
 */
function LazyStarsInView({ pointCount, lineSegments, dprMax, isMobile = false, children }) {
  const [inView, setInView] = useState(false);
  const sentinelRef = useRef(null);

  useEffect(() => {
    if (isMobile) return;
    const el = sentinelRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { rootMargin: "150px", threshold: 0 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [isMobile]);

  return (
    <div ref={sentinelRef} className="relative z-0">
      {children}
      {!isMobile && inView && (
        <Suspense fallback={null}>
          <StarsCanvas
            pointCount={pointCount}
            lineSegments={lineSegments}
            dprMax={dprMax}
          />
        </Suspense>
      )}
    </div>
  );
}

export default memo(LazyStarsInView);
