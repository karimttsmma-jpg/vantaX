"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { contactSchema, type ContactFormData } from "@/lib/validations";

const AD_SPEND_OPTIONS = [
  { value: "", label: "Select monthly ad spend" },
  { value: "under-1k", label: "Under $1,000/mo" },
  { value: "1k-5k", label: "$1,000 – $5,000/mo" },
  { value: "5k-10k", label: "$5,000 – $10,000/mo" },
  { value: "10k-25k", label: "$10,000 – $25,000/mo" },
  { value: "25k-50k", label: "$25,000 – $50,000/mo" },
  { value: "50k-plus", label: "$50,000+/mo" },
];

const INPUT_CLASS =
  "w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/20 focus:bg-white/[0.06] transition-all duration-150";

type FormState = "idle" | "loading" | "success" | "error";

export default function Contact() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { adSpend: "" },
  });

  const onSubmit = async (data: ContactFormData) => {
    setFormState("loading");
    setErrorMessage("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) {
        setErrorMessage(json.error ?? "Something went wrong. Please try again.");
        setFormState("error");
        return;
      }
      setFormState("success");
      reset();
    } catch {
      setErrorMessage("Network error. Please check your connection and try again.");
      setFormState("error");
    }
  };

  return (
    <section id="contact" className="relative py-28 bg-[#09090b]">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-5 gap-16">
          {/* Left: Copy */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="mb-4"
            >
              <span className="text-xs font-semibold tracking-widest text-zinc-500 uppercase">
                Contact
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-6"
            >
              Start the Conversation
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-zinc-400 leading-relaxed mb-8"
            >
              Tell us about your business and goals. We'll review your details
              and get back to you within one business day to schedule a
              discovery call.
            </motion.p>

            {/* Contact details */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-5"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-zinc-400 flex-shrink-0">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-zinc-500 mb-0.5">Email</p>
                  <a href="mailto:hello@vantax.agency" className="text-sm text-zinc-300 hover:text-white transition-colors">
                    hello@vantax.agency
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-zinc-400 flex-shrink-0">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-zinc-500 mb-0.5">Response time</p>
                  <p className="text-sm text-zinc-300">Within 1 business day</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="lg:col-span-3"
          >
            <div className="glass rounded-2xl border border-white/[0.08] p-8">
              {formState === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mx-auto mb-5">
                    <svg className="w-7 h-7 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Message Sent</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed max-w-sm mx-auto">
                    We've received your message and will respond within 1 business day. Check your inbox for a confirmation.
                  </p>
                  <button
                    onClick={() => setFormState("idle")}
                    className="mt-6 text-sm text-zinc-500 hover:text-zinc-300 transition-colors underline underline-offset-2"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
                  {/* Row 1 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-zinc-400 mb-1.5">
                        Full Name <span className="text-zinc-600">*</span>
                      </label>
                      <input
                        {...register("name")}
                        placeholder="Alex Johnson"
                        autoComplete="name"
                        className={INPUT_CLASS}
                        aria-invalid={!!errors.name}
                      />
                      {errors.name && (
                        <p role="alert" className="mt-1.5 text-xs text-red-400">{errors.name.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-zinc-400 mb-1.5">
                        Company <span className="text-zinc-600">*</span>
                      </label>
                      <input
                        {...register("company")}
                        placeholder="Acme Inc."
                        autoComplete="organization"
                        className={INPUT_CLASS}
                        aria-invalid={!!errors.company}
                      />
                      {errors.company && (
                        <p role="alert" className="mt-1.5 text-xs text-red-400">{errors.company.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Row 2 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-zinc-400 mb-1.5">
                        Business Email <span className="text-zinc-600">*</span>
                      </label>
                      <input
                        {...register("email")}
                        type="email"
                        placeholder="alex@acme.com"
                        autoComplete="email"
                        className={INPUT_CLASS}
                        aria-invalid={!!errors.email}
                      />
                      {errors.email && (
                        <p role="alert" className="mt-1.5 text-xs text-red-400">{errors.email.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-zinc-400 mb-1.5">Phone</label>
                      <input
                        {...register("phone")}
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        autoComplete="tel"
                        className={INPUT_CLASS}
                        aria-invalid={!!errors.phone}
                      />
                      {errors.phone && (
                        <p role="alert" className="mt-1.5 text-xs text-red-400">{errors.phone.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Row 3 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-zinc-400 mb-1.5">Website</label>
                      <input
                        {...register("website")}
                        placeholder="https://acme.com"
                        autoComplete="url"
                        className={INPUT_CLASS}
                        aria-invalid={!!errors.website}
                      />
                      {errors.website && (
                        <p role="alert" className="mt-1.5 text-xs text-red-400">{errors.website.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-zinc-400 mb-1.5">
                        Monthly Ad Spend <span className="text-zinc-600">*</span>
                      </label>
                      <select
                        {...register("adSpend")}
                        className={`${INPUT_CLASS} appearance-none`}
                        aria-invalid={!!errors.adSpend}
                      >
                        {AD_SPEND_OPTIONS.map((o) => (
                          <option key={o.value} value={o.value} className="bg-zinc-900 text-white">
                            {o.label}
                          </option>
                        ))}
                      </select>
                      {errors.adSpend && (
                        <p role="alert" className="mt-1.5 text-xs text-red-400">{errors.adSpend.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-medium text-zinc-400 mb-1.5">
                      Message <span className="text-zinc-600">*</span>
                    </label>
                    <textarea
                      {...register("message")}
                      rows={5}
                      placeholder="Tell us about your business, your goals, and what you're currently running for paid ads..."
                      className={`${INPUT_CLASS} resize-none`}
                      aria-invalid={!!errors.message}
                    />
                    {errors.message && (
                      <p role="alert" className="mt-1.5 text-xs text-red-400">{errors.message.message}</p>
                    )}
                  </div>

                  {/* Error state */}
                  {formState === "error" && (
                    <div
                      role="alert"
                      className="rounded-lg bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-400"
                    >
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
                        Sending...
                      </>
                    ) : (
                      "Send Message →"
                    )}
                  </button>

                  <p className="text-xs text-zinc-600 text-center">
                    We'll respond within 1 business day. Your information is kept private and never shared.
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
