# Smooth-Motion, Magnetic UI & 3D Camera Rig

## 1. Smooth-Motion Foundation

### Option A: Managed scroll container (production-ready)

Use **SmoothScrollProvider** for a dedicated scroll wrapper so there are no layout shifts and Framer Motion’s `useScroll` has a stable target:

```jsx
// App.jsx
import { SmoothScrollProvider } from "./context/SmoothScrollContext";

<BrowserRouter>
  <SmoothScrollProvider>
    <CustomCursor />
    <div className="...">{/* all content */}</div>
  </SmoothScrollProvider>
</BrowserRouter>
```

Then use **useSmoothScrollWithMotion()** to get both Lenis state and Framer Motion scroll values:

```jsx
import { useSmoothScrollWithMotion } from "../hooks";

const { scrollY, scrollProgress, scrollYProgress, scrollContainerRef } = useSmoothScrollWithMotion();
// Use scrollYProgress in motion values or for parallax
```

The scroll container is a fixed-height wrapper with overflow hidden; Lenis drives the inner content. This keeps layout stable and gives `useScroll` a clear target.

### Option B: Window scroll (current setup)

**LenisProvider** keeps using `window` as the scroll target. For Framer Motion, use `useScroll()` with no `target` so it tracks window scroll.

---

## 2. Magnetic & reactive UI

### useMagnetic

Uses Framer Motion springs (stiffness: 150, damping: 15). Returns `ref` and motion values `x`, `y`:

```jsx
import { useMagnetic } from "../hooks";
import { motion } from "framer-motion";

const { ref, x, y } = useMagnetic(0.3);
return <motion.div ref={ref} style={{ x, y }}>...</motion.div>;
```

Or use **MagneticButton**:

```jsx
<MagneticButton strength={0.3}>Click me</MagneticButton>
```

### Custom cursor (morph)

Use **data-cursor** so the cursor morphs over interactive elements:

- `data-cursor="view"` – larger rounded rect
- `data-cursor="link"` – pill shape
- `data-cursor="pointer"` – larger circle

Example: `<a href="..." data-cursor="link">Link</a>`

---

## 3. 3D camera rig & parallax

**CameraRig** is used inside an R3F `<Canvas>`. It lerps the camera position from the pointer (normalized) with `MathUtils.lerp` and `delta` for framerate-independent motion. Offsets are clamped so the scene doesn’t clip.

```jsx
import { CameraRig } from "./canvas";

<Canvas>
  <CameraRig maxOffsetX={0.5} maxOffsetY={0.3} lerpFactor={2.5} intensity={0.6} />
  <OrbitControls />
  {/* scene */}
</Canvas>
```

Props: `maxOffsetX`, `maxOffsetY` (world units), `lerpFactor` (lerp speed × delta), `intensity` (0–1). It works additively with OrbitControls.

---

## 4. Performance

- **useMemo**: Used for config objects (e.g. in CameraRig and cursor variants).
- **Listeners**: All `addEventListener` calls have matching `removeEventListener` in effect cleanups (Lenis, CustomCursor, useMagnetic).
- **3D loop**: CameraRig uses `delta` and `THREE.MathUtils.lerp` with a damp factor derived from `delta` so animation is framerate-independent.
