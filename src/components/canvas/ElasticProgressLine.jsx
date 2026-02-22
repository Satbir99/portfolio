import { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useLenisScroll } from "../../context/LenisContext";

const SEGMENTS = 32;
const BASE_LENGTH = 1.2;
const VELOCITY_SCALE = 0.00015;
const LERP = 0.08;

/**
 * 3D line at top of viewport that stretches and vibrates with Lenis scroll velocity (elastic progress).
 */
export function ElasticProgressLine() {
  const { scrollRef } = useLenisScroll();
  const targetLengthRef = useRef(BASE_LENGTH);
  const currentLengthRef = useRef(BASE_LENGTH);

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array((SEGMENTS + 1) * 3), 3)
    );
    return g;
  }, []);

  useEffect(() => () => geometry.dispose(), [geometry]);

  useFrame((state) => {
    if (!geometry?.attributes?.position) return;

    const { velocity } = scrollRef.current;
    const vel = Math.abs(velocity) || 0;
    targetLengthRef.current = BASE_LENGTH + vel * VELOCITY_SCALE;
    targetLengthRef.current = Math.min(2.5, Math.max(0.3, targetLengthRef.current));

    currentLengthRef.current +=
      (targetLengthRef.current - currentLengthRef.current) * LERP;

    const positions = geometry.attributes.position.array;
    const half = currentLengthRef.current / 2;
    const vibrate = Math.sin(state.clock.elapsedTime * 12 + vel * 0.1) * 0.02;

    for (let i = 0; i <= SEGMENTS; i++) {
      const t = i / SEGMENTS;
      const x = THREE.MathUtils.lerp(-half, half, t) + vibrate * (1 - 2 * t);
      positions[i * 3] = x;
      positions[i * 3 + 1] = 0.48;
      positions[i * 3 + 2] = 0;
    }
    geometry.attributes.position.needsUpdate = true;
  });

  return (
    <line position={[0, 0, -1]} geometry={geometry}>
      <lineBasicMaterial color="#56ccf2" transparent opacity={0.9} />
    </line>
  );
}
