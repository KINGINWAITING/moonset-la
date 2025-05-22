
import { useEffect, useRef } from "react";
import { useTheme } from "@/context/ThemeContext";
import { motion } from "framer-motion";

export const OptimizedBackground = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const prevTheme = useRef(theme);
  
  // Initialize document background color with improved performance
  useEffect(() => {
    if (prevTheme.current !== theme) {
      // Only update if theme actually changed
      document.documentElement.style.backgroundColor = 'transparent';
      document.body.style.backgroundColor = 'transparent';
      
      // Update ref for future comparisons
      prevTheme.current = theme;
    }
  }, [theme, isDark]);

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden">
      {/* Base background color - fully transparent */}
      <div className="absolute inset-0 bg-transparent" />
      
      {/* Grid overlay with proper contrast */}
      <div className={`absolute inset-0 ${isDark ? "bg-grid-dark" : "bg-grid-light"} opacity-30`} />
      
      {/* Animated gradient blobs - with will-change optimization */}
      <div className="absolute inset-0">
        {/* Primary blob - green gradient */}
        <motion.div
          initial={{ x: "0%", y: "0%" }}
          animate={{
            x: ["0%", "5%", "-3%", "0%"],
            y: ["0%", "-5%", "3%", "0%"],
            scale: [1, 1.05, 0.95, 1]
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
          style={{ willChange: "transform" }} // Performance optimization
          className={`absolute top-0 left-0 w-[800px] h-[800px] rounded-full ${
            isDark 
              ? "bg-gradient-to-br from-[#4ADE80]/30 to-[#45b06c]/20" 
              : "bg-gradient-to-br from-[#4ADE80]/20 to-[#22c55e]/15"
          } blur-[80px] opacity-80`}
        />
        
        {/* Secondary blob - blue/purple */}
        <motion.div
          initial={{ x: "10%", y: "0%" }}
          animate={{
            x: ["10%", "5%", "15%", "10%"],
            y: ["0%", "10%", "-5%", "0%"],
            scale: [1, 0.9, 1.1, 1]
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
          style={{ willChange: "transform" }} // Performance optimization
          className={`absolute top-1/4 right-0 w-[600px] h-[600px] rounded-full ${
            isDark 
              ? "bg-gradient-to-tl from-[#3b82f6]/30 to-[#8b5cf6]/20" 
              : "bg-gradient-to-tl from-[#60a5fa]/20 to-[#a78bfa]/15"
          } blur-[80px] opacity-70`}
        />
        
        {/* Third blob - gray/neutral */}
        <motion.div
          initial={{ x: "0%", y: "10%" }}
          animate={{
            x: ["0%", "-10%", "5%", "0%"],
            y: ["10%", "5%", "15%", "10%"],
            scale: [1, 1.1, 0.95, 1]
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
          style={{ willChange: "transform" }} // Performance optimization
          className={`absolute bottom-0 left-1/3 w-[700px] h-[700px] rounded-full ${
            isDark 
              ? "bg-gradient-to-tr from-[#1e293b]/40 to-[#334155]/20" 
              : "bg-gradient-to-tr from-[#cbd5e1]/20 to-[#94a3b8]/15"
          } blur-[80px] opacity-70`}
        />
      </div>
      
      {/* Subtle gradient overlay - fully transparent */}
      <div className="absolute inset-0 bg-transparent" />
    </div>
  );
};
