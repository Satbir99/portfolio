import React, { Suspense, useEffect, memo } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import * as THREE from "three";

import { usePerformanceTier } from "../../hooks/useDPR";
import CanvasLoader from "../Loader";
import { useThemeColors } from "../../hooks/useThemeColors";

function SceneBgSync() {
  const { scene } = useThree();
  const { background } = useThemeColors();
  useEffect(() => {
    scene.background = new THREE.Color(background);
  }, [scene, background]);
  return null;
}

const Earth = memo(function Earth() {
  const { scene } = useGLTF("./planet/scene.gltf");
  return <primitive object={scene} scale={2.5} position-y={0} rotation-y={0} />;
});

const EarthCanvas = memo(function EarthCanvas() {
  const perf = usePerformanceTier();
  const shadows = !perf.isMobile;

  return (
    <Canvas
      shadows={shadows}
      frameloop="demand"
      dpr={[1, perf.dpr]}
      gl={{
        preserveDrawingBuffer: false,
        antialias: true,
        powerPreference: "default",
        stencil: false,
      }}
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [-4, 3, 6],
      }}
    >
      <SceneBgSync />
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          autoRotate
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Earth />
        <Preload all />
      </Suspense>
    </Canvas>
  );
});

export default EarthCanvas;
