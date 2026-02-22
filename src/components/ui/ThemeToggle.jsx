import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";

const spring = { type: "spring", stiffness: 400, damping: 28 };

function SunIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-brand-text"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-brand-text"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

export function ThemeToggle() {
  const { theme, setTheme, resolvedDark } = useTheme();

  const toggle = () => {
    setTheme(resolvedDark ? "light" : "dark");
  };

  return (
    <motion.button
      type="button"
      aria-label={resolvedDark ? "Switch to light mode" : "Switch to dark mode"}
      className="relative flex h-10 w-10 items-center justify-center rounded-full bg-brand-surface border border-brand-border shadow-premium dark:shadow-none focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:ring-offset-2 focus-visible:ring-offset-brand-bg transition-shadow duration-300"
      onClick={toggle}
      whileTap={{ scale: 0.96 }}
      transition={spring}
    >
      <span className="relative flex h-5 w-5 items-center justify-center">
        <motion.span
          className="absolute inset-0 flex items-center justify-center"
          initial={false}
          animate={{
            opacity: resolvedDark ? 0 : 1,
            scale: resolvedDark ? 0.5 : 1,
            rotate: resolvedDark ? -90 : 0,
          }}
          transition={spring}
        >
          <SunIcon />
        </motion.span>
        <motion.span
          className="absolute inset-0 flex items-center justify-center"
          initial={false}
          animate={{
            opacity: resolvedDark ? 1 : 0,
            scale: resolvedDark ? 1 : 0.5,
            rotate: resolvedDark ? 0 : 90,
          }}
          transition={spring}
        >
          <MoonIcon />
        </motion.span>
      </span>
    </motion.button>
  );
}
