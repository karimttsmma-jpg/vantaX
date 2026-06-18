"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const PHASES = [
  {
    number: "01",
    label: "Audit",
    title: "Deep-Dive Audit",
    duration: "Week 1–2",
    description:
      "We start by understanding your current state completely. Ad account analysis, funnel mapping, landing page review, and competitor intelligence. No guessing — only facts.",
    deliverables: [
      "Ad account performance audit",
      "Funnel gap analysis",
      "Landing page conversion audit",
      "Audience and creative assessment",
      "Competitor landscape review",
      "Bottleneck identification report",
    ],
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
      </svg>
    ),
  },
  {
    number: "02",
    label: "Strategy",
    title: "Growth Strategy",
    duration: "Week 2–3",
    description:
      "Based on the audit findings, we build a precise 90-day growth strategy. Channel mix, budget allocation, creative angles, funnel architecture, and automation flows.",
    deliverables: [
      "90-day growth roadmap",
      "Channel and budget strategy",
      "Creative framework and angles",
      "Funnel architecture design",
      "KPI targets and success metrics",
      "Automation blueprint",
    ],
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
      </svg>
    ),
  },
  {
    number: "03",
    label: "Launch",
    title: "Precision Launch",
    duration: "Week 3–4",
    description:
      "Meticulous campaign setup, tracking validation, and infrastructure deployment. We don't launch until we're confident the foundation is right. Every pixel, event, and automation is tested.",
    deliverables: [
      "Campaign and ad set structure setup",
      "Pixel and conversion tracking validation",
      "Landing page deployment and testing",
      "Automation sequences activated",
      "CRM integration and pipeline setup",
      "Baseline reporting dashboard live",
    ],
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
      </svg>
    ),
  },
  {
    number: "04",
    label: "Optimize",
    title: "Systematic Optimization",
    duration: "Month 2–3",
    description:
      "Data-driven iteration at every layer. We run structured experiments on creative, audiences, bids, and landing pages — building a compounding performance advantage.",
    deliverables: [
      "Weekly creative testing and iteration",
      "Audience expansion and lookalike testing",
      "Bid strategy optimization",
      "Landing page A/B testing",
      "Funnel conversion rate improvement",
      "Weekly performance analysis reports",
    ],
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
      </svg>
    ),
  },
  {
    number: "05",
    label: "Scale",
    title: "Controlled Scaling",
    duration: "Month 3+",
    description:
      "Once the system is profitable and predictable, we scale it. Budget increases, new creative angles, new audiences, and expanded channels — all while protecting margins.",
    deliverables: [
      "Structured budget scaling plan",
      "New audience and market expansion",
      "Creative volume and format expansion",
      "Cross-platform scaling strategy",
      "Monthly strategic growth review",
      "Long-term partnership roadmap",
    ],
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
      </svg>
    ),
  },
];

export default function GrowthFramework() {
  const [activePhase, setActivePhase] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="process" className="relative py-28 bg-[#09090b]">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* Header */}
        <div ref={ref} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-4"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.04] text-zinc-400 text-xs font-semibold tracking-wider uppercase">
              Proprietary Methodology
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="text-3xl md:text-4xl font-bold text-white tracking-tight"
          >
            The VantaX Growth Framework
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-4 text-zinc-400 max-w-2xl mx-auto text-base leading-relaxed"
          >
            A structured, repeatable operating system for customer acquisition.
            Five phases designed to take any business from uncertain ad spend
            to a predictable, scalable growth engine.
          </motion.p>
        </div>

        {/* Framework UI */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="glass rounded-2xl border border-white/[0.06] overflow-hidden"
        >
          {/* Phase tabs */}
          <div className="border-b border-white/[0.06] flex overflow-x-auto scrollbar-hide">
            {PHASES.map((phase, i) => (
              <button
                key={phase.number}
                onClick={() => setActivePhase(i)}
                className={`relative flex-1 min-w-[120px] px-6 py-5 text-left transition-all duration-200 ${
                  activePhase === i
                    ? "bg-white/[0.05]"
                    : "hover:bg-white/[0.02]"
                }`}
              >
                {activePhase === i && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-px bg-white"
                  />
                )}
                <div
                  className={`text-xs font-mono font-semibold mb-1 ${
                    activePhase === i ? "text-white" : "text-zinc-600"
                  }`}
                >
                  {phase.number}
                </div>
                <div
                  className={`text-sm font-semibold ${
                    activePhase === i ? "text-white" : "text-zinc-500"
                  }`}
                >
                  {phase.label}
                </div>
              </button>
            ))}
          </div>

          {/* Phase content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activePhase}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="p-8 md:p-12"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                {/* Left */}
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-white/[0.07] border border-white/[0.1] flex items-center justify-center text-zinc-300">
                      {PHASES[activePhase].icon}
                    </div>
                    <span className="text-xs font-mono text-zinc-500 bg-white/[0.05] px-3 py-1 rounded-full border border-white/[0.08]">
                      {PHASES[activePhase].duration}
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                    Phase {PHASES[activePhase].number} — {PHASES[activePhase].title}
                  </h3>
                  <p className="text-zinc-400 leading-relaxed text-base">
                    {PHASES[activePhase].description}
                  </p>

                  {/* Progress indicator */}
                  <div className="mt-8 flex items-center gap-2">
                    {PHASES.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActivePhase(i)}
                        className={`h-1 rounded-full transition-all duration-300 ${
                          i === activePhase
                            ? "w-8 bg-white"
                            : i < activePhase
                            ? "w-4 bg-zinc-500"
                            : "w-4 bg-zinc-800"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Right — deliverables */}
                <div>
                  <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-5">
                    Deliverables
                  </p>
                  <div className="space-y-3">
                    {PHASES[activePhase].deliverables.map((d, i) => (
                      <motion.div
                        key={d}
                        initial={{ opacity: 0, x: 16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.06 }}
                        className="flex items-center gap-3 glass rounded-lg px-4 py-3 border border-white/[0.04]"
                      >
                        <svg
                          className="w-4 h-4 text-zinc-500 flex-shrink-0"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="text-sm text-zinc-300">{d}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Navigation buttons below */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={() => setActivePhase((p) => Math.max(0, p - 1))}
            disabled={activePhase === 0}
            className="px-4 py-2 text-sm text-zinc-400 rounded-lg border border-white/10 hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            ← Previous
          </button>
          <button
            onClick={() => setActivePhase((p) => Math.min(PHASES.length - 1, p + 1))}
            disabled={activePhase === PHASES.length - 1}
            className="px-4 py-2 text-sm text-zinc-400 rounded-lg border border-white/10 hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            Next →
          </button>
        </div>
      </div>
    </section>
  );
}
