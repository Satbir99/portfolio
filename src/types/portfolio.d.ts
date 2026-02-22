/**
 * Portfolio / R3F type hints. Use with JSDoc or when migrating to TypeScript.
 * For full Three.js types: npm i -D @types/three
 */

export interface SectionWrapperProps {
  idName?: string;
}

export interface CanvasCommonProps {
  dpr?: [number, number];
  gl?: { preserveDrawingBuffer?: boolean };
  camera?: { position?: [number, number, number]; fov?: number; near?: number; far?: number };
}

export interface LenisScrollContext {
  scrollY: number;
  scrollProgress: number;
  lenis: import("lenis") | null;
}
