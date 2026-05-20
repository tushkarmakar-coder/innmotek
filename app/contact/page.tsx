"use client";

import React, { useState, useEffect, Suspense } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import SectionEyebrow from "@/components/SectionEyebrow";
import RevealWrapper from "@/components/RevealWrapper";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";


// Dynamically import the 3D Globe
const ContactGlobe = dynamic(() => import("@/components/ContactGlobe"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[250px] bg-slate-900/10 rounded-2xl animate-pulse flex items-center justify-center text-xs tracking-wider uppercase text-warm-gray">
      Loading 3D Globe...
    </div>
  ),
});

function ContactContent() {
  const searchParams = useSearchParams();
  const interestParam = searchParams.get("interest") || "general";

  // Form states
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [interest, setInterest] = useState(interestParam);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Sync interest selection if URL param changes
  useEffect(() => {
    if (interestParam) {
      setInterest(interestParam);
    }
  }, [interestParam]);

  // Client-side validation
  const validateForm = () => {
    const tempErrors: { [key: string]: string } = {};
    if (!name.trim()) tempErrors.name = "Name is required.";
    if (!phone.trim()) {
      tempErrors.phone = "Phone number is required.";
    } else if (!/^[0-9+\s-]{10,15}$/.test(phone.trim())) {
      tempErrors.phone = "Please enter a valid phone number (10-15 digits).";
    }
    if (!email.trim()) {
      tempErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      tempErrors.email = "Please enter a valid email address.";
    }
    if (!message.trim()) tempErrors.message = "Message is required.";
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Simulate form submission
      setTimeout(() => {
        setIsSubmitted(true);
        // Clear form
        setName("");
        setPhone("");
        setEmail("");
        setInterest("general");
        setMessage("");
      }, 800);
    }
  };

  return (
    <div className="pt-24 pb-20">
      {/* Mini Hero */}
      <section className="bg-charcoal text-cream py-20 relative overflow-hidden">
        <div className="grain-overlay" />
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <SectionEyebrow text="Connect With Us" className="justify-center mb-4" />
          <h1 className="text-5xl md:text-7xl font-serif-luxury font-light mb-6 tracking-wide">
            Contact <span className="italic text-gold">Innmotek</span>
          </h1>
          <p className="text-warm-gray text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-light">
            Have questions about specifications, lead times, or pricing? Reach out to our design engineers directly.
          </p>
        </div>
      </section>

      {/* Main Form and Info Split */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left Column: Contact Form */}
          <RevealWrapper className="bg-white border border-gold-light/20 rounded-3xl p-8 md:p-12 shadow-luxury">
            <SectionEyebrow text="Inquiry Form" className="mb-6" />
            <h2 className="text-3xl font-serif-luxury text-charcoal mb-8">
              Send a <span className="italic text-gold">Direct Message</span>
            </h2>

            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-[#25D366]/10 border border-[#25D366]/20 rounded-2xl p-8 text-center flex flex-col items-center gap-4"
              >
                <CheckCircle className="w-16 h-16 text-[#25D366] animate-pulse" />
                <h3 className="font-serif-luxury text-2xl text-charcoal">Thank You!</h3>
                <p className="text-warm-gray text-sm font-light">
                  Your message has been sent successfully. An Innmotek design engineer will review your request and get back to you within 24 business hours.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-4 text-xs font-bold text-gold uppercase tracking-wider underline hover:text-gold-dark"
                >
                  Send another inquiry
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                {/* Name */}
                <div>
                  <label className="text-xs uppercase tracking-wider font-semibold text-charcoal/80 block mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`w-full px-4 py-3 rounded border text-sm focus:outline-none focus:border-gold transition-colors ${
                      errors.name ? "border-red-500" : "border-gold-light/20 bg-cream/10"
                    }`}
                    placeholder="Enter your full name"
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>

                {/* Grid (Phone & Email) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Phone */}
                  <div>
                    <label className="text-xs uppercase tracking-wider font-semibold text-charcoal/80 block mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className={`w-full px-4 py-3 rounded border text-sm focus:outline-none focus:border-gold transition-colors ${
                        errors.phone ? "border-red-500" : "border-gold-light/20 bg-cream/10"
                      }`}
                      placeholder="+91 98765 43210"
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="text-xs uppercase tracking-wider font-semibold text-charcoal/80 block mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`w-full px-4 py-3 rounded border text-sm focus:outline-none focus:border-gold transition-colors ${
                        errors.email ? "border-red-500" : "border-gold-light/20 bg-cream/10"
                      }`}
                      placeholder="name@domain.com"
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>
                </div>

                {/* Product Interest Select */}
                <div>
                  <label className="text-xs uppercase tracking-wider font-semibold text-charcoal/80 block mb-2">
                    Product Interest
                  </label>
                  <select
                    value={interest}
                    onChange={(e) => setInterest(e.target.value)}
                    className="w-full px-4 py-3 rounded border border-gold-light/20 bg-cream/10 text-sm focus:outline-none focus:border-gold text-charcoal/80 cursor-pointer"
                  >
                    <option value="general">General Inquiries</option>
                    <option value="heat-pumps">Air Source Heat Pumps</option>
                    <option value="pool-pumps">Swimming Pool Heat Pumps</option>
                    <option value="fireplaces">Wood Fired Fireplaces (Helix)</option>
                    <option value="bbq-grills">BBQ Grills & Outdoor</option>
                    <option value="accessories">Pool Covers & Accessories</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="text-xs uppercase tracking-wider font-semibold text-charcoal/80 block mb-2">
                    Message details
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className={`w-full px-4 py-3 rounded border text-sm focus:outline-none focus:border-gold transition-colors ${
                      errors.message ? "border-red-500" : "border-gold-light/20 bg-cream/10"
                    }`}
                    placeholder="Describe your site heating requirement, water volume, or project dimensions..."
                  />
                  {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="bg-charcoal text-white hover:bg-gold hover:text-charcoal px-8 py-4 rounded-full text-xs uppercase tracking-[2px] font-semibold transition-all duration-300 flex items-center justify-center gap-2 self-start transform hover:-translate-y-0.5 shadow-md shadow-luxury/10"
                >
                  Submit Inquiry <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </RevealWrapper>

          {/* Right Column: Address Cards, 3D Globe, Map */}
          <div className="flex flex-col gap-8 w-full">
            {/* 3D Globe Widget */}
            <RevealWrapper>
              <ContactGlobe />
            </RevealWrapper>

            {/* Contact Details Card */}
            <RevealWrapper delay={0.1} className="bg-white border border-gold-light/20 rounded-3xl p-8 shadow-luxury flex flex-col gap-6">
              <h3 className="font-serif-luxury text-2xl text-charcoal border-b border-gold-light/10 pb-4">
                Office & <span className="italic text-gold">Factory Details</span>
              </h3>

              <div className="flex flex-col gap-4 text-sm text-warm-gray">
                <div className="flex gap-4 items-start">
                  <MapPin className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                  <div>
                    <span className="text-charcoal font-semibold block mb-1">GIDA Manufacturing Facility</span>
                    <span>Sector 4, GIDA Industrial Area, Sahjanwa, Gorakhpur, UP, India - 273209</span>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <Phone className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                  <div>
                    <span className="text-charcoal font-semibold block mb-1">Inquiry Lines</span>
                    <span>+91 808 174 1031 (Sales & Support)</span>
                    <span className="block">+971 55 439 8350 (UAE Office)</span>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <Mail className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                  <div>
                    <span className="text-charcoal font-semibold block mb-1">E-mail Correspondence</span>
                    <span>info@innmotek.com</span>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <Clock className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                  <div>
                    <span className="text-charcoal font-semibold block mb-1">Business Hours</span>
                    <span>Monday - Saturday: 9:00 AM - 7:00 PM</span>
                    <span className="block text-gold font-semibold">Sunday: Closed</span>
                  </div>
                </div>
              </div>
            </RevealWrapper>

            {/* Google Map Iframe Placeholder */}
            <RevealWrapper delay={0.2} className="h-[250px] rounded-3xl overflow-hidden border border-gold-light/20 relative shadow-luxury">
              {/* Actual Map Embed */}
              <iframe
                title="Innmotek GIDA Factory Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14247.933391787383!2d83.21852932353139!3d26.776632486790938!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39915d315abeb819%3A0xe54e606a2e4e1a47!2sGIDA%20Industrial%20Area%2C%20Sahjanwa%2C%20Uttar%20Pradesh%20273209!5e0!3m2!1sen!2sin!4v1689000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </RevealWrapper>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={
      <div className="pt-32 pb-20 text-center text-warm-gray text-sm uppercase tracking-wider">
        Loading Contact Form...
      </div>
    }>
      <ContactContent />
    </Suspense>
  );
}
