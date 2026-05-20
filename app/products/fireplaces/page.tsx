"use client";

import React from "react";
import SectionEyebrow from "@/components/SectionEyebrow";
import ProductCard from "@/components/ProductCard";
import RevealWrapper from "@/components/RevealWrapper";
import { getProductsByCategory } from "@/lib/products";
import { Flame, Wind, Eye, Sparkles } from "lucide-react";
import Link from "next/link";

export default function FireplacesCategoryPage() {
  const categoryProducts = getProductsByCategory("fireplaces");

  return (
    <div className="pt-24 pb-20">
      {/* Mini Hero */}
      <section className="bg-charcoal text-cream py-20 relative overflow-hidden">
        <div className="grain-overlay" />
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <SectionEyebrow text="Wood-Fired Fireplaces" className="justify-center mb-4" />
          <h1 className="text-5xl md:text-7xl font-serif-luxury font-light mb-6 tracking-wide">
            Helix <span className="italic text-gold">Collection</span>
          </h1>
          <p className="text-warm-gray text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-light font-body">
            Stunning cast-iron wood fireplaces featuring high-efficiency double combustion and an automated airwash self-cleaning window.
          </p>
        </div>
      </section>

      {/* Grid Section */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <SectionEyebrow text="Architectural Fireplaces" className="justify-center mb-4" />
          <h2 className="text-3xl md:text-5xl font-serif-luxury text-charcoal">
            Double Burn <span className="italic text-gold">Fireplaces</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categoryProducts.map((product, idx) => (
            <ProductCard key={product.slug} product={product} index={idx} />
          ))}
        </div>
      </section>

      {/* Double Combustion Technology Section */}
      <section className="py-20 bg-white border-y border-gold-light/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <RevealWrapper className="flex flex-col gap-6">
              <SectionEyebrow text="Double Combustion Technology" />
              <h2 className="text-3xl md:text-5xl font-serif-luxury text-charcoal leading-tight">
                Radiant heat without the <span className="italic text-gold">smoke</span>
              </h2>
              <p className="text-warm-gray text-base font-light leading-relaxed">
                Traditional open brick fireplaces are highly inefficient, venting up to 85% of their heat straight up the chimney. They also release harmful carbon particles and smoke directly into the indoor air.
              </p>
              <p className="text-warm-gray text-base font-light leading-relaxed">
                Innmotek **Helix Fireplaces** feature a sealed cast-iron firebox. By introducing secondary heated air at the top of the chamber, we ignite the unburnt gases and soot particles inside the smoke itself. This double-combustion system boosts efficiency to over 82% and vents clean, soot-free air, meeting the strictest European eco-design guidelines.
              </p>
            </RevealWrapper>

            <RevealWrapper delay={0.2} className="grid grid-cols-2 gap-6">
              <div className="p-6 bg-cream/40 rounded-2xl border border-gold-light/15 flex flex-col gap-3">
                <Flame className="w-8 h-8 text-gold" />
                <h4 className="font-semibold text-charcoal text-sm">82% Efficiency</h4>
                <p className="text-warm-gray text-xs font-light">Draws maximum warmth out of every log, reducing fuel consumption.</p>
              </div>
              <div className="p-6 bg-cream/40 rounded-2xl border border-gold-light/15 flex flex-col gap-3">
                <Wind className="w-8 h-8 text-gold" />
                <h4 className="font-semibold text-charcoal text-sm">Clean Burn</h4>
                <p className="text-warm-gray text-xs font-light">Ignites smoke particles, venting clean air to protect the environment.</p>
              </div>
              <div className="p-6 bg-cream/40 rounded-2xl border border-gold-light/15 flex flex-col gap-3">
                <Eye className="w-8 h-8 text-gold" />
                <h4 className="font-semibold text-charcoal text-sm">Airwash Glass</h4>
                <p className="text-warm-gray text-xs font-light">Automated air currents keep soot from sticking to the window.</p>
              </div>
              <div className="p-6 bg-cream/40 rounded-2xl border border-gold-light/15 flex flex-col gap-3">
                <Sparkles className="w-8 h-8 text-gold" />
                <h4 className="font-semibold text-charcoal text-sm">Aesthetic Focal</h4>
                <p className="text-warm-gray text-xs font-light">Architectural frames designed for minimalist and luxury homes.</p>
              </div>
            </RevealWrapper>
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <section className="py-20 max-w-5xl mx-auto px-6 text-center flex flex-col items-center gap-6">
        <SectionEyebrow text="Home Architecture Service" />
        <h2 className="text-3xl md:text-5xl font-serif-luxury text-charcoal">
          Request Chimney & Flue <span className="italic text-gold">Design</span>
        </h2>
        <p className="text-warm-gray text-sm font-light max-w-xl">
          Consult our draftsmen to plan chimney routing, wall clearance requirements, and floor support loads for your fireplace project.
        </p>
        <Link
          href="/contact?interest=fireplaces"
          className="bg-charcoal text-white hover:bg-gold hover:text-charcoal px-8 py-4 rounded-full text-xs uppercase tracking-[2px] font-semibold transition-all duration-300"
        >
          Consult Fireplace Designer
        </Link>
      </section>
    </div>
  );
}
