
import React from "react";
import { useTheme } from "@/context/ThemeContext";
import { motion } from "framer-motion";

export const PageBackground = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  
  // Create animated shapes with higher opacity and more pronounced animations
  const shapes = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    size: Math.random() * 300 + 200, // Larger shapes
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 30,
    delay: Math.random() * 2,
    opacity: Math.random() * 0.08 + 0.08, // Higher opacity
  }));

  return (
    <div className="fixed inset-0 overflow-hidden -z-10">
      {/* Base background */}
      <div 
        className={`absolute inset-0 ${isDark ? "bg-[#060606]" : "bg-[#f8f8f8]"}`}
      />
      
      {/* Grid pattern with higher contrast */}
      <div 
        className={`absolute inset-0 ${
          isDark ? "bg-grid-dark" : "bg-grid-light"
        }`}
      />
      
      {/* Animated gradient backdrop with higher opacity */}
      <div className="absolute inset-0">
        <div
          className={`absolute -inset-[300px] ${isDark ? "opacity-60" : "opacity-50"} blur-[150px]`}
          data-framer-motion="true"
        >
          {/* Primary blob with theme-specific colors */}
          <motion.div
            initial={{ x: "0%", y: "0%" }}
            animate={{
              x: ["0%", "100%", "50%", "0%"],
              y: ["0%", "50%", "20%", "0%"],
            }}
            transition={{
              duration: 60,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "mirror",
            }}
            className={`absolute top-0 left-0 w-[800px] h-[800px] rounded-full ${
              isDark 
                ? "bg-gradient-to-br from-primary to-[#45b06c]" 
                : "bg-gradient-to-br from-primary to-[#22c55e]"
            } animated`}
          />
          
          {/* Secondary blob with theme-specific colors */}
          <motion.div
            initial={{ x: "0%", y: "0%" }}
            animate={{
              x: ["0%", "-50%", "-20%", "0%"],
              y: ["0%", "30%", "10%", "0%"],
            }}
            transition={{
              duration: 50,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "mirror",
            }}
            className={`absolute top-10 right-0 w-[700px] h-[700px] rounded-full ${
              isDark 
                ? "bg-gradient-to-bl from-[#1e293b] to-[#334155] opacity-70" 
                : "bg-gradient-to-bl from-[#cbd5e1] to-[#94a3b8] opacity-50"
            } animated`}
          />
          
          {/* Third blob for more visual interest */}
          <motion.div
            initial={{ x: "0%", y: "0%" }}
            animate={{
              x: ["0%", "30%", "10%", "0%"],
              y: ["0%", "-20%", "-5%", "0%"],
            }}
            transition={{
              duration: 55,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "mirror",
            }}
            className={`absolute bottom-0 left-[30%] w-[600px] h-[600px] rounded-full ${
              isDark 
                ? "bg-gradient-to-tr from-[#3b82f6] to-[#8b5cf6] opacity-40" 
                : "bg-gradient-to-tr from-[#60a5fa] to-[#a78bfa] opacity-30"
            } animated`}
          />

          {/* Fourth blob for fuller coverage */}
          <motion.div
            initial={{ x: "0%", y: "0%" }}
            animate={{
              x: ["0%", "15%", "5%", "0%"],
              y: ["0%", "10%", "20%", "0%"],
            }}
            transition={{
              duration: 58,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "mirror",
            }}
            className={`absolute bottom-20 right-[20%] w-[500px] h-[500px] rounded-full ${
              isDark 
                ? "bg-gradient-to-tl from-[#10b981] to-[#4ade80] opacity-35" 
                : "bg-gradient-to-tl from-[#34d399] to-[#86efac] opacity-25"
            } animated`}
          />
        </div>
      </div>
      
      {/* Floating shapes with higher opacity */}
      {shapes.map((shape) => (
        <motion.div
          key={shape.id}
          initial={{ 
            opacity: shape.opacity,
            x: `${shape.x}%`, 
            y: `${shape.y}%` 
          }}
          animate={{ 
            opacity: [shape.opacity, shape.opacity + 0.03, shape.opacity - 0.02, shape.opacity],
            x: [`${shape.x}%`, `${shape.x + 10}%`, `${shape.x - 5}%`, `${shape.x}%`],
            y: [`${shape.y}%`, `${shape.y - 15}%`, `${shape.y + 8}%`, `${shape.y}%`],
          }}
          transition={{
            duration: shape.duration,
            delay: shape.delay,
            repeat: Infinity,
            repeatType: "loop",
          }}
          className={`absolute ${isDark ? "bg-white" : "bg-black"} rounded-full blur-md animated`}
          style={{
            width: shape.size,
            height: shape.size,
          }}
        />
      ))}
      
      {/* Additional subtle effect for light/dark modes */}
      <div 
        className={`absolute inset-0 ${
          isDark 
            ? "bg-gradient-to-b from-black via-transparent to-transparent" 
            : "bg-gradient-to-b from-white via-transparent to-transparent"
        } opacity-60`}
      />
    </div>
  );
};
