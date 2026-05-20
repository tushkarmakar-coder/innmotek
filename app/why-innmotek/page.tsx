"use client";

import React, { useState, useEffect } from "react";
import SectionEyebrow from "@/components/SectionEyebrow";
import RevealWrapper from "@/components/RevealWrapper";
import { Check, Leaf, Landmark } from "lucide-react";

export default function WhyUsPage() {
  // Calculator state
  const [monthlyBill, setMonthlyBill] = useState(6000);
  const [waterUsage, setWaterUsage] = useState(200);

  // Derived savings values
  const [savingsMonthly, setSavingsMonthly] = useState(0);
  const [savingsYearly, setSavingsYearly] = useState(0);
  const [roiMonths, setRoiMonths] = useState(0);
  const [co2Saved, setCo2Saved] = useState(0);

  useEffect(() => {
    // Heat Pump is 4x more efficient, cutting energy bills for heating by ~75%
    // Let's assume heating portion is 65% of the total monthly bill entered
    const heatingBill = monthlyBill * 0.65;
    const savings = heatingBill * 0.75;
    const yearly = savings * 12;
    
    // Average cost of premium Innmotek heat pump: ₹95,000
    const systemCost = 95000;
    const roi = savings > 0 ? Math.round(systemCost / savings) : 0;

    // Environmental impact: 1kWh grid electricity in India = ~0.82kg CO2
    // Saving 75% electricity saves ~0.82kg CO2 per kWh saved.
    // Water usage of 200L/day heated from 15C to 55C requires ~9.3 kWh/day.
    // Yearly heating energy = 9.3 * 365 = ~3400 kWh.
    // Savings = 3400 * 0.75 = 2550 kWh saved per year.
    // CO2 saved = 2550 * 0.82 = 2091 kg.
    const kwhPerLitre = 0.046; // thermal energy needed per litre
    const yearlyKwhSaved = waterUsage * 365 * kwhPerLitre * 0.75;
    const co2Val = Math.round(yearlyKwhSaved * 0.82);

    setSavingsMonthly(Math.round(savings));
    setSavingsYearly(Math.round(yearly));
    setRoiMonths(roi);
    setCo2Saved(co2Val);
  }, [monthlyBill, waterUsage]);

  const comparisonData = [
    { feature: "Energy Efficiency (COP)", innmotek: "Up to 4.87 (487%)", electric: "0.95 (95%)", gas: "0.85 (85%)" },
    { feature: "Monthly Operating Cost", innmotek: "₹850 (Ultra Low)", electric: "₹3,400 (High)", gas: "₹2,800 (Medium)" },
    { feature: "Cold Climate Performance", innmotek: "Stable down to -25°C", electric: "Stable but expensive", gas: "Efficiency drops" },
    { feature: "Eco-Friendly / Low Carbon", innmotek: "Yes (R32 Eco)", electric: "No (High grid load)", gas: "No (Fossil fuel)" },
    { feature: "Product Warranty", innmotek: "5 Year Comprehensive", electric: "1 - 2 Years", gas: "1 - 2 Years" },
    { feature: "Smart Control (App/Wi-Fi)", innmotek: "Included", electric: "Rarely", gas: "Rarely" },
    { feature: "ROI Payback Period", innmotek: "18 - 24 Months", electric: "Never", gas: "Never" },
    { feature: "Operational Noise", innmotek: "38 dB (Whisper Quiet)", electric: "0 dB", gas: "55 dB (Noisy)" },
    { feature: "Installation Safety", innmotek: "100% Safe (No Combustion)", electric: "Safe", gas: "Risk of gas leaks" },
    { feature: "Design Life", innmotek: "12 - 15 Years", electric: "5 - 7 Years", gas: "6 - 8 Years" },
    { feature: "After-Sales Rating", innmotek: "4.9★ Nationwide", electric: "Varies by local dealer", gas: "Varies by local dealer" },
    { feature: "Price Range", innmotek: "Premium Investment", electric: "Cheap upfront", gas: "Medium upfront" },
  ];

  return (
    <div className="pt-24 pb-20">
      {/* Mini Hero */}
      <section className="bg-charcoal text-cream py-20 relative overflow-hidden">
        <div className="grain-overlay" />
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <SectionEyebrow text="Why Innmotek" className="justify-center mb-4" />
          <h1 className="text-5xl md:text-7xl font-serif-luxury font-light mb-6 tracking-wide">
            Engineered for <span className="italic text-gold">Efficiency</span>
          </h1>
          <p className="text-warm-gray text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-light">
            Compare performance metrics, calculate your direct savings, and understand why investing in Innmotek is the smartest choice for your home and the environment.
          </p>
        </div>
      </section>

      {/* ROI & CO2 Calculator Widget */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          {/* Left Column: Interactive Inputs */}
          <RevealWrapper className="bg-white border border-gold-light/20 rounded-3xl p-8 shadow-luxury flex flex-col justify-between">
            <div>
              <SectionEyebrow text="Interactive Savings Calculator" className="mb-6" />
              <h2 className="text-3xl font-serif-luxury text-charcoal mb-8">
                Estimate Your <span className="italic text-gold">Savings & Payback</span>
              </h2>

              {/* Slider 1 */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-3">
                  <label className="text-xs uppercase tracking-wider font-semibold text-charcoal/80">
                    Monthly Electricity Bill
                  </label>
                  <span className="text-xl font-serif-luxury text-gold font-bold">
                    ₹{monthlyBill.toLocaleString("en-IN")}
                  </span>
                </div>
                <input
                  type="range"
                  min="2000"
                  max="30000"
                  step="500"
                  value={monthlyBill}
                  onChange={(e) => setMonthlyBill(Number(e.target.value))}
                  className="w-full h-1 bg-cream rounded-lg appearance-none cursor-pointer accent-gold"
                />
                <div className="flex justify-between text-[10px] text-warm-gray mt-1">
                  <span>₹2,000</span>
                  <span>₹30,000+</span>
                </div>
              </div>

              {/* Slider 2 */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                  <label className="text-xs uppercase tracking-wider font-semibold text-charcoal/80">
                    Daily Hot Water Usage
                  </label>
                  <span className="text-xl font-serif-luxury text-gold font-bold">
                    {waterUsage} Liters/Day
                  </span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="1500"
                  step="50"
                  value={waterUsage}
                  onChange={(e) => setWaterUsage(Number(e.target.value))}
                  className="w-full h-1 bg-cream rounded-lg appearance-none cursor-pointer accent-gold"
                />
                <div className="flex justify-between text-[10px] text-warm-gray mt-1">
                  <span>50 Liters</span>
                  <span>1,500 Liters+</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-cream/40 rounded-2xl border border-gold-light/10 text-xs text-warm-gray font-light mt-6">
              *Calculations assume 65% of the entered electricity bill goes towards water/space heating, replaced by an Innmotek Inverter Heat Pump operating at a seasonal COP of 4.2.
            </div>
          </RevealWrapper>

          {/* Right Column: Visual Outputs */}
          <RevealWrapper delay={0.2} className="bg-gradient-to-br from-charcoal to-navy text-white rounded-3xl p-8 md:p-12 border border-gold-light/20 relative overflow-hidden shadow-luxury flex flex-col justify-between">
            <div className="grain-overlay" />
            <div className="relative z-10 flex flex-col gap-8">
              <span className="text-[10px] tracking-[4px] uppercase text-gold font-semibold">Your Financial Impact</span>
              
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-white/50 block mb-1">Monthly Savings</span>
                  <span className="text-3xl md:text-4xl font-logo text-gold tracking-wide">₹{savingsMonthly.toLocaleString("en-IN")}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-white/50 block mb-1">Annual Savings</span>
                  <span className="text-3xl md:text-4xl font-logo text-gold tracking-wide">₹{savingsYearly.toLocaleString("en-IN")}</span>
                </div>
              </div>

              <div className="h-[1px] bg-white/10" />

              <div className="grid grid-cols-2 gap-8">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-white/50 block mb-1 flex items-center gap-1.5">
                    <Landmark className="w-3.5 h-3.5 text-gold" /> Estimated ROI
                  </span>
                  <span className="text-3xl md:text-4xl font-logo text-white tracking-wide">{roiMonths} <span className="text-sm font-body uppercase text-gold font-semibold">Months</span></span>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-white/50 block mb-1 flex items-center gap-1.5">
                    <Leaf className="w-3.5 h-3.5 text-[#25D366]" /> CO₂ Saved / Year
                  </span>
                  <span className="text-3xl md:text-4xl font-logo text-[#25D366] tracking-wide">{co2Saved.toLocaleString()} <span className="text-sm font-body uppercase font-semibold text-white/60">KG</span></span>
                </div>
              </div>
            </div>

            <div className="relative z-10 mt-8">
              <p className="text-white/60 text-xs font-light leading-relaxed">
                By switching to Innmotek, you save money while preventing carbon emissions equal to planting approx. <span className="text-gold font-semibold">{Math.round(co2Saved / 22)} mature trees</span> every year.
              </p>
            </div>
          </RevealWrapper>
        </div>
      </section>

      {/* Editorial Section: "Why Not Cheap?" */}
      <section className="py-20 bg-white border-y border-gold-light/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <RevealWrapper className="flex flex-col gap-6">
              <SectionEyebrow text="The Value Conversation" />
              <h2 className="text-3xl md:text-5xl font-serif-luxury text-charcoal leading-tight">
                Why not just buy cheap heating <span className="italic text-gold">systems?</span>
              </h2>
              <div className="w-20 h-[1px] bg-gold" />
            </RevealWrapper>

            <RevealWrapper delay={0.2} className="text-warm-gray text-base font-light leading-relaxed flex flex-col gap-6">
              <p>
                An inexpensive electric geyser or locally assembled water heater might seem budget-friendly initially. However, these systems rely on outdated direct heating elements. They operate at a maximum of 95% efficiency, meaning that for every ₹100 of electricity paid, you get ₹95 of heat. 
              </p>
              <p>
                Innmotek heat pumps extract thermal energy from the ambient air, using electricity only to compress and move heat. Operating at COPs of 4.87+, they deliver ₹487 worth of heat for every ₹100 paid. A cheap system ends up costing you 4x more in electricity bills, failing within 5 years. Innmotek pays for itself in less than two years and serves you for over a decade.
              </p>
            </RevealWrapper>
          </div>
        </div>
      </section>

      {/* Comparison Table Section */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <SectionEyebrow text="Comparison Matrix" className="justify-center mb-4" />
          <h2 className="text-3xl md:text-5xl font-serif-luxury text-charcoal">
            Performance & Feature <span className="italic text-gold">Audit</span>
          </h2>
        </div>

        {/* Responsive Table Wrapper */}
        <RevealWrapper className="overflow-x-auto rounded-2xl border border-gold-light/20 shadow-luxury no-scrollbar">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-charcoal text-cream border-b border-gold-light/10">
                <th className="p-6 text-xs uppercase tracking-wider font-semibold">Key Specs & Features</th>
                <th className="p-6 text-xs uppercase tracking-wider font-semibold text-gold bg-gold/5 border-x border-gold-light/15">
                  Innmotek Solutions
                </th>
                <th className="p-6 text-xs uppercase tracking-wider font-semibold text-white/50">Electric Geysers</th>
                <th className="p-6 text-xs uppercase tracking-wider font-semibold text-white/50">Gas Boilers</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gold-light/10 bg-white">
              {comparisonData.map((row, i) => (
                <tr key={i} className="hover:bg-cream/40 transition-colors duration-200">
                  <td className="p-6 text-sm font-semibold text-charcoal">{row.feature}</td>
                  <td className="p-6 text-sm font-bold text-gold-dark bg-gold/5 border-x border-gold-light/15 flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#25D366] shrink-0" /> {row.innmotek}
                  </td>
                  <td className="p-6 text-sm text-warm-gray font-light">{row.electric}</td>
                  <td className="p-6 text-sm text-warm-gray font-light">{row.gas}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </RevealWrapper>
      </section>
    </div>
  );
}
