/**
 * R3F / Three.js performance utilities.
 * Use delta for framerate-independent animation; dispose resources to avoid leaks.
 */

/** Target FPS for delta scaling (60fps = 1/60 ≈ 0.0167s per frame) */
const TARGET_FRAME_TIME = 1 / 60;

/**
 * Scale factor so animation speed is consistent across frame rates.
 * Use: rotation.x -= delta * ROTATION_SPEED (instead of delta / 10).
 * @param {number} delta - from useFrame(state, delta)
 * @param {number} [targetFps=60] - target frame time
 * @returns {number} multiplier (typically 1 at 60fps)
 */
export function getDeltaMultiplier(delta, targetFps = 60) {
  const target = 1 / targetFps;
  return Math.min(delta / target, 2);
}

/**
 * Dispose of a Three.js geometry to prevent memory leaks.
 * Call in useEffect cleanup or when replacing geometry.
 * @param {THREE.BufferGeometry | undefined | null} geometry
 */
export function disposeGeometry(geometry) {
  if (geometry && typeof geometry.dispose === "function") {
    geometry.dispose();
  }
}

/**
 * Dispose of a Three.js material (and optionally textures).
 * @param {THREE.Material | THREE.Material[] | undefined | null} material
 * @param {{ textures?: boolean }} [opts]
 */
export function disposeMaterial(material, opts = {}) {
  if (!material) return;
  const mats = Array.isArray(material) ? material : [material];
  mats.forEach((m) => {
    if (m && typeof m.dispose === "function") m.dispose();
    if (opts.textures && m.map && m.map.dispose) m.map.dispose();
  });
}

/**
 * Dispose any object that has a .dispose() method (e.g. Texture, RenderTarget).
 * @param {{ dispose?: () => void } | undefined | null} obj
 */
export function disposeObject(obj) {
  if (obj && typeof obj.dispose === "function") {
    obj.dispose();
  }
}
