# Performance Optimizations

This document summarizes the performance work applied to the portfolio and suggests further improvements.

## Applied Optimizations

### Initial load (LCP, FCP, TTI)

- **Lazy loading**
  - Hero Computers canvas: already lazy via `React.lazy()`.
  - Earth canvas: lazy-loaded only when Contact section is rendered; `EarthCanvas` is dynamically imported in `Contact.jsx`.
  - Second Stars canvas: mounted only when the Contact section enters the viewport (`LazyStarsInView` + `IntersectionObserver`), so only one Stars WebGL context is created on first load.
- **Preload**
  - Hero GLTF: `index.html` includes `<link rel="preload" href="/desktop_pc/scene.gltf" as="fetch">` so the browser can start loading the 3D model early.

### Bundle and code splitting

- **Vite**
  - `manualChunks`: React/ReactDOM, framer-motion, three + @react-three + maath, lenis, emailjs.
  - `chunkSizeWarningLimit: 600` to keep an eye on large chunks.
- **Lazy imports**
  - `StarsCanvas`, `ComputersCanvas`, and `EarthCanvas` are loaded on demand.

### Three.js / R3F

- **Adaptive DPR**
  - `usePerformanceTier()` (in `useDPR.js`) drives:
    - **DPR**: 1 on mobile/reduced motion, up to 2 on desktop.
    - **Point count (Stars)**: 5000 (high), 2000 (low/mobile), 800 (minimal/reduced motion).
    - **Shadow map size**: 1024 (high), 512 (low/mobile).
  - All Canvases use `dpr={[1, dprMax]}`.
- **Stars**
  - Point count and line segments (ElasticProgressLine) scale with performance tier.
  - `gl={{ antialias: false, alpha: true, powerPreference: 'low-power' }}` to reduce GPU cost.
  - `Stars` and point positions are memoized; rotation uses delta in `useFrame`.
- **Computers (hero)**
  - `frameloop="demand"`; shadows; `shadow-mapSize` from performance tier (512 on mobile).
  - `gl.stencil: false`, `preserveDrawingBuffer: false`.
  - `Computers` and scene graph memoized.
- **Earth**
  - `frameloop="demand"`; shadows disabled on mobile; adaptive DPR.
  - `Earth` and `EarthCanvas` wrapped in `memo`.
- **ElasticProgressLine**
  - `segments` prop (32 desktop, 16 mobile) to reduce vertex updates per frame.
  - Geometry disposed in `useEffect` cleanup.

### React and re-renders

- `memo` used on: `Stars`, `StarsCanvas`, `Computers`, `ComputersCanvas`, `Earth`, `EarthCanvas`, `LazyStarsInView`.
- `usePerformanceTier()` uses a single media-query + `useMemo` for the returned object to avoid unnecessary updates.
- Theme colors for 3D (`useThemeColors`) are memoized per theme.

### Memory

- `ElasticProgressLine`: `geometry.dispose()` in effect cleanup.
- `performance.js`: helpers for disposing geometry/materials when replacing or unmounting.

---

## Further Improvements (optional)

### Assets

- **GLTF**
  - Use **Draco** compression for `desktop_pc/scene.gltf` and `planet/scene.gltf` (e.g. gltf-pipeline or Blender export), then load with `useGLTF(url, true)` or `draco()` from drei.
- **Textures**
  - Use **KTX2/Basis** for color/normal maps to reduce size and decode on GPU; consider `useKTX2` or similar in drei.

### Rendering

- **Shadows**
  - Keep shadows off on mobile (already done); on desktop you can try `shadow-mapSize={512}` if 1024 is heavy.
- **Post-processing**
  - If you add bloom or SSAO, gate them on `!perf.isMobile && !perf.isReducedMotion` and use a single `EffectComposer` with minimal passes.
- **Instancing**
  - If you add many repeated meshes (e.g. trees, rocks), use `InstancedMesh` and batch draws.

### Monitoring

- Use **Lighthouse** (Performance) and **Chrome DevTools Performance** to profile FPS and long tasks.
- For WebGL: **Chrome → Performance → GPU** and R3F/invalidations to avoid unnecessary frames.

### Mobile

- Current behavior: one Stars canvas on first view; second only when Contact is in view; lower DPR, fewer points, smaller shadow maps, no shadows on Earth on mobile.
- If needed, you can further reduce Stars point count or disable ElasticProgressLine on mobile via `usePerformanceTier().tier`.
