"use client";

import React from "react";
import { motion } from "framer-motion";

interface RevealWrapperProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  yOffset?: number;
  duration?: number;
}

export default function RevealWrapper({
  children,
  className = "",
  delay = 0,
  yOffset = 32,
  duration = 0.7,
}: RevealWrapperProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{
        duration: duration,
        delay: delay,
        ease: [0.16, 1, 0.3, 1], // Luxury cubic bezier ease-out
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
