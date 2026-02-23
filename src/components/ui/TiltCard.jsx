import React, { useRef, useCallback, useState } from "react";

const DEFAULT_OPTIONS = { max: 45, scale: 1 };

/**
 * Lightweight tilt-on-hover card without findDOMNode. Uses ref + CSS transform.
 */
export function TiltCard({ children, className = "", options = {} }) {
  const ref = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hover, setHover] = useState(false);

  const { max = 45, scale = 1 } = { ...DEFAULT_OPTIONS, ...options };

  const handleMove = useCallback(
    (e) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setTilt({ x: x * max, y: -y * max });
    },
    [max]
  );

  const handleLeave = useCallback(() => {
    setHover(false);
    setTilt({ x: 0, y: 0 });
  }, []);

  const s = hover ? scale : 1;
  const style = {
    transformStyle: "preserve-3d",
    transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) scale3d(${s},${s},${s})`,
    transition: hover ? "transform 0.05s ease-out" : "transform 0.3s ease-out",
  };

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={handleMove}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={handleLeave}
      style={style}
    >
      {children}
    </div>
  );
}
