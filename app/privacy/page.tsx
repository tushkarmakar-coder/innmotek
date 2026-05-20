"use client";

import React from "react";
import SectionEyebrow from "@/components/SectionEyebrow";
import RevealWrapper from "@/components/RevealWrapper";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPage() {
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
            Privacy <span className="italic text-gold">Policy</span>
          </h1>
          <p className="text-warm-gray text-sm">Last updated: May 20, 2026</p>
        </header>

        {/* Policy Content */}
        <RevealWrapper className="prose prose-luxury max-w-none text-warm-gray font-light text-sm md:text-base leading-relaxed flex flex-col gap-8">
          <section className="flex flex-col gap-3">
            <h2 className="text-xl font-serif-luxury text-charcoal font-semibold">1. Introduction</h2>
            <p>
              Welcome to Innmotek Private Limited (&quot;we,&quot; &quot;our,&quot; &quot;us&quot;). We are committed to protecting your personal data and respecting your privacy. This Privacy Policy outlines how we collect, process, share, and protect your information when you visit our website <a href="https://innmotek.com" className="text-gold underline">innmotek.com</a>, purchase our products, or engage with our services.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xl font-serif-luxury text-charcoal font-semibold">2. Information We Collect</h2>
            <p>
              We collect information that you directly provide to us, including:
            </p>
            <ul className="list-disc pl-5 flex flex-col gap-1">
              <li><strong>Contact Information:</strong> Name, billing/shipping address, email address, phone number (+91 808 174 1031).</li>
              <li><strong>Inquiry Details:</strong> Site heating requirements, water volumes, project configurations, or custom sizing metrics.</li>
              <li><strong>Usage Details:</strong> Cookies, IP address, device specs, browser properties, and navigation trends on our interface.</li>
            </ul>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xl font-serif-luxury text-charcoal font-semibold">3. How We Use Your Information</h2>
            <p>
              We utilize your data for key business processes, specifically:
            </p>
            <ul className="list-disc pl-5 flex flex-col gap-1">
              <li>To evaluate and process custom sizing designs for our hot water heat pumps and swimming pool heaters.</li>
              <li>To arrange transportation, local crating, and certified engineer installation services at your location.</li>
              <li>To register and administer your 5-Year Comprehensive Product Warranty.</li>
              <li>To send service notifications, preventative maintenance suggestions, and promotional catalogues.</li>
            </ul>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xl font-serif-luxury text-charcoal font-semibold">4. Data Sharing & Security</h2>
            <p>
              We do not sell your personal data. We only share details with trusted logistics providers, payment processors, or certified service engineers strictly to fulfill orders. All digital information is securely stored on encrypted servers behind firewalls to prevent unauthorized access.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xl font-serif-luxury text-charcoal font-semibold">5. Location & Jurisdiction</h2>
            <p>
              Our primary offices and manufacturing operations are located in GIDA Industrial Area, Sahjanwa, Gorakhpur, Uttar Pradesh, India. Any disputes arising under this Policy will be subject to the exclusive jurisdiction of the courts of Gorakhpur, UP.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xl font-serif-luxury text-charcoal font-semibold">6. Contact Information</h2>
            <p>
              For privacy concerns, data removal requests, or policy updates, reach out to our privacy officer:
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
