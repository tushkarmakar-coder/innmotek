"use client";

import React from "react";
import SectionEyebrow from "@/components/SectionEyebrow";
import ProductCard from "@/components/ProductCard";
import RevealWrapper from "@/components/RevealWrapper";
import { getProductsByCategory } from "@/lib/products";
import { Waves, Sun, Anchor, Award } from "lucide-react";
import Link from "next/link";

export default function PoolPumpsCategoryPage() {
  const categoryProducts = getProductsByCategory("pool-pumps");

  return (
    <div className="pt-24 pb-20">
      {/* Mini Hero */}
      <section className="bg-charcoal text-cream py-20 relative overflow-hidden">
        <div className="grain-overlay" />
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <SectionEyebrow text="Pool Heat Pumps" className="justify-center mb-4" />
          <h1 className="text-5xl md:text-7xl font-serif-luxury font-light mb-6 tracking-wide">
            AquaTemp <span className="italic text-gold">Systems</span>
          </h1>
          <p className="text-warm-gray text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-light font-body">
            High-performance pool heaters with corrosion-proof titanium heat exchangers. Keep your pool at a stable 30°C year-round.
          </p>
        </div>
      </section>

      {/* Grid Section */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <SectionEyebrow text="Product Range" className="justify-center mb-4" />
          <h2 className="text-3xl md:text-5xl font-serif-luxury text-charcoal">
            Pool Heaters <span className="italic text-gold">& Chillers</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categoryProducts.map((product, idx) => (
            <ProductCard key={product.slug} product={product} index={idx} />
          ))}
        </div>
      </section>

      {/* Titanium Tech Section */}
      <section className="py-20 bg-white border-y border-gold-light/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <RevealWrapper className="flex flex-col gap-6">
              <SectionEyebrow text="Titanium Thermal Core" />
              <h2 className="text-3xl md:text-5xl font-serif-luxury text-charcoal leading-tight">
                Designed to resist harsh pool <span className="italic text-gold">chemicals</span>
              </h2>
              <p className="text-warm-gray text-base font-light leading-relaxed">
                Swimming pool water is treated with high concentrations of chlorine, salts, and cleaning minerals. In standard copper heaters, these active chemicals erode metallic lines, leading to system failure within years.
              </p>
              <p className="text-warm-gray text-base font-light leading-relaxed">
                Innmotek AquaTemp systems utilize **twisted titanium tubes** housed in a high-density PVC shell. Titanium is completely immune to pool water chemistry, including salt-chlorinated water pools. The twisted profile slows water flow, maximizing thermal contact area and boosting heat transfer efficiency.
              </p>
            </RevealWrapper>

            <RevealWrapper delay={0.2} className="grid grid-cols-2 gap-6">
              <div className="p-6 bg-cream/40 rounded-2xl border border-gold-light/15 flex flex-col gap-3">
                <Anchor className="w-8 h-8 text-gold" />
                <h4 className="font-semibold text-charcoal text-sm">Titanium Core</h4>
                <p className="text-warm-gray text-xs font-light">Corrosion-free heat exchanger backing lifetime efficiency.</p>
              </div>
              <div className="p-6 bg-cream/40 rounded-2xl border border-gold-light/15 flex flex-col gap-3">
                <Waves className="w-8 h-8 text-gold" />
                <h4 className="font-semibold text-charcoal text-sm">Dual Cycle</h4>
                <p className="text-warm-gray text-xs font-light">Heats during winters and cools during peak summer months.</p>
              </div>
              <div className="p-6 bg-cream/40 rounded-2xl border border-gold-light/15 flex flex-col gap-3">
                <Sun className="w-8 h-8 text-gold" />
                <h4 className="font-semibold text-charcoal text-sm">All-Weather</h4>
                <p className="text-warm-gray text-xs font-light">Maintains stable temperatures even during low sun monsoon seasons.</p>
              </div>
              <div className="p-6 bg-cream/40 rounded-2xl border border-gold-light/15 flex flex-col gap-3">
                <Award className="w-8 h-8 text-gold" />
                <h4 className="font-semibold text-charcoal text-sm">Whisper Quiet</h4>
                <p className="text-warm-gray text-xs font-light">Sound-dampened fan cowls protect your backyard tranquility.</p>
              </div>
            </RevealWrapper>
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <section className="py-20 max-w-5xl mx-auto px-6 text-center flex flex-col items-center gap-6">
        <SectionEyebrow text="Engineering & Sizing Support" />
        <h2 className="text-3xl md:text-5xl font-serif-luxury text-charcoal">
          Calculate Your Pool Heating <span className="italic text-gold">Load</span>
        </h2>
        <p className="text-warm-gray text-sm font-light max-w-xl">
          Get a professional recommendation on pool heat pump capacity based on your pool surface area, wind conditions, and desired swimming schedule.
        </p>
        <Link
          href="/contact?interest=pool-pumps"
          className="bg-charcoal text-white hover:bg-gold hover:text-charcoal px-8 py-4 rounded-full text-xs uppercase tracking-[2px] font-semibold transition-all duration-300"
        >
          Request Pool Sizing
        </Link>
      </section>
    </div>
  );
}
