import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { useThemeColors } from "../../hooks/useThemeColors";
import * as THREE from "three";

/**
 * Syncs R3F scene with theme: background, fog, and (optionally) exposure for bloom feel.
 * Use inside Canvas. Theme colors come from useThemeColors (ThemeProvider must wrap the app).
 */
export function SceneThemeSync() {
  const { scene } = useThree();
  const colors = useThemeColors();

  useEffect(() => {
    scene.background = new THREE.Color(colors.background);
  }, [scene, colors.background]);

  useEffect(() => {
    if (!scene.fog) scene.fog = new THREE.FogExp2(colors.fog, 0.015);
    else {
      scene.fog.color.set(colors.fog);
    }
  }, [scene, colors.fog]);

  return null;
}
