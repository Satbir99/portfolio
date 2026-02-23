import { lazy, Suspense, useState, useEffect, useRef, memo } from "react";

const StarsCanvas = lazy(() => import("./canvas/Stars"));

/**
 * Wraps Contact section; mounts StarsCanvas only when this block is in view.
 * Avoids a second WebGL context until the user scrolls to Contact.
 */
function LazyStarsInView({ pointCount, lineSegments, dprMax, children }) {
  const [inView, setInView] = useState(false);
  const sentinelRef = useRef(null);

  useEffect(() => {
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
  }, []);

  return (
    <div ref={sentinelRef} className="relative z-0">
      {children}
      {inView && (
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
