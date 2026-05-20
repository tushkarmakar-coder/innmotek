"use client";

import React from "react";
import SectionEyebrow from "@/components/SectionEyebrow";
import ProductCard from "@/components/ProductCard";
import RevealWrapper from "@/components/RevealWrapper";
import { getProductsByCategory } from "@/lib/products";
import { ShieldCheck, CloudLightning, Sparkles, Sun } from "lucide-react";
import Link from "next/link";

export default function AccessoriesCategoryPage() {
  const categoryProducts = getProductsByCategory("accessories");

  return (
    <div className="pt-24 pb-20">
      {/* Mini Hero */}
      <section className="bg-charcoal text-cream py-20 relative overflow-hidden">
        <div className="grain-overlay" />
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <SectionEyebrow text="Pool Covers & Accessories" className="justify-center mb-4" />
          <h1 className="text-5xl md:text-7xl font-serif-luxury font-light mb-6 tracking-wide">
            Thermal <span className="italic text-gold">Shield</span>
          </h1>
          <p className="text-warm-gray text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-light font-body">
            Automated motorized pool covers designed to stop evaporation, retain heated pool temperatures, and secure pool safety.
          </p>
        </div>
      </section>

      {/* Grid Section */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <SectionEyebrow text="Product Range" className="justify-center mb-4" />
          <h2 className="text-3xl md:text-5xl font-serif-luxury text-charcoal">
            Pool Covers <span className="italic text-gold">& Systems</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categoryProducts.map((product, idx) => (
            <ProductCard key={product.slug} product={product} index={idx} />
          ))}
          
          {/* If there are no other accessories, let's write a helpful note or show additional specs */}
          {categoryProducts.length === 0 && (
            <div className="col-span-full text-center py-12 text-warm-gray text-sm">
              No products found in this category.
            </div>
          )}
        </div>
      </section>

      {/* Evaporation Protection Section */}
      <section className="py-20 bg-white border-y border-gold-light/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <RevealWrapper className="flex flex-col gap-6">
              <SectionEyebrow text="Evaporation Control" />
              <h2 className="text-3xl md:text-5xl font-serif-luxury text-charcoal leading-tight">
                Retain up to 98% of your pool&apos;s <span className="italic text-gold">water & heat</span>
              </h2>
              <p className="text-warm-gray text-base font-light leading-relaxed">
                When a pool is heated, thermal energy escapes through evaporation, especially at night when ambient air temperature drops. This leads to massive energy loss, requiring the pool heat pump to consume unnecessary electricity to re-heat the pool.
              </p>
              <p className="text-warm-gray text-base font-light leading-relaxed">
                Innmotek **Thermal Shield** automated pool covers completely block evaporation. Built using UV-stabilized extruded PVC slats, they float on the surface, trapping heat and cutting pool heating costs by up to 50%. The slats are structurally rigid, supporting the weight of a child or pet for peace of mind.
              </p>
            </RevealWrapper>

            <RevealWrapper delay={0.2} className="grid grid-cols-2 gap-6">
              <div className="p-6 bg-cream/40 rounded-2xl border border-gold-light/15 flex flex-col gap-3">
                <Sun className="w-8 h-8 text-gold" />
                <h4 className="font-semibold text-charcoal text-sm">98% Evap Stop</h4>
                <p className="text-warm-gray text-xs font-light">Prevents water vapor escaping, preserving chemicals and heat.</p>
              </div>
              <div className="p-6 bg-cream/40 rounded-2xl border border-gold-light/15 flex flex-col gap-3">
                <ShieldCheck className="w-8 h-8 text-gold" />
                <h4 className="font-semibold text-charcoal text-sm">Child Safety</h4>
                <p className="text-warm-gray text-xs font-light">Supports localized weight, preventing accidental falls.</p>
              </div>
              <div className="p-6 bg-cream/40 rounded-2xl border border-gold-light/15 flex flex-col gap-3">
                <CloudLightning className="w-8 h-8 text-gold" />
                <h4 className="font-semibold text-charcoal text-sm">Motorized Action</h4>
                <p className="text-warm-gray text-xs font-light">24V DC waterproof rollers slide open or shut via app or switch.</p>
              </div>
              <div className="p-6 bg-cream/40 rounded-2xl border border-gold-light/15 flex flex-col gap-3">
                <Sparkles className="w-8 h-8 text-gold" />
                <h4 className="font-semibold text-charcoal text-sm">Debris Block</h4>
                <p className="text-warm-gray text-xs font-light">Keeps dust, leaves, and rain pollutants out of pool water.</p>
              </div>
            </RevealWrapper>
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <section className="py-20 max-w-5xl mx-auto px-6 text-center flex flex-col items-center gap-6">
        <SectionEyebrow text="Custom Fit Design" />
        <h2 className="text-3xl md:text-5xl font-serif-luxury text-charcoal">
          Get a Custom Cover <span className="italic text-gold">Quote</span>
        </h2>
        <p className="text-warm-gray text-sm font-light max-w-xl">
          Our technical team fabricates covers customized to the exact curvature and width of your pool. Reach out with pool dimensions.
        </p>
        <Link
          href="/contact?interest=accessories"
          className="bg-charcoal text-white hover:bg-gold hover:text-charcoal px-8 py-4 rounded-full text-xs uppercase tracking-[2px] font-semibold transition-all duration-300"
        >
          Request Cover Layout
        </Link>
      </section>
    </div>
  );
}
