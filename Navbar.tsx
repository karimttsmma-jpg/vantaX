"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";

const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();

  const navOpacity = useTransform(scrollY, [0, 80], [0, 1]);

  useEffect(() => {
    const unsub = scrollY.on("change", (v) => setIsScrolled(v > 20));
    return unsub;
  }, [scrollY]);

  const handleNav = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50">
        {/* Blur backdrop */}
        <motion.div
          style={{ opacity: navOpacity }}
          className="absolute inset-0 bg-[#09090b]/80 backdrop-blur-xl border-b border-white/5"
        />

        <nav className="relative max-w-7xl mx-auto px-6 md:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group"
            aria-label="VantaX Home"
          >
            <div className="relative w-8 h-8 flex items-center justify-center">
              <svg
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8"
              >
                <path
                  d="M4 6L13 26L16 19L19 26L28 6"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M22 6L28 6L28 12"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="font-bold text-white tracking-tight text-[17px]">
              VantaX
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNav(link.href)}
                className="px-4 py-2 text-sm text-zinc-400 hover:text-white transition-colors duration-150 rounded-md hover:bg-white/5"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => handleNav("#audit")}
              className="text-sm text-zinc-400 hover:text-white transition-colors duration-150 px-4 py-2"
            >
              Free Audit
            </button>
            <button
              onClick={() => handleNav("#booking")}
              className="inline-flex items-center gap-2 bg-white text-black text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-zinc-100 transition-all duration-150 group"
            >
              Book Strategy Call
              <svg
                className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden relative w-9 h-9 flex flex-col items-center justify-center gap-1.5"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
              className="block w-5 h-px bg-white origin-center transition-all"
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block w-5 h-px bg-white"
            />
            <motion.span
              animate={
                mobileOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }
              }
              className="block w-5 h-px bg-white origin-center transition-all"
            />
          </button>
        </nav>

        {/* Mobile menu */}
        <motion.div
          initial={false}
          animate={mobileOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
          className="md:hidden overflow-hidden bg-[#0d0d0f]/95 backdrop-blur-xl border-b border-white/5"
        >
          <div className="px-6 py-4 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNav(link.href)}
                className="text-left px-4 py-3 text-sm text-zinc-400 hover:text-white transition-colors rounded-md hover:bg-white/5"
              >
                {link.label}
              </button>
            ))}
            <div className="mt-3 pt-3 border-t border-white/5 flex flex-col gap-2">
              <button
                onClick={() => handleNav("#audit")}
                className="w-full text-sm text-zinc-300 font-medium py-3 px-4 rounded-lg border border-white/10 hover:bg-white/5 transition-all"
              >
                Get Free Audit
              </button>
              <button
                onClick={() => handleNav("#booking")}
                className="w-full text-sm font-semibold bg-white text-black py-3 px-4 rounded-lg hover:bg-zinc-100 transition-all"
              >
                Book Strategy Call
              </button>
            </div>
          </div>
        </motion.div>
      </header>
    </>
  );
}
