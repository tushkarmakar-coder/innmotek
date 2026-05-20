import React from "react";

interface SectionEyebrowProps {
  text: string;
  className?: string;
}

export default function SectionEyebrow({ text, className = "" }: SectionEyebrowProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span className="w-8 h-[1px] bg-gold block" aria-hidden="true" />
      <span className="text-[11px] font-body tracking-[0.25em] uppercase text-gold font-semibold">
        {text}
      </span>
    </div>
  );
}
