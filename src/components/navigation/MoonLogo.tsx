
import React from "react";

interface MoonLogoProps {
  className?: string;
}

export const MoonLogo = ({ className = "" }: MoonLogoProps) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Neon effect - outer glow */}
      <circle cx="12" cy="12" r="10" fill="rgba(74, 222, 128, 0.2)" />
      
      {/* Main moon shape */}
      <path
        d="M18.5 12C18.5 7.30558 14.6944 3.5 10 3.5C9.56075 3.5 9.12901 3.53183 8.70827 3.59273C8.24273 3.66083 7.83309 3.99173 7.67597 4.44105C7.51885 4.89037 7.63451 5.38855 7.96967 5.72371C9.59983 7.35387 9.59983 9.99606 7.96967 11.6262C6.33951 13.2564 3.69733 13.2564 2.06717 11.6262C1.732 11.2911 1.23383 11.1754 0.784505 11.3325C0.335182 11.4896 0.00428534 11.8993 -0.0638116 12.3648C-0.124708 12.7856 -0.156536 13.2173 -0.156536 13.6566C-0.156536 18.351 3.65097 22.1566 8.34538 22.1566C13.0398 22.1566 16.8473 18.351 16.8473 13.6566C16.8473 13.0849 16.7863 12.5285 16.6701 11.9939"
        stroke="#4ADE80"
        strokeWidth="2.5"
        strokeLinecap="round"
        transform="translate(3.5, 0)"
      />
      
      {/* Craters */}
      <circle cx="9" cy="8" r="1" fill="#4ADE80" opacity="0.7" />
      <circle cx="14" cy="10" r="1.5" fill="#4ADE80" opacity="0.5" />
      <circle cx="11" cy="14" r="1" fill="#4ADE80" opacity="0.6" />
      
      {/* Enhanced neon glow effect with proper SVG filter */}
      <defs>
        <filter id="moonGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
    </svg>
  );
};
