# Creative Engineering Refinements

## Implemented

### 1. Lenis + 3D scroll sync
- **LenisContext** now exposes `scrollProgress`, `velocity`, and `scrollRef` (updated each frame for 3D).
- **ScrollSyncedScene**: Wrap any 3D group so it rotates (or morphs) with scroll progress:
  ```jsx
  import { ScrollSyncedScene } from "./canvas";
  <ScrollSyncedScene rotationMultiplier={Math.PI * 0.5}>
    <YourMesh />
  </ScrollSyncedScene>
  ```
- Use `useLenisScroll().scrollRef.current` inside `useFrame` for custom scrollytelling (e.g. scale, position).

### 2. Projects horizontal scroll
- **WorksHorizontal** uses Framer Motion `useScroll` + `useTransform`: vertical scroll through the section drives horizontal translation of project cards.
- Section height is `280vh`; cards are in a sticky strip. Scroll to “push” the strip left/right.
- Project cards use **glass-frosted** and **useMagnetic** on the card container.

### 3. Frosted glass + noise
- **`.glass-frosted`** in `src/index.css`: `backdrop-filter: blur(20px)`, dark semi-transparent background, and an SVG **noise texture** overlay (`mix-blend-mode: overlay`, low opacity).
- Use on cards/sections: `className="glass-frosted rounded-2xl ..."`.

### 4. Kinetic typography (TextReveal)
- **TextReveal** in `src/components/ui/TextReveal.jsx`: splits text by **word** or **char**, slides up with stagger when in view.
- Usage: `<TextReveal text="Your headline" splitBy="word" />` or `splitBy="char"`. Optional `as="span"` for inline.

### 5. Elastic 3D progress line
- **ElasticProgressLine** in the Stars canvas: a 3D line that **stretches** and **vibrates** with Lenis **velocity**.
- Geometry is created with **useMemo** and **disposed** on unmount. Length is lerped for smooth motion.

### 6. Abstract 3D: Flowing Ribbon
- **FlowingRibbon** in `src/components/canvas/FlowingRibbon.jsx`: TubeGeometry along a CatmullRomCurve3 (sine-like), subtle rotation.
- Use as an alternative to the desk/earth: e.g. in Hero, replace `ComputersCanvas` with a Canvas that contains `<FlowingRibbon />` and lights.

### 7. Magnetic interactions
- **useMagnetic** is applied to each project card in **WorksHorizontal** so cards pull toward the cursor.
- Use on any link/button: `const { ref, x, y } = useMagnetic(0.25);` and `<motion.div ref={ref} style={{ x, y }}>...</motion.div>`.

### 8. Performance & types
- **useMemo** for curve and geometry in FlowingRibbon and ElasticProgressLine; **dispose** in `useEffect` cleanup.
- **src/types/smoothMotion.ts**: LenisScrollContext, TextRevealProps, CameraRigProps, etc.

---

## Switching back to grid Projects
In `App.jsx`, replace `WorksHorizontal` with `Works` and use the normal `Works` export from `./components`.

## Using Flowing Ribbon in Hero
In `Hero.jsx`, you can swap `ComputersCanvas` for a canvas that only shows the ribbon:
```jsx
import { Canvas } from "@react-three/fiber";
import { FlowingRibbon } from "./canvas";

<Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
  <ambientLight intensity={0.4} />
  <pointLight position={[10, 10, 10]} />
  <FlowingRibbon />
</Canvas>
```

Theme: dark mode, deep navies, and neon accents (e.g. `#56ccf2`, `#915EFF`) are already used across the site.
