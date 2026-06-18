"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const SERVICES = [
  {
    id: "meta-ads",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0H3" />
      </svg>
    ),
    title: "Meta Ads Management",
    description:
      "Full-service Meta advertising across Facebook and Instagram. Campaign architecture, creative testing, audience strategy, and bid optimization — all managed to maximize your return on ad spend.",
    benefits: [
      "Structured campaign architecture built for scale",
      "Systematic creative testing frameworks",
      "Audience segmentation and lookalike strategies",
      "Weekly performance analysis and iteration",
    ],
    outcome: "Lower cost-per-acquisition and higher ROAS within 60–90 days of optimization.",
    color: "blue",
  },
  {
    id: "lead-gen",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
    title: "Lead Generation Systems",
    description:
      "End-to-end lead generation infrastructure connecting your paid ads to a qualified pipeline. We design, build, and operate the systems that turn traffic into revenue.",
    benefits: [
      "Multi-channel lead capture architecture",
      "CRM integration and pipeline setup",
      "Lead scoring and qualification frameworks",
      "Automated nurture sequences",
    ],
    outcome: "A predictable, measurable flow of qualified leads into your pipeline every month.",
    color: "violet",
  },
  {
    id: "landing-pages",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
      </svg>
    ),
    title: "Landing Page Optimization",
    description:
      "Conversion-focused landing pages designed and tested to turn paid traffic into leads and customers. Every element is grounded in user psychology and A/B testing data.",
    benefits: [
      "Conversion-first page design and copy",
      "A/B and multivariate testing programs",
      "Page speed and technical CRO",
      "Mobile-first optimization",
    ],
    outcome: "Higher conversion rates mean lower CAC across every channel you run.",
    color: "emerald",
  },
  {
    id: "ai-automation",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
      </svg>
    ),
    title: "AI Follow-Up Automation",
    description:
      "Intelligent follow-up sequences that contact, qualify, and nurture leads automatically — without sounding robotic. Powered by AI and connected to your existing stack.",
    benefits: [
      "Instant lead response via SMS, email, and voice",
      "AI-powered personalized follow-up sequences",
      "Appointment scheduling automation",
      "Full audit trail and analytics",
    ],
    outcome: "Dramatically higher lead-to-appointment rates by responding faster and more persistently.",
    color: "amber",
  },
  {
    id: "creative",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
      </svg>
    ),
    title: "Creative Strategy",
    description:
      "Ad creative that stops the scroll and converts. We develop creative frameworks, test angles, and iterate based on performance data — not design preferences.",
    benefits: [
      "Data-backed creative frameworks and hooks",
      "Systematic angle and format testing",
      "Performance creative briefs and scripts",
      "Creative fatigue monitoring and rotation",
    ],
    outcome: "Creative systems that produce winning ads consistently, reducing the guesswork from your pipeline.",
    color: "pink",
  },
  {
    id: "analytics",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
      </svg>
    ),
    title: "Analytics & Reporting",
    description:
      "Clear, actionable reporting that connects ad spend to revenue. Custom dashboards, attribution modelling, and strategic recommendations delivered weekly.",
    benefits: [
      "Custom real-time performance dashboards",
      "Multi-touch attribution modelling",
      "Weekly performance summary and insights",
      "Monthly strategic review and roadmap",
    ],
    outcome: "Full visibility into what's working, what's not, and what to do next.",
    color: "cyan",
  },
];

const COLOR_MAP: Record<string, string> = {
  blue: "bg-blue-500/10 border-blue-500/20 text-blue-400",
  violet: "bg-violet-500/10 border-violet-500/20 text-violet-400",
  emerald: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
  amber: "bg-amber-500/10 border-amber-500/20 text-amber-400",
  pink: "bg-pink-500/10 border-pink-500/20 text-pink-400",
  cyan: "bg-cyan-500/10 border-cyan-500/20 text-cyan-400",
};

function ServiceCard({ service, index }: { service: (typeof SERVICES)[0]; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const iconClass = COLOR_MAP[service.color] ?? COLOR_MAP.blue;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className="group glass glass-hover rounded-xl overflow-hidden cursor-pointer"
      onClick={() => setExpanded(!expanded)}
    >
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className={`w-11 h-11 rounded-lg border flex items-center justify-center flex-shrink-0 ${iconClass}`}>
            {service.icon}
          </div>
          <motion.div
            animate={{ rotate: expanded ? 45 : 0 }}
            transition={{ duration: 0.2 }}
            className="mt-0.5 text-zinc-600 group-hover:text-zinc-400 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </motion.div>
        </div>

        <div className="mt-4">
          <h3 className="text-base font-semibold text-white mb-2">{service.title}</h3>
          <p className="text-sm text-zinc-500 leading-relaxed">{service.description}</p>
        </div>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="mt-5 pt-5 border-t border-white/[0.06]">
                <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">
                  What's included
                </p>
                <ul className="space-y-2 mb-5">
                  {service.benefits.map((b) => (
                    <li key={b} className="flex items-start gap-2.5 text-sm text-zinc-400">
                      <svg className="w-4 h-4 text-zinc-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      {b}
                    </li>
                  ))}
                </ul>
                <div className="rounded-lg bg-white/[0.03] border border-white/[0.06] px-4 py-3">
                  <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1">
                    Expected Outcome
                  </p>
                  <p className="text-sm text-zinc-300 leading-relaxed">{service.outcome}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="services" className="relative py-28 bg-[#09090b]">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div ref={ref} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-4"
          >
            <span className="text-xs font-semibold tracking-widest text-zinc-500 uppercase">
              Services
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="text-3xl md:text-4xl font-bold text-white tracking-tight"
          >
            What We Do
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-4 text-zinc-400 max-w-xl mx-auto text-base leading-relaxed"
          >
            A focused suite of services built around one goal: more qualified
            customers at a cost that makes your business more profitable.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
