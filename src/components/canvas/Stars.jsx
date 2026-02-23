import { useState, useRef, Suspense, useMemo, memo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";
import { getDeltaMultiplier } from "../../utils/performance";
import { ElasticProgressLine } from "./ElasticProgressLine";
import { SceneThemeSync } from "./SceneThemeSync";
import { useThemeColors } from "../../hooks/useThemeColors";

const ROTATION_SPEED_X = 0.1;
const ROTATION_SPEED_Y = 0.067;

const Stars = memo(function Stars({ pointCount = 5000 }) {
  const ref = useRef();
  const safeCount = Math.max(100, Math.floor(Number(pointCount)) || 5000);
  const sphere = useMemo(() => {
    const arr = new Float32Array(safeCount * 3);
    random.inSphere(arr, { radius: 1.2 });
    for (let i = 0; i < arr.length; i++) {
      if (!Number.isFinite(arr[i])) arr[i] = 0;
    }
    return arr;
  }, [safeCount]);
  const { starsColor, starsSize } = useThemeColors();

  useFrame((_state, delta) => {
    if (!ref.current) return;
    const scale = getDeltaMultiplier(delta);
    ref.current.rotation.x -= delta * ROTATION_SPEED_X * scale;
    ref.current.rotation.y -= delta * ROTATION_SPEED_Y * scale;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled>
        <PointMaterial
          transparent
          color={starsColor}
          size={starsSize}
          sizeAttenuation
          depthWrite={false}
        />
      </Points>
    </group>
  );
});

const LINE_SEGMENTS_HIGH = 32;
const LINE_SEGMENTS_LOW = 16;

const StarsCanvas = memo(function StarsCanvas({
  pointCount = 5000,
  lineSegments = LINE_SEGMENTS_HIGH,
  dprMax = 2,
  frameloop = "always",
}) {
  return (
    <div className="w-full h-auto absolute inset-0 z-[-1]" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 1] }}
        dpr={[1, dprMax]}
        frameloop={frameloop}
        gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
      >
        <SceneThemeSync />
        <Suspense fallback={null}>
          <Stars pointCount={pointCount} />
          <ElasticProgressLine segments={lineSegments} />
        </Suspense>
        <Preload all />
      </Canvas>
    </div>
  );
});

export default StarsCanvas;
