import React from "react";

interface LogoProps {
  className?: string;
  layout?: "horizontal" | "vertical";
  iconSize?: number;
}

export default function Logo({ className = "", layout = "horizontal", iconSize = 36 }: LogoProps) {
  return (
    <div
      className={`flex items-center select-none ${
        layout === "vertical"
          ? "flex-col text-center gap-4"
          : "flex-row gap-3"
      } ${className}`}
    >
      {/* Logo Mark SVG */}
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 100 100"
        fill="none"
        stroke="currentColor"
        strokeWidth="6.5"
        strokeLinecap="round"
        strokeLinejoin="miter"
        className="shrink-0"
      >
        <path d="M 43.5 10.5 A 40 40 0 1 0 43.5 89.5" />
        <path d="M 56.5 10.5 A 40 40 0 1 1 56.5 89.5" />
        <path d="M 43.5 10.5 L 43.5 89.5 M 56.5 10.5 L 56.5 89.5" />
      </svg>

      {/* Logo Typography INNMOTEK */}
      <svg
        height={layout === "vertical" ? iconSize * 0.45 : iconSize * 0.55}
        viewBox="0 0 128 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="shrink-0 overflow-visible"
      >
        <path d="M 1.5 0 L 1.5 20 M 9.5 20 L 9.5 0 L 21.5 20 L 21.5 0 M 27.5 20 L 27.5 0 L 39.5 20 L 39.5 0 M 45.5 20 L 45.5 0 L 51.5 18 L 57.5 0 L 57.5 20 M 66.5 0 H 72.5 A 3 3 0 0 1 75.5 3 V 17 A 3 3 0 0 1 72.5 20 H 66.5 A 3 3 0 0 1 63.5 17 V 3 A 3 3 0 0 1 66.5 0 Z M 81.5 1.5 H 96.5 M 89 1.5 V 20 M 109.5 0 H 98.5 V 20 H 109.5 M 98.5 10 H 106.5 M 115.5 0 V 20 M 126.5 0 L 115.5 10 L 126.5 20" />
      </svg>
    </div>
  );
}
