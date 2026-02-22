# Asset Pipeline & TypeScript

## GLB compression and lazy loading

- **Draco**: Compress GLB with [glTF-Transform](https://github.com/donmccurdy/glTF-Transform) or [Blender](https://www.blender.org/) (export with Draco). Then load in R3F with `useGLTF(url, true)` — the second argument enables Draco. Ensure `draco-decoder` is available (e.g. from `drei` or `@react-three/drei` which can load decoder from CDN).
- **Meshopt**: Similarly, compress with meshopt and use a decoder if required by your loader.
- **Lazy loading**: Use dynamic import so the 3D model is only loaded when the section is in view or when the user navigates to it:
  ```js
  const Model = React.lazy(() => import("./Model"));
  // In render: <Suspense fallback={<CanvasLoader />}><Model /></Suspense>
  ```
  For `useGLTF`, pass a dynamic URL that you set when the section mounts or when it enters the viewport (e.g. from Intersection Observer or Lenis scroll position).

## useGLTF with Draco (example)

```js
import { useGLTF } from "@react-three/drei";

// Ensure decoder is loaded (drei can do this automatically in some setups)
useGLTF.preload("/path/to/model.glb", true); // true = Draco
const { scene } = useGLTF("/path/to/model.glb", true);
```

## TypeScript for Three / R3F

- Add a global types file (e.g. `src/types/three.d.ts` or `src/types/portfolio.d.ts`) and extend Three.js / R3F types as needed.
- Example for strict typing of canvas props:

```ts
// src/types/portfolio.d.ts
import type { ThreeElements } from "@react-three/fiber";

declare global {
  namespace JSX {
    interface IntrinsicElements extends ThreeElements {}
  }
}
```

- For component props, define interfaces and use JSDoc `@param` with `@typedef` in .jsx until you migrate to .tsx, e.g.:

```js
/**
 * @typedef {{ index: number; name: string; description: string; tags: { name: string; color: string }[]; image: string; source_code_link: string; live_preview_link?: string }} ProjectCardProps
 */
/** @param {ProjectCardProps} props */
export function ProjectCard(props) { ... }
```

- Migrating to TypeScript: rename `.jsx` → `.tsx`, add `tsconfig.json`, and install `@types/three`. Use strict mode for “Boutique Agency” quality.

## InstancedMesh for repeating elements

For many copies of the same geometry (e.g. particles, trees, tiles), use `InstancedMesh` instead of many `<mesh>` elements:

```jsx
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { InstancedMesh } from "three";

const COUNT = 1000;
const matrix = new THREE.Matrix4();
const position = new THREE.Vector3();

function InstancedCubes() {
  const ref = useRef();
  const [positions] = useState(() => /* compute or random positions */);

  useFrame((state, delta) => {
    if (!ref.current) return;
    const time = state.clock.elapsedTime;
    for (let i = 0; i < COUNT; i++) {
      position.fromArray(positions, i * 3);
      matrix.setPosition(position);
      ref.current.setMatrixAt(i, matrix);
    }
    ref.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={ref} args={[null, null, COUNT]}>
      <boxGeometry args={[0.1, 0.1, 0.1]} />
      <meshBasicMaterial color="#56ccf2" />
    </instancedMesh>
  );
}
```

Dispose geometry and material in a useEffect cleanup when the component unmounts (see `useDispose` and `utils/performance.js`).
