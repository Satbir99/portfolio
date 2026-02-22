import React from "react";

/**
 * Minimal loader for Suspense fallback (e.g. lazy-loaded Hero canvas).
 * Reserves space to avoid layout shift and shows a subtle spinner.
 */
export function SuspenseFallback({ className = "", minHeight = "40vh", size = 48 }) {
  return (
    <div
      className={`flex items-center justify-center w-full min-h-[280px] ${className}`}
      style={{ minHeight }}
      aria-hidden="true"
      aria-busy="true"
    >
      <div
        className="rounded-full border-2 border-white/10 border-t-accent-blue animate-spin"
        style={{ width: size, height: size }}
      />
    </div>
  );
}
