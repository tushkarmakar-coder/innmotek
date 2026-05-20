"use client";

import React from "react";
import SectionEyebrow from "@/components/SectionEyebrow";
import RevealWrapper from "@/components/RevealWrapper";
import { Award, Shield, CheckCircle, Factory, Users, Zap } from "lucide-react";
import Logo from "@/components/Logo";


export default function AboutPage() {
  const stats = [
    { value: "500+", label: "Installations" },
    { value: "12+", label: "States Covered" },
    { value: "75%", label: "Average Energy Saved" },
    { value: "4.9★", label: "Customer Rating" },
  ];

  const team = [
    { name: "Vikram Gorakhpuria", role: "Founder & CEO", desc: "Energy enthusiast with 15+ years in HVAC manufacturing." },
    { name: "Dr. Ananya Iyer", role: "Chief R&D Engineer", desc: "PhD in Thermal Dynamics, leading our green energy tech." },
    { name: "Rahul Singh", role: "Head of Installation & Services", desc: "Ensuring flawless commissioning nationwide." },
  ];

  return (
    <div className="pt-24 pb-20">
      {/* Mini Hero Section */}
      <section className="bg-charcoal text-cream py-20 relative overflow-hidden">
        <div className="grain-overlay" />
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <SectionEyebrow text="Our Heritage" className="justify-center mb-4" />
          <h1 className="text-5xl md:text-7xl font-serif-luxury font-light mb-6 tracking-wide">
            About <span className="italic text-gold">Innmotek</span>
          </h1>
          <p className="text-warm-gray text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-light">
            Empowering Indian homes and businesses with state-of-the-art, high-efficiency heating and cooling technologies engineered in Gorakhpur, Uttar Pradesh.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column: Image Placeholder / Gradient */}
          <RevealWrapper className="h-[450px] rounded-2xl overflow-hidden bg-gradient-to-br from-navy to-charcoal border border-gold-light/20 relative flex items-center justify-center p-8 shadow-luxury">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,169,110,0.15)_0%,transparent_70%)]" />
            <div className="relative text-center flex flex-col items-center gap-6 z-10">
              <Logo layout="vertical" iconSize={64} className="text-gold" />
              <div className="h-[1px] w-24 bg-gold-light/35" />
              <p className="text-white/60 font-body text-xs uppercase tracking-[4px]">Gorakhpur Uttar Pradesh</p>
            </div>
          </RevealWrapper>

          {/* Right Column: Text */}
          <RevealWrapper delay={0.2} className="flex flex-col gap-6">
            <SectionEyebrow text="Who We Are" />
            <h2 className="text-3xl md:text-5xl font-serif-luxury text-charcoal leading-tight">
              Pioneering Energy Efficiency since <span className="italic text-gold">2023</span>
            </h2>
            <p className="text-warm-gray text-base font-light leading-relaxed">
              Founded in 2023 in Gorakhpur, UP, Innmotek was born out of a mission to solve India’s residential and commercial energy challenges. Traditional heating solutions like electric geysers and wood burners were either highly inefficient or harmful to the environment.
            </p>
            <p className="text-warm-gray text-base font-light leading-relaxed">
              We combined advanced thermodynamics with precision manufacturing to launch a range of Air Source Heat Pumps, Pool Heaters, and clean-burning Fireplaces. Today, Innmotek stands as a beacon of sustainable luxury, trusted by premium homes, luxury resorts, and industries across India.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="flex gap-3 items-start">
                <CheckCircle className="w-5 h-5 text-gold shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-charcoal text-sm">Eco-Conscious</h4>
                  <p className="text-warm-gray text-xs">Exclusively using low-GWP R32 eco refrigerant.</p>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <CheckCircle className="w-5 h-5 text-gold shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-charcoal text-sm">Make In India</h4>
                  <p className="text-warm-gray text-xs">Local manufacturing supporting domestic engineering.</p>
                </div>
              </div>
            </div>
          </RevealWrapper>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-charcoal text-cream py-16 border-y border-gold/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {stats.map((stat, i) => (
              <RevealWrapper key={i} delay={i * 0.1} className="flex flex-col gap-2">
                <span className="text-4xl md:text-5xl font-logo text-gold tracking-wider">{stat.value}</span>
                <span className="text-[10px] tracking-[3px] uppercase text-warm-gray font-semibold">{stat.label}</span>
              </RevealWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* Manufacturing Section */}
      <section className="py-20 bg-cream relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-gradient-to-br from-charcoal to-navy text-white rounded-3xl p-8 md:p-16 border border-gold-light/20 relative overflow-hidden shadow-luxury">
            <div className="grain-overlay" />
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="flex flex-col gap-6">
                <SectionEyebrow text="Manufacturing Hub" />
                <h3 className="text-3xl md:text-5xl font-serif-luxury text-white">
                  State-of-the-Art Production in <span className="italic text-gold">GIDA</span>
                </h3>
                <p className="text-white/70 text-sm font-light leading-relaxed">
                  Our primary manufacturing facility is located in the **GIDA Industrial Area, Sahjanwa, Gorakhpur, UP**. Spanning over heavy-duty assembly lines, we perform rigorous safety, pressure, and thermal stress tests on every heat pump and fireplace before it leaves our bay.
                </p>
                <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                  <p className="text-gold text-xs font-semibold uppercase tracking-wider mb-1 flex items-center gap-2">
                    <Factory className="w-4 h-4" /> GIDA Factory Address
                  </p>
                  <p className="text-white/60 text-xs font-light">
                    Sector 4, GIDA Industrial Area, Sahjanwa, Gorakhpur, Uttar Pradesh - 273209
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="p-6 bg-white/5 rounded-2xl border border-white/10 flex flex-col gap-3">
                  <Zap className="w-8 h-8 text-gold" />
                  <h4 className="font-semibold text-sm">Advanced Lab</h4>
                  <p className="text-white/50 text-xs font-light">Simulating environmental extremes from -25°C to 50°C.</p>
                </div>
                <div className="p-6 bg-white/5 rounded-2xl border border-white/10 flex flex-col gap-3">
                  <Users className="w-8 h-8 text-gold" />
                  <h4 className="font-semibold text-sm">100+ Workforce</h4>
                  <p className="text-white/50 text-xs font-light">Skilled technicians and certified HVAC design engineers.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <SectionEyebrow text="Leadership" className="justify-center mb-4" />
          <h2 className="text-3xl md:text-5xl font-serif-luxury text-charcoal">
            The Minds Behind <span className="italic text-gold">Innmotek</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member, i) => (
            <RevealWrapper key={i} delay={i * 0.15} className="bg-white border border-gold-light/20 p-8 rounded-2xl flex flex-col items-center text-center shadow-md hover:shadow-luxury transition-all duration-300">
              <div className="w-20 h-20 rounded-full bg-cream border border-gold-light/30 flex items-center justify-center mb-6 text-2xl text-gold font-bold">
                {member.name[0]}
              </div>
              <h3 className="font-serif-luxury text-xl text-charcoal mb-1">{member.name}</h3>
              <p className="text-gold text-[10px] tracking-wider uppercase font-semibold mb-4">{member.role}</p>
              <p className="text-warm-gray text-xs leading-relaxed font-light">{member.desc}</p>
            </RevealWrapper>
          ))}
        </div>
      </section>

      {/* Certifications Row */}
      <section className="py-12 bg-white border-t border-gold-light/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap items-center justify-around gap-8 opacity-60 hover:opacity-85 transition-opacity duration-300">
            <div className="flex items-center gap-2">
              <Award className="w-6 h-6 text-gold" />
              <span className="text-xs uppercase tracking-wider font-bold text-charcoal">ISO 9001:2015 Certified</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-6 h-6 text-gold" />
              <span className="text-xs uppercase tracking-wider font-bold text-charcoal">BIS Approved Quality</span>
            </div>
            <div className="flex items-center gap-2">
              <Factory className="w-6 h-6 text-gold" />
              <span className="text-xs uppercase tracking-wider font-bold text-charcoal">Energy Star Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-gold" />
              <span className="text-xs uppercase tracking-wider font-bold text-charcoal">R32 Eco Refrigerant</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
