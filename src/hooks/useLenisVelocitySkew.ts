import { useEffect } from "react";
import { useMotionValue, useSpring, type MotionValue } from "framer-motion";
import { useLenisScroll } from "../context/LenisContext";

const VELOCITY_TO_SKEW = 0.012;
const VELOCITY_TO_ROTATE_X = 0.008;
const MAX_SKEW_DEG = 4;
const MAX_ROTATE_X_DEG = 3;

export interface LenisVelocitySkewOptions {
  /** Multiplier for skewY (degrees per velocity unit). Default 0.012 */
  skewSensitivity?: number;
  /** Multiplier for rotateX (degrees per velocity unit). Default 0.008 */
  rotateSensitivity?: number;
  /** Clamp skew to ± this (degrees). Default 4 */
  maxSkew?: number;
  /** Clamp rotateX to ± this (degrees). Default 3 */
  maxRotateX?: number;
  /** Spring stiffness. Default 100 */
  stiffness?: number;
  /** Spring damping. Default 30 */
  damping?: number;
}

export interface LenisVelocitySkewReturn {
  skewY: MotionValue<number>;
  rotateX: MotionValue<number>;
}

/**
 * Bridges Lenis scroll velocity to Framer Motion for elastic/heavy card effects.
 * Returns motion values for skewY and rotateX driven by scroll velocity (smoothed with spring).
 */
export function useLenisVelocitySkew(
  options: LenisVelocitySkewOptions = {}
): LenisVelocitySkewReturn {
  const {
    skewSensitivity = VELOCITY_TO_SKEW,
    rotateSensitivity = VELOCITY_TO_ROTATE_X,
    maxSkew = MAX_SKEW_DEG,
    maxRotateX = MAX_ROTATE_X_DEG,
    stiffness = 100,
    damping = 30,
  } = options;

  const { velocity } = useLenisScroll();
  const rawSkew = useMotionValue(0);
  const rawRotateX = useMotionValue(0);

  useEffect(() => {
    const skew = Math.max(
      -maxSkew,
      Math.min(maxSkew, velocity * skewSensitivity)
    );
    const rotate = Math.max(
      -maxRotateX,
      Math.min(maxRotateX, velocity * rotateSensitivity)
    );
    rawSkew.set(skew);
    rawRotateX.set(rotate);
  }, [velocity, skewSensitivity, rotateSensitivity, maxSkew, maxRotateX, rawSkew, rawRotateX]);

  const skewY = useSpring(rawSkew, { stiffness, damping });
  const rotateX = useSpring(rawRotateX, { stiffness, damping });

  return { skewY, rotateX };
}
