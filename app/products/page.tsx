"use client";

import React, { useState, useMemo } from "react";
import SectionEyebrow from "@/components/SectionEyebrow";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/products";
import { motion, AnimatePresence } from "framer-motion";

const CATEGORIES = [
  { id: "all", label: "All Products" },
  { id: "heat-pumps", label: "Heat Pumps" },
  { id: "pool-pumps", label: "Pool Systems" },
  { id: "fireplaces", label: "Fireplaces" },
  { id: "bbq-grills", label: "BBQ Grills" },
  { id: "accessories", label: "Accessories" },
];

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredProducts = useMemo(() => {
    if (selectedCategory === "all") return products;
    return products.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="pt-24 pb-20">
      {/* Mini Hero */}
      <section className="bg-charcoal text-cream py-24 relative overflow-hidden">
        <div className="grain-overlay" />
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <SectionEyebrow text="Product Catalog" className="justify-center mb-4" />
          <h1 className="text-5xl md:text-7xl font-serif-luxury font-light mb-6 tracking-wide">
            Our <span className="italic text-gold">Solutions</span>
          </h1>
          <p className="text-warm-gray text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-light">
            Browse our premium thermodynamic heating systems, clean-combustion wood fireplaces, and modular outdoor cooking grills.
          </p>
        </div>
      </section>

      {/* Main Filter & Grid */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        {/* Category Filters */}
        <div className="flex overflow-x-auto gap-2 pb-6 border-b border-gold-light/10 mb-12 no-scrollbar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`text-xs uppercase tracking-wider px-6 py-3.5 rounded-full font-body font-semibold transition-all shrink-0 ${
                selectedCategory === cat.id
                  ? "bg-charcoal text-cream shadow-md"
                  : "bg-white border border-gold-light/20 text-charcoal hover:bg-cream/40"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, idx) => (
              <motion.div
                key={product.slug}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="h-full"
              >
                <ProductCard product={product} index={idx} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>
    </div>
  );
}
