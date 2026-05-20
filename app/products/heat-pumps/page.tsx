"use client";

import React from "react";
import SectionEyebrow from "@/components/SectionEyebrow";
import ProductCard from "@/components/ProductCard";
import RevealWrapper from "@/components/RevealWrapper";
import { getProductsByCategory } from "@/lib/products";
import { ShieldCheck, Snowflake, Thermometer, Zap } from "lucide-react";
import Link from "next/link";

export default function HeatPumpsCategoryPage() {
  const categoryProducts = getProductsByCategory("heat-pumps");

  return (
    <div className="pt-24 pb-20">
      {/* Mini Hero */}
      <section className="bg-charcoal text-cream py-20 relative overflow-hidden">
        <div className="grain-overlay" />
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <SectionEyebrow text="Air Source Heat Pumps" className="justify-center mb-4" />
          <h1 className="text-5xl md:text-7xl font-serif-luxury font-light mb-6 tracking-wide">
            DuraHeat <span className="italic text-gold">Technology</span>
          </h1>
          <p className="text-warm-gray text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-light font-body">
            State-of-the-art house heating and sanitary hot water systems engineered to operate down to -25°C with up to 75% energy savings.
          </p>
        </div>
      </section>

      {/* Grid Section */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <SectionEyebrow text="Available Models" className="justify-center mb-4" />
          <h2 className="text-3xl md:text-5xl font-serif-luxury text-charcoal">
            Industrial & Home <span className="italic text-gold">Systems</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categoryProducts.map((product, idx) => (
            <ProductCard key={product.slug} product={product} index={idx} />
          ))}
        </div>
      </section>

      {/* Thermodynamic Section */}
      <section className="py-20 bg-white border-y border-gold-light/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <RevealWrapper className="flex flex-col gap-6">
              <SectionEyebrow text="The Thermodynamic Advantage" />
              <h2 className="text-3xl md:text-5xl font-serif-luxury text-charcoal leading-tight">
                How our air source heat pumps <span className="italic text-gold">perform</span>
              </h2>
              <p className="text-warm-gray text-base font-light leading-relaxed">
                Traditional electric geysers heat water by turning electrical current into heat energy. This process is limited to a 1:1 ratio. 
              </p>
              <p className="text-warm-gray text-base font-light leading-relaxed">
                Innmotek DuraHeat systems use a highly optimized refrigeration loop. By compressing gas, we extract thermal energy from the ambient air, transferring it to your domestic hot water loop. This produces up to 4.87 kW of heat energy for every 1 kW of electricity input.
              </p>
            </RevealWrapper>

            <RevealWrapper delay={0.2} className="grid grid-cols-2 gap-6">
              <div className="p-6 bg-cream/40 rounded-2xl border border-gold-light/15 flex flex-col gap-3">
                <Thermometer className="w-8 h-8 text-gold" />
                <h4 className="font-semibold text-charcoal text-sm">80°C Max Out</h4>
                <p className="text-warm-gray text-xs font-light">Industry-leading output temperatures for sanitary sterilization.</p>
              </div>
              <div className="p-6 bg-cream/40 rounded-2xl border border-gold-light/15 flex flex-col gap-3">
                <Snowflake className="w-8 h-8 text-gold" />
                <h4 className="font-semibold text-charcoal text-sm">-25°C Operational</h4>
                <p className="text-warm-gray text-xs font-light">Custom defrosting control keeps operation stable in deep winter.</p>
              </div>
              <div className="p-6 bg-cream/40 rounded-2xl border border-gold-light/15 flex flex-col gap-3">
                <Zap className="w-8 h-8 text-gold" />
                <h4 className="font-semibold text-charcoal text-sm">75% Saving</h4>
                <p className="text-warm-gray text-xs font-light">Reduces hot water heating expenses by up to three-quarters.</p>
              </div>
              <div className="p-6 bg-cream/40 rounded-2xl border border-gold-light/15 flex flex-col gap-3">
                <ShieldCheck className="w-8 h-8 text-gold" />
                <h4 className="font-semibold text-charcoal text-sm">5-Year Warranty</h4>
                <p className="text-warm-gray text-xs font-light">Comprehensive local backup and certified service nationwide.</p>
              </div>
            </RevealWrapper>
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <section className="py-20 max-w-5xl mx-auto px-6 text-center flex flex-col items-center gap-6">
        <SectionEyebrow text="Engineering & Sizing Support" />
        <h2 className="text-3xl md:text-5xl font-serif-luxury text-charcoal">
          Get a Custom Heating <span className="italic text-gold">Blueprint</span>
        </h2>
        <p className="text-warm-gray text-sm font-light max-w-xl">
          Let our engineers calculate the perfect heat pump size for your property based on your climate conditions and hot water consumption.
        </p>
        <Link
          href="/contact?interest=heat-pumps"
          className="bg-charcoal text-white hover:bg-gold hover:text-charcoal px-8 py-4 rounded-full text-xs uppercase tracking-[2px] font-semibold transition-all duration-300"
        >
          Consult an Engineer
        </Link>
      </section>
    </div>
  );
}
