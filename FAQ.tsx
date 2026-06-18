"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const FAQS = [
  {
    q: "How does VantaX price its services?",
    a: "Our pricing depends on the scope of work, ad spend managed, and services required. We don't publish flat rates because every business is different — a strategy call lets us scope the engagement properly and give you an accurate number. We don't work on performance-only models, as that creates misaligned incentives around spend.",
  },
  {
    q: "What's the minimum ad spend required to work with VantaX?",
    a: "We typically work with businesses spending at least $2,000–$3,000 per month on paid ads, or businesses with a clear plan to reach that level within 30 days. Below that threshold, the margin for optimization is too thin to deliver meaningful results. Our free audit can help clarify whether you're ready.",
  },
  {
    q: "How do you communicate with clients throughout the engagement?",
    a: "All clients get a dedicated Slack channel for async communication, a weekly written performance report, and a monthly strategy call. For urgent issues, we respond within 4 business hours. We believe communication is a core part of the service — not an afterthought.",
  },
  {
    q: "When can I expect to see results?",
    a: "Paid advertising requires a learning period. Realistically, you should expect to see meaningful performance improvements in 60–90 days. Some campaigns respond faster; others take longer depending on audience size, product complexity, and how much data exists. We'll set clear expectations during onboarding and track progress against defined KPIs.",
  },
  {
    q: "How long does onboarding take before campaigns are live?",
    a: "Our onboarding and launch process takes 2–4 weeks from signing. This covers account access, tracking setup, strategy development, creative production, and campaign configuration. We move methodically because a well-built foundation compounds over time — rushing it creates technical debt that costs more later.",
  },
  {
    q: "What industries do you work with?",
    a: "We work with businesses in e-commerce, SaaS, professional services, home services, education, and B2B lead generation. The core skills — campaign architecture, conversion optimization, and data analysis — translate across verticals. We'll let you know during the discovery call if we think your category isn't a fit.",
  },
  {
    q: "What does reporting look like and how often do I receive it?",
    a: "Every client receives a live reporting dashboard (Google Data Studio or similar) that updates in real time, plus a structured weekly written report covering spend, results, and the key decisions made that week. Monthly strategy reviews connect the data back to your business goals and outline what's planned for the next period.",
  },
  {
    q: "What does the onboarding process actually look like step by step?",
    a: "After signing, we conduct a thorough discovery session, request access to your ad accounts and analytics, complete our audit, and build your 90-day strategy. We then schedule a strategy presentation where we walk through the plan before anything goes live. You approve the direction before we spend a dollar.",
  },
  {
    q: "What's included in the free growth audit?",
    a: "The free audit covers your ad account structure and efficiency, landing page conversion rate, funnel architecture, and follow-up sequences. We deliver a written report identifying the three highest-leverage opportunities we see, and we walk through it with you on a call. There's no obligation to work with us afterward.",
  },
  {
    q: "What kind of support is available after launch?",
    a: "Support doesn't stop at launch — that's when the real work begins. You have direct Slack access to your account team, weekly reports, and a dedicated point of contact. We monitor campaigns daily, flag issues proactively, and iterate without waiting to be asked. You're never chasing us for updates.",
  },
];

function FAQItem({ faq, index }: { faq: (typeof FAQS)[0]; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
      className="border-b border-white/[0.06]"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-6 py-6 text-left group"
        aria-expanded={open}
      >
        <span className={`text-sm md:text-base font-medium leading-relaxed transition-colors ${open ? "text-white" : "text-zinc-300 group-hover:text-white"}`}>
          {faq.q}
        </span>
        <motion.div
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className={`flex-shrink-0 w-6 h-6 rounded-full border flex items-center justify-center transition-all mt-0.5 ${
            open
              ? "border-white/20 bg-white/10 text-white"
              : "border-white/10 text-zinc-600 group-hover:border-white/15 group-hover:text-zinc-400"
          }`}
        >
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </motion.div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-sm text-zinc-400 leading-relaxed max-w-3xl">
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const handleNav = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <section id="faq" className="relative py-28 bg-[#09090b]">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

      <div className="max-w-4xl mx-auto px-6 md:px-8">
        <div ref={ref} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-4"
          >
            <span className="text-xs font-semibold tracking-widest text-zinc-500 uppercase">
              FAQ
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="text-3xl md:text-4xl font-bold text-white tracking-tight"
          >
            Common Questions
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-4 text-zinc-400 text-base"
          >
            Straightforward answers to what businesses ask us most.
          </motion.p>
        </div>

        {/* FAQ list */}
        <div>
          {FAQS.map((faq, i) => (
            <FAQItem key={faq.q} faq={faq} index={i} />
          ))}
        </div>

        {/* CTA below */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-zinc-500 text-sm mb-5">
            Have a question not answered here?
          </p>
          <button
            onClick={() => handleNav("#contact")}
            className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-300 border border-white/10 px-6 py-3 rounded-xl hover:bg-white/5 hover:text-white hover:border-white/20 transition-all"
          >
            Ask Us Directly →
          </button>
        </motion.div>
      </div>
    </section>
  );
}
