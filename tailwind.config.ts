import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "var(--cream)",
        charcoal: "var(--charcoal)",
        "warm-gray": "var(--warm-gray)",
        gold: {
          DEFAULT: "var(--gold)",
          light: "var(--gold-light)",
          dark: "var(--gold-dark)",
        },
        rust: "var(--rust)",
        navy: "var(--navy)",
        glass: "var(--glass)",
        "glass-border": "var(--glass-border)",
      },
      fontFamily: {
        display: ["var(--font-cormorant)", "serif"],
        logo: ["var(--font-bebas)", "sans-serif"],
        body: ["var(--font-dm-sans)", "sans-serif"],
      },
      boxShadow: {
        luxury: "var(--shadow-luxury)",
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, var(--gold-light) 0%, var(--gold) 50%, var(--gold-dark) 100%)",
      },
    },
  },
  plugins: [],
};
export default config;
