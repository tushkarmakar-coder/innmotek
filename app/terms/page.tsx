"use client";

import React from "react";
import SectionEyebrow from "@/components/SectionEyebrow";
import RevealWrapper from "@/components/RevealWrapper";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-cream pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/"
            className="text-xs uppercase tracking-[2px] font-bold text-gold hover:text-gold-dark flex items-center gap-1.5 group"
          >
            <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" /> Back to Home
          </Link>
        </div>

        {/* Hero Area */}
        <header className="border-b border-gold-light/25 pb-8 mb-12">
          <SectionEyebrow text="Legal Agreement" className="mb-3" />
          <h1 className="text-4xl md:text-5xl font-serif-luxury font-light text-charcoal mb-4">
            Terms of <span className="italic text-gold">Service</span>
          </h1>
          <p className="text-warm-gray text-sm">Last updated: May 20, 2026</p>
        </header>

        {/* Terms Content */}
        <RevealWrapper className="prose prose-luxury max-w-none text-warm-gray font-light text-sm md:text-base leading-relaxed flex flex-col gap-8">
          <section className="flex flex-col gap-3">
            <h2 className="text-xl font-serif-luxury text-charcoal font-semibold">1. Agreement to Terms</h2>
            <p>
              By accessing our website <a href="https://innmotek.com" className="text-gold underline">innmotek.com</a>, requesting quotes, or purchasing our thermodynamic heating units, pool heat pumps, and accessories, you agree to be bound by these Terms of Service. If you do not agree, please discontinue use immediately.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xl font-serif-luxury text-charcoal font-semibold">2. Product Purchases & Deliveries</h2>
            <p>
              All orders placed for Innmotek heat pumps or outdoor systems are subject to custom production runs and freight logistics:
            </p>
            <ul className="list-disc pl-5 flex flex-col gap-1">
              <li><strong>Site Sizing:</strong> You are responsible for providing precise project dimension inputs. Incorrect volume calculations are not covered under exchange policies.</li>
              <li><strong>Shipping:</strong> Safe shipping and wooden crating is arranged from our GIDA, Gorakhpur factory. Shipping timelines vary depending on state destinations.</li>
              <li><strong>Installation:</strong> Installation must be commissioned by certified Innmotek engineers or authorized technicians. Unauthorized setups will immediately void warranty protocols.</li>
            </ul>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xl font-serif-luxury text-charcoal font-semibold">3. 5-Year Comprehensive Warranty</h2>
            <p>
              We provide a 5-Year Comprehensive Warranty on our heat pump products, covering the compressor, refrigerant integrity, and control boards. Warranty eligibility requires compliance with installation rules and standard maintenance processes as detailed in product manual packets.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xl font-serif-luxury text-charcoal font-semibold">4. Intellectual Property</h2>
            <p>
              All designs, visual assets, 3D model visualizers, logos, copy structure, and graphics on this website are protected under copyright, trademark, and trade dress regulations. No component of this site may be duplicated or distributed without explicit written permission from Innmotek.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xl font-serif-luxury text-charcoal font-semibold">5. Governing Law</h2>
            <p>
              These terms and any transaction completed with Innmotek Pvt Ltd are governed by the laws of India. Any litigation or dispute resolution will be conducted exclusively within the city limits of Gorakhpur, Uttar Pradesh.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xl font-serif-luxury text-charcoal font-semibold">6. Corporate Contact</h2>
            <p>
              For inquiries regarding service contracts, B2B wholesale orders, or legal agreements, please reach out:
            </p>
            <div className="bg-white border border-gold-light/15 p-6 rounded-2xl mt-2 font-normal text-charcoal text-xs md:text-sm flex flex-col gap-1.5 shadow-sm">
              <p><strong>Entity Name:</strong> Innmotek Pvt Ltd</p>
              <p><strong>Email Address:</strong> <a href="mailto:info@innmotek.com" className="text-gold hover:underline">info@innmotek.com</a></p>
              <p><strong>Corporate Office:</strong> Sector 4, GIDA Industrial Area, Sahjanwa, Gorakhpur, Uttar Pradesh - 273209</p>
              <p><strong>Phone Number:</strong> +91 808 174 1031</p>
            </div>
          </section>
        </RevealWrapper>
      </div>
    </div>
  );
}
