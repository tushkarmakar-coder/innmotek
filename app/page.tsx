"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import SectionEyebrow from "@/components/SectionEyebrow";
import RevealWrapper from "@/components/RevealWrapper";
import { ArrowRight, Phone } from "lucide-react";
import Image from "next/image";

// Dynamically import 3D Canvas components
const HeroCanvas = dynamic(() => import("@/components/HeroCanvas"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-navy relative" />,
});

const WhyUsCanvas = dynamic(() => import("@/components/WhyUsCanvas"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-navy" />,
});

export default function HomePage() {
  const [isTouch, setIsTouch] = useState(true);
  const [heroCardTilt, setHeroCardTilt] = useState({ rotateX: 0, rotateY: 0 });

  // Accordion state for FAQ teaser
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const checkTouch = () => {
      const hasTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
      setIsTouch(hasTouch);
    };
    checkTouch();
  }, []);

  // Parallax tilt logic for the floating card in the hero section
  const handleHeroMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouch) return;
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;

    // rotation limits
    setHeroCardTilt({
      rotateY: x * 15,
      rotateX: -y * 15,
    });
  };

  const handleHeroMouseLeave = () => {
    setHeroCardTilt({ rotateX: 0, rotateY: 0 });
  };

  return (
    <div className="overflow-hidden">
      {/* ──────────────────────────────────────────────────────── */}
      {/* SECTION 1 — HERO */}
      {/* ──────────────────────────────────────────────────────── */}
      <section className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-2 relative items-stretch pt-20" data-section="hero">

        {/* Left Column: Copy */}
        <div className="flex flex-col justify-center px-6 md:px-16 lg:px-24 py-12 relative z-15 bg-cream">
          <RevealWrapper delay={0.1}>
            <SectionEyebrow text="Premium Heating & Cooling Solutions" className="mb-4" />
          </RevealWrapper>

          <RevealWrapper delay={0.2}>
            <h1 className="text-[clamp(44px,5.5vw,72px)] font-serif-luxury font-light leading-[1.05] text-charcoal mb-6 tracking-wide">
              The Future of <br />
              <span className="italic text-gold font-normal">Comfort</span> Begins Here
            </h1>
          </RevealWrapper>

          <RevealWrapper delay={0.3}>
            <p className="text-warm-gray text-base font-light leading-relaxed max-w-[460px] mb-8">
              Innmotek manufactures ultra-efficient air source heat pumps, clean-burning wood fireplaces, and bespoke outdoor grills in India. Engineered for maximum thermodynamic yield and minimum carbon footprint.
            </p>
          </RevealWrapper>

          <RevealWrapper delay={0.4} className="flex flex-wrap gap-4 items-center mb-12">
            <Link
              href="/products"
              className="bg-charcoal text-white hover:bg-gold hover:text-charcoal px-8 py-4 rounded-full text-xs uppercase tracking-[2px] font-semibold transition-all duration-300 transform hover:-translate-y-0.5 shadow-md shadow-luxury/5"
            >
              Explore Products
            </Link>
            <Link
              href="/process"
              className="text-charcoal hover:text-gold px-6 py-4 text-xs uppercase tracking-[2px] font-semibold transition-colors flex items-center gap-1.5"
            >
              How It Works <ArrowRight className="w-4 h-4" />
            </Link>
          </RevealWrapper>

          {/* Scroll Indicator */}
          <div className="flex items-center gap-3 mt-auto pt-8">
            <div className="relative w-16 h-[1px] bg-gold-light">
              <span className="absolute left-0 top-0 h-full bg-gold animate-pulse w-1/2" />
            </div>
            <span className="text-[10px] uppercase tracking-[3px] font-bold text-gold">Scroll to discover</span>
          </div>
        </div>

        {/* Right Column: WebGL + Floating Card */}
        <div
          className="relative w-full lg:min-h-screen flex flex-col lg:block overflow-hidden bg-[#08070C] pb-8 lg:pb-0"
          onMouseMove={handleHeroMouseMove}
          onMouseLeave={handleHeroMouseLeave}
        >
          {/* Three.js Canvas */}
          <div className="relative w-full h-[380px] lg:absolute lg:inset-0 lg:h-full lg:w-full z-0">
            <HeroCanvas />
          </div>

          {/* 3D Floating Glassmorphism Card */}
          <motion.div
            style={{
              transform: `perspective(1000px) rotateX(${heroCardTilt.rotateX}deg) rotateY(${heroCardTilt.rotateY}deg)`,
              transition: isTouch ? "none" : "transform 0.15s ease-out",
            }}
            animate={{
              y: [0, -12, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative lg:absolute lg:bottom-10 lg:right-10 z-10 w-[calc(100%-2rem)] lg:w-[320px] max-w-[320px] mx-auto lg:mx-0 glass-card-light rounded-3xl p-6 md:p-8 flex flex-col gap-5 border border-gold-light/25 shadow-luxury"
          >
            <div className="flex justify-between items-center">
              <span className="text-[10px] tracking-wider uppercase font-semibold text-gold bg-gold/10 px-3 py-1 rounded-full">
                Live Efficiency
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#25D366] animate-ping" />
            </div>

            <div className="flex flex-col">
              <span className="text-5xl font-logo tracking-wider text-charcoal leading-none">
                487%
              </span>
              <span className="text-[10px] tracking-wider uppercase text-warm-gray mt-1">
                COP Efficiency Rating
              </span>
            </div>

            <div className="h-[1px] bg-gold-light/25" />

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <span className="text-xs text-warm-gray font-light">Max Temp</span>
                <span className="font-serif-luxury font-bold text-charcoal">80°C</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-warm-gray font-light">Works At</span>
                <span className="font-serif-luxury font-bold text-charcoal">-25°C</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-warm-gray font-light">Savings</span>
                <span className="font-serif-luxury font-bold text-[#25D366]">75%</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-warm-gray font-light">Life</span>
                <span className="font-serif-luxury font-bold text-charcoal">12 Yrs</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────── */}
      {/* SECTION 2 — TRUST BAR */}
      {/* ──────────────────────────────────────────────────────── */}
      <section className="bg-charcoal py-6 border-y border-gold/10 relative z-20">
        <div className="max-w-7xl mx-auto px-6 overflow-x-auto no-scrollbar flex items-center justify-between gap-8 md:gap-4 whitespace-nowrap">
          <div className="flex items-center gap-2">
            <span className="text-gold">⚡</span>
            <span className="text-[10px] md:text-[11px] uppercase tracking-[2px] font-semibold text-gold-light">
              Energy Star Approved
            </span>
          </div>
          <div className="w-[1px] h-4 bg-gold-light/20 shrink-0" />
          <div className="flex items-center gap-2">
            <span className="text-gold">🌿</span>
            <span className="text-[10px] md:text-[11px] uppercase tracking-[2px] font-semibold text-gold-light">
              R32 Eco Refrigerant
            </span>
          </div>
          <div className="w-[1px] h-4 bg-gold-light/20 shrink-0" />
          <div className="flex items-center gap-2">
            <span className="text-gold">🏭</span>
            <span className="text-[10px] md:text-[11px] uppercase tracking-[2px] font-semibold text-gold-light">
              Made In India (GIDA)
            </span>
          </div>
          <div className="w-[1px] h-4 bg-gold-light/20 shrink-0" />
          <div className="flex items-center gap-2">
            <span className="text-gold">🛡️</span>
            <span className="text-[10px] md:text-[11px] uppercase tracking-[2px] font-semibold text-gold-light">
              5 Year Warranty
            </span>
          </div>
          <div className="w-[1px] h-4 bg-gold-light/20 shrink-0" />
          <div className="flex items-center gap-2">
            <span className="text-gold">📞</span>
            <span className="text-[10px] md:text-[11px] uppercase tracking-[2px] font-semibold text-gold-light">
              24/7 Priority Support
            </span>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────── */}
      {/* SECTION 3 — PRODUCTS PREVIEW */}
      {/* ──────────────────────────────────────────────────────── */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-16">
          <div>
            <SectionEyebrow text="Product Catalog" className="mb-3" />
            <h2 className="text-3xl md:text-5xl font-serif-luxury text-charcoal">
              Engineered for <span className="italic text-gold">Longevity</span>
            </h2>
          </div>
          <Link
            href="/products"
            className="text-xs uppercase tracking-[2px] font-bold text-gold hover:text-gold-dark flex items-center gap-1.5 self-start md:self-auto group"
          >
            View all Products <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1: Featured Heat Pump (Span 2 rows on desktop) */}
          <RevealWrapper className="lg:row-span-2 bg-charcoal text-white rounded-3xl overflow-hidden border border-gold-light/20 shadow-luxury flex flex-col justify-between h-full group">
            <div className="p-8 flex flex-col gap-6">
              <span className="bg-gold-gradient text-charcoal font-semibold text-[10px] tracking-wider uppercase px-3 py-1.5 rounded-full self-start">
                Best Seller
              </span>
              <h3 className="font-serif-luxury text-4xl text-white font-light leading-tight">
                Air Source Hot <br />
                Water Heat Pump
              </h3>
              <p className="text-white/60 text-sm font-light leading-relaxed">
                Save up to 75% on sanitary hot water bills. Stable, high-temp operation down to -25°C.
              </p>
              <Link
                href="/products/heat-pumps-duraheat"
                className="text-xs uppercase tracking-[2px] text-gold hover:underline flex items-center gap-1.5"
              >
                Learn More <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            {/* Visual Area */}
            <div className="h-[280px] w-full relative overflow-hidden">
              <Image
                src="/images/heat_pump.png"
                alt="Air Source Hot Water Heat Pump"
                fill
                sizes="(max-width: 1024px) 100vw, 400px"
                className="object-cover select-none group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </RevealWrapper>

          {/* Card 2: Pool Heat Pump */}
          <RevealWrapper delay={0.1} className="bg-white border border-gold-light/20 rounded-3xl overflow-hidden shadow-md flex flex-col justify-between h-[380px] group hover:shadow-luxury transition-all duration-300">
            <div className="p-6">
              <span className="text-[9px] uppercase tracking-wider text-gold font-bold">Pool Systems</span>
              <h3 className="font-serif-luxury text-2xl text-charcoal mt-1 mb-2">AquaTemp Pool Pump</h3>
              <p className="text-warm-gray text-xs font-light">Corrosion-free twisted titanium heat loops.</p>
            </div>
            <div className="h-[180px] w-full relative overflow-hidden">
              <Image
                src="/images/pool_pump.png"
                alt="AquaTemp Pool Pump"
                fill
                sizes="(max-width: 768px) 100vw, 300px"
                className="object-cover select-none group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6 border-t border-gold-light/10 flex justify-between items-center bg-cream/10">
              <Link href="/products/pool-pumps-aquatemp" className="text-xs uppercase tracking-[2px] text-gold hover:text-gold-dark font-semibold">View Details</Link>
            </div>
          </RevealWrapper>

          {/* Card 3: Helix Fireplace */}
          <RevealWrapper delay={0.2} className="bg-white border border-gold-light/20 rounded-3xl overflow-hidden shadow-md flex flex-col justify-between h-[380px] group hover:shadow-luxury transition-all duration-300">
            <div className="p-6">
              <span className="text-[9px] uppercase tracking-wider text-gold font-bold">Fireplaces</span>
              <h3 className="font-serif-luxury text-2xl text-charcoal mt-1 mb-2">Helix Wood Fireplace</h3>
              <p className="text-warm-gray text-xs font-light">Clean-burn double combustion technology.</p>
            </div>
            <div className="h-[180px] w-full relative overflow-hidden">
              <Image
                src="/images/fireplace.png"
                alt="Helix Wood Fireplace"
                fill
                sizes="(max-width: 768px) 100vw, 300px"
                className="object-cover select-none group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6 border-t border-gold-light/10 flex justify-between items-center bg-cream/10">
              <Link href="/products/fireplaces-helix" className="text-xs uppercase tracking-[2px] text-gold hover:text-gold-dark font-semibold">View Details</Link>
            </div>
          </RevealWrapper>

          {/* Card 4: BBQ Grill */}
          <RevealWrapper delay={0.15} className="bg-white border border-gold-light/20 rounded-3xl overflow-hidden shadow-md flex flex-col justify-between h-[380px] group hover:shadow-luxury transition-all duration-300">
            <div className="p-6">
              <span className="text-[9px] uppercase tracking-wider text-gold font-bold">Outdoor Grills</span>
              <h3 className="font-serif-luxury text-2xl text-charcoal mt-1 mb-2">TerraGrill BBQ</h3>
              <p className="text-warm-gray text-xs font-light">304 marine stainless steel kitchen grill.</p>
            </div>
            <div className="h-[180px] w-full relative overflow-hidden">
              <Image
                src="/images/bbq_grill.png"
                alt="TerraGrill BBQ"
                fill
                sizes="(max-width: 768px) 100vw, 300px"
                className="object-cover select-none group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6 border-t border-gold-light/10 flex justify-between items-center bg-cream/10">
              <Link href="/products/bbq-grills-terragrill" className="text-xs uppercase tracking-[2px] text-gold hover:text-gold-dark font-semibold">View Details</Link>
            </div>
          </RevealWrapper>

          {/* Card 5: Accessories */}
          <RevealWrapper delay={0.25} className="bg-white border border-gold-light/20 rounded-3xl overflow-hidden shadow-md flex flex-col justify-between h-[380px] group hover:shadow-luxury transition-all duration-300">
            <div className="p-6">
              <span className="text-[9px] uppercase tracking-wider text-gold font-bold">Accessories</span>
              <h3 className="font-serif-luxury text-2xl text-charcoal mt-1 mb-2">Thermal Pool Covers</h3>
              <p className="text-warm-gray text-xs font-light">Automated retractable thermal covers.</p>
            </div>
            <div className="h-[180px] w-full relative overflow-hidden">
              <Image
                src="/images/pool_cover.png"
                alt="Thermal Pool Covers"
                fill
                sizes="(max-width: 768px) 100vw, 300px"
                className="object-cover select-none group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6 border-t border-gold-light/10 flex justify-between items-center bg-cream/10">
              <Link href="/products/accessories-pool-cover" className="text-xs uppercase tracking-[2px] text-gold hover:text-gold-dark font-semibold">View Details</Link>
            </div>
          </RevealWrapper>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────── */}
      {/* SECTION 4 — WHY US (Magazine Split) */}
      {/* ──────────────────────────────────────────────────────── */}
      <section className="min-h-screen grid grid-cols-1 lg:grid-cols-2 items-stretch border-t border-gold-light/10">
        {/* Left Dark Navy Panel with Canvas */}
        <div className="relative min-h-[450px] lg:min-h-0 flex items-center justify-center overflow-hidden bg-[#0a0f1d]">
          {/* Wireframe Rotating rings Canvas */}
          <div className="absolute inset-0 z-0">
            <WhyUsCanvas />
          </div>

          <div className="absolute inset-0 bg-navy/40 z-5 pointer-events-none" />

          {/* Large Background Title */}
          <span className="absolute inset-x-0 bottom-6 text-center text-[clamp(140px,20vw,240px)] font-logo text-white/5 select-none pointer-events-none leading-none z-1">
            4X
          </span>
        </div>

        {/* Right Cream Content Panel */}
        <div className="flex flex-col justify-center px-6 md:px-16 lg:px-24 py-16 bg-cream border-l border-gold-light/10">
          <SectionEyebrow text="Engineering Excellence" className="mb-4" />
          <h2 className="text-3xl md:text-5xl font-serif-luxury text-charcoal leading-tight mb-8">
            Precision manufacture, <br />
            uncompromised <span className="italic text-gold">yield.</span>
          </h2>

          {/* Stats Grid Card */}
          <RevealWrapper className="mb-8 w-full max-w-[480px] bg-white border border-gold-light/20 p-8 rounded-3xl shadow-luxury flex flex-col gap-6">
            <span className="text-xs font-body tracking-[3px] uppercase text-gold font-bold">Innmotek footprint</span>
            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col">
                <span className="text-3xl font-logo tracking-wider text-charcoal leading-none">500+</span>
                <span className="text-[9px] uppercase tracking-wider text-warm-gray mt-1">Installations</span>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-logo tracking-wider text-charcoal leading-none">12+</span>
                <span className="text-[9px] uppercase tracking-wider text-warm-gray mt-1">States Served</span>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-logo tracking-wider text-[#25D366] leading-none">75%</span>
                <span className="text-[9px] uppercase tracking-wider text-warm-gray mt-1">Energy Saved</span>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-logo tracking-wider text-charcoal leading-none">4.9★</span>
                <span className="text-[9px] uppercase tracking-wider text-warm-gray mt-1">User Rating</span>
              </div>
            </div>
          </RevealWrapper>

          <div className="flex flex-col gap-6">
            {/* Item 1 */}
            <div className="flex gap-4 p-4 rounded-xl hover:bg-white border border-transparent hover:border-gold-light/15 hover:shadow-luxury/5 transition-all duration-300">
              <span className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold shrink-0">
                ⚡
              </span>
              <div>
                <h4 className="font-semibold text-charcoal text-sm">Inverter-Grade Efficiency</h4>
                <p className="text-warm-gray text-xs font-light leading-relaxed mt-1">Our compressors adjust heating capacities in real time, consuming up to 75% less grid power.</p>
              </div>
            </div>
            {/* Item 2 */}
            <div className="flex gap-4 p-4 rounded-xl hover:bg-white border border-transparent hover:border-gold-light/15 hover:shadow-luxury/5 transition-all duration-300">
              <span className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold shrink-0">
                🏭
              </span>
              <div>
                <h4 className="font-semibold text-charcoal text-sm">Factory-Direct Quality</h4>
                <p className="text-warm-gray text-xs font-light leading-relaxed mt-1">Manufactured locally in GIDA Industrial Area, Sahjanwa, Gorakhpur. Original spares always in stock.</p>
              </div>
            </div>
            {/* Item 3 */}
            <div className="flex gap-4 p-4 rounded-xl hover:bg-white border border-transparent hover:border-gold-light/15 hover:shadow-luxury/5 transition-all duration-300">
              <span className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold shrink-0">
                🛠️
              </span>
              <div>
                <h4 className="font-semibold text-charcoal text-sm">Nationwide Service Network</h4>
                <p className="text-warm-gray text-xs font-light leading-relaxed mt-1">Certified engineers cover installation, diagnostic sizing, and preventative care across 12+ states.</p>
              </div>
            </div>
            {/* Item 4 */}
            <div className="flex gap-4 p-4 rounded-xl hover:bg-white border border-transparent hover:border-gold-light/15 hover:shadow-luxury/5 transition-all duration-300">
              <span className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold shrink-0">
                🌿
              </span>
              <div>
                <h4 className="font-semibold text-charcoal text-sm">R32 Eco Refrigerant</h4>
                <p className="text-warm-gray text-xs font-light leading-relaxed mt-1">Low-GWP cooling compound protects environmental parameters while raising heat transfer speeds.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────── */}
      {/* SECTION 5 — PROCESS TIMELINE */}
      {/* ──────────────────────────────────────────────────────── */}
      <section className="py-24 bg-white border-t border-gold-light/10">
        <div className="max-w-7xl mx-auto px-6 text-center mb-16">
          <SectionEyebrow text="How We Work" className="justify-center mb-4" />
          <h2 className="text-3xl md:text-5xl font-serif-luxury text-charcoal">
            The Roadmap to <span className="italic text-gold">Installation</span>
          </h2>
        </div>

        {/* Timeline Grid (Horizontal on Desktop, Vertical on Mobile) */}
        <div className="max-w-6xl mx-auto px-6 relative">
          {/* Horizontal line for desktop */}
          <div className="hidden lg:block absolute left-0 right-0 top-7 h-[1px] bg-gradient-to-r from-transparent via-gold-light/35 to-transparent" />
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 relative z-10">
            {/* Step 1 */}
            <RevealWrapper className="flex flex-col items-center lg:items-start text-center lg:text-left gap-4">
              <div className="w-14 h-14 rounded-full border-2 border-gold bg-white hover:bg-gold hover:text-white flex items-center justify-center font-logo text-xl text-gold font-bold transition-all shadow-md">
                1
              </div>
              <h3 className="font-serif-luxury text-xl text-charcoal font-semibold mt-2">Free Consultation</h3>
              <p className="text-warm-gray text-xs font-light leading-relaxed">
                Initial sizing call with our HVAC draftsmen to review water capacity, insulation loads, and heating goals.
              </p>
            </RevealWrapper>

            {/* Step 2 */}
            <RevealWrapper delay={0.12} className="flex flex-col items-center lg:items-start text-center lg:text-left gap-4">
              <div className="w-14 h-14 rounded-full border-2 border-gold bg-white hover:bg-gold hover:text-white flex items-center justify-center font-logo text-xl text-gold font-bold transition-all shadow-md">
                2
              </div>
              <h3 className="font-serif-luxury text-xl text-charcoal font-semibold mt-2">Custom Design</h3>
              <p className="text-warm-gray text-xs font-light leading-relaxed">
                Detailed flow rate calculations and system layout models paired with an energy efficiency forecast sheet.
              </p>
            </RevealWrapper>

            {/* Step 3 */}
            <RevealWrapper delay={0.24} className="flex flex-col items-center lg:items-start text-center lg:text-left gap-4">
              <div className="w-14 h-14 rounded-full border-2 border-gold bg-white hover:bg-gold hover:text-white flex items-center justify-center font-logo text-xl text-gold font-bold transition-all shadow-md">
                3
              </div>
              <h3 className="font-serif-luxury text-xl text-charcoal font-semibold mt-2">Expert Installation</h3>
              <p className="text-warm-gray text-xs font-light leading-relaxed">
                Commissioning by our certified Gorakhpur factory engineers, handling plumbing layout and smart app links.
              </p>
            </RevealWrapper>

            {/* Step 4 */}
            <RevealWrapper delay={0.36} className="flex flex-col items-center lg:items-start text-center lg:text-left gap-4">
              <div className="w-14 h-14 rounded-full border-2 border-gold bg-white hover:bg-gold hover:text-white flex items-center justify-center font-logo text-xl text-gold font-bold transition-all shadow-md">
                4
              </div>
              <h3 className="font-serif-luxury text-xl text-charcoal font-semibold mt-2">Lifetime Support</h3>
              <p className="text-warm-gray text-xs font-light leading-relaxed">
                Warranty registration and preventative inspection checks to ensure your system preserves its COP ratings.
              </p>
            </RevealWrapper>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────── */}
      {/* SECTION 6 — COMPARISON TABLE TEASER */}
      {/* ──────────────────────────────────────────────────────── */}
      <section className="py-24 bg-charcoal text-cream relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <SectionEyebrow text="Efficiency Analysis" className="justify-center mb-4" />
            <h2 className="text-3xl md:text-5xl font-serif-luxury text-white">
              Why Innmotek Beats the <span className="italic text-gold">Competition</span>
            </h2>
          </div>

          {/* Styled Table */}
          <div className="overflow-x-auto rounded-2xl border border-gold/15 no-scrollbar shadow-2xl">
            <table className="w-full text-left border-collapse min-w-[650px]">
              <thead>
                <tr className="bg-white/5 border-b border-gold/10">
                  <th className="p-5 text-xs uppercase tracking-wider font-semibold text-warm-gray">Feature</th>
                  <th className="p-5 text-xs uppercase tracking-wider font-semibold text-gold bg-gold/5">Innmotek</th>
                  <th className="p-5 text-xs uppercase tracking-wider font-semibold text-white/60">Electric Geysers</th>
                  <th className="p-5 text-xs uppercase tracking-wider font-semibold text-white/60">Gas Boilers</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-light text-sm">
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="p-5 font-semibold">Energy Efficiency</td>
                  <td className="p-5 text-gold font-semibold bg-gold/5">Up to 487% (COP 4.87)</td>
                  <td className="p-5 text-white/65">~95% Efficiency</td>
                  <td className="p-5 text-white/65">~85% Efficiency</td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="p-5 font-semibold">Monthly Operating Cost</td>
                  <td className="p-5 text-[#25D366] font-semibold bg-gold/5">₹850 (Typical)</td>
                  <td className="p-5 text-white/65">₹3,400 (High)</td>
                  <td className="p-5 text-white/65">₹2,800 (Medium)</td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="p-5 font-semibold">Cold Climate Operations</td>
                  <td className="p-5 text-gold font-semibold bg-gold/5">Works down to -25°C</td>
                  <td className="p-5 text-white/65">Struggles / Freezes</td>
                  <td className="p-5 text-white/65">Drops in efficiency</td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="p-5 font-semibold">Environmental Protection</td>
                  <td className="p-5 text-gold font-semibold bg-gold/5">Low GWP R32 Eco Gas</td>
                  <td className="p-5 text-white/65">High Carbon Load</td>
                  <td className="p-5 text-white/65">Fossil Fuel Burn</td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="p-5 font-semibold">Product Warranty</td>
                  <td className="p-5 text-gold font-semibold bg-gold/5">5 Year Comprehensive</td>
                  <td className="p-5 text-white/65">1 - 2 Years</td>
                  <td className="p-5 text-white/65">1 - 2 Years</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="text-center mt-12">
            <Link
              href="/why-innmotek"
              className="text-xs uppercase tracking-[2px] font-bold text-gold hover:text-gold-light border-b border-gold hover:border-gold-light pb-1 transition-all"
            >
              View Full Comparison & ROI Calculator →
            </Link>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────── */}
      {/* SECTION 7 — TESTIMONIALS */}
      {/* ──────────────────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <SectionEyebrow text="Client Endorsements" className="justify-center mb-4" />
            <h2 className="text-3xl md:text-5xl font-serif-luxury text-charcoal">
              Trusted by Premium <span className="italic text-gold">Estates</span>
            </h2>
          </div>

          {/* Testimonials Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1: Large Testimonial */}
            <RevealWrapper className="lg:col-span-2 bg-charcoal text-white p-8 md:p-12 rounded-3xl border border-gold-light/20 flex flex-col justify-between shadow-luxury">
              <span className="font-serif-luxury text-gold text-[80px] leading-none select-none">“</span>
              <p className="text-xl md:text-2xl font-serif-luxury leading-relaxed mb-8 -mt-8 font-light">
                We installed Innmotek heat pumps for our luxury resort&apos;s swimming pool in Rishikesh. Keeping water at a constant 30°C in freezing winter was costing us massive electricity bills. Switching to Innmotek slashed our energy usage by 74% and paid for itself in less than 14 months. Absolutely outstanding engineering.
              </p>
              <div className="flex items-center gap-4 border-t border-white/10 pt-6">
                <div className="w-12 h-12 rounded-full bg-gold/15 flex items-center justify-center font-bold text-gold text-lg">
                  K
                </div>
                <div>
                  <h4 className="font-semibold text-white text-sm">Kabir Mehrotra</h4>
                  <p className="text-white/50 text-xs">Owner, Vista Resorts Rishikesh</p>
                  <div className="flex gap-0.5 text-gold mt-1">
                    {[...Array(5)].map((_, idx) => <span key={idx}>★</span>)}
                  </div>
                </div>
              </div>
            </RevealWrapper>

            {/* Card 2 */}
            <RevealWrapper delay={0.15} className="bg-cream border border-gold-light/20 p-8 rounded-3xl flex flex-col justify-between shadow-md">
              <span className="font-serif-luxury text-gold text-[60px] leading-none select-none">“</span>
              <p className="text-sm font-light leading-relaxed text-warm-gray mb-6 -mt-6">
                Our Helix wood-fired fireplace is the center of our living room. It produces zero smoke inside the house and provides deep radiant warmth during UP winters.
              </p>
              <div className="flex items-center gap-3 border-t border-gold-light/15 pt-4">
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center font-bold text-gold text-sm">
                  P
                </div>
                <div>
                  <h4 className="font-semibold text-charcoal text-xs">Priyanka Sen</h4>
                  <p className="text-warm-gray text-[10px]">Residential Estate, Noida</p>
                  <div className="flex gap-0.5 text-gold mt-0.5">
                    {[...Array(5)].map((_, idx) => <span key={idx} className="text-xs">★</span>)}
                  </div>
                </div>
              </div>
            </RevealWrapper>

            {/* Card 3 */}
            <RevealWrapper delay={0.25} className="bg-cream border border-gold-light/20 p-8 rounded-3xl flex flex-col justify-between shadow-md">
              <span className="font-serif-luxury text-gold text-[60px] leading-none select-none">“</span>
              <p className="text-sm font-light leading-relaxed text-warm-gray mb-6 -mt-6">
                We custom-sized the TerraGrill BBQ for our rooftop kitchen. 304 marine stainless steel has stood up to 2 years of heavy monsoon rains without a single speck of rust.
              </p>
              <div className="flex items-center gap-3 border-t border-gold-light/15 pt-4">
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center font-bold text-gold text-sm">
                  A
                </div>
                <div>
                  <h4 className="font-semibold text-charcoal text-xs">Aditya Goel</h4>
                  <p className="text-warm-gray text-[10px]">Villa Owner, Lucknow</p>
                  <div className="flex gap-0.5 text-gold mt-0.5">
                    {[...Array(5)].map((_, idx) => <span key={idx} className="text-xs">★</span>)}
                  </div>
                </div>
              </div>
            </RevealWrapper>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────── */}
      {/* SECTION 8 — FAQ TEASER */}
      {/* ──────────────────────────────────────────────────────── */}
      <section className="py-24 bg-cream border-t border-gold-light/10">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <SectionEyebrow text="Common Inquiries" className="justify-center mb-4" />
            <h2 className="text-3xl md:text-5xl font-serif-luxury text-charcoal">
              Frequently Asked <span className="italic text-gold">Questions</span>
            </h2>
          </div>

          <div className="flex flex-col gap-4 mb-10">
            {/* Accordion Item 1 */}
            <div className="bg-white border border-gold-light/15 rounded-xl overflow-hidden shadow-sm">
              <button
                onClick={() => setOpenFaq(openFaq === 0 ? null : 0)}
                className="w-full text-left p-6 flex justify-between items-center gap-4"
              >
                <span className="font-serif-luxury text-lg md:text-xl text-charcoal">
                  Where is Innmotek based, and do you ship across India?
                </span>
                <span className="text-gold shrink-0 transition-transform duration-300">
                  {openFaq === 0 ? "×" : "+"}
                </span>
              </button>
              <AnimatePresence>
                {openFaq === 0 && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    className="overflow-hidden border-t border-gold-light/10"
                  >
                    <p className="p-6 text-sm text-warm-gray font-light leading-relaxed">
                      Innmotek is proudly based in Gorakhpur, Uttar Pradesh, with our primary manufacturing unit located in the GIDA Industrial Area, Sahjanwa. We provide safe, crated shipping and certified installation services across all states in India.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Accordion Item 2 */}
            <div className="bg-white border border-gold-light/15 rounded-xl overflow-hidden shadow-sm">
              <button
                onClick={() => setOpenFaq(openFaq === 1 ? null : 1)}
                className="w-full text-left p-6 flex justify-between items-center gap-4"
              >
                <span className="font-serif-luxury text-lg md:text-xl text-charcoal">
                  How does an Air Source Heat Pump achieve over 400% efficiency?
                </span>
                <span className="text-gold shrink-0 transition-transform duration-350">
                  {openFaq === 1 ? "×" : "+"}
                </span>
              </button>
              <AnimatePresence>
                {openFaq === 1 && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    className="overflow-hidden border-t border-gold-light/10"
                  >
                    <p className="p-6 text-sm text-warm-gray font-light leading-relaxed">
                      Traditional heaters burn fuel or use electrical resistance to generate heat, which maxes out at 100% efficiency. An Innmotek heat pump does not generate heat; it extracts free heat from the outside air and moves it indoors using a refrigeration cycle. It uses only 1 kW of electricity to transfer up to 4.87 kW of heat.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Accordion Item 3 */}
            <div className="bg-white border border-gold-light/15 rounded-xl overflow-hidden shadow-sm">
              <button
                onClick={() => setOpenFaq(openFaq === 2 ? null : 2)}
                className="w-full text-left p-6 flex justify-between items-center gap-4"
              >
                <span className="font-serif-luxury text-lg md:text-xl text-charcoal">
                  What does the 5-year warranty cover?
                </span>
                <span className="text-gold shrink-0 transition-transform duration-400">
                  {openFaq === 2 ? "×" : "+"}
                </span>
              </button>
              <AnimatePresence>
                {openFaq === 2 && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    className="overflow-hidden border-t border-gold-light/10"
                  >
                    <p className="p-6 text-sm text-warm-gray font-light leading-relaxed">
                      Our comprehensive 5-year warranty covers all structural components, the compressor, R32 refrigerant lines, and electronic boards. In the rare event of a fault, our service center dispatches a certified technician directly to your location with original factory spares.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="text-center">
            <Link
              href="/faq"
              className="text-xs uppercase tracking-[2px] font-bold text-gold hover:text-gold-dark flex items-center justify-center gap-1.5 group"
            >
              See all FAQs <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────── */}
      {/* SECTION 9 — CTA STRIP */}
      {/* ──────────────────────────────────────────────────────── */}
      <section className="bg-navy text-white py-24 relative overflow-hidden">
        
        {/* Large overlay background logo */}
        <span className="absolute inset-0 flex items-center justify-center text-[clamp(140px,25vw,300px)] font-logo text-white/5 select-none pointer-events-none tracking-widest z-1">
          INNMOTEK
        </span>

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10 flex flex-col items-center gap-6">
          <SectionEyebrow text="Get in Touch" className="mb-2" />
          <h2 className="text-4xl md:text-6xl font-serif-luxury font-light leading-tight">
            Transform Your <br />
            <span className="italic text-gold font-normal">Energy Future</span>
          </h2>
          <p className="text-white/60 text-sm md:text-base font-light max-w-lg mb-8">
            Consult our Gorakhpur engineering department for system sizing, pricing quotes, and detailed payback analysis sheets.
          </p>

          <div className="flex flex-wrap gap-4 justify-center items-center">
            <a
              href="tel:+919999999999"
              className="bg-gold hover:bg-gold-light text-charcoal px-8 py-4 rounded-full text-xs uppercase tracking-[2px] font-semibold transition-all duration-300 flex items-center gap-2 shadow-lg"
            >
              <Phone className="w-4 h-4" /> Call Now — Free Quote
            </a>
            <Link
              href="/contact?interest=catalogue"
              className="bg-transparent border border-white hover:border-gold hover:text-gold px-8 py-4 rounded-full text-xs uppercase tracking-[2px] font-semibold transition-all duration-300"
            >
              Download Catalogue →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
