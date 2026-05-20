"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import SectionEyebrow from "@/components/SectionEyebrow";
import Link from "next/link";
import { ArrowRight, Mail, Phone } from "lucide-react";

export default function ProjectsPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleNotify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setEmail("");
  };

  return (
    <div className="relative min-h-screen bg-charcoal text-cream overflow-hidden flex flex-col items-center justify-center pt-20">
      {/* Grain overlay */}
      <div className="grain-overlay" />

      {/* Radial gold glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-gold/5 blur-[140px]" />
        <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-gold/5 blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-blue-900/10 blur-[100px]" />
      </div>

      {/* Top & bottom accent lines */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 py-16 max-w-2xl mx-auto gap-8">

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <SectionEyebrow text="Projects Portfolio" className="justify-center" />
        </motion.div>

        {/* Big heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="flex flex-col items-center gap-4"
        >
          <h1 className="text-[clamp(64px,14vw,120px)] font-serif-luxury font-light leading-[0.95] tracking-tight">
            Coming
            <br />
            <span className="italic text-gold">Soon.</span>
          </h1>

          <div className="w-16 h-[1px] bg-gold/40 my-2" />

          <p className="text-warm-gray text-sm md:text-base font-light leading-relaxed max-w-md">
            Our projects portfolio is under construction. We are documenting our residential, commercial and industrial installations across India. Stay tuned.
          </p>
        </motion.div>

        {/* Notify Me form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="w-full max-w-md"
        >
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gold/10 border border-gold/30 rounded-xl p-5 text-center"
            >
              <p className="text-gold font-semibold text-sm uppercase tracking-wider">✓ We will notify you!</p>
              <p className="text-warm-gray text-xs mt-1">You will be the first to know when we launch.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleNotify} className="flex">
              <input
                type="email"
                placeholder="Enter your email for early access"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 min-w-0 bg-white/5 border border-white/15 border-r-0 text-cream px-5 py-3.5 text-sm rounded-l-full focus:outline-none focus:border-gold transition-colors placeholder-warm-gray/40"
              />
              <button
                type="submit"
                className="bg-gold hover:bg-gold-light text-charcoal px-5 py-3.5 rounded-r-full font-semibold text-xs uppercase tracking-[1.5px] transition-all duration-300 flex items-center gap-1.5 whitespace-nowrap"
              >
                Notify Me <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center gap-3"
        >
          <Link
            href="/"
            className="text-[11px] uppercase tracking-[2px] font-semibold text-warm-gray hover:text-gold transition-colors border border-white/10 hover:border-gold/30 px-6 py-3 rounded-full"
          >
            ← Go to Home Page
          </Link>
          <Link
            href="/contact"
            className="text-[11px] uppercase tracking-[2px] font-semibold text-charcoal bg-gold hover:bg-gold-light px-6 py-3 rounded-full transition-colors"
          >
            Contact Us
          </Link>
        </motion.div>

        {/* Contact info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.65 }}
          className="flex flex-wrap justify-center gap-6 text-xs text-warm-gray/50 border-t border-white/5 pt-6 w-full"
        >
          <a href="tel:+918081741031" className="flex items-center gap-1.5 hover:text-gold transition-colors">
            <Phone className="w-3 h-3" /> +91 808 174 1031
          </a>
          <a href="mailto:info@innmotek.com" className="flex items-center gap-1.5 hover:text-gold transition-colors">
            <Mail className="w-3 h-3" /> info@innmotek.com
          </a>
        </motion.div>
      </div>
    </div>
  );
}
