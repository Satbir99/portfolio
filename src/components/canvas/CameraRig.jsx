import { useRef, useEffect, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const DEFAULT_MAX_OFFSET_X = 0.8;
const DEFAULT_MAX_OFFSET_Y = 0.5;
const DEFAULT_LERP_FACTOR = 2.5;
const DEFAULT_INTENSITY = 1;

/**
 * 3D Camera Rig: lerps camera position based on mouse (state.pointer) for parallax.
 * Uses MathUtils.lerp and delta for framerate-independent animation. Movement is constrained to avoid clipping.
 * @param {object} [props]
 * @param {number} [props.maxOffsetX=0.8] - Max horizontal offset (world units)
 * @param {number} [props.maxOffsetY=0.5] - Max vertical offset (world units)
 * @param {number} [props.lerpFactor=2.5] - Lerp speed (multiplied by delta)
 * @param {number} [props.intensity=1] - Mouse influence (0–1)
 */
export function CameraRig({
  maxOffsetX = DEFAULT_MAX_OFFSET_X,
  maxOffsetY = DEFAULT_MAX_OFFSET_Y,
  lerpFactor = DEFAULT_LERP_FACTOR,
  intensity = DEFAULT_INTENSITY,
} = {}) {
  const { camera } = useThree();
  const currentOffset = useRef(new THREE.Vector3(0, 0, 0));
  const targetOffset = useRef(new THREE.Vector3(0, 0, 0));

  const config = useMemo(
    () => ({
      maxOffsetX,
      maxOffsetY,
      lerpFactor,
      intensity,
    }),
    [maxOffsetX, maxOffsetY, lerpFactor, intensity]
  );

  useFrame((state, delta) => {
    if (!camera) return;

    const { pointer } = state;
    const { maxOffsetX: mx, maxOffsetY: my, lerpFactor: lf, intensity: i } = config;

    targetOffset.current.x = THREE.MathUtils.lerp(0, pointer.x * mx, i);
    targetOffset.current.y = THREE.MathUtils.lerp(0, pointer.y * my, i);
    targetOffset.current.z = 0;

    const damp = 1 - Math.exp(-lf * delta);

    camera.position.x -= currentOffset.current.x;
    camera.position.y -= currentOffset.current.y;
    currentOffset.current.x = THREE.MathUtils.lerp(
      currentOffset.current.x,
      targetOffset.current.x,
      damp
    );
    currentOffset.current.y = THREE.MathUtils.lerp(
      currentOffset.current.y,
      targetOffset.current.y,
      damp
    );
    camera.position.x += currentOffset.current.x;
    camera.position.y += currentOffset.current.y;
    camera.updateProjectionMatrix?.();
  });

  return null;
}
