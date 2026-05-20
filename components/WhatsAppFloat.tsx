"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Global WhatsApp number configuration
export const WHATSAPP_NUMBER = "+91 808 174 1031";
const WHATSAPP_LINK = "https://wa.me/918081741031"; // standard format link

export default function WhatsAppFloat() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 100) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY) {
        // Scrolling down -> show
        setIsVisible(true);
      } else {
        // Scrolling up -> hide
        setIsVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.6, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 50 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="fixed bottom-6 right-6 z-[999]"
        >
          {/* Pulse Ring Animation Background */}
          <div className="absolute inset-0 rounded-full bg-[#25D366] animate-pulse-ring" />
          
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full shadow-lg transition-colors duration-300"
            aria-label="Chat with us on WhatsApp"
          >
            {/* WhatsApp Logo SVG */}
            <svg
              className="w-7 h-7 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-11.5c-.124-.205-.18-.467-.03-.712.1-.165.418-.484.57-.69.117-.16.208-.246.33-.42.12-.174.15-.3.076-.45-.075-.15-.675-1.623-.925-2.224-.244-.588-.492-.51-.675-.51-.172-.001-.371-.002-.57-.002-.2 0-.524.074-.797.373-.273.3-.1.673-.1.673s.062.247.165.464c.264.558.643 1.096 1.096 1.58.452.486 1.343 1.326 2.656 1.83 1.312.505 1.764.444 2.378.36.613-.083 1.8-.737 2.05-1.448.25-.713.25-1.323.175-1.448-.075-.125-.274-.2-.573-.35-.3-.15-1.775-.875-2.05-.975-.275-.1-.475-.15-.675.15-.2.3-.775.975-.95 1.175-.175.2-.35.225-.65.075-.3-.15-1.267-.467-2.413-1.488-.89-.795-1.492-1.777-1.667-2.077z" />
            </svg>

            {/* Premium Tooltip */}
            <span className="absolute right-16 top-1/2 -translate-y-1/2 bg-charcoal text-white text-xs tracking-wider uppercase font-semibold py-2 px-3 rounded border border-gold-dark opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
              Chat with us
            </span>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
