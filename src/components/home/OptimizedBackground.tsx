
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
      
      {/* Animated gradient blobs */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Primary blob - green gradient */}
        <motion.div
          initial={{ x: "0%", y: "0%" }}
          animate={{
            x: ["0%", "10%", "-8%", "0%"],
            y: ["0%", "-10%", "8%", "0%"],
            scale: [1, 1.15, 0.9, 1]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut"
          }}
          className={`absolute top-0 left-0 w-[900px] h-[900px] rounded-full ${
            isDark 
              ? "bg-gradient-to-br from-[#4ADE80]/40 to-[#45b06c]/25" 
              : "bg-gradient-to-br from-[#4ADE80]/30 to-[#22c55e]/20"
          } blur-[70px] opacity-85`}
        />
        
        {/* Secondary blob - blue/purple */}
        <motion.div
          initial={{ x: "10%", y: "0%" }}
          animate={{
            x: ["10%", "15%", "0%", "10%"],
            y: ["0%", "15%", "-15%", "0%"],
            scale: [1, 0.85, 1.2, 1]
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut"
          }}
          className={`absolute top-1/4 right-0 w-[700px] h-[700px] rounded-full ${
            isDark 
              ? "bg-gradient-to-tl from-[#3b82f6]/40 to-[#8b5cf6]/30" 
              : "bg-gradient-to-tl from-[#60a5fa]/30 to-[#a78bfa]/20"
          } blur-[70px] opacity-80`}
        />
        
        {/* Third blob - gray/neutral */}
        <motion.div
          initial={{ x: "0%", y: "10%" }}
          animate={{
            x: ["0%", "-15%", "12%", "0%"],
            y: ["10%", "8%", "20%", "10%"],
            scale: [1, 1.25, 0.9, 1]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut"
          }}
          className={`absolute bottom-0 left-1/3 w-[800px] h-[800px] rounded-full ${
            isDark 
              ? "bg-gradient-to-tr from-[#1e293b]/50 to-[#334155]/30" 
              : "bg-gradient-to-tr from-[#cbd5e1]/30 to-[#94a3b8]/20"
          } blur-[75px] opacity-80`}
        />
        
        {/* Additional blob for more movement - orange/pink tint */}
        <motion.div
          initial={{ x: "30%", y: "20%" }}
          animate={{
            x: ["30%", "40%", "20%", "30%"],
            y: ["20%", "10%", "30%", "20%"],
            scale: [0.9, 1.1, 0.8, 0.9]
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut"
          }}
          className={`absolute top-1/2 left-0 w-[600px] h-[600px] rounded-full ${
            isDark 
              ? "bg-gradient-to-bl from-[#f97316]/30 to-[#f43f5e]/15" 
              : "bg-gradient-to-bl from-[#fb923c]/25 to-[#fb7185]/15"
          } blur-[65px] opacity-70`}
        />
        
        {/* New vibrant blob - magenta/purple */}
        <motion.div
          initial={{ x: "20%", y: "40%" }}
          animate={{
            x: ["20%", "15%", "25%", "20%"],
            y: ["40%", "50%", "35%", "40%"],
            scale: [1, 1.15, 0.9, 1]
          }}
          transition={{
            duration: 28,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut"
          }}
          className={`absolute bottom-1/4 right-1/4 w-[550px] h-[550px] rounded-full ${
            isDark 
              ? "bg-gradient-to-tr from-[#D946EF]/25 to-[#8B5CF6]/20" 
              : "bg-gradient-to-tr from-[#D946EF]/15 to-[#8B5CF6]/10"
          } blur-[70px] opacity-70`}
        />
      </div>
      
      {/* Subtle gradient overlay - fully transparent */}
      <div className="absolute inset-0 bg-transparent" />
    </div>
  );
};
