"use client";

import React, { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import SectionEyebrow from "@/components/SectionEyebrow";
import RevealWrapper from "@/components/RevealWrapper";
import { PhoneCall, MapPin, DraftingCompass, Wrench, CheckCircle2, ShieldCheck, ArrowRight } from "lucide-react";
import Link from "next/link";

interface ProcessStep {
  number: string;
  title: string;
  desc: string;
  duration: string;
  icon: React.ComponentType<{ className?: string }>;
}

export default function ProcessPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress for the SVG drawing line
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 20%", "end 80%"],
  });

  // Smooth scroll line progress
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const steps: ProcessStep[] = [
    {
      number: "01",
      title: "Discovery Call",
      desc: "A brief, 30-minute consultation with our heating engineers. We discuss your building layout, hot water needs, or swimming pool size, and run preliminary thermal estimates.",
      duration: "Free • 30 mins",
      icon: PhoneCall,
    },
    {
      number: "02",
      title: "Site Assessment",
      desc: "Our engineers visit your property (or review blueprints remotely) to measure flow rates, electrical capacity, and determine optimal installation locations for air flow.",
      duration: "1 - 2 Days",
      icon: MapPin,
    },
    {
      number: "03",
      title: "Custom Solution Design",
      desc: "Using thermodynamic simulations, we design a customized piping layout, select the precise heat pump model capacity, and output an ROI projection based on current energy costs.",
      duration: "2 - 3 Days",
      icon: DraftingCompass,
    },
    {
      number: "04",
      title: "Certified Installation",
      desc: "Our in-house factory-trained engineers deploy the equipment, handle electrical hookups, set up anti-vibration mountings, and wire smart controls. We never outsource.",
      duration: "1 - 2 Days",
      icon: Wrench,
    },
    {
      number: "05",
      title: "Testing & Handover",
      desc: "We perform high-pressure nitrogen leaks tests, cycle the heat pump to check COP performance, pair the system with your home Wi-Fi app, and train you on smart features.",
      duration: "Half Day",
      icon: CheckCircle2,
    },
    {
      number: "06",
      title: "Annual Care & Support",
      desc: "Your system is registered for our 5-year warranty. We check in annually to clean filters, inspect refrigeration levels, and run diagnostics to preserve system longevity.",
      duration: "Ongoing Care",
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="pt-24 pb-20">
      {/* Mini Hero */}
      <section className="bg-charcoal text-cream py-20 relative overflow-hidden">
        <div className="grain-overlay" />
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <SectionEyebrow text="How We Work" className="justify-center mb-4" />
          <h1 className="text-5xl md:text-7xl font-serif-luxury font-light mb-6 tracking-wide">
            Our <span className="italic text-gold">Process</span>
          </h1>
          <p className="text-warm-gray text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-light">
            From the initial consultation to seamless installation and annual preventative checks, we handle every detail to guarantee peak efficiency.
          </p>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 max-w-6xl mx-auto px-6 relative" ref={containerRef}>
        {/* Animated Connecting Line (Desktop: Centered, Mobile: Left-aligned) */}
        <div className="absolute left-[30px] md:left-1/2 top-[10%] bottom-[10%] w-[2px] bg-gold-light/25 -translate-x-[1px] z-0" />
        
        {/* SVG Drawing Line */}
        <motion.div
          style={{ scaleY }}
          className="absolute left-[30px] md:left-1/2 top-[10%] bottom-[10%] w-[2px] bg-gold -translate-x-[1px] origin-top z-0"
        />

        <div className="flex flex-col gap-16 md:gap-24 relative z-10">
          {steps.map((step, i) => {
            const Icon = step.icon;
            // Alternates left-right on desktop
            const isLeft = i % 2 === 0;

            return (
              <div
                key={i}
                className={`flex flex-col md:flex-row items-start justify-between relative ${
                  isLeft ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* 1. Content Card */}
                <RevealWrapper
                  delay={0.1}
                  className="w-full md:w-[45%] pl-16 md:pl-0 flex flex-col gap-3"
                >
                  {/* Time Estimate Pill */}
                  <span className="inline-block self-start bg-gold-light/20 border border-gold-light/35 text-gold-dark font-body text-[10px] tracking-wider uppercase px-3 py-1 rounded">
                    {step.duration}
                  </span>

                  {/* Title */}
                  <h3 className="font-serif-luxury text-2xl md:text-3xl text-charcoal">
                    {step.number}. {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-warm-gray text-sm md:text-base font-light leading-relaxed">
                    {step.desc}
                  </p>
                </RevealWrapper>

                {/* 2. Central Circle Indicator */}
                <div className="absolute left-0 md:left-1/2 top-1 md:top-2 -translate-x-1/2 flex items-center justify-center z-20">
                  <motion.div
                    whileInView={{ backgroundColor: "#C9A96E", scale: 1.15 }}
                    viewport={{ once: false, margin: "-20%" }}
                    transition={{ duration: 0.4 }}
                    className="w-[60px] h-[60px] rounded-full border-2 border-gold bg-cream flex items-center justify-center text-charcoal hover:text-white transition-all shadow-md"
                  >
                    <Icon className="w-5 h-5" />
                  </motion.div>
                </div>

                {/* 3. Empty Spacer Column for layout alignment on desktop */}
                <div className="hidden md:block w-[45%]" />
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA section */}
      <section className="py-20 bg-white border-t border-gold-light/20">
        <div className="max-w-4xl mx-auto px-6 text-center flex flex-col items-center gap-6">
          <SectionEyebrow text="Ready to Begin?" />
          <h2 className="text-3xl md:text-5xl font-serif-luxury text-charcoal leading-tight">
            Schedule your free discovery call <span className="italic text-gold">today</span>
          </h2>
          <p className="text-warm-gray font-light text-sm md:text-base max-w-xl">
            We will analyze your heating requirements, estimate monthly operational expenses, and calculate your return on investment. No commitments required.
          </p>
          <Link
            href="/contact?interest=consultation"
            className="mt-4 bg-charcoal text-white hover:bg-gold hover:text-charcoal px-8 py-4 rounded-full text-xs uppercase tracking-[2px] font-semibold transition-all duration-300 flex items-center gap-2"
          >
            Start with a Free Call <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
