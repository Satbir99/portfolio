import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useHeroScrollProgress } from "../../context/HeroScrollContext";

/**
 * Syncs a 3D group's rotation and scale to hero section scroll progress (0–1).
 * Gives an "unscrewing" / morphing feel as the user scrolls past the hero.
 */
export function HeroScrollSync({
  children,
  /** Total Y rotation (radians) at progress 1. Default PI/2. */
  rotationYMax = Math.PI * 0.5,
  /** Scale at progress 0. Default 1. */
  scaleStart = 1,
  /** Scale at progress 1. Default 0.92. */
  scaleEnd = 0.92,
}) {
  const groupRef = useRef(null);
  const { progressRef } = useHeroScrollProgress();

  useFrame(() => {
    if (!groupRef.current) return;
    const t = THREE.MathUtils.clamp(progressRef.current ?? 0, 0, 1);
    groupRef.current.rotation.y = t * rotationYMax;
    const s = THREE.MathUtils.lerp(scaleStart, scaleEnd, t);
    groupRef.current.scale.setScalar(s);
  });

  return <group ref={groupRef}>{children}</group>;
}
