import { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useLenisScroll } from "../../context/LenisContext";

const BASE_LENGTH = 1.2;
const VELOCITY_SCALE = 0.00015;
const LERP = 0.08;

/**
 * 3D line at top of viewport that stretches and vibrates with Lenis scroll velocity (elastic progress).
 * @param {{ segments?: number }} [props] - segments (default 32); use 16 on mobile for perf
 */
export function ElasticProgressLine({ segments: segmentsProp = 32 } = {}) {
  const { scrollRef } = useLenisScroll();
  const targetLengthRef = useRef(BASE_LENGTH);
  const currentLengthRef = useRef(BASE_LENGTH);
  const segments = Math.max(1, Math.floor(Number(segmentsProp)) || 32);

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const count = (segments + 1) * 3;
    const arr = new Float32Array(count);
    for (let i = 0; i <= segments; i++) {
      const t = segments > 0 ? i / segments : 0;
      const x = THREE.MathUtils.lerp(-BASE_LENGTH / 2, BASE_LENGTH / 2, t);
      arr[i * 3] = x;
      arr[i * 3 + 1] = 0.48;
      arr[i * 3 + 2] = 0;
    }
    g.setAttribute("position", new THREE.BufferAttribute(arr, 3));
    g.computeBoundingSphere();
    return g;
  }, [segments]);

  useEffect(() => () => geometry.dispose(), [geometry]);

  useFrame((state) => {
    if (!geometry?.attributes?.position || !scrollRef?.current) return;

    const rawVel = scrollRef.current.velocity;
    const vel = Number.isFinite(rawVel) ? Math.abs(rawVel) : 0;
    const target = Math.min(2.5, Math.max(0.3, BASE_LENGTH + vel * VELOCITY_SCALE));
    targetLengthRef.current = target;
    currentLengthRef.current += (target - currentLengthRef.current) * LERP;

    const positions = geometry.attributes.position.array;
    const half = Number.isFinite(currentLengthRef.current) ? currentLengthRef.current / 2 : BASE_LENGTH / 2;
    const elapsed = Number.isFinite(state.clock?.elapsedTime) ? state.clock.elapsedTime : 0;
    const vibrate = Math.sin(elapsed * 12 + vel * 0.1) * 0.02;

    for (let i = 0; i <= segments; i++) {
      const t = segments > 0 ? i / segments : 0;
      const x = THREE.MathUtils.lerp(-half, half, t) + vibrate * (1 - 2 * t);
      positions[i * 3] = Number.isFinite(x) ? x : 0;
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
