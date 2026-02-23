import React, { useState, useCallback } from "react";

/**
 * Progressive image loading: shows a placeholder (shimmer) until the image loads,
 * then fades in the image for a smooth, optimized experience.
 * Uses native loading="lazy" and decoding="async" by default.
 */
export function ProgressiveImage({
  src,
  alt = "",
  className = "",
  width,
  height,
  loading = "lazy",
  decoding = "async",
  fetchPriority,
  /** Optional. E.g. "(max-width: 768px) 100vw, 360px" for responsive sizes. */
  sizes,
  /** Placeholder aspect ratio (e.g. "16/9") or leave unset to use width/height. */
  aspectRatio,
  /** Extra class for the wrapper (e.g. "rounded-2xl overflow-hidden"). */
  wrapperClassName = "",
  ...rest
}) {
  const [loaded, setLoaded] = useState(false);

  const handleLoad = useCallback(() => {
    setLoaded(true);
  }, []);

  const aspectStyle = aspectRatio ? { aspectRatio } : undefined;

  return (
    <span
      className={`progressive-image-wrap relative block w-full overflow-hidden ${wrapperClassName}`}
      style={aspectStyle}
    >
      {/* Placeholder: neutral background + subtle shimmer until image loads */}
      <span
        className={`absolute inset-0 bg-brand-surface dark:bg-tertiary animate-pulse transition-opacity duration-300 ${loaded ? "opacity-0 pointer-events-none" : "opacity-100"}`}
        aria-hidden="true"
      />
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        decoding={decoding}
        fetchpriority={fetchPriority}
        sizes={sizes}
        onLoad={handleLoad}
        className={`relative z-[1] block w-full h-full object-cover transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"} ${className}`}
        {...rest}
      />
    </span>
  );
}

/**
 * Lighter variant for small icons (no aspect-ratio box, minimal placeholder).
 * Use when the container already defines size (e.g. w-16 h-16).
 */
export function ProgressiveImageIcon({
  src,
  alt = "",
  className = "",
  loading = "lazy",
  decoding = "async",
  ...rest
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <span className="relative inline-block w-full h-full min-h-[1px]">
      {!loaded && (
        <span
          className="absolute inset-0 bg-brand-surface/80 dark:bg-tertiary/80 rounded-[inherit] animate-pulse"
          aria-hidden="true"
        />
      )}
      <img
        src={src}
        alt={alt}
        loading={loading}
        decoding={decoding}
        onLoad={() => setLoaded(true)}
        className={`relative z-[1] w-full h-full object-contain transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"} ${className}`}
        {...rest}
      />
    </span>
  );
}
