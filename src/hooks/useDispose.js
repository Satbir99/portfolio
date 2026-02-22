import { useEffect } from "react";
import { disposeGeometry, disposeMaterial, disposeObject } from "../utils/performance";

/**
 * Dispose Three.js resources on unmount to prevent memory leaks.
 * Pass an object with optional geometry, material, or generic dispose.
 * @param {{ geometry?: THREE.BufferGeometry | null; material?: THREE.Material | THREE.Material[] | null; dispose?: () => void }} resources
 */
export function useDispose(resources) {
  useEffect(() => {
    return () => {
      if (!resources) return;
      if (resources.geometry) disposeGeometry(resources.geometry);
      if (resources.material) disposeMaterial(resources.material);
      if (typeof resources.dispose === "function") resources.dispose();
      disposeObject(resources);
    };
  }, [resources?.geometry, resources?.material]);
}
