import React, { Suspense, useEffect, useState, memo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import { usePerformanceTier } from "../../hooks/useDPR";
import CanvasLoader from "../Loader";
import { CameraRig } from "./CameraRig";
import { HeroScrollSync } from "./HeroScrollSync";

const Computers = memo(function Computers({ isMobile, shadowSize }) {
  const { scene } = useGLTF("./desktop_pc/scene.gltf");

  const scale = isMobile ? 0.7 : 0.75;
  const position = isMobile ? [0, -3, -2.2] : [0, -3.25, -1.5];

  return (
    <HeroScrollSync rotationYMax={Math.PI * 0.4} scaleStart={1} scaleEnd={0.94}>
      <group>
        <hemisphereLight intensity={0.15} groundColor="black" />
        <spotLight
          position={[-20, 50, 10]}
          angle={0.12}
          penumbra={1}
          intensity={1}
          castShadow
          shadow-mapSize={shadowSize}
        />
        <pointLight intensity={1} />
        <primitive
          object={scene}
          scale={scale}
          position={position}
          rotation={[-0.01, -0.2, -0.1]}
        />
      </group>
    </HeroScrollSync>
  );
});

const ComputersCanvas = memo(function ComputersCanvas() {
  const perf = usePerformanceTier();
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth <= 500 : false
  );

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 500px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <Canvas
      frameloop="demand"
      shadows
      dpr={[1, perf.dpr]}
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{
        preserveDrawingBuffer: false,
        antialias: true,
        powerPreference: "high-performance",
        stencil: false,
      }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <CameraRig maxOffsetX={0.5} maxOffsetY={0.3} intensity={0.6} />
        <Computers isMobile={isMobile} shadowSize={perf.shadowSize} />
      </Suspense>
      <Preload all />
    </Canvas>
  );
});

export default ComputersCanvas;
