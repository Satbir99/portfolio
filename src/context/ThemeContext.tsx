import React, {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

const THEME_STORAGE_KEY = "portfolio-theme";

export type ThemeMode = "light" | "dark";

export type ThemeContextValue = {
  theme: ThemeMode;
  setTheme: (mode: ThemeMode | "system") => void;
  resolvedDark: boolean;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function getSystemPrefersDark(): boolean {
  if (typeof window === "undefined") return true;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function readStoredTheme(): ThemeMode | "system" {
  if (typeof window === "undefined") return "system";
  const raw = localStorage.getItem(THEME_STORAGE_KEY);
  if (raw === "light" || raw === "dark" || raw === "system") return raw;
  return "system";
}

function resolveDark(mode: ThemeMode | "system"): boolean {
  if (mode === "light") return false;
  if (mode === "dark") return true;
  return getSystemPrefersDark();
}

function applyThemeToDocument(isDark: boolean): void {
  const root = document.documentElement;
  if (isDark) {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) {
    meta.setAttribute("content", isDark ? "#050816" : "#fafafa");
  }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeMode, setThemeModeState] = useState<ThemeMode | "system">(() =>
    readStoredTheme()
  );
  const [resolvedDark, setResolvedDark] = useState<boolean>(() =>
    resolveDark(themeMode)
  );

  useLayoutEffect(() => {
    const isDark = resolveDark(themeMode);
    setResolvedDark(isDark);
    applyThemeToDocument(isDark);
  }, [themeMode]);

  useLayoutEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      if (themeMode !== "system") return;
      const isDark = resolveDark("system");
      setResolvedDark(isDark);
      applyThemeToDocument(isDark);
    };
    mq.addEventListener("change", handleChange);
    return () => mq.removeEventListener("change", handleChange);
  }, [themeMode]);

  const setTheme = useCallback((mode: ThemeMode | "system") => {
    setThemeModeState(mode);
    localStorage.setItem(THEME_STORAGE_KEY, mode);
  }, []);

  const theme: ThemeMode = themeMode === "system" ? (resolvedDark ? "dark" : "light") : themeMode;

  const value = useMemo<ThemeContextValue>(
    () => ({ theme, setTheme, resolvedDark }),
    [theme, setTheme, resolvedDark]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
