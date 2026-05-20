import type { Metadata } from "next";
import { Cormorant_Garamond, Bebas_Neue, DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import dynamic from "next/dynamic";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-bebas",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Innmotek | Premium Heat Pumps & Heating Solutions India",
    template: "%s | Innmotek India"
  },
  description: "India's leading manufacturer of energy-efficient air source heat pumps, swimming pool heat pumps, wood-fired fireplaces (Helix) & BBQ grills. Based in Gorakhpur, UP. 75% energy savings guaranteed.",
  keywords: [
    "heat pump India",
    "air source heat pump",
    "pool heat pump",
    "wood fired fireplace India",
    "energy efficient heating",
    "Innmotek",
    "Gorakhpur heating",
    "BBQ grills India"
  ],
  metadataBase: new URL("https://innmotek.com"),
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "Innmotek | Premium Heat Pumps & Heating Solutions India",
    description: "India's leading manufacturer of energy-efficient air source heat pumps, pool heat pumps, wood fireplaces & BBQ grills.",
    url: "https://innmotek.com",
    siteName: "Innmotek India",
    locale: "en_IN",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// Dynamically import the custom cursor to ensure it only runs on client-side
const CustomCursor = dynamic(() => import("@/components/CustomCursor"), {
  ssr: false,
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${cormorant.variable} ${bebas.variable} ${dmSans.variable} font-body bg-cream text-charcoal antialiased selection:bg-gold-light selection:text-charcoal`}
        suppressHydrationWarning
      >
        <CustomCursor />
        <Navbar />
        <main className="min-height-screen relative">
          {children}
        </main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
