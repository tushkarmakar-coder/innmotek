"use client";

import React, { useState, useMemo } from "react";
import SectionEyebrow from "@/components/SectionEyebrow";
import { MessageCircle, Search, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const FAQ_CATEGORIES = [
  { id: "all", label: "All Questions" },
  { id: "general", label: "General" },
  { id: "heat-pumps", label: "Heat Pumps" },
  { id: "pool-systems", label: "Pool Systems" },
  { id: "fireplaces", label: "Fireplaces & Grills" },
  { id: "warranty", label: "Warranty & Service" },
];

const FAQ_DATA: FAQItem[] = [
  {
    category: "general",
    question: "Where is Innmotek based, and do you ship across India?",
    answer: "Innmotek is proudly based in Gorakhpur, Uttar Pradesh, with our primary manufacturing unit located in the GIDA Industrial Area, Sahjanwa. We provide safe, crated shipping and certified installation services across all states in India."
  },
  {
    category: "general",
    question: "What makes Innmotek different from local heating contractors?",
    answer: "Unlike contractors who assemble systems using mismatched generic parts, Innmotek is a direct manufacturer. We write our own inverter board firmware, run custom thermal modeling for your specific climate, and deploy our own factory-trained engineers for nationwide commissioning."
  },
  {
    category: "heat-pumps",
    question: "How does an Air Source Heat Pump achieve over 400% efficiency?",
    answer: "Traditional heaters burn fuel or use electrical resistance to generate heat, which maxes out at 100% efficiency. An Innmotek heat pump does not generate heat; it extracts free heat from the outside air and moves it indoors using a refrigeration cycle. It uses only 1 kW of electricity to transfer up to 4.87 kW of heat."
  },
  {
    category: "heat-pumps",
    question: "Do air source heat pumps work during harsh North Indian winters?",
    answer: "Yes, our DuraHeat Elite series is specifically designed and laboratory-tested to deliver stable space heating and hot water at ambient temperatures as low as -25°C. The system uses automated hot gas defrosting to prevent ice buildup on outdoor fins."
  },
  {
    category: "heat-pumps",
    question: "What is the life expectancy of an Innmotek Heat Pump?",
    answer: "With periodic annual cleaning, our heat pumps are designed to last 12 to 15 years. We build them using heavy-gauge metal casings, anti-corrosive hydrophilic heat exchangers, and twin-rotary DC compressors from tier-1 global manufacturers."
  },
  {
    category: "pool-systems",
    question: "Why should I use a pool heat pump instead of a solar pool heater?",
    answer: "Solar pool heaters rely entirely on direct sunlight, meaning they fail on cloudy days, during monsoon season, or at night when pools cool down fastest. Innmotek AquaTemp Pool Heat Pumps extract heat from the air day or night, rain or shine, keeping your pool at a stable 28°C to 32°C."
  },
  {
    category: "pool-systems",
    question: "Does chlorine or salt water corrode the pool heat pump?",
    answer: "No. Innmotek pool heat pumps utilize twisted titanium tube-in-shell heat exchangers. Titanium is completely immune to corrosion from pool chemicals, chlorine, and salt-water chlorination systems, backed by our 5-year warranty."
  },
  {
    category: "fireplaces",
    question: "What is the Helix fireplace, and does it produce smoke inside?",
    answer: "The Helix is our flagship wood-fired fireplace. It features a sealed double-combustion clean burn system. Primary and secondary air intakes draw smoke back into the flames for a second combustion. Flue gas is drafted safely out of a chimney, ensuring 0% smoke enters your living room."
  },
  {
    category: "fireplaces",
    question: "How do I clean the glass window of the Helix fireplace?",
    answer: "You rarely have to. The Helix is designed with an active 'Airwash' system. It directs a layer of cold air down the interior of the glass, creating a barrier that prevents soot, ash, and carbon from sticking, keeping your view of the flames clean."
  },
  {
    category: "warranty",
    question: "What does the 5-year warranty cover?",
    answer: "Our comprehensive 5-year warranty covers all structural components, the compressor, R32 refrigerant lines, and electronic boards. In the rare event of a fault, our service center dispatches a certified technician directly to your location with original factory spares."
  },
  {
    category: "warranty",
    question: "How often does the system require maintenance?",
    answer: "We recommend an annual service check before winter or the summer swim season. Maintenance involves cleaning the evaporator coils, checking refrigerant pressures, inspecting electrical connections, and cleaning water filters to preserve COP ratings."
  }
];

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Filter FAQs based on active category and search keyword
  const filteredFAQs = useMemo(() => {
    return FAQ_DATA.filter((faq) => {
      const matchesCategory = activeCategory === "all" || faq.category === activeCategory;
      const matchesSearch =
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="pt-24 pb-20">
      {/* Mini Hero */}
      <section className="bg-charcoal text-cream py-20 relative overflow-hidden">
        <div className="grain-overlay" />
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <SectionEyebrow text="Knowledge Base" className="justify-center mb-4" />
          <h1 className="text-5xl md:text-7xl font-serif-luxury font-light mb-6 tracking-wide">
            Frequently Asked <span className="italic text-gold">FAQs</span>
          </h1>
          <p className="text-warm-gray text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-light">
            Search our comprehensive guides or filter by product type to find quick answers on installation, energy savings, and warranty support.
          </p>
        </div>
      </section>

      {/* Main Section */}
      <section className="py-20 max-w-4xl mx-auto px-6">
        {/* Search Bar */}
        <div className="relative mb-12 shadow-luxury rounded-full overflow-hidden border border-gold-light/20 bg-white">
          <span className="absolute left-6 top-1/2 -translate-y-1/2 text-gold">
            <Search className="w-5 h-5" />
          </span>
          <input
            type="text"
            placeholder="Search FAQs by keywords (e.g., efficiency, warranty, GIDA)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-14 pr-6 py-5 text-sm bg-white text-charcoal outline-none focus:ring-1 focus:ring-gold transition-all"
          />
        </div>

        {/* Categories Tab Bar */}
        <div className="flex overflow-x-auto gap-2 pb-6 border-b border-gold-light/10 mb-10 no-scrollbar">
          {FAQ_CATEGORIES.map((category) => (
            <button
              key={category.id}
              onClick={() => {
                setActiveCategory(category.id);
                setOpenIndex(null);
              }}
              className={`text-xs uppercase tracking-wider px-5 py-3 rounded-full font-body font-semibold transition-all shrink-0 ${
                activeCategory === category.id
                  ? "bg-charcoal text-cream shadow-md"
                  : "bg-white border border-gold-light/20 text-charcoal hover:bg-cream/40"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* FAQs Accordion */}
        <div className="flex flex-col gap-4 min-h-[300px]">
          <AnimatePresence mode="popLayout">
            {filteredFAQs.length > 0 ? (
              filteredFAQs.map((faq, index) => {
                const isOpen = openIndex === index;
                return (
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 15 }}
                    transition={{ duration: 0.3 }}
                    key={faq.question}
                    className="bg-white border border-gold-light/15 rounded-xl overflow-hidden shadow-sm"
                  >
                    <button
                      onClick={() => toggleFAQ(index)}
                      className="w-full text-left p-6 flex justify-between items-center gap-4 hover:bg-cream/20 transition-colors"
                    >
                      <span className="font-serif-luxury text-lg md:text-xl text-charcoal pr-4">
                        {faq.question}
                      </span>
                      <motion.span
                        animate={{ rotate: isOpen ? 135 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-gold shrink-0 bg-cream p-1.5 rounded-full"
                      >
                        <ChevronDown className="w-4 h-4" />
                      </motion.span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: "auto" }}
                          exit={{ height: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="border-t border-gold-light/10"
                        >
                          <div className="p-6 text-sm md:text-base text-warm-gray leading-relaxed font-light bg-cream/10">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16 flex flex-col items-center gap-4 bg-white border border-gold-light/15 rounded-2xl p-8"
              >
                <span className="text-5xl">🔍</span>
                <h3 className="font-serif-luxury text-2xl text-charcoal">No matching questions found</h3>
                <p className="text-warm-gray text-xs max-w-sm">
                  We couldn&apos;t find any FAQs matching &quot;{searchQuery}&quot;. Try using different terms or consult our support lines.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* WhatsApp CTA Section */}
      <section className="py-16 max-w-3xl mx-auto px-6">
        <div className="bg-gradient-to-br from-charcoal to-navy text-white rounded-3xl p-8 md:p-12 border border-gold-light/20 text-center relative overflow-hidden shadow-luxury">
          <div className="grain-overlay" />
          <div className="relative z-10 flex flex-col items-center gap-4">
            <span className="w-12 h-12 rounded-full bg-[#25D366]/20 border border-[#25D366]/30 flex items-center justify-center text-[#25D366] mb-2 animate-bounce">
              <MessageCircle className="w-6 h-6" />
            </span>
            <h2 className="text-2xl md:text-4xl font-serif-luxury">Still have questions?</h2>
            <p className="text-white/60 text-xs md:text-sm font-light max-w-md mb-4">
              Get an instant response. Our tech support engineers are available on WhatsApp to answer detailed mechanical or thermodynamic questions.
            </p>
            <a
              href="https://wa.me/919999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] hover:bg-[#20ba5a] text-white px-8 py-4 rounded-full text-xs uppercase tracking-[2px] font-semibold transition-all duration-300 shadow-md flex items-center gap-2"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
