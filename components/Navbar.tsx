"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import Logo from "@/components/Logo";


const NAV_LINKS = [
  { href: "/about", label: "About" },
  { href: "/why-innmotek", label: "Why Us" },
  { href: "/process", label: "Our Process" },
  { href: "/projects", label: "Projects" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

const PRODUCT_CATEGORIES = [
  { href: "/products/heat-pumps", label: "Air Source Heat Pumps" },
  { href: "/products/pool-pumps", label: "Swimming Pool Heat Pumps" },
  { href: "/products/fireplaces", label: "Wood Fired Fireplaces (Helix)" },
  { href: "/products/bbq-grills", label: "BBQ Grills & Outdoor" },
  { href: "/products/accessories", label: "Pool Covers & Accessories" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDarkSection, setIsDarkSection] = useState(false);
  const pathname = usePathname();

  // Scroll handler to toggle backdrop glassmorphism and text color
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      if (scrollY > 100) {
        setIsScrolled(true);
        setIsDarkSection(false); // When scrolled past hero, on light section
      } else {
        setIsScrolled(false);
        // If we're at the top of page, we're on the dark hero section
        setIsDarkSection(true);
      }
    };
    
    // Run on initial load
    handleScroll();
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsDropdownOpen(false);
  }, [pathname]);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 py-6 ${
          isScrolled
            ? "bg-white border-b border-gold-light/20 py-4 shadow-luxury/5"
            : "bg-white border-b border-gold-light/10 shadow-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="transition-colors duration-300 text-charcoal hover:opacity-90 flex items-center"
          >
            <Logo layout="horizontal" iconSize={32} />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {/* Products Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <button
                className={`flex items-center gap-1 text-xs uppercase font-body tracking-[2px] py-2 transition-colors duration-300 ${
                  pathname.startsWith("/products")
                    ? "text-gold font-medium"
                    : "text-charcoal hover:text-gold"
                }`}
              >
                Products <ChevronDown className="w-3.5 h-3.5" />
              </button>

              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 15 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute top-full left-1/2 -translate-x-1/2 w-64 bg-white/95 backdrop-blur-md border border-gold-light/20 shadow-luxury rounded-lg py-4 px-2 mt-1"
                  >
                    <div className="flex flex-col gap-1">
                      <Link
                        href="/products"
                        className="text-xs uppercase tracking-wider font-semibold text-gold px-4 py-2 hover:bg-cream/40 rounded transition-colors"
                      >
                        All Products Listing
                      </Link>
                      <div className="h-[1px] bg-gold-light/20 my-1 mx-4" />
                      {PRODUCT_CATEGORIES.map((category) => (
                        <Link
                          key={category.href}
                          href={category.href}
                          className="text-sm text-charcoal/80 hover:text-charcoal hover:bg-cream/40 px-4 py-2 rounded transition-all"
                        >
                          {category.label}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Other Navigation Links */}
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link-underline text-xs uppercase font-body tracking-[2px] transition-colors duration-300 py-2 ${
                  pathname === link.href
                    ? "text-gold font-medium"
                    : "text-charcoal hover:text-gold"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Right CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="/contact?interest=general"
              className="text-xs uppercase tracking-[2px] font-body font-semibold px-6 py-3.5 rounded-full transition-all duration-300 transform hover:-translate-y-0.5 shadow-md hover:shadow-luxury bg-gold text-charcoal hover:bg-charcoal hover:text-gold"
            >
              Get Free Quote
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 transition-colors duration-300 text-charcoal hover:text-gold"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Slide-in Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-white flex flex-col pt-28 px-8 pb-12 overflow-y-auto lg:hidden"
          >
            {/* Background Subtle Grain */}
            <div className="grain-overlay" />

            <div className="flex flex-col gap-8 mb-12">
              <span className="text-xs tracking-[4px] uppercase text-gold font-semibold border-b border-gold-light/20 pb-2">
                Products
              </span>
              <div className="flex flex-col gap-4 pl-4 border-l border-gold-light/20">
                <Link
                  href="/products"
                  className="text-lg font-serif-luxury text-charcoal hover:text-gold"
                >
                  All Products Listing
                </Link>
                {PRODUCT_CATEGORIES.map((category) => (
                  <Link
                    key={category.href}
                    href={category.href}
                    className="text-base text-charcoal/70 hover:text-charcoal hover:translate-x-2 transition-all"
                  >
                    {category.label}
                  </Link>
                ))}
              </div>

              <span className="text-xs tracking-[4px] uppercase text-gold font-semibold border-b border-gold-light/20 pb-2 mt-4">
                Explore
              </span>
              <div className="flex flex-col gap-6 pl-4 border-l border-gold-light/20">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-xl font-serif-luxury text-charcoal hover:text-gold"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="mt-auto flex flex-col gap-4">
              <Link
                href="/contact?interest=general"
                className="bg-charcoal text-white hover:bg-gold hover:text-charcoal text-center text-xs uppercase tracking-[2px] font-body font-semibold py-4 rounded-full transition-all duration-300"
              >
                Get Free Quote
              </Link>
              <div className="text-center text-xs text-warm-gray mt-4">
                Gorakhpur, UP, India • info@innmotek.com
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
