
import React from "react";
import { useTheme } from "@/context/ThemeContext";
import { motion } from "framer-motion";

export const HeroBackground = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  
  // Create animated shapes for the background with more prominent properties
  const shapes = Array.from({ length: 10 }).map((_, i) => ({
    id: i,
    size: Math.random() * 150 + 100, // Larger size
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 15 + 15, // Slightly faster
    delay: Math.random() * 2,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden -z-10">
      {/* Base background */}
      <div 
        className={`absolute inset-0 ${isDark ? "bg-[#0A0A0A]" : "bg-white"}`}
      />
      
      {/* Grid pattern with higher contrast */}
      <div 
        className={`absolute inset-0 opacity-20 bg-grid-pattern 
          ${isDark ? "bg-[#555] bg-opacity-20" : "bg-[#000] bg-opacity-10"}`}
      />
      
      {/* Animated gradient backdrop with higher opacity */}
      <div className="absolute inset-0">
        <div
          className={`absolute -inset-[100px] ${isDark ? "opacity-30" : "opacity-20"} blur-[100px]`}
        >
          {/* Primary blob with more vibrant colors */}
          <motion.div
            animate={{
              x: ["0%", "100%", "0%"],
              y: ["0%", "50%", "0%"],
            }}
            transition={{
              duration: 25, // Slightly faster
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-primary to-[#45b06c]"
          />
          
          {/* Secondary blob with higher opacity */}
          <motion.div
            animate={{
              x: ["0%", "-50%", "0%"],
              y: ["0%", "30%", "0%"],
            }}
            transition={{
              duration: 20,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="absolute top-10 right-0 w-[500px] h-[500px] rounded-full bg-gradient-to-bl from-[#1e293b] to-[#334155] opacity-80"
          />
          
          {/* Add a third blob for more visual interest */}
          <motion.div
            animate={{
              x: ["0%", "30%", "0%"],
              y: ["0%", "-20%", "0%"],
            }}
            transition={{
              duration: 22,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="absolute bottom-0 left-[30%] w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-[#3b82f6] to-[#8b5cf6] opacity-30"
          />
        </div>
      </div>
      
      {/* Floating shapes with higher opacity */}
      {shapes.map((shape) => (
        <motion.div
          key={shape.id}
          initial={{ 
            opacity: 0,
            x: `${shape.x}%`, 
            y: `${shape.y}%` 
          }}
          animate={{ 
            opacity: [0, 0.15, 0.08, 0.15, 0], // Higher opacity values
            x: [`${shape.x}%`, `${shape.x + 15}%`, `${shape.x - 8}%`, `${shape.x}%`],
            y: [`${shape.y}%`, `${shape.y - 20}%`, `${shape.y + 12}%`, `${shape.y}%`],
          }}
          transition={{
            duration: shape.duration,
            delay: shape.delay,
            repeat: Infinity,
            repeatType: "loop",
          }}
          className={`absolute ${isDark ? "bg-white" : "bg-black"} rounded-full opacity-[0.05]`}
          style={{
            width: shape.size,
            height: shape.size,
          }}
        />
      ))}
      
      {/* Additional subtle effect for light/dark modes with higher opacity */}
      <div 
        className={`absolute inset-0 ${
          isDark 
            ? "bg-gradient-to-b from-black via-transparent to-transparent" 
            : "bg-gradient-to-b from-white via-transparent to-transparent"
        } opacity-50`}
      />
    </div>
  );
};
