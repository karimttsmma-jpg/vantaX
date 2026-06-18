"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { auditSchema, type AuditFormData } from "@/lib/validations";

const AUDIT_ITEMS = [
  { label: "Ad Account", desc: "Campaign structure, spend efficiency, and performance gaps" },
  { label: "Funnel Architecture", desc: "End-to-end customer journey from click to conversion" },
  { label: "Landing Pages", desc: "Conversion rate analysis and optimization opportunities" },
  { label: "Follow-Up Process", desc: "Lead nurture sequences and response time assessment" },
  { label: "Conversion Flow", desc: "Bottlenecks reducing your overall conversion rate" },
];

const AD_SPEND_OPTIONS = [
  { value: "", label: "Select monthly ad spend" },
  { value: "under-1k", label: "Under $1,000/mo" },
  { value: "1k-5k", label: "$1,000 – $5,000/mo" },
  { value: "5k-10k", label: "$5,000 – $10,000/mo" },
  { value: "10k-25k", label: "$10,000 – $25,000/mo" },
  { value: "25k-50k", label: "$25,000 – $50,000/mo" },
  { value: "50k-plus", label: "$50,000+/mo" },
];

type FormState = "idle" | "loading" | "success" | "error";

export default function FreeAudit() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AuditFormData>({
    resolver: zodResolver(auditSchema),
    defaultValues: { adSpend: "" },
  });

  const onSubmit = async (data: AuditFormData) => {
    setFormState("loading");
    setErrorMessage("");
    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) {
        setErrorMessage(json.error ?? "Something went wrong.");
        setFormState("error");
        return;
      }
      setFormState("success");
      reset();
    } catch {
      setErrorMessage("Network error. Please try again.");
      setFormState("error");
    }
  };

  return (
    <section id="audit" className="relative py-28 bg-[#09090b]">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

      {/* Subtle background accent */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-blue-950/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-8">
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Value prop */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="mb-4"
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 text-xs font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                No cost. No commitment.
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight mb-6"
            >
              Get a Free Growth Audit
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-zinc-400 leading-relaxed mb-8"
            >
              We'll conduct a thorough analysis of your current marketing
              infrastructure — free of charge. You'll get a clear picture of
              what's holding back your growth, and what to do about it.
            </motion.p>

            {/* Audit items */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-4"
            >
              <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-4">
                We'll review
              </p>
              {AUDIT_ITEMS.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -16 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.25 + i * 0.07 }}
                  className="flex items-start gap-4 group"
                >
                  <div className="w-8 h-8 rounded-lg bg-white/[0.05] border border-white/[0.08] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg
                      className="w-4 h-4 text-zinc-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{item.label}</p>
                    <p className="text-sm text-zinc-500 mt-0.5">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Deliver */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-8 p-5 glass rounded-xl border border-white/[0.06]"
            >
              <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">
                You'll receive
              </p>
              <div className="grid grid-cols-3 gap-4 text-center">
                {["Bottlenecks", "Opportunities", "Recommendations"].map((d) => (
                  <div key={d} className="text-sm font-semibold text-white">{d}</div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="glass rounded-2xl border border-white/[0.08] p-8">
              {formState === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-5">
                    <svg className="w-7 h-7 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Audit Request Received</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    We'll review your information and be in touch within 1–2 business days to schedule your audit call.
                  </p>
                  <button
                    onClick={() => setFormState("idle")}
                    className="mt-6 text-sm text-zinc-500 hover:text-zinc-300 transition-colors underline underline-offset-2"
                  >
                    Submit another request
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-white mb-1">Request Your Free Audit</h3>
                    <p className="text-sm text-zinc-500">Takes 60 seconds. No spam, ever.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-zinc-400 mb-1.5">Full Name *</label>
                      <input
                        {...register("name")}
                        placeholder="Alex Johnson"
                        className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/20 focus:bg-white/[0.06] transition-all"
                      />
                      {errors.name && (
                        <p className="mt-1 text-xs text-red-400">{errors.name.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-zinc-400 mb-1.5">Company *</label>
                      <input
                        {...register("company")}
                        placeholder="Acme Inc."
                        className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/20 focus:bg-white/[0.06] transition-all"
                      />
                      {errors.company && (
                        <p className="mt-1 text-xs text-red-400">{errors.company.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-zinc-400 mb-1.5">Business Email *</label>
                    <input
                      {...register("email")}
                      type="email"
                      placeholder="alex@acme.com"
                      className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/20 focus:bg-white/[0.06] transition-all"
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-zinc-400 mb-1.5">Website</label>
                    <input
                      {...register("website")}
                      placeholder="https://acme.com"
                      className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/20 focus:bg-white/[0.06] transition-all"
                    />
                    {errors.website && (
                      <p className="mt-1 text-xs text-red-400">{errors.website.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-zinc-400 mb-1.5">Monthly Ad Spend *</label>
                    <select
                      {...register("adSpend")}
                      className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-white/20 focus:bg-white/[0.06] transition-all appearance-none"
                    >
                      {AD_SPEND_OPTIONS.map((o) => (
                        <option key={o.value} value={o.value} className="bg-zinc-900">
                          {o.label}
                        </option>
                      ))}
                    </select>
                    {errors.adSpend && (
                      <p className="mt-1 text-xs text-red-400">{errors.adSpend.message}</p>
                    )}
                  </div>

                  {formState === "error" && (
                    <div className="rounded-lg bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-400">
                      {errorMessage}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={formState === "loading"}
                    className="w-full bg-white text-black font-semibold text-sm py-3.5 px-6 rounded-xl hover:bg-zinc-100 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {formState === "loading" ? (
                      <>
                        <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Submitting...
                      </>
                    ) : (
                      "Request Free Growth Audit →"
                    )}
                  </button>

                  <p className="text-xs text-zinc-600 text-center">
                    By submitting, you agree to be contacted by our team. No spam, unsubscribe anytime.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
