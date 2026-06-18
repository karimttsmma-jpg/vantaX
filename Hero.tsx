"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

function GrowthVisualization() {
  return (
    <div className="relative w-full max-w-2xl mx-auto aspect-[4/3] select-none">
      {/* Outer glow */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-radial from-blue-500/8 via-transparent to-transparent" />

      {/* Main chart container */}
      <div className="absolute inset-0 glass rounded-2xl overflow-hidden border border-white/[0.06]">
        {/* Grid lines */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.06]"
          preserveAspectRatio="none"
        >
          {[0, 25, 50, 75, 100].map((y) => (
            <line
              key={y}
              x1="0"
              y1={`${y}%`}
              x2="100%"
              y2={`${y}%`}
              stroke="white"
              strokeWidth="1"
            />
          ))}
          {[0, 20, 40, 60, 80, 100].map((x) => (
            <line
              key={x}
              x1={`${x}%`}
              y1="0"
              x2={`${x}%`}
              y2="100%"
              stroke="white"
              strokeWidth="1"
            />
          ))}
        </svg>

        {/* Chart SVG */}
        <svg
          viewBox="0 0 400 240"
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Area fill */}
          <motion.path
            d="M0,220 L40,200 L80,185 L120,165 L160,140 L200,110 L240,85 L280,65 L320,45 L360,30 L400,15 L400,240 L0,240 Z"
            fill="url(#areaGrad)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.5 }}
          />

          {/* Main line */}
          <motion.path
            d="M0,220 L40,200 L80,185 L120,165 L160,140 L200,110 L240,85 L280,65 L320,45 L360,30 L400,15"
            fill="none"
            stroke="url(#lineGrad)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#glow)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, ease: "easeOut", delay: 0.3 }}
          />

          {/* Data points */}
          {[
            [40, 200], [120, 165], [200, 110], [280, 65], [360, 30],
          ].map(([x, y], i) => (
            <motion.circle
              key={i}
              cx={x}
              cy={y}
              r="4"
              fill="#3b82f6"
              stroke="#09090b"
              strokeWidth="2"
              filter="url(#glow)"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.8 + i * 0.15, duration: 0.3 }}
            />
          ))}
        </svg>

        {/* Metric cards overlay */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="absolute top-5 right-5 glass border border-white/[0.08] rounded-xl px-4 py-3"
        >
          <div className="text-xs text-zinc-500 mb-1">Revenue Growth</div>
          <div className="text-lg font-bold text-white flex items-center gap-1.5">
            <span className="text-emerald-400 text-sm">↑</span>
            247%
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.6 }}
          className="absolute bottom-5 left-5 glass border border-white/[0.08] rounded-xl px-4 py-3 flex items-center gap-3"
        >
          <div className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
            <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          <div>
            <div className="text-xs text-zinc-500">Avg. ROAS</div>
            <div className="text-sm font-bold text-white">4.8x</div>
          </div>
        </motion.div>

        {/* Animated pulse on latest point */}
        <motion.div
          className="absolute"
          style={{ top: "calc(6% - 6px)", right: "calc(0% - 6px)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
          </span>
        </motion.div>
      </div>

      {/* Floating metric pill */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2.0, duration: 0.5 }}
        className="absolute -left-8 top-1/3 glass border border-white/[0.08] rounded-full px-4 py-2 flex items-center gap-2 shadow-2xl"
      >
        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-xs font-medium text-zinc-300">Live Tracking</span>
      </motion.div>
    </div>
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const handleNav = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center pt-16 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[#09090b]">
        {/* Radial gradient center glow */}
        <div className="absolute inset-0 bg-gradient-radial from-blue-950/30 via-transparent to-transparent" />
        {/* Top vignette */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-8 py-24 flex flex-col items-center text-center"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.04] text-zinc-400 text-xs font-medium tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            Performance Marketing & AI Growth Systems
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.07] max-w-5xl"
        >
          Scale Revenue Through{" "}
          <span className="text-gradient-blue">Smarter</span>{" "}
          Customer Acquisition
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-6 text-lg md:text-xl text-zinc-400 max-w-2xl leading-relaxed"
        >
          VantaX helps businesses generate more customers through paid
          advertising, conversion optimization, and intelligent growth systems
          designed to maximize ROI.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-3"
        >
          <button
            onClick={() => handleNav("#booking")}
            className="group inline-flex items-center gap-2.5 bg-white text-black font-semibold text-sm px-6 py-3.5 rounded-xl hover:bg-zinc-100 transition-all duration-200 shadow-lg shadow-white/10"
          >
            Book Strategy Call
            <svg
              className="w-4 h-4 group-hover:translate-x-0.5 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </button>

          <button
            onClick={() => handleNav("#audit")}
            className="group inline-flex items-center gap-2 text-zinc-300 text-sm font-medium px-6 py-3.5 rounded-xl border border-white/10 hover:bg-white/5 hover:border-white/20 transition-all duration-200"
          >
            Get Free Growth Audit
          </button>
        </motion.div>

        {/* Trust signals */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-zinc-600"
        >
          {["No lock-in contracts", "Transparent reporting", "Data-driven decisions", "Fast onboarding"].map((item) => (
            <span key={item} className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              {item}
            </span>
          ))}
        </motion.div>

        {/* Visualization */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          className="mt-20 w-full max-w-3xl mx-auto px-4"
        >
          <GrowthVisualization />
        </motion.div>
      </motion.div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#09090b] to-transparent pointer-events-none" />
    </section>
  );
}
