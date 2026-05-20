"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Logo from "@/components/Logo";


export default function Footer() {
  return (
    <footer className="bg-charcoal text-cream pt-20 pb-8 relative overflow-hidden border-t border-gold/10">
      {/* Background Subtle Grain */}
      <div className="grain-overlay" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Top Section: Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Column 1: Brand Description */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="transition-colors duration-300 text-white hover:opacity-90 flex items-center">
              <Logo layout="horizontal" iconSize={32} />
            </Link>
            <p className="text-warm-gray text-sm leading-relaxed max-w-sm">
              Premium manufacturer of energy-efficient heat pumps, swimming pool heat pumps, wood-fired fireplaces, and custom BBQ grills. Based in Gorakhpur, UP, India.
            </p>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-warm-gray hover:text-gold hover:border-gold transition-all duration-300"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-warm-gray hover:text-gold hover:border-gold transition-all duration-300"
              >
                <svg className="w-4 h-4 stroke-current fill-none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-warm-gray hover:text-gold hover:border-gold transition-all duration-300"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-warm-gray hover:text-gold hover:border-gold transition-all duration-300"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.507a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.87.507 9.388.507 9.388.507s7.518 0 9.388-.507a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Products */}
          <div>
            <h4 className="text-xs font-body tracking-[4px] uppercase text-gold font-semibold mb-6">
              Products
            </h4>
            <ul className="flex flex-col gap-3 text-sm">
              <li>
                <Link href="/products/heat-pumps" className="text-warm-gray hover:text-white transition-colors duration-300">
                  Air Source Heat Pumps
                </Link>
              </li>
              <li>
                <Link href="/products/pool-pumps" className="text-warm-gray hover:text-white transition-colors duration-300">
                  Swimming Pool Heat Pumps
                </Link>
              </li>
              <li>
                <Link href="/products/fireplaces" className="text-warm-gray hover:text-white transition-colors duration-300">
                  Wood Fired Fireplaces (Helix)
                </Link>
              </li>
              <li>
                <Link href="/products/bbq-grills" className="text-warm-gray hover:text-white transition-colors duration-300">
                  BBQ Grills & Outdoor
                </Link>
              </li>
              <li>
                <Link href="/products/accessories" className="text-warm-gray hover:text-white transition-colors duration-300">
                  Pool Covers & Accessories
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h4 className="text-xs font-body tracking-[4px] uppercase text-gold font-semibold mb-6">
              Company
            </h4>
            <ul className="flex flex-col gap-3 text-sm">
              <li>
                <Link href="/about" className="text-warm-gray hover:text-white transition-colors duration-300">
                  About Innmotek
                </Link>
              </li>
              <li>
                <Link href="/why-innmotek" className="text-warm-gray hover:text-white transition-colors duration-300">
                  Why Choose Us
                </Link>
              </li>
              <li>
                <Link href="/process" className="text-warm-gray hover:text-white transition-colors duration-300">
                  Our Process
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-warm-gray hover:text-white transition-colors duration-300">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-warm-gray hover:text-white transition-colors duration-300">
                  Frequently Asked FAQs
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-warm-gray hover:text-white transition-colors duration-300">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter Input Row */}
          <div>
            <h4 className="text-xs font-body tracking-[4px] uppercase text-gold font-semibold mb-6">
              Newsletter
            </h4>
            <p className="text-warm-gray text-sm leading-relaxed mb-4">
              Subscribe to receive updates on energy efficiency tips and new products.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex items-center">
              <div className="relative w-full">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full bg-white/5 border border-white/10 text-cream px-4 py-3 text-sm rounded-l focus:outline-none focus:border-gold transition-colors duration-300"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-gold hover:bg-gold-light text-charcoal px-5 py-3 rounded-r transition-colors duration-300 flex items-center justify-center"
                aria-label="Subscribe"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/5 my-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          <div className="flex flex-col gap-1 text-center lg:text-left">
            <p className="text-xs text-warm-gray">
              © {new Date().getFullYear()} Innmotek India. All Rights Reserved. Manufactured at GIDA Industrial Area, Sahjanwa, Gorakhpur, UP.
            </p>
            <p className="text-xs text-warm-gray">
              Developed by{" "}
              <a
                href="https://brandnestagency.vercel.app/"
                target="_blank"
                rel="noreferrer"
                className="text-gold hover:text-gold-light transition-colors"
              >
                Brandnest - India&apos;s First AI Powered Web & Digital Marketing Agency
              </a>
            </p>
          </div>
          <div className="flex gap-6 text-xs text-warm-gray">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
