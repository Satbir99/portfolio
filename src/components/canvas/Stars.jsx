import { useState, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";
import { getDeltaMultiplier } from "../../utils/performance";
import { ElasticProgressLine } from "./ElasticProgressLine";
import { SceneThemeSync } from "./SceneThemeSync";
import { useThemeColors } from "../../hooks/useThemeColors";

/** Framerate-independent rotation speed (radians per second, scaled by delta) */
const ROTATION_SPEED_X = 0.1;
const ROTATION_SPEED_Y = 0.067;

const Stars = (props) => {
  const ref = useRef();
  const [sphere] = useState(() => random.inSphere(new Float32Array(5000), { radius: 1.2 }));
  const { starsColor, starsSize } = useThemeColors();

  useFrame((state, delta) => {
    if (!ref.current) return;
    const scale = getDeltaMultiplier(delta);
    ref.current.rotation.x -= delta * ROTATION_SPEED_X * scale;
    ref.current.rotation.y -= delta * ROTATION_SPEED_Y * scale;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
        <PointMaterial
          transparent
          color={starsColor}
          size={starsSize}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

const StarsCanvas = () => {
  return (
    <div className='w-full h-auto absolute inset-0 z-[-1]'>
      <Canvas camera={{ position: [0, 0, 1] }}>
        <SceneThemeSync />
        <Suspense fallback={null}>
          <Stars />
          <ElasticProgressLine />
        </Suspense>

        <Preload all />
      </Canvas>
    </div>
  );
};

export default StarsCanvas;
