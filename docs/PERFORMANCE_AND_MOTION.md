# Performance & Motion (Boutique Agency Setup)

## What’s in place

- **R3F / Delta**: `Stars.jsx` uses `getDeltaMultiplier(delta)` and speed constants for framerate-independent rotation. Use `delta * speed` in all `useFrame` callbacks.
- **Dispose**: `utils/performance.js` exposes `disposeGeometry`, `disposeMaterial`, `disposeObject`. Use `useDispose` in hooks for custom geometries/materials.
- **Mobile / a11y**: `useIsMobile()` and `useReducedMotion()` let you lower DPR, skip post-processing, or reduce particle count.
- **Lenis**: Smooth scroll via `LenisProvider` in App. Use `useLenisScroll()` for `scrollY` and `scrollProgress` (e.g. parallax or scroll-bound 3D).
- **Scroll-bound 3D**: Optional `ScrollBoundCamera` inside a Canvas uses Lenis scroll to drive camera (e.g. add to `ComputersCanvas` or `StarsCanvas`).
- **Motion**: `SectionWrapper` uses staggered children and a smooth transition. `AnimatePresence` wraps the app for exit/enter.
- **Glass / glow**: `.glass` and `.glow-follow` in CSS; `useGlowFollow(ref)` for cards. Accent colors and shadows in Tailwind.
- **Cursor / magnetic**: `CustomCursor` (data-cursor), `MagneticButton` and `useMagnetic(strength)` for magnetic buttons.

## Optional: Post-processing (Bloom)

1. `npm i @react-three/postprocessing postprocessing`
2. In your Canvas (e.g. Stars or Earth), use `useIsMobile` and `useReducedMotion`; render `EffectComposer` + `Bloom` only when `!isMobile && !reducedMotion` to keep 60fps on mobile.

## Lighthouse

- Keep images and GLBs optimized (Draco, lazy load).
- Avoid layout thrash; use `content-visibility` or lazy render for below-the-fold sections if needed.
- Lenis and a single shared Canvas (where possible) help keep main thread and paint cheap.
