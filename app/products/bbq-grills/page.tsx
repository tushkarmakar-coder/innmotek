"use client";

import React from "react";
import SectionEyebrow from "@/components/SectionEyebrow";
import ProductCard from "@/components/ProductCard";
import RevealWrapper from "@/components/RevealWrapper";
import { getProductsByCategory } from "@/lib/products";
import { Sparkles, Utensils, Shield, Thermometer } from "lucide-react";
import Link from "next/link";

export default function BbqGrillsCategoryPage() {
  const categoryProducts = getProductsByCategory("bbq-grills");

  return (
    <div className="pt-24 pb-20">
      {/* Mini Hero */}
      <section className="bg-charcoal text-cream py-20 relative overflow-hidden">
        <div className="grain-overlay" />
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <SectionEyebrow text="BBQ Grills & Outdoor" className="justify-center mb-4" />
          <h1 className="text-5xl md:text-7xl font-serif-luxury font-light mb-6 tracking-wide">
            TerraGrill <span className="italic text-gold">Series</span>
          </h1>
          <p className="text-warm-gray text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-light font-body">
            Heavy-gauge 304 marine stainless steel outdoor kitchens. Engineered for temperature control and culinary perfection.
          </p>
        </div>
      </section>

      {/* Grid Section */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <SectionEyebrow text="Professional Grilling" className="justify-center mb-4" />
          <h2 className="text-3xl md:text-5xl font-serif-luxury text-charcoal">
            Premium BBQ <span className="italic text-gold">Grills</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categoryProducts.map((product, idx) => (
            <ProductCard key={product.slug} product={product} index={idx} />
          ))}
        </div>
      </section>

      {/* Culinary Tech Section */}
      <section className="py-20 bg-white border-y border-gold-light/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <RevealWrapper className="flex flex-col gap-6">
              <SectionEyebrow text="Outdoor Kitchen Craftsmanship" />
              <h2 className="text-3xl md:text-5xl font-serif-luxury text-charcoal leading-tight">
                Designed for high heat and <span className="italic text-gold">harsh weather</span>
              </h2>
              <p className="text-warm-gray text-base font-light leading-relaxed">
                Standard sheet-metal grills quickly rust when exposed to moisture and rain on outdoor patios. They also leak heat, requiring massive amounts of charcoal to maintain high temperatures.
              </p>
              <p className="text-warm-gray text-base font-light leading-relaxed">
                The Innmotek **TerraGrill** is built using double-walled **304 marine-grade stainless steel** and features high-temperature insulation inside the hood. This guarantees uniform baking, smoking, and searing heat, while protecting the exterior frame from corrosion for years.
              </p>
            </RevealWrapper>

            <RevealWrapper delay={0.2} className="grid grid-cols-2 gap-6">
              <div className="p-6 bg-cream/40 rounded-2xl border border-gold-light/15 flex flex-col gap-3">
                <Shield className="w-8 h-8 text-gold" />
                <h4 className="font-semibold text-charcoal text-sm">304 Stainless</h4>
                <p className="text-warm-gray text-xs font-light">Weatherproof marine steel frame designed for outdoor elements.</p>
              </div>
              <div className="p-6 bg-cream/40 rounded-2xl border border-gold-light/15 flex flex-col gap-3">
                <Thermometer className="w-8 h-8 text-gold" />
                <h4 className="font-semibold text-charcoal text-sm">Dual Zone Heat</h4>
                <p className="text-warm-gray text-xs font-light">Height-adjustable charcoal trays provide precise control over direct and indirect heat.</p>
              </div>
              <div className="p-6 bg-cream/40 rounded-2xl border border-gold-light/15 flex flex-col gap-3">
                <Utensils className="w-8 h-8 text-gold" />
                <h4 className="font-semibold text-charcoal text-sm">Modular Grates</h4>
                <p className="text-warm-gray text-xs font-light">Interchangeable cast iron surfaces for searing, smoking, or griddling.</p>
              </div>
              <div className="p-6 bg-cream/40 rounded-2xl border border-gold-light/15 flex flex-col gap-3">
                <Sparkles className="w-8 h-8 text-gold" />
                <h4 className="font-semibold text-charcoal text-sm">Clean Drawer</h4>
                <p className="text-warm-gray text-xs font-light">Removable airtight ash collection pan makes cleanup effortless.</p>
              </div>
            </RevealWrapper>
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <section className="py-20 max-w-5xl mx-auto px-6 text-center flex flex-col items-center gap-6">
        <SectionEyebrow text="Outdoor Sizing Support" />
        <h2 className="text-3xl md:text-5xl font-serif-luxury text-charcoal">
          Plan Your Outdoor Kitchen <span className="italic text-gold">Layout</span>
        </h2>
        <p className="text-warm-gray text-sm font-light max-w-xl">
          Get dimensions and custom configurations for built-in grills, outdoor counter integration, and gas line planning.
        </p>
        <Link
          href="/contact?interest=bbq-grills"
          className="bg-charcoal text-white hover:bg-gold hover:text-charcoal px-8 py-4 rounded-full text-xs uppercase tracking-[2px] font-semibold transition-all duration-300"
        >
          Consult Kitchen Designer
        </Link>
      </section>
    </div>
  );
}
