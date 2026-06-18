"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function Booking() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const calendlyUrl =
    process.env.NEXT_PUBLIC_CALENDLY_URL ??
    "https://calendly.com/vantax/strategy-call";

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <section id="booking" className="relative py-28 bg-[#09090b]">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-950/15 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-8">
        <div ref={ref} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-4"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/10 text-blue-400 text-xs font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              Available this week
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="text-3xl md:text-4xl font-bold text-white tracking-tight"
          >
            Book a Strategy Call
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-4 text-zinc-400 max-w-xl mx-auto text-base"
          >
            30 minutes. No pitch, no pressure. We'll audit your current
            situation and outline exactly what we'd do to grow your business.
          </motion.p>
        </div>

        {/* What to expect */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12 max-w-3xl mx-auto"
        >
          {[
            {
              step: "01",
              title: "Analyze",
              desc: "We review your current marketing setup and ask the right questions.",
            },
            {
              step: "02",
              title: "Identify",
              desc: "We pinpoint the highest-leverage opportunities specific to your business.",
            },
            {
              step: "03",
              title: "Outline",
              desc: "We explain exactly what we'd do and what results you could expect.",
            },
          ].map((item) => (
            <div
              key={item.step}
              className="glass rounded-xl p-5 border border-white/[0.06] text-center"
            >
              <div className="text-xs font-mono text-zinc-600 mb-2">{item.step}</div>
              <div className="text-sm font-semibold text-white mb-2">{item.title}</div>
              <div className="text-xs text-zinc-500 leading-relaxed">{item.desc}</div>
            </div>
          ))}
        </motion.div>

        {/* Calendly embed */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="glass rounded-2xl border border-white/[0.08] overflow-hidden p-2"
        >
          <div
            className="calendly-inline-widget w-full"
            data-url={`${calendlyUrl}?hide_gdpr_banner=1&background_color=0d0d0f&text_color=fafafa&primary_color=3b82f6`}
            style={{ minWidth: "320px", height: "700px" }}
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center text-xs text-zinc-600 mt-5"
        >
          Prefer email? Reach us at{" "}
          <a href="mailto:hello@vantax.agency" className="text-zinc-400 hover:text-white transition-colors underline underline-offset-2">
            hello@vantax.agency
          </a>
        </motion.p>
      </div>
    </section>
  );
}
