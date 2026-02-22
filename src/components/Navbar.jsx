import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { styles } from "../styles";
import { navLinks } from "../constants";
import { logo, menu, close } from "../assets";
import { ThemeToggle } from "./ui";

const SCROLL_THRESHOLD = 100;

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > SCROLL_THRESHOLD);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const handleLogoClick = useCallback(() => {
    setActive("");
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  const handleNavClick = useCallback((title) => {
    setActive(title);
    setToggle(false);
  }, []);

  return (
    <nav
      className={`${styles.paddingX} w-full flex items-center py-5 fixed top-0 z-20 transition-all duration-300 border-b ${
        scrolled
          ? "bg-brand-bg/95 dark:bg-brand-bg/95 backdrop-blur-xl border-black/[0.08] dark:border-brand-border/50 shadow-premium-nav dark:shadow-none"
          : "bg-brand-bg/80 dark:bg-transparent backdrop-blur-md border-black/[0.06] dark:border-transparent"
      }`}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={handleLogoClick}
        >
          <img src={logo} alt="Portfolio logo" width={36} height={36} className="w-9 h-9 object-contain" fetchPriority="high" />
          <p className='text-brand-text text-[18px] font-bold cursor-pointer flex '>
            Satbir &nbsp;
            <span className='sm:block hidden'> | Developer</span>
          </p>
        </Link>

        <div className="hidden sm:flex items-center gap-6">
          <ThemeToggle />
          <ul className="list-none flex flex-row gap-10">
          {navLinks.map((nav) => (
            <li
              key={nav.id}
              className={`${
                active === nav.title ? "text-brand-text" : "text-brand-text-muted"
              } hover:text-brand-text text-[18px] font-medium cursor-pointer`}
              onClick={() => setActive(nav.title)}
            >
              <a href={`#${nav.id}`}>{nav.title}</a>
            </li>
          ))}
        </ul>
        </div>

        <div className="sm:hidden flex flex-1 justify-end items-center gap-3">
          <ThemeToggle />
          <button
            type="button"
            aria-label={toggle ? "Close menu" : "Open menu"}
            className="p-0 border-0 bg-transparent cursor-pointer"
            onClick={() => setToggle((t) => !t)}
          >
            <img
              src={toggle ? close : menu}
              alt=""
              className="w-[28px] h-[28px] object-contain"
            />
          </button>

          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } p-6 bg-brand-surface border border-brand-border absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}
          >
            <ul className="list-none flex justify-end items-start flex-1 flex-col gap-4">
              {navLinks.map((nav) => (
                <li
                  key={nav.id}
                  className={`font-poppins font-medium cursor-pointer text-[16px] ${
                    active === nav.title ? "text-brand-text" : "text-brand-text-muted"
                  }`}
                  onClick={() => handleNavClick(nav.title)}
                >
                  <a href={`#${nav.id}`}>{nav.title}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
