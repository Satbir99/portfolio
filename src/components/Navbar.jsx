import React, { useCallback, useEffect, useState, useRef, memo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import { styles } from "../styles";
import { navLinks } from "../constants";
import { logo, menu, close } from "../assets";
import { ThemeToggle } from "./ui";

const SCROLL_THRESHOLD = 100;

const navLinkBaseClass = "font-medium cursor-pointer";
const navLinkActiveClass = "text-brand-text";
const navLinkInactiveClass = "text-brand-text-muted hover:text-brand-text";

function NavLinks({ active, onSelect, className = "", isMobile }) {
  return (
    <ul className={className}>
      {navLinks.map((nav) => (
        <li
          key={nav.id}
          className={`${navLinkBaseClass} ${active === nav.title ? navLinkActiveClass : navLinkInactiveClass} ${isMobile ? "text-[18px]" : "text-[16px] lg:text-[18px]"}`}
          onClick={() => onSelect(nav.title)}
        >
          <a href={`#${nav.id}`}>{nav.title}</a>
        </li>
      ))}
    </ul>
  );
}

const Navbar = memo(function Navbar() {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const drawerRef = useRef(null);
  const menuButtonRef = useRef(null);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > SCROLL_THRESHOLD);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Body scroll lock when mobile/tablet menu is open
  useEffect(() => {
    if (toggle) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [toggle]);

  // Close on Escape
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") setToggle(false);
    };
    if (toggle) {
      window.addEventListener("keydown", onKeyDown);
      return () => window.removeEventListener("keydown", onKeyDown);
    }
  }, [toggle]);

  // Close on click outside drawer (excluding the menu button)
  useEffect(() => {
    if (!toggle) return;
    const handleClick = (e) => {
      if (menuButtonRef.current?.contains(e.target)) return;
      if (drawerRef.current && !drawerRef.current.contains(e.target)) setToggle(false);
    };
    window.addEventListener("pointerdown", handleClick);
    return () => window.removeEventListener("pointerdown", handleClick);
  }, [toggle]);

  const handleLogoClick = useCallback(() => {
    setActive("");
    setToggle(false);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  const handleNavClick = useCallback((title) => {
    setActive(title);
    setToggle(false);
  }, []);

  const navClassName = scrolled
    ? "lg:bg-brand-bg/98 lg:dark:bg-brand-bg/98 lg:backdrop-blur-xl lg:border-black/[0.08] lg:dark:border-brand-border/50 lg:shadow-premium-nav lg:dark:shadow-none"
    : "lg:bg-brand-bg/98 lg:dark:bg-brand-bg/95 lg:backdrop-blur-xl lg:border-black/[0.06] lg:dark:border-brand-border/40 lg:shadow-[0_1px_0_rgba(0,0,0,0.04)] lg:dark:shadow-none";

  return (
    <nav
      className={`${styles.paddingX} w-full max-w-full min-w-0 left-0 right-0 flex items-center py-4 sm:py-5 fixed top-0 z-30 transition-composited border-b border-brand-border/50 dark:border-brand-border/40 bg-brand-bg dark:bg-brand-bg ${navClassName}`}
      role="navigation"
      aria-label="Main"
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        <Link to="/" className="flex items-center gap-2 min-w-0" onClick={handleLogoClick}>
          <img
            src={logo}
            alt="Satbir Singh portfolio logo"
            width={36}
            height={36}
            className="w-8 h-8 sm:w-9 sm:h-9 object-contain shrink-0"
            fetchpriority="high"
            decoding="async"
          />
          <p className="text-brand-text text-[16px] sm:text-[18px] font-bold cursor-pointer flex truncate">
            Satbir&nbsp;
            <span className="hidden lg:inline">| Developer</span>
          </p>
        </Link>

        {/* Desktop nav: from lg (1024px) up — hamburger below to avoid overlap with hero */}
        <div className="hidden lg:flex items-center gap-4 xl:gap-8">
          <ThemeToggle />
          <NavLinks active={active} onSelect={setActive} className="list-none flex flex-row flex-nowrap gap-6 xl:gap-10" isMobile={false} />
        </div>

        {/* Mobile & tablet: hamburger + slide-out drawer (up to lg) */}
        <div className="lg:hidden flex flex-1 justify-end items-center gap-2 min-w-0 pl-2">
          <ThemeToggle />
          <button
            ref={menuButtonRef}
            type="button"
            aria-label={toggle ? "Close menu" : "Open menu"}
            aria-expanded={toggle}
            aria-controls="nav-drawer"
            className="p-2 -m-2 border-0 bg-transparent cursor-pointer touch-manipulation rounded-lg hover:bg-brand-surface focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-text-muted/40"
            onClick={() => setToggle((t) => !t)}
          >
            <img
              src={toggle ? close : menu}
              alt=""
              width={28}
              height={28}
              className="w-7 h-7 object-contain brightness-0 dark:brightness-100"
              aria-hidden
            />
          </button>

          <AnimatePresence>
            {toggle && (
              <>
                <motion.div
                  id="nav-drawer-backdrop"
                  role="presentation"
                  aria-hidden="true"
                  className="fixed inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm z-30 top-0 left-0 lg:hidden"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setToggle(false)}
                />
                <motion.aside
                  id="nav-drawer"
                  ref={drawerRef}
                  role="dialog"
                  aria-modal="true"
                  aria-label="Navigation menu"
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ type: "tween", duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
                  className="fixed top-0 right-0 bottom-0 w-full max-w-[min(320px,85vw)] bg-brand-surface dark:bg-brand-bg border-l border-brand-border shadow-premium-lg z-40 flex flex-col pt-[var(--navbar-height,5rem)] px-6 pb-8 lg:hidden"
                >
                  <NavLinks
                    active={active}
                    onSelect={handleNavClick}
                    className="list-none flex flex-col gap-1 mt-4"
                    isMobile
                  />
                </motion.aside>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
});

export default Navbar;
