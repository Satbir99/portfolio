import { useMemo } from "react";
import { useTheme } from "../context/ThemeContext";

/** Hex values for syncing Three.js scene with current theme */
export interface ThemeColors3D {
  /** scene.background, fog color */
  background: string;
  /** fog color (same as background or slightly tinted) */
  fog: string;
  /** ambient / fill light color */
  ambient: string;
  /** main "physical" light: warm in light mode, cool dim in dark (e.g. sun vs neon) */
  keyLight: string;
  /** key light intensity (higher in light, lower in dark) */
  keyLightIntensity: number;
  /** point/spot intensity */
  pointLightIntensity: number;
  /** material emissive color for accents */
  emissive: string;
  /** emissive intensity */
  emissiveIntensity: number;
  /** bloom intensity (stronger in dark for neon feel) */
  bloomIntensity: number;
  /** color for stars/points in the stars canvas (visible on both light and dark backgrounds) */
  starsColor: string;
  /** point size for stars (slightly larger in light mode for visibility) */
  starsSize: number;
}

const LIGHT_THEME_3D: ThemeColors3D = {
  background: "#f8fafc",
  fog: "#e2e8f0",
  ambient: "#f1f5f9",
  keyLight: "#FFFBEB",
  keyLightIntensity: 1.2,
  pointLightIntensity: 1,
  emissive: "#56ccf2",
  emissiveIntensity: 0.15,
  bloomIntensity: 0.3,
  starsColor: "#4338ca",
  starsSize: 0.0032,
};

const DARK_THEME_3D: ThemeColors3D = {
  background: "#050816",
  fog: "#0f172a",
  ambient: "#151030",
  keyLight: "#1E293B",
  keyLightIntensity: 0.5,
  pointLightIntensity: 0.8,
  emissive: "#56ccf2",
  emissiveIntensity: 0.4,
  bloomIntensity: 1.2,
  starsColor: "#a5b4fc",
  starsSize: 0.002,
};

export function useThemeColors(): ThemeColors3D {
  const { resolvedDark } = useTheme();
  return useMemo(
    () => (resolvedDark ? DARK_THEME_3D : LIGHT_THEME_3D),
    [resolvedDark]
  );
}
