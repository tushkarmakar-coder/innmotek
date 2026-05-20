export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  slug: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  emoji: string;
  image: string;
  bgGradient: string;
  badge?: string;
  specs: ProductSpec[];
  features: string[];
  featured: boolean;
}

export const products: Product[] = [
  {
    slug: "heat-pumps-duraheat",
    name: "DuraHeat Elite Air Source Heat Pump",
    category: "heat-pumps",
    tagline: "High-efficiency home heating & domestic hot water",
    description: "Engineered for extreme climates, the DuraHeat Elite Air Source Heat Pump delivers stable heating and domestic hot water even at -25°C. With a high COP of up to 4.87, it reduces energy bills by up to 75% compared to traditional boilers.",
    emoji: "💧",
    image: "/images/heat_pump.png",
    bgGradient: "from-blue-950 to-slate-900",
    badge: "Best Seller",
    specs: [
      { label: "COP Efficiency Rating", value: "4.87" },
      { label: "Max Outlet Temp", value: "80°C" },
      { label: "Eco Refrigerant", value: "R32" },
      { label: "Compressor Type", value: "Twin-Rotary DC Inverter" },
      { label: "Operating Range", value: "-25°C to 45°C" },
      { label: "Warranty", value: "5 Years" }
    ],
    features: [
      "Full DC Inverter Technology for dynamic load matching",
      "Stable operation down to -25°C ambient temperature",
      "Smart Grid Ready with integrated Wi-Fi App Control",
      "Ultra-quiet sound-insulated compressor (38 dB at 1m)",
      "Intelligent defrosting system with automated cycle reversal",
      "Anti-corrosion hydrophilic fin heat exchanger"
    ],
    featured: true
  },
  {
    slug: "pool-pumps-aquatemp",
    name: "AquaTemp Max Swimming Pool Heat Pump",
    category: "pool-pumps",
    tagline: "Maintain perfect swimming temperatures year-round",
    description: "Designed for commercial and premium residential pools, the AquaTemp Max maintains perfect swimming temperatures. It utilizes advanced titanium heat exchangers to resist chlorine and salt corrosion while maximizing thermal transfer.",
    emoji: "🏊",
    image: "/images/pool_pump.png",
    bgGradient: "from-cyan-950 to-teal-950",
    badge: "Premium Choice",
    specs: [
      { label: "COP Efficiency Rating", value: "5.25" },
      { label: "Max Water Temp", value: "40°C" },
      { label: "Heat Exchanger", value: "Twisted Titanium" },
      { label: "Refrigerant", value: "R32 Eco" },
      { label: "Casing Material", value: "Corrosion-proof ABS" },
      { label: "Warranty", value: "5 Years" }
    ],
    features: [
      "High-grade titanium heat exchanger prevents corrosion",
      "Soft-start inverter compressor eliminates power surges",
      "Dual-speed fan mode for whisper-quiet night operation",
      "Intelligent touch-screen control panel with Wi-Fi link",
      "Reverse cycle defrosting for cold-weather operation",
      "Saves up to 80% on operating costs vs electric heaters"
    ],
    featured: true
  },
  {
    slug: "fireplaces-helix",
    name: "Helix Wood-Fired Fireplace",
    category: "fireplaces",
    tagline: "Contemporary design meets high-efficiency wood combustion",
    description: "The Helix Wood-Fired Fireplace is an architectural masterpiece featuring a high-yield clean-burning chamber. It provides radiant, cozy heat while creating a visual focal point in premium living spaces.",
    emoji: "🔥",
    image: "/images/fireplace.png",
    bgGradient: "from-amber-950 to-red-950",
    badge: "Design Award",
    specs: [
      { label: "Heating Efficiency", value: "82%" },
      { label: "Nominal Output", value: "12 kW" },
      { label: "Combustion System", value: "Double Burn Clean Air" },
      { label: "Glass Window", value: "Airwash Self-Cleaning" },
      { label: "External Air Feed", value: "Optional (Rear/Bottom)" },
      { label: "Warranty", value: "5 Years" }
    ],
    features: [
      "Double-combustion clean burn system for low emissions",
      "Airwash glass self-cleaning system keeps view clear",
      "Heavy duty cast iron door with vermiculite chamber lining",
      "Convection air channels for rapid heat distribution",
      "Built-in ash drawer with airtight sealing",
      "Meets Eco-Design guidelines for environmental safety"
    ],
    featured: true
  },
  {
    slug: "bbq-grills-terragrill",
    name: "TerraGrill BBQ & Outdoor Grill",
    category: "bbq-grills",
    tagline: "Professional-grade outdoor charcoal & wood grilling",
    description: "The TerraGrill brings gourmet charcoal and wood grilling to your outdoor kitchen. Built with heavy-gauge stainless steel and featuring modular cooking surfaces, it gives you complete control over high-heat searing and low-and-slow smoking.",
    emoji: "🍖",
    image: "/images/bbq_grill.png",
    bgGradient: "from-stone-900 to-amber-950",
    badge: "Chef Grade",
    specs: [
      { label: "Cooking Area", value: "4500 cm²" },
      { label: "Temp Control Range", value: "80°C - 400°C" },
      { label: "Steel Quality", value: "304 Marine Grade" },
      { label: "Grates Material", value: "Heavy Cast Iron" },
      { label: "Hood Insulation", value: "Double Walled" },
      { label: "Warranty", value: "3 Years" }
    ],
    features: [
      "Dual-zone height-adjustable charcoal tray for heat control",
      "Double-walled insulated hood with integrated thermometer",
      "Removable ash drawer for quick and clean maintenance",
      "Modular cooking grates (griddle, sear plate, and standard)",
      "Integrated side prep shelves and accessory tool hooks",
      "Heavy-duty heavy-gauge steel framing for durability"
    ],
    featured: true
  },
  {
    slug: "accessories-pool-cover",
    name: "Thermal Shield Pool Cover",
    category: "accessories",
    tagline: "Minimize heat loss and keep debris out",
    description: "A premium automated thermal pool cover that cuts pool heating costs by up to 50% by stopping evaporation. Custom sized to fit any swimming pool shape with remote-controlled motorized rollers.",
    emoji: "☀️",
    image: "/images/pool_cover.png",
    bgGradient: "from-yellow-950 to-amber-950",
    badge: "Eco Essential",
    specs: [
      { label: "Heat Retention", value: "Up to 50%" },
      { label: "Evaporation Control", value: "Up to 98%" },
      { label: "Slat Material", value: "UV-Resistant PVC" },
      { label: "Roller Motor", value: "24V DC Waterproof" },
      { label: "Control Interface", value: "Key switch / Wi-Fi App" },
      { label: "Warranty", value: "3 Years" }
    ],
    features: [
      "Heavy-duty extruded PVC slats for ultimate thermal barrier",
      "High buoyancy provides additional safety support for kids/pets",
      "Cuts chemical usage by preventing water evaporation",
      "Motorized aluminum roller with automatic limit switch setting",
      "In-ground or above-ground roller enclosure options",
      "Available in multiple premium finishes to match pool deck"
    ],
    featured: false
  }
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter(p => p.category === category);
}
