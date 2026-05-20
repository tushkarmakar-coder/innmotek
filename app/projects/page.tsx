"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionEyebrow from "@/components/SectionEyebrow";
import RevealWrapper from "@/components/RevealWrapper";
import { ArrowRight, Flame, Droplets, Shield, ExternalLink } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Static premium projects data
const PROJECTS = [
  {
    id: 1,
    title: "Mussoorie Infinity Pool Resort",
    category: "commercial",
    location: "Mussoorie, Uttarakhand",
    metric: "74% Savings",
    metricLabel: "COP 4.8 efficiency",
    desc: "Designed and installed a high-capacity AquaTemp pool heat pump for a luxury resort's outdoor infinity pool, ensuring constant 30°C water in freezing winter conditions.",
    image: "/images/pool_pump.png",
    specs: ["Water Volume: 150,000L", "Ambient Temp: Down to -5°C", "Model: AquaTemp 45kW"]
  },
  {
    id: 2,
    title: "Goa Luxury Seaside Villa",
    category: "residential",
    location: "Candolim, Goa",
    metric: "80% Savings",
    metricLabel: "vs Gas Boilers",
    desc: "A fully automated residential pool and jacuzzi heating integration, linked with smart temperature controls and retractable thermal covers for maximum heat retention.",
    image: "/images/pool_cover.png",
    specs: ["Water Volume: 45,000L", "Integration: Smart Home Link", "Model: DuraHeat 18kW"]
  },
  {
    id: 3,
    title: "Gorakhpur Manufacturing Unit",
    category: "industrial",
    location: "GIDA Sahjanwa, Uttar Pradesh",
    metric: "70% Savings",
    metricLabel: "Carbon foot reduction",
    desc: "High-temperature industrial hot water loops configured for sanitation processes, providing reliable 75°C output with zero fossil fuel combustion.",
    image: "/images/heat_pump.png",
    specs: ["Process Demand: 8,000L/day", "Temp Target: 75°C", "Model: Industrial DuraHeat 90kW"]
  },
  {
    id: 4,
    title: "Noida Premium Penthouse Estate",
    category: "residential",
    location: "Noida, NCR",
    metric: "75% Savings",
    metricLabel: "Domestic Hot Water",
    desc: "Installed a split-cycle residential hot water system providing instant 60°C water across three floors of bathrooms, kitchen, and helper quarters.",
    image: "/images/heat_pump_closed.png",
    specs: ["Outlets Served: 12", "Storage Capacity: 500L Tank", "Model: Split-Cycle 5kW"]
  },
  {
    id: 5,
    title: "Rishikesh Wellness Sanctuary",
    category: "commercial",
    location: "Rishikesh, Uttarakhand",
    metric: "72% Savings",
    metricLabel: "All-season operation",
    desc: "Eco-friendly thermodynamic heating integration for hot tubs and steam therapy rooms at a premium wellness resort overlooking the Ganges.",
    image: "/images/pool_pump.png",
    specs: ["Spa Pool Volume: 30,000L", "Constant Temp: 38°C", "Model: AquaTemp 22kW"]
  }
];

export default function ProjectsPage() {
  const [filter, setFilter] = useState("all");

  const filteredProjects = filter === "all" 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === filter);

  return (
    <div className="min-h-screen bg-cream pt-28 pb-20">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 mb-16">
        <div className="max-w-3xl">
          <SectionEyebrow text="Our Portfolio" className="mb-4" />
          <h1 className="text-[clamp(36px,5vw,60px)] font-serif-luxury font-light leading-[1.1] text-charcoal mb-6">
            Engineering <span className="italic text-gold">Landmarks</span>
          </h1>
          <p className="text-warm-gray text-base font-light leading-relaxed">
            Discover how Innmotek installs high-performance, thermodynamic heat pumps and pool systems across residences, resorts, and manufacturing complexes in India to secure massive energy savings.
          </p>
        </div>
      </section>

      {/* Filter Buttons */}
      <section className="max-w-7xl mx-auto px-6 mb-12">
        <div className="flex flex-wrap gap-2 border-b border-gold-light/25 pb-4">
          {["all", "residential", "commercial", "industrial"].map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-6 py-2.5 rounded-full text-xs uppercase tracking-[2px] font-semibold transition-all duration-300 ${
                filter === category
                  ? "bg-charcoal text-white shadow-md"
                  : "bg-white text-warm-gray hover:text-charcoal border border-gold-light/10"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Projects Grid */}
      <section className="max-w-7xl mx-auto px-6">
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                key={project.id}
                className="bg-white border border-gold-light/20 rounded-3xl overflow-hidden shadow-md hover:shadow-luxury transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Image Container */}
                  <div className="h-[220px] w-full relative overflow-hidden bg-charcoal/5">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Category tag */}
                    <span className="absolute top-4 left-4 bg-charcoal text-gold font-bold text-[9px] tracking-wider uppercase px-3 py-1 rounded-full border border-gold/20">
                      {project.category}
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="p-6">
                    <div className="flex justify-between items-start gap-4 mb-2">
                      <span className="text-[10px] tracking-wider uppercase text-warm-gray">{project.location}</span>
                    </div>
                    <h3 className="font-serif-luxury text-xl text-charcoal mb-3 group-hover:text-gold transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-warm-gray text-xs font-light leading-relaxed mb-6">
                      {project.desc}
                    </p>

                    {/* Specs list */}
                    <div className="border-t border-gold-light/10 pt-4 flex flex-col gap-2">
                      {project.specs.map((spec, i) => (
                        <div key={i} className="flex items-center gap-2 text-[11px] text-charcoal/70">
                          <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                          <span>{spec}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Info */}
                <div className="p-6 border-t border-gold-light/10 flex justify-between items-center bg-cream/10">
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-[#25D366]">{project.metric}</span>
                    <span className="text-[9px] uppercase tracking-wider text-warm-gray">{project.metricLabel}</span>
                  </div>
                  <Link 
                    href="/contact?interest=consultation" 
                    className="text-[10px] uppercase tracking-[2px] text-gold hover:text-gold-dark font-bold flex items-center gap-1"
                  >
                    Inquire <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Dynamic CTA */}
      <section className="max-w-7xl mx-auto px-6 mt-20">
        <RevealWrapper className="bg-charcoal text-white rounded-3xl p-8 md:p-16 border border-gold-light/20 relative overflow-hidden flex flex-col items-center text-center gap-6">
          <span className="absolute inset-0 flex items-center justify-center text-[clamp(100px,18vw,200px)] font-logo text-white/5 select-none pointer-events-none tracking-widest -z-1">
            PORTFOLIO
          </span>
          
          <SectionEyebrow text="Start Your Project" className="justify-center mb-2" />
          <h2 className="text-3xl md:text-5xl font-serif-luxury text-white">
            Have a project in <span className="italic text-gold">mind?</span>
          </h2>
          <p className="text-white/60 text-sm md:text-base font-light max-w-lg mb-4">
            Connect with our engineering wing for system layout drafts, feasibility calculations, and pricing details.
          </p>

          <Link
            href="/contact"
            className="bg-gold hover:bg-gold-light text-charcoal px-8 py-4 rounded-full text-xs uppercase tracking-[2px] font-semibold transition-all duration-300 shadow-lg"
          >
            Request Site Evaluation →
          </Link>
        </RevealWrapper>
      </section>
    </div>
  );
}
