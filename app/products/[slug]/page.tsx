"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import { products, getProductBySlug } from "@/lib/products";
import SectionEyebrow from "@/components/SectionEyebrow";
import ProductCard from "@/components/ProductCard";
import { Star, Check, MessageSquare, Download, FileText, Settings, HelpCircle } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";

const ProductCanvas = dynamic(() => import("@/components/ProductCanvas"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-slate-900/5 animate-pulse" />,
});

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export default function ProductDetailPage({ params }: ProductPageProps) {
  const product = getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  // Related products (exclude current product)
  const relatedProducts = products
    .filter((p) => p.slug !== product.slug)
    .slice(0, 3);

  // Tabs state
  const [activeTab, setActiveTab] = useState("overview");

  // 3D Card Tilt mouse tracker
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [isTouch, setIsTouch] = useState(true);

  useEffect(() => {
    const checkTouch = () => {
      const hasTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
      setIsTouch(hasTouch);
    };
    checkTouch();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouch || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;

    // Cap tilt at max 12 degrees
    const rY = (mouseX / (width / 2)) * 12;
    const rX = -(mouseY / (height / 2)) * 12;

    setTilt({ rotateX: rX, rotateY: rY });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  const tabs = [
    { id: "overview", label: "Overview", icon: FileText },
    { id: "specifications", label: "Specifications", icon: Settings },
    { id: "how-it-works", label: "How It Works", icon: HelpCircle },
    { id: "downloads", label: "Downloads", icon: Download },
  ];

  return (
    <div className="pt-28 pb-20">
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-6 mb-8 text-xs tracking-wider uppercase text-warm-gray">
        <Link href="/" className="hover:text-gold transition-colors">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/products" className="hover:text-gold transition-colors">Products</Link>
        <span className="mx-2">/</span>
        <span className="text-charcoal font-semibold">{product.name}</span>
      </div>

      {/* Hero Split Layout */}
      <section className="max-w-7xl mx-auto px-6 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Visual Area with 3D Tilt */}
          <div className="lg:col-span-6 flex flex-col items-center">
            <div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
                transition: "transform 0.15s ease-out",
              }}
              className={`w-full max-w-[500px] h-[380px] md:h-[480px] rounded-3xl overflow-hidden bg-gradient-to-br ${product.bgGradient} border border-gold-light/25 flex items-center justify-center relative shadow-luxury`}
            >
              {isTouch ? (
                /* Mobile/Touch Fallback: CSS Gradient + Premium Static Photo */
                <div className="w-full h-full relative">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 500px"
                    className="object-cover select-none"
                    priority
                  />
                </div>
              ) : (
                /* Desktop/Tablet: Interactive 3D Model */
                <div className="w-full h-full relative">
                  <ProductCanvas category={product.category} isHovered={true} />
                </div>
              )}

              {product.badge && (
                <span className="absolute top-6 left-6 bg-gold-gradient text-charcoal font-semibold text-[10px] tracking-wider uppercase px-4 py-2 rounded-full shadow-lg z-20">
                  {product.badge}
                </span>
              )}
            </div>
          </div>

          {/* Right Column: Product Info */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <span className="text-[11px] font-body tracking-[4px] uppercase text-gold font-semibold">
              Category: {product.category.replace("-", " ")}
            </span>

            <h1 className="font-serif-luxury text-4xl md:text-5xl text-charcoal leading-tight">
              {product.name}
            </h1>

            {/* Rating / Badges Row */}
            <div className="flex items-center gap-4 border-b border-gold-light/10 pb-4">
              <div className="flex items-center gap-1 text-gold">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
                <span className="text-xs text-charcoal font-semibold ml-2">5.0 / 5.0</span>
              </div>
              <div className="h-4 w-[1px] bg-gold-light/20" />
              <span className="bg-gold-light/20 text-gold-dark text-[10px] uppercase font-body font-bold tracking-wider px-2.5 py-1 rounded">
                Verified Quality
              </span>
            </div>

            <p className="text-warm-gray text-base leading-relaxed font-light">
              {product.description}
            </p>

            {/* Specs Grid (First 4 items) */}
            <div className="grid grid-cols-2 gap-4 p-4 bg-white border border-gold-light/15 rounded-2xl">
              {product.specs.slice(0, 4).map((spec, i) => (
                <div key={i} className="flex flex-col gap-1">
                  <span className="text-[10px] uppercase tracking-wider text-warm-gray">{spec.label}</span>
                  <span className="font-serif-luxury text-lg text-charcoal font-bold">{spec.value}</span>
                </div>
              ))}
            </div>

            <hr className="border-gold-light/15" />

            {/* Features Checked List */}
            <div className="flex flex-col gap-3">
              <h4 className="text-xs uppercase tracking-wider font-semibold text-charcoal/80">Key Technical Features</h4>
              <ul className="flex flex-col gap-2">
                {product.features.slice(0, 5).map((feature, i) => (
                  <li key={i} className="flex gap-3 items-start text-sm text-warm-gray">
                    <span className="w-5 h-5 rounded-full bg-[#25D366]/10 flex items-center justify-center text-[#25D366] shrink-0 mt-0.5">
                      <Check className="w-3 h-3" />
                    </span>
                    <span className="font-light">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTAs Row */}
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Link
                href={`/contact?interest=${product.category}&product=${product.slug}`}
                className="bg-charcoal text-white hover:bg-gold hover:text-charcoal px-8 py-4 rounded-full text-center text-xs uppercase tracking-[2px] font-semibold transition-all duration-300 flex-1 shadow-md shadow-luxury/5"
              >
                Get Quote for This Product
              </Link>
              <a
                href="https://wa.me/919999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] hover:bg-[#20ba5a] text-white px-8 py-4 rounded-full text-center text-xs uppercase tracking-[2px] font-semibold transition-all duration-300 flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" /> WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Section below fold */}
      <section className="bg-white border-y border-gold-light/20 py-16">
        <div className="max-w-4xl mx-auto px-6">
          {/* Tabs bar */}
          <div className="flex border-b border-gold-light/15 gap-8 mb-10 overflow-x-auto no-scrollbar">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 pb-4 text-xs uppercase tracking-wider font-semibold border-b-2 transition-all shrink-0 ${
                    isActive ? "border-gold text-gold" : "border-transparent text-warm-gray hover:text-charcoal"
                  }`}
                >
                  <Icon className="w-4 h-4" /> {tab.label}
                </button>
              );
            })}
          </div>

          {/* Tab Content Panels */}
          <div className="min-h-[220px]">
            {activeTab === "overview" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col gap-4 text-warm-gray text-base leading-relaxed font-light"
              >
                <p>
                  The {product.name} is engineered to deliver unmatched thermal efficiency. Designed for residential estates and commercial buildings looking to downsize carbon footprints and cut utility overheads, it incorporates advanced thermodynamics inside a modular, space-saving casing.
                </p>
                <p>
                  By utilizing dynamic twin-rotary inverter compressors, the system performs load matching down to the single Hz, adjusting speed dynamically based on outdoor air temp and target settings.
                </p>
              </motion.div>
            )}

            {activeTab === "specifications" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4"
              >
                {product.specs.map((spec, i) => (
                  <div key={i} className="flex justify-between items-center py-3 border-b border-gold-light/10 text-sm">
                    <span className="text-warm-gray font-light">{spec.label}</span>
                    <span className="font-semibold text-charcoal">{spec.value}</span>
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === "how-it-works" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col gap-4 text-warm-gray text-base leading-relaxed font-light"
              >
                <p className="font-semibold text-charcoal">The Cycle of Efficiency:</p>
                <ol className="list-decimal pl-6 flex flex-col gap-3 mt-2 text-sm">
                  <li>
                    <strong className="text-charcoal">Evaporator (Air intake):</strong> Liquid refrigerant inside copper tubes absorbs heat from passing air, turning the refrigerant into a low-temperature gas.
                  </li>
                  <li>
                    <strong className="text-charcoal">DC Inverter Compressor:</strong> The low-pressure gas is compressed, raising its temperature and pressure significantly.
                  </li>
                  <li>
                    <strong className="text-charcoal">Condenser (Heat Exchange):</strong> Hot gas transfers its thermal energy directly into your domestic water loop or fireplace convection currents, cooling back into liquid.
                  </li>
                  <li>
                    <strong className="text-charcoal">Expansion Valve:</strong> Liquid refrigerant expands back to low pressure, lowering its temperature so the cycle can repeat.
                  </li>
                </ol>
              </motion.div>
            )}

            {activeTab === "downloads" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col gap-4"
              >
                <div className="flex justify-between items-center p-4 bg-cream/40 rounded-xl border border-gold-light/10">
                  <div className="flex gap-3 items-center">
                    <FileText className="w-5 h-5 text-gold" />
                    <div>
                      <span className="text-sm font-semibold text-charcoal block">Technical Datasheet (PDF)</span>
                      <span className="text-xs text-warm-gray">Detailed wiring schemes & sizing dimensions (2.4 MB)</span>
                    </div>
                  </div>
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="p-2.5 rounded-full bg-white border border-gold-light/10 text-gold hover:bg-gold hover:text-white transition-colors"
                  >
                    <Download className="w-4 h-4" />
                  </a>
                </div>

                <div className="flex justify-between items-center p-4 bg-cream/40 rounded-xl border border-gold-light/10">
                  <div className="flex gap-3 items-center">
                    <FileText className="w-5 h-5 text-gold" />
                    <div>
                      <span className="text-sm font-semibold text-charcoal block">Operation Manual & Troubleshooting</span>
                      <span className="text-xs text-warm-gray">Step-by-step smart app setup instructions (4.1 MB)</span>
                    </div>
                  </div>
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="p-2.5 rounded-full bg-white border border-gold-light/10 text-gold hover:bg-gold hover:text-white transition-colors"
                  >
                    <Download className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Related Products Strip */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <SectionEyebrow text="Explore Alternatives" className="justify-center mb-4" />
          <h2 className="text-3xl md:text-5xl font-serif-luxury text-charcoal">
            Related <span className="italic text-gold">Products</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {relatedProducts.map((p, idx) => (
            <ProductCard key={p.slug} product={p} index={idx} />
          ))}
        </div>
      </section>
    </div>
  );
}
