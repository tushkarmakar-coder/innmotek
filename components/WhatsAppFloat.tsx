"use client";

import { motion } from "framer-motion";

// Global WhatsApp number configuration
export const WHATSAPP_NUMBER = "+91 808 174 1031";
const WHATSAPP_LINK = "https://wa.me/918081741031"; // standard format link

export default function WhatsAppFloat() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 20, delay: 1 }}
      className="fixed bottom-6 right-6 z-[999] flex items-center gap-3"
    >
      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center bg-[#25D366] hover:bg-[#20ba5a] text-white p-3.5 pl-4 pr-5 rounded-full shadow-[0_8px_30px_rgb(37,211,102,0.3)] hover:shadow-[0_8px_30px_rgb(37,211,102,0.5)] transition-all duration-300 gap-2.5 font-body font-semibold text-xs tracking-wider uppercase"
        aria-label="Chat with us on WhatsApp"
      >
        {/* WhatsApp Logo SVG */}
        <svg
          className="w-5.5 h-5.5 fill-current"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12.031 2c-5.514 0-9.99 4.477-9.99 9.99 0 1.758.459 3.479 1.33 5.006L2 22l5.185-1.36c1.472.802 3.13 1.226 4.846 1.226 5.514 0 9.99-4.477 9.99-9.99C22.021 6.477 17.545 2 12.031 2zm6.09 14.562c-.225.63-1.305 1.162-1.83 1.223-.465.053-.92.075-2.4-.537-1.89-.783-3.083-2.693-3.177-2.82-.095-.125-.765-.996-.765-1.992 0-.996.525-1.485.713-1.688.188-.2.413-.25.55-.25.137 0 .275 0 .387.007.12.006.278-.045.435.32.165.383.563 1.343.613 1.445.05.102.083.22.015.352-.068.13-.102.21-.203.328-.102.117-.213.262-.305.352-.102.1-.21.21-.09.4.12.19.535.882 1.148 1.428.79.703 1.455.92 1.658 1.02.203.1.323.084.443-.053.12-.137.52-.603.66-.81.138-.205.277-.174.465-.104.187.07 1.192.562 1.4.665.207.103.345.154.395.238.05.086.05.495-.175 1.127z" />
        </svg>
        <span>Chat on WhatsApp</span>

        {/* Pulse effect */}
        <span className="absolute -inset-0.5 rounded-full bg-[#25D366] opacity-30 group-hover:opacity-40 animate-ping -z-1" />
      </a>
    </motion.div>
  );
}
