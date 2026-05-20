"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { Product } from "@/lib/products";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

// Dynamically import the ProductCanvas to prevent SSR hydration errors
const ProductCanvas = dynamic(() => import("./ProductCanvas"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-slate-900/5 animate-pulse" />,
});

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isTouch, setIsTouch] = useState(true);

  useEffect(() => {
    const checkTouch = () => {
      const hasTouch =
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        (window.matchMedia && window.matchMedia("(pointer: coarse)").matches);
      setIsTouch(hasTouch);
    };
    checkTouch();
    window.addEventListener("resize", checkTouch);
    return () => window.removeEventListener("resize", checkTouch);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -8 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="bg-white border border-gold-light/20 rounded-2xl overflow-hidden shadow-md hover:shadow-luxury transition-shadow duration-500 flex flex-col h-full group"
    >
      {/* Visual Area (3D or CSS Gradient) */}
      <div className={`h-[220px] w-full relative overflow-hidden bg-gradient-to-br ${product.bgGradient} flex items-center justify-center`}>
        {/* Subtle radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.12)_0%,transparent_70%)]" />
        
        {isTouch ? (
          /* Mobile/Touch Fallback: CSS Gradient + Premium Static Photo */
          <div className="w-full h-full relative">
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover select-none"
              priority={index !== undefined && index < 3}
            />
          </div>
        ) : (
          /* Desktop/Tablet: Static image that reveals interactive 3D Canvas on hover */
          <div className="w-full h-full relative">
            <div className="absolute inset-0 z-0">
              <ProductCanvas category={product.category} isHovered={isHovered} />
            </div>
            <motion.div
              animate={{ opacity: isHovered ? 0 : 1, scale: isHovered ? 1.08 : 1 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="w-full h-full absolute inset-0 z-10 pointer-events-none"
            >
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover select-none"
              />
            </motion.div>
          </div>
        )}

        {/* Category Pill / Badge */}
        {product.badge && (
          <span className="absolute top-4 left-4 bg-gold-gradient text-charcoal font-semibold text-[10px] tracking-wider uppercase px-3 py-1.5 rounded-full shadow-md z-20">
            {product.badge}
          </span>
        )}
      </div>

      {/* Content Area */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Category Eyebrow */}
        <span className="text-[10px] font-body tracking-[3px] uppercase text-gold font-semibold mb-2">
          {product.category.replace("-", " ")}
        </span>

        {/* Product Name */}
        <h3 className="font-serif-luxury text-2xl text-charcoal mb-3 group-hover:text-gold transition-colors duration-300">
          {product.name}
        </h3>

        {/* Short Description */}
        <p className="text-warm-gray text-[14px] font-light leading-relaxed mb-6 flex-grow">
          {product.tagline}
        </p>

        {/* Key Specs (Limit to 3 items) */}
        <div className="border-t border-gold-light/10 pt-4 mb-6">
          <ul className="flex flex-col gap-2">
            {product.specs.slice(0, 3).map((spec, i) => (
              <li key={i} className="flex justify-between items-center text-xs">
                <span className="text-warm-gray">{spec.label}</span>
                <span className="font-semibold text-charcoal">{spec.value}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA Link */}
        <Link
          href={`/products/${product.slug}`}
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[2px] text-gold hover:text-gold-dark transition-colors mt-auto group/link"
        >
          View Details
          <ArrowRight className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
}
